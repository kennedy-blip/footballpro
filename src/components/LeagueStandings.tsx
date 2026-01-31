import { useMemo } from 'react';
import { getTeamsByLeague, teamStatsMap, leagues } from '../data/leagues';
import { Team, TeamStats } from '../types/football';

interface Props {
  leagueId: number;
}

interface StandingRow {
  team: Team;
  stats: TeamStats;
}

export function LeagueStandings({ leagueId }: Props) {
  const league = leagues.find(l => l.id === leagueId);
  
  const standings = useMemo(() => {
    const teams = getTeamsByLeague(leagueId);
    const rows: StandingRow[] = [];
    
    teams.forEach(team => {
      const stats = teamStatsMap.get(team.id);
      if (stats) {
        rows.push({ team, stats });
      }
    });
    
    // Sort by points, then goal difference, then goals scored
    return rows.sort((a, b) => {
      const pointsDiff = b.stats.points - a.stats.points;
      if (pointsDiff !== 0) return pointsDiff;
      
      const gdA = a.stats.goalsFor - a.stats.goalsAgainst;
      const gdB = b.stats.goalsFor - b.stats.goalsAgainst;
      const gdDiff = gdB - gdA;
      if (gdDiff !== 0) return gdDiff;
      
      return b.stats.goalsFor - a.stats.goalsFor;
    });
  }, [leagueId]);

  if (!league) return null;

  const formColors = {
    W: 'bg-green-500',
    D: 'bg-yellow-500',
    L: 'bg-red-500',
  };

  // Determine zone thresholds based on league
  const championsLeagueSpots = leagueId === 78 ? 4 : 4; // Bundesliga and others
  const europaLeagueSpot = championsLeagueSpots + 1;
  const relegationStart = standings.length - 2;

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>{league.flag}</span> {league.name} Standings
        </h2>
        <p className="text-slate-400 text-sm mt-1">2025/26 Season • Projected after 20 matchdays</p>
        <p className="text-emerald-400 text-xs mt-1">Based on 2020-2025 historical performance</p>
      </div>
      
      {standings.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-slate-400">No standings data available for this league</p>
          <p className="text-slate-500 text-sm mt-2">Select a major league to view standings</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-700/50">
              <tr className="text-slate-400 text-xs uppercase">
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Team</th>
                <th className="py-3 px-2 text-center">P</th>
                <th className="py-3 px-2 text-center">W</th>
                <th className="py-3 px-2 text-center">D</th>
                <th className="py-3 px-2 text-center">L</th>
                <th className="py-3 px-2 text-center">GF</th>
                <th className="py-3 px-2 text-center">GA</th>
                <th className="py-3 px-2 text-center">GD</th>
                <th className="py-3 px-2 text-center">Pts</th>
                <th className="py-3 px-2 text-center hidden md:table-cell">Form</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, index) => {
                const gd = row.stats.goalsFor - row.stats.goalsAgainst;
                const position = index + 1;
                
                // Determine position styling
                let positionClass = 'text-slate-400';
                let rowBorder = '';
                if (position <= championsLeagueSpots) {
                  positionClass = 'text-green-400';
                  rowBorder = 'border-l-4 border-l-green-500';
                } else if (position === europaLeagueSpot) {
                  positionClass = 'text-blue-400';
                  rowBorder = 'border-l-4 border-l-blue-500';
                } else if (position >= relegationStart) {
                  positionClass = 'text-red-400';
                  rowBorder = 'border-l-4 border-l-red-500';
                }
                
                // Check if team is promoted
                const isPromoted = row.team.league === 'Premier League' && 
                  ['Leeds United', 'Burnley', 'Sheffield United'].includes(row.team.name);
                
                return (
                  <tr 
                    key={row.team.id} 
                    className={`border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors ${rowBorder}`}
                  >
                    <td className={`py-3 px-4 font-bold ${positionClass}`}>
                      {position}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{row.team.logo}</span>
                        <div>
                          <span className="text-white font-medium">{row.team.name}</span>
                          {isPromoted && (
                            <span className="ml-2 text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">
                              PROMOTED
                            </span>
                          )}
                          {row.team.trophies && row.team.trophies.league > 0 && (
                            <span className="text-yellow-500 text-xs ml-1" title={`${row.team.trophies.league} league titles`}>
                              🏆{row.team.trophies.league}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center text-slate-300">{row.stats.played}</td>
                    <td className="py-3 px-2 text-center text-green-400 font-medium">{row.stats.wins}</td>
                    <td className="py-3 px-2 text-center text-slate-400">{row.stats.draws}</td>
                    <td className="py-3 px-2 text-center text-red-400">{row.stats.losses}</td>
                    <td className="py-3 px-2 text-center text-slate-300">{row.stats.goalsFor}</td>
                    <td className="py-3 px-2 text-center text-slate-400">{row.stats.goalsAgainst}</td>
                    <td className={`py-3 px-2 text-center font-medium ${
                      gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {gd > 0 ? `+${gd}` : gd}
                    </td>
                    <td className="py-3 px-2 text-center text-white font-bold text-lg">
                      {row.stats.points}
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <div className="flex gap-1 justify-center">
                        {row.stats.form.slice(0, 5).map((result, idx) => (
                          <span
                            key={idx}
                            className={`w-5 h-5 flex items-center justify-center rounded text-xs font-bold text-white ${formColors[result]}`}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Legend */}
      <div className="p-4 border-t border-slate-700 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-slate-400">Champions League</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-slate-400">Europa League</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-slate-400">Relegation Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">PROMOTED</span>
          <span className="text-slate-400">From Championship 2024/25</span>
        </div>
      </div>
      
      {/* Data note */}
      <div className="p-4 border-t border-slate-700 bg-slate-900/50">
        <p className="text-slate-500 text-xs">
          📊 Projected standings based on historical performance analysis from 2020/21 to 2024/25 seasons.
          Actual standings will update as the 2025/26 season progresses.
        </p>
      </div>
    </div>
  );
}
