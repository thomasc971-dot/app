import React from "react";
import { Link } from "react-router-dom";

// Logo officiel Moi Demain — image PNG fournie par l'utilisateur (source de vérité identité)
export const Logo = ({ className = "", size = "md" }) => {
  const heights = { sm: "h-10", md: "h-12", lg: "h-20" };
  return (
    <Link to="/" data-testid="logo-link" className={`inline-flex items-center ${className}`}>
      <img
        src="/img/logo.jpg"
        alt="Moi Demain"
        className={`${heights[size]} w-auto object-contain select-none`}
        style={{ mixBlendMode: "multiply" }}
        draggable="false"
      />
    </Link>
  );
};
