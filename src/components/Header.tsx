import { useState, useEffect } from 'react';

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">⚽</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">FootballPredictor Pro</h1>
              <p className="text-emerald-300 text-sm">AI-Powered Match Analysis • 2025/26 Season</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* League Badges */}
            <div className="hidden md:flex items-center gap-2 text-xl">
              <span title="Premier League">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
              <span title="La Liga">🇪🇸</span>
              <span title="Serie A">🇮🇹</span>
              <span title="Bundesliga">🇩🇪</span>
              <span title="Ligue 1">🇫🇷</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-300">Data Updated</div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-mono text-lg">{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">6</span>
            <span className="text-slate-400">Leagues</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">98+</span>
            <span className="text-slate-400">Teams</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">2025/26</span>
            <span className="text-slate-400">Season</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">2020-2025</span>
            <span className="text-slate-400">Historical Data</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">AI</span>
            <span className="text-slate-400">Predictions</span>
          </div>
        </div>
      </div>
    </header>
  );
}
