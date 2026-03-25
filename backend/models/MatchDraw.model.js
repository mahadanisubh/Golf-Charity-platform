import mongoose from "mongoose";

const drawSchema = new mongoose.Schema(
  {
    winningNumbers: {
      type: [Number],
      required: true,
      validate: [(arr) => arr.length === 5, "Must have 5 numbers"],
    },
    status: {
      type: String,
      enum: ["simulated", "published"],
      default: "simulated",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Draw", drawSchema);