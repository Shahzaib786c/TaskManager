import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
