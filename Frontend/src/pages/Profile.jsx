import { useAuth } from "../hooks/useAuth.js";
import "./Profile.css";

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="profile-page">
            <h2 className="profile-heading">Profile</h2>
            <div className="profile-card">
                <div className="profile-row">
                    <span className="profile-label">Name</span>
                    <span className="profile-value">{user?.name}</span>
                </div>
                <div className="profile-row">
                    <span className="profile-label">Email</span>
                    <span className="profile-value">{user?.email}</span>
                </div>
            </div>
        </div>
    );
}