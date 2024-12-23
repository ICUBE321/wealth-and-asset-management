import UserAssets from "../components/UserAssets";
import AddAsset from "../components/AddAsset";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";

const AssetTracker = () => {
  const [assets, setAssets] = useState([]);
  const [inputs, setInputs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");

  // to ensure all assets are retrieved on first render
  useEffect(() => {
    // retrieve the list of assets
    const getAllAssets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/assettracker/all"
        );
        console.log("AssetTracker - Retrieved all assets:");
        setAssets(response.data);
      } catch (error) {
        console.log(`AssetTracker - Error retrieving all assets: ${error}`);
      }
    };

    getAllAssets();
  }, [inputs]);

  // function to delete an asset
  const deleteAsset = async () => {
    console.log(`AssetTracker - Deleting asset ${selectedAsset}`);
    try {
      const response = await axios.delete(
        `http://localhost:3000/assettracker/${selectedAsset}`
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
