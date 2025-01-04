// for exposing functions related to Users
const User = require("../user-auth/userModel");

// for retrieving all users
const getUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.log(`userUtil - Fetch All Users Error: ${error.message}`);
  }
};

module.exports = { getUsers };
