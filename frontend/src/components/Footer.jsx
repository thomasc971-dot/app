import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Instagram, Linkedin, Mail } from "lucide-react";

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-navy/10 bg-cream mt-20">
    <div className="container-md pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand block */}
        <div className="md:col-span-5">
          <Logo size="md" />
          <p className="font-script text-brick text-2xl mt-4 -rotate-2 inline-block">Explorer. Décider. Construire demain.</p>
          <p className="font-body text-sm text-navy/60 mt-5 max-w-sm leading-relaxed">
            Une plateforme d'orientation qui te fait vivre les grandes étapes d'une carrière avant de les choisir.
            À tout âge, sans jargon, sans inscription.
          </p>
        </div>

        {/* Explorer */}
        <div className="md:col-span-2">
          <h4 className="font-body text-xs uppercase tracking-widest text-navy/40 mb-4">Explorer</h4>
          <ul className="space-y-2.5 font-body text-sm text-navy/70">
            <li><Link className="hover:text-navy transition-colors" data-testid="footer-simulation" to="/simulation">Simulation</Link></li>
            <li><Link className="hover:text-navy transition-colors" data-testid="footer-ttv" to="/trouve-ta-voie">Trouve ta voie</Link></li>
            <li><Link className="hover:text-navy transition-colors" data-testid="footer-metiers" to="/metiers">Annuaire métiers</Link></li>
            <li><Link className="hover:text-navy transition-colors" data-testid="footer-ressources" to="/ressources">Ressources</Link></li>
          </ul>
        </div>

        {/* Le projet */}
        <div className="md:col-span-2">
          <h4 className="font-body text-xs uppercase tracking-widest text-navy/40 mb-4">Le projet</h4>
          <ul className="space-y-2.5 font-body text-sm text-navy/70">
            <li><Link className="hover:text-navy transition-colors" data-testid="footer-apropos" to="/a-propos">À propos</Link></li>
            <li><Link className="hover:text-navy transition-colors" to="/a-propos">Notre raison d'être</Link></li>
            <li><Link className="hover:text-navy transition-colors" to="/ressources">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3">
          <h4 className="font-body text-xs uppercase tracking-widest text-navy/40 mb-4">Rester en lien</h4>
          <a href="mailto:hello@moidemain.fr" className="inline-flex items-center gap-2 font-body text-sm text-navy/70 hover:text-navy transition-colors">
            <Mail size={14} /> hello@moidemain.fr
          </a>
          <div className="mt-5 flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-navy/15 flex items-center justify-center text-navy/60 hover:text-navy hover:border-navy transition-colors"><Instagram size={15} /></a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-navy/15 flex items-center justify-center text-navy/60 hover:text-navy hover:border-navy transition-colors"><Linkedin size={15} /></a>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-navy/10 flex flex-col md:flex-row items-baseline justify-between gap-3">
        <span className="font-body text-xs text-navy/40">© {new Date().getFullYear()} Moi Demain — Fait avec soin, pour t'aider à choisir.</span>
        <span className="font-script text-brick text-xl -rotate-2">à demain 👋</span>
      </div>
    </div>
  </footer>
);
