import { useState } from "react";
import axios from "axios";
import Log from "../utility/Logs";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMode, setErrorMode] = useState(false); // determining the state of the form
  const [errorMessage, setErrorMessage] = useState(""); // the error message to be displayed to the user when in error mode
  // for logging to server file
  const origin = "Login";
  let logMessage = "";

  // for setting the error mode and message
  const setError = (mode, message) => {
    setErrorMode(mode);
    setErrorMessage(message);
  };

  // for making api call for logging in user and seeting the returned jwt
  const loginUser = async (e) => {
    try {
      e.preventDefault();
      // check if the email is valid
      if (!validateEmail(email)) {
        logMessage = "User entered invalid email";
        Log(origin, logMessage);
        console.log(`${origin} - ${logMessage}`);
        // set error state for the login form and display an error message
        setError(true, logMessage);
        return;
      }

      //reset error state after email validation if previously set to true
      setError(false, "");

      // log in
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/userAuth/login`,
        {
          email,
          password,
        }
      );

      if (response) {
        console.log(response.data);
        setToken(response.data.token, response.data.user._id);
        logMessage = "User logged in";
        Log(origin, logMessage);
        console.log(`${origin} - ${logMessage}`);
      }
    } catch (error) {
      logMessage = `Error logging in user: ${
        error.response.data.message ?? error.message
      }`;
      Log(origin, logMessage);
      console.log(`${origin} - ${logMessage}`);
      setError(true, logMessage);
    }
  };

  //to validate email using regular expression
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className={`${
          errorMode ? "bg-red-50" : "bg-white"
        } max-w-md w-full p-6 rounded-lg shadow-md`}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className={`${
              errorMode
                ? "text-red-600 border-red-300 focus:border-red-600"
                : "text-gray-900 border-gray-300 focus:border-blue-600"
            } block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className={`${
              errorMode
                ? "text-red-700 peer-focus:text-red-600"
                : "text-gray-500 peer-focus:text-blue-600"
            } peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className={`${
              errorMode
                ? "text-red-600 border-red-300 focus:border-red-600"
                : "text-gray-900 border-gray-300 focus:border-blue-600"
            } block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder=" "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="floating_password"
            className={`${
              errorMode
                ? "text-red-700 peer-focus:text-red-600"
                : "text-gray-500 peer-focus:text-blue-600"
            } peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          onClick={loginUser}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
      {errorMode && (
        <div
          className="flex items-center p-4 mt-10 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>{errorMessage}</div>
        </div>
      )}
    </div>
  );
};

export default Login;
