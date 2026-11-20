"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { ShapExplanation } from "@/types";

interface ShapWaterfallProps {
  shap: ShapExplanation;
  title?: string;
}

export default function ShapWaterfall({ shap, title = "Local SHAP Feature Attribution (Waterfall)" }: ShapWaterfallProps) {
  const chartData = shap.feature_names.map((name, i) => {
    const val = shap.values[i];
    return {
      name: name.length > 28 ? name.substring(0, 26) + "..." : name,
      fullName: name,
      impact: val,
      inputValue: shap.data ? String(shap.data[i]) : "",
      direction: val >= 0 ? "Positive (Increases Risk/Score)" : "Negative (Decreases Risk/Score)",
    };
  });

  return (
    <div className="w-full p-4 rounded-xl bg-navy-900/60 border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{title}</h4>
        <div className="text-[11px] text-slate-400">
          Base Value: <span className="text-cyan-400 font-mono">{shap.base_value.toFixed(2)}</span> → Prediction:{" "}
          <span className="text-violet-400 font-mono font-bold">{shap.prediction.toFixed(2)}</span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} domain={["auto", "auto"]} />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              width={160}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as any;
                  return (
                    <div className="p-2.5 rounded-lg bg-navy-950 border border-slate-700 shadow-xl text-xs space-y-1">
                      <div className="font-bold text-white">{data.fullName}</div>
                      <div className="text-cyan-300">
                        SHAP Impact: <strong>{data.impact > 0 ? "+" : ""}{Number(data.impact).toFixed(3)}</strong>
                      </div>
                      {data.inputValue && (
                        <div className="text-slate-400 text-[11px]">Feature Input: {String(data.inputValue)}</div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine x={0} stroke="#475569" strokeWidth={1} strokeDasharray="3 3" />
            <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.impact >= 0 ? "#ec4899" : "#06b6d4"} // Pink = increases, Cyan = decreases
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 px-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-pink-500 inline-block" />
          <span>Positive feature contribution (pushes prediction higher)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-cyan-500 inline-block" />
          <span>Negative feature contribution (pushes prediction lower)</span>
        </div>
      </div>
    </div>
  );
}
