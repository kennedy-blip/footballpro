# ⚽ FootballPredictor Pro - 2025/26 Season

A comprehensive football prediction and analysis dashboard with real historical data, accurate player transfers, and league standings.

![Football Predictor Pro](https://img.shields.io/badge/Season-2025%2F26-green) ![React](https://img.shields.io/badge/React-19.x-blue) ![ReScript](https://img.shields.io/badge/ReScript-migration%20in%20progress-orange)

## 🌟 Features

- **📊 Historical Analysis** - Uses 2020-2025 season data for predictions
- **🏆 All Major Leagues** - Premier League, La Liga, Serie A, Bundesliga, Ligue 1
- **📈 Accurate Standings** - Real 2024/25 final standings & 2025/26 projections
- **⚽ Player Transfers** - Updated transfers (KDB → Al-Ittihad, Mbappe → Real Madrid, etc.)
- **🔮 AI Predictions** - Win probability, Over/Under, BTTS analysis
- **🎯 Betting Tips** - Confidence-based recommendations
- **📅 Real Fixtures** - Honest fixture times (no fake live matches)
- **📡 Static-data mode** - No live API feed is currently wired into the app

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
- ReScript 12 and the ReScript React bindings
- Tailwind CSS 4
- Vite 7
- Vite, React, and Tailwind CSS tooling

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

The rewrite is in progress. The production app still uses a Vite static build; migrated modules are compiled from `src/rescript/` into ignored `lib/` output before Vite bundles the app. The Render dashboard build settings are not present in this repository; confirm the real Render build command and output directory before deploying stack changes.

## 📡 Live-data status

The live-data API service was unused by the application and has been removed. The app currently uses its checked-in historical data and fixtures; the Live Matches panel explicitly shows that no matches are currently live. Do not place provider secrets in `VITE_*` variables: Vite exposes those values to browser code. A non-empty API key was found in the tracked local `.env`; it has been removed from the current Git index, but it may remain in repository history and should be rotated with its provider. Keep secrets in Render's environment settings, not in Git.

## 📊 How Predictions Work

The prediction calculation is being migrated to ReScript and is parity-checked against the former implementation. It combines team win rate, recent form, attack/defense rates, head-to-head results, home advantage, and home/away win rates. Probabilities are rounded to two decimal places; goal markets and score estimates are derived from expected goals. These estimates are not guarantees and are not financial advice.

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

Edit `src/data/leagues.js`:

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

### ReScript compiler errors

Run `npm install` and `npm run build`; compiled ReScript output is generated under ignored `lib/`. The migration is in progress, so some TypeScript source remains temporarily.

## 📞 Support

If you encounter issues:

1. Check the console for errors (`F12` in browser)
2. Ensure all dependencies are installed (`npm install`)
3. Clear browser cache and restart dev server

## 📜 License

MIT License - Feel free to use and modify!

---

Made with ❤️ for football fans and data enthusiasts
