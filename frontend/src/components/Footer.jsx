import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-navy/10 bg-cream mt-32">
    <div className="container-md py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <Logo size="md" />
        <p className="font-body text-sm text-navy/60 mt-6 max-w-sm leading-relaxed">
          Explorer. Décider. Construire demain. Une plateforme d'orientation qui te fait vivre les grandes
          étapes d'une carrière avant de les choisir.
        </p>
      </div>
      <div>
        <h4 className="font-body text-xs uppercase tracking-widest text-navy/40 mb-4">Explorer</h4>
        <ul className="space-y-2 font-body text-sm text-navy/70">
          <li><Link to="/metiers">Annuaire métiers</Link></li>
          <li><Link to="/trouve-ta-voie">Trouve ta voie</Link></li>
          <li><Link to="/simulation">Simulation carrière</Link></li>
          <li><Link to="/ressources">Ressources</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-body text-xs uppercase tracking-widest text-navy/40 mb-4">À propos</h4>
        <ul className="space-y-2 font-body text-sm text-navy/70">
          <li><Link to="/a-propos">Le projet</Link></li>
          <li><Link to="/ressources">FAQ</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-navy/10">
      <div className="container-md py-6 flex justify-between text-xs font-body text-navy/40">
        <span>© {new Date().getFullYear()} Moi Demain</span>
        <span>Fait avec soin pour explorer demain.</span>
      </div>
    </div>
  </footer>
);
