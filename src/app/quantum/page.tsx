"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BarChart3,
  Dna,
  ShieldCheck,
  Binary,
  GitBranch,
} from "lucide-react";
import { buildTargetSelectionQubo, CandidateTarget } from "@/lib/quantum/qubo";
import { runQaoaSimulation } from "@/lib/quantum/qaoa";
import { runSimulatedAnnealing } from "@/lib/quantum/annealing";
import { runBruteForceOptimization } from "@/lib/quantum/bruteForce";
import { DEG_GENES } from "@/lib/datasets/pathwaysData";
import { getActiveLnpDataset } from "@/lib/datasets/lnpAtlas";
import { QuboProblem, QuboResult } from "@/types";
import QuboHeatmap from "@/components/charts/QuboHeatmap";
import OptimizationConvergence from "@/components/charts/OptimizationConvergence";

export default function QuantumOptimizationPage() {
  const [activeWorkflow, setActiveWorkflow] = useState<"targets" | "formulations">("targets");

  // Hyperparameters
  const [targetK, setTargetK] = useState<number>(3);
  const [redundancyWeight, setRedundancyWeight] = useState<number>(3.0);
  const [penaltyMultiplier, setPenaltyMultiplier] = useState<number>(12.0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<"qaoa" | "annealing" | "brute-force">("qaoa");

  // Results
  const [activeQubo, setActiveQubo] = useState<QuboProblem | null>(null);
  const [activeResult, setActiveResult] = useState<QuboResult | null>(null);
  const [benchmarkResults, setBenchmarkResults] = useState<{
    bf: QuboResult;
    qaoa: QuboResult;
    sa: QuboResult;
  } | null>(null);

  // Build Target Selection candidates
  const targetCandidates: CandidateTarget[] = DEG_GENES.slice(0, 8).map((d) => ({
    id: d.gene_symbol,
    name: d.gene_symbol,
    score: Math.abs(d.log2_fold_change) * 2.0,
    redundancy_group: d.cftr_pathway_relevance.includes("mucin")
      ? "Mucin Secretion"
      : d.cftr_pathway_relevance.includes("channel") || d.cftr_pathway_relevance.includes("disease")
      ? "Ion Channel Conductance"
      : d.cftr_pathway_relevance.includes("chaperone")
      ? "ER Chaperone Quality Control"
      : "Inflammatory Cytokine Axis",
  }));

  // Build Formulation candidates from active LNP Atlas
  const activeDataset = getActiveLnpDataset();
  const formulationCandidates: CandidateTarget[] = activeDataset.slice(0, 8).map((f) => ({
    id: f.formulation_id,
    name: `${f.formulation_id} (${f.ionizable_lipid})`,
    score: f.delivery_score / 10.0 + f.encapsulation_efficiency_percent / 20.0,
    redundancy_group: f.ionizable_lipid,
  }));

  // Construct and solve QUBO
  const solveQubo = () => {
    const candidates = activeWorkflow === "targets" ? targetCandidates : formulationCandidates;
    const k = activeWorkflow === "targets" ? targetK : 2;

    const qubo = buildTargetSelectionQubo(candidates, k, redundancyWeight, penaltyMultiplier);
    setActiveQubo(qubo);

    let res: QuboResult;
    if (selectedAlgorithm === "annealing") {
      res = runSimulatedAnnealing(qubo, 400);
    } else if (selectedAlgorithm === "brute-force") {
      res = runBruteForceOptimization(qubo);
    } else {
      res = runQaoaSimulation(qubo, 1);
    }
    setActiveResult(res);

    // Also run all 3 for benchmarking comparison
    const qaoaRes = runQaoaSimulation(qubo, 1);
    const saRes = runSimulatedAnnealing(qubo, 400);
    const bfRes = runBruteForceOptimization(qubo);
    setBenchmarkResults({ qaoa: qaoaRes, sa: saRes, bf: bfRes });
  };

  useEffect(() => {
    solveQubo();
  }, [activeWorkflow, targetK, redundancyWeight, penaltyMultiplier, selectedAlgorithm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30">
            Hybrid Quantum-Classical Optimization
          </span>
          <span className="text-xs text-slate-400 font-mono">QUBO / QAOA Statevector Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Quantum-Assisted Target Prioritization & Formulation Optimization
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl leading-relaxed">
          Map multi-target gene prioritization and combinatorial LNP component selection to Quadratic Unconstrained Binary Optimization (QUBO) problems. Simulate parameterized Quantum Approximate Optimization Algorithm (QAOA) ansatzes against classical Simulated Annealing and exact brute-force baselines.
        </p>
      </div>

      {/* Quantum Advantange Disclosure Alert */}
      <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/30 text-xs text-violet-200/90 leading-relaxed flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-violet-300 font-semibold">Scientific Transparency & Quantum Claim Notice: </strong>
          Quantum optimization in this platform operates as an exploratory computational research tool using an exact TypeScript statevector simulator of the QAOA Hamiltonian circuit. No physical quantum hardware execution occurred. Classical simulated annealing and exact combinatorial search are provided as rigorous benchmarking baselines.
        </div>
      </div>

      {/* Workflow Tabs (A. Target Selection vs B. Formulation Optimization) */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            setActiveWorkflow("targets");
            setTargetK(3);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeWorkflow === "targets"
              ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
              : "bg-navy-900 border border-slate-700 text-slate-300 hover:text-white"
          }`}
        >
          <Dna className="w-4 h-4" />
          <span>Workflow A: Therapeutic Target Selection</span>
        </button>

        <button
          onClick={() => {
            setActiveWorkflow("formulations");
            setTargetK(2);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeWorkflow === "formulations"
              ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
              : "bg-navy-900 border border-slate-700 text-slate-300 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Workflow B: LNP Formulation Search</span>
        </button>
      </div>

      {/* Main Grid: Parameters & Circuit Setup (5 cols) | Optimization Output (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: QUBO Hyperparameters (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-navy-900/70 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-violet-400" />
              QUBO Hamiltonian Mathematical Setup
            </h2>

            {/* Hamiltonian Equation Box */}
            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 font-mono text-[11px] space-y-1">
              <div className="text-violet-300 font-bold">
                Minimize: H(x) = -Σ sᵢ xᵢ + λ Σ rᵢⱼ xᵢ xⱼ + A (Σ xᵢ - K)²
              </div>
              <div className="text-slate-400 text-[10px]">
                xᵢ ∈ &#123;0, 1&#125; indicates candidate inclusion in therapeutic regimen.
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Target Cardinality Constraint (K):</span>
                  <span className="font-mono text-cyan-400 font-bold">{targetK} variables</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={targetK}
                  onChange={(e) => setTargetK(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Redundancy Penalty Weight (λ):</span>
                  <span className="font-mono text-violet-400 font-bold">{redundancyWeight.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6.0"
                  step="0.5"
                  value={redundancyWeight}
                  onChange={(e) => setRedundancyWeight(parseFloat(e.target.value))}
                  className="w-full accent-violet-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Constraint Penalty Multiplier (A):</span>
                  <span className="font-mono text-pink-400 font-bold">{penaltyMultiplier.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="25.0"
                  step="1.0"
                  value={penaltyMultiplier}
                  onChange={(e) => setPenaltyMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-pink-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Algorithm Radio Buttons */}
              <div className="pt-2">
                <span className="block text-slate-300 font-semibold mb-1.5">Execution Algorithm</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedAlgorithm("qaoa")}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                      selectedAlgorithm === "qaoa"
                        ? "bg-violet-600/30 border-violet-500 text-white"
                        : "bg-navy-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    QAOA (p=1)
                  </button>
                  <button
                    onClick={() => setSelectedAlgorithm("annealing")}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                      selectedAlgorithm === "annealing"
                        ? "bg-violet-600/30 border-violet-500 text-white"
                        : "bg-navy-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Sim. Annealing
                  </button>
                  <button
                    onClick={() => setSelectedAlgorithm("brute-force")}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                      selectedAlgorithm === "brute-force"
                        ? "bg-violet-600/30 border-violet-500 text-white"
                        : "bg-navy-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Brute Force
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={solveQubo}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-500/25 hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Re-execute Optimization Circuit</span>
            </button>
          </div>

          {/* QUBO Coupling Matrix Heatmap */}
          {activeQubo && <QuboHeatmap qubo={activeQubo} />}
        </div>

        {/* Right Column: Results & Benchmarking (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Solution Card */}
          {activeResult && (
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-violet-400 tracking-wider">
                    {activeResult.algorithm} Output
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    Selected Subset ({activeResult.selected_variables.length} / {targetK} target)
                  </h3>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    activeResult.constraint_satisfied
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeResult.constraint_satisfied ? "Constraint Satisfied" : "Constraint Violated"}
                </span>
              </div>

              {/* Selected Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeResult.selected_variables.map((v, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm"
                  >
                    ★ {v}
                  </span>
                ))}
              </div>

              {/* Telemetry Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Min Energy</div>
                  <div className="text-base font-bold text-cyan-300 font-mono mt-0.5">
                    {activeResult.best_energy}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Execution Time</div>
                  <div className="text-base font-bold text-white font-mono mt-0.5">
                    {activeResult.runtime_ms} ms
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">State Bitstring</div>
                  <div className="text-base font-bold text-violet-300 font-mono mt-0.5">
                    |{activeResult.bitstring}⟩
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Candidate States</div>
                  <div className="text-base font-bold text-pink-300 font-mono mt-0.5">
                    {activeResult.iterations}
                  </div>
                </div>
              </div>

              {/* Hardware note */}
              <div className="p-2.5 rounded-xl bg-navy-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{activeResult.hardware_claim}</span>
              </div>
            </div>
          )}

          {/* Energy vs Iteration Convergence Chart */}
          {activeResult && activeResult.convergence_history.length > 0 && (
            <OptimizationConvergence
              history={activeResult.convergence_history}
              algorithmName={`${activeResult.algorithm} Convergence`}
            />
          )}

          {/* Classical vs Quantum Tri-Algorithm Benchmark Table */}
          {benchmarkResults && (
            <div className="p-5 rounded-2xl bg-navy-900/70 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Tri-Algorithm Quantum Benchmarking Comparison
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-navy-950 border-b border-slate-800 text-[10px] uppercase text-slate-400 font-semibold">
                    <tr>
                      <th className="p-2.5">Algorithm</th>
                      <th className="p-2.5">Best Energy</th>
                      <th className="p-2.5">Feasible?</th>
                      <th className="p-2.5">Runtime</th>
                      <th className="p-2.5">Selected Items</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    <tr className="hover:bg-navy-800/40">
                      <td className="p-2.5 font-sans font-bold text-white">Exact Brute Force</td>
                      <td className="p-2.5 text-cyan-300">{benchmarkResults.bf.best_energy}</td>
                      <td className="p-2.5 text-emerald-400">Yes (100%)</td>
                      <td className="p-2.5 text-slate-300">{benchmarkResults.bf.runtime_ms} ms</td>
                      <td className="p-2.5 font-sans text-slate-300">{benchmarkResults.bf.selected_variables.join(", ")}</td>
                    </tr>
                    <tr className="hover:bg-navy-800/40 bg-violet-950/20">
                      <td className="p-2.5 font-sans font-bold text-violet-300">QAOA Simulation (Statevector)</td>
                      <td className="p-2.5 text-violet-300">{benchmarkResults.qaoa.best_energy}</td>
                      <td className="p-2.5 text-emerald-400">{benchmarkResults.qaoa.constraint_satisfied ? "Yes" : "No"}</td>
                      <td className="p-2.5 text-slate-300">{benchmarkResults.qaoa.runtime_ms} ms</td>
                      <td className="p-2.5 font-sans text-slate-300">{benchmarkResults.qaoa.selected_variables.join(", ")}</td>
                    </tr>
                    <tr className="hover:bg-navy-800/40">
                      <td className="p-2.5 font-sans font-bold text-white">Classical Simulated Annealing</td>
                      <td className="p-2.5 text-cyan-300">{benchmarkResults.sa.best_energy}</td>
                      <td className="p-2.5 text-emerald-400">{benchmarkResults.sa.constraint_satisfied ? "Yes" : "No"}</td>
                      <td className="p-2.5 text-slate-300">{benchmarkResults.sa.runtime_ms} ms</td>
                      <td className="p-2.5 font-sans text-slate-300">{benchmarkResults.sa.selected_variables.join(", ")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
