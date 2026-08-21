import "./Navbar.css";

export default function Navbar({ onMenuClick }) {
    return (
        <header className="navbar">
            <button className="navbar-menu-btn" onClick={onMenuClick} aria-label="Open menu">
                &#9776;
            </button>
            <span className="navbar-title">TaskFlow</span>
        </header>
    );
}