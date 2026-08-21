import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./MainLayout.css";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="main-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="main-layout-content-wrapper">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="main-layout-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
