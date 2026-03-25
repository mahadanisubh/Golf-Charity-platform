import { useEffect, useState } from "react";
import API from "../api.js";
import Navbar from "../components/Navbar.jsx";

export default function Admin() {
  const [result, setResult] = useState(null);
  const [winners, setWinners] = useState([]);
  const [mode, setMode] = useState("fixed");

  const runDraw = async () => {
    const res = await API.post("/draws/simulate", { mode });
    setResult(res.data);
    fetchWinners();
  };

  const fetchWinners = async () => {
    const res = await API.get("/winners");
    setWinners(res.data || []);
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  const approveWinner = async (id) => {
    await API.put(`/winners/verify/${id}`, {
      verificationStatus: "approved",
      payoutStatus: "paid",
    });
    fetchWinners();
  };

  return (
    <div className="page">
      <Navbar />

      <div className="container">
        <div className="card">
          <h1 className="title" >Admin Panel</h1>
        </div>

        <div className="card">
          <h3 className="section-title">Draw Mode</h3>

          <select onChange={(e) => setMode(e.target.value)}>
            <option value="fixed">Fixed (Demo)</option>
            <option value="random">Random</option>
          </select>

          <button onClick={runDraw}>Run Draw</button>
            
          {result && (
            <div>
              <h3 className="section-title">Winning Numbers</h3>
              <p>{result.draw.winningNumbers.join(", ")}</p>
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="section-title">Winners</h3>

          {winners.length === 0 && <p>No winners yet</p>}

          {winners.map((w) => (
            <div className="winner-item" key={w._id}>
              <p>
                {w.user?.name} | Match: {w.matchCount}
              </p>

              <button onClick={() => approveWinner(w._id)}>
                Approve & Pay
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}