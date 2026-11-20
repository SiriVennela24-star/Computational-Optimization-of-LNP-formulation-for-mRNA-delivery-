"use client";

import React, { useState } from "react";
import {
  Activity,
  GitPullRequest,
  Search,
  Download,
  Filter,
  Layers,
  ChevronRight,
  Database,
  ExternalLink,
  Info,
} from "lucide-react";
import { GSE15568_METADATA, DEG_GENES, REACTOME_PATHWAYS } from "@/lib/datasets/pathwaysData";
import { DegGene, PathwayEnrichment } from "@/types";
import VolcanoPlot from "@/components/charts/VolcanoPlot";

export default function PathwaysPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedGene, setSelectedGene] = useState<DegGene>(DEG_GENES[0]);
  const [selectedPathway, setSelectedPathway] = useState<PathwayEnrichment>(REACTOME_PATHWAYS[0]);

  // Filtered DEGs
  const filteredGenes = DEG_GENES.filter((g) => {
    const matchesSearch =
      g.gene_symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.gene_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.cftr_pathway_relevance.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || g.expression_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export DEGs as CSV
  const handleExportDegCsv = () => {
    const header = "gene_symbol,gene_name,log2_fold_change,p_value,adj_p_value,expression_status,cftr_pathway_relevance\n";
    const rows = filteredGenes.map(
      (g) =>
        `"${g.gene_symbol}","${g.gene_name.replace(/"/g, '""')}",${g.log2_fold_change},${g.p_value},${g.adj_p_value},"${g.expression_status}","${g.cftr_pathway_relevance.replace(/"/g, '""')}"`
    );
    const blob = new Blob([header + rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `GSE15568_CF_DEGs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              NCBI GEO Accession: {GSE15568_METADATA.accession}
            </span>
            <span className="text-xs text-slate-400 font-mono">Affymetrix HG-U133 Plus 2.0</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Gene Expression Profiling & Biological Pathways
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl leading-relaxed">
            Investigate transcriptome dysregulation in Cystic Fibrosis bronchial epithelium. Evaluate differentially expressed genes (DEGs), mucin hypersecretion axes, and Reactome pathway enrichment.
          </p>
        </div>

        <button
          onClick={handleExportDegCsv}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export DEGs CSV</span>
        </button>
      </div>

      {/* Dataset Metadata Box */}
      <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-slate-400 font-semibold block text-[11px]">Experiment Design:</span>
          <span className="text-white mt-0.5 block">{GSE15568_METADATA.title}</span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold block text-[11px]">Cohort Cohorts:</span>
          <span className="text-slate-300 mt-0.5 block">
            CF homozygous F508del (n=12) vs Non-CF control (n=12)
          </span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold block text-[11px]">Normalization Pipeline:</span>
          <span className="text-slate-300 mt-0.5 block">{GSE15568_METADATA.preprocessing}</span>
        </div>
      </div>

      {/* Volcano Plot Section */}
      <VolcanoPlot genes={DEG_GENES} onSelectGene={(g) => setSelectedGene(g)} />

      {/* Main Grid: DEG Table & Pathway Enrichment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Differentially Expressed Genes Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Differentially Expressed Genes ({filteredGenes.length})
            </h2>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-1 px-2 rounded-lg bg-navy-900 border border-slate-800 text-xs text-slate-300"
              >
                <option value="All">All Statuses</option>
                <option value="Upregulated">Upregulated</option>
                <option value="Downregulated">Downregulated</option>
                <option value="Not Significant">Not Significant</option>
              </select>

              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter gene..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-2 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-xs text-white placeholder-slate-500 w-36 focus:w-48 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-navy-900/40 overflow-hidden">
            <div className="overflow-x-auto max-h-[460px]">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-navy-950 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  <tr>
                    <th className="p-3">Gene</th>
                    <th className="p-3">Log₂FC</th>
                    <th className="p-3">Adj. p-value (FDR)</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {filteredGenes.map((g) => (
                    <tr
                      key={g.gene_symbol}
                      className={`hover:bg-navy-800/30 transition-colors cursor-pointer ${
                        selectedGene.gene_symbol === g.gene_symbol ? "bg-emerald-950/20" : ""
                      }`}
                      onClick={() => setSelectedGene(g)}
                    >
                      <td className="p-3 font-sans">
                        <div className="font-bold text-cyan-300">{g.gene_symbol}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                          {g.gene_name}
                        </div>
                      </td>
                      <td
                        className={`p-3 font-bold ${
                          g.log2_fold_change > 0 ? "text-rose-400" : "text-cyan-400"
                        }`}
                      >
                        {g.log2_fold_change > 0 ? "+" : ""}
                        {g.log2_fold_change.toFixed(2)}
                      </td>
                      <td className="p-3 text-slate-300">{g.adj_p_value.toExponential(2)}</td>
                      <td className="p-3 font-sans">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            g.expression_status === "Upregulated"
                              ? "bg-rose-500/20 text-rose-300"
                              : g.expression_status === "Downregulated"
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {g.expression_status}
                        </span>
                      </td>
                      <td className="p-3 text-right font-sans">
                        <button
                          onClick={() => setSelectedGene(g)}
                          className="px-2 py-0.5 rounded bg-navy-800 hover:bg-emerald-500/20 text-emerald-300 border border-slate-700 text-[10px]"
                        >
                          Focus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Reactome Pathway Enrichment (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <GitPullRequest className="w-4 h-4 text-violet-400" />
            Reactome Pathway Enrichment
          </h2>

          <div className="space-y-3">
            {REACTOME_PATHWAYS.map((p) => {
              const isSelected = selectedPathway.pathway_id === p.pathway_id;
              return (
                <div
                  key={p.pathway_id}
                  onClick={() => setSelectedPathway(p)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-violet-950/30 border-violet-500/60 shadow-lg shadow-violet-500/10"
                      : "bg-navy-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-violet-400 font-bold">
                      {p.pathway_id}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-300 font-semibold">
                      FDR: {p.adj_p_value.toExponential(1)}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white leading-snug">{p.pathway_name}</h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Enrichment Score: <strong className="text-white font-mono">{p.enrichment_score}</strong></span>
                    <span>Genes: {p.gene_count}</span>
                  </div>

                  {/* Genes Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.genes.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-950 border border-slate-800 text-slate-300"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
