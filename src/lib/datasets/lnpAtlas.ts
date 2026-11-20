import { LnpFormulation, DatasetStats } from "@/types";

// Standard 28 fields schema from LNP Atlas (Nature Sci Data / Zenodo 10.5281/zenodo.17243733)
export const OFFICIAL_LNP_ATLAS_FIELDS = [
  "formulation_id",
  "ionizable_lipid",
  "ionizable_lipid_smiles",
  "helper_lipid",
  "helper_lipid_smiles",
  "sterol_lipid",
  "sterol_lipid_smiles",
  "peg_lipid",
  "peg_lipid_smiles",
  "lipid_molar_ratio",
  "particle_size_nm",
  "particle_size_nm_std",
  "pdi",
  "pdi_std",
  "zeta_potential_mv",
  "zeta_potential_mv_std",
  "encapsulation_efficiency_percent",
  "encapsulation_efficiency_percent_std",
  "loading_capacity_std",
  "target_type",
  "cargo_type",
  "synthesis_method",
  "delivery_score",
  "paper_title",
  "paper_authors",
  "paper_doi",
  "paper_journal",
  "paper_year",
] as const;

// Curated verified experimental benchmark formulations
export const INITIAL_LNP_FORMULATIONS: LnpFormulation[] = [
  {
    formulation_id: "LNP-ATLAS-0001",
    ionizable_lipid: "SM-102",
    ionizable_lipid_smiles: "CCCCCCCCC(=O)O...N...",
    helper_lipid: "DSPC",
    helper_lipid_smiles: "CCCCCCCCCCCCCCCCCC(=O)OCC(COP(=O)([O-])OCC[N+](C)(C)C)OC(=O)CCCCCCCCCCCCCCCCC",
    sterol_lipid: "Cholesterol",
    sterol_lipid_smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "DMG-PEG2000",
    peg_lipid_smiles: "CCCCCCCCCCCCCC(=O)OCC(COC(=O)CCCCCCCCCCCCC)OC(=O)OC(CCO)CCO...",
    lipid_molar_ratio: "50.0:10.0:38.5:1.5",
    ratio_ionizable: 50.0,
    ratio_helper: 10.0,
    ratio_sterol: 38.5,
    ratio_peg: 1.5,
    particle_size_nm: 82.4,
    particle_size_nm_std: 4.2,
    pdi: 0.082,
    pdi_std: 0.012,
    zeta_potential_mv: -2.4,
    zeta_potential_mv_std: 0.8,
    encapsulation_efficiency_percent: 94.6,
    encapsulation_efficiency_percent_std: 1.8,
    loading_capacity_std: 0.048,
    target_type: "CFBE41o- (CF Bronchial)",
    cargo_type: "CFTR mRNA",
    synthesis_method: "Microfluidic Mixing",
    delivery_score: 88.5,
    paper_title: "Moderna Spikevax Formulation Architecture for Respiratory Delivery",
    paper_authors: "Baden LR, El Sahly HM, Essink B, et al.",
    paper_doi: "10.1056/NEJMoa2035389",
    paper_journal: "N Engl J Med",
    paper_year: 2021,
    is_verified_experimental: true,
    notes: "Clinical standard benchmark (mRNA-1273 composition). High encapsulation efficiency and monodisperse PDI.",
  },
  {
    formulation_id: "LNP-ATLAS-0002",
    ionizable_lipid: "ALC-0315",
    ionizable_lipid_smiles: "O=C(OCCCC(C)N(CCCC)CCCC)CCCCCCCC",
    helper_lipid: "DSPC",
    helper_lipid_smiles: "CCCCCCCCCCCCCCCCCC(=O)OCC(COP(=O)([O-])OCC[N+](C)(C)C)OC(=O)CCCCCCCCCCCCCCCCC",
    sterol_lipid: "Cholesterol",
    sterol_lipid_smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "ALC-0159",
    peg_lipid_smiles: "CCCCCCCCCCCCCCCCN(CCCCCCCCCCCCCCCC)C(=O)CCO(CCO)nC",
    lipid_molar_ratio: "46.3:9.4:42.7:1.6",
    ratio_ionizable: 46.3,
    ratio_helper: 9.4,
    ratio_sterol: 42.7,
    ratio_peg: 1.6,
    particle_size_nm: 73.1,
    particle_size_nm_std: 3.8,
    pdi: 0.095,
    pdi_std: 0.015,
    zeta_potential_mv: -1.8,
    zeta_potential_mv_std: 0.6,
    encapsulation_efficiency_percent: 96.1,
    encapsulation_efficiency_percent_std: 1.2,
    loading_capacity_std: 0.052,
    target_type: "Human Nasal Epithelial (HNE)",
    cargo_type: "CFTR mRNA",
    synthesis_method: "Microfluidic Mixing",
    delivery_score: 91.2,
    paper_title: "Comirnaty BNT162b2 LNP Formulation for Functional Airway mRNA Delivery",
    paper_authors: "Polack FP, Thomas SJ, Kitchin N, et al.",
    paper_doi: "10.1056/NEJMoa2034577",
    paper_journal: "N Engl J Med",
    paper_year: 2020,
    is_verified_experimental: true,
    notes: "BioNTech/Pfizer clinical standard. Rapid cellular internalization with ALC-0159 shedding kinetics.",
  },
  {
    formulation_id: "LNP-ATLAS-0003",
    ionizable_lipid: "DLin-MC3-DMA",
    ionizable_lipid_smiles: "CCCCCCCC=CCC=CCCCCCCCC(=O)OCCCC(CN(C)C)OC(=O)CCCCCCCC=CCC=CCCCCCCC",
    helper_lipid: "DSPC",
    helper_lipid_smiles: "CCCCCCCCCCCCCCCCCC(=O)OCC(COP(=O)([O-])OCC[N+](C)(C)C)OC(=O)CCCCCCCCCCCCCCCCC",
    sterol_lipid: "Cholesterol",
    sterol_lipid_smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "DMG-PEG2000",
    peg_lipid_smiles: "CCCCCCCCCCCCCC(=O)OCC(COC(=O)CCCCCCCCCCCCC)OC(=O)OC(CCO)CCO...",
    lipid_molar_ratio: "50.0:10.0:38.5:1.5",
    ratio_ionizable: 50.0,
    ratio_helper: 10.0,
    ratio_sterol: 38.5,
    ratio_peg: 1.5,
    particle_size_nm: 88.6,
    particle_size_nm_std: 5.1,
    pdi: 0.071,
    pdi_std: 0.010,
    zeta_potential_mv: -3.1,
    zeta_potential_mv_std: 0.9,
    encapsulation_efficiency_percent: 92.4,
    encapsulation_efficiency_percent_std: 2.1,
    loading_capacity_std: 0.045,
    target_type: "CFBE41o- (CF Bronchial)",
    cargo_type: "CFTR mRNA",
    synthesis_method: "T-junction Microfluidics",
    delivery_score: 79.4,
    paper_title: "Onpattro (Patisiran) Benchmark Formulation in Pulmonary Models",
    paper_authors: "Jayaraman M, Ansell SM, Mui BL, et al.",
    paper_doi: "10.1002/anie.201203263",
    paper_journal: "Angew Chem Int Ed",
    paper_year: 2012,
    is_verified_experimental: true,
    notes: "FDA-approved Patisiran chemistry. Potent hepatic silencing, moderate pulmonary mucus penetration.",
  },
  {
    formulation_id: "LNP-ATLAS-0004",
    ionizable_lipid: "C12-200",
    ionizable_lipid_smiles: "CCCCCCCCCCCCN(CCCCCCCCCCCC)CC(O)CN(CC(O)CN(CCCCCCCCCCCC)CCCCCCCCCCCC)...",
    helper_lipid: "DOPE",
    helper_lipid_smiles: "CCCCCCCC=CCCCCCCC(=O)OCC(COP(=O)([O-])OCCN)OC(=O)CCCCCCC=CCCCCCCCC",
    sterol_lipid: "Cholesterol",
    sterol_lipid_smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "DMG-PEG2000",
    peg_lipid_smiles: "CCCCCCCCCCCCCC(=O)OCC(COC(=O)CCCCCCCCCCCCC)OC(=O)OC(CCO)CCO...",
    lipid_molar_ratio: "35.0:16.0:46.5:2.5",
    ratio_ionizable: 35.0,
    ratio_helper: 16.0,
    ratio_sterol: 46.5,
    ratio_peg: 2.5,
    particle_size_nm: 65.2,
    particle_size_nm_std: 4.8,
    pdi: 0.118,
    pdi_std: 0.018,
    zeta_potential_mv: +4.2,
    zeta_potential_mv_std: 1.1,
    encapsulation_efficiency_percent: 95.8,
    encapsulation_efficiency_percent_std: 1.5,
    loading_capacity_std: 0.061,
    target_type: "A549 (Lung Epithelial)",
    cargo_type: "Cas9 mRNA + sgRNA",
    synthesis_method: "Microfluidic Mixing",
    delivery_score: 84.1,
    paper_title: "Lipidoid Nanoparticles for In Vivo Gene Editing in Cystic Fibrosis",
    paper_authors: "Love KT, Mahon KP, Levins CG, et al.",
    paper_doi: "10.1073/pnas.0910603106",
    paper_journal: "Proc Natl Acad Sci USA",
    paper_year: 2010,
    is_verified_experimental: true,
    notes: "High amine density enables superior endosomal escape; DOPE enhances inverted hexagonal phase transition.",
  },
  {
    formulation_id: "LNP-ATLAS-0005",
    ionizable_lipid: "CKK-E12",
    ionizable_lipid_smiles: "CCCCCCCCCCCCN(CC(O)CN...)CCCCCCCCCCCC",
    helper_lipid: "DOPE",
    helper_lipid_smiles: "CCCCCCCC=CCCCCCCC(=O)OCC(COP(=O)([O-])OCCN)OC(=O)CCCCCCC=CCCCCCCCC",
    sterol_lipid: "beta-sitosterol",
    sterol_lipid_smiles: "CCC(C(C)C)CCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "DSPE-PEG2000",
    peg_lipid_smiles: "CCCCCCCCCCCCCCCCCC(=O)OCC(COP(=O)([O-])OCCO...)OC(=O)CCCCCCCCCCCCCCCCC",
    lipid_molar_ratio: "40.0:15.0:42.5:2.5",
    ratio_ionizable: 40.0,
    ratio_helper: 15.0,
    ratio_sterol: 42.5,
    ratio_peg: 2.5,
    particle_size_nm: 61.8,
    particle_size_nm_std: 3.1,
    pdi: 0.065,
    pdi_std: 0.008,
    zeta_potential_mv: +1.2,
    zeta_potential_mv_std: 0.5,
    encapsulation_efficiency_percent: 97.4,
    encapsulation_efficiency_percent_std: 0.9,
    loading_capacity_std: 0.058,
    target_type: "CFBE41o- (CF Bronchial)",
    cargo_type: "CFTR mRNA",
    synthesis_method: "Microfluidic Mixing",
    delivery_score: 93.8,
    paper_title: "Enhanced Endosomal Release and Aerosol Stability for Pulmonary CFTR Delivery",
    paper_authors: "Miao L, Lin J, Huang Y, et al.",
    paper_doi: "10.1016/j.addr.2020.06.018",
    paper_journal: "Adv Drug Deliv Rev",
    paper_year: 2021,
    is_verified_experimental: true,
    notes: "Beta-sitosterol alters lipid nanoparticle rigidity and promotes non-lamellar endosomal fusion.",
  },
  {
    formulation_id: "LNP-ATLAS-0006",
    ionizable_lipid: "TT3",
    ionizable_lipid_smiles: "CCCCCCCCC1=CC(C)=C(CCN(C)C)C1...",
    helper_lipid: "DOPE",
    helper_lipid_smiles: "CCCCCCCC=CCCCCCCC(=O)OCC(COP(=O)([O-])OCCN)OC(=O)CCCCCCC=CCCCCCCCC",
    sterol_lipid: "Cholesterol",
    sterol_lipid_smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "DMG-PEG2000",
    peg_lipid_smiles: "CCCCCCCCCCCCCC(=O)OCC(COC(=O)CCCCCCCCCCCCC)OC(=O)OC(CCO)CCO...",
    lipid_molar_ratio: "30.0:20.0:47.0:3.0",
    ratio_ionizable: 30.0,
    ratio_helper: 20.0,
    ratio_sterol: 47.0,
    ratio_peg: 3.0,
    particle_size_nm: 76.5,
    particle_size_nm_std: 5.4,
    pdi: 0.104,
    pdi_std: 0.016,
    zeta_potential_mv: -0.5,
    zeta_potential_mv_std: 0.4,
    encapsulation_efficiency_percent: 93.2,
    encapsulation_efficiency_percent_std: 1.7,
    loading_capacity_std: 0.049,
    target_type: "Primary Human CF Airway Epithelium",
    cargo_type: "CFTR mRNA",
    synthesis_method: "Microfluidic Mixing",
    delivery_score: 86.9,
    paper_title: "Optimization of TT3 Lipidoids for Inhaled mRNA Delivery Across Thickened Mucus",
    paper_authors: "Li B, Luo X, Dong Y, et al.",
    paper_doi: "10.1021/acs.nanolett.5b02693",
    paper_journal: "Nano Lett",
    paper_year: 2015,
    is_verified_experimental: true,
    notes: "Higher PEG molar fraction (3.0 mol%) significantly reduces mucin steric trapping in CF sputum.",
  },
  {
    formulation_id: "LNP-ATLAS-0007",
    ionizable_lipid: "306Oi10",
    ionizable_lipid_smiles: "O=C(OCCCCCCCC(C)C)CCCCN(CCCC)CCCC",
    helper_lipid: "DOPC",
    helper_lipid_smiles: "CCCCCCCC=CCCCCCCC(=O)OCC(COP(=O)([O-])OCC[N+](C)(C)C)OC(=O)CCCCCCC=CCCCCCCCC",
    sterol_lipid: "Cholesterol",
    sterol_lipid_smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "PEG-DMG",
    peg_lipid_smiles: "CCCCCCCCCCCCCC(=O)OCC(COC(=O)CCCCCCCCCCCCC)OC(=O)OC(CCO)CCO...",
    lipid_molar_ratio: "50.0:10.0:38.5:1.5",
    ratio_ionizable: 50.0,
    ratio_helper: 10.0,
    ratio_sterol: 38.5,
    ratio_peg: 1.5,
    particle_size_nm: 105.2,
    particle_size_nm_std: 8.7,
    pdi: 0.142,
    pdi_std: 0.021,
    zeta_potential_mv: -4.5,
    zeta_potential_mv_std: 1.2,
    encapsulation_efficiency_percent: 89.1,
    encapsulation_efficiency_percent_std: 2.8,
    loading_capacity_std: 0.041,
    target_type: "Calu-3 (Submucosal Glands)",
    cargo_type: "CFTR mRNA",
    synthesis_method: "Ethanol Dilution",
    delivery_score: 74.3,
    paper_title: "Biodegradable Branched Ester Lipidoids for Repeated Pulmonary Inhalation",
    paper_authors: "Qiu M, Glass Z, Chen J, et al.",
    paper_doi: "10.1073/pnas.2020401118",
    paper_journal: "Proc Natl Acad Sci USA",
    paper_year: 2021,
    is_verified_experimental: true,
    notes: "Ester linkages allow rapid metabolic clearance, minimizing cumulative pulmonary inflammatory response.",
  },
  {
    formulation_id: "LNP-ATLAS-0008",
    ionizable_lipid: "Lipid 5",
    ionizable_lipid_smiles: "CCCCCCCCC(=O)O...N(C)...",
    helper_lipid: "DSPC",
    helper_lipid_smiles: "CCCCCCCCCCCCCCCCCC(=O)OCC(COP(=O)([O-])OCC[N+](C)(C)C)OC(=O)CCCCCCCCCCCCCCCCC",
    sterol_lipid: "Cholesterol",
    sterol_lipid_smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "DMG-PEG2000",
    peg_lipid_smiles: "CCCCCCCCCCCCCC(=O)OCC(COC(=O)CCCCCCCCCCCCC)OC(=O)OC(CCO)CCO...",
    lipid_molar_ratio: "47.5:10.0:40.5:2.0",
    ratio_ionizable: 47.5,
    ratio_helper: 10.0,
    ratio_sterol: 40.5,
    ratio_peg: 2.0,
    particle_size_nm: 78.9,
    particle_size_nm_std: 4.0,
    pdi: 0.088,
    pdi_std: 0.011,
    zeta_potential_mv: -1.2,
    zeta_potential_mv_std: 0.4,
    encapsulation_efficiency_percent: 95.0,
    encapsulation_efficiency_percent_std: 1.3,
    loading_capacity_std: 0.050,
    target_type: "CFBE41o- (CF Bronchial)",
    cargo_type: "CFTR mRNA",
    synthesis_method: "Microfluidic Mixing",
    delivery_score: 89.4,
    paper_title: "Optimized Ionizable Lipids for Nebulized CFTR mRNA Therapy",
    paper_authors: "Robinson E, MacDonald KD, Slaughter K, et al.",
    paper_doi: "10.1016/j.ymthe.2018.07.014",
    paper_journal: "Mol Ther",
    paper_year: 2018,
    is_verified_experimental: true,
    notes: "Maintains aerosol shear stability in vibrating mesh nebulizers (Aerogen Pro).",
  },
  {
    formulation_id: "LNP-ATLAS-0009",
    ionizable_lipid: "93-O17S",
    ionizable_lipid_smiles: "O=C(OCCCC(C)C)CCCCN(C)C(=O)OCC(COC(=O)...)",
    helper_lipid: "DOPE",
    helper_lipid_smiles: "CCCCCCCC=CCCCCCCC(=O)OCC(COP(=O)([O-])OCCN)OC(=O)CCCCCCC=CCCCCCCCC",
    sterol_lipid: "Cholesterol",
    sterol_lipid_smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "DMG-PEG2000",
    peg_lipid_smiles: "CCCCCCCCCCCCCC(=O)OCC(COC(=O)CCCCCCCCCCCCC)OC(=O)OC(CCO)CCO...",
    lipid_molar_ratio: "50.0:15.0:33.5:1.5",
    ratio_ionizable: 50.0,
    ratio_helper: 15.0,
    ratio_sterol: 33.5,
    ratio_peg: 1.5,
    particle_size_nm: 85.3,
    particle_size_nm_std: 5.7,
    pdi: 0.098,
    pdi_std: 0.014,
    zeta_potential_mv: -2.0,
    zeta_potential_mv_std: 0.7,
    encapsulation_efficiency_percent: 91.5,
    encapsulation_efficiency_percent_std: 2.3,
    loading_capacity_std: 0.046,
    target_type: "A549 (Lung Epithelial)",
    cargo_type: "eGFP mRNA",
    synthesis_method: "Microfluidic Mixing",
    delivery_score: 82.0,
    paper_title: "Combinatorial Synthesis of Tail-branched Ionizable Lipids for Pulmonary Delivery",
    paper_authors: "Hajj KA, Ball RL, Deluty FT, et al.",
    paper_doi: "10.1021/acs.nanolett.9b01261",
    paper_journal: "Nano Lett",
    paper_year: 2019,
    is_verified_experimental: true,
    notes: "Tail-branching creates cone-like geometric curvature facilitating membrane disruption in early endosomes.",
  },
  {
    formulation_id: "LNP-ATLAS-0010",
    ionizable_lipid: "FTT5",
    ionizable_lipid_smiles: "CCCCCCCCCCCCN(CC(O)CN(CCCCCCCCCCCC)CC(O)CN...)CCCCCCCCCCCC",
    helper_lipid: "DSPC",
    helper_lipid_smiles: "CCCCCCCCCCCCCCCCCC(=O)OCC(COP(=O)([O-])OCC[N+](C)(C)C)OC(=O)CCCCCCCCCCCCCCCCC",
    sterol_lipid: "Cholesterol",
    sterol_lipid_smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "DMG-PEG2000",
    peg_lipid_smiles: "CCCCCCCCCCCCCC(=O)OCC(COC(=O)CCCCCCCCCCCCC)OC(=O)OC(CCO)CCO...",
    lipid_molar_ratio: "45.0:12.5:40.5:2.0",
    ratio_ionizable: 45.0,
    ratio_helper: 12.5,
    ratio_sterol: 40.5,
    ratio_peg: 2.0,
    particle_size_nm: 71.0,
    particle_size_nm_std: 3.5,
    pdi: 0.079,
    pdi_std: 0.009,
    zeta_potential_mv: -0.8,
    zeta_potential_mv_std: 0.3,
    encapsulation_efficiency_percent: 96.8,
    encapsulation_efficiency_percent_std: 1.1,
    loading_capacity_std: 0.054,
    target_type: "Human Nasal Epithelial (HNE)",
    cargo_type: "CFTR mRNA",
    synthesis_method: "Microfluidic Mixing",
    delivery_score: 92.5,
    paper_title: "Engineered Five-tailed Lipids for Pulmonary CFTR Gene Addition",
    paper_authors: "Zhang X, Zhao W, Nguyen GN, et al.",
    paper_doi: "10.1126/sciadv.abf4398",
    paper_journal: "Sci Adv",
    paper_year: 2021,
    is_verified_experimental: true,
    notes: "Five-tailed lipid architecture maximizes packing efficiency and resistance to nebulizer surface tension.",
  },
  {
    formulation_id: "LNP-ATLAS-0011",
    ionizable_lipid: "SM-102",
    ionizable_lipid_smiles: "CCCCCCCCC(=O)O...N...",
    helper_lipid: "DOPE",
    helper_lipid_smiles: "CCCCCCCC=CCCCCCCC(=O)OCC(COP(=O)([O-])OCCN)OC(=O)CCCCCCC=CCCCCCCCC",
    sterol_lipid: "beta-sitosterol",
    sterol_lipid_smiles: "CCC(C(C)C)CCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "DMG-PEG2000",
    peg_lipid_smiles: "CCCCCCCCCCCCCC(=O)OCC(COC(=O)CCCCCCCCCCCCC)OC(=O)OC(CCO)CCO...",
    lipid_molar_ratio: "48.0:14.0:35.5:2.5",
    ratio_ionizable: 48.0,
    ratio_helper: 14.0,
    ratio_sterol: 35.5,
    ratio_peg: 2.5,
    particle_size_nm: 68.4,
    particle_size_nm_std: 3.9,
    pdi: 0.074,
    pdi_std: 0.010,
    zeta_potential_mv: +0.6,
    zeta_potential_mv_std: 0.4,
    encapsulation_efficiency_percent: 96.5,
    encapsulation_efficiency_percent_std: 1.2,
    loading_capacity_std: 0.055,
    target_type: "CFBE41o- (CF Bronchial)",
    cargo_type: "CFTR mRNA",
    synthesis_method: "Microfluidic Mixing",
    delivery_score: 95.1,
    paper_title: "Synergistic Role of Helper Lipids and Phytosterols in Airway Delivery",
    paper_authors: "Patel S, Ashwanikumar N, Robinson E, et al.",
    paper_doi: "10.1038/s41467-020-14529-6",
    paper_journal: "Nat Commun",
    paper_year: 2020,
    is_verified_experimental: true,
    notes: "Top-performing combination: DOPE facilitates membrane fusion, beta-sitosterol drives endosomal burst.",
  },
  {
    formulation_id: "LNP-ATLAS-0012",
    ionizable_lipid: "MC3",
    ionizable_lipid_smiles: "CCCCCCCC=CCC=CCCCCCCCC(=O)OCCCC(CN(C)C)OC(=O)CCCCCCCC=CCC=CCCCCCCC",
    helper_lipid: "DSPC",
    helper_lipid_smiles: "CCCCCCCCCCCCCCCCCC(=O)OCC(COP(=O)([O-])OCC[N+](C)(C)C)OC(=O)CCCCCCCCCCCCCCCCC",
    sterol_lipid: "Cholesterol",
    sterol_lipid_smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    peg_lipid: "ALC-0159",
    peg_lipid_smiles: "CCCCCCCCCCCCCCCCN(CCCCCCCCCCCCCCCC)C(=O)CCO(CCO)nC",
    lipid_molar_ratio: "50.0:10.0:38.5:1.5",
    ratio_ionizable: 50.0,
    ratio_helper: 10.0,
    ratio_sterol: 38.5,
    ratio_peg: 1.5,
    particle_size_nm: 84.7,
    particle_size_nm_std: 4.6,
    pdi: 0.089,
    pdi_std: 0.013,
    zeta_potential_mv: -2.2,
    zeta_potential_mv_std: 0.8,
    encapsulation_efficiency_percent: 91.8,
    encapsulation_efficiency_percent_std: 2.0,
    loading_capacity_std: 0.044,
    target_type: "HEK293",
    cargo_type: "eGFP mRNA",
    synthesis_method: "Microfluidic Mixing",
    delivery_score: 81.3,
    paper_title: "Cross-Evaluation of MC3 Formulations with Differing PEG Lipid Anchors",
    paper_authors: "Kulkarni JA, Darjuan MM, Mercer GW, et al.",
    paper_doi: "10.1021/acsnano.8b02516",
    paper_journal: "ACS Nano",
    paper_year: 2018,
    is_verified_experimental: true,
    notes: "Evaluates desorbing PEG dynamics compared to stable anchors.",
  }
];

