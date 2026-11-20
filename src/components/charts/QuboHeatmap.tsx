"use client";

import React from "react";
import { QuboProblem } from "@/types";

interface QuboHeatmapProps {
  qubo: QuboProblem;
}

export default function QuboHeatmap({ qubo }: QuboHeatmapProps) {
  const n = qubo.n_variables;
  const matrix = qubo.quadratic_matrix;

  // Find min and max for normalization
  let min = 0;
  let max = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] < min) min = matrix[i][j];
      if (matrix[i][j] > max) max = matrix[i][j];
    }
  }

  const range = max - min || 1;

  return (
    <div className="w-full p-4 rounded-xl bg-navy-900/60 border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          QUBO Quadratic Coupling Matrix Q[i,j]
        </h4>
        <div className="text-[11px] text-slate-400">
          Variables: <span className="text-cyan-400 font-mono font-bold">{n} qubits</span> | Constraint K:{" "}
          <span className="text-violet-400 font-mono font-bold">{qubo.target_k}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `80px repeat(${n}, minmax(42px, 1fr))` }}
          >
            {/* Header Column */}
            <div className="h-7 text-[10px] font-bold text-slate-500 flex items-center justify-end pr-2">
              Q[i,j]
            </div>
            {qubo.variable_names.map((v, j) => (
              <div
                key={`col-${j}`}
                className="h-7 text-[10px] font-bold text-cyan-300 flex items-center justify-center truncate"
                title={v}
              >
                {v.slice(0, 5)}
              </div>
            ))}

            {/* Matrix Rows */}
            {qubo.variable_names.map((rowName, i) => (
              <React.Fragment key={`row-${i}`}>
                <div
                  className="h-9 text-[10px] font-semibold text-cyan-300 flex items-center justify-end pr-2 truncate"
                  title={rowName}
                >
                  {rowName.slice(0, 6)}
                </div>
                {matrix[i].map((val, j) => {
                  const isDiag = i === j;
                  // Color scale: Negative is green/cyan (favorable), Positive is red/violet (penalty)
                  const norm = (val - min) / range;
                  const bg = isDiag
                    ? "bg-violet-600/40 border-violet-400/50"
                    : val > 0
                    ? "bg-rose-500/20 text-rose-300"
                    : val < 0
                    ? "bg-cyan-500/25 text-cyan-200"
                    : "bg-navy-950/40 text-slate-500";

                  return (
                    <div
                      key={`cell-${i}-${j}`}
                      className={`h-9 rounded flex items-center justify-center text-[10px] font-mono border border-slate-800/80 transition-colors hover:border-cyan-400 ${bg}`}
                      title={`${qubo.variable_names[i]} x ${qubo.variable_names[j]} = ${val.toFixed(2)}`}
                    >
                      {val.toFixed(1)}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-violet-600/60 inline-block" />
          <span>Diagonal linear terms Q[i,i] (-s_i + A(1 - 2K))</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-rose-500/40 inline-block" />
          <span>Off-diagonal quadratic penalties Q[i,j] (λ*r_ij + 2A)</span>
        </span>
      </div>
    </div>
  );
}
