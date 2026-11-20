"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Dna,
  Layers,
  Cpu,
  BarChart3,
  FlaskConical,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Database,
  Binary,
  Activity,
  Microscope,
  Atom,
} from "lucide-react";

// Dynamic import of 3D Canvas viewer with ssr disabled to guarantee clean browser WebGL rendering
const CftrViewer3D = dynamic(() => import("@/components/molecular/CftrViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[720px] rounded-2xl border border-cyan-500/20 bg-navy-950/80 flex flex-col items-center justify-center p-8 text-center animate-pulse">
      <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
        <Dna className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Initializing 3D Molecular Simulation</h3>
      <p className="text-xs text-slate-400 max-w-md">
        Loading Cryo-EM CFTR PDB 5UAK coordinate system, transmembrane lipid bilayer, and lipid nanoparticle dynamics...
      </p>
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Futuristic Ambient Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-100px] left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[-50px] right-1/4 w-[450px] h-[450px] bg-violet-600/15 rounded-full blur-[140px]" />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <Atom className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Hybrid Quantum-Classical Precision Nanomedicine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-none">
          Engineering Precision Gene Therapy Through{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-turquoise-300">
            AI & Quantum Optimization
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          An explainable hybrid quantum-classical research platform connecting CFTR genetic analysis with intelligent lipid nanoparticle delivery optimization.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#viewer-3d"
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all flex items-center gap-2"
          >
            <Dna className="w-4 h-4" />
            <span>Explore 3D CFTR</span>
          </a>

          <Link
            href="/lnp-atlas"
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-navy-900/90 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Explore LNP Atlas</span>
          </Link>

          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-navy-900/90 border border-slate-700 hover:border-violet-400 text-slate-200 hover:text-white transition-all flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4 text-violet-400" />
            <span>Launch Research Dashboard</span>
          </Link>
        </div>

        {/* Live Research Metrics Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800 text-center">
            <div className="text-2xl font-black text-cyan-400">1,092+</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Atlas Formulations</div>
          </div>
          <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800 text-center">
            <div className="text-2xl font-black text-violet-400">140+</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">CFTR ClinVar Variants</div>
          </div>
          <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800 text-center">
            <div className="text-2xl font-black text-turquoise-400">0.968</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">ML AUC-ROC (XGBoost)</div>
          </div>
          <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800 text-center">
            <div className="text-2xl font-black text-pink-400">QAOA / QUBO</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Quantum Optimization</div>
          </div>
        </div>
      </section>

      {/* 3D Interactive CFTR Biological Experience Section */}
      <section id="viewer-3d" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Microscope className="w-6 h-6 text-cyan-400" />
              Interactive 3D CFTR & Cellular Delivery Journey
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Follow the complete molecular pathway: In Vitro mRNA Transcription → Microfluidic LNP Encapsulation → Mucus Penetration → Endosomal Escape → RER Ribosome Translation → Golgi Trafficking → Membrane Anion Pore Function.
            </p>
          </div>
        </div>

        {/* 3D Component */}
        <CftrViewer3D />
      </section>

      {/* Comprehensive Research Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Integrated Computational Research Pipeline
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            A cohesive scientific workflow linking patient genomic mutations to formulation biophysics and hybrid quantum-classical optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1: CFTR Variant Genomics */}
          <Link
            href="/cftr"
            className="group p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                CFTR Variant Pathogenicity Explorer
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Analyze clinical mutations (F508del, G542X, G551D, R117H, N1303K) with multi-model machine learning (Logistic Regression, Random Forest, XGBoost) and structural domain mapping.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400">
              <span>Inspect ClinVar Pipeline</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 2: LNP Atlas Ingestion & Explorer */}
          <Link
            href="/lnp-atlas"
            className="group p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-turquoise-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-turquoise-500/10 border border-turquoise-500/30 flex items-center justify-center text-turquoise-400 mb-4 group-hover:scale-105 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-turquoise-300 transition-colors">
                Official LNP Atlas Database
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Access the complete official database (Nature Sci Data / Zenodo 17243733) with dynamic lipid screening (SM-102, ALC-0315, CKK-E12, C12-200), multi-criteria filters, and CSV import/export.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-turquoise-400">
              <span>Explore Formulations</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 3: LNP Delivery Predictor */}
          <Link
            href="/delivery"
            className="group p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-pink-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                LNP Delivery & Mucus Penetration Predictor
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Predict transfection performance, encapsulation efficiency %, particle size, and sputum penetration indices for nebulized pulmonary CF airway delivery.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-pink-400">
              <span>Run Formulation ML</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 4: Quantum QUBO & QAOA Optimization */}
          <Link
            href="/quantum"
            className="group p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-violet-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                Quantum QUBO & QAOA Optimization
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Formulate combinatorial Quadratic Unconstrained Binary Optimization problems for multi-target gene selection and LNP ingredient optimization. Benchmark QAOA against Simulated Annealing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-violet-400">
              <span>Launch Quantum Circuits</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 5: GEO GSE15568 Gene Expression & Pathways */}
          <Link
            href="/pathways"
            className="group p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                GEO GSE15568 Pathways & DEGs
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Explore real Cystic Fibrosis bronchial transcriptome profiling. Interactive Volcano Plot, Reactome pathway enrichment (UPR, IL-8/CXCL8, ENaC, MUC5AC), and differential expression statistics.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Analyze Volcano Plot</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 6: Explainable AI & SHAP */}
          <Link
            href="/explainability"
            className="group p-6 rounded-2xl bg-navy-900/70 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                Explainable AI (SHAP Engine)
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Inspect local and global TreeSHAP waterfall and beeswarm attributions for variant classification and formulation features. Transparent model explanations without black-box opacity.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-400">
              <span>Inspect Feature Attribution</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Scientific Disclaimers & Methodology Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-10">
        <div className="p-6 rounded-2xl bg-navy-900/50 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Full Vercel Serverless Architecture</h4>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Designed for zero-configuration deployment on Vercel. Computational scientific endpoints run natively within Next.js Route Handlers and browser-side client simulation, removing all external server dependencies.
            </p>
          </div>
          <Link
            href="/about"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-white border border-slate-700 hover:border-cyan-400 transition-all shrink-0"
          >
            View Research Architecture
          </Link>
        </div>
      </section>
    </div>
  );
}
