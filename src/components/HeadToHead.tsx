import { HeadToHead as HeadToHeadType, Team } from '../types/football';

interface Props {
  h2h: HeadToHeadType;
  homeTeam: Team;
  awayTeam: Team;
}

export function HeadToHead({ h2h, homeTeam, awayTeam }: Props) {
  const homePercentage = (h2h.homeTeamWins / h2h.totalMatches) * 100;
  const drawPercentage = (h2h.draws / h2h.totalMatches) * 100;
  const awayPercentage = (h2h.awayTeamWins / h2h.totalMatches) * 100;

  return (
    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <span>⚔️</span> Head to Head History
      </h3>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-blue-400">{homeTeam.shortName}</span>
          <span className="text-slate-400">Draws</span>
          <span className="text-red-400">{awayTeam.shortName}</span>
        </div>
        <div className="flex h-4 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 transition-all duration-500"
            style={{ width: `${homePercentage}%` }}
          />
          <div 
            className="bg-slate-500 transition-all duration-500"
            style={{ width: `${drawPercentage}%` }}
          />
          <div 
            className="bg-red-500 transition-all duration-500"
            style={{ width: `${awayPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-white font-bold">{h2h.homeTeamWins}</span>
          <span className="text-slate-400">{h2h.draws}</span>
          <span className="text-white font-bold">{h2h.awayTeamWins}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="p-3 bg-slate-700/50 rounded-lg text-center">
          <span className="text-slate-400 text-xs">Total Matches</span>
          <div className="text-white font-bold text-lg">{h2h.totalMatches}</div>
        </div>
        <div className="p-3 bg-slate-700/50 rounded-lg text-center">
          <span className="text-slate-400 text-xs">Avg Goals/Match</span>
          <div className="text-emerald-400 font-bold text-lg">{h2h.avgGoals.toFixed(1)}</div>
        </div>
      </div>

      <h4 className="text-slate-300 text-sm font-medium mb-2">Recent Meetings</h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {h2h.recentMatches.map((match, idx) => (
          <div key={idx} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-2 text-sm">
            <div className="flex flex-col">
              <span className="text-slate-400 text-xs">{match.date}</span>
              <span className="text-slate-500 text-xs">{match.season}</span>
            </div>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <span className={`font-medium text-xs ${match.homeScore > match.awayScore ? 'text-green-400' : 'text-slate-300'}`}>
                {match.homeTeam.length > 12 ? match.homeTeam.substring(0, 12) + '...' : match.homeTeam}
              </span>
              <span className="text-white font-bold px-2 py-1 bg-slate-800 rounded">
                {match.homeScore} - {match.awayScore}
              </span>
              <span className={`font-medium text-xs ${match.awayScore > match.homeScore ? 'text-green-400' : 'text-slate-300'}`}>
                {match.awayTeam.length > 12 ? match.awayTeam.substring(0, 12) + '...' : match.awayTeam}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* H2H Stats Summary */}
      <div className="mt-4 p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
        <div className="text-xs text-slate-400 mb-1">H2H Insight</div>
        <p className="text-emerald-400 text-sm">
          {h2h.homeTeamWins > h2h.awayTeamWins 
            ? `${homeTeam.shortName} has the historical edge with ${h2h.homeTeamWins} wins in ${h2h.totalMatches} meetings`
            : h2h.awayTeamWins > h2h.homeTeamWins
              ? `${awayTeam.shortName} leads the head-to-head with ${h2h.awayTeamWins} wins historically`
              : `Evenly matched fixture with ${h2h.draws} draws from ${h2h.totalMatches} meetings`
          }
          {h2h.avgGoals > 2.5 && '. This fixture tends to produce goals (avg ' + h2h.avgGoals.toFixed(1) + ' per game).'}
          {h2h.avgGoals < 2.0 && '. Typically a low-scoring fixture (avg ' + h2h.avgGoals.toFixed(1) + ' per game).'}
        </p>
      </div>

      {/* Data source note */}
      <div className="mt-3 text-xs text-slate-500 text-center">
        Based on all-time competitive meetings between these clubs
      </div>
    </div>
  );
}
