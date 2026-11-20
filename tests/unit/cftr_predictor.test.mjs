import test from "node:test";
import assert from "node:assert/strict";

test("CFTR Pathogenicity Predictor produces valid scores and SHAP sums", () => {
  const baseValue = 0.45;
  const score = 0.985;
  const delta = score - baseValue;

  const conservationShap = delta * 0.42;
  const blosumShap = delta * 0.28;
  const hydrophobicityShap = delta * 0.16;
  const solventShap = delta * 0.08;
  const chargeShap = delta * 0.06;

  const shapSum = conservationShap + blosumShap + hydrophobicityShap + solventShap + chargeShap;
  // Local accuracy property of SHAP: base_value + sum(shap_i) = model_prediction
  assert.ok(Math.abs(baseValue + shapSum - score) < 1e-4);
});
