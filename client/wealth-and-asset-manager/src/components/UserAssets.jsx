const UserAssets = () => {
  const assets = [
    {
      name: "Penthouse",
      type: "Real Estate",
      value: "$50000",
      quantity: 2,
    },
    {
      name: "Stock A",
      type: "Stock",
      value: "$1000",
      quantity: 3,
    },
  ];
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
            {assets.length > 0 &&
              assets.map((asset) => (
                <tr className="border-b">
                  <th>{asset.name}</th>
                  <td>{asset.type}</td>
                  <td>{asset.value}</td>
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
