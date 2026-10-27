# paper-critic: re-run (2026-10-27)

**Paper:** Chhabra N, et al. *Clinical and Radiographic Evaluation of Biodentine and MTA as Indirect Pulp Capping Agents in Primary Molars: An RCT with 18-month Follow-up.* Ann Afr Med 2025;24(4):852–857. PMID 40495427 · [doi:10.4103/aam.aam_280_24](https://doi.org/10.4103/aam.aam_280_24) · full text from PubMed Central (PMC12588424).

**Conditions of this run:**
- The installed `paper-critic` skill is **still the original version**. None of the approved changes in `docs/paper-critic-proposed.diff` are in it: the contradiction sweep, the RoB 2 table format, the fixed-order rule in rct.md, and the table-reconciliation rule in stats-and-dental.md.
- **This is not a blind run.** `docs/paper-critic-test.md` was read before the review was written.

---

# Peer Review: Biodentine vs MTA for IPT in primary molars

**Study design (as identified):** Within-patient (split-mouth-type) comparison of two materials. Per-protocol, analysis described only as descriptive, 18-month follow-up.
**Declared vs. actual design:** The paper calls itself a "randomized, controlled, split-mouth trial", but it is not shown to be randomized:
- The order of treatment was fixed. MTA was always placed first, and Biodentine went on "the opposite tooth" one week later.
- The abstract describes a parallel design instead ("divided into two groups: Group I received Biodentine and Group II received MTA").
**Overall recommendation:** Major revision. A reject would be defensible if the authors cannot document the randomization.

## Summary of the study
- Sixty-eight children aged 4–9, each with deep occlusal caries in molars in two quadrants, received indirect pulp treatment.
- Each child had selective caries removal, with MTA on one molar and Biodentine on another, followed by stainless-steel crowns.
- Fifty children (100 molars) completed the 18-month recall.
- Success: Biodentine 96% (48/50), MTA 94% (47/50). The authors report "no statistically significant difference" and conclude that both materials are effective.

## Major concerns

1. **Randomization is asserted, not shown, and the order of treatment was fixed.**
   - Methods say "Participants were randomly assigned to two groups", but every child received both materials.
   - MTA was always applied first and Biodentine a week later, so the order was not randomized.
   - The paper never says whether the tooth or side was randomized. There is no sequence generation and no allocation concealment (CONSORT 8a, 8b and 9).
   - The phrase "the procedure was implemented by an independent assistant" doesn't say *which* procedure.
   - *Why it matters:* the inclusion criterion is "any two quadrants", so the paired teeth can be maxillary vs mandibular or first vs second molars. The authors themselves say maxillary first molars fail more often. Without random allocation of tooth to material, tooth type confounds the comparison. In this paper:
     - Biodentine failed in 1 maxillary first molar and 1 mandibular second molar.
     - MTA failed in 2 maxillary first molars and 1 mandibular second molar.
   - *Fix:* state exactly what was randomized, how, and how it was concealed. Report the distribution of tooth types per material.

2. **Table 1 does not reconcile with itself or with the text.** We recomputed every cell.
   - The column totals at 3, 6 and 12 months match the headers (59, 57, 53) for both groups. So the table was read correctly, and the problems are in the paper.
   - At 18 months, Group A = 49 S + 2 F = **51** and Group B = 47 S + 3 F = **50**. The stated n is 50, and in a within-patient design both arms must have the same n.
   - In the 8-year row, Group A totals 12 → 12 → **11 → 12**. A count cannot rise between visits.
   - Groups A and B are never mapped to materials. From the failure counts, A = Biodentine (2 failures), but then A has **49** successes, not the 48 given in the text.
   - The 1-week gap and the 5 children who "did not return for their second appointment" (68 → 63) mean the per-age denominators need a CONSORT flow diagram with numbers. Figure 1 is referenced but has no numbers in the text.
   - *Fix:* correct Table 1, label the groups by material, and provide a numeric flow diagram.

3. **"No significant difference" with no test, no power calculation, and an overreaching conclusion.**
   - The Data analysis section says "a descriptive analysis was conducted". Yet the Results and Abstract say "No statistically significant difference". No test is named and no p-value is given.
   - There is no a-priori sample size (CONSORT 7a).
   - There are only 5 events in 50 pairs. An illustrative paired risk difference of −2 percentage points has a 95% CI of roughly **−11 to +7 points** (this assumes the failures fell in different children, which is not reported). That is compatible with a clinically relevant difference in either direction.
   - "Similar success" and "both materials are effective" therefore aren't supported: absence of evidence is not evidence of equivalence.
   - *Fix:* use McNemar (or exact conditional) on the paired outcomes. Report the paired risk difference with a 95% CI, state a non-inferiority or equivalence margin if similarity is claimed, and soften the conclusion.

4. **The paper contradicts itself on blinding.**
   - Methods: "evaluators remained blinded" and "A blinded experimental examiner conducted clinical and radiographic evaluations".
   - Limitations: "blinding of the radiographic assessments was not possible, as the differences in radiopacity … were readily discernible".
   - Radiographic findings are half of the composite outcome. There is a single examiner with no calibration or κ, and the criteria include subjective items (periodontal space widening, mobility).
   - *Fix:* say who assessed the outcomes and whether they were blinded, and report intra-examiner κ.

5. **Attrition is substantial and mislabelled.**
   - 18 of 68 treated children (26%) are missing from the analysis. Five of them never received the second material, which means they received MTA only, because of the fixed order.
   - The Discussion calls this "a low dropout rate".
   - There is no ITT or sensitivity analysis (e.g. best and worst case), even though only 5 events were observed.
   - *Fix:* report attrition by age and reason, and run a sensitivity analysis.

## Minor concerns
1. **Inclusion and exclusion criteria contradict each other.** Inclusion lists "sensitivity to palpation or percussion" as a sign of reversible pulpitis, while exclusion lists "tenderness to percussion". Percussion tenderness usually points to periapical involvement. Clarify the wording.
2. **Wording conflicts with Methods.** The Discussion speaks of "complete removal of infected dentin", but Methods describe selective removal with hard-affected dentin left in place. Caries removal also differed between teeth (Carisolv only in lesions >¾ dentin), and this is not recorded per arm.
3. **MTA handling is under-specified.** MTA was mixed to a "sandy consistency" and a crown was cemented in the same visit. The paper doesn't say whether any intermediate base was placed or whether the MTA was allowed to set.
4. **Ethics and registration are missing.** There is no ethics committee name or approval number and no trial registration (CONSORT 23/24).
5. **Mechanisms are argued from lab data.** The Discussion explains the clinical results with in-vitro and animal properties (microhardness, compressive strength, TGF-β1).
6. **The "first known clinical evaluation" claim has no supporting literature search.**
7. **The stainless-steel crowns limit generalisability.** The authors acknowledge that the crowns may mask differences between the materials. The conclusion should be limited to IPT under an SSC.
8. **The age-group breakdown has no stated purpose**, and the table gives no per-material totals.

## Section-by-section critique
### Title & Abstract
- The title says "Randomized Controlled Trial" without showing randomization.
- The abstract describes a parallel two-group design, which contradicts the split-mouth design in Methods.
- The abstract's conclusion ("both materials are effective") goes beyond a descriptive, unpowered comparison.
- No effect size or CI is given.

### Introduction & rationale
- The gap (few clinical comparisons in primary teeth) is reasonable.
- There is no explicit hypothesis, and no superiority or non-inferiority framing.

### Methods
- Randomization and concealment are absent, and the order was fixed.
- No sample size calculation.
- The blinding statement contradicts the Limitations section.
- No examiner calibration.
- Paired teeth are not matched by type or arch.
- The analysis plan says only "descriptive", and there is no ITT.

### Results
- Table 1 is inconsistent at 18 months (51 vs 50; 49 vs 48) and in the 8-year row.
- Groups are unlabelled.
- A significance claim is made without a test.
- The flow numbers appear only in prose.

### Discussion & Conclusions
- "Low dropout" at 26%.
- "Complete removal of infected dentin" contradicts the selective excavation in Methods.
- A similarity claim is drawn from an underpowered study.
- Explanations lean on in-vitro data.
- The limitations are honest about operator and radiographic unblinding, but that contradicts Methods.

### References & reporting compliance
- CONSORT items 7a, 8–10, 12a, 13 (numeric), 17a and 23/24 are unmet.
- There is a conflict-of-interest statement, but no funding statement is visible in the text.

## Statistical assessment
- **Design:** paired within-patient (2 teeth per child). The unit is the tooth nested in the child, so a paired analysis is needed.
- **Power:** none. With 5 events, the study cannot detect differences of the size that would matter clinically.
- **Tests:** none named. Use McNemar or an exact conditional test, or a GEE or mixed logistic model if tooth type is added as a covariate.
- **Effect size:** report the paired risk difference with a 95% CI. A Kaplan–Meier analysis would make sense, since failures occurred between 12 and 18 months and censoring is present.
- **Multiplicity:** not an issue (single primary outcome), though the age strata should not be tested.
- **Missing data:** 26%, per-protocol only, no sensitivity analysis.

## Risk of bias (Cochrane RoB 2, outcome: clinical/radiographic success at 18 months)

| Domain | Judgement | Reason |
|---|---|---|
| D1 Randomization process | **High** | Fixed order (MTA first, Biodentine 1 week later); no sequence generation or concealment; tooth type not balanced |
| D2 Deviations from intended interventions | Some concerns | Operator unblinded (unavoidable); per-protocol only; 5 children never received the 2nd material |
| D3 Missing outcome data | Some concerns | 26% lost, with only 5 events; no sensitivity analysis |
| D4 Measurement of the outcome | Some concerns → High | Radiographic assessor admittedly able to identify the material; single uncalibrated examiner |
| D5 Selection of the reported result | Some concerns | Unregistered; "descriptive" plan vs reported significance claim |
| **Overall** | **High** | D1 High |

## Questions to the authors
1. What exactly was randomized (tooth, side, order), how was the sequence generated, and how was it concealed?
2. Which group (A/B) is Biodentine? Please reconcile Table 1 at 18 months (51 vs 50; 49 vs 48 successes) and the 8-year row.
3. What test produced "no statistically significant difference"? Please give the p-value and the paired risk difference with a 95% CI.
4. Were the radiographic assessors blinded, as Methods state, or not, as Limitations state?
5. What was the distribution of tooth type (maxillary/mandibular, first/second molar) per material?
6. How do you reconcile percussion sensitivity in the inclusion criteria with percussion tenderness in the exclusion criteria?

---

## Comparison with docs/paper-critic-test.md

| Item | Previous run | This run |
|---|---|---|
| Recommendation | Major revision | Major revision (reject defensible) |
| RoB 2 overall | High (D1 High) | High (D1 High); D4 raised to "Some concerns → High" |
| Fixed treatment order | ✅ | ✅ |
| Table 1: 51 vs 50, 8-year row 11→12 | ✅ | ✅ |
| **Group A's 18-month successes = 49, not 48 (A = Biodentine by failure count)** | ❌ | ✅ new |
| No test / no power / overreach | ✅ | ✅ + illustrative paired CI (≈ −11 to +7 pp) |
| Blinding contradiction | ✅ | ✅ + no examiner calibration |
| Attrition 26% called "low" | ✅ | ✅ + the 5 non-returners received MTA only |
| Abstract describes a parallel design | ⚠️ (labels only) | ✅ explicit |
| **Paired teeth not matched by type; maxillary first molars as confounder** | ❌ | ✅ new |
| **Inclusion vs exclusion contradiction (percussion)** | ❌ | ✅ new |
| **MTA unset under a crown in the same visit** | ❌ | ✅ new (minor) |
| **Survival analysis (KM) suggested** | ❌ | ✅ new |
| "Complete removal" vs selective excavation, in-vitro reasoning, "first known", SSC | ✅ | ✅ |
| Ethics / registration | ✅ | ✅ |

**Caveat:** the installed skill has not changed. The items carried over from the first run are not evidence that the skill improved, because this run was not blind.
