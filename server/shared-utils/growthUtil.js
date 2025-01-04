// for exposing functions related to the User Portfolio

const cron = require("node-cron");
const assetUtil = require("./assetUtil");
const userUtil = require("./userUtil");
const Growth = require("../monitor-growth/growthModel");
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// for adding a portfolio value
const saveMonthlyPortfolioValue = async () => {
  try {
    // Fetch all user portfolios
    const users = await userUtil.getUsers();
    console.log(`Users - ${users}`);

    // iterate over users
    users.forEach(async (user) => {
      const userId = user._id;
      const portfolioSum = await getUserCurrentPortfolioSum(userId);

      const firstGrowth = await Growth.findOne({ userId: userId });
      const isInitialValue = firstGrowth == null;

      const today = new Date();
      //save value in database
      const growth = new Growth({
        portfolioValue: portfolioSum,
        month: monthNames[today.getMonth()],
        userId: userId,
        isInitialValue: isInitialValue,
      });

      const savedGrowth = await growth.save();
      console.log(`Growth value saved: ${JSON.stringify(savedGrowth)}`);
    });
  } catch (error) {
    console.log(`growthUtil - Save Portfolio Value Error: ${error.message}`);
  }
};

// Schedule the job to run on the last day of every month at midnight
cron.schedule("59 23 28-31 * *", async () => {
  const today = new Date();
  const lastDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  if (today.getDate() === lastDayOfMonth) {
    await saveMonthlyPortfolioValue();
  }
});

// for retrieving the user's current portfolio sum value
const getUserCurrentPortfolioSum = async (userId) => {
  let portfolioSum = 0;
  const assetValues = await assetUtil.getAllAssetValues(userId);
  console.log(`User's ${userId} Assets - ${assetValues}`);

  // get sum of asset values
  assetValues.forEach((value) => {
    portfolioSum += value;
  });
  console.log(`User's potfolio value is ${portfolioSum}`);
  return portfolioSum;
};

module.exports = { saveMonthlyPortfolioValue, getUserCurrentPortfolioSum };
