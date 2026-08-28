import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Metiers from "@/pages/Metiers";
import MetierDetail from "@/pages/MetierDetail";
import TrouveTaVoie from "@/pages/TrouveTaVoie";
import Simulation from "@/pages/Simulation";
import Immersion from "@/pages/Immersion";
import CreerCompte from "@/pages/CreerCompte";
import { Ressources, APropos } from "@/pages/Placeholder";

function App() {
  return (
    <div className="min-h-screen bg-cream text-navy">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/metiers" element={<Metiers />} />
            <Route path="/metiers/:slug" element={<MetierDetail />} />
            <Route path="/trouve-ta-voie" element={<TrouveTaVoie />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/immersion" element={<Immersion />} />
            <Route path="/creer-compte" element={<CreerCompte />} />
            <Route path="/ressources" element={<Ressources />} />
            <Route path="/a-propos" element={<APropos />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
