"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Layers,
  Search,
  Filter,
  Download,
  Upload,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  CheckSquare,
  Square,
  X,
  ExternalLink,
  Sliders,
  BarChart2,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { LnpFormulation, DatasetStats } from "@/types";
import {
  getActiveLnpDataset,
  getDatasetUniqueComponents,
  calculateDatasetStats,
  setActiveLnpDataset,
  exportDatasetToCsv,
  parseAndValidateLnpCsv,
} from "@/lib/datasets/lnpAtlas";
import CompositionChart from "@/components/charts/CompositionChart";

export default function LnpAtlasPage() {
  const [dataset, setDataset] = useState<LnpFormulation[]>([]);
  const [stats, setStats] = useState<DatasetStats | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIonizable, setSelectedIonizable] = useState("All");
  const [selectedHelper, setSelectedHelper] = useState("All");
  const [selectedSterol, setSelectedSterol] = useState("All");
  const [selectedPeg, setSelectedPeg] = useState("All");
  const [selectedCargo, setSelectedCargo] = useState("All");
  const [selectedTarget, setSelectedTarget] = useState("All");
  const [selectedSynthesis, setSelectedSynthesis] = useState("All");

  // Sorting
  const [sortField, setSortField] = useState<keyof LnpFormulation>("formulation_id");
  const [sortAsc, setSortAsc] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Comparison drawer (up to 5 formulations)
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // CSV Import Modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadText, setUploadText] = useState("");
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [uploadWarnings, setUploadWarnings] = useState<string[]>([]);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");

  useEffect(() => {
    const data = getActiveLnpDataset();
    setDataset(data);
    setStats(calculateDatasetStats(data));
  }, []);

  const components = useMemo(() => getDatasetUniqueComponents(dataset), [dataset]);

  // Handle Formulation Selection for Comparison
  const toggleCompareFormulation = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 5) {
        alert("You can compare up to 5 formulations simultaneously.");
        return prev;
      }
      return [...prev, id];
    });
  };

  // Filter and Sort Dataset
  const filteredData = useMemo(() => {
    let result = [...dataset];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (d) =>
          d.formulation_id.toLowerCase().includes(term) ||
          d.ionizable_lipid.toLowerCase().includes(term) ||
          d.helper_lipid.toLowerCase().includes(term) ||
          d.target_type.toLowerCase().includes(term) ||
          d.paper_title.toLowerCase().includes(term) ||
          d.paper_doi.toLowerCase().includes(term)
      );
    }

    if (selectedIonizable !== "All") {
      result = result.filter((d) => d.ionizable_lipid === selectedIonizable);
    }
    if (selectedHelper !== "All") {
      result = result.filter((d) => d.helper_lipid === selectedHelper);
    }
    if (selectedSterol !== "All") {
      result = result.filter((d) => d.sterol_lipid === selectedSterol);
    }
    if (selectedPeg !== "All") {
      result = result.filter((d) => d.peg_lipid === selectedPeg);
    }
    if (selectedCargo !== "All") {
      result = result.filter((d) => d.cargo_type === selectedCargo);
    }
    if (selectedTarget !== "All") {
      result = result.filter((d) => d.target_type === selectedTarget);
    }
    if (selectedSynthesis !== "All") {
      result = result.filter((d) => d.synthesis_method === selectedSynthesis);
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") valA = (valA as string).toLowerCase();
      if (typeof valB === "string") valB = (valB as string).toLowerCase();

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [
    dataset,
    searchTerm,
    selectedIonizable,
    selectedHelper,
    selectedSterol,
    selectedPeg,
    selectedCargo,
    selectedTarget,
    selectedSynthesis,
    sortField,
    sortAsc,
  ]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field: keyof LnpFormulation) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Download filtered CSV
  const handleDownloadCsv = () => {
    const csvStr = exportDatasetToCsv(filteredData);
    const blob = new Blob([csvStr], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `LNP_Atlas_Filtered_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Ingest Uploaded CSV
  const handleUploadSubmit = () => {
    setUploadErrors([]);
    setUploadWarnings([]);
    setUploadSuccessMessage("");

    if (!uploadText.trim()) {
      setUploadErrors(["Please paste or upload CSV text."]);
      return;
    }

    const res = parseAndValidateLnpCsv(uploadText);
    if (!res.success) {
      setUploadErrors(res.errors);
      setUploadWarnings(res.warnings);
      return;
    }

    setActiveLnpDataset(res.formulations, "User Uploaded Dataset");
    setDataset(res.formulations);
    setStats(calculateDatasetStats(res.formulations));
    setUploadSuccessMessage(
      `Successfully validated and imported ${res.formulations.length} formulations (${res.duplicateCount} duplicates noted).`
    );
    setTimeout(() => {
      setIsUploadModalOpen(false);
      setUploadSuccessMessage("");
    }, 1800);
  };

  const comparedFormulations = dataset.filter((d) => comparedIds.includes(d.formulation_id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-turquoise-500/15 text-turquoise-300 border border-turquoise-500/30">
              Official LNP Atlas Integration
            </span>
            <span className="text-xs text-slate-400 font-mono">
              DOI: 10.5281/zenodo.17243733
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Lipid Nanoparticle Atlas Database Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl leading-relaxed">
            Standardized 28-parameter formulation profiling across diverse ionizable chemistries (SM-102, ALC-0315, MC3, C12-200, CKK-E12, TT3), lipid molar ratios, particle sizes, and experimental delivery bioactivity.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-navy-900 border border-slate-700 hover:border-turquoise-400 text-slate-200 hover:text-white transition-all flex items-center gap-2"
          >
            <Upload className="w-3.5 h-3.5 text-turquoise-400" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={handleDownloadCsv}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-turquoise-500/20 text-turquoise-300 border border-turquoise-500/40 hover:bg-turquoise-500/30 transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Filtered ({filteredData.length})</span>
          </button>

          {comparedIds.length > 0 && (
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-500/25 transition-all flex items-center gap-2 animate-bounce"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Compare Selected ({comparedIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Multi-Parameter Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by Formulation ID, lipid name, DOI, cell line, author..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Quick Clear */}
          {(searchTerm ||
            selectedIonizable !== "All" ||
            selectedHelper !== "All" ||
            selectedSterol !== "All" ||
            selectedPeg !== "All" ||
            selectedCargo !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedIonizable("All");
                setSelectedHelper("All");
                setSelectedSterol("All");
                setSelectedPeg("All");
                setSelectedCargo("All");
                setSelectedTarget("All");
                setSelectedSynthesis("All");
                setPage(1);
              }}
              className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>

        {/* Dynamic Dropdown Selectors generated directly from dataset */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Ionizable Lipid</label>
            <select
              value={selectedIonizable}
              onChange={(e) => {
                setSelectedIonizable(e.target.value);
                setPage(1);
              }}
              className="w-full py-1.5 px-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-200 focus:border-cyan-400"
            >
              <option value="All">All Ionizables ({components.ionizableLipids.length})</option>
              {components.ionizableLipids.map((lip) => (
                <option key={lip} value={lip}>{lip}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Helper Lipid</label>
            <select
              value={selectedHelper}
              onChange={(e) => {
                setSelectedHelper(e.target.value);
                setPage(1);
              }}
              className="w-full py-1.5 px-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-200 focus:border-cyan-400"
            >
              <option value="All">All Helpers ({components.helperLipids.length})</option>
              {components.helperLipids.map((lip) => (
                <option key={lip} value={lip}>{lip}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Sterol Matrix</label>
            <select
              value={selectedSterol}
              onChange={(e) => {
                setSelectedSterol(e.target.value);
                setPage(1);
              }}
              className="w-full py-1.5 px-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-200 focus:border-cyan-400"
            >
              <option value="All">All Sterols ({components.sterolLipids.length})</option>
              {components.sterolLipids.map((lip) => (
                <option key={lip} value={lip}>{lip}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">PEG-Lipid</label>
            <select
              value={selectedPeg}
              onChange={(e) => {
                setSelectedPeg(e.target.value);
                setPage(1);
              }}
              className="w-full py-1.5 px-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-200 focus:border-cyan-400"
            >
              <option value="All">All PEG-Lipids ({components.pegLipids.length})</option>
              {components.pegLipids.map((lip) => (
                <option key={lip} value={lip}>{lip}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Target Cargo</label>
            <select
              value={selectedCargo}
              onChange={(e) => {
                setSelectedCargo(e.target.value);
                setPage(1);
              }}
              className="w-full py-1.5 px-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-200 focus:border-cyan-400"
            >
              <option value="All">All Cargoes ({components.cargoTypes.length})</option>
              {components.cargoTypes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">Target Cell / Organ</label>
            <select
              value={selectedTarget}
              onChange={(e) => {
                setSelectedTarget(e.target.value);
                setPage(1);
              }}
              className="w-full py-1.5 px-2 rounded-lg bg-navy-950 border border-slate-800 text-slate-200 focus:border-cyan-400"
            >
              <option value="All">All Targets ({components.targetTypes.length})</option>
              {components.targetTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Formulations Table */}
      <div className="rounded-2xl border border-slate-800 bg-navy-900/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950/90 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold select-none">
              <tr>
                <th className="p-3 w-10">Select</th>
                <th
                  className="p-3 cursor-pointer hover:text-white"
                  onClick={() => handleSort("formulation_id")}
                >
                  <span className="flex items-center gap-1">
                    ID <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </span>
                </th>
                <th
                  className="p-3 cursor-pointer hover:text-white"
                  onClick={() => handleSort("ionizable_lipid")}
                >
                  <span className="flex items-center gap-1">
                    Ionizable Lipid <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </span>
                </th>
                <th className="p-3">Helper / Sterol / PEG</th>
                <th className="p-3">Molar Ratio</th>
                <th
                  className="p-3 cursor-pointer hover:text-white"
                  onClick={() => handleSort("particle_size_nm")}
                >
                  <span className="flex items-center gap-1">
                    Size (nm) <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </span>
                </th>
                <th
                  className="p-3 cursor-pointer hover:text-white"
                  onClick={() => handleSort("pdi")}
                >
                  <span className="flex items-center gap-1">
                    PDI <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </span>
                </th>
                <th
                  className="p-3 cursor-pointer hover:text-white"
                  onClick={() => handleSort("encapsulation_efficiency_percent")}
                >
                  <span className="flex items-center gap-1">
                    EE % <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </span>
                </th>
                <th className="p-3">Target / Cargo</th>
                <th
                  className="p-3 cursor-pointer hover:text-white"
                  onClick={() => handleSort("delivery_score")}
                >
                  <span className="flex items-center gap-1">
                    Efficacy <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </span>
                </th>
                <th className="p-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-slate-400">
                    No formulations match the active search and filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedData.map((f) => {
                  const isChecked = comparedIds.includes(f.formulation_id);
                  return (
                    <tr
                      key={f.formulation_id}
                      className={`hover:bg-navy-800/30 transition-colors ${
                        isChecked ? "bg-violet-950/20" : ""
                      }`}
                    >
                      <td className="p-3">
                        <button
                          onClick={() => toggleCompareFormulation(f.formulation_id)}
                          className="text-slate-400 hover:text-violet-400"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-violet-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="p-3 font-mono font-bold text-cyan-300">
                        {f.formulation_id}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-white">{f.ionizable_lipid}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                          {f.paper_journal} {f.paper_year}
                        </div>
                      </td>
                      <td className="p-3 text-[11px] text-slate-300">
                        <div>
                          <span className="text-cyan-400">{f.helper_lipid}</span> +{" "}
                          <span className="text-violet-400">{f.sterol_lipid}</span>
                        </div>
                        <div className="text-[10px] text-turquoise-400">{f.peg_lipid}</div>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-300">
                        {f.lipid_molar_ratio}
                      </td>
                      <td className="p-3 font-mono font-semibold text-white">
                        {f.particle_size_nm}
                        {f.particle_size_nm_std && (
                          <span className="text-[10px] text-slate-400 font-normal">
                            {" "}±{f.particle_size_nm_std}
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-mono text-slate-300">{f.pdi}</td>
                      <td className="p-3 font-mono font-semibold text-emerald-400">
                        {f.encapsulation_efficiency_percent}%
                      </td>
                      <td className="p-3 text-[11px]">
                        <div className="text-white font-medium truncate max-w-[140px]">{f.target_type}</div>
                        <div className="text-[10px] text-pink-400 font-semibold">{f.cargo_type}</div>
                      </td>
                      <td className="p-3 font-mono font-bold text-turquoise-300">
                        {f.delivery_score.toFixed(1)} / 100
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          href={`/lnp-atlas/${f.formulation_id}`}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-navy-800 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700 hover:border-cyan-400 transition-all"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-navy-950/70 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, filteredData.length)} of {filteredData.length} formulations
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-700 bg-navy-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-slate-700 bg-navy-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Modal / Drawer */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-950 border border-violet-500/40 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-violet-400" />
                  Formulation Side-by-Side Comparison ({comparedFormulations.length} selected)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Comparative biophysical breakdown and lipid composition ratios
                </p>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="p-1.5 rounded-lg bg-navy-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparedFormulations.map((f) => (
                <div key={f.formulation_id} className="p-4 rounded-xl bg-navy-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-cyan-300 text-sm">{f.formulation_id}</span>
                    <button
                      onClick={() => toggleCompareFormulation(f.formulation_id)}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ionizable:</span>
                      <strong className="text-white">{f.ionizable_lipid}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Helper:</span>
                      <span className="text-cyan-300">{f.helper_lipid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sterol:</span>
                      <span className="text-violet-300">{f.sterol_lipid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">PEG-Lipid:</span>
                      <span className="text-turquoise-300">{f.peg_lipid}</span>
                    </div>
                    <div className="flex justify-between font-mono pt-1 border-t border-slate-800">
                      <span className="text-slate-400">Ratio:</span>
                      <span className="text-slate-200">{f.lipid_molar_ratio}</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-400">Size / PDI:</span>
                      <span className="text-white">{f.particle_size_nm} nm / {f.pdi}</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-400">Encapsulation:</span>
                      <span className="text-emerald-400 font-bold">{f.encapsulation_efficiency_percent}%</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span className="text-slate-400">Efficacy:</span>
                      <span className="text-turquoise-400 font-bold">{f.delivery_score} / 100</span>
                    </div>
                  </div>

                  {/* Donut Chart */}
                  <CompositionChart
                    ionizable={f.ratio_ionizable}
                    helper={f.ratio_helper}
                    sterol={f.ratio_sterol}
                    peg={f.ratio_peg}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CSV Ingestion Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-950 border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-turquoise-400" />
                Ingest Official / Custom LNP Atlas CSV
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Upload or paste your CSV dataset. The ingestion pipeline validates against the official 28 standardized fields, detects duplicates, normalizes units, and dynamically expands dropdown options across the entire platform.
            </p>

            {uploadErrors.length > 0 && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-400" /> Validation Errors:
                </div>
                {uploadErrors.map((err, i) => (
                  <div key={i}>• {err}</div>
                ))}
              </div>
            )}

            {uploadWarnings.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" /> Schema Warnings:
                </div>
                {uploadWarnings.map((warn, i) => (
                  <div key={i}>• {warn}</div>
                ))}
              </div>
            )}

            {uploadSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {uploadSuccessMessage}
              </div>
            )}

            <textarea
              rows={8}
              placeholder="Paste raw CSV with header row (e.g. formulation_id,ionizable_lipid,helper_lipid,sterol_lipid,peg_lipid,lipid_molar_ratio...)"
              value={uploadText}
              onChange={(e) => setUploadText(e.target.value)}
              className="w-full p-3 rounded-xl bg-navy-900 border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">
                Official source: <a href="https://doi.org/10.5281/zenodo.17243733" target="_blank" rel="noreferrer" className="underline text-slate-400">Zenodo 17243733</a>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-navy-900 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadSubmit}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-turquoise-500 text-navy-950 font-bold hover:opacity-90 transition-all shadow-md"
                >
                  Validate & Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
