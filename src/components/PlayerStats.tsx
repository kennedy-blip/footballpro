import { Player } from '../types/football';
import { getPlayers } from '../data/fixtures';

interface Props {
  teamId: number;
  teamName: string;
}

export function PlayerStats({ teamId, teamName }: Props) {
  const teamPlayers = getPlayers(teamId);

  if (teamPlayers.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <span>👤</span> Key Players - {teamName}
      </h3>
      <p className="text-slate-400 text-xs mb-3">2024/25 Stats • Updated with Summer 2025 Transfers</p>

      <div className="space-y-3">
        {teamPlayers.map((player: Player) => (
          <div key={player.id} className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-white font-medium">{player.name}</span>
                {player.number && (
                  <span className="text-slate-500 text-xs ml-1">#{player.number}</span>
                )}
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-slate-400 text-sm">{player.position}</span>
                  {player.nationality && (
                    <span className="text-slate-500 text-xs">• {player.nationality}</span>
                  )}
                  {player.age && (
                    <span className="text-slate-500 text-xs">• {player.age} yrs</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white font-medium">{player.rating}</span>
                </div>
                {player.marketValue && (
                  <span className="text-emerald-400 text-xs">€{player.marketValue}</span>
                )}
              </div>
            </div>
            
            {/* Transfer Info */}
            {player.previousClubs && player.previousClubs.length > 0 && (
              <div className="mb-2 p-2 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-blue-400 text-xs font-medium">🔄 New Signing</div>
                <div className="text-slate-300 text-xs">
                  From: {player.previousClubs[0]}
                  {player.joinedDate && <span className="text-slate-500"> • Joined {player.joinedDate}</span>}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-slate-800/50 rounded p-1.5">
                <div className="text-emerald-400 font-bold">{player.goals}</div>
                <div className="text-slate-500 text-xs">Goals</div>
              </div>
              <div className="bg-slate-800/50 rounded p-1.5">
                <div className="text-blue-400 font-bold">{player.assists}</div>
                <div className="text-slate-500 text-xs">Assists</div>
              </div>
              <div className="bg-slate-800/50 rounded p-1.5">
                <div className="text-slate-300 font-bold">{player.appearances}</div>
                <div className="text-slate-500 text-xs">Apps</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-slate-500 text-center">
        Stats from 2024/25 season • All competitions
      </div>
    </div>
  );
}
