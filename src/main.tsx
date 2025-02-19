import "./styles/globals.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./components/providers/providers.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

import SignInPage from "./pages/sign-in/page.tsx";
import HomePage from "./pages/home/page.tsx";
import PageWrapper from "./components/layout/page-wrapper.tsx";
import { DashboardLayout } from "./pages/dashboard/layout.tsx";
import { DashboardPage } from "./pages/dashboard/page.tsx";
import { FeatureTogglesPage } from "./pages/dashboard/feature-toggles/page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<PageWrapper />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path="/dashboard/feature-toggles"
                element={<FeatureTogglesPage />}
              />
              <Route path="/dashboard/*" element={<div>Not implemented</div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  </StrictMode>,
);
