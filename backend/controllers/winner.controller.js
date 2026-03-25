import WinnerModel from "../models/Winner.model.js";

export const getAllWinners = async (req, res) => {
  try {
    const winners = await WinnerModel.find()
      .populate("user", "name email")
      .populate("draw");
    res.json(winners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadProof = async (req, res) => {
  try {
    const { proofImage } = req.body;

    const winner = await WinnerModel.findByIdAndUpdate(
      req.params.id,
      { proofImage, verificationStatus: "pending" },
      { new: true }
    );

    res.json(winner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyWinner = async (req, res) => {
  try {
    const { verificationStatus, payoutStatus } = req.body;

    const winner = await WinnerModel.findByIdAndUpdate(
      req.params.id,
      { verificationStatus, payoutStatus },
      { new: true }
    );

    res.json(winner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};