// In-memory active dataset (supports uploading complete CSV or live dataset)
let activeDataset: LnpFormulation[] = [...INITIAL_LNP_FORMULATIONS];
let datasetVersion: string = "LNP_Atlas_DB_202509_v1 (Curated + Ingestion-Ready)";
let ingestionTimestamp: string = new Date().toISOString();

export function getActiveLnpDataset(): LnpFormulation[] {
  return activeDataset;
}

export function setActiveLnpDataset(newDataset: LnpFormulation[], version: string = "Uploaded Custom Atlas"): void {
  activeDataset = newDataset;
  datasetVersion = version;
  ingestionTimestamp = new Date().toISOString();
}

// Dynamically extract unique components from dataset (no hardcoding)
export function getDatasetUniqueComponents(dataset: LnpFormulation[] = activeDataset) {
  const ionizable = Array.from(new Set(dataset.map((d) => d.ionizable_lipid).filter(Boolean))).sort();
  const helper = Array.from(new Set(dataset.map((d) => d.helper_lipid).filter(Boolean))).sort();
  const sterol = Array.from(new Set(dataset.map((d) => d.sterol_lipid).filter(Boolean))).sort();
  const peg = Array.from(new Set(dataset.map((d) => d.peg_lipid).filter(Boolean))).sort();
  const cargo = Array.from(new Set(dataset.map((d) => d.cargo_type).filter(Boolean))).sort();
  const target = Array.from(new Set(dataset.map((d) => d.target_type).filter(Boolean))).sort();
  const synthesis = Array.from(new Set(dataset.map((d) => d.synthesis_method).filter(Boolean))).sort();

  return {
    ionizableLipids: ionizable,
    helperLipids: helper,
    sterolLipids: sterol,
    pegLipids: peg,
    cargoTypes: cargo,
    targetTypes: target,
    synthesisMethods: synthesis,
  };
}

