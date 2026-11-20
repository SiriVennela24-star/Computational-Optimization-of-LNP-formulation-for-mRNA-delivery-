import { ShapExplanation } from "@/types";

export interface DeliveryPredictionInput {
  ionizable_lipid: string;
  helper_lipid: string;
  sterol_lipid: string;
  peg_lipid: string;
  ratio_ionizable: number;
  ratio_helper: number;
  ratio_sterol: number;
  ratio_peg: number;
  target_type: string;
  cargo_type: string;
  synthesis_method: string;
}

export interface DeliveryPredictionOutput {
  predicted_delivery_score: number; // 0 - 100
  predicted_encapsulation_efficiency: number; // %
  predicted_particle_size_nm: number; // nm
  predicted_pdi: number;
  confidence_interval: [number, number];
  mucus_penetration_index: number; // 0 - 100
  endosomal_escape_score: number; // 0 - 100
  shap: ShapExplanation;
  optimization_recommendations: string[];
}

export function predictLnpDelivery(input: DeliveryPredictionInput): DeliveryPredictionOutput {
  let score = 75.0;
  let ee = 90.0;
  let size = 80.0;
  let pdi = 0.095;

  const shapContributions: Record<string, number> = {
    "Ionizable Lipid Identity": 0,
    "Helper Lipid Phase Transition (DOPE vs DSPC)": 0,
    "Sterol Packing (β-Sitosterol vs Cholesterol)": 0,
    "PEG mol% Mucus Shielding vs Uptake": 0,
    "Ionizable Lipid Molar Ratio": 0,
    "Synthesis Method Fluidics": 0,
  };

  // 1. Ionizable Lipid impact
  const ionizable = input.ionizable_lipid.toLowerCase();
  if (ionizable.includes("sm-102") || ionizable.includes("alc-0315")) {
    score += 8.5;
    ee += 4.2;
    shapContributions["Ionizable Lipid Identity"] += 8.5;
  } else if (ionizable.includes("ckk-e12") || ionizable.includes("ftt5")) {
    score += 10.2;
    ee += 5.1;
    shapContributions["Ionizable Lipid Identity"] += 10.2;
  } else if (ionizable.includes("c12-200") || ionizable.includes("tt3")) {
    score += 6.0;
    ee += 3.5;
    shapContributions["Ionizable Lipid Identity"] += 6.0;
  } else if (ionizable.includes("mc3")) {
    score += 2.0;
    shapContributions["Ionizable Lipid Identity"] += 2.0;
  } else {
    score -= 3.0;
    shapContributions["Ionizable Lipid Identity"] -= 3.0;
  }

  // 2. Helper lipid impact (DOPE promotes inverted hexagonal H_II phase for endosomal release)
  const helper = input.helper_lipid.toLowerCase();
  if (helper.includes("dope")) {
    score += 7.2;
    shapContributions["Helper Lipid Phase Transition (DOPE vs DSPC)"] += 7.2;
  } else if (helper.includes("dspc")) {
    score += 1.5;
    ee += 1.5; // DSPC stabilizes bilayer
    shapContributions["Helper Lipid Phase Transition (DOPE vs DSPC)"] += 1.5;
  }

  // 3. Sterol impact (Beta-sitosterol alters crystalline rigidity)
  const sterol = input.sterol_lipid.toLowerCase();
  if (sterol.includes("sitosterol")) {
    score += 6.4;
    size -= 4.0;
    shapContributions["Sterol Packing (β-Sitosterol vs Cholesterol)"] += 6.4;
  } else {
    shapContributions["Sterol Packing (β-Sitosterol vs Cholesterol)"] += 1.0;
  }

  // 4. PEG molar ratio impact (PEG dilemma in CF mucus)
  // Optimal for CF airways: 2.0 - 2.5 mol%. < 1.5% gets stuck in mucin mesh; > 3.5% inhibits cellular uptake
  const pegMol = input.ratio_peg;
  let mucusIndex = 70;
  if (pegMol >= 1.8 && pegMol <= 2.8) {
    score += 6.8;
    mucusIndex = 92;
    pdi -= 0.02;
    shapContributions["PEG mol% Mucus Shielding vs Uptake"] += 6.8;
  } else if (pegMol < 1.5) {
    score -= 5.5;
    mucusIndex = 48; // mucin adhesion
    shapContributions["PEG mol% Mucus Shielding vs Uptake"] -= 5.5;
  } else if (pegMol > 3.5) {
    score -= 8.0; // PEG shedding blockage
    mucusIndex = 95;
    shapContributions["PEG mol% Mucus Shielding vs Uptake"] -= 8.0;
  }

  // 5. Ionizable lipid ratio (optimal 40 - 50 mol%)
  const ionMol = input.ratio_ionizable;
  if (ionMol >= 40 && ionMol <= 50) {
    score += 4.5;
    ee += 2.0;
    shapContributions["Ionizable Lipid Molar Ratio"] += 4.5;
  } else {
    score -= 6.0;
    ee -= 5.0;
    shapContributions["Ionizable Lipid Molar Ratio"] -= 6.0;
  }

  // 6. Synthesis method
  const synthesis = input.synthesis_method.toLowerCase();
  if (synthesis.includes("microfluidic")) {
    score += 4.0;
    size = 72.0;
    pdi = 0.075;
    shapContributions["Synthesis Method Fluidics"] += 4.0;
  } else {
    score -= 4.0;
    size = 110.0;
    pdi = 0.165;
    shapContributions["Synthesis Method Fluidics"] -= 4.0;
  }

  const finalScore = Number(Math.max(10, Math.min(99.5, score)).toFixed(1));
  const finalEe = Number(Math.max(40, Math.min(99.2, ee)).toFixed(1));
  const finalSize = Number(Math.max(50, Math.min(180, size)).toFixed(1));
  const finalPdi = Number(Math.max(0.04, Math.min(0.28, pdi)).toFixed(3));

  const recommendations: string[] = [];
  if (pegMol < 1.8 && input.target_type.toLowerCase().includes("cf")) {
    recommendations.push("Increase PEG-lipid to ~2.0 - 2.5 mol% to prevent mucin entrapment in cystic fibrosis airway sputum.");
  }
  if (!helper.includes("dope") && finalScore < 85) {
    recommendations.push("Consider substituting DSPC with DOPE to induce inverted hexagonal (H_II) phase transition for accelerated endosomal escape.");
  }
  if (!sterol.includes("sitosterol")) {
    recommendations.push("Screening beta-sitosterol in place of cholesterol can augment membrane perturbation in pulmonary epithelia.");
  }
  if (!synthesis.includes("microfluidic")) {
    recommendations.push("Switch to staggered herringbone microfluidic mixing to narrow particle size distribution below 80 nm (PDI < 0.1).");
  }

  const featureNames = Object.keys(shapContributions);
  const values = Object.values(shapContributions);
  const baseValue = 72.0;

  const shap: ShapExplanation = {
    feature_names: featureNames,
    base_value: baseValue,
    prediction: finalScore,
    values: values,
    data: [
      input.ionizable_lipid,
      input.helper_lipid,
      input.sterol_lipid,
      `${input.ratio_peg} mol%`,
      `${input.ratio_ionizable} mol%`,
      input.synthesis_method,
    ],
    normalized_importances: {
      "Ionizable Lipid Identity": 0.32,
      "Helper Lipid Transition": 0.22,
      "Sterol Matrix": 0.18,
      "PEG Airway Shielding": 0.15,
      "Ionizable Mol%": 0.08,
      "Microfluidics Quality": 0.05,
    },
  };

  return {
    predicted_delivery_score: finalScore,
    predicted_encapsulation_efficiency: finalEe,
    predicted_particle_size_nm: finalSize,
    predicted_pdi: finalPdi,
    confidence_interval: [Math.max(0, finalScore - 5.5), Math.min(100, finalScore + 5.5)],
    mucus_penetration_index: mucusIndex,
    endosomal_escape_score: Number(Math.min(99, finalScore * 0.95).toFixed(1)),
    shap,
    optimization_recommendations: recommendations,
  };
}
