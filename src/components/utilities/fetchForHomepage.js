import React from "react";
import navbar from "./navbar";
import footer from "./footer";
import { Outlet, useNavigate, useOutletContext, useParams} from "react-router-dom"


const fetchForHomePage = () => {
    return (
        <div className="content">
            
            <navbar />
            <Outlet />
            <footer />
        </div>
    )
}

export default fetchForHomePage;