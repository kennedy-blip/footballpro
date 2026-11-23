@react.component
let make = () => {
  let (currentTime, setCurrentTime) = React.useState(() => Date.make())
  React.useEffect0(() => {
    let timer = Stdlib_Global.setInterval(() => setCurrentTime(_ => Date.make()), 1000)
    Some(() => Stdlib_Global.clearInterval(timer))
  })
  <header className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 text-white shadow-2xl">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{React.string("⚽")}</div>
          <div><h1 className="text-2xl font-bold tracking-tight">{React.string("FootballPredictor Pro")}</h1><p className="text-emerald-300 text-sm">{React.string("AI-Powered Match Analysis • 2025/26 Season")}</p></div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xl">
            <span title="Premier League">{React.string("🏴󠁧󠁢󠁥󠁮󠁧󠁿")}</span><span title="La Liga">{React.string("🇪🇸")}</span><span title="Serie A">{React.string("🇮🇹")}</span><span title="Bundesliga">{React.string("🇩🇪")}</span><span title="Ligue 1">{React.string("🇫🇷")}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-300">{React.string("Data Updated")}</div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" /></span>
              <span className="font-mono text-lg">{React.string(Date.toLocaleTimeString(currentTime))}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2"><span className="text-emerald-400 font-bold">{React.string("6")}</span><span className="text-slate-400">{React.string("Leagues")}</span></div>
        <div className="flex items-center gap-2"><span className="text-emerald-400 font-bold">{React.string("98+")}</span><span className="text-slate-400">{React.string("Teams")}</span></div>
        <div className="flex items-center gap-2"><span className="text-emerald-400 font-bold">{React.string("2025/26")}</span><span className="text-slate-400">{React.string("Season")}</span></div>
        <div className="flex items-center gap-2"><span className="text-emerald-400 font-bold">{React.string("2020-2025")}</span><span className="text-slate-400">{React.string("Historical Data")}</span></div>
        <div className="flex items-center gap-2"><span className="text-emerald-400 font-bold">{React.string("AI")}</span><span className="text-slate-400">{React.string("Predictions")}</span></div>
      </div>
    </div>
  </header>
}
