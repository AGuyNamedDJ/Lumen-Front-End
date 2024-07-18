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
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import PromptPage from "./components/pages/PromptPage";
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