import { Card } from "flowbite-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";

const Home = () => {
  const assetAllocationData = [
    { name: "Stocks", value: 500 },
    { name: "Cash", value: 500 },
    { name: "Real Estate", value: 500 },
    { name: "Other", value: 2000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const growthOverTime = [
    { month: "Jan", value: 1000 },
    { month: "Mar", value: 4000 },
    { month: "June", value: 8000 },
    { month: "Nov", value: 10000 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Manage Your Wealth with Ease</h2>
          <p className="mt-4 text-lg">
            Track your portfolio, optimize your investments, and achieve your
            financial goals.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-600">
              Portfolio Overview
            </h3>
            <p className="mt-2 text-gray-600">
              View your asset allocation and performance at a glance.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-600">
              Insights & Analytics
            </h3>
            <p className="mt-2 text-gray-600">
              Get actionable insights into your investments.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-600">
              Real-Time Updates
            </h3>
            <p className="mt-2 text-gray-600">
              Stay informed with live updates on market trends.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="bg-blue-600 text-white py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Overview of Your Portfolio</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 p-6">
            <div className="">
              <p className="text-lg">Total Wealth Value</p>
              <p className="">$2,000</p>
            </div>
            <div className="">
              <p className="text-lg">
                Total Wealth Value by Asset Type
                <select
                  id="asset types"
                  className="ml-3 p-0 py-1 text-lg bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option>stocks</option>
                  <option>cash</option>
                  <option>real estate</option>
                </select>
              </p>
              <p className="mt-2">$500</p>
            </div>
          </div>
        </div>
      </section>

      {/* Asset Allocation charts */}
      <section className="py-16">
        <div className="text-center grid grid-cols-1 gap-8">
          <div className="mx-4 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-blue-600">
              Asset Allocation
            </h2>
            <div className="h-96 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    label
                    dataKey="value"
                    fill="#8884d8"
                  >
                    {assetAllocationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mx-4 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-blue-600">
              Portfolio Growth
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart
                  data={growthOverTime}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type={"monotone"} dataKey={"value"} stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <Card className="rounded-md bg-gray-400 m-2 p-2">
        <h2 className="text-2xl font-bold">Recent Activity</h2>
        <p>Latest updates or changes in asset values</p>
      </Card>

      <Card className="rounded-md bg-gray-400 m-2 p-2 col-span-2">
        <h2 className="text-2xl font-bold">API Data Highlights</h2>
        <p>Real-time updates of stock prices or market trends</p>
      </Card>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2025 Wealth Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
