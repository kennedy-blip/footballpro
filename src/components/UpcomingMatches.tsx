import { useState } from 'react';
import { Match } from '../types/football';
import { upcomingMatches } from '../data/fixtures';
import { leagues } from '../data/leagues';

interface Props {
  onSelectMatch: (match: Match) => void;
  selectedMatchId?: number;
}

export function UpcomingMatches({ onSelectMatch, selectedMatchId }: Props) {
  const [filterLeague, setFilterLeague] = useState<number | null>(null);

  const filteredMatches = filterLeague 
    ? upcomingMatches.filter(m => m.leagueId === filterLeague)
    : upcomingMatches;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <span>📅</span> 2025/26 Season Fixtures
      </h2>
      <p className="text-slate-400 text-sm mb-4">
        Scheduled matches • Click to analyze
      </p>
      
      {/* League Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilterLeague(null)}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            filterLeague === null
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          All
        </button>
        {leagues.slice(0, 5).map(league => (
          <button
            key={league.id}
            onClick={() => setFilterLeague(league.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filterLeague === league.id
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {league.flag} {league.name.split(' ')[0]}
          </button>
        ))}
      </div>
      
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400">No fixtures found for this league</p>
          </div>
        ) : (
          filteredMatches.map((match: Match) => (
            <button
              key={match.id}
              onClick={() => onSelectMatch(match)}
              className={`w-full p-4 rounded-xl transition-all duration-200 ${
                selectedMatchId === match.id
                  ? 'bg-emerald-600/30 border-emerald-500 ring-2 ring-emerald-500'
                  : 'bg-slate-700/50 hover:bg-slate-700 border-slate-600'
              } border`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-400 font-medium">{match.league}</span>
                  {match.matchweek && (
                    <span className="text-xs bg-slate-600 px-2 py-0.5 rounded text-slate-300">
                      MW {match.matchweek}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">{formatDate(match.date)}</span>
                  <span className="text-xs text-slate-500 ml-2">{match.time}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xl">{match.homeTeam.logo}</span>
                  <span className="text-white font-medium text-sm">{match.homeTeam.name}</span>
                </div>
                <span className="text-slate-500 text-sm px-3">vs</span>
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <span className="text-white font-medium text-sm">{match.awayTeam.name}</span>
                  <span className="text-xl">{match.awayTeam.logo}</span>
                </div>
              </div>
              {match.venue && (
                <div className="mt-2 text-xs text-slate-500 text-left">
                  📍 {match.venue}
                </div>
              )}
              {match.tvChannel && (
                <div className="mt-1 text-xs text-blue-400 text-left">
                  📺 {match.tvChannel}
                </div>
              )}
            </button>
          ))
        )}
      </div>
      
      {/* Info about fixture times */}
      <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
        <p className="text-slate-400 text-xs">
          ⏰ All times shown in local venue time. Season starts August 15, 2025.
        </p>
      </div>
    </div>
  );
}
