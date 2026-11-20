"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
  ChevronLeft,
  Eye,
  Sliders,
} from "lucide-react";

export interface JourneyStep {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  cellularLocation: string;
  molecularMechanism: string;
  timeEstimate: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    title: "1. CFTR Gene & In Vitro Transcription",
    subTitle: "Codon-Optimized Synthetic mRNA Design",
    description:
      "Wild-type CFTR cDNA is transcribed into synthetic therapeutic mRNA with modified nucleosides (e.g. N1-methylpseudouridine) and optimal 5'-cap and 3'-poly(A) tail to eliminate innate Toll-like receptor (TLR7/8) immunogenicity.",
    cellularLocation: "Extracellular Synthetic Formulation",
    molecularMechanism: "Transcription -> In vitro enzymatic capping -> Polyadenylation",
    timeEstimate: "Pre-synthesis",
  },
  {
    id: 2,
    title: "2. LNP Microfluidic Encapsulation",
    subTitle: "Ionizable Lipid Phase Separation",
    description:
      "Ethanol lipid phase meets acidic aqueous mRNA phase (pH 4.0) inside staggered herringbone microfluidic channels. Protonated ionizable lipids electrostatically condense polyanionic mRNA into a solid electron-dense lipid core with PEG-lipid surface shielding.",
    cellularLocation: "Nanoscale Particle Assembly (pH 4.0 -> pH 7.4)",
    molecularMechanism: "Electrostatic condensation -> Hydrophobic core collapse -> PEG shell self-assembly",
    timeEstimate: "0.5 ms mixing",
  },
  {
    id: 3,
    title: "3. Cellular Inhalation & Target Binding",
    subTitle: "CF Airway Epithelial Membrane Adhesion",
    description:
      "Aerosolized LNPs penetrate human cystic fibrosis airway mucus (shielded by neutral 2.0-2.5 mol% PEG). Surface Apolipoprotein E (ApoE) / LDLR receptor-mediated endocytosis triggers membrane invagination.",
    cellularLocation: "Apical Plasma Membrane of Bronchial Epithelium (CFBE41o-)",
    molecularMechanism: "Clathrin-mediated and macropinocytic endocytosis",
    timeEstimate: "15 - 30 minutes",
  },
  {
    id: 4,
    title: "4. Endosomal Maturation & Acidification",
    subTitle: "Proton Sponge & Ionizable Charging",
    description:
      "Early endosome (pH 6.5) matures into late endosome (pH 5.0) via vacuolar H+-ATPase pumps. Ionizable lipid tertiary amines (pKa ~6.4) undergo massive protonation, accumulating counterions and osmotic swelling.",
    cellularLocation: "Early-to-Late Endosomal Lumen",
    molecularMechanism: "V-ATPase H+ influx -> Amine protonation -> Electrostatic membrane interaction",
    timeEstimate: "30 - 60 minutes",
  },
  {
    id: 5,
    title: "5. Non-Lamellar Phase Inversion & Escape",
    subTitle: "Endosomal Membrane Rupture (DOPE Synergism)",
    description:
      "Protonated ionizable lipids pair with anionic endosomal phospholipids (BMP/LBPA), forming cone-shaped inverted hexagonal (H_II) phases. Helper lipids (DOPE) facilitate transient fusion pores, liberating cargo into cytoplasm.",
    cellularLocation: "Endosomal Limiting Membrane",
    molecularMechanism: "Cone-shaped lipid packaging -> Hexagonal H_II pore formation -> Endosomal rupture",
    timeEstimate: "1 - 2 hours",
  },
  {
    id: 6,
    title: "6. Cytoplasmic Delivery & Ribosome Translation",
    subTitle: "Rough Endoplasmic Reticulum Docking",
    description:
      "Intact CFTR mRNA enters the cytosol (never requiring nuclear entry). 80S ribosomes bind the Kozak sequence; the CFTR N-terminal signal-anchor sequence targets translating ribosomes directly to the translocon on the rough ER membrane.",
    cellularLocation: "Perinuclear Cytoplasm & Rough Endoplasmic Reticulum (RER)",
    molecularMechanism: "Ribosome assembly -> Signal Recognition Particle (SRP) binding -> Sec61 translocon insertion",
    timeEstimate: "2 - 4 hours",
  },
  {
    id: 7,
    title: "7. Cotranslational Folding & N-Glycosylation",
    subTitle: "ER Membrane Domain Integration",
    description:
      "12 transmembrane alpha-helices integrate cotranslationally into the ER lipid bilayer via the Sec61 channel. NBD1, R-domain, and NBD2 assemble with molecular chaperones (Hsp70, Hsp90). Core-glycosylated Band B CFTR (~140 kDa) is generated.",
    cellularLocation: "Endoplasmic Reticulum Lumen and Bilayer",
    molecularMechanism: "TMD insertion -> NBD1/NBD2 dimer folding -> Calnexin cycle chaperone inspection",
    timeEstimate: "3 - 6 hours",
  },
  {
    id: 8,
    title: "8. Golgi Maturation & Vesicular Trafficking",
    subTitle: "Complex Glycosylation to Mature Band C",
    description:
      "Correctly folded CFTR escapes ER quality control, packaging into COPII vesicles for anterograde transport through cis-, medial-, and trans-Golgi cisternae. Glycosyltransferases add complex oligosaccharides, converting CFTR to mature 170 kDa Band C.",
    cellularLocation: "Golgi Apparatus -> Trans-Golgi Network (TGN)",
    molecularMechanism: "COPII vesicular trafficking -> Complex N-glycan arborization -> Secretory vesicle sorting",
    timeEstimate: "6 - 12 hours",
  },
  {
    id: 9,
    title: "9. Apical Membrane Insertion & Channel Function",
    subTitle: "Active Cl- and HCO3- Anion Conductance",
    description:
      "Targeted exocytic vesicles fuse with the apical plasma membrane. CFTR anchors to the actin cytoskeleton via NHERF1/ezrin PDZ interactions. PKA phosphorylation of the R-domain followed by ATP binding at NBD1/NBD2 opens the channel, restoring airway hydration.",
    cellularLocation: "Apical Plasma Membrane of Ciliated Epithelial Cells",
    molecularMechanism: "SNARE fusion -> PDZ anchoring -> PKA phosphorylation -> ATP-gated anion channel opening",
    timeEstimate: "12 - 24 hours (Sustained)",
  },
];

