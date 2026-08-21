import { useAuth } from "../hooks/useAuth.js";

export default function Home() {
    const { user } = useAuth();

    return (
        <div>
            <h2>Welcome, {user?.name}</h2>
            <p>Task list comes here — Step 12</p>
        </div>
    );
}