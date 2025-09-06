import { useEffect, useState } from "react";
import PortfolioTable from "@/components/PortfolioTable";
import SectorSummary from "@/components/SectorSummary";
import SectorPieChart from "@/components/SectorPieChart";
import GainLossBarChart from "@/components/GainLossBarChart";
import data from "@/data/stocks.json";

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

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const updated = await Promise.all(
          data.map(async (stock) => {
            try {
              const res = await fetch(`/api/price/${stock.symbol}`);
              if (!res.ok) throw new Error(`Failed for ${stock.symbol}`);
              const apiData = await res.json();
              return {
                ...stock,
                cmp: apiData.price,
                peRatio: apiData.peRatio,
                latestEarnings: apiData.latestEarnings,
              };
            } catch (err) {
              console.error("Error fetching:", stock.symbol, err);
              return stock; // fallback to purchasePrice
            }
          })
        );

        setStocks(updated);
      } catch {
        setError("⚠ Failed to fetch stock data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      {loading && <div className="text-blue-600 mb-2">🔄 Loading live data...</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <PortfolioTable stocks={stocks} />
      <SectorSummary stocks={stocks} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <SectorPieChart stocks={stocks} />
        <GainLossBarChart stocks={stocks} />
      </div>
    </div>
  );
}
