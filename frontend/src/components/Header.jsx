import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/metiers", label: "Métiers" },
  { to: "/trouve-ta-voie", label: "Trouve ta voie" },
  { to: "/simulation", label: "Simulation" },
  { to: "/immersion", label: "Immersion" },
  { to: "/ressources", label: "Ressources" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/a-propos", label: "À propos" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header data-testid="site-header" className="sticky top-0 z-50 backdrop-blur-md bg-cream/70 border-b border-navy/5">
      <div className="container-md flex items-center justify-between py-4">
        <Logo size="md" />
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.to.replace("/", "")}`}
              className={({ isActive }) =>
                `font-body text-sm tracking-wide transition-colors ${
                  isActive ? "text-navy" : "text-navy/60 hover:text-navy"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/creer-compte" data-testid="header-signin" className="font-body text-sm text-navy/70 hover:text-navy transition-colors">
            Se connecter
          </NavLink>
          <NavLink to="/creer-compte" data-testid="header-signup" className="group inline-flex items-center gap-2 bg-brick text-cream rounded-full px-5 py-2.5 font-body font-semibold text-sm hover:bg-brick/90 transition-colors">
            Créer un compte
          </NavLink>
        </div>
        <button
          data-testid="menu-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden text-navy p-2"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div data-testid="mobile-menu" className="md:hidden border-t border-navy/5 bg-cream">
          <div className="container-md py-6 flex flex-col gap-4">
            {NAV.map(n => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-body text-base text-navy py-2"
              >
                {n.label}
              </NavLink>
            ))}
            <div className="pt-3 mt-2 border-t border-navy/10 flex flex-col gap-3">
              <NavLink to="/creer-compte" onClick={() => setOpen(false)} className="font-body text-base text-navy py-2">
                Se connecter
              </NavLink>
              <NavLink to="/creer-compte" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 bg-brick text-cream rounded-full px-5 py-2.5 font-body font-semibold text-sm">
                Créer un compte
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
