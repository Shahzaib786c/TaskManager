import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./MainLayout.css";

export default function MainLayout() {
    return (
        <div className="main-layout">
            <Navbar />
            <main className="main-layout-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}