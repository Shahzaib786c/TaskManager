import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth.js";
import "./Navbar.css";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">TaskFlow</Link>

            <div className="navbar-right">
                <span className="navbar-user">Hi, {user?.name}</span>
                <button className="navbar-logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
}