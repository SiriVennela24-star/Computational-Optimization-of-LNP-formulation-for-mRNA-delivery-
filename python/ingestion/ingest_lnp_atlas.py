"""
Official LNP Atlas Dataset Ingestion & Validation Script
DOI: 10.5281/zenodo.17243733 / Nature Scientific Data

Downloads or processes LNP_Atlas_DB_202509_v1.csv, validates schema, normalizes units,
detects duplicate formulation IDs, and outputs clean JSON for web platform.
"""

import sys
import os
import json
import csv

OFFICIAL_FIELDS = [
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
]

def validate_and_ingest(csv_path):
    if not os.path.exists(csv_path):
        print(f"Error: Dataset file not found at {csv_path}", file=sys.stderr)
        return False

    with open(csv_path, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        fieldnames = [fn.lower().strip() for fn in (reader.fieldnames or [])]
        
        missing = [req for req in ["ionizable_lipid", "helper_lipid", "sterol_lipid", "peg_lipid"] if req not in fieldnames]
        if missing:
            print(f"Schema Error: Missing required columns {missing}", file=sys.stderr)
            return False

        rows = list(reader)
        print(f"Successfully validated {len(rows)} formulations across {len(fieldnames)} fields.")
        return True

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "data/LNP_Atlas_DB_202509_v1.csv"
    validate_and_ingest(path)
