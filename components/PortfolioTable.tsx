type Stock = {
  name: string;
  purchasePrice: number;
  quantity: number;
  exchange: string;
  sector: string;
  symbol: string;
  cmp?: number;
  peRatio?: number;
  latestEarnings?: string;
};

interface Props {
  stocks: Stock[];
}

export default function PortfolioTable({ stocks }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Portfolio Dashboard</h2>
      <table className="w-full border-collapse text-sm">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-2">Stock</th>
            <th className="p-2">Purchase Price</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Investment</th>
            <th className="p-2">CMP</th>
            <th className="p-2">Present Value</th>
            <th className="p-2">Gain/Loss</th>
            <th className="p-2">P/E Ratio</th>
            <th className="p-2">Latest Earnings</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700 text-center">
          {stocks.map((stock, i) => {
            const investment = stock.purchasePrice * stock.quantity;
            const cmp = stock.cmp ?? stock.purchasePrice;
            const presentValue = cmp * stock.quantity;
            const gainLoss = presentValue - investment;

            return (
              <tr key={i} className="hover:bg-indigo-50 transition-colors">
                <td className="p-2 font-semibold text-gray-700">{stock.name}</td>
                <td className="p-2">{stock.purchasePrice}</td>
                <td className="p-2">{stock.quantity}</td>
                <td className="p-2">{investment.toFixed(2)}</td>
                <td className="p-2">{cmp.toFixed(2)}</td>
                <td className="p-2">{presentValue.toFixed(2)}</td>
                <td
                  className={`p-2 font-bold ${gainLoss >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {gainLoss.toFixed(2)}
                </td>
                <td className="p-2">{stock.peRatio ?? "N/A"}</td>
                <td className="p-2">{stock.latestEarnings ?? "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
