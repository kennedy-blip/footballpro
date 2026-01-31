import { Team } from '../types/football';
import { allTeams, leagues } from '../data/leagues';

interface Props {
  selectedHome: Team | null;
  selectedAway: Team | null;
  onSelectHome: (team: Team) => void;
  onSelectAway: (team: Team) => void;
}

export function TeamSelector({ selectedHome, selectedAway, onSelectHome, onSelectAway }: Props) {
  // Group teams by league
  const teamsByLeague = leagues.map(league => ({
    league,
    teams: allTeams.filter(t => t.leagueId === league.id)
  })).filter(g => g.teams.length > 0);

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <span>🔄</span> Custom Match Analysis
      </h2>
      <p className="text-slate-400 text-sm mb-4">
        Select any two teams from major European leagues to compare
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Home Team Selector */}
        <div>
          <label className="block text-blue-400 text-sm font-medium mb-2">🏠 Home Team</label>
          <div className="relative">
            <select
              value={selectedHome?.id || ''}
              onChange={(e) => {
                const team = allTeams.find((t: Team) => t.id === parseInt(e.target.value));
                if (team) onSelectHome(team);
              }}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none appearance-none cursor-pointer"
            >
              <option value="">Select home team...</option>
              {teamsByLeague.map((group) => (
                <optgroup key={group.league.id} label={`${group.league.flag} ${group.league.name}`}>
                  {group.teams
                    .filter((t: Team) => t.id !== selectedAway?.id)
                    .map((team: Team) => (
                      <option key={team.id} value={team.id}>
                        {team.logo} {team.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {selectedHome && (
            <div className="mt-2 flex items-center gap-2 bg-blue-500/20 rounded-lg p-2 border border-blue-500/30">
              <span className="text-2xl">{selectedHome.logo}</span>
              <div>
                <span className="text-white font-medium">{selectedHome.name}</span>
                <span className="text-slate-400 text-xs block">{selectedHome.league}</span>
              </div>
            </div>
          )}
        </div>

        {/* Away Team Selector */}
        <div>
          <label className="block text-red-400 text-sm font-medium mb-2">✈️ Away Team</label>
          <div className="relative">
            <select
              value={selectedAway?.id || ''}
              onChange={(e) => {
                const team = allTeams.find((t: Team) => t.id === parseInt(e.target.value));
                if (team) onSelectAway(team);
              }}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 outline-none appearance-none cursor-pointer"
            >
              <option value="">Select away team...</option>
              {teamsByLeague.map((group) => (
                <optgroup key={group.league.id} label={`${group.league.flag} ${group.league.name}`}>
                  {group.teams
                    .filter((t: Team) => t.id !== selectedHome?.id)
                    .map((team: Team) => (
                      <option key={team.id} value={team.id}>
                        {team.logo} {team.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {selectedAway && (
            <div className="mt-2 flex items-center gap-2 bg-red-500/20 rounded-lg p-2 border border-red-500/30">
              <span className="text-2xl">{selectedAway.logo}</span>
              <div>
                <span className="text-white font-medium">{selectedAway.name}</span>
                <span className="text-slate-400 text-xs block">{selectedAway.league}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedHome && selectedAway && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-xl px-6 py-3 border border-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedHome.logo}</span>
              <span className="text-white font-bold">{selectedHome.shortName}</span>
            </div>
            <span className="text-slate-400 text-lg font-bold">vs</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{selectedAway.shortName}</span>
              <span className="text-2xl">{selectedAway.logo}</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-2">
            {selectedHome.league === selectedAway.league 
              ? `${selectedHome.league} match` 
              : 'Cross-league comparison'}
          </p>
        </div>
      )}

      {/* Info about available teams */}
      <div className="mt-4 p-3 bg-slate-700/30 rounded-lg text-xs text-slate-400">
        <p>📊 Available: Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Championship</p>
        <p className="mt-1">🔄 Includes 2025/26 promotions & relegations</p>
      </div>
    </div>
  );
}
