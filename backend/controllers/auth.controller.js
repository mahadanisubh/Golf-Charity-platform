import bcrypt from "bcryptjs";
import UserModel from "../models/User.model.js";
import generateToken from "../src/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, charityPercentage, selectedCharity } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      charityPercentage: charityPercentage || 10,
      selectedCharity: selectedCharity || null,
    });

    res.status(201).json({
      message: "User created successfully",
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).populate("selectedCharity");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};