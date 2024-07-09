// Imports
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

// Import: Utilities
import fetchForHomePage from "./components/utilities/fetchForHomepage";
import errorPage from "./components/utilities/errorPage";

// Import: Pages

// Brower Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <fetchForHomePage />,
        errorElement: <errorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
        ]
    }
])

const app = document.getElementById("apps")
const root = createRoot(app)
root.render(<RouterProvider router={router} />)