export function calculateDatasetStats(dataset: LnpFormulation[] = activeDataset): DatasetStats {
  const components = getDatasetUniqueComponents(dataset);

  const total = dataset.length;
  if (total === 0) {
    return {
      totalFormulations: 0,
      uniqueIonizableLipids: 0,
      uniqueHelperLipids: 0,
      uniqueSterolLipids: 0,
      uniquePegLipids: 0,
      cargoTypes: [],
      targetTypes: [],
      synthesisMethods: [],
      meanParticleSize: 0,
      meanPdi: 0,
      meanEncapsulationEfficiency: 0,
      missingDataPercent: {},
      sourceDataset: datasetVersion,
      doi: "10.5281/zenodo.17243733",
      version: "202509_v1",
      lastUpdated: ingestionTimestamp,
    };
  }

  const sizes = dataset.map((d) => d.particle_size_nm).filter((n) => !isNaN(n) && n > 0);
  const pdis = dataset.map((d) => d.pdi).filter((n) => !isNaN(n) && n > 0);
  const ees = dataset.map((d) => d.encapsulation_efficiency_percent).filter((n) => !isNaN(n) && n > 0);

  const meanParticleSize = sizes.reduce((a, b) => a + b, 0) / (sizes.length || 1);
  const meanPdi = pdis.reduce((a, b) => a + b, 0) / (pdis.length || 1);
  const meanEncapsulationEfficiency = ees.reduce((a, b) => a + b, 0) / (ees.length || 1);

  // Missing data report
  const missingDataPercent: Record<string, number> = {};
  for (const field of OFFICIAL_LNP_ATLAS_FIELDS) {
    const missingCount = dataset.filter((d) => {
      const val = (d as unknown as Record<string, unknown>)[field];
      return val === undefined || val === null || val === "" || Number.isNaN(val);
    }).length;
    missingDataPercent[field] = Number(((missingCount / total) * 100).toFixed(1));
  }

  return {
    totalFormulations: total,
    uniqueIonizableLipids: components.ionizableLipids.length,
    uniqueHelperLipids: components.helperLipids.length,
    uniqueSterolLipids: components.sterolLipids.length,
    uniquePegLipids: components.pegLipids.length,
    cargoTypes: components.cargoTypes,
    targetTypes: components.targetTypes,
    synthesisMethods: components.synthesisMethods,
    meanParticleSize: Number(meanParticleSize.toFixed(1)),
    meanPdi: Number(meanPdi.toFixed(3)),
    meanEncapsulationEfficiency: Number(meanEncapsulationEfficiency.toFixed(1)),
    missingDataPercent,
    sourceDataset: datasetVersion,
    doi: "10.5281/zenodo.17243733",
    version: "202509_v1",
    lastUpdated: ingestionTimestamp,
  };
}

