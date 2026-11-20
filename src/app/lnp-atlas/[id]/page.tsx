"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Layers,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Database,
  FlaskConical,
  Activity,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { LnpFormulation } from "@/types";
import { getActiveLnpDataset } from "@/lib/datasets/lnpAtlas";
import CompositionChart from "@/components/charts/CompositionChart";

export default function FormulationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [formulation, setFormulation] = useState<LnpFormulation | null>(null);

  useEffect(() => {
    if (!id) return;
    const dataset = getActiveLnpDataset();
    const found = dataset.find(
      (f) => f.formulation_id.toLowerCase() === id.toLowerCase()
    );
    if (found) {
      setFormulation(found);
    }
  }, [id]);

  if (!formulation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Formulation Not Found</h2>
        <p className="text-xs text-slate-400">
          Formulation ID &apos;{id}&apos; was not found in the active LNP Atlas dataset.
        </p>
        <Link
          href="/lnp-atlas"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-navy-950 font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Atlas
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/lnp-atlas"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to LNP Atlas Explorer
        </Link>
      </div>

      {/* Main Header Banner */}
      <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm font-bold text-cyan-400">
                {formulation.formulation_id}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified Experimental Data
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {formulation.ionizable_lipid} Nanoparticle Architecture
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Formulated with {formulation.helper_lipid}, {formulation.sterol_lipid}, and {formulation.peg_lipid} ({formulation.lipid_molar_ratio} mol%)
            </p>
          </div>

          <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Delivery Efficacy</div>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-turquoise-300 font-mono">
              {formulation.delivery_score.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Encapsulation: {formulation.encapsulation_efficiency_percent}%</div>
          </div>
        </div>
      </div>

      {/* Grid: 28 Parameters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Physicochemical & Composition (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Lipid Composition Breakdown */}
          <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Standardized Lipid Components & Molar Ratios
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
                <div className="text-violet-400 font-semibold text-[11px]">Ionizable Lipid</div>
                <div className="font-bold text-white text-sm">{formulation.ionizable_lipid}</div>
                <div className="text-slate-400 font-mono text-[11px]">{formulation.ratio_ionizable} mol%</div>
                {formulation.ionizable_lipid_smiles && (
                  <div className="text-[10px] text-slate-500 font-mono truncate" title={formulation.ionizable_lipid_smiles}>
                    SMILES: {formulation.ionizable_lipid_smiles}
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
                <div className="text-cyan-400 font-semibold text-[11px]">Helper Phospholipid</div>
                <div className="font-bold text-white text-sm">{formulation.helper_lipid}</div>
                <div className="text-slate-400 font-mono text-[11px]">{formulation.ratio_helper} mol%</div>
                {formulation.helper_lipid_smiles && (
                  <div className="text-[10px] text-slate-500 font-mono truncate" title={formulation.helper_lipid_smiles}>
                    SMILES: {formulation.helper_lipid_smiles}
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
                <div className="text-blue-400 font-semibold text-[11px]">Sterol Matrix</div>
                <div className="font-bold text-white text-sm">{formulation.sterol_lipid}</div>
                <div className="text-slate-400 font-mono text-[11px]">{formulation.ratio_sterol} mol%</div>
                {formulation.sterol_lipid_smiles && (
                  <div className="text-[10px] text-slate-500 font-mono truncate" title={formulation.sterol_lipid_smiles}>
                    SMILES: {formulation.sterol_lipid_smiles}
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
                <div className="text-turquoise-400 font-semibold text-[11px]">PEG-Lipid Anchor</div>
                <div className="font-bold text-white text-sm">{formulation.peg_lipid}</div>
                <div className="text-slate-400 font-mono text-[11px]">{formulation.ratio_peg} mol%</div>
                {formulation.peg_lipid_smiles && (
                  <div className="text-[10px] text-slate-500 font-mono truncate" title={formulation.peg_lipid_smiles}>
                    SMILES: {formulation.peg_lipid_smiles}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <CompositionChart
                ionizable={formulation.ratio_ionizable}
                helper={formulation.ratio_helper}
                sterol={formulation.ratio_sterol}
                peg={formulation.ratio_peg}
              />
            </div>
          </div>

          {/* Physicochemical Parameters Table */}
          <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-turquoise-400" />
              Standardized Physicochemical Properties
            </h3>

            <div className="divide-y divide-slate-800 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400">Hydrodynamic Diameter (DLS):</span>
                <span className="font-mono font-bold text-white">
                  {formulation.particle_size_nm} nm {formulation.particle_size_nm_std ? `± ${formulation.particle_size_nm_std}` : ""}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400">Polydispersity Index (PDI):</span>
                <span className="font-mono text-white">
                  {formulation.pdi} {formulation.pdi_std ? `± ${formulation.pdi_std}` : ""}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400">Zeta Potential (Surface Charge):</span>
                <span className="font-mono text-white">
                  {formulation.zeta_potential_mv !== undefined ? `${formulation.zeta_potential_mv} mV` : "Not Reported"}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400">Encapsulation Efficiency:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {formulation.encapsulation_efficiency_percent}% {formulation.encapsulation_efficiency_percent_std ? `± ${formulation.encapsulation_efficiency_percent_std}%` : ""}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-400">Synthesis Method:</span>
                <span className="text-cyan-300 font-semibold">{formulation.synthesis_method}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Biological Context & Source Literature (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Target & Cargo */}
          <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-pink-400" />
              Biological Cargo & Target
            </h3>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Target Cell Model</span>
                <span className="font-bold text-white text-sm mt-0.5 block">{formulation.target_type}</span>
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Nucleic Acid Payload</span>
                <span className="font-bold text-pink-300 text-sm mt-0.5 block">{formulation.cargo_type}</span>
              </div>
            </div>

            {formulation.notes && (
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                <strong className="text-cyan-400 block mb-1">Mechanistic Notes:</strong>
                {formulation.notes}
              </div>
            )}
          </div>

          {/* Source Publication Metadata */}
          <div className="p-5 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400" />
              Source Literature Provenance
            </h3>

            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Paper Title</span>
                <span className="font-semibold text-white leading-snug block mt-0.5">{formulation.paper_title}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Authors</span>
                <span className="text-slate-300 block">{formulation.paper_authors}</span>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Journal & Year:</span>
                <span className="text-slate-200 font-medium">{formulation.paper_journal} ({formulation.paper_year})</span>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <a
                  href={`https://doi.org/${formulation.paper_doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-all"
                >
                  <span>DOI: {formulation.paper_doi}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
