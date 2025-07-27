// api/stats.js - Simplified debug version
import { getStatsData } from './lib/stats-data.js';

export default async function handler(req, res) {
  try {
    console.log('🚀 Stats API called at:', new Date().toISOString());
    console.log('📡 Request method:', req.method);
    console.log('📡 Request headers:', {
      host: req.headers.host,
      'user-agent': req.headers['user-agent'],
      'x-forwarded-proto': req.headers['x-forwarded-proto']
    });

    // Set headers immediately
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User-Agent, Accept');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      console.log('🔧 Handling OPTIONS request');
      res.status(200).end();
      return;
    }

    console.log('✅ Headers set successfully');

    // Get shared stats data
    const data = await getStatsData();
    
    console.log('� Sending response:', data);
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('💥 Error in stats API:', error);
    return res.status(500).json({ 
      error: 'Stats API failed', 
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}