# ⚽ FootballPredictor Pro - 2025/26 Season

A comprehensive football prediction and analysis dashboard with real historical data, accurate player transfers, and league standings.

![Football Predictor Pro](https://img.shields.io/badge/Season-2025%2F26-green) ![React](https://img.shields.io/badge/React-19.x-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## 🌟 Features

- **📊 Historical Analysis** - Uses 2020-2025 season data for predictions
- **🏆 All Major Leagues** - Premier League, La Liga, Serie A, Bundesliga, Ligue 1
- **📈 Accurate Standings** - Real 2024/25 final standings & 2025/26 projections
- **⚽ Player Transfers** - Updated transfers (KDB → Al-Ittihad, Mbappe → Real Madrid, etc.)
- **🔮 AI Predictions** - Win probability, Over/Under, BTTS analysis
- **🎯 Betting Tips** - Confidence-based recommendations
- **📅 Real Fixtures** - Honest fixture times (no fake live matches)
- **🔄 Auto-Update Ready** - API integration for real-time data

## 📋 Prerequisites

Before running this project, make sure you have installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

### Verify Installation

Open terminal/command prompt and run:

```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

## 🚀 Quick Start

### Step 1: Open Project in VS Code

1. Open VS Code
2. Go to **File → Open Folder**
3. Select the project folder

### Step 2: Install Dependencies

Open the integrated terminal in VS Code (`Ctrl + `` or `Cmd + `` on Mac):

```bash
npm install
```

This will install:
- React 19
- TypeScript 5
- Tailwind CSS 4
- Vite 7
- Other utilities (clsx, tailwind-merge)

### Step 3: Run Development Server

```bash
npm run dev
```

You should see:

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

### Step 4: Open in Browser

Click the link or open **http://localhost:5173** in your browser.

## 📁 Project Structure

```
football-predictor/
├── src/
│   ├── components/          # UI Components
│   │   ├── Header.tsx
│   │   ├── LeagueSelector.tsx
│   │   ├── TeamSelector.tsx
│   │   ├── UpcomingMatches.tsx
│   │   ├── LiveMatches.tsx
│   │   ├── PredictionPanel.tsx
│   │   ├── TeamStats.tsx
│   │   ├── HeadToHead.tsx
│   │   ├── PlayerStats.tsx
│   │   ├── StatsComparison.tsx
│   │   ├── LeagueStandings.tsx
│   │   ├── BettingTips.tsx
│   │   └── Disclaimer.tsx
│   │
│   ├── data/                # Data & Types
│   │   ├── leagues.ts       # All leagues & teams
│   │   ├── fixtures.ts      # Match fixtures
│   │   ├── standings2024_25.ts  # Last season standings
│   │   └── types.ts         # TypeScript types
│   │
│   ├── services/            # API & Services
│   │   ├── footballApi.ts   # Real API integration
│   │   └── predictionEngine.ts  # Prediction algorithms
│   │
│   ├── App.tsx              # Main application
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
│
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── README.md                # This file
```

## 🔄 Auto-Update with Real API

The project is **ready for real-time updates**! To enable:

### Option 1: API-Football (Recommended)

1. Sign up at [API-Football](https://www.api-football.com/)
2. Get your free API key (100 requests/day free)
3. Create a `.env` file in the project root:

```env
VITE_FOOTBALL_API_KEY=your_api_key_here
VITE_FOOTBALL_API_HOST=v3.football.api-sports.io
```

4. The app will automatically fetch:
   - Live match scores
   - Real-time standings
   - Player statistics
   - Fixture updates

### Option 2: Football-Data.org

1. Sign up at [Football-Data.org](https://www.football-data.org/)
2. Get your free API key
3. Update `.env`:

```env
VITE_FOOTBALL_DATA_API_KEY=your_api_key_here
```

## 📊 How Predictions Work

The prediction engine analyzes:

| Factor | Weight | Description |
|--------|--------|-------------|
| Historical Results | 30% | Last 5 seasons data (2020-2025) |
| Recent Form | 25% | Last 5 matches performance |
| Head-to-Head | 15% | Historical matchups between teams |
| Home Advantage | 12% | Home team statistical boost |
| Goal Averages | 10% | Goals scored/conceded per match |
| Player Quality | 8% | Key player ratings & form |

### Prediction Outputs

- **Win/Draw/Loss %** - Probability for each outcome
- **Predicted Score** - Most likely scoreline
- **Over/Under 2.5** - Goals probability
- **BTTS** - Both Teams to Score probability
- **Confidence Level** - Low/Medium/High based on data quality

## 🛠️ Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Customization

### Add New League

Edit `src/data/leagues.ts`:

```typescript
export const newLeague: League = {
  id: 'new_league',
  name: 'New League Name',
  country: 'Country',
  logo: '🏆',
  teams: [
    // Add teams here
  ]
};
```

### Update Player Transfers

Edit the player data in team definitions:

```typescript
{
  id: 1,
  name: 'Player Name',
  position: 'Forward',
  number: 10,
  nationality: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  goals: 15,
  assists: 8,
  appearances: 25,
  rating: 8.2,
  transferredFrom: 'Previous Club',  // Add this
  transferDate: 'Jul 2025'           // Add this
}
```

## ⚠️ Disclaimer

This tool provides **statistical analysis only**. It does NOT guarantee betting wins. Always:

- Gamble responsibly
- Never bet more than you can afford to lose
- Use this as one of many research tools
- Past performance doesn't guarantee future results

## 🐛 Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org/

### "Port 5173 already in use"
```bash
# Kill the process or use different port
npm run dev -- --port 3000
```

### "Module not found" errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

### TypeScript errors
```bash
# Check TypeScript version
npx tsc --version
```

## 📞 Support

If you encounter issues:

1. Check the console for errors (`F12` in browser)
2. Ensure all dependencies are installed (`npm install`)
3. Clear browser cache and restart dev server

## 📜 License

MIT License - Feel free to use and modify!

---

Made with ❤️ for football fans and data enthusiasts
