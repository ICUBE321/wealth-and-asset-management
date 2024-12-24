import axios from "axios";

const Log = async (origin, message) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_API}/logs/`,
      { fileName: origin, message: message }
    );
  } catch (error) {
    console.error(`Error sending logs - ${error.message}`);
  }
};

export default Log;
