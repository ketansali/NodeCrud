const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.account = {
  register: async (req, res) => {
    try {
      const isExisted = await User.findOne({ email: req.body.email });
      if (isExisted)
        return res.status(400).json({
          isSuccess: false,
          message: "User already existed",
        });
      const userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      const isCreated = await User.create(userInfo);
      if (isCreated) {
        return res.status(201).json({
          isSuccess: true,
          message: "User created",
        });
      } else {
        return res.status(400).json({
          isSuccess: false,
          message: "User not created",
        });
      }
    } catch (error) {
      return res.status(400).json({
        isSuccess: false,
        error,
      });
    }
  },
  login: async (req, res) => {
    try {
      let userInfo = await User.findOne({ email: req.body.email });
      if (userInfo) {
        if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
          return res.status(400).json({
            isSuccess: false,
            message: "Authentication failed. wrong password",
          });
        }
        userInfo = JSON.parse(JSON.stringify(userInfo));
        delete userInfo["password"];
        const token = jwt.sign(userInfo, process.env.secret, {
          expiresIn: "24h",
        });
        return res.status(200).json({
          isSuccess: true,
          message: "You are logged in successfully",
          token,
        });
      } else {
        return res.status(400).json({
          isSuccess: false,
          message: "User not existed",
        });
      }
    } catch (error) {
      return res.status(400).json({
        isSuccess: false,
        error,
      });
    }
  },
};
