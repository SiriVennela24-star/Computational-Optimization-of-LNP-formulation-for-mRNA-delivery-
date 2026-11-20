"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dna,
  Layers,
  Cpu,
  BarChart3,
  FlaskConical,
  Sparkles,
  GitPullRequest,
  BookOpen,
  Menu,
  X,
  FileText,
  ShieldCheck,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "/", label: "Home & 3D CFTR", icon: Dna },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/cftr", label: "CFTR Variants", icon: FlaskConical },
  { href: "/lnp-atlas", label: "LNP Atlas", icon: Layers },
  { href: "/delivery", label: "LNP Prediction", icon: Sparkles },
  { href: "/quantum", label: "Quantum QUBO", icon: Cpu },
  { href: "/pathways", label: "Gene Expression", icon: GitPullRequest },
  { href: "/explainability", label: "Explainable AI", icon: ShieldCheck },
  { href: "/about", label: "About & Scope", icon: BookOpen },
  { href: "/references", label: "References", icon: FileText },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/10 bg-navy-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-turquoise-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Dna className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">Quantum-XAI</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold uppercase tracking-wider">
                CFTR
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Precision Gene Therapy & LNP Optimization
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                    : "text-slate-300 hover:text-white hover:bg-navy-900/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Status Indicator */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-navy-900/80 border border-slate-700/60 text-[11px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Research Mode</span>
          </div>

          <Link
            href="/dashboard"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all"
          >
            Launch Dashboard
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg bg-navy-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-navy-950/95 backdrop-blur-2xl px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-300 hover:bg-navy-900"
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2 text-center rounded-lg text-xs font-semibold bg-cyan-500 text-navy-950"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
