// user authenticator router
const express = require("express");
const router = express.Router();
const User = require("./userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// routes
// create a user account
router.post("/create", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(`Adding user: ${JSON.stringify(user)}`);
    const newUser = await user.save();

    console.log(`Added user: ${JSON.stringify(newUser)}`);

    // send back jwt
    const token = jwt.sign({ userId: newUser._id }, process.env.MY_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ user: newUser, token });
  } catch (error) {
    console.log(`userAuth - Create User Error: ${error.message}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// log in user
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log(`No user found with email: ${email}`);
      res.status(401).json({ message: "Email does not exist" });
      return;
    }
    const password = req.body.password;
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log(`Invalid password ${password}`);
      return res.status(401).json({ message: "Invalid password" });
    }

    // send back jwt
    const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(`userAuth - Login User Error: ${error.message}`);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

module.exports = router;