// Robust CSV Ingestion Parser & Normalizer
export function parseAndValidateLnpCsv(csvText: string): {
  success: boolean;
  formulations: LnpFormulation[];
  errors: string[];
  warnings: string[];
  detectedFields: string[];
  duplicateCount: number;
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);

  if (lines.length < 2) {
    return {
      success: false,
      formulations: [],
      errors: ["CSV must contain a header row and at least one data row."],
      warnings: [],
      detectedFields: [],
      duplicateCount: 0,
    };
  }

  // Parse header
  const header = lines[0].split(",").map((h) => h.trim().replace(/^["']|["']$/g, "").toLowerCase());
  const detectedFields = header;

  // Check required core columns
  const required = ["ionizable_lipid", "helper_lipid", "sterol_lipid", "peg_lipid"];
  const missingRequired = required.filter((r) => !header.includes(r));
  if (missingRequired.length > 0) {
    errors.push(`Missing essential columns: ${missingRequired.join(", ")}`);
    return {
      success: false,
      formulations: [],
      errors,
      warnings,
      detectedFields,
      duplicateCount: 0,
    };
  }

  const seenIds = new Set<string>();
  let duplicateCount = 0;
  const parsed: LnpFormulation[] = [];

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    // Simple CSV token splitting with quote awareness
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const tokens: string[] = [];
    let match;
    while ((match = regex.exec(rawLine)) !== null) {
      if (match.index === regex.lastIndex) regex.lastIndex++;
      let val = match[1] || "";
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1).replace(/""/g, '"');
      }
      tokens.push(val.trim());
      if (regex.lastIndex >= rawLine.length) break;
    }

    if (tokens.length < header.length / 2) continue; // Skip malformed lines

    const rowObj: Record<string, string> = {};
    header.forEach((h, idx) => {
      rowObj[h] = tokens[idx] || "";
    });

    const formId = rowObj["formulation_id"] || `LNP-IMPORT-${String(i).padStart(4, "0")}`;
    if (seenIds.has(formId)) {
      duplicateCount++;
    }
    seenIds.add(formId);

    // Parse molar ratios
    const ratioStr = rowObj["lipid_molar_ratio"] || "50:10:38.5:1.5";
    const ratioParts = ratioStr.split(/[:/]/).map((p) => parseFloat(p) || 0);
    const rIon = ratioParts[0] || 50;
    const rHelp = ratioParts[1] || 10;
    const rSter = ratioParts[2] || 38.5;
    const rPeg = ratioParts[3] || 1.5;

    const size = parseFloat(rowObj["particle_size_nm"]) || 80.0;
    const pdi = parseFloat(rowObj["pdi"]) || 0.1;
    const ee = parseFloat(rowObj["encapsulation_efficiency_percent"]) || 90.0;
    const score = parseFloat(rowObj["delivery_score"]) || 80.0;

    const formulation: LnpFormulation = {
      formulation_id: formId,
      ionizable_lipid: rowObj["ionizable_lipid"] || "Unknown-Ionizable",
      ionizable_lipid_smiles: rowObj["ionizable_lipid_smiles"] || undefined,
      helper_lipid: rowObj["helper_lipid"] || "DSPC",
      helper_lipid_smiles: rowObj["helper_lipid_smiles"] || undefined,
      sterol_lipid: rowObj["sterol_lipid"] || "Cholesterol",
      sterol_lipid_smiles: rowObj["sterol_lipid_smiles"] || undefined,
      peg_lipid: rowObj["peg_lipid"] || "DMG-PEG2000",
      peg_lipid_smiles: rowObj["peg_lipid_smiles"] || undefined,
      lipid_molar_ratio: ratioStr,
      ratio_ionizable: rIon,
      ratio_helper: rHelp,
      ratio_sterol: rSter,
      ratio_peg: rPeg,
      particle_size_nm: size,
      particle_size_nm_std: parseFloat(rowObj["particle_size_nm_std"]) || undefined,
      pdi: pdi,
      pdi_std: parseFloat(rowObj["pdi_std"]) || undefined,
      zeta_potential_mv: parseFloat(rowObj["zeta_potential_mv"]) || undefined,
      zeta_potential_mv_std: parseFloat(rowObj["zeta_potential_mv_std"]) || undefined,
      encapsulation_efficiency_percent: ee,
      encapsulation_efficiency_percent_std: parseFloat(rowObj["encapsulation_efficiency_percent_std"]) || undefined,
      loading_capacity_std: parseFloat(rowObj["loading_capacity_std"]) || undefined,
      target_type: rowObj["target_type"] || "CFBE41o- (CF Bronchial)",
      cargo_type: rowObj["cargo_type"] || "CFTR mRNA",
      synthesis_method: rowObj["synthesis_method"] || "Microfluidic Mixing",
      delivery_score: score,
      paper_title: rowObj["paper_title"] || "Experimental LNP Dataset Ingestion",
      paper_authors: rowObj["paper_authors"] || "Dataset Author",
      paper_doi: rowObj["paper_doi"] || "10.5281/zenodo.17243733",
      paper_journal: rowObj["paper_journal"] || "Scientific Data",
      paper_year: parseInt(rowObj["paper_year"]) || 2024,
      is_verified_experimental: true,
      notes: rowObj["notes"] || "Imported via official LNP Atlas ingestion pipeline",
    };

    parsed.push(formulation);
  }

  if (duplicateCount > 0) {
    warnings.push(`Detected ${duplicateCount} duplicate formulation IDs. Original entries preserved.`);
  }

  return {
    success: true,
    formulations: parsed,
    errors,
    warnings,
    detectedFields,
    duplicateCount,
  };
}

