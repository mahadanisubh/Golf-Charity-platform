import { useEffect, useState } from "react";
import API from "../api.js";
import Navbar from "../components/Navbar.jsx";

export default function Dashboard() {
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState("");
  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState("");
  const [percentage, setPercentage] = useState(10);
  const [winners, setWinners] = useState([]);

  const fetchData = async () => {
    const res = await API.get("/users/me");
    setScores(res.data.scores || []);
  };

  const fetchCharities = async () => {
    const res = await API.get("/charities");
    setCharities(res.data || []);
  };

  const fetchWinners = async () => {
    try {
      const res = await API.get("/winners");
      setWinners(res.data || []);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
    fetchCharities();
    fetchWinners();
  }, []);

  const addScore = async () => {
    if (!newScore) return alert("Enter score");

    await API.post("/scores", {
      score: Number(newScore),
      playedAt: new Date(),
    });

    setNewScore("");
    fetchData();
  };

  const saveCharity = async () => {
    if (!selectedCharity) return alert("Select charity");
    if (percentage < 10) return alert("Minimum 10%");

    await API.put("/users/update-charity", {
      selectedCharity,
      charityPercentage: percentage,
    });

    alert("Charity Updated");
  };

  const subscribe = async (plan) => {
    await API.post("/subscriptions", { plan });
    alert(`Subscribed (${plan})`);
  };

  return (
    <div className="page">
      <Navbar />

      <div className="container">
        <div className="card">
          <h1 className="title">User Dashboard</h1>
          <p className="subtitle">
            Manage your scores, charity and subscription
          </p>
        </div>

        {/* SCORE */}
        <div className="card">
          <h3 className="section-title">Add Score</h3>

          <div className="row">
            <input
              value={newScore}
              placeholder="Enter score (1-45)"
              onChange={(e) => setNewScore(e.target.value)}
            />
            <button onClick={addScore}>Add</button>
          </div>

          <h3 className="section-title">Your Scores</h3>
          {scores.map((s) => (
            <div className="score-item" key={s._id}>
              Score: {s.score}
            </div>
          ))}
        </div>

        {/* CHARITY */}
        <div className="card">
          <h3 className="section-title">Charity Selection</h3>

          <select onChange={(e) => setSelectedCharity(e.target.value)}>
            <option value="">Select Charity</option>
            {charities.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={percentage}
            min="10"
            onChange={(e) => setPercentage(e.target.value)}
          />

          <button onClick={saveCharity}>Save Charity</button>
        </div>

        {/* SUBSCRIPTION */}
        <div className="card">
          <h3 className="section-title">Subscription</h3>

          <div className="row">
            <button onClick={() => subscribe("monthly")}>
              Monthly Plan
            </button>

            <button onClick={() => subscribe("yearly")}>
              Yearly Plan
            </button>
          </div>
        </div>

        {/* WINNERS */}
        <div className="card">
          <h3 className="section-title">Winners</h3>

          {winners.length === 0 && <p>No winners yet</p>}

          {winners.map((w) => (
            <div className="winner-item" key={w._id}>
              Match: {w.matchCount} | Status: {w.verificationStatus} | Winner: {w.user?.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}