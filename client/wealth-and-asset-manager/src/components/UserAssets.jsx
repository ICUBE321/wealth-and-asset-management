import EditableRow from "./EditableRow";

const UserAssets = ({
  assets,
  setShowModal,
  setSelectedAsset,
  refreshAllAssets,
}) => {
  //show delete modal
  const openDeleteModal = (asset) => {
    console.log("show delete modal");
    setSelectedAsset(asset._id);
    setShowModal(true);
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {assets?.length > 0 &&
              assets.map((asset, index) => (
                <EditableRow
                  asset={asset}
                  index={index}
                  openDeleteModal={openDeleteModal}
                  refreshAllAssets={refreshAllAssets}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAssets;
