import ScoreModel from "../models/Score.model.js";

export const addScore = async (req, res) => {
  try {
    const { score, playedAt } = req.body;

    if (!score || !playedAt) {
      return res.status(400).json({ message: "Score and played date are required" });
    }

    if (score < 1 || score > 45) {
      return res.status(400).json({ message: "Score must be between 1 and 45" });
    }

    const existingScores = await ScoreModel.find({ user: req.user._id }).sort({ playedAt: 1 });

    if (existingScores.length >= 5) {
      await ScoreModel.findByIdAndDelete(existingScores[0]._id);
    }

    const newScore = await ScoreModel.create({
      user: req.user._id,
      score,
      playedAt,
    });

    const updatedScores = await ScoreModel.find({ user: req.user._id }).sort({ playedAt: -1 });

    res.status(201).json({
      message: "Score added successfully",
      newScore,
      scores: updatedScores,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyScores = async (req, res) => {
  try {
    const scores = await ScoreModel.find({ user: req.user._id }).sort({ playedAt: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};