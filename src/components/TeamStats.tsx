import { Team, TeamStats as TeamStatsType } from '../types/football';

interface Props {
  team: Team;
  stats: TeamStatsType;
  isHome: boolean;
}

export function TeamStats({ team, stats, isHome }: Props) {
  const formColors = {
    W: 'bg-green-500',
    D: 'bg-yellow-500',
    L: 'bg-red-500',
  };

  const goalDiff = stats.goalsFor - stats.goalsAgainst;

  return (
    <div className={`bg-slate-800/50 rounded-xl p-5 border border-slate-700 ${isHome ? 'border-l-4 border-l-blue-500' : 'border-r-4 border-r-red-500'}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{team.logo}</span>
        <div>
          <h3 className="text-white font-bold">{team.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">{team.league}</span>
            <span className="text-emerald-400 text-sm font-medium">#{stats.position}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Recent Form</span>
          <div className="flex gap-1">
            {stats.form.map((result, idx) => (
              <span
                key={idx}
                className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold text-white ${formColors[result]}`}
              >
                {result}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-slate-700/50 rounded-lg p-2">
            <div className="text-white font-bold text-lg">{stats.played}</div>
            <div className="text-slate-400 text-xs">Played</div>
          </div>
          <div className="bg-green-500/20 rounded-lg p-2">
            <div className="text-green-400 font-bold text-lg">{stats.wins}</div>
            <div className="text-slate-400 text-xs">Wins</div>
          </div>
          <div className="bg-yellow-500/20 rounded-lg p-2">
            <div className="text-yellow-400 font-bold text-lg">{stats.draws}</div>
            <div className="text-slate-400 text-xs">Draws</div>
          </div>
          <div className="bg-red-500/20 rounded-lg p-2">
            <div className="text-red-400 font-bold text-lg">{stats.losses}</div>
            <div className="text-slate-400 text-xs">Losses</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Points</span>
            <span className="text-emerald-400 font-bold">{stats.points}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Goals</span>
            <span className="text-white font-medium">{stats.goalsFor} : {stats.goalsAgainst}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Goal Difference</span>
            <span className={`font-medium ${goalDiff > 0 ? 'text-green-400' : goalDiff < 0 ? 'text-red-400' : 'text-slate-400'}`}>
              {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Clean Sheets</span>
            <span className="text-white font-medium">{stats.cleanSheets}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Avg Goals/Game</span>
            <span className="text-emerald-400 font-medium">{stats.avgGoalsScored.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">{isHome ? 'Home Wins' : 'Away Wins'}</span>
            <span className="text-white font-medium">
              {isHome ? stats.homeWins : stats.awayWins} / {isHome ? stats.homePlayed : stats.awayPlayed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
