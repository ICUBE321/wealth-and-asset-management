import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonitorGrowth = ({ portfolioGrowth }) => {
  const comingSoon = import.meta.env.VITE_COMING_SOON;
  return comingSoon == "true" ? (
    <div className="flex justify-center items-center text-gray-600">
      <h1>Coming soon.</h1>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Monitor Growth</h1>
        <p className="text-gray-600">
          Visualize and track the growth of your portfolio over time.
        </p>
      </header>

      {/* Performance Overview */}
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Total Growth
            </h2>
            <p className="text-2xl font-bold text-green-600">+20%</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Net Gain</h2>
            <p className="text-2xl font-bold text-blue-600">$5,000</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Best Month</h2>
            <p className="text-xl text-gray-600">May 2024</p>
          </div>
        </div>
      </section>

      {/* Growth Chart */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Portfolio Growth Over Time
        </h2>
        <div className="w-full h-72">
          <ResponsiveContainer>
            <LineChart data={portfolioGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="portfolioValue"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Asset Breakdown Table */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Individual Asset Performance
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Asset</th>
                <th className="p-4">Initial Value</th>
                <th className="p-4">Current Value</th>
                <th className="p-4">Growth (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">Stocks</td>
                <td className="p-4">$10,000</td>
                <td className="p-4">$12,000</td>
                <td className="p-4 text-green-600">+20%</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Real Estate</td>
                <td className="p-4">$30,000</td>
                <td className="p-4">$35,000</td>
                <td className="p-4 text-green-600">+16.67%</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Savings</td>
                <td className="p-4">$5,000</td>
                <td className="p-4">$6,000</td>
                <td className="p-4 text-green-600">+20%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MonitorGrowth;
