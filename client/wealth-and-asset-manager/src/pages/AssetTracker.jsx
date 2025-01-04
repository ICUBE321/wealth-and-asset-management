import UserAssets from "../components/UserAssets";
import AddAsset from "../components/AddAsset";
import { useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import Log from "../utility/Logs";
import randomColor from "randomcolor";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const AssetTracker = ({
  userId,
  assets,
  refreshAllAssets,
  totalAssetValue,
}) => {
  const [inputs, setInputs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  // for logging to server file
  const origin = "AssetTracker";
  let logMessage = "";

  // function to delete an asset
  const deleteAsset = async () => {
    logMessage = `Deleting asset ${selectedAsset}`;
    Log(origin, logMessage);
    console.log(`${origin} - ${logMessage}`);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_API}/assettracker/${selectedAsset}`
      );
      console.log(response.data);
    } catch (error) {
      logMessage = `Error deleting assets: ${error}`;
      Log(origin, logMessage);
      console.log(`${origin} - ${logMessage}`);
    }
    setShowModal(false);
    refreshAllAssets();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Asset Tracker</h1>
        <p className="text-gray-600">
          Track and manage your assets effectively.
        </p>
      </header>

      {/* Summary Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Total Value</h2>
          <p className="text-2xl font-bold text-blue-600">${totalAssetValue}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Total Assets</h2>
          <p className="text-2xl font-bold text-green-600">{assets.length}</p>
        </div>
      </section>

      {/* Visualization Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Asset Distribution
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={assets}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {assets.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={randomColor()} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Asset List Section */}
      <UserAssets
        assets={assets}
        setShowModal={setShowModal}
        setSelectedAsset={setSelectedAsset}
        refreshAllAssets={refreshAllAssets}
        userId={userId}
      />

      {/* Add Asset Section */}
      <AddAsset
        inputs={inputs}
        setInputs={setInputs}
        refreshAllAssets={refreshAllAssets}
        userId={userId}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        deleteAsset={deleteAsset}
      />
    </div>
  );
};

export default AssetTracker;
