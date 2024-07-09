// Imports
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

// Import: Utilities
import FetchForHomePage from "./components/utilities/FetchForHomepage";
import ErrorPage from "./components/utilities/ErrorPage";

// Import: Pages
import HomePage from "./components/pages/HomePage";

// Brower Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <FetchForHomePage />,
        errorElement: <ErrorPage />,
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