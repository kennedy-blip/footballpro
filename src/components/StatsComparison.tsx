import { TeamStats } from '../types/football';

interface Props {
  homeStats: TeamStats;
  awayStats: TeamStats;
  homeShortName: string;
  awayShortName: string;
}

export function StatsComparison({ homeStats, awayStats, homeShortName, awayShortName }: Props) {
  const stats = [
    { 
      label: 'Win Rate', 
      home: (homeStats.wins / homeStats.played * 100).toFixed(1), 
      away: (awayStats.wins / awayStats.played * 100).toFixed(1), 
      suffix: '%' 
    },
    { 
      label: 'Goals/Game', 
      home: homeStats.avgGoalsScored.toFixed(2), 
      away: awayStats.avgGoalsScored.toFixed(2) 
    },
    { 
      label: 'Conceded/Game', 
      home: homeStats.avgGoalsConceded.toFixed(2), 
      away: awayStats.avgGoalsConceded.toFixed(2), 
      inverted: true 
    },
    { 
      label: 'Clean Sheet %', 
      home: (homeStats.cleanSheets / homeStats.played * 100).toFixed(1), 
      away: (awayStats.cleanSheets / awayStats.played * 100).toFixed(1), 
      suffix: '%' 
    },
    { 
      label: 'Home/Away Win %', 
      home: homeStats.homePlayed > 0 ? (homeStats.homeWins / homeStats.homePlayed * 100).toFixed(1) : '0', 
      away: awayStats.awayPlayed > 0 ? (awayStats.awayWins / awayStats.awayPlayed * 100).toFixed(1) : '0',
      suffix: '%'
    },
    {
      label: 'Points',
      home: homeStats.points.toString(),
      away: awayStats.points.toString()
    },
  ];

  return (
    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <span>📊</span> Stats Comparison
      </h3>

      <div className="flex justify-between text-sm mb-4 px-2">
        <span className="text-blue-400 font-medium">{homeShortName}</span>
        <span className="text-red-400 font-medium">{awayShortName}</span>
      </div>

      <div className="space-y-4">
        {stats.map((stat, idx) => {
          const homeVal = parseFloat(stat.home);
          const awayVal = parseFloat(stat.away);
          const total = homeVal + awayVal;
          const homePercent = total > 0 ? (homeVal / total * 100) : 50;
          const awayPercent = total > 0 ? (awayVal / total * 100) : 50;
          
          const homeWins = stat.inverted ? awayVal > homeVal : homeVal > awayVal;
          const awayWins = stat.inverted ? homeVal > awayVal : awayVal > homeVal;

          return (
            <div key={idx}>
              <div className="flex justify-between text-xs mb-1">
                <span className={`font-medium ${homeWins ? 'text-green-400' : 'text-slate-400'}`}>
                  {stat.home}{stat.suffix || ''}
                </span>
                <span className="text-slate-500">{stat.label}</span>
                <span className={`font-medium ${awayWins ? 'text-green-400' : 'text-slate-400'}`}>
                  {stat.away}{stat.suffix || ''}
                </span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden bg-slate-700">
                <div 
                  className={`transition-all duration-500 ${homeWins ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{ width: `${homePercent}%` }}
                />
                <div 
                  className={`transition-all duration-500 ${awayWins ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${awayPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
