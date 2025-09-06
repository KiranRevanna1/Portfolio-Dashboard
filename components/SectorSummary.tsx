type Stock = {
  name: string;
  purchasePrice: number;
  quantity: number;
  sector: string;
  cmp?: number;
};

interface Props {
  stocks: Stock[];
}

export default function SectorSummary({ stocks }: Props) {
  // Group by sector
  const grouped = stocks.reduce<Record<string, Stock[]>>((acc, stock) => {
    if (!acc[stock.sector]) acc[stock.sector] = [];
    acc[stock.sector].push(stock);
    return acc;
  }, {});

  const totalInvestment = stocks.reduce(
    (sum, s) => sum + s.purchasePrice * s.quantity,
    0
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Sector Summary</h2>
      <table className="w-full border-collapse text-sm">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-2">Sector</th>
            <th className="p-2">Investment</th>
            <th className="p-2">Present Value</th>
            <th className="p-2">Gain/Loss</th>
            <th className="p-2">Portfolio %</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700 text-center">
          {Object.entries(grouped).map(([sector, list], i) => {
            const investment = list.reduce(
              (sum, s) => sum + s.purchasePrice * s.quantity,
              0
            );
            const presentValue = list.reduce(
              (sum, s) => sum + (s.cmp ?? s.purchasePrice) * s.quantity,
              0
            );
            const gainLoss = presentValue - investment;
            const percent = ((investment / totalInvestment) * 100).toFixed(2);

            return (
              <tr key={i} className="hover:bg-indigo-50 transition-colors">
                <td className="p-2 font-semibold text-gray-700">{sector}</td>
                <td className="p-2">{investment.toFixed(2)}</td>
                <td className="p-2">{presentValue.toFixed(2)}</td>
                <td
                  className={`p-2 font-bold ${gainLoss >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {gainLoss.toFixed(2)}
                </td>
                <td className="p-2">{percent}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
