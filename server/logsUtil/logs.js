const fs = require("fs"); //file system module
const express = require("express");
const router = express.Router();

// write to relevant log file
router.post("/", async (req, res) => {
  try {
    const logFile = req.body.fileName;
    const logMessage = req.body.message;
    await fs.appendFile(`./logs/${logFile}.log`, `\n${logMessage}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        // Get the file contents after the append operation
        console.log(
          "\nFile Contents of file after append:",
          fs.readFileSync(`./logs/${logFile}.log`, "utf8")
        );
      }
    });
    res.json({ message: "Logged ok" });
  } catch (error) {
    console.error(`Error writing to log file: ${error.message}`);
  }
});

module.exports = router;
