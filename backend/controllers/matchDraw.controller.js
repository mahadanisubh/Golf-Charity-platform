import MatchDrawModel from "../models/MatchDraw.model.js";
import ScoreModel from "../models/Score.model.js";
import SubscriptionModel from "../models/Subscription.model.js";
import WinnerModel from "../models/Winner.model.js";
import { generateWinningNumbers, countMatches } from "../src/matchDraw.js";

export const simulateDraw = async (req, res) => {
  try {
    const { mode } = req.body;
    const winningNumbers = generateWinningNumbers(mode);

    const draw = await MatchDrawModel.create({
      winningNumbers,
      status: "simulated",
      createdBy: req.user._id,
    });

    const activeSubscriptions = await SubscriptionModel.find({ status: "active" }).populate("user");

    const winners = [];

    for (const subscription of activeSubscriptions) {
      const scores = await ScoreModel.find({ user: subscription.user._id }).sort({ playedAt: -1 }).limit(5);

      if (scores.length < 5) continue;

      const userNumbers = scores.map((item) => item.score);
      const matches = countMatches(userNumbers, winningNumbers);

      if ([3,4,5].includes(matches)) {
        const winner = await WinnerModel.create({
          draw: draw._id,
          user: subscription.user._id,
          matchCount: matches,
        });
        winners.push(winner);
      }
    }

    res.json({
      message: "Draw simulated successfully",
      draw,
      winners,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const publishDraw = async (req, res) => {
  try {
    const draw = await MatchDrawModel.findByIdAndUpdate(
      req.params.id,
      { status: "published" },
      { new: true }
    );

    res.json(draw);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDraws = async (req, res) => {
  try {
    const draws = await MatchDrawModel.find().sort({ createdAt: -1 });
    res.json(draws);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};