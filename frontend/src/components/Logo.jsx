import React from "react";
import { Link } from "react-router-dom";

export const Logo = ({ className = "", size = "md" }) => {
  const sizes = {
    sm: { moi: "text-2xl", demain: "text-base", dot: "w-1.5 h-1.5" },
    md: { moi: "text-4xl", demain: "text-xl", dot: "w-2 h-2" },
    lg: { moi: "text-6xl", demain: "text-3xl", dot: "w-3 h-3" },
  };
  const s = sizes[size];
  return (
    <Link to="/" data-testid="logo-link" className={`inline-flex flex-col leading-[0.85] ${className}`}>
      <span
        className={`font-script text-navy font-bold ${s.moi} ml-1`}
        style={{ transform: "rotate(-4deg) translateY(4px)", transformOrigin: "left bottom" }}
      >
        moi
      </span>
      <span className="inline-flex items-end">
        <span className={`font-body font-normal text-navy tracking-tight ${s.demain}`}>demain</span>
        <span className={`rounded-full bg-brick ${s.dot} ml-[1px] mb-[3px] self-end`} />
      </span>
    </Link>
  );
};
