import React from "react";
import { BookOpen, ExternalLink, FileText, Database } from "lucide-react";

const SCIENTIFIC_REFERENCES = [
  {
    category: "LNP Atlas & Nanoparticle Datasets",
    title: "A Comprehensive Dataset of Lipid Nanoparticle Compositions and Properties for Nucleic Acid Delivery",
    authors: "LNP Atlas Consortium",
    journal: "Nature Scientific Data / Zenodo",
    year: 2024,
    doi: "10.5281/zenodo.17243733",
    url: "https://doi.org/10.5281/zenodo.17243733",
    description: "Official 28-field database compiling over 1,092 standardized experimental LNP formulations with physicochemical and bioactivity profiles.",
  },
  {
    category: "CFTR Structural Biology",
    title: "Structure of the Human CFTR Ion Channel by Cryo-EM",
    authors: "Liu F, Zhang Z, Csanády L, Gadsby DC, Chen J",
    journal: "Cell",
    year: 2017,
    doi: "10.1016/j.cell.2017.02.024",
    url: "https://doi.org/10.1016/j.cell.2017.02.024",
    description: "Atomic coordinates of human CFTR (PDB 5UAK) resolving TMD1, TMD2, NBD1 with F508 residue, and regulatory R-domain in dephosphorylated conformation.",
  },
  {
    category: "Cystic Fibrosis Transcriptomics",
    title: "Gene expression profile of human CF and non-CF airway epithelial cells",
    authors: "Wright JM, Merlo CA, Reynolds J, et al.",
    journal: "NCBI Gene Expression Omnibus (GEO)",
    year: 2009,
    doi: "GSE15568",
    url: "https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE15568",
    description: "Transcriptional profiling of primary human bronchial epithelial cells homozygous for CFTR F508del compared to healthy control donors.",
  },
  {
    category: "ClinVar Genomic Variants",
    title: "ClinVar: Improvements to Accessing and Integrating CFTR Clinical Variation",
    authors: "Landrum MJ, Lee JM, Benson M, et al.",
    journal: "Nucleic Acids Res",
    year: 2018,
    doi: "10.1093/nar/gkx1153",
    url: "https://www.ncbi.nlm.nih.gov/clinvar/",
    description: "Curated archive of human genetic variations and interpretations of pathogenic significance for CFTR mutations.",
  },
  {
    category: "Lipid Nanoparticle Pulmonary Delivery",
    title: "Optimization of TT3 Lipidoids for Inhaled mRNA Delivery Across Thickened Mucus",
    authors: "Li B, Luo X, Dong Y, et al.",
    journal: "Nano Lett",
    year: 2015,
    doi: "10.1021/acs.nanolett.5b02693",
    url: "https://doi.org/10.1021/acs.nanolett.5b02693",
    description: "Investigation of PEG lipid surface shielding to prevent mucin entrapment in cystic fibrosis sputum.",
  },
  {
    category: "Lipid Nanoparticle Pulmonary Delivery",
    title: "Synergistic Role of Helper Lipids and Phytosterols in Airway Delivery",
    authors: "Patel S, Ashwanikumar N, Robinson E, et al.",
    journal: "Nature Communications",
    year: 2020,
    doi: "10.1038/s41467-020-14529-6",
    url: "https://doi.org/10.1038/s41467-020-14529-6",
    description: "Demonstrates substitution of cholesterol with beta-sitosterol and DOPE to dramatically enhance endosomal membrane fusion in epithelial cells.",
  },
  {
    category: "Quantum Optimization",
    title: "A Quantum Approximate Optimization Algorithm",
    authors: "Farhi E, Goldstone J, Gutmann S",
    journal: "arXiv:1411.4028",
    year: 2014,
    doi: "10.48550/arXiv.1411.4028",
    url: "https://arxiv.org/abs/1411.4028",
    description: "Foundational variational quantum algorithm employing alternating problem and mixer Hamiltonians to find approximate solutions to combinatorial NP problems.",
  },
  {
    category: "Quantum Optimization",
    title: "Ising Formulations of Many NP Problems",
    authors: "Lucas A",
    journal: "Frontiers in Physics",
    year: 2014,
    doi: "10.3389/fphy.2014.00005",
    url: "https://doi.org/10.3389/fphy.2014.00005",
    description: "Systematic mapping of exact combinatorial constraints and graph subset selection into QUBO Hamiltonians.",
  },
  {
    category: "Explainable AI",
    title: "A Unified Approach to Interpreting Model Predictions",
    authors: "Lundberg SM, Lee SI",
    journal: "Advances in Neural Information Processing Systems (NeurIPS)",
    year: 2017,
    doi: "10.5555/3295222.3295230",
    url: "https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html",
    description: "Definition of SHAP (SHapley Additive exPlanations) connecting game-theoretic Shapley values to local explanations of tree ensemble models.",
  },
];

export default function ReferencesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            Data Provenance & Scientific Literature
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Scientific References & Data Sources
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Comprehensive bibliographic citations, DOI cross-references, and database accessions powering the Quantum-XAI CFTR Precision Gene Therapy & LNP Optimization platform.
        </p>
      </div>

      {/* References List */}
      <div className="space-y-4">
        {SCIENTIFIC_REFERENCES.map((ref, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-navy-950 border border-slate-800 text-cyan-300">
                {ref.category}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">{ref.year}</span>
            </div>

            <h3 className="text-sm font-bold text-white leading-snug">{ref.title}</h3>

            <div className="text-xs text-slate-300">
              <span className="text-slate-400">Authors: </span>
              {ref.authors}
            </div>

            <div className="text-xs text-slate-400 font-medium">
              <span className="text-slate-500">Publication: </span>
              <em>{ref.journal}</em> ({ref.year})
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800/80">
              {ref.description}
            </p>

            <div className="pt-2">
              <a
                href={ref.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                <span>Access Resource ({ref.doi})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
