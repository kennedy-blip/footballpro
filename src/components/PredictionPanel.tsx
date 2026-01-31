import { Prediction, Team } from '../types/football';

interface Props {
  prediction: Prediction;
  homeTeam: Team;
  awayTeam: Team;
}

export function PredictionPanel({ prediction, homeTeam, awayTeam }: Props) {
  const confidenceStyles = {
    high: 'bg-green-500/20 text-green-400 border-green-500',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
    low: 'bg-red-500/20 text-red-400 border-red-500',
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 rounded-2xl p-6 border border-emerald-500/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🎯</span> AI Prediction
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${confidenceStyles[prediction.confidence]}`}>
          {prediction.confidence.toUpperCase()} CONFIDENCE
        </span>
      </div>

      {/* Win Probabilities */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-blue-400 font-medium">{homeTeam.shortName} Win</span>
          <span className="text-slate-400">Draw</span>
          <span className="text-red-400 font-medium">{awayTeam.shortName} Win</span>
        </div>
        <div className="flex h-8 rounded-xl overflow-hidden shadow-lg">
          <div 
            className="bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center transition-all duration-700"
            style={{ width: `${prediction.homeWinProb * 100}%` }}
          >
            <span className="text-white text-sm font-bold">{Math.round(prediction.homeWinProb * 100)}%</span>
          </div>
          <div 
            className="bg-gradient-to-r from-slate-500 to-slate-400 flex items-center justify-center transition-all duration-700"
            style={{ width: `${prediction.drawProb * 100}%` }}
          >
            <span className="text-white text-sm font-bold">{Math.round(prediction.drawProb * 100)}%</span>
          </div>
          <div 
            className="bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center transition-all duration-700"
            style={{ width: `${prediction.awayWinProb * 100}%` }}
          >
            <span className="text-white text-sm font-bold">{Math.round(prediction.awayWinProb * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Predicted Score */}
      <div className="bg-slate-800/80 rounded-xl p-4 mb-6">
        <h4 className="text-slate-400 text-sm text-center mb-3">Predicted Score</h4>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <span className="text-3xl mb-2">{homeTeam.logo}</span>
            <div className="text-4xl font-bold text-white">{prediction.predictedScore.home}</div>
          </div>
          <span className="text-2xl text-slate-500">-</span>
          <div className="text-center">
            <span className="text-3xl mb-2">{awayTeam.logo}</span>
            <div className="text-4xl font-bold text-white">{prediction.predictedScore.away}</div>
          </div>
        </div>
      </div>

      {/* All Goals Markets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <div className="bg-slate-700/50 rounded-xl p-3 text-center">
          <div className="text-slate-400 text-xs mb-1">Over 1.5</div>
          <div className={`text-lg font-bold ${prediction.over15Prob > 0.65 ? 'text-green-400' : 'text-slate-300'}`}>
            {Math.round(prediction.over15Prob * 100)}%
          </div>
        </div>
        <div className="bg-slate-700/50 rounded-xl p-3 text-center">
          <div className="text-slate-400 text-xs mb-1">Over 2.5</div>
          <div className={`text-lg font-bold ${prediction.over25Prob > 0.55 ? 'text-green-400' : 'text-slate-300'}`}>
            {Math.round(prediction.over25Prob * 100)}%
          </div>
          {prediction.over25Prob > 0.55 && (
            <div className="text-green-400 text-xs mt-1">✓ Recommended</div>
          )}
        </div>
        <div className="bg-slate-700/50 rounded-xl p-3 text-center">
          <div className="text-slate-400 text-xs mb-1">Under 2.5</div>
          <div className={`text-lg font-bold ${prediction.under25Prob > 0.55 ? 'text-green-400' : 'text-slate-300'}`}>
            {Math.round(prediction.under25Prob * 100)}%
          </div>
          {prediction.under25Prob > 0.55 && (
            <div className="text-green-400 text-xs mt-1">✓ Recommended</div>
          )}
        </div>
        <div className="bg-slate-700/50 rounded-xl p-3 text-center">
          <div className="text-slate-400 text-xs mb-1">Over 3.5</div>
          <div className={`text-lg font-bold ${prediction.over35Prob > 0.45 ? 'text-green-400' : 'text-slate-300'}`}>
            {Math.round(prediction.over35Prob * 100)}%
          </div>
        </div>
      </div>

      {/* BTTS */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className={`bg-slate-700/50 rounded-xl p-3 text-center border ${prediction.bttsProb > 0.55 ? 'border-green-500/50' : 'border-transparent'}`}>
          <div className="text-slate-400 text-xs mb-1">BTTS - Yes</div>
          <div className={`text-xl font-bold ${prediction.bttsProb > 0.55 ? 'text-green-400' : 'text-slate-300'}`}>
            {Math.round(prediction.bttsProb * 100)}%
          </div>
          {prediction.bttsProb > 0.60 && (
            <div className="text-green-400 text-xs mt-1">✓ Likely</div>
          )}
        </div>
        <div className={`bg-slate-700/50 rounded-xl p-3 text-center border ${prediction.bttsNoProb > 0.50 ? 'border-yellow-500/50' : 'border-transparent'}`}>
          <div className="text-slate-400 text-xs mb-1">BTTS - No</div>
          <div className={`text-xl font-bold ${prediction.bttsNoProb > 0.50 ? 'text-yellow-400' : 'text-slate-300'}`}>
            {Math.round(prediction.bttsNoProb * 100)}%
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-xl p-4 border border-emerald-500/30">
        <h4 className="text-emerald-400 font-medium mb-2 flex items-center gap-2">
          <span>💡</span> Betting Recommendation
        </h4>
        <p className="text-white text-sm leading-relaxed">{prediction.recommendation}</p>
      </div>

      {/* Quick Bets */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className={`p-3 rounded-lg text-center border ${
          prediction.homeWinProb >= prediction.awayWinProb && prediction.homeWinProb >= prediction.drawProb
            ? 'bg-emerald-600/30 border-emerald-500'
            : 'bg-slate-700/50 border-slate-600'
        }`}>
          <div className="text-xs text-slate-400 mb-1">1X2 Pick</div>
          <div className="text-white font-bold">
            {prediction.homeWinProb >= prediction.awayWinProb && prediction.homeWinProb >= prediction.drawProb
              ? `${homeTeam.shortName} Win`
              : prediction.awayWinProb > prediction.drawProb
                ? `${awayTeam.shortName} Win`
                : 'Draw'}
          </div>
        </div>
        <div className={`p-3 rounded-lg text-center border ${
          prediction.over25Prob > 0.55 || prediction.under25Prob > 0.55
            ? 'bg-emerald-600/30 border-emerald-500'
            : 'bg-slate-700/50 border-slate-600'
        }`}>
          <div className="text-xs text-slate-400 mb-1">Goals Pick</div>
          <div className="text-white font-bold">
            {prediction.over25Prob > prediction.under25Prob ? 'Over 2.5' : 'Under 2.5'}
          </div>
        </div>
      </div>
    </div>
  );
}
