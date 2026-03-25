import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";

import authRoutes from "../routes/auth.routes.js";
import userRoutes from "../routes/user.routes.js";
import scoreRoutes from "../routes/score.routes.js";
import charityRoutes from "../routes/charity.routes.js";
import subscriptionRoutes from "../routes/subscription.routes.js";
import drawRoutes from "../routes/draw.routes.js";
import winnerRoutes from "../routes/winner.routes.js";

const app = express();
app.use(cors({
  origin: "https://golf-charity-platform-theta.vercel.app",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/charities", charityRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/draws", drawRoutes);
app.use("/api/winners", winnerRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () =>{
    try{
    await connectDB();
app.listen(PORT,() =>{
    console.log("Server running on Port",PORT);
})
}
catch(err){
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();