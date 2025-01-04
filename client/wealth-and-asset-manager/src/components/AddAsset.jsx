import axios from "axios";
import Log from "../utility/Logs";

const AddAsset = ({ inputs, setInputs, refreshAllAssets, userId }) => {
  const origin = "AddAsset";
  let logMessage = "";

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitAsset = async (event) => {
    event.preventDefault();
    console.log(inputs);
    logMessage = JSON.stringify(inputs);
    Log(origin, logMessage);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/assettracker/`,
        { inputs, userId }
      );
      console.log(`AddAsset - Added new asset`);
      console.log(response.data);
      logMessage = "Added new asset";
      Log(origin, logMessage);
      setInputs({});
      refreshAllAssets();
    } catch (error) {
      console.log(`AddAsset - Error adding new asset: ${error}`);
      logMessage = `Error adding new asset: ${error}`;
      Log(origin, logMessage);
    }
  };

  return (
    <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Enter new asset
      </h2>
      <form onSubmit={submitAsset}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-600 block w-full pt-0 p-2.5"
              placeholder="Enter name"
              required
              value={inputs.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Type
            </label>
            <input
              type="text"
              name="type"
              id="type"
              className="bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-600 block w-full pt-0 p-2.5"
              placeholder="Enter type"
              required
              value={inputs.type || ""}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="value"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Value
            </label>
            <input
              type="number"
              name="value"
              id="value"
              className="bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-gray-900 text-sm focus:outline-none focus:ring-0 focus:border-blue-600 block w-full pt-0 p-2.5"
              placeholder="Enter value"
              required
              value={inputs.value || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
        >
          Add asset
        </button>
      </form>
    </section>
  );
};

export default AddAsset;
