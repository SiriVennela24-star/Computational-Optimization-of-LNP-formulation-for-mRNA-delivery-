// TypeScript definitions for Quantum-XAI CFTR Precision Gene Therapy & LNP Optimization Platform

export interface LnpFormulation {
  formulation_id: string;
  ionizable_lipid: string;
  ionizable_lipid_smiles?: string;
  helper_lipid: string;
  helper_lipid_smiles?: string;
  sterol_lipid: string;
  sterol_lipid_smiles?: string;
  peg_lipid: string;
  peg_lipid_smiles?: string;
  lipid_molar_ratio: string; // e.g. "50:10:38.5:1.5" (ionizable:helper:sterol:peg or standardized)
  ratio_ionizable: number;
  ratio_helper: number;
  ratio_sterol: number;
  ratio_peg: number;
  particle_size_nm: number;
  particle_size_nm_std?: number;
  pdi: number;
  pdi_std?: number;
  zeta_potential_mv?: number;
  zeta_potential_mv_std?: number;
  encapsulation_efficiency_percent: number;
  encapsulation_efficiency_percent_std?: number;
  loading_capacity_std?: number;
  target_type: string; // Cell line, organ, e.g. "CFBE41o- (CF Bronchial)", "A549 (Lung)", "HEK293", "Liver"
  cargo_type: string; // "CFTR mRNA", "eGFP mRNA", "Cas9 mRNA + sgRNA", "siRNA"
  synthesis_method: string; // "Microfluidic Mixing", "Ethanol Dilution", "T-junction", "Thin-film"
  delivery_score: number; // 0 - 100 transfection or relative expression
  paper_title: string;
  paper_authors: string;
  paper_doi: string;
  paper_journal: string;
  paper_year: number;
  is_verified_experimental: boolean;
  notes?: string;
}

export interface DatasetStats {
  totalFormulations: number;
  uniqueIonizableLipids: number;
  uniqueHelperLipids: number;
  uniqueSterolLipids: number;
  uniquePegLipids: number;
  cargoTypes: string[];
  targetTypes: string[];
  synthesisMethods: string[];
  meanParticleSize: number;
  meanPdi: number;
  meanEncapsulationEfficiency: number;
  missingDataPercent: Record<string, number>;
  sourceDataset: string;
  doi: string;
  version: string;
  lastUpdated: string;
}

export interface CftrVariant {
  variant_id: string;
  cdna_change: string; // e.g. "c.1521_1523delCTT"
  protein_consequence: string; // e.g. "p.Phe508del"
  legacy_name: string; // e.g. "F508del"
  exon: number;
  domain: "TMD1" | "NBD1" | "Regulatory (R)" | "TMD2" | "NBD2" | "Intracellular Loop" | "Extracellular Loop";
  functional_class: "I (No synthesis)" | "II (Defective processing/folding)" | "III (Defective gating)" | "IV (Defective conductance)" | "V (Reduced synthesis)" | "VI (Reduced stability)" | "Unknown";
  clinvar_significance: "Pathogenic" | "Likely Pathogenic" | "VUS" | "Likely Benign" | "Benign";
  review_status: string;
  allele_frequency: number;
  pathogenicity_score: number; // 0.0 - 1.0 ML prediction
  predicted_class: "Pathogenic" | "Benign";
  confidence: number;
  features: {
    conservation_score: number; // phyloP / PhastCons (0-1)
    blosum62_score: number; // amino acid substitution matrix
    hydrophobicity_change: number; // Kyte-Doolittle delta
    solvent_accessibility: number; // 0-100%
    secondary_structure: "Helix" | "Sheet" | "Loop";
    charge_change: number;
  };
  shap_values?: Record<string, number>;
}

export interface DegGene {
  gene_symbol: string;
  gene_name: string;
  log2_fold_change: number;
  p_value: number;
  adj_p_value: number; // Benjamini-Hochberg FDR
  expression_status: "Upregulated" | "Downregulated" | "Not Significant";
  cftr_pathway_relevance: string;
  base_mean: number;
}

export interface PathwayEnrichment {
  pathway_id: string;
  pathway_name: string;
  database: "Reactome" | "KEGG" | "GO Biological Process";
  gene_count: number;
  p_value: number;
  adj_p_value: number;
  enrichment_score: number;
  genes: string[];
}

export interface QuboProblem {
  name: string;
  n_variables: number;
  variable_names: string[];
  linear_terms: number[];
  quadratic_matrix: number[][]; // N x N
  target_k: number;
  penalty_multiplier: number;
  redundancy_weight: number;
}

export interface QuboResult {
  algorithm: "QAOA Simulation" | "Simulated Annealing" | "Exact Brute Force";
  is_quantum_simulator: boolean;
  hardware_claim: string;
  selected_indices: number[];
  selected_variables: string[];
  best_energy: number;
  constraint_satisfied: boolean;
  runtime_ms: number;
  iterations: number;
  convergence_history: { iteration: number; energy: number; probability?: number }[];
  bitstring: string;
  optimal_parameters?: { gamma: number[]; beta: number[] };
}

export interface ShapExplanation {
  feature_names: string[];
  base_value: number;
  prediction: number;
  values: number[]; // SHAP value per feature
  data: (number | string)[]; // Feature input value
  normalized_importances: Record<string, number>;
}
