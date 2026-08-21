import { Outlet, Link } from "react-router";
import "./AuthLayout.css";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <Link to="/login" className="auth-layout-logo">
        TaskManager
      </Link>
      <div className="auth-layout-card">
        <Outlet />
      </div>
    </div>
  );
}
