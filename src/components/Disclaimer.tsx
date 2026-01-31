export function Disclaimer() {
  return (
    <div className="mt-6 space-y-4">
      {/* Responsible Gambling */}
      <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="text-amber-400 font-medium mb-1">Responsible Gambling Disclaimer</h4>
            <p className="text-amber-200/70 text-sm">
              These predictions are based on statistical analysis and historical data only. No prediction can guarantee 
              a win. Gambling involves risk and you may lose money. Always gamble responsibly and only bet what you can 
              afford to lose. If you or someone you know has a gambling problem, please seek help. 18+ only.
            </p>
          </div>
        </div>
      </div>

      {/* Data Transparency */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <h4 className="text-blue-400 font-medium mb-1">Data Transparency</h4>
            <p className="text-blue-200/70 text-sm">
              Our predictions use real historical data from the 2020/21 to 2024/25 seasons. Team statistics, head-to-head 
              records, and player data are based on actual past performance. The 2025/26 projections are estimates based on 
              this historical analysis. We do not use fake or simulated data - all information is drawn from real matches.
            </p>
          </div>
        </div>
      </div>

      {/* Limitations */}
      <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h4 className="text-slate-300 font-medium mb-1">Prediction Limitations</h4>
            <ul className="text-slate-400 text-sm space-y-1 list-disc list-inside">
              <li>Football is unpredictable - upsets happen regularly</li>
              <li>Injuries, suspensions, and team news can significantly impact results</li>
              <li>New signings and managers may change team performance</li>
              <li>Our model uses historical data which may not reflect current form</li>
              <li>Weather, crowd, and other factors are not accounted for</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
