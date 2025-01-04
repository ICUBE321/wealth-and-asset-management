import { useState } from "react";
import axios from "axios";
import Log from "../utility/Logs";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // for logging to server file
  const origin = "Login";
  let logMessage = "";

  // for making api call for logging in user and seeting the returned jwt
  const loginUser = async (e) => {
    try {
      e.preventDefault();
      // check if the email is valid
      if (!validateEmail(email)) {
        logMessage = "User entered invalid email";
        Log(origin, logMessage);
        console.log(`${origin} - ${logMessage}`);
        return;
      }

      // log in
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/userAuth/login`,
        {
          email,
          password,
        }
      );

      if (response) {
        setToken(response.data.token, response.data.user._id);
        logMessage = "User logged in";
        Log(origin, logMessage);
        console.log(`${origin} - ${logMessage}`);
      }
    } catch (error) {
      logMessage = `Error logging in user: ${error}`;
      Log(origin, logMessage);
      console.log(`${origin} - ${logMessage}`);
    }
  };

  //to validate email using regular expression
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
    </div>
  );
};

export default Login;