// Interactive 3D Lipid Bilayer Cell Membrane
function CellMembrane({ showMembrane }: { showMembrane: boolean }) {
  if (!showMembrane) return null;

  return (
    <group position={[0, -2.5, 0]}>
      {/* Outer Leaflet */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[10, 10, 0.3, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.65}
        />
      </mesh>
      {/* Hydrophobic Core */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[9.9, 9.9, 0.5, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Inner Leaflet */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[10, 10, 0.3, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
}

// 3D CFTR Protein Model grounded in Cryo-EM structure (PDB 5UAK architecture)
function CftrProteinModel({
  step,
  showProtein,
  showLabels,
}: {
  step: number;
  showProtein: boolean;
  showLabels: boolean;
}) {
  const proteinGroup = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (proteinGroup.current && step >= 7) {
      proteinGroup.current.rotation.y += delta * 0.15;
    }
  });

  if (!showProtein) return null;

  // Visibility and position depending on journey step
  const opacity = step >= 7 ? 1.0 : step === 6 ? 0.4 : 0.05;
  const isFormed = step >= 7;

  return (
    <group
      ref={proteinGroup}
      position={[0, isFormed ? -1.2 : -4.0, 0]}
      scale={isFormed ? [1, 1, 1] : [0.5, 0.5, 0.5]}
    >
      {/* TMD1: 6 Alpha-Helices in Transmembrane Bilayer */}
      <group position={[-1.2, 0.8, 0]}>
        {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
          <mesh key={`tm1-${i}`} position={[x, 0, (i % 2) * 0.3 - 0.15]}>
            <cylinderGeometry args={[0.16, 0.16, 2.8, 16]} />
            <meshStandardMaterial
              color="#06b6d4" // Cyan for TMD1
              roughness={0.3}
              metalness={0.4}
              transparent
              opacity={opacity}
              wireframe={!isFormed}
            />
          </mesh>
        ))}
      </group>

      {/* TMD2: 6 Alpha-Helices in Transmembrane Bilayer */}
      <group position={[1.2, 0.8, 0]}>
        {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
          <mesh key={`tm2-${i}`} position={[x, 0, (i % 2) * -0.3 + 0.15]}>
            <cylinderGeometry args={[0.16, 0.16, 2.8, 16]} />
            <meshStandardMaterial
              color="#22d3ee" // Bright Cyan for TMD2
              roughness={0.3}
              metalness={0.4}
              transparent
              opacity={opacity}
              wireframe={!isFormed}
            />
          </mesh>
        ))}
      </group>

      {/* NBD1 (Nucleotide Binding Domain 1 - Holds F508 site) */}
      <mesh position={[-1.1, -1.5, 0]}>
        <sphereGeometry args={[0.95, 24, 24]} />
        <meshStandardMaterial
          color="#8b5cf6" // Electric Violet for NBD1
          roughness={0.25}
          metalness={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* F508 Residue Marker on NBD1 Surface */}
      <mesh position={[-1.8, -1.2, 0.4]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color="#ef4444" // Red Highlight for F508 Mutation Site
          emissive="#ef4444"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Regulatory (R) Domain */}
      <mesh position={[0, -1.1, 0.8]}>
        <torusGeometry args={[0.7, 0.18, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#f59e0b" // Amber for Regulatory Domain
          roughness={0.4}
          metalness={0.2}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* NBD2 (Nucleotide Binding Domain 2) */}
      <mesh position={[1.1, -1.5, 0]}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshStandardMaterial
          color="#a78bfa" // Light Violet for NBD2
          roughness={0.25}
          metalness={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* ATP Bound in NBD1/NBD2 Dimer Interface */}
      <mesh position={[0, -1.5, -0.2]}>
        <dodecahedronGeometry args={[0.25]} />
        <meshStandardMaterial
          color="#eab308"
          emissive="#eab308"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Anion Conduction Pore (Central Channel) */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 2.6, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={opacity * 0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Scientific Labels in 3D Space */}
      {showLabels && isFormed && (
        <group>
          <Text position={[-2.4, 1.2, 0]} fontSize={0.28} color="#67e8f9">
            TMD1 (TM1-6)
          </Text>
          <Text position={[2.4, 1.2, 0]} fontSize={0.28} color="#67e8f9">
            TMD2 (TM7-12)
          </Text>
          <Text position={[-2.6, -1.6, 0]} fontSize={0.28} color="#c4b5fd">
            NBD1 (F508del)
          </Text>
          <Text position={[2.6, -1.6, 0]} fontSize={0.28} color="#c4b5fd">
            NBD2 (ATP Site)
          </Text>
          <Text position={[0, -0.4, 1.2]} fontSize={0.26} color="#fbbf24">
            R-Domain (PKA)
          </Text>
          <Text position={[0, 2.4, 0]} fontSize={0.26} color="#38bdf8">
            Cl⁻ / HCO₃⁻ Pore
          </Text>
        </group>
      )}
    </group>
  );
}

