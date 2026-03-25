import { useState } from "react";
import API from "../api.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", data);
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Name" onChange={(e)=>setData({...data, name:e.target.value})} />
      <input placeholder="Email" onChange={(e)=>setData({...data, email:e.target.value})} />
      <input placeholder="Password" type="password" onChange={(e)=>setData({...data, password:e.target.value})} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}