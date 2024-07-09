import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate, useOutletContext, useParams} from "react-router-dom";


const FetchForHomePage = () => {
    return (
        <div className="content">
            
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default FetchForHomePage;