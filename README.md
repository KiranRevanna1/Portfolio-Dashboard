# 📊 Portfolio Dashboard

A **Portfolio Dashboard MVP** built with **Next.js, TypeScript, TailwindCSS, Node.js, and Recharts**.  
This project was developed as part of an interview assignment to demonstrate **full-stack engineering, clean code, and UI/UX polish**.

---

## 🚀 Features

- **Portfolio Table** – Displays stock details with live CMP, P/E ratio, and latest earnings  
- **Sector Summary** – Groups by sector with Investment, Present Value, Gain/Loss, and Portfolio %  
- **Charts** –  
  - Pie Chart → Sector allocation  
  - Bar Chart → Gain/Loss by stock  
- **Live Data** – CMP, P/E, and earnings fetched from **Yahoo Finance** (via `yahoo-finance2` library)  
- **Auto Refresh** – Data refreshes every 15 seconds  
- **Error Handling** – Loading indicators, fallbacks (`N/A`), and error banners for failed API calls  
- **Responsive UI** – Modern, card-based design with TailwindCSS (works on desktop & mobile)  

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React + TypeScript)  
- **Backend**: Node.js (via Next.js API routes)  
- **UI Framework**: TailwindCSS  
- **Charts**: Recharts  
- **Data Source**: Yahoo Finance (`yahoo-finance2` npm package)  

---

## 📂 Project Structure

portfolio-dashboard/
┣ pages/
┃ ┣ index.tsx # Main dashboard (fetches live data, renders components)
┃ ┣ api/
┃ ┃ ┗ price/[symbol].ts # API route → fetch CMP, P/E ratio, Earnings from Yahoo
┣ components/
┃ ┣ PortfolioTable.tsx # Stock-level table
┃ ┣ SectorSummary.tsx # Sector-wise aggregation
┃ ┣ SectorPieChart.tsx # Sector allocation pie chart
┃ ┗ GainLossBarChart.tsx # Stock gain/loss bar chart
┣ data/
┃ ┗ stocks.json # Sample static portfolio (used as baseline)
┣ styles/ # Tailwind setup
┗ README.md


---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/portfolio-dashboard.git
cd portfolio-dashboard

2. Install Dependencies
npm install

3. Run Development Server
npm run dev


Now open http://localhost:3000
 🚀

🌐 Deployment (Vercel)

Push your repo to GitHub.

Go to Vercel
, click New Project, and import your repo.

Use defaults (Next.js optimized out of the box).

Deploy → you’ll get a live link like:

https://portfolio-dashboard.vercel.app/