import { getStatsData } from './lib/stats-data.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  let debugInfo = {
    step: 'initializing',
    error: null,
    host: req.headers.host,
    protocol: req.headers['x-forwarded-proto'] || 'https'
  };

  try {
    debugInfo.step = 'getting stats data';
    console.log('🔍 Getting stats data via shared function');
    
    // Use shared function instead of HTTP request
    const data = await getStatsData();
    debugInfo.step = 'stats data received';
    console.log('📊 Stats data received:', data);
    
    debugInfo.step = 'generating SVG';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="350" height="80">
  <defs>
    <style>
      .terminal-bg { fill: #000000; }
      .terminal-border { fill: none; stroke: #00ff00; stroke-width: 2; }
      .terminal-text { fill: #00ff00; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; }
      .username-text { fill: #00ff00; font-family: 'Courier New', monospace; font-size: 9px; font-weight: normal; }
      .count-text { fill: #00ff41; font-family: 'Courier New', monospace; font-size: 13px; font-weight: bold; }
      .weather-text { fill: #00ffff; font-family: 'Courier New', monospace; font-size: 10px; }
      .cursor { fill: #00ff00; animation: blink 1s infinite; }
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    </style>
  </defs>
  
  <rect width="350" height="80" class="terminal-bg"/>
  <rect x="2" y="2" width="346" height="76" class="terminal-border"/>
  <rect x="4" y="4" width="342" height="14" fill="#001100"/>
  <text x="8" y="14" class="username-text">[root@github ~]$ ./profile_stats.sh</text>
  
  <text x="8" y="32" class="terminal-text">&gt; User: ${data.username || 'bh1090'}</text>
  <text x="8" y="47" class="terminal-text">&gt; Visits: </text>
  <text x="78" y="47" class="count-text">${data.visits || 0}</text>
  
  <text x="8" y="62" class="weather-text">&gt; Toronto: ${data.weather?.temp || '--'}°C ${data.weather?.description || 'Loading...'}</text>
  
  <rect x="${120 + (data.visits?.toString().length || 1) * 8}" y="36" width="6" height="12" class="cursor"/>
  
  <text x="300" y="14" class="username-text" opacity="0.3">01</text>
  <text x="320" y="32" class="username-text" opacity="0.2">10</text>
  <text x="310" y="47" class="username-text" opacity="0.2">11</text>
  <text x="325" y="62" class="username-text" opacity="0.1">01</text>
</svg>`;

    debugInfo.step = 'completed successfully';
    console.log('✅ Badge generated successfully');
    res.status(200).send(svg);
    
  } catch (error) {
    debugInfo.step = 'error occurred';
    debugInfo.error = error.message;
    debugInfo.errorStack = error.stack;
    
    console.error('❌ Badge Error Details:', debugInfo);
    
    // Create detailed error SVG with debug info
    const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120">
  <defs>
    <style>
      .terminal-bg { fill: #000000; }
      .terminal-border { fill: none; stroke: #ff3300; stroke-width: 2; }
      .error-text { fill: #ff3300; font-family: 'Courier New', monospace; font-size: 9px; font-weight: bold; }
      .debug-text { fill: #ffaa00; font-family: 'Courier New', monospace; font-size: 8px; }
    </style>
  </defs>
  
  <rect width="400" height="120" class="terminal-bg"/>
  <rect x="2" y="2" width="396" height="116" class="terminal-border"/>
  
  <text x="8" y="15" class="error-text">⚠ DEBUG INFO</text>
  <text x="8" y="28" class="debug-text">Step: ${debugInfo.step}</text>
  <text x="8" y="40" class="debug-text">Host: ${debugInfo.host || 'undefined'}</text>
  <text x="8" y="52" class="debug-text">Protocol: ${debugInfo.protocol}</text>
  <text x="8" y="64" class="debug-text">Stats URL: ${(debugInfo.statsUrl || '').substring(0, 50)}...</text>
  <text x="8" y="76" class="debug-text">Status: ${debugInfo.responseStatus || 'N/A'}</text>
  <text x="8" y="88" class="error-text">Error: ${(debugInfo.error || '').substring(0, 60)}...</text>
  <text x="8" y="108" class="debug-text">Check Vercel function logs for full details</text>
</svg>`;
    
    res.status(200).send(errorSvg);
  }
}