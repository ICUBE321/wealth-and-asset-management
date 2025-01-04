import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import AssetTracker from "./pages/AssetTracker";
import NoMatch from "./pages/NoMatch";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import useToken from "./hooks/useToken";
import Logout from "./pages/Logout";
import MonitorGrowth from "./pages/MonitorGrowth";
import Log from "./utility/Logs";
import { useEffect, useState } from "react";
import axios from "axios";
import FooterComponent from "./components/Footer";

function App() {
  const { token, setToken, removeToken } = useToken();
  const [assets, setAssets] = useState([]); //user assets
  const [totalAssetValue, setTotalAssetValue] = useState(0); //total portfolio value
  const [portfolioGrowth, setPortfolioGrowth] = useState([]); //portfolio growth over time

  // for logging to server file
  const origin = "App";
  let logMessage = "";
  const userId = JSON.parse(localStorage.getItem("userId")); //user id for performing api operations

  // for retrieving all assets
  const refreshAllAssets = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/assettracker/all`,
        { params: { userId: userId } }
      );
      logMessage = "Retrieved all assets";
      Log(origin, logMessage);
      console.log(`${origin} - ${logMessage}`);
      setAssets(response.data);
    } catch (error) {
      logMessage = `Error retrieving all assets: ${error}`;
      Log(origin, logMessage);
      console.log(`${origin} - ${logMessage}`);
    }
  };

  // for retrieving user's portfolio growth values
  const refreshPortfolioGrowth = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/monitorGrowth/`,
        { params: { userId: userId } }
      );
      logMessage = "Retrieved all growth values";
      Log(origin, logMessage);
      console.log(`${origin} - ${logMessage}`);
      // console.log(response.data);
      setPortfolioGrowth(response.data);
    } catch (error) {
      logMessage = `Error retrieving growth values: ${error}`;
      Log(origin, logMessage);
      console.log(`${origin} - ${logMessage}`);
    }
  };

  // to ensure all assets and growth values are retrieved on render
  useEffect(() => {
    refreshAllAssets();
    refreshPortfolioGrowth();
  }, []);

  //to ensure the correct total is calculated
  useEffect(() => {
    // set total asset value
    let total = 0;
    assets.forEach((asset) => {
      total += asset.value;
    });
    setTotalAssetValue(total);
  }, [assets]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation tokenExists={token} />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                tokenExists={token}
                assets={assets}
                totalAssetValue={totalAssetValue}
                portfolioGrowth={portfolioGrowth}
              />
            }
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<SignUp setToken={setToken} />} />
          <Route
            path="/asset-tracker"
            element={
              <AssetTracker
                userId={userId}
                assets={assets}
                refreshAllAssets={refreshAllAssets}
                totalAssetValue={totalAssetValue}
              />
            }
          />
          <Route
            path="/monitor-growth"
            element={<MonitorGrowth portfolioGrowth={portfolioGrowth} />}
          />
          <Route
            path="/logout"
            element={<Logout removeToken={removeToken} />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
      <FooterComponent />
    </div>
  );
}

export default App;
