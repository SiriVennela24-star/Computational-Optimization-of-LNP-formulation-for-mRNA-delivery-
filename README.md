# Quantum-XAI: CFTR Precision Gene Therapy & Lipid Nanoparticle Optimization Platform

> **An explainable hybrid quantum-classical computational research platform connecting Cystic Fibrosis transmembrane conductance regulator (CFTR) genetic analysis with intelligent lipid nanoparticle (LNP) delivery optimization.**

[![Vercel Deployment Ready](https://img.shields.io/badge/Deployment-Vercel%20Serverless-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Next.js 14](https://img.shields.io/badge/Framework-Next.js%2014%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![LNP Atlas](https://img.shields.io/badge/Dataset-LNP%20Atlas%20(Zenodo%2017243733)-06b6d4?style=for-the-badge)](https://doi.org/10.5281/zenodo.17243733)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## 🔬 Scientific Abstract & Objective

Cystic Fibrosis (CF) is an autosomal recessive monogenic disease caused by mutations in the *CFTR* gene, resulting in defective epithelial anion channel function, thick airway mucus accumulation, and chronic pulmonary infections. While small-molecule modulators have advanced treatment for specific gating or folding variants, precision nucleic acid therapy (CFTR mRNA addition / CRISPR-Cas gene editing) offers mutation-agnostic phenotypic correction.

However, delivering therapeutic mRNA across the viscous cystic fibrosis mucociliary barrier into bronchial epithelial cells presents severe formulation hurdles. **Quantum-XAI** bridges patient genomic variant classification with biophysical lipid nanoparticle engineering through:
1. **Interactive 3D CFTR & LNP Biological Journey**: WebGL-grounded visualization of the Cryo-EM human CFTR structure (PDB 5UAK) and nanoscale cellular delivery kinetics.
2. **Complete LNP Atlas Integration**: Ingestion, exploration, and dynamic extraction across 1,092+ experimental formulations (Nature Scientific Data / Zenodo 10.5281/zenodo.17243733).
3. **Multi-Model Pathogenicity Classifier**: Cross-validated ensemble models (XGBoost, Random Forest, Logistic Regression) predicting CFTR variant severity.
4. **Explainable AI (SHAP)**: Exact local and global TreeSHAP additive feature attributions revealing model decision drivers.
5. **Hybrid Quantum Optimization (QUBO & QAOA)**: Quadratic Unconstrained Binary Optimization formulation for multi-target therapeutic prioritization and formulation selection, solved via Statevector QAOA simulation, Classical Simulated Annealing, and Exact Brute Force benchmarking.
6. **GEO GSE15568 Pathway Profiling**: Primary CF bronchial epithelial cell transcriptome analysis and Reactome pathway enrichment.

---

## ⚠️ Non-Clinical Research Disclaimer

> **IMPORTANT:** This software platform is an academic computational research prototype. All CFTR variant classifications, LNP transfection scores, and quantum optimization rankings represent computational research hypotheses. **Never represent or use these outputs as validated medical diagnoses, drug formulations, or clinical treatment recommendations.**

---

## 🏛️ Architecture Overview

```
                      ┌───────────────────────────────────────┐
                      │    CFTR Precision Genomics (ClinVar)   │
                      └──────────────────┬────────────────────┘
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
      ┌─────────────────────────┐                 ┌─────────────────────────┐
      │   GEO GSE15568 DEGs     │                 │   ML Pathogenicity      │
      │   Reactome Pathways     │                 │   (XGBoost + TreeSHAP)  │
      └────────────┬────────────┘                 └────────────┬────────────┘
                   │                                           │
                   └─────────────────────┬─────────────────────┘
                                         ▼
                      ┌───────────────────────────────────────┐
                      │    Quantum QUBO Target Formulation    │
                      │    H(x) = -Σsᵢxᵢ + λΣrᵢⱼxᵢxⱼ + A(Σx-K)²│
                      └──────────────────┬────────────────────┘
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
      ┌─────────────────────────┐                 ┌─────────────────────────┐
      │   Statevector QAOA      │                 │  Classical Annealing /  │
      │   Quantum Simulator     │                 │  Brute-Force Benchmarks │
      └────────────┬────────────┘                 └────────────┬────────────┘
                   │                                           │
                   └─────────────────────┬─────────────────────┘
                                         ▼
                      ┌───────────────────────────────────────┐
                      │   LNP Atlas Database (Zenodo 17243733)│
                      │   Predictive Formulation & Sputum ML  │
                      └──────────────────┬────────────────────┘
                                         │
                                         ▼
                      ┌───────────────────────────────────────┐
                      │ 3D Interactive CFTR & Delivery Journey│
                      └───────────────────────────────────────┘
```

---

## 🚀 Key Features & Routes

| Route | Description |
|---|---|
| `/` | Full-screen hero, real-time research counters, and **interactive 3D CFTR & LNP cellular journey** (PDB 5UAK). |
| `/dashboard` | Research analytics dashboard with formulation KPIs, size distributions, ML metrics, and missingness audits. |
| `/cftr` | CFTR variant explorer (ClinVar), protein domain mapping, interactive ML pathogenicity predictor. |
| `/lnp-atlas` | Searchable, multi-parameter filtered LNP database with side-by-side comparison (up to 5 formulations), and CSV import/export. |
| `/lnp-atlas/[id]` | Comprehensive 28-field report for individual formulations with SMILES and molar composition charts. |
| `/delivery` | LNP delivery performance regressor, CF sputum mucus penetration index, and composition optimization. |
| `/quantum` | Multi-target QUBO formulation, QAOA quantum circuit simulation, Simulated Annealing, and benchmarking. |
| `/pathways` | NCBI GEO GSE15568 cystic fibrosis transcriptome analysis with interactive Volcano plot and Reactome pathways. |
| `/explainability`| Local and global SHAP feature attribution waterfall and beeswarm plots. |
| `/about` | Scientific methodology, mathematical derivations, and architecture details. |
| `/references` | Comprehensive bibliography, DOIs, and database accession links. |

---

## ⚡ Deployment & Running Locally

### 1. Prerequisites
- Node.js 18+ or 20+
- pnpm (recommended) or npm

### 2. Local Setup
```bash
# Clone the repository
git clone https://github.com/your-org/quantum-xai-cftr.git
cd quantum-xai-cftr

# Install dependencies
pnpm install

# Run automated test suite
pnpm test

# Build for production
pnpm run build

# Start local server
pnpm start
# Or start development hot-reload server
pnpm run dev
```

The application will be live at `http://localhost:3000`.

### 3. Vercel Zero-Config Deployment
Deploy directly to Vercel with no external server or backend required:
```bash
npm install -g vercel
vercel
```
Or import the repository directly into the [Vercel Dashboard](https://vercel.com/new).

---

## 🧪 Scientific References

1. **LNP Atlas Consortium** (2024). *A Comprehensive Dataset of Lipid Nanoparticle Compositions and Properties for Nucleic Acid Delivery*. Nature Scientific Data / Zenodo. [DOI: 10.5281/zenodo.17243733](https://doi.org/10.5281/zenodo.17243733).
2. **Liu, F., et al.** (2017). *Structure of the Human CFTR Ion Channel by Cryo-EM*. Cell, 169(1), 85-95. [DOI: 10.1016/j.cell.2017.02.024](https://doi.org/10.1016/j.cell.2017.02.024).
3. **Wright, J. M., et al.** (2009). *Gene expression profile of human CF and non-CF airway epithelial cells*. NCBI GEO GSE15568.
4. **Farhi, E., et al.** (2014). *A Quantum Approximate Optimization Algorithm*. arXiv:1411.4028.
5. **Lundberg, S. M., & Lee, S. I.** (2017). *A Unified Approach to Interpreting Model Predictions*. NeurIPS 2017.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

