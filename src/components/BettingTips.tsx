import { Prediction, Team } from '../types/football';

interface Props {
  prediction: Prediction;
  homeTeam: Team;
  awayTeam: Team;
}

interface Tip {
  type: string;
  pick: string;
  confidence: 'high' | 'medium' | 'low';
  odds: string;
  reasoning: string;
}

export function BettingTips({ prediction, homeTeam, awayTeam }: Props) {
  const tips: Tip[] = [];

  // Main outcome tip
  if (prediction.homeWinProb > 0.45) {
    tips.push({
      type: '1X2',
      pick: `${homeTeam.shortName} to Win`,
      confidence: prediction.homeWinProb > 0.52 ? 'high' : 'medium',
      odds: (1 / prediction.homeWinProb).toFixed(2),
      reasoning: 'Strong home form and statistical advantage'
    });
  } else if (prediction.awayWinProb > 0.38) {
    tips.push({
      type: '1X2',
      pick: `${awayTeam.shortName} to Win`,
      confidence: prediction.awayWinProb > 0.45 ? 'high' : 'medium',
      odds: (1 / prediction.awayWinProb).toFixed(2),
      reasoning: 'Away team showing better current form'
    });
  } else {
    tips.push({
      type: 'Double Chance',
      pick: prediction.homeWinProb > prediction.awayWinProb ? '1X (Home or Draw)' : 'X2 (Draw or Away)',
      confidence: 'medium',
      odds: '1.40',
      reasoning: 'Match too close to call - safer option'
    });
  }

  // Over/Under tip
  if (prediction.over25Prob > 0.58) {
    tips.push({
      type: 'Goals',
      pick: 'Over 2.5 Goals',
      confidence: prediction.over25Prob > 0.65 ? 'high' : 'medium',
      odds: (1 / prediction.over25Prob).toFixed(2),
      reasoning: 'Both teams have high-scoring records'
    });
  } else if (prediction.under25Prob > 0.58) {
    tips.push({
      type: 'Goals',
      pick: 'Under 2.5 Goals',
      confidence: prediction.under25Prob > 0.65 ? 'high' : 'medium',
      odds: (1 / prediction.under25Prob).toFixed(2),
      reasoning: 'Defensive strengths suggest low-scoring match'
    });
  }

  // Over 1.5 Goals (usually safer)
  if (prediction.over15Prob > 0.75) {
    tips.push({
      type: 'Safe Bet',
      pick: 'Over 1.5 Goals',
      confidence: 'high',
      odds: (1 / prediction.over15Prob).toFixed(2),
      reasoning: 'Very likely at least 2 goals will be scored'
    });
  }

  // BTTS tip
  if (prediction.bttsProb > 0.60) {
    tips.push({
      type: 'BTTS',
      pick: 'Both Teams to Score',
      confidence: prediction.bttsProb > 0.70 ? 'high' : 'medium',
      odds: (1 / prediction.bttsProb).toFixed(2),
      reasoning: 'Both teams score regularly'
    });
  } else if (prediction.bttsNoProb > 0.55) {
    tips.push({
      type: 'BTTS',
      pick: 'BTTS - No',
      confidence: prediction.bttsNoProb > 0.65 ? 'high' : 'medium',
      odds: (1 / prediction.bttsNoProb).toFixed(2),
      reasoning: 'Strong defensive record suggests a clean sheet'
    });
  }

  const confidenceColors = {
    high: 'border-green-500 bg-green-500/10',
    medium: 'border-yellow-500 bg-yellow-500/10',
    low: 'border-red-500 bg-red-500/10'
  };

  const badgeColors = {
    high: 'bg-green-500',
    medium: 'bg-yellow-500',
    low: 'bg-red-500'
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <span>💰</span> Betting Tips Summary
      </h3>

      <div className="space-y-3">
        {tips.map((tip, idx) => (
          <div 
            key={idx} 
            className={`rounded-lg p-4 border-l-4 ${confidenceColors[tip.confidence]}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-slate-400 text-xs">{tip.type}</span>
                <div className="text-white font-bold">{tip.pick}</div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded text-xs font-medium text-white ${badgeColors[tip.confidence]}`}>
                  {tip.confidence.toUpperCase()}
                </span>
                <div className="text-emerald-400 font-bold mt-1">@{tip.odds}</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">{tip.reasoning}</p>
          </div>
        ))}
      </div>

      {/* Value Odds Section */}
      {prediction.valueOdds && prediction.valueOdds.length > 0 && (
        <div className="mt-4 p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
          <h4 className="text-emerald-400 text-sm font-medium mb-2">💎 Value Odds</h4>
          <div className="grid grid-cols-2 gap-2">
            {prediction.valueOdds.map((vo, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-slate-300">{vo.type}</span>
                <span className="text-emerald-400 font-bold">@{vo.suggestedOdds}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Suggested Stake</span>
          <span className="text-white font-medium">
            {prediction.confidence === 'high' ? '2-3 units' : 
             prediction.confidence === 'medium' ? '1-2 units' : '0.5-1 unit'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-slate-400">Prediction Confidence</span>
          <span className={`font-medium ${
            prediction.confidence === 'high' ? 'text-green-400' :
            prediction.confidence === 'medium' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {prediction.confidence.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
