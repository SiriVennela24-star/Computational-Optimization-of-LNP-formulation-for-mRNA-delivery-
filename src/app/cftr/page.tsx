"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Search,
  Filter,
  Dna,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BarChart2,
} from "lucide-react";
import { CLINVAR_CFTR_VARIANTS, CFTR_PROTEIN_INFO } from "@/lib/datasets/cftrVariants";
import { predictCftrPathogenicity, CFTR_MODEL_METRICS } from "@/lib/ml/cftrPathogenicity";
import { CftrVariant } from "@/types";
import ShapWaterfall from "@/components/charts/ShapWaterfall";

export default function CftrResearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedVariant, setSelectedVariant] = useState<CftrVariant>(CLINVAR_CFTR_VARIANTS[0]);

  // Interactive Custom Prediction Inputs
  const [inputConservation, setInputConservation] = useState<number>(0.95);
  const [inputBlosum, setInputBlosum] = useState<number>(-4.0);
  const [inputHydrophobicity, setInputHydrophobicity] = useState<number>(2.5);
  const [inputRsa, setInputRsa] = useState<number>(18.0);
  const [inputCharge, setInputCharge] = useState<number>(0);

  // Compute live prediction
  const livePrediction = predictCftrPathogenicity({
    conservation_score: inputConservation,
    blosum62_score: inputBlosum,
    hydrophobicity_change: inputHydrophobicity,
    solvent_accessibility: inputRsa,
    charge_change: inputCharge,
  });

  // Filtered variants table
  const filteredVariants = CLINVAR_CFTR_VARIANTS.filter((v) => {
    const matchesSearch =
      v.legacy_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.protein_consequence.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.cdna_change.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.variant_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === "All" || v.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const loadVariantIntoPredictor = (v: CftrVariant) => {
    setSelectedVariant(v);
    setInputConservation(v.features.conservation_score);
    setInputBlosum(v.features.blosum62_score);
    setInputHydrophobicity(v.features.hydrophobicity_change);
    setInputRsa(v.features.solvent_accessibility);
    setInputCharge(v.features.charge_change);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            NCBI ClinVar + Bioinformatic Pipeline
          </span>
          <span className="text-xs text-slate-400 font-mono">PDB: {CFTR_PROTEIN_INFO.pdb_reference}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          CFTR Genetic Variant & Pathogenicity Research Module
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl leading-relaxed">
          Screen clinical mutations in the Cystic Fibrosis Transmembrane Conductance Regulator gene, inspect structural domain mapping, and evaluate non-linear machine learning pathogenicity predictions with local SHAP feature attributions.
        </p>
      </div>

      {/* Protein Architecture Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {CFTR_PROTEIN_INFO.domains.map((dom, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedDomain === dom.name.split(" ")[0]
                ? "bg-cyan-500/15 border-cyan-500/60 shadow-md shadow-cyan-500/10"
                : "bg-navy-900/60 border-slate-800 hover:border-slate-700"
            }`}
            onClick={() => {
              const shortName = dom.name.split(" ")[0];
              setSelectedDomain(selectedDomain === shortName ? "All" : shortName);
            }}
          >
            <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">{dom.name.split(" ")[0]}</div>
            <div className="text-xs font-semibold text-white mt-0.5">Residues {dom.range}</div>
            <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{dom.function}</div>
          </div>
        ))}
      </div>

      {/* Main Grid: Variant Explorer & Interactive ML Predictor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: ClinVar Variant Explorer (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-cyan-400" />
              ClinVar Variant Database ({filteredVariants.length})
            </h2>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search F508del, G542X, exon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-navy-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Variants Table */}
          <div className="rounded-xl border border-slate-800 bg-navy-900/50 overflow-hidden">
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-navy-950 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  <tr>
                    <th className="p-3">Variant</th>
                    <th className="p-3">Domain</th>
                    <th className="p-3">Functional Class</th>
                    <th className="p-3">ClinVar Status</th>
                    <th className="p-3">ML Score</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredVariants.map((v) => (
                    <tr
                      key={v.variant_id}
                      className={`hover:bg-navy-800/40 transition-colors cursor-pointer ${
                        selectedVariant.variant_id === v.variant_id ? "bg-cyan-500/10" : ""
                      }`}
                      onClick={() => loadVariantIntoPredictor(v)}
                    >
                      <td className="p-3 font-semibold text-white">
                        <div className="text-cyan-300 font-mono">{v.legacy_name}</div>
                        <div className="text-[10px] text-slate-400">{v.protein_consequence}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">
                          {v.domain}
                        </span>
                      </td>
                      <td className="p-3 text-[11px] text-slate-300">{v.functional_class.split(" ")[0]}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                            v.clinvar_significance === "Pathogenic"
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : v.clinvar_significance.includes("Benign")
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {v.clinvar_significance}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-white">
                        {(v.pathogenicity_score * 100).toFixed(0)}%
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => loadVariantIntoPredictor(v)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-navy-800 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700 hover:border-cyan-400 transition-all"
                        >
                          Analyze
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Live Pathogenicity ML Model & SHAP (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  Live ML Pathogenicity Predictor
                </h3>
                <p className="text-[11px] text-slate-400">
                  Evaluating {selectedVariant.legacy_name} ({selectedVariant.protein_consequence})
                </p>
              </div>
              <div className="text-right">
                <div
                  className={`text-lg font-black font-mono ${
                    livePrediction.predicted_class === "Pathogenic" ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  {(livePrediction.score * 100).toFixed(1)}%
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  {livePrediction.predicted_class}
                </div>
              </div>
            </div>

            {/* Feature Sliders */}
            <div className="space-y-3 text-xs pt-2 border-t border-slate-800">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Evolutionary Conservation (phyloP):</span>
                  <span className="font-mono text-cyan-400 font-bold">{inputConservation.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.01"
                  value={inputConservation}
                  onChange={(e) => setInputConservation(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>BLOSUM62 Substitution Matrix Score:</span>
                  <span className="font-mono text-violet-400 font-bold">{inputBlosum}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="4"
                  step="1"
                  value={inputBlosum}
                  onChange={(e) => setInputBlosum(parseInt(e.target.value))}
                  className="w-full accent-violet-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Hydrophobicity Delta (Kyte-Doolittle):</span>
                  <span className="font-mono text-pink-400 font-bold">{inputHydrophobicity.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-5.0"
                  max="5.0"
                  step="0.1"
                  value={inputHydrophobicity}
                  onChange={(e) => setInputHydrophobicity(parseFloat(e.target.value))}
                  className="w-full accent-pink-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Relative Solvent Accessibility (RSA %):</span>
                  <span className="font-mono text-turquoise-400 font-bold">{inputRsa.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={inputRsa}
                  onChange={(e) => setInputRsa(parseFloat(e.target.value))}
                  className="w-full accent-teal-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* SHAP Waterfall Chart */}
            <div className="pt-2">
              <ShapWaterfall
                shap={livePrediction.shap}
                title="SHAP Local Feature Contribution"
              />
            </div>

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Research Note: </strong>
                Model predictions are computational research estimates based on trained XGBoost decision trees and are not clinical diagnoses.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
