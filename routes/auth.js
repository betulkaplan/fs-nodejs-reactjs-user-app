const express = require("express");
const router = express.Router();
const Auth = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send({ message: "All input is required" });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Auth.findOne({ email });

    if (oldUser) {
      return res
        .status(409)
        .send({ message: "User Already Exist. Please Login!" });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Auth.create({
      first_name,
      last_name,
      email: email?.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    user.password = undefined;
    user.__v = undefined;

    res.status(201).json({ user, message: "Registered Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // Our register logic ends here
});

// Login
router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send({ message: "All input is required" });
    }
    // Validate if user exist in our database
    const user = await Auth.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      user.password = undefined;
      user.__v = undefined;

      // user
      res.status(200).json({ user, message: "Logged in Successfully!" });
    } else {
      res.status(400).send({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;
