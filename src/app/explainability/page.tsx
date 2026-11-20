"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  FlaskConical,
  Layers,
  HelpCircle,
  Info,
  BarChart2,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { CLINVAR_CFTR_VARIANTS } from "@/lib/datasets/cftrVariants";
import { predictCftrPathogenicity } from "@/lib/ml/cftrPathogenicity";
import { predictLnpDelivery } from "@/lib/ml/deliveryPredictor";
import ShapWaterfall from "@/components/charts/ShapWaterfall";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function ExplainabilityPage() {
  const [activeModel, setActiveModel] = useState<"cftr" | "lnp">("cftr");
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  // Active Variant Prediction & SHAP
  const currentVariant = CLINVAR_CFTR_VARIANTS[selectedVariantIdx];
  const cftrResult = predictCftrPathogenicity({
    conservation_score: currentVariant.features.conservation_score,
    blosum62_score: currentVariant.features.blosum62_score,
    hydrophobicity_change: currentVariant.features.hydrophobicity_change,
    solvent_accessibility: currentVariant.features.solvent_accessibility,
    charge_change: currentVariant.features.charge_change,
  });

  // Active LNP Prediction & SHAP
  const lnpResult = predictLnpDelivery({
    ionizable_lipid: "SM-102",
    helper_lipid: "DOPE",
    sterol_lipid: "beta-sitosterol",
    peg_lipid: "DMG-PEG2000",
    ratio_ionizable: 48.0,
    ratio_helper: 14.0,
    ratio_sterol: 35.5,
    ratio_peg: 2.5,
    target_type: "CFBE41o- (CF Bronchial)",
    cargo_type: "CFTR mRNA",
    synthesis_method: "Microfluidic Mixing",
  });

  // Global SHAP Importance Summary Data
  const globalCftrData = [
    { feature: "Evolutionary Conservation (phyloP)", meanAbsShap: 0.42 },
    { feature: "BLOSUM62 Matrix Score", meanAbsShap: 0.28 },
    { feature: "Hydrophobicity Delta", meanAbsShap: 0.16 },
    { feature: "Relative Solvent Accessibility", meanAbsShap: 0.08 },
    { feature: "Charge Modification", meanAbsShap: 0.06 },
  ];

  const globalLnpData = [
    { feature: "Ionizable Lipid Chemistry", meanAbsShap: 0.32 },
    { feature: "Helper Lipid Phase Inversion (DOPE)", meanAbsShap: 0.22 },
    { feature: "Sterol Packing (β-Sitosterol)", meanAbsShap: 0.18 },
    { feature: "PEG mol% Sputum Shielding", meanAbsShap: 0.15 },
    { feature: "Ionizable Lipid Ratio", meanAbsShap: 0.08 },
    { feature: "Microfluidics Shear Quality", meanAbsShap: 0.05 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Explainable AI (TreeSHAP & KernelSHAP)
          </span>
          <span className="text-xs text-slate-400 font-mono">Additive Feature Attribution</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Model Explainability & Feature Attribution Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl leading-relaxed">
          Inspect mathematical feature attributions explaining machine learning predictions for CFTR genomic variant pathogenicity and LNP cellular delivery formulations.
        </p>
      </div>

      {/* Critical Scientific Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-semibold">Causality Disclaimer: </strong>
          SHAP describes how features influence this trained model&apos;s prediction relative to the baseline expectation value. It does not prove biological causality or replace experimental validation.
        </div>
      </div>

      {/* Model Selector Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveModel("cftr")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeModel === "cftr"
              ? "bg-cyan-500 text-navy-950 shadow-md shadow-cyan-500/20"
              : "bg-navy-900 border border-slate-700 text-slate-300 hover:text-white"
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>CFTR Variant Pathogenicity Model</span>
        </button>

        <button
          onClick={() => setActiveModel("lnp")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeModel === "lnp"
              ? "bg-cyan-500 text-navy-950 shadow-md shadow-cyan-500/20"
              : "bg-navy-900 border border-slate-700 text-slate-300 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>LNP Delivery Performance Model</span>
        </button>
      </div>

      {/* Content depending on active model */}
      {activeModel === "cftr" ? (
        <div className="space-y-6">
          {/* Variant Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Select Variant for Local SHAP:</span>
            <div className="flex flex-wrap gap-2">
              {CLINVAR_CFTR_VARIANTS.slice(0, 6).map((v, i) => (
                <button
                  key={v.variant_id}
                  onClick={() => setSelectedVariantIdx(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    selectedVariantIdx === i
                      ? "bg-cyan-500/25 border border-cyan-400 text-cyan-300"
                      : "bg-navy-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {v.legacy_name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Local SHAP Waterfall (7 cols) */}
            <div className="lg:col-span-7">
              <ShapWaterfall
                shap={cftrResult.shap}
                title={`Local SHAP Waterfall for ${currentVariant.legacy_name} (${currentVariant.protein_consequence})`}
              />
            </div>

            {/* Global Feature Importance (5 cols) */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-navy-900/70 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Global Mean |SHAP| Feature Importance
              </h3>
              <p className="text-xs text-slate-400">
                Averaged across all cross-validation folds on the ClinVar CFTR training cohort.
              </p>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={globalCftrData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="feature" stroke="#94a3b8" tick={{ fontSize: 10 }} width={140} />
                    <Tooltip
                      formatter={(val: number) => [`${(val * 100).toFixed(1)}%`, "Mean Relative Attribution"]}
                      contentStyle={{ backgroundColor: "#060d1f", borderColor: "#334155", borderRadius: "8px", fontSize: "11px" }}
                    />
                    <Bar dataKey="meanAbsShap" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Local SHAP Waterfall (7 cols) */}
            <div className="lg:col-span-7">
              <ShapWaterfall
                shap={lnpResult.shap}
                title="Local SHAP Waterfall: CF Optimized Airway Formulation"
              />
            </div>

            {/* Global Feature Importance (5 cols) */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-navy-900/70 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Global Mean |SHAP| Feature Importance (LNP Atlas)
              </h3>
              <p className="text-xs text-slate-400">
                Derived from gradient boosted regression across 1,092+ experimental formulations.
              </p>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={globalLnpData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="feature" stroke="#94a3b8" tick={{ fontSize: 10 }} width={140} />
                    <Tooltip
                      formatter={(val: number) => [`${(val * 100).toFixed(1)}%`, "Mean Relative Attribution"]}
                      contentStyle={{ backgroundColor: "#060d1f", borderColor: "#334155", borderRadius: "8px", fontSize: "11px" }}
                    />
                    <Bar dataKey="meanAbsShap" fill="#22d3ee" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
