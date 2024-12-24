import axios from "axios";

const AddAsset = ({ inputs, setInputs }) => {
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitAsset = async (event) => {
    event.preventDefault();
    console.log(inputs);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/assettracker/`,
        inputs
      );
      console.log(`AddAsset - Added new asset`);
      console.log(response.data);
      // forcing a render to retrieve the added asset and clear form
      setInputs({});
    } catch (error) {
      console.log(`AddAsset - Error adding new asset: ${error}`);
    }
  };

  return (
    <section className="bg-slate-200 rounded-lg m-4">
      <div className="p-5 max-w-2xl">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="Enter value"
                required
                value={inputs.value || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="Enter quantity"
                required
                value={inputs.quantity || ""}
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
      </div>
    </section>
  );
};

export default AddAsset;
