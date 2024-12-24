import UserAssets from "../components/UserAssets";
import AddAsset from "../components/AddAsset";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import Log from "../utility/Logs";

const AssetTracker = () => {
  const [assets, setAssets] = useState([]);
  const [inputs, setInputs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const origin = "AssetTracker";
  let logMessage = "";

  // for retrieving all assets
  const refreshAllAssets = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/assettracker/all`
      );
      logMessage = "Retrieved all assets";
      Log(origin, logMessage);
      console.log("AssetTracker - Retrieved all assets");
      setAssets(response.data);
    } catch (error) {
      console.log(`AssetTracker - Error retrieving all assets: ${error}`);
      logMessage = `Error retrieving all assets: ${error}`;
      Log(origin, logMessage);
    }
  };

  // to ensure all assets are retrieved on first render
  useEffect(() => {
    refreshAllAssets();
  }, [inputs]);

  // function to delete an asset
  const deleteAsset = async () => {
    console.log(`AssetTracker - Deleting asset ${selectedAsset}`);
    logMessage = `Deleting asset ${selectedAsset}`;
    Log(origin, logMessage);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_API}/assettracker/${selectedAsset}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(`AssetTracker - Error deletting assets: ${error}`);
      logMessage = `Error deletting assets: ${error}`;
      Log(origin, logMessage);
    }
    setShowModal(false);
    //force render
    setInputs({});
  };

  return (
    <>
      <UserAssets
        assets={assets}
        setShowModal={setShowModal}
        setSelectedAsset={setSelectedAsset}
        refreshAllAssets={refreshAllAssets}
      />
      <AddAsset inputs={inputs} setInputs={setInputs} />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        deleteAsset={deleteAsset}
      />
    </>
  );
};

export default AssetTracker;
