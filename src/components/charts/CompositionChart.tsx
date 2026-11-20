"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface CompositionProps {
  ionizable: number;
  helper: number;
  sterol: number;
  peg: number;
  labels?: {
    ionizable: string;
    helper: string;
    sterol: string;
    peg: string;
  };
}

const COLORS = ["#8b5cf6", "#06b6d4", "#3b82f6", "#2dd4bf"];

export default function CompositionChart({
  ionizable,
  helper,
  sterol,
  peg,
  labels = {
    ionizable: "Ionizable Lipid",
    helper: "Helper Lipid",
    sterol: "Sterol",
    peg: "PEG-Lipid",
  },
}: CompositionProps) {
  const data = [
    { name: labels.ionizable, value: ionizable, color: COLORS[0] },
    { name: labels.helper, value: helper, color: COLORS[1] },
    { name: labels.sterol, value: sterol, color: COLORS[2] },
    { name: labels.peg, value: peg, color: COLORS[3] },
  ];

  return (
    <div className="w-full h-56 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={75}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#0b1329" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(1)} mol%`, "Ratio"]}
            contentStyle={{ backgroundColor: "#060d1f", borderColor: "#1e293b", borderRadius: "8px" }}
            itemStyle={{ color: "#f1f5f9" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-[11px] text-slate-300">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
