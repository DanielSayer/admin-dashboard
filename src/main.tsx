import "./styles/globals.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./components/providers/providers.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

import SignInPage from "./pages/sign-in/page.tsx";
import HomePage from "./pages/home/page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  </StrictMode>
);
