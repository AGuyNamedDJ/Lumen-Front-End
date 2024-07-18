import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Outlet, useLocation } from "react-router-dom";

const fetchForHomePage = () => {
    const location = useLocation();
    const showFooter = location.pathname !== "/login" && location.pathname !== "/lumen"; // Hide footer on login and lumen pages

    return (
        <div className="content">
            <Navbar />
            <Outlet />
            {showFooter && <Footer />}
        </div>
    );
};

export default fetchForHomePage;