import { TiDelete } from "react-icons/ti";
import { MdEditNote } from "react-icons/md";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import Log from "../utility/Logs";

const EditableRow = ({ asset, index, openDeleteModal, refreshAllAssets }) => {
  const origin = "EditableRow";
  let logMessage = "";

  const [editing, setEditing] = useState(false);
  const [currentAsset, setCurrentAsset] = useState({
    id: asset._id,
    name: asset.name,
    type: asset.type,
    value: asset.value,
    quantity: asset.quantity,
  });

  // capitalize the first letter of a string
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // for switiching table row to edit mode when edit button is clicked
  const switchToEditing = () => {
    setEditing(true);
  };

  // for canceling editing mode
  const cancelEdit = () => {
    setEditing(false);
  };

  // for keeping track of updated asset values
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCurrentAsset((previousAsset) => ({
      ...previousAsset, //spread the existing properties
      [name]: value,
    }));
  };

  // update the current asset
  const updateAsset = async () => {
    try {
      console.log("Updating Asset...");
      logMessage = "Updating Asset...";
      Log(origin, logMessage);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/assettracker/update`,
        currentAsset
      );
      console.log("EditableRow - Updated asset");
      logMessage = "Updated asset";
      Log(origin, logMessage);
      cancelEdit();
      // need to force a re-render
      refreshAllAssets();
    } catch (error) {
      console.log(`EditableRow - Error updating asset: ${error}`);
      logMessage = `Error updating asset: ${error}`;
      Log(origin, logMessage);
    }
  };

  return (
    <tr key={index} className="border-b">
      <th>
        {editing ? (
          <input
            className="rounded-md p-0 m-0"
            type="text"
            name="name"
            value={currentAsset.name}
            onChange={(event) => handleChange(event)}
          />
        ) : (
          capitalize(asset.name)
        )}
      </th>
      <td>
        {editing ? (
          <input
            className="rounded-md p-0 m-0"
            type="text"
            name="type"
            value={currentAsset.type}
            onChange={(event) => handleChange(event)}
          />
        ) : (
          capitalize(asset.type)
        )}
      </td>
      <td>
        {editing ? (
          <input
            className="rounded-md p-0 m-0"
            type="number"
            name="value"
            value={currentAsset.value}
            onChange={(event) => handleChange(event)}
          />
        ) : (
          `$${asset.value}`
        )}
      </td>
      <td>
        {editing ? (
          <input
            className="rounded-md p-0 m-0"
            type="number"
            name="quantity"
            value={currentAsset.quantity}
            onChange={(event) => handleChange(event)}
          />
        ) : (
          asset.quantity
        )}
      </td>
      <td>
        {editing ? (
          <>
            <BiSolidCloudUpload
              className="text-blue-600 hover:text-blue-800 inline-block"
              onClick={updateAsset}
            />
            <TiDelete
              className="text-red-600 hover:text-red-800 inline-block"
              onClick={cancelEdit}
            />
          </>
        ) : (
          <>
            <MdEditNote
              className="text-green-500 hover:text-green-700 inline-block"
              onClick={switchToEditing}
            />
            <TiDelete
              className="text-red-600 hover:text-red-800 inline-block"
              onClick={() => openDeleteModal(asset)}
            />
          </>
        )}
      </td>
    </tr>
  );
};

export default EditableRow;
