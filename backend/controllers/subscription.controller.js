import SubscriptionModel from "../models/Subscription.model.js";

export const createOrUpdateSubscription = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!["monthly", "yearly"].includes(plan)) {
      return res.status(400).json({ message: "Plan must be monthly or yearly" });
    }

    const renewalDate = new Date();
    if (plan === "monthly") {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    } else {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    }

    const subscription = await SubscriptionModel.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        plan,
        status: "active",
        renewalDate,
      },
      { upsert: true, new: true }
    );

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};