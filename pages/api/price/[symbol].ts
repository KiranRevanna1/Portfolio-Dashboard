import { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { symbol } = req.query;

        if (!symbol) {
            return res.status(400).json({ error: "Symbol is required" });
        }

        const quote = await yahooFinance.quote(symbol as string);

        res.status(200).json({
            price: quote.regularMarketPrice,
            peRatio: quote.trailingPE,
            latestEarnings: quote.earningsTimestamp
                ? (typeof quote.earningsTimestamp === "number"
                    ? new Date(quote.earningsTimestamp * 1000).toDateString()
                    : new Date(quote.earningsTimestamp).toDateString())
                : "N/A",

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
