"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ConvergenceProps {
  history: { iteration: number; energy: number; probability?: number }[];
  algorithmName?: string;
}

export default function OptimizationConvergence({
  history,
  algorithmName = "Optimization Convergence",
}: ConvergenceProps) {
  if (!history || history.length === 0) {
    return <div className="text-xs text-slate-500 py-4 text-center">No convergence points recorded.</div>;
  }

  return (
    <div className="w-full p-4 rounded-xl bg-navy-900/60 border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          {algorithmName} (Energy vs Iteration)
        </h4>
        <span className="text-[11px] text-slate-400 font-mono">
          Final Energy: <strong className="text-cyan-400">{history[history.length - 1].energy.toFixed(3)}</strong>
        </span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis
              dataKey="iteration"
              stroke="#64748b"
              tick={{ fontSize: 10 }}
              label={{ value: "Iteration Step", position: "insideBottom", offset: -5, fill: "#94a3b8", fontSize: 10 }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fontSize: 10 }}
              domain={["auto", "auto"]}
              label={{ value: "QUBO Energy H(x)", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 10 }}
            />
            <Tooltip
              formatter={(val: number) => [val.toFixed(3), "Hamiltonian Energy"]}
              contentStyle={{ backgroundColor: "#060d1f", borderColor: "#334155", borderRadius: "8px", fontSize: "11px" }}
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#22d3ee"
              strokeWidth={2}
              dot={{ fill: "#06b6d4", r: 3 }}
              activeDot={{ r: 5, fill: "#a78bfa" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
