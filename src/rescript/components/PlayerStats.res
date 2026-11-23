type player = {
  id: float, name: string, position: string,
  number: Nullable.t<float>, goals: float, assists: float, appearances: float, rating: float,
  nationality: Nullable.t<string>, age: Nullable.t<float>,
  marketValue: Nullable.t<string>, previousClubs: Nullable.t<array<string>>, joinedDate: Nullable.t<string>,
}

let showOptional = value => !Nullable.isNullable(value)
let number = value => React.string(Float.toString(value))

@react.component
let make = (~players: array<player>, ~teamName: string) => {
  let teamPlayers = players
  if Array.length(teamPlayers) == 0 {
    React.null
  } else {
    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">{React.string("👤 Key Players - " ++ teamName)}</h3>
      <p className="text-slate-400 text-xs mb-3">{React.string("2024/25 Stats • Updated with Summer 2025 Transfers")}</p>
      <div className="space-y-3">
        {React.array(Belt.Array.mapWithIndex(teamPlayers, (index, player) =>
          <div key={Int.toString(index)} className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-white font-medium">{React.string(player.name)}</span>
                {if showOptional(player.number) {<span className="text-slate-500 text-xs ml-1">{React.string("#" ++ Float.toString(Nullable.getOrThrow(player.number)))}</span>} else {React.null}}
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-slate-400 text-sm">{React.string(player.position)}</span>
                  {if showOptional(player.nationality) {<span className="text-slate-500 text-xs">{React.string("• " ++ Nullable.getOrThrow(player.nationality))}</span>} else {React.null}}
                  {if showOptional(player.age) {<span className="text-slate-500 text-xs">{React.string("• " ++ Float.toString(Nullable.getOrThrow(player.age)) ++ " yrs")}</span>} else {React.null}}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1"><span className="text-yellow-400">{React.string("★")}</span><span className="text-white font-medium">{number(player.rating)}</span></div>
                {if showOptional(player.marketValue) {<span className="text-emerald-400 text-xs">{React.string("€" ++ Nullable.getOrThrow(player.marketValue))}</span>} else {React.null}}
              </div>
            </div>
            {if showOptional(player.previousClubs) && Array.length(Nullable.getOrThrow(player.previousClubs)) > 0 {
              <div className="mb-2 p-2 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-blue-400 text-xs font-medium">{React.string("🔄 New Signing")}</div>
                <div className="text-slate-300 text-xs">
                  {React.string("From: " ++ Array.getUnsafe(Nullable.getOrThrow(player.previousClubs), 0))}
                  {if showOptional(player.joinedDate) {<span className="text-slate-500">{React.string(" • Joined " ++ Nullable.getOrThrow(player.joinedDate))}</span>} else {React.null}}
                </div>
              </div>
            } else {React.null}}
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-slate-800/50 rounded p-1.5"><div className="text-emerald-400 font-bold">{number(player.goals)}</div><div className="text-slate-500 text-xs">{React.string("Goals")}</div></div>
              <div className="bg-slate-800/50 rounded p-1.5"><div className="text-blue-400 font-bold">{number(player.assists)}</div><div className="text-slate-500 text-xs">{React.string("Assists")}</div></div>
              <div className="bg-slate-800/50 rounded p-1.5"><div className="text-slate-300 font-bold">{number(player.appearances)}</div><div className="text-slate-500 text-xs">{React.string("Apps")}</div></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-slate-500 text-center">{React.string("Stats from 2024/25 season • All competitions")}</div>
    </div>
  }
}
