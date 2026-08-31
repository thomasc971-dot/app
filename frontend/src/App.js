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
import Aides from "@/pages/Aides";
import FichePaie from "@/pages/FichePaie";
import MobiliteFrance from "@/pages/MobiliteFrance";
import Expatriation from "@/pages/Expatriation";
import Comparateur from "@/pages/Comparateur";
import Faq from "@/pages/Faq";
import Organismes from "@/pages/Organismes";
import Tarifs from "@/pages/Tarifs";
import TarifsParticuliers from "@/pages/TarifsParticuliers";
import TarifsEtablissements from "@/pages/TarifsEtablissements";
import TarifsEntreprises from "@/pages/TarifsEntreprises";
import ContactCommercial from "@/pages/ContactCommercial";
import MoiDemainPlusSouscription from "@/pages/MoiDemainPlusSouscription";

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
            <Route path="/aides" element={<Aides />} />
            <Route path="/fiche-paie" element={<FichePaie />} />
            <Route path="/mobilite-france" element={<MobiliteFrance />} />
            <Route path="/expatriation" element={<Expatriation />} />
            <Route path="/comparateur" element={<Comparateur />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/organismes" element={<Organismes />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/tarifs/particuliers" element={<TarifsParticuliers />} />
            <Route path="/tarifs/etablissements" element={<TarifsEtablissements />} />
            <Route path="/tarifs/entreprises" element={<TarifsEntreprises />} />
            <Route path="/contact-commercial" element={<ContactCommercial />} />
            <Route path="/moi-demain-plus" element={<MoiDemainPlusSouscription />} />
            <Route path="/a-propos" element={<APropos />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
