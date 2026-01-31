import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveMatches } from './components/LiveMatches';
import { UpcomingMatches } from './components/UpcomingMatches';
import { TeamSelector } from './components/TeamSelector';
import { TeamStats } from './components/TeamStats';
import { HeadToHead } from './components/HeadToHead';
import { StatsComparison } from './components/StatsComparison';
import { PredictionPanel } from './components/PredictionPanel';
import { PlayerStats } from './components/PlayerStats';
import { BettingTips } from './components/BettingTips';
import { LeagueStandings } from './components/LeagueStandings';
import { Disclaimer } from './components/Disclaimer';
import { Match, Team } from './types/football';
import { getTeamStats, leagues, teamStatsMap } from './data/leagues';
import { getHeadToHead } from './data/fixtures';
import { calculatePrediction } from './utils/predictionEngine';
import { initializeTeamStats } from './data/historicalData';

export function App() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [customHomeTeam, setCustomHomeTeam] = useState<Team | null>(null);
  const [customAwayTeam, setCustomAwayTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState<'fixtures' | 'custom' | 'standings'>('fixtures');
  const [selectedLeague, setSelectedLeague] = useState(39);
  const [dataReady, setDataReady] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    initializeTeamStats();
    setDataReady(true);
  }, []);

  // Determine which teams to analyze
  const homeTeam = activeTab === 'fixtures' ? selectedMatch?.homeTeam : customHomeTeam;
  const awayTeam = activeTab === 'fixtures' ? selectedMatch?.awayTeam : customAwayTeam;

  // Calculate prediction when both teams are selected
  const analysis = useMemo(() => {
    if (!homeTeam || !awayTeam || !dataReady) return null;

    const homeStats = getTeamStats(homeTeam.id) || teamStatsMap.get(homeTeam.id);
    const awayStats = getTeamStats(awayTeam.id) || teamStatsMap.get(awayTeam.id);
    
    if (!homeStats || !awayStats) return null;

    const h2h = getHeadToHead(homeTeam.id, awayTeam.id);
    const prediction = calculatePrediction(homeStats, awayStats, h2h);

    return { homeStats, awayStats, h2h, prediction };
  }, [homeTeam, awayTeam, dataReady]);

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    setActiveTab('fixtures');
  };

  if (!dataReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">⚽</div>
          <p className="text-white text-xl">Loading Football Data...</p>
          <p className="text-slate-400 text-sm mt-2">Analyzing 5 seasons of historical data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Season Info Banner */}
        <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-xl p-4 mb-6 border border-emerald-500/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-white font-bold text-lg">🏆 2025/26 Season</h2>
              <p className="text-slate-300 text-sm">Predictions based on 2020-2025 historical data</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <div className="text-emerald-400 font-bold">5</div>
                <div className="text-slate-400">Major Leagues</div>
              </div>
              <div className="text-center">
                <div className="text-emerald-400 font-bold">98</div>
                <div className="text-slate-400">Teams</div>
              </div>
              <div className="text-center">
                <div className="text-emerald-400 font-bold">5 Years</div>
                <div className="text-slate-400">Historical Data</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('fixtures')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'fixtures'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            📅 Fixtures 2025/26
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'custom'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            🔄 Custom Analysis
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'standings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            🏆 League Tables
          </button>
        </div>

        {activeTab === 'standings' ? (
          <div className="space-y-6">
            {/* League Selector */}
            <div className="flex flex-wrap gap-2">
              {leagues.map(league => (
                <button
                  key={league.id}
                  onClick={() => setSelectedLeague(league.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedLeague === league.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {league.flag} {league.name}
                </button>
              ))}
            </div>
            <LeagueStandings leagueId={selectedLeague} />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Live & Selection */}
            <div className="space-y-6">
              <LiveMatches />
              
              {activeTab === 'fixtures' ? (
                <UpcomingMatches
                  onSelectMatch={handleMatchSelect}
                  selectedMatchId={selectedMatch?.id}
                />
              ) : (
                <TeamSelector
                  selectedHome={customHomeTeam}
                  selectedAway={customAwayTeam}
                  onSelectHome={setCustomHomeTeam}
                  onSelectAway={setCustomAwayTeam}
                />
              )}
            </div>

            {/* Middle & Right Columns - Analysis */}
            {homeTeam && awayTeam && analysis ? (
              <>
                {/* Middle Column */}
                <div className="space-y-6">
                  {/* Match Header */}
                  <div className="bg-gradient-to-r from-blue-600/20 via-slate-800/50 to-red-600/20 rounded-2xl p-6 border border-slate-700">
                    <div className="text-center mb-4">
                      <span className="text-emerald-400 text-sm font-medium">
                        {homeTeam.league} • 2025/26 Season
                      </span>
                      {selectedMatch && activeTab === 'fixtures' && (
                        <div className="text-slate-400 text-sm mt-1">
                          {selectedMatch.date} • {selectedMatch.time}
                          {selectedMatch.matchweek && (
                            <span className="ml-2 text-xs bg-slate-700 px-2 py-0.5 rounded">
                              Matchweek {selectedMatch.matchweek}
                            </span>
                          )}
                          {selectedMatch.venue && (
                            <span className="block text-xs mt-1">📍 {selectedMatch.venue}</span>
                          )}
                          {selectedMatch.tvChannel && (
                            <span className="block text-xs mt-1 text-blue-400">📺 {selectedMatch.tvChannel}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="text-5xl mb-2">{homeTeam.logo}</div>
                        <h2 className="text-white font-bold text-lg">{homeTeam.name}</h2>
                        <span className="text-blue-400 text-sm">HOME</span>
                        {homeTeam.trophies && (
                          <div className="text-xs text-slate-400 mt-1">
                            🏆 {homeTeam.trophies.league} Leagues
                          </div>
                        )}
                      </div>
                      <div className="px-6">
                        <span className="text-4xl text-slate-500 font-bold">VS</span>
                      </div>
                      <div className="text-center flex-1">
                        <div className="text-5xl mb-2">{awayTeam.logo}</div>
                        <h2 className="text-white font-bold text-lg">{awayTeam.name}</h2>
                        <span className="text-red-400 text-sm">AWAY</span>
                        {awayTeam.trophies && (
                          <div className="text-xs text-slate-400 mt-1">
                            🏆 {awayTeam.trophies.league} Leagues
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Prediction Panel */}
                  <PredictionPanel
                    prediction={analysis.prediction}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                  />

                  {/* Stats Comparison */}
                  <StatsComparison
                    homeStats={analysis.homeStats}
                    awayStats={analysis.awayStats}
                    homeShortName={homeTeam.shortName}
                    awayShortName={awayTeam.shortName}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <HeadToHead
                    h2h={analysis.h2h}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                  />

                  <div className="grid gap-4">
                    <TeamStats team={homeTeam} stats={analysis.homeStats} isHome={true} />
                    <TeamStats team={awayTeam} stats={analysis.awayStats} isHome={false} />
                  </div>

                  <PlayerStats teamId={homeTeam.id} teamName={homeTeam.shortName} />
                  <PlayerStats teamId={awayTeam.id} teamName={awayTeam.shortName} />

                  <BettingTips
                    prediction={analysis.prediction}
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                  />
                </div>
              </>
            ) : (
              <div className="lg:col-span-2 flex items-center justify-center">
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">⚽</div>
                  <h2 className="text-2xl font-bold text-white mb-2">Select a Match to Analyze</h2>
                  <p className="text-slate-400">
                    {activeTab === 'fixtures'
                      ? 'Choose a 2025/26 fixture from the list to see predictions and analysis'
                      : 'Select two teams to compare and get AI-powered predictions'}
                  </p>
                  <div className="mt-4 text-sm text-slate-500">
                    Predictions powered by 5 years of historical data (2020-2025)
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <Disclaimer />

        {/* Data Source Info */}
        <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-slate-300 font-medium mb-2 flex items-center gap-2">
            <span>📊</span> Data Sources & Accuracy
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-400">
            <div>
              <div className="text-emerald-400 font-medium">Historical Analysis</div>
              <p>5 complete seasons (2020/21 - 2024/25) analyzed for each team</p>
            </div>
            <div>
              <div className="text-emerald-400 font-medium">Player Transfers</div>
              <p>Updated with Summer 2025 transfers (e.g., De Bruyne → Napoli)</p>
            </div>
            <div>
              <div className="text-emerald-400 font-medium">Promotions/Relegations</div>
              <p>2025/26: Leeds, Burnley, Sheffield Utd promoted to PL</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-slate-700 text-center">
          <p className="text-slate-500 text-sm">
            FootballPredictor Pro © 2025 | AI-Powered Match Analysis
          </p>
          <p className="text-slate-600 text-xs mt-2">
            📊 6 Leagues • 98+ Teams • 2025/26 Season • Updated {new Date().toLocaleDateString()}
          </p>
        </footer>
      </main>
    </div>
  );
}
