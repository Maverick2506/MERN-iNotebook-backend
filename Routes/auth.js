const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult, Result } = require("express-validator");

// Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name with aleast 3 letters!!").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email with @ and .com!!").isEmail(),
    body(
      "password",
      "Enter a valid password with minimum length of 8 characters!!!"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    //If there are errors return Bad request and the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check whether the user with this email exists already.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "Sorry! A user with this email address exists already.",
        });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error may have been occured");
    }
  }
);

module.exports = router;
