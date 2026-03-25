import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h3 className="brand">Golf-Charity</h3>

      <div className="nav-actions">
        {user?.role === "admin" ? (
          <button
            className="nav-secondary"
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
        ) : (
          <button
            className="nav-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        )}

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}