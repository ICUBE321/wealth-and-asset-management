import EditableRow from "./EditableRow";
import Log from "../utility/Logs";

const UserAssets = ({
  assets,
  setShowModal,
  setSelectedAsset,
  refreshAllAssets,
  userId,
}) => {
  const origin = "UserAssets";
  let logMessage = "";

  //show delete modal
  const openDeleteModal = (asset) => {
    console.log("show delete modal");
    logMessage = "Show delete modal";
    Log(origin, logMessage);
    setSelectedAsset(asset._id);
    setShowModal(true);
  };

  return (
    <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Assets</h2>
      <div className="relative overflow-x-auto bg-gray-50 rounded-lg p-2.5">
        <table className="table-auto w-full text-left">
          <thead className="text-gray-700 py-5">
            <tr className="">
              <th className="">Name</th>
              <th className="">Type</th>
              <th className="">Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {assets?.length > 0 &&
              assets.map((asset, index) => (
                <EditableRow
                  key={index}
                  asset={asset}
                  index={index}
                  openDeleteModal={openDeleteModal}
                  refreshAllAssets={refreshAllAssets}
                  userId={userId}
                />
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserAssets;
