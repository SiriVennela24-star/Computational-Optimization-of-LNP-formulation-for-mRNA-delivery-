"use client";

import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { DegGene } from "@/types";

interface VolcanoPlotProps {
  genes: DegGene[];
  onSelectGene?: (gene: DegGene) => void;
}

export default function VolcanoPlot({ genes, onSelectGene }: VolcanoPlotProps) {
  const [hoveredGene, setHoveredGene] = useState<DegGene | null>(null);

  // Transform data for Volcano plot: X = log2_fold_change, Y = -log10(p_value)
  const plotData = genes.map((g) => {
    const negLogP = -Math.log10(Math.max(1e-10, g.p_value));
    return {
      ...g,
      x: Number(g.log2_fold_change.toFixed(2)),
      y: Number(negLogP.toFixed(2)),
      fill:
        g.expression_status === "Upregulated"
          ? "#ef4444"
          : g.expression_status === "Downregulated"
          ? "#06b6d4"
          : "#64748b",
    };
  });

  return (
    <div className="w-full p-4 rounded-xl bg-navy-900/60 border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Transcriptome Volcano Plot (GSE15568 CF vs Non-CF)
          </h4>
          <p className="text-[11px] text-slate-400">
            Significance threshold: FDR &lt; 0.01 and |Log₂FC| &gt; 1.5
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Upregulated in CF
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            Downregulated in CF
          </span>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
            <XAxis
              type="number"
              dataKey="x"
              name="Log2 Fold Change"
              domain={[-4, 4]}
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              label={{ value: "Log₂ Fold Change (CF / Non-CF)", position: "insideBottom", offset: -10, fill: "#94a3b8", fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="-Log10 p-value"
              domain={[0, 8]}
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              label={{ value: "-Log₁₀ (p-value)", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 11 }}
            />
            {/* Cutoff lines */}
            <ReferenceLine x={1.5} stroke="#334155" strokeDasharray="3 3" />
            <ReferenceLine x={-1.5} stroke="#334155" strokeDasharray="3 3" />
            <ReferenceLine y={2.0} stroke="#334155" strokeDasharray="3 3" />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as DegGene & { x: number; y: number };
                  return (
                    <div className="p-3 rounded-lg bg-navy-950 border border-slate-700 shadow-xl text-xs space-y-1">
                      <div className="font-bold text-white flex items-center justify-between gap-4">
                        <span className="text-cyan-300 text-sm">{data.gene_symbol}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            data.expression_status === "Upregulated"
                              ? "bg-rose-500/20 text-rose-300"
                              : data.expression_status === "Downregulated"
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          {data.expression_status}
                        </span>
                      </div>
                      <div className="text-slate-300 text-[11px]">{data.gene_name}</div>
                      <div className="pt-1 text-[11px] grid grid-cols-2 gap-x-2 text-slate-400">
                        <span>Log₂FC: <strong className="text-white">{data.x}</strong></span>
                        <span>FDR: <strong className="text-white">{data.adj_p_value.toExponential(2)}</strong></span>
                      </div>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                        {data.cftr_pathway_relevance}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              data={plotData}
              onClick={(e) => onSelectGene && onSelectGene(e.payload)}
              cursor="pointer"
            >
              {plotData.map((entry, index) => (
                <Cell
                  key={`scatter-cell-${index}`}
                  fill={entry.fill}
                  r={entry.gene_symbol === "CFTR" || entry.gene_symbol === "CXCL8" ? 9 : 6}
                  stroke={entry.gene_symbol === "CFTR" ? "#ffffff" : "none"}
                  strokeWidth={2}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
