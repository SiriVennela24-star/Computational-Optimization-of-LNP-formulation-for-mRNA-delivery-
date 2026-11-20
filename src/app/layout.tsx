import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Quantum-XAI: CFTR Precision Gene Therapy & LNP Optimization",
  description:
    "An explainable hybrid quantum-classical research platform connecting CFTR genetic analysis with intelligent lipid nanoparticle delivery optimization.",
  keywords: [
    "CFTR",
    "Cystic Fibrosis",
    "Lipid Nanoparticles",
    "LNP Atlas",
    "Quantum Optimization",
    "QAOA",
    "QUBO",
    "Explainable AI",
    "SHAP",
    "Gene Therapy",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-navy-950">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
