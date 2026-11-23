@react.component
let make = () =>
  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700">
    <div className="flex items-center gap-2 mb-4">
      <span className="relative flex h-3 w-3"><span className="relative inline-flex rounded-full h-3 w-3 bg-slate-500" /></span>
      <h2 className="text-xl font-bold text-white">{React.string("Live Matches")}</h2>
    </div>
    <div className="text-center py-6">
      <div className="text-4xl mb-3">{React.string("📺")}</div>
      <p className="text-slate-400 text-sm">{React.string("No matches currently live")}</p>
      <p className="text-slate-500 text-xs mt-2">{React.string("The 2025/26 season starts August 16, 2025")}</p>
      <div className="mt-4 bg-slate-700/50 rounded-lg p-3">
        <p className="text-emerald-400 text-sm font-medium">{React.string("Next Match Day")}</p>
        <p className="text-white text-sm">{React.string("August 15-16, 2025")}</p>
        <p className="text-slate-400 text-xs mt-1">{React.string("Premier League Matchweek 1")}</p>
      </div>
    </div>
  </div>
