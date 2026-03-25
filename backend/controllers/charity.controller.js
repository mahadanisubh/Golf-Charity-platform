import CharityModel from "../models/Charity.model.js";

export const createCharity = async (req, res) => {
  try {
    const charity = await CharityModel.create(req.body);
    res.status(201).json(charity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCharities = async (req, res) => {
  try {
    const charities = await CharityModel.find().sort({ createdAt: -1 });
    res.json(charities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};