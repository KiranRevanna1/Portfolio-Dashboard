import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

type Stock = {
  name: string;
  purchasePrice: number;
  quantity: number;
  cmp?: number;
};

interface Props {
  stocks: Stock[];
}

export default function GainLossBarChart({ stocks }: Props) {
  const data = stocks.map((s) => {
    const investment = s.purchasePrice * s.quantity;
    const cmp = s.cmp ?? s.purchasePrice;
    const presentValue = cmp * s.quantity;
    return {
      name: s.name,
      gainLoss: presentValue - investment,
    };
  });

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Gain/Loss by Stock</h2>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="gainLoss"
          fill="#10B981" // green by default
          isAnimationActive={true}
        />
      </BarChart>
    </div>
  );
}
