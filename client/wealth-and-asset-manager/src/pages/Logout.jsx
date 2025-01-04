import Log from "../utility/Logs";
import { useNavigate } from "react-router-dom";

const Logout = ({ removeToken }) => {
  // for logging to server file
  const origin = "Logout";
  let logMessage = "";
  const navigate = useNavigate();

  //for canceling logout and going back to previous page
  const cancelLogout = () => {
    logMessage = "User canceled logout";
    Log(origin, logMessage);
    console.log(`${origin} - ${logMessage}`);
    navigate(-1);
  };

  // for logging the user out and removing all saved data from local storage
  const logoutUser = () => {
    logMessage = "User logging out";
    Log(origin, logMessage);
    console.log(`${origin} - ${logMessage}`);
    removeToken();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Are you sure you want to log out?
        </h1>
        <p className="text-gray-600 text-center mb-6">
          You can always log back in to access your account and manage your
          assets.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={logoutUser}
          >
            Log Out
          </button>
          <button
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={cancelLogout}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
