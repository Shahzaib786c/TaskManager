import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth.js";
import "./Sidebar.css";
import { getAvatarUrl } from "../../utils/constants.js";

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleLinkClick() {
    onClose();
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">TaskFlow</div>

        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {getAvatarUrl(user?.avatar) ? (
              <img src={getAvatarUrl(user?.avatar)} alt="Profile" className="sidebar-user-avatar-img" />
            ) : (
              user?.name?.charAt(0).toUpperCase()
            )}
          </div>
          <span className="sidebar-user-name">{user?.name}</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
            onClick={handleLinkClick}
          >
            My Tasks
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
            onClick={handleLinkClick}
          >
            Profile
          </NavLink>
        </nav>

        <button className="sidebar-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>
    </>
  );
}