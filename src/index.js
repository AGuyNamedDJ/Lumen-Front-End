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
import CommunitySupport from "./components/pages/CommunitySupport";
import ConditionalHomePage from "./components/utilities/conditionalHomePage";
import ContactUs from "./components/pages/ContactUs";
import CustomerSupport from "./components/pages/CustomerSupport";
import CookiesPolicy from "./components/pages/CookiesPolicy";
import DataSets from "./components/pages/Datasets";
import Documentation from "./components/pages/Documentation";
import HomePage from "./components/pages/HomePage";
import HowToGuides from "./components/pages/HowToGuides";
import LatestAdvancements from "./components/pages/LatestAdvancements";
import LoggedInHomePage from "./components/pages/LoggedInHomePage";
import LoginPage from "./components/pages/LoginPage";
import Lumen1 from "./components/pages/Lumen1";
import Lumen2 from "./components/pages/Lumen2";
import Mission from "./components/pages/Mission";
import OtherPolicies from "./components/pages/OtherPolicies";
import Pricing from "./components/pages/Pricing";
import ProductOverview from "./components/pages/ProductOverview";
import Overview from "./components/pages/Overview";
import PromptPage from "./components/pages/PromptPage";
import Publications from "./components/pages/Publications";
import ResearchOverview from "./components/pages/ResearchOverview";
import ResponsibleUse from "./components/pages/ResponsibleUse";
import SafetyOverview from "./components/pages/SafetyOverview";
import SafetyStandards from "./components/pages/SafetyStandards";
import Security from "./components/pages/Security";
import SecurityAndPrivacy from "./components/pages/SecurityAndPrivacy";
import SignupPage from "./components/pages/SignupPage";
import TermsOfUse from "./components/pages/TermsOfUse";

// Browser Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <FetchForHomePage />,
        errorElement: <errorPage />,
        children: [
            {
                index: true,
                element: <ConditionalHomePage /> // Use ConditionalHomePage here
            },
            {
                path: "about-us",
                element: <AboutUs />
            },
            {
                path: "community-support",
                element: <CommunitySupport />
            },
            {
                path: "contact",
                element: <ContactUs />
            },
            {
                path: "customer-support",
                element: <CustomerSupport />
            },
            {
                path: "datasets",
                element: <DataSets />
            },
            {
                path: "documenation",
                element: <Documentation />
            },
            {
                path: "how-to-guides",
                element: <HowToGuides />
            },
            {
                path: "latest-advancements",
                element: <LatestAdvancements />
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
                path: "mission",
                element: <Mission />
            },
            {
                path: "overview-products",
                element: <ProductOverview />
            },
            {
                path: "overview-research",
                element: <ResearchOverview />
            },
            {
                path: "overview-safety",
                element: <SafetyOverview />
            },
            {
                path: "policy-other",
                element: <OtherPolicies />
            },
            {
                path: "policy-cookies",
                element: <CookiesPolicy />
            },
            {
                path: "pricing",
                element: <Pricing />
            },
            {
                path: "publications",
                element: <Publications />
            },
            {
                path: "responsible-use",
                element: <ResponsibleUse />
            },
            {
                path: "safety-standards",
                element: <SafetyStandards />
            },
            {
                path: "security",
                element: <Security />
            },
            {
                path: "security-privacy",
                element: <SecurityAndPrivacy />
            },
            {
                path: "signup",
                element: <SignupPage />
            },
            {
                path: "terms-of-use",
                element: <TermsOfUse />
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