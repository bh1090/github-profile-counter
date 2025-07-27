# 🖥️ GitHub Profile Counter - Matrix Terminal Style

A real-time Matrix-style terminal badge that displays GitHub profile visits and live Toronto weather data!

![Profile Views](https://github-profile-counter.vercel.app/api/badge?v=2)

## ✨ Current Features

- 🔥 **Real-time Visit Counter** - True visit tracking using Vercel KV (Redis)
- 🌤️ **Live Weather Data** - Current Toronto temperature and conditions via OpenWeatherMap
- 💚 **Matrix Terminal Aesthetic** - Authentic green terminal with blinking cursor
- ⚡ **Lightning Fast** - Serverless architecture with < 50ms response times
- 🛡️ **Bulletproof Reliability** - Smart fallbacks ensure badge always works
- 🎯 **Zero Dependencies** - Self-contained system with no external tracking
- 🌍 **Global CDN** - Fast loading worldwide via Vercel Edge Network

## � How It Works

```
GitHub Profile → README loads badge → Vercel Function → KV Database + Weather API → SVG Response
```

1. **Someone visits your GitHub profile**
2. **README loads the SVG badge** from Vercel endpoint
3. **Serverless function executes** incrementing visit counter in Redis
4. **Weather API called** for live Toronto conditions
5. **SVG generated** with real-time data in Matrix terminal style
6. **Badge displays** updated visit count and weather

## 🏗️ Architecture

### Current Tech Stack
- **🚀 Backend**: Node.js serverless functions (Vercel)
- **📊 Database**: Vercel KV (Redis) - for visit counter
- **🌡️ Weather**: OpenWeatherMap API - real-time data
- **🎨 Frontend**: Dynamic SVG generation with CSS animations
- **☁️ Deployment**: Vercel with global edge distribution
- **🔗 Integration**: Shared function architecture (badge.js + stats.js)

### Project Structure
```
github-profile-counter/
├── api/
│   ├── badge.js           # SVG badge generator
│   ├── stats.js           # JSON stats endpoint  
│   └── lib/
│       └── stats-data.js  # Shared logic (KV counter + weather)
├── package.json           # Dependencies (@vercel/kv)
└── README.md             # Documentation
```

## � Quick Setup & Deployment

### 1. Fork & Clone
```bash
git clone https://github.com/bh1090/githubProfileCounter
cd githubProfileCounter
npm install
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI (if you don't have it)
npm i -g vercel

# Deploy your project
vercel

# Deploy to production
vercel --prod
```

### 3. Set Up Database (Upstash Redis)
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your deployed project
3. Navigate to **Storage** tab
4. Click **"Browse Marketplace"**
5. Choose **Upstash** → **Redis**
6. Create database and connect to your project

### 4. Add Weather API (Optional but Recommended)
1. Get free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. In Vercel dashboard, go to **Settings** → **Environment Variables**
3. Add: `WEATHER_API_KEY` = `your_api_key_here`

### 5. Add to Your GitHub Profile
Replace `your-deployment-url` with your actual Vercel deployment URL:
```markdown
![Profile Views](https://your-deployment-url.vercel.app/api/badge)
```

## ⚙️ Customization

### Change Username & Location
In `api/lib/stats-data.js`:
```javascript
// Update these values
username: 'your-github-username',
location: 'Your-City',

// And in the weather API call
const url = `https://api.openweathermap.org/data/2.5/weather?q=Your-City,Country&appid=${WEATHER_API_KEY}&units=metric`;
```

### Customize Styling
Edit the SVG in `api/badge.js` to change:
- Colors (terminal-text, terminal-border classes)
- Text content and positioning
- Badge dimensions and layout
- Animations and effects

## 🔗 API Endpoints

### `/api/badge` - SVG Badge
Returns the Matrix-style terminal SVG badge
- **Method**: GET
- **Response**: SVG image
- **Caching**: No cache for real-time updates

### `/api/stats` - JSON Data  
Returns raw stats data for debugging/integration
- **Method**: GET
- **Response**: JSON with visits, weather, debug info
- **Example**:
```json
{
  "username": "bh1090",
  "visits": 127,
  "weather": { "temp": 22, "description": "Clear", "icon": "01d" },
  "location": "Toronto",
  "timestamp": "2025-07-27T14:30:00.000Z",
  "debug": { "visitCounterWorking": true, "weatherWorking": true }
}
```
## 🛠️ Technical Details

### Visit Counter Logic
1. **Vercel KV (Redis)** - Primary counter storage
2. **Atomic Operations** - `kv.incr()` ensures accurate counts
3. **Smart Fallback** - Mathematical counter if KV unavailable
4. **Real-time Updates** - Every badge load increments counter

### Weather Integration  
- **Live Data** - Fetched from OpenWeatherMap on each request
- **8-second Timeout** - Prevents hanging requests
- **Graceful Degradation** - Fallback weather if API fails
- **Global Locations** - Easily configurable for any city

### Performance Optimizations
- **Shared Function Architecture** - DRY principle across endpoints
- **Serverless Cold Start** - < 100ms typical response time
- **Error Handling** - Comprehensive try-catch blocks
- **Efficient SVG** - Minimal file size with CSS animations

## 🔮 Future Roadmap

### 🚧 Planned Features
- [ ] **Multiple City Support** - Weather for different locations based on visitor IP
- [ ] **GitHub Stats Integration** - Show repository count, stars, followers
- [ ] **Coding Activity** - Display recent commit activity and streaks  
- [ ] **Theme Variants** - Additional color schemes (cyberpunk, retro, terminal green)
- [ ] **Interactive Elements** - Click events for more detailed stats
- [ ] **Analytics Dashboard** - Web interface to view detailed visit analytics
- [ ] **Custom Animations** - More terminal effects (typing, scrolling text)
- [ ] **Visitor Geography** - Show visitor locations on a mini map
- [ ] **Social Links** - Display latest Twitter/LinkedIn activity
- [ ] **Technology Stack Display** - Show preferred programming languages

### 🎯 Advanced Features (v2.0)
- [ ] **Real-time Chat** - Matrix-style message system for visitors
- [ ] **Mini Terminal Game** - Interactive terminal games embedded in badge
- [ ] **Code Snippet Display** - Show recent commits or code snippets
- [ ] **Time Zone Support** - Display multiple time zones
- [ ] **Visitor Comments** - Allow visitors to leave terminal-style messages
- [ ] **Achievement System** - Unlock badges based on visit milestones
- [ ] **API Rate Limiting** - Intelligent caching and rate limiting
- [ ] **Multi-language Support** - Internationalization for global users

### 🔧 Technical Improvements
- [ ] **Edge Caching Strategy** - Smart caching for better performance
- [ ] **Database Optimization** - Multiple KV stores for different data types
- [ ] **Monitoring & Alerts** - Health checks and uptime monitoring
- [ ] **A/B Testing Framework** - Test different badge designs
- [ ] **Configuration Dashboard** - Web UI for easy customization
- [ ] **Webhook Integration** - Connect with GitHub, Twitter, etc.
- [ ] **Dark/Light Mode** - Automatic theme switching
- [ ] **Mobile Optimization** - Responsive design for mobile GitHub viewing

## � Troubleshooting

### Common Issues

**Badge not updating?**
- Check Vercel deployment status
- Verify KV database connection
- Clear browser cache

**Weather not showing?**  
- Confirm `WEATHER_API_KEY` environment variable is set
- Check OpenWeatherMap API quota
- Verify city name spelling in API call

**Visit counter stuck?**
- Check Vercel KV database status
- Review function logs in Vercel dashboard
- Fallback counter should still work

### Debug Mode
Visit `/api/stats` directly to see raw JSON data and debug information.

## 📄 License

MIT License - feel free to fork, modify, and use for your own projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request

## ⭐ Show Your Support

If you found this project helpful, please give it a star! ⭐

---

Made with 💚 by [bh1090](https://github.com/bh1090) | Powered by Vercel & Redis
  "username": "bh1090",
  "visits": 1247,
  "weather": {
    "temp": 18,
    "description": "Cloudy"
  },
  "location": "Toronto"
}
```

## 🤝 Contributing

Feel free to fork this project and make it your own! Some ideas:

- Add more weather details
- Implement different visual themes  
- Add caching for better performance
- Support for multiple cities
- Dark/light mode toggle

## 📝 License

MIT License - feel free to use this for your own profile!

## 🔗 Links

- [Live Demo](https://github-profile-counter.vercel.app/api/badge)
- [API Stats](https://github-profile-counter.vercel.app/api/stats)
- [My GitHub Profile](https://github.com/bh1090)

---

⭐ If you found this useful, please star the repo!