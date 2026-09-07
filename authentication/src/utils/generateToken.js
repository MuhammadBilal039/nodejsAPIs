import jwt from "jsonwebtoken";

const generateToken = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );

  res.cookie("token", token);
};

export default generateToken;
