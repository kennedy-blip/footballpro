import { liveMatches } from '../data/fixtures';

export function LiveMatches() {
  // No fake live matches - be honest
  if (liveMatches.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-500"></span>
          </span>
          <h2 className="text-xl font-bold text-white">Live Matches</h2>
        </div>
        
        <div className="text-center py-6">
          <div className="text-4xl mb-3">📺</div>
          <p className="text-slate-400 text-sm">No matches currently live</p>
          <p className="text-slate-500 text-xs mt-2">
            The 2025/26 season starts August 16, 2025
          </p>
          <div className="mt-4 bg-slate-700/50 rounded-lg p-3">
            <p className="text-emerald-400 text-sm font-medium">Next Match Day</p>
            <p className="text-white text-sm">August 15-16, 2025</p>
            <p className="text-slate-400 text-xs mt-1">Premier League Matchweek 1</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl p-6 border border-red-500/30">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
        <h2 className="text-xl font-bold text-white">Live Matches</h2>
      </div>
      
      <div className="grid gap-4">
        {liveMatches.map(match => (
          <div key={match.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">{match.league}</span>
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                {match.minute}'
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{match.homeTeam.logo}</span>
                <span className="text-white font-medium">{match.homeTeam.shortName}</span>
              </div>
              <div className="flex items-center gap-3 px-4">
                <span className="text-3xl font-bold text-white">{match.homeScore}</span>
                <span className="text-slate-500">-</span>
                <span className="text-3xl font-bold text-white">{match.awayScore}</span>
              </div>
              <div className="flex items-center gap-3 flex-1 justify-end">
                <span className="text-white font-medium">{match.awayTeam.shortName}</span>
                <span className="text-2xl">{match.awayTeam.logo}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700">
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000"
                  style={{ width: `${(match.minute || 0) / 90 * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