// 3D Lipid Nanoparticle (LNP) Multi-Component Shell & Core
function LnpParticle({
  step,
  showLnp,
  particleSize,
  pegMol,
  ionizableMol,
  cargoLoading,
}: {
  step: number;
  showLnp: boolean;
  particleSize: number;
  pegMol: number;
  ionizableMol: number;
  cargoLoading: number;
}) {
  const lnpRef = useRef<THREE.Group>(null);

  // Animate LNP path through cell journey
  useFrame((state, delta) => {
    if (!lnpRef.current) return;
    lnpRef.current.rotation.y += delta * 0.4;
    lnpRef.current.rotation.x += delta * 0.2;
  });

  if (!showLnp || step > 6) return null;

  // LNP Position coordinates mapped across Journey Steps
  const stepPositions: Record<number, [number, number, number]> = {
    1: [0, 2.2, 0],
    2: [0, 2.0, 0],
    3: [-2.2, 0.5, 0],
    4: [-1.2, -1.2, 0],
    5: [-0.5, -1.8, 0],
    6: [0.8, -2.0, 0],
  };

  const currentPos = stepPositions[step] || [0, 0, 0];
  const scaleNorm = (particleSize / 80) * 1.2;

  return (
    <group ref={lnpRef} position={currentPos} scale={[scaleNorm, scaleNorm, scaleNorm]}>
      {/* Outer PEG Lipid Shell Brush (Protective Corona) */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#2dd4bf" // Soft Turquoise
          wireframe
          transparent
          opacity={Math.min(0.65, pegMol * 0.18)}
        />
      </mesh>

      {/* Ionizable & Helper Lipid Bilayer Shell */}
      <mesh>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshStandardMaterial
          color="#6366f1" // Indigo Ionizable shell
          roughness={0.3}
          metalness={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Cholesterol / Sterol Core Matrix */}
      <mesh>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.6}
          metalness={0.1}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Encapsulated CFTR mRNA Coils inside core */}
      <group>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={`mrna-${i}`}
            rotation={[i * 0.6, i * 0.8, i * 0.4]}
            scale={[0.8, 0.8, 0.8]}
          >
            <torusGeometry args={[0.6 + i * 0.08, 0.06, 12, 24]} />
            <meshStandardMaterial
              color="#ec4899" // Hot Pink mRNA Strand
              emissive="#ec4899"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// 3D mRNA Strand Released in Cytosol & Ribosome Translation (Step 6)
function MrnaTranslationView({ step }: { step: number }) {
  if (step < 5 || step > 7) return null;

  return (
    <group position={[0.5, -1.8, 0]}>
      {/* Released Linear mRNA Strand */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.08, 0.08, 3.5, 16]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Ribosome 80S Complex Docking */}
      {step === 6 && (
        <group position={[0.2, 0.2, 0]}>
          {/* 60S Large Subunit */}
          <mesh position={[0, 0.4, 0]}>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshStandardMaterial color="#8b5cf6" roughness={0.5} />
          </mesh>
          {/* 40S Small Subunit */}
          <mesh position={[0, -0.3, 0]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#a78bfa" roughness={0.5} />
          </mesh>
          <Text position={[1.4, 0.3, 0]} fontSize={0.24} color="#f472b6">
            80S Ribosome Translating CFTR
          </Text>
        </group>
      )}
    </group>
  );
}

// Main Interactive 3D CFTR Scientific Experience Component
export default function CftrViewer3D() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showProtein, setShowProtein] = useState<boolean>(true);
  const [showLnp, setShowLnp] = useState<boolean>(true);
  const [showMembrane, setShowMembrane] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Interactive LNP Formulation Visual Sliders
  const [particleSize, setParticleSize] = useState<number>(82); // nm
  const [pegMol, setPegMol] = useState<number>(2.0); // mol %
  const [ionizableMol, setIonizableMol] = useState<number>(50); // mol %
  const [cargoLoading, setCargoLoading] = useState<number>(95); // %
  const [particleCount, setParticleCount] = useState<number>(3);

  const containerRef = useRef<HTMLDivElement>(null);

  // Playback timer loop
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, 4000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const activeStep = JOURNEY_STEPS[currentStepIndex];

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullScreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullScreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl border border-cyan-500/20 bg-navy-950/80 backdrop-blur-xl shadow-2xl overflow-hidden ${
        isFullScreen ? "fixed inset-0 z-50 rounded-none h-screen" : "h-[720px]"
      }`}
    >
      {/* Top Header Overlay with Scientific Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-navy-950/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              PDB 5UAK Cryo-EM Grounded
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/40">
              Interactive Biological Journey
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 drop-shadow-md">
            CFTR Precision Gene Therapy & LNP Delivery Pipeline
          </h2>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setShowLabels((prev) => !prev)}
            className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
              showLabels
                ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200"
                : "bg-navy-900/60 border-slate-700 text-slate-400"
            }`}
            title="Toggle Domain & Organelle Labels"
          >
            <Eye className="w-3.5 h-3.5" />
            Labels
          </button>
          <button
            onClick={toggleFullScreen}
            className="p-2 rounded-lg bg-navy-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Canvas 3D Viewport */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 1.5, 7.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-10, -5, -5]} intensity={0.6} color="#06b6d4" />
          <pointLight position={[0, 0, 0]} intensity={1.5} color="#8b5cf6" distance={12} />

          {/* Cell Membrane */}
          <CellMembrane showMembrane={showMembrane} />

          {/* CFTR Protein 3D Structure */}
          <CftrProteinModel
            step={activeStep.id}
            showProtein={showProtein}
            showLabels={showLabels}
          />

          {/* Lipid Nanoparticle Representation */}
          <LnpParticle
            step={activeStep.id}
            showLnp={showLnp}
            particleSize={particleSize}
            pegMol={pegMol}
            ionizableMol={ionizableMol}
            cargoLoading={cargoLoading}
          />

          {/* Cytoplasmic Translation & Ribosome */}
          <MrnaTranslationView step={activeStep.id} />

          {/* Floating Atmospheric Scientific Particles */}
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <group>
              {Array.from({ length: 25 }).map((_, i) => (
                <mesh
                  key={i}
                  position={[
                    (Math.sin(i * 1.5) - 0.5) * 12,
                    (Math.cos(i * 2.1) - 0.5) * 8,
                    (Math.sin(i * 3.3) - 0.5) * 6,
                  ]}
                >
                  <sphereGeometry args={[0.04, 8, 8]} />
                  <meshBasicMaterial
                    color={i % 2 === 0 ? "#22d3ee" : "#a78bfa"}
                    transparent
                    opacity={0.4}
                  />
                </mesh>
              ))}
            </group>
          </Float>

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxDistance={14}
            minDistance={3.5}
          />
        </Canvas>
      </div>

      {/* Floating Step-by-Step Educational Explanation Card (Left Side) */}
      <div className="absolute left-4 bottom-24 max-w-md w-full p-4 rounded-xl bg-navy-900/90 border border-cyan-500/30 backdrop-blur-md shadow-xl text-left pointer-events-auto transition-all">
        <div className="flex items-center justify-between text-xs text-cyan-400 mb-1 font-semibold">
          <span>{activeStep.cellularLocation}</span>
          <span className="text-slate-400">{activeStep.timeEstimate}</span>
        </div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          {activeStep.title}
        </h3>
        <p className="text-xs text-cyan-300 font-medium mb-2">{activeStep.subTitle}</p>
        <p className="text-xs text-slate-300 leading-relaxed mb-3">{activeStep.description}</p>
        <div className="p-2 rounded-lg bg-navy-950/70 border border-slate-800 text-[11px] text-slate-300">
          <span className="text-violet-400 font-semibold">Mechanism: </span>
          {activeStep.molecularMechanism}
        </div>
      </div>

      {/* Interactive Formulation Sliders Overlay (Right Side) */}
      <div className="absolute right-4 top-20 w-72 p-3.5 rounded-xl bg-navy-900/85 border border-slate-700/60 backdrop-blur-md shadow-lg pointer-events-auto">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            LNP Formulation Controls
          </h4>
          <span className="text-[10px] text-slate-400">Visual Simulation</span>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
              <span>Particle Diameter:</span>
              <span className="font-semibold text-cyan-400">{particleSize} nm</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={particleSize}
              onChange={(e) => setParticleSize(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
              <span>PEG Proportion:</span>
              <span className="font-semibold text-turquoise-400">{pegMol} mol%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.5"
              value={pegMol}
              onChange={(e) => setPegMol(Number(e.target.value))}
              className="w-full accent-teal-400 h-1 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
              <span>Ionizable Lipid:</span>
              <span className="font-semibold text-violet-400">{ionizableMol} mol%</span>
            </div>
            <input
              type="range"
              min="30"
              max="60"
              value={ionizableMol}
              onChange={(e) => setIonizableMol(Number(e.target.value))}
              className="w-full accent-violet-400 h-1 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
              <span>mRNA Loading Efficiency:</span>
              <span className="font-semibold text-pink-400">{cargoLoading}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="99"
              value={cargoLoading}
              onChange={(e) => setCargoLoading(Number(e.target.value))}
              className="w-full accent-pink-400 h-1 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Layer Toggles */}
        <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={showProtein}
              onChange={(e) => setShowProtein(e.target.checked)}
              className="rounded accent-cyan-400"
            />
            CFTR
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={showLnp}
              onChange={(e) => setShowLnp(e.target.checked)}
              className="rounded accent-cyan-400"
            />
            LNP
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={showMembrane}
              onChange={(e) => setShowMembrane(e.target.checked)}
              className="rounded accent-cyan-400"
            />
            Membrane
          </label>
        </div>
      </div>

      {/* Bottom Timeline & Controls Bar */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-navy-950/80 border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-bold transition-all shadow-md shadow-cyan-500/20"
            title={isPlaying ? "Pause Journey" : "Play Biological Journey"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            className="p-2 rounded-lg bg-navy-900 border border-slate-700 text-slate-300 hover:text-white transition-all"
            title="Reset Timeline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() =>
              setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : JOURNEY_STEPS.length - 1))
            }
            className="p-2 rounded-lg bg-navy-900 border border-slate-700 text-slate-300 hover:text-white"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentStepIndex((prev) => (prev + 1) % JOURNEY_STEPS.length)}
            className="p-2 rounded-lg bg-navy-900 border border-slate-700 text-slate-300 hover:text-white"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Step Timeline Dots */}
        <div className="flex items-center gap-1.5 flex-1 max-w-xl mx-2">
          {JOURNEY_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-2 flex-1 rounded-full transition-all ${
                idx === currentStepIndex
                  ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                  : idx < currentStepIndex
                  ? "bg-cyan-800/70 hover:bg-cyan-700"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
              title={`${s.title}`}
            />
          ))}
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Speed:</span>
          {[0.5, 1.0, 2.0].map((spd) => (
            <button
              key={spd}
              onClick={() => setPlaybackSpeed(spd)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                playbackSpeed === spd
                  ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/40"
                  : "bg-navy-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
