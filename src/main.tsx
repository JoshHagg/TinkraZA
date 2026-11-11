import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AppNotice } from "./components/AppNotice";
import { ExperienceDetailPage } from "./pages/ExperienceDetailPage";
import { ExperiencesPage } from "./pages/ExperiencesPage";
import { HomePage } from "./pages/HomePage";
import { ProvidersPage } from "./pages/ProvidersPage";
import { useWebMcp } from "./hooks/useWebMcp";
import "./index.css";

function App() {
  useWebMcp();
  return (
    <BrowserRouter>
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
