"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Sliders,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  Info,
  RefreshCw,
} from "lucide-react";
import { predictLnpDelivery } from "@/lib/ml/deliveryPredictor";
import { getDatasetUniqueComponents } from "@/lib/datasets/lnpAtlas";
import ShapWaterfall from "@/components/charts/ShapWaterfall";
import CompositionChart from "@/components/charts/CompositionChart";

export default function LnpDeliveryPredictionPage() {
  const components = getDatasetUniqueComponents();

  // State
  const [selectedIonizable, setSelectedIonizable] = useState<string>("SM-102");
  const [selectedHelper, setSelectedHelper] = useState<string>("DOPE");
  const [selectedSterol, setSelectedSterol] = useState<string>("beta-sitosterol");
  const [selectedPeg, setSelectedPeg] = useState<string>("DMG-PEG2000");
  const [ratioIonizable, setRatioIonizable] = useState<number>(48.0);
  const [ratioHelper, setRatioHelper] = useState<number>(14.0);
  const [ratioSterol, setRatioSterol] = useState<number>(35.5);
  const [ratioPeg, setRatioPeg] = useState<number>(2.5);
  const [selectedTarget, setSelectedTarget] = useState<string>("CFBE41o- (CF Bronchial)");
  const [selectedCargo, setSelectedCargo] = useState<string>("CFTR mRNA");
  const [selectedSynthesis, setSelectedSynthesis] = useState<string>("Microfluidic Mixing");

  // Run live prediction
  const prediction = predictLnpDelivery({
    ionizable_lipid: selectedIonizable,
    helper_lipid: selectedHelper,
    sterol_lipid: selectedSterol,
    peg_lipid: selectedPeg,
    ratio_ionizable: ratioIonizable,
    ratio_helper: ratioHelper,
    ratio_sterol: ratioSterol,
    ratio_peg: ratioPeg,
    target_type: selectedTarget,
    cargo_type: selectedCargo,
    synthesis_method: selectedSynthesis,
  });

  // Apply Presets
  const applyPreset = (preset: "moderna" | "biontech" | "cf-optimized" | "patisiran") => {
    if (preset === "moderna") {
      setSelectedIonizable("SM-102");
      setSelectedHelper("DSPC");
      setSelectedSterol("Cholesterol");
      setSelectedPeg("DMG-PEG2000");
      setRatioIonizable(50.0);
      setRatioHelper(10.0);
      setRatioSterol(38.5);
      setRatioPeg(1.5);
    } else if (preset === "biontech") {
      setSelectedIonizable("ALC-0315");
      setSelectedHelper("DSPC");
      setSelectedSterol("Cholesterol");
      setSelectedPeg("ALC-0159");
      setRatioIonizable(46.3);
      setRatioHelper(9.4);
      setRatioSterol(42.7);
      setRatioPeg(1.6);
    } else if (preset === "cf-optimized") {
      setSelectedIonizable("CKK-E12");
      setSelectedHelper("DOPE");
      setSelectedSterol("beta-sitosterol");
      setSelectedPeg("DMG-PEG2000");
      setRatioIonizable(48.0);
      setRatioHelper(14.0);
      setRatioSterol(35.5);
      setRatioPeg(2.5);
    } else if (preset === "patisiran") {
      setSelectedIonizable("DLin-MC3-DMA");
      setSelectedHelper("DSPC");
      setSelectedSterol("Cholesterol");
      setSelectedPeg("DMG-PEG2000");
      setRatioIonizable(50.0);
      setRatioHelper(10.0);
      setRatioSterol(38.5);
      setRatioPeg(1.5);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-500/15 text-pink-300 border border-pink-500/30">
            Biophysical ML Regressor & Sputum Penetration Engine
          </span>
          <span className="text-xs text-slate-400 font-mono">Study-Aware Validation</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          LNP Delivery Performance & Transfection Predictor
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl leading-relaxed">
          Model lipid nanoparticle cellular uptake, endosomal escape kinetics, particle hydrodynamic diameter, and mucus penetration efficiency across custom component combinations.
        </p>
      </div>

      {/* Preset Quick Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-medium">Quick Presets:</span>
        <button
          onClick={() => applyPreset("cf-optimized")}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-turquoise-500/20 text-turquoise-300 border border-turquoise-500/40 hover:bg-turquoise-500/30 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>CF Pulmonary Optimized (DOPE + β-Sitosterol)</span>
        </button>
        <button
          onClick={() => applyPreset("moderna")}
          className="px-3 py-1.5 rounded-xl text-xs font-medium bg-navy-900 border border-slate-700 text-slate-300 hover:text-white"
        >
          Moderna Spikevax (SM-102)
        </button>
        <button
          onClick={() => applyPreset("biontech")}
          className="px-3 py-1.5 rounded-xl text-xs font-medium bg-navy-900 border border-slate-700 text-slate-300 hover:text-white"
        >
          Pfizer/BioNTech (ALC-0315)
        </button>
        <button
          onClick={() => applyPreset("patisiran")}
          className="px-3 py-1.5 rounded-xl text-xs font-medium bg-navy-900 border border-slate-700 text-slate-300 hover:text-white"
        >
          Patisiran (DLin-MC3-DMA)
        </button>
      </div>

      {/* Main Grid: Form Builder (6 cols) & Live Results (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Formulation Composer (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-navy-900/70 border border-slate-800 space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Lipid Nanoparticle Composition Builder
            </h2>

            {/* 4 Lipid Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Ionizable Lipid</label>
                <select
                  value={selectedIonizable}
                  onChange={(e) => setSelectedIonizable(e.target.value)}
                  className="w-full py-2 px-2.5 rounded-xl bg-navy-950 border border-slate-800 text-slate-200 focus:border-cyan-400"
                >
                  {components.ionizableLipids.map((lip) => (
                    <option key={lip} value={lip}>{lip}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Helper Phospholipid</label>
                <select
                  value={selectedHelper}
                  onChange={(e) => setSelectedHelper(e.target.value)}
                  className="w-full py-2 px-2.5 rounded-xl bg-navy-950 border border-slate-800 text-slate-200 focus:border-cyan-400"
                >
                  {components.helperLipids.map((lip) => (
                    <option key={lip} value={lip}>{lip}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sterol Matrix</label>
                <select
                  value={selectedSterol}
                  onChange={(e) => setSelectedSterol(e.target.value)}
                  className="w-full py-2 px-2.5 rounded-xl bg-navy-950 border border-slate-800 text-slate-200 focus:border-cyan-400"
                >
                  {components.sterolLipids.map((lip) => (
                    <option key={lip} value={lip}>{lip}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">PEG-Lipid</label>
                <select
                  value={selectedPeg}
                  onChange={(e) => setSelectedPeg(e.target.value)}
                  className="w-full py-2 px-2.5 rounded-xl bg-navy-950 border border-slate-800 text-slate-200 focus:border-cyan-400"
                >
                  {components.pegLipids.map((lip) => (
                    <option key={lip} value={lip}>{lip}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Molar Ratio Sliders */}
            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-300">
                <span>Lipid Molar Ratios (Total: {(ratioIonizable + ratioHelper + ratioSterol + ratioPeg).toFixed(1)}%)</span>
                <span className="font-mono text-cyan-400">
                  {ratioIonizable}:{ratioHelper}:{ratioSterol}:{ratioPeg}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 text-[11px] mb-0.5">
                  <span>Ionizable Lipid:</span>
                  <span className="font-mono text-violet-400 font-bold">{ratioIonizable} mol%</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="60"
                  step="0.5"
                  value={ratioIonizable}
                  onChange={(e) => setRatioIonizable(parseFloat(e.target.value))}
                  className="w-full accent-violet-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 text-[11px] mb-0.5">
                  <span>Helper Lipid:</span>
                  <span className="font-mono text-cyan-400 font-bold">{ratioHelper} mol%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="0.5"
                  value={ratioHelper}
                  onChange={(e) => setRatioHelper(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 text-[11px] mb-0.5">
                  <span>Sterol Matrix:</span>
                  <span className="font-mono text-blue-400 font-bold">{ratioSterol} mol%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="55"
                  step="0.5"
                  value={ratioSterol}
                  onChange={(e) => setRatioSterol(parseFloat(e.target.value))}
                  className="w-full accent-blue-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 text-[11px] mb-0.5">
                  <span>PEG-Lipid (Mucus Shielding):</span>
                  <span className="font-mono text-turquoise-400 font-bold">{ratioPeg} mol%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={ratioPeg}
                  onChange={(e) => setRatioPeg(parseFloat(e.target.value))}
                  className="w-full accent-teal-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Target, Cargo, Fluidics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Model</label>
                <select
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="w-full py-1.5 px-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-200"
                >
                  {components.targetTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Payload</label>
                <select
                  value={selectedCargo}
                  onChange={(e) => setSelectedCargo(e.target.value)}
                  className="w-full py-1.5 px-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-200"
                >
                  {components.cargoTypes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Synthesis</label>
                <select
                  value={selectedSynthesis}
                  onChange={(e) => setSelectedSynthesis(e.target.value)}
                  className="w-full py-1.5 px-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-200"
                >
                  {components.synthesisMethods.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <CompositionChart
                ionizable={ratioIonizable}
                helper={ratioHelper}
                sterol={ratioSterol}
                peg={ratioPeg}
              />
            </div>
          </div>
        </div>

        {/* Right: Live Predictions & Explanations (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Prediction Score Card */}
          <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                  Predicted Delivery Score
                </span>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-turquoise-300 to-emerald-400 font-mono mt-1">
                  {prediction.predicted_delivery_score} <span className="text-sm font-normal text-slate-400">/ 100</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">
                  95% Confidence Interval: [{prediction.confidence_interval[0].toFixed(1)} - {prediction.confidence_interval[1].toFixed(1)}]
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Feasibility
                </span>
              </div>
            </div>

            {/* Sub-Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Size (DLS)</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {prediction.predicted_particle_size_nm} nm
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">PDI</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {prediction.predicted_pdi}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Encapsulation</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  {prediction.predicted_encapsulation_efficiency}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">CF Mucus Index</div>
                <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">
                  {prediction.mucus_penetration_index} / 100
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {prediction.optimization_recommendations.length > 0 && (
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 space-y-1 text-xs">
                <span className="font-bold text-cyan-300 block">AI Formulation Guidance:</span>
                {prediction.optimization_recommendations.map((rec, i) => (
                  <div key={i} className="text-slate-300 text-[11px] leading-relaxed">
                    • {rec}
                  </div>
                ))}
              </div>
            )}

            {/* SHAP Waterfall Chart */}
            <ShapWaterfall
              shap={prediction.shap}
              title="Feature Contributions to Transfection Score"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
