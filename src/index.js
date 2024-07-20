// Imports
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./components/utilities/UserContext";

// Import: Utilities
import FetchForHomePage from "./components/utilities/fetchForHomepage";
import errorPage from "./components/utilities/errorPage";
import ProtectedRoute from "./components/utilities/ProtectedRoute";

// Import: Pages
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";
import DataSets from "./components/pages/Datasets";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import Lumen1 from "./components/pages/Lumen1";
import Lumen2 from "./components/pages/Lumen2";
import News from "./components/pages/News";
import Overview from "./components/pages/Overview";
import PromptPage from "./components/pages/PromptPage";
import Publications from "./components/pages/Publications";
import SecurityAndPrivacy from "./components/pages/SecurityAndPrivacy";
import SignupPage from "./components/pages/SignupPage";

// Browser Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <FetchForHomePage />,
        errorElement: <errorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "about-us",
                element: <AboutUs />
            },
            {
                path: "contact",
                element: <ContactUs />
            },
            {
                path: "datasets",
                element: <DataSets />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "lumen",
                element: (
                  <ProtectedRoute>
                    <PromptPage />
                  </ProtectedRoute>
                )
            },
            {
                path: "lumen-1",
                element: <Lumen1 />
            },
            {
                path: "lumen-2",
                element: <Lumen2 />
            },
            {
                path: "news",
                element: <News />
            },
            {
                path: "overview",
                element: <Overview />
            },
            {
                path: "publications",
                element: <Publications />
            },
            {
                path: "security-privacy",
                element: <SecurityAndPrivacy />
            },
            {
                path: "signup",
                element: <SignupPage />
            }
        ]
    }
]);

const app = document.getElementById("apps");
const root = createRoot(app);
root.render(
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
);