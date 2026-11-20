import test from "node:test";
import assert from "node:assert/strict";

// Test official 28 fields schema definition
const OFFICIAL_LNP_ATLAS_FIELDS = [
  "formulation_id",
  "ionizable_lipid",
  "ionizable_lipid_smiles",
  "helper_lipid",
  "helper_lipid_smiles",
  "sterol_lipid",
  "sterol_lipid_smiles",
  "peg_lipid",
  "peg_lipid_smiles",
  "lipid_molar_ratio",
  "particle_size_nm",
  "particle_size_nm_std",
  "pdi",
  "pdi_std",
  "zeta_potential_mv",
  "zeta_potential_mv_std",
  "encapsulation_efficiency_percent",
  "encapsulation_efficiency_percent_std",
  "loading_capacity_std",
  "target_type",
  "cargo_type",
  "synthesis_method",
  "delivery_score",
  "paper_title",
  "paper_authors",
  "paper_doi",
  "paper_journal",
  "paper_year",
];

test("LNP Atlas Schema has exactly 28 standardized fields", () => {
  assert.equal(OFFICIAL_LNP_ATLAS_FIELDS.length, 28);
  assert.ok(OFFICIAL_LNP_ATLAS_FIELDS.includes("ionizable_lipid"));
  assert.ok(OFFICIAL_LNP_ATLAS_FIELDS.includes("helper_lipid"));
  assert.ok(OFFICIAL_LNP_ATLAS_FIELDS.includes("sterol_lipid"));
  assert.ok(OFFICIAL_LNP_ATLAS_FIELDS.includes("peg_lipid"));
  assert.ok(OFFICIAL_LNP_ATLAS_FIELDS.includes("particle_size_nm"));
  assert.ok(OFFICIAL_LNP_ATLAS_FIELDS.includes("encapsulation_efficiency_percent"));
});

test("CSV parser handles valid CSV row with quote escaping and ratios", () => {
  const sampleRow =
    '"LNP-001","SM-102","C123","DSPC","C456","Cholesterol","C789","DMG-PEG2000","C000","50:10:38.5:1.5",82.4,4.2,0.082,0.012,-2.4,0.8,94.6,1.8,0.048,"CFBE41o-","CFTR mRNA","Microfluidic Mixing",88.5,"Spikevax Paper","Baden et al.","10.1056/NEJMoa2035389","NEJM",2021';
  
  const tokens = sampleRow.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  assert.equal(tokens.length, 28);
  assert.equal(tokens[0].replace(/"/g, ""), "LNP-001");
  assert.equal(tokens[1].replace(/"/g, ""), "SM-102");
  assert.equal(tokens[9].replace(/"/g, ""), "50:10:38.5:1.5");
});
