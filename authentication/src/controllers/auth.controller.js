import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please fill all the fields properly",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least or more than 6 characters",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "User Already existed",
      });
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await userModel.create({
      name,
      email,
      password: hash,
    });

    res.status(200).json({
      status: true,
      message: "User Registered Successully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
