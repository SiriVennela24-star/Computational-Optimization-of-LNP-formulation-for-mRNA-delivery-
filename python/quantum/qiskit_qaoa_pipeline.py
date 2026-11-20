"""
Qiskit QAOA Pipeline for CFTR Precision Target Selection & LNP Optimization
Part of Quantum-XAI CFTR Precision Gene Therapy Platform.

Requires:
  pip install qiskit qiskit-aer qiskit-optimization numpy
"""

import sys
import json
import numpy as np

def build_qubo_matrix(candidates, target_k=3, redundancy_weight=3.0, penalty_multiplier=12.0):
    n = len(candidates)
    linear = np.zeros(n)
    quadratic = np.zeros((n, n))
    
    # Redundancy matrix
    r_matrix = np.zeros((n, n))
    for i in range(n):
        for j in range(i + 1, n):
            if candidates[i].get("redundancy_group") == candidates[j].get("redundancy_group"):
                r_matrix[i, j] = 1.0
                r_matrix[j, i] = 1.0

    # Expand H(x) = -sum(s_i x_i) + lambda*sum(r_ij x_i x_j) + A*(sum(x_i) - K)^2
    for i in range(n):
        s_i = candidates[i]["score"]
        linear[i] = -s_i + penalty_multiplier * (1 - 2 * target_k)
        quadratic[i, i] = linear[i]

    for i in range(n):
        for j in range(i + 1, n):
            val = redundancy_weight * r_matrix[i, j] + 2 * penalty_multiplier
            quadratic[i, j] = val
            quadratic[j, i] = val

    return linear, quadratic

def run_qiskit_simulation(linear, quadratic, target_k=3):
    try:
        from qiskit_optimization import QuadraticProgram
        from qiskit_optimization.algorithms import MinimumEigenOptimizer
        from qiskit_algorithms import QAOA
        from qiskit_algorithms.optimizers import COBYLA
        from qiskit_aer.primitives import Sampler

        qp = QuadraticProgram("CFTR_Target_QUBO")
        n = len(linear)
        for i in range(n):
            qp.binary_var(f"x_{i}")

        linear_dict = {f"x_{i}": linear[i] for i in range(n)}
        quad_dict = {}
        for i in range(n):
            for j in range(i, n):
                if quadratic[i, j] != 0:
                    quad_dict[(f"x_{i}", f"x_{j}")] = quadratic[i, j]

        qp.minimize(linear=linear_dict, quadratic=quad_dict)

        sampler = Sampler()
        qaoa = QAOA(sampler=sampler, optimizer=COBYLA(maxiter=100), reps=1)
        optimizer = MinimumEigenOptimizer(qaoa)
        result = optimizer.solve(qp)

        return {
            "success": True,
            "engine": "qiskit-aer-sampler",
            "optimal_value": float(result.fval),
            "bitstring": "".join(str(int(result.x[i])) for i in range(n)),
            "variables": result.variable_names,
        }
    except ImportError:
        # Fallback simulation if Qiskit is not locally installed
        n = len(linear)
        best_state = 0
        best_energy = float("inf")
        for x in range(2**n):
            bits = np.array([(x >> (n - 1 - i)) & 1 for i in range(n)])
            energy = np.dot(linear, bits)
            for i in range(n):
                for j in range(i + 1, n):
                    if bits[i] == 1 and bits[j] == 1:
                        energy += quadratic[i, j]
            if energy < best_energy:
                best_energy = energy
                best_state = x

        bitstring = "".join(str((best_state >> (n - 1 - i)) & 1) for i in range(n))
        return {
            "success": True,
            "engine": "exact-classical-fallback",
            "optimal_value": float(best_energy),
            "bitstring": bitstring,
            "warning": "Qiskit Aer not installed; executed exact fallback.",
        }

if __name__ == "__main__":
    demo_candidates = [
        {"name": "CFTR", "score": 5.68, "redundancy_group": "Channel"},
        {"name": "CXCL8", "score": 6.84, "redundancy_group": "Inflammation"},
        {"name": "MUC5AC", "score": 5.82, "redundancy_group": "Mucin"},
        {"name": "SCNN1A", "score": 3.64, "redundancy_group": "Channel"},
        {"name": "SLC26A4", "score": 5.52, "redundancy_group": "Channel"},
        {"name": "HSPA5", "score": 3.10, "redundancy_group": "Chaperone"},
    ]
    lin, quad = build_qubo_matrix(demo_candidates, target_k=3)
    res = run_qiskit_simulation(lin, quad, target_k=3)
    print(json.dumps(res, indent=2))
