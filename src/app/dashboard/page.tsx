"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  Database,
  Layers,
  FlaskConical,
  Cpu,
  Sparkles,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { DatasetStats } from "@/types";
import { calculateDatasetStats, getActiveLnpDataset } from "@/lib/datasets/lnpAtlas";
import { CLINVAR_CFTR_VARIANTS } from "@/lib/datasets/cftrVariants";
import { CFTR_MODEL_METRICS } from "@/lib/ml/cftrPathogenicity";

export default function DashboardPage() {
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load live dataset stats
    const dataset = getActiveLnpDataset();
    const st = calculateDatasetStats(dataset);
    setStats(st);
    setIsLoading(false);
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-cyan-400 mb-3" />
        <p>Loading Research Dashboard Metrics...</p>
      </div>
    );
  }

  const activeDataset = getActiveLnpDataset();

  // Ionizable lipid distribution
  const ionizableFreq: Record<string, number> = {};
  activeDataset.forEach((d) => {
    ionizableFreq[d.ionizable_lipid] = (ionizableFreq[d.ionizable_lipid] || 0) + 1;
  });
  const ionizableChartData = Object.entries(ionizableFreq).map(([name, count]) => ({
    name,
    count,
  }));

  // Performance by ionizable lipid
  const lipidScores: Record<string, { totalScore: number; count: number }> = {};
  activeDataset.forEach((d) => {
    if (!lipidScores[d.ionizable_lipid]) {
      lipidScores[d.ionizable_lipid] = { totalScore: 0, count: 0 };
    }
    lipidScores[d.ionizable_lipid].totalScore += d.delivery_score;
    lipidScores[d.ionizable_lipid].count += 1;
  });
  const perfData = Object.entries(lipidScores).map(([name, val]) => ({
    name,
    meanScore: Number((val.totalScore / val.count).toFixed(1)),
  }));

  // Size distribution brackets
  const sizeBrackets = [
    { label: "< 70 nm", count: activeDataset.filter((d) => d.particle_size_nm < 70).length },
    { label: "70 - 85 nm", count: activeDataset.filter((d) => d.particle_size_nm >= 70 && d.particle_size_nm <= 85).length },
    { label: "85 - 100 nm", count: activeDataset.filter((d) => d.particle_size_nm > 85 && d.particle_size_nm <= 100).length },
    { label: "> 100 nm", count: activeDataset.filter((d) => d.particle_size_nm > 100).length },
  ];

  const COLORS = ["#06b6d4", "#8b5cf6", "#ec4899", "#2dd4bf", "#f59e0b", "#3b82f6"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Live Research Telemetry
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Version: {stats.version}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Precision Research & Formulation Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-omic analytics connecting CFTR ClinVar genomic variants with official LNP Atlas formulation biophysics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/lnp-atlas"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-navy-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white transition-all flex items-center gap-2"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Import / Explorer</span>
          </Link>
          <a
            href="/api/datasets/lnp-atlas?format=csv"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-xl bg-navy-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Atlas Formulations</span>
            <Database className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats.totalFormulations}</div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Validated experimental
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Ionizable Lipids</span>
            <Layers className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats.uniqueIonizableLipids}</div>
          <div className="text-[10px] text-slate-400 mt-1">Unique chemical scaffolds</div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Helper & Sterols</span>
            <Layers className="w-4 h-4 text-turquoise-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {stats.uniqueHelperLipids + stats.uniqueSterolLipids}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {stats.uniqueHelperLipids} Helpers, {stats.uniqueSterolLipids} Sterols
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>CFTR Variants</span>
            <FlaskConical className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-black text-white">{CLINVAR_CFTR_VARIANTS.length}</div>
          <div className="text-[10px] text-pink-300 mt-1">ClinVar + Domain mapped</div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Mean Particle Size</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats.meanParticleSize} <span className="text-xs font-normal text-slate-400">nm</span></div>
          <div className="text-[10px] text-slate-400 mt-1">PDI: {stats.meanPdi}</div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Encapsulation</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{stats.meanEncapsulationEfficiency}%</div>
          <div className="text-[10px] text-slate-400 mt-1">Mean mRNA entrapment</div>
        </div>
      </div>

      {/* Row 2: Charts (Formulation performance & Particle size distributions) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Delivery Performance by Ionizable Lipid */}
        <div className="p-5 rounded-2xl bg-navy-900/70 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Transfection Efficacy by Ionizable Lipid</h3>
              <p className="text-xs text-slate-400">Mean experimental delivery outcome across published studies</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perfData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" />
                <YAxis domain={[50, 100]} stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(val: number) => [`${val.toFixed(1)} / 100`, "Mean Score"]}
                  contentStyle={{ backgroundColor: "#060d1f", borderColor: "#334155", borderRadius: "8px", fontSize: "11px" }}
                />
                <Bar dataKey="meanScore" radius={[4, 4, 0, 0]}>
                  {perfData.map((_, idx) => (
                    <Cell key={`bar-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Particle Size Distribution */}
        <div className="p-5 rounded-2xl bg-navy-900/70 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Nanoparticle Size Stratification</h3>
              <p className="text-xs text-slate-400">Hydrodynamic diameter (DLS nm) across formulations</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sizeBrackets} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                <XAxis dataKey="label" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(val: number) => [`${val} formulations`, "Count"]}
                  contentStyle={{ backgroundColor: "#060d1f", borderColor: "#334155", borderRadius: "8px", fontSize: "11px" }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: ML Models & Quantum Engine Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ML Status Card */}
        <div className="p-5 rounded-2xl bg-navy-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              CFTR Pathogenicity ML
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              5-Fold Cross-Validated
            </span>
          </div>

          <div className="space-y-2.5">
            {CFTR_MODEL_METRICS.models.map((m, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-navy-950/80 border border-slate-800 text-xs">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>{m.name}</span>
                  <span className="text-cyan-400 font-mono">AUC {m.auc_roc}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>F1-Score: {m.f1}</span>
                  <span>Precision: {m.precision}</span>
                  <span>Recall: {m.recall}</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/cftr"
            className="block text-center py-2 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-cyan-300 border border-cyan-500/30 transition-all"
          >
            Launch Variant Classifier
          </Link>
        </div>

        {/* Quantum Status Card */}
        <div className="p-5 rounded-2xl bg-navy-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-violet-400" />
              Quantum Optimization Engine
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
              QAOA Simulator
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-target Hamiltonian formulation mapping candidate genes to QUBO. Benchmarks Statevector QAOA against Simulated Annealing and Exhaustive Brute Force.
          </p>

          <div className="p-3 rounded-xl bg-navy-950/80 border border-slate-800 text-xs space-y-1.5 font-mono">
            <div className="text-slate-400 text-[11px]">Hamiltonian Equation:</div>
            <div className="text-violet-300 text-[11px]">H(x) = -Σ sᵢxᵢ + λΣ rᵢⱼxᵢxⱼ + A(Σxᵢ-K)²</div>
            <div className="text-[10px] text-slate-500 pt-1">Constraint Penalty A = 12.0 | Redundancy λ = 3.0</div>
          </div>

          <Link
            href="/quantum"
            className="block text-center py-2 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-violet-300 border border-violet-500/30 transition-all"
          >
            Run Quantum Benchmark
          </Link>
        </div>

        {/* Dataset Missingness Report */}
        <div className="p-5 rounded-2xl bg-navy-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Data Provenance & Missingness
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              Schema Audit
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Official 28-field schema audit preserving true research measurements without fabrication.
          </p>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
            {Object.entries(stats.missingDataPercent).slice(0, 5).map(([field, pct]) => (
              <div key={field} className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300 truncate max-w-[140px]">{field}</span>
                <span className="font-mono text-slate-400">
                  {pct === 0 ? <span className="text-emerald-400">0% missing</span> : `${pct}% missing`}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
            Source DOI: <a href="https://doi.org/10.5281/zenodo.17243733" target="_blank" rel="noreferrer" className="text-cyan-400 underline">{stats.doi}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
