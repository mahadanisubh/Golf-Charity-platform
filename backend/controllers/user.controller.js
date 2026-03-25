import UserModel from "../models/User.model.js";
import SubscriptionModel from "../models/Subscription.model.js";
import ScoreModel from "../models/Score.model.js";
import WinnerModel from "../models/Winner.model.js";

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("selectedCharity");
    const subscription = await SubscriptionModel.findOne({ user: req.user._id });
    const scores = await ScoreModel.find({ user: req.user._id }).sort({ playedAt: -1 });
    const winnings = await WinnerModel.find({ user: req.user._id }).populate("draw");

    res.json({
      user,
      subscription,
      scores,
      winnings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate("selectedCharity");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCharity = async (req, res) => {
  try {
    const { selectedCharity, charityPercentage } = req.body;

    if (charityPercentage < 10) {
      return res.status(400).json({ message: "Minimum 10%" });
    }

    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { selectedCharity, charityPercentage },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};