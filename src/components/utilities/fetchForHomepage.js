import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const FetchForHomePage = () => {
    const location = useLocation();
    const showFooter = location.pathname !== "/login"; // Hide footer on login page

    return (
        <div className="content">
            <Navbar />
            <Outlet />
            {showFooter && <Footer />}
        </div>
    );
};

export default FetchForHomePage;