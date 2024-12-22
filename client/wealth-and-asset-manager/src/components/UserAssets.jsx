import axios from "axios";
import { useEffect, useState } from "react";

const UserAssets = () => {
  const [assets, setAssets] = useState([]);

  // to ensure all assets are retrieved on first render
  useEffect(() => {
    // retrieve the list of assets
    const getAllAssets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/assettracker/all"
        );
        setAssets(response.data);
      } catch (error) {
        console.log(`Error retrieving all assets: ${error}`);
      }
    };

    getAllAssets();
  }, []);

  // capitalize the first letter of a string
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="rounded-lg bg-slate-200 m-4 p-5">
      <h1 className="mb-4 text-xl font-bold text-gray-900">Your Assets</h1>
      <div className="relative overflow-x-auto bg-gray-50 rounded-lg p-2.5">
        <table className="w-full text-left text-gray-500">
          <thead className="text-gray-700 bg-gray-100 py-5">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Value</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {assets?.length > 0 &&
              assets.map((asset, index) => (
                <tr key={index} className="border-b">
                  <th>{capitalize(asset.name)}</th>
                  <td>{capitalize(asset.type)}</td>
                  <td>${asset.value}</td>
                  <td>{asset.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAssets;