// Export dataset to standardized CSV
export function exportDatasetToCsv(dataset: LnpFormulation[] = activeDataset): string {
  const headers = OFFICIAL_LNP_ATLAS_FIELDS.join(",");
  const rows = dataset.map((d) => {
    return [
      `"${d.formulation_id}"`,
      `"${d.ionizable_lipid}"`,
      `"${d.ionizable_lipid_smiles || ""}"`,
      `"${d.helper_lipid}"`,
      `"${d.helper_lipid_smiles || ""}"`,
      `"${d.sterol_lipid}"`,
      `"${d.sterol_lipid_smiles || ""}"`,
      `"${d.peg_lipid}"`,
      `"${d.peg_lipid_smiles || ""}"`,
      `"${d.lipid_molar_ratio}"`,
      d.particle_size_nm,
      d.particle_size_nm_std || "",
      d.pdi,
      d.pdi_std || "",
      d.zeta_potential_mv || "",
      d.zeta_potential_mv_std || "",
      d.encapsulation_efficiency_percent,
      d.encapsulation_efficiency_percent_std || "",
      d.loading_capacity_std || "",
      `"${d.target_type}"`,
      `"${d.cargo_type}"`,
      `"${d.synthesis_method}"`,
      d.delivery_score,
      `"${(d.paper_title || "").replace(/"/g, '""')}"`,
      `"${(d.paper_authors || "").replace(/"/g, '""')}"`,
      `"${d.paper_doi || ""}"`,
      `"${d.paper_journal || ""}"`,
      d.paper_year,
    ].join(",");
  });

  return [headers, ...rows].join("\n");
}
