import React from "react";
import Link from "next/link";
import { Dna, ShieldAlert, BookOpen, ExternalLink, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-navy-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Research Disclaimer Alert */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-amber-300">Computational Research Prototype Disclaimer: </strong>
            This software platform is engineered solely for computational biology research, machine learning evaluation, and exploratory quantum optimization benchmarking. All CFTR variant classifications, LNP transfection predictions, and formulation rankings represent computational hypotheses and are NOT clinically validated diagnostic or therapeutic recommendations. Do not use for patient treatment decisions.
          </div>
        </div>

        {/* Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Dna className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold text-white text-sm">Quantum-XAI CFTR</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Precision gene therapy design connecting CFTR genomics with hybrid quantum-classical lipid nanoparticle delivery optimization.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Core Modules</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/lnp-atlas" className="hover:text-cyan-400 transition-colors">LNP Atlas Database</Link></li>
              <li><Link href="/cftr" className="hover:text-cyan-400 transition-colors">CFTR Variant Explorer</Link></li>
              <li><Link href="/delivery" className="hover:text-cyan-400 transition-colors">LNP Delivery Predictor</Link></li>
              <li><Link href="/quantum" className="hover:text-cyan-400 transition-colors">Quantum QUBO Optimization</Link></li>
              <li><Link href="/pathways" className="hover:text-cyan-400 transition-colors">GEO GSE15568 Pathways</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Scientific Data Sources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://doi.org/10.5281/zenodo.17243733" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400">
                  <span>LNP Atlas (Zenodo 17243733)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.ncbi.nlm.nih.gov/clinvar/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400">
                  <span>NCBI ClinVar CFTR</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE15568" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400">
                  <span>NCBI GEO GSE15568</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.rcsb.org/structure/5UAK" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400">
                  <span>Cryo-EM CFTR (PDB 5UAK)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Methodology & Deploy</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/explainability" className="hover:text-cyan-400 transition-colors">Explainable AI (SHAP)</Link></li>
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">Research Architecture</Link></li>
              <li><Link href="/references" className="hover:text-cyan-400 transition-colors">Peer-Reviewed Citations</Link></li>
              <li className="pt-2 text-[11px] text-slate-500">Deployable via Vercel Edge Serverless</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Quantum-XAI CFTR Precision Gene Therapy Consortium. Open Science Research.</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-violet-400" />
              Hybrid Quantum-Classical Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
