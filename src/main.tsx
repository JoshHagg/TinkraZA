import { StrictMode, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes,useLocation } from "react-router-dom";
import { inject } from "@vercel/analytics";
import { AppNotice } from "./components/AppNotice";
import { ExperienceDetailPage } from "./pages/ExperienceDetailPage";
import { ExperiencesPage } from "./pages/ExperiencesPage";
import { HomePage } from "./pages/HomePage";
import { ProvidersPage } from "./pages/ProvidersPage";
import { useWebMcp } from "./hooks/useWebMcp";
import "./index.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function App() {
  useWebMcp();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="*" element={<ExperiencesPage />} />
      </Routes>
      <AppNotice />
      <Analytics />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
