import UserAssets from "../components/UserAssets";
import AddAsset from "../components/AddAsset";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";

const AssetTracker = () => {
  const [assets, setAssets] = useState([]);
  const [inputs, setInputs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");

  // for retrieving all assets
  const refreshAllAssets = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/assettracker/all`
      );
      console.log("AssetTracker - Retrieved all assets");
      setAssets(response.data);
    } catch (error) {
      console.log(`AssetTracker - Error retrieving all assets: ${error}`);
    }
  };

  // to ensure all assets are retrieved on first render
  useEffect(() => {
    refreshAllAssets();
  }, [inputs]);

  // function to delete an asset
  const deleteAsset = async () => {
    console.log(`AssetTracker - Deleting asset ${selectedAsset}`);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_API}/assettracker/${selectedAsset}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(`AssetTracker - Error deletting assets: ${error}`);
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
