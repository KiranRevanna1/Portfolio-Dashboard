import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type Stock = {
  purchasePrice: number;
  quantity: number;
  sector: string;
  cmp?: number;
};

interface Props {
  stocks: Stock[];
}

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]; 
// Indigo, Green, Amber, Red, Violet

export default function SectorPieChart({ stocks }: Props) {
  // Calculate sector totals
  const sectorData = Object.values(
    stocks.reduce<Record<string, { name: string; value: number }>>((acc, stock) => {
      const investment = stock.purchasePrice * stock.quantity;
      if (!acc[stock.sector]) {
        acc[stock.sector] = { name: stock.sector, value: 0 };
      }
      acc[stock.sector].value += investment;
      return acc;
    }, {})
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Sector Allocation</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={sectorData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {sectorData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
