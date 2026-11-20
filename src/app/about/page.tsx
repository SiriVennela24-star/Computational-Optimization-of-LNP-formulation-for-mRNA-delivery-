import React from "react";
import Link from "next/link";
import {
  Dna,
  Cpu,
  Layers,
  Sparkles,
  ShieldAlert,
  Server,
  Code2,
  Atom,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          <Atom className="w-3.5 h-3.5 text-cyan-400" /> Research Scope & Methodology
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Quantum-XAI Precision Gene Therapy Platform
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed">
          An explainable hybrid quantum-classical computational research architecture connecting Cystic Fibrosis transmembrane conductance regulator genomics with intelligent lipid nanoparticle biophysics.
        </p>
      </div>

      {/* Research Disclaimer */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-semibold">Important Non-Clinical Research Disclaimer: </strong>
          This application is a computational biology prototype intended exclusively for scientific exploration, machine learning evaluation, and quantum algorithm benchmarking. Predicted variant pathogenicity scores and formulation transfection parameters are computational research hypotheses. Never represent or use these outputs as validated medical diagnoses, drug formulations, or clinical treatment recommendations.
        </div>
      </div>

      {/* Architecture Flow Section */}
      <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          End-to-End Computational Architecture
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          The platform operates as a cohesive modular pipeline that translates genetic variation and dysregulated pathway targets directly into nanoparticle physical constraints and quantum combinatorial optimization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-1.5">
            <div className="text-cyan-400 font-bold">1. Genomics & Target ID</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              NCBI ClinVar CFTR variants & GSE15568 bronchial epithelial transcriptome profiling.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-1.5">
            <div className="text-violet-400 font-bold">2. LNP Atlas Ingestion</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Standardized 28-field dataset of 1,092+ formulations (Nature Sci Data / Zenodo 17243733).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-1.5">
            <div className="text-pink-400 font-bold">3. Explainable ML</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              XGBoost / Random Forest with exact TreeSHAP feature attributions and mucus indices.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-1.5">
            <div className="text-turquoise-400 font-bold">4. Hybrid Quantum</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              QUBO formulation solved via Statevector QAOA simulator vs Simulated Annealing.
            </p>
          </div>
        </div>
      </div>

      {/* Deployment & Vercel Compatibility */}
      <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-400" />
          Serverless Vercel Deployment Philosophy
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Traditional scientific platforms depend on heavyweight Python backends (Render, Railway, AWS EC2) that are prone to cold starts, container timeout failures, and hosting cost barriers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Serverless TypeScript Engine
            </div>
            <p className="text-slate-400 text-[11px]">
              Next.js 14 App Router executes high-performance algorithms (QUBO assembly, Statevector QAOA simulation, TreeSHAP attribution, CSV parser) directly in edge-compatible serverless functions and browser WebGL.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
            <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Offline Python Pipeline Provided
            </div>
            <p className="text-slate-400 text-[11px]">
              Reproducible offline Python scripts (<code className="text-cyan-300 font-mono">python/</code>) are included for offline Qiskit Aer, RDKit, and scikit-learn research pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Quantum Mathematical Foundation */}
      <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-4 text-xs">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-violet-400" />
          Mathematical QUBO Formulation
        </h2>
        <p className="text-slate-300 leading-relaxed">
          The target selection problem is formalized as minimizing the Ising/QUBO Hamiltonian:
        </p>

        <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 font-mono text-xs text-violet-300 text-center">
          H(x) = -Σᵢ sᵢ xᵢ + λ Σᵢⱼ rᵢⱼ xᵢ xⱼ + A (Σᵢ xᵢ - K)²
        </div>

        <ul className="space-y-1 text-slate-400 list-disc list-inside text-[11px]">
          <li><strong className="text-slate-200">sᵢ:</strong> Biological relevance score derived from DEG fold change and ClinVar clinical weight.</li>
          <li><strong className="text-slate-200">rᵢⱼ:</strong> Redundancy penalty for pairs of targets belonging to the identical functional biological pathway.</li>
          <li><strong className="text-slate-200">K:</strong> Target cardinality constraint (number of therapeutic components to select).</li>
          <li><strong className="text-slate-200">A:</strong> Quadratic penalty multiplier enforcing exact cardinality satisfaction.</li>
        </ul>
      </div>
    </div>
  );
}
