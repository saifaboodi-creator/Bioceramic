# paper-critic — test run (2026-10-27)

**Paper:** Chhabra N, et al. *Clinical and Radiographic Evaluation of Biodentine and MTA as Indirect Pulp Capping Agents in Primary Molars: An RCT with 18-month Follow-up.* Ann Afr Med 2025;24(4):852–857. PMID 40495427 · [doi:10.4103/aam.aam_280_24](https://doi.org/10.4103/aam.aam_280_24) · full text via PubMed Central (PMC12588424).

---

# Peer Review: Biodentine vs MTA for IPT in primary molars

**Study design (as identified):** Split-mouth trial, 2 arms, per-protocol, descriptive analysis.
**Declared vs. actual design:** Declared an RCT, but the treatment **order was fixed**: MTA was placed first and Biodentine "after 1 week… for the opposite tooth". The paper doesn't describe what, if anything, was randomized.
**Overall recommendation:** Major revision.

## Major concerns

1. **Randomization not shown.** Methods say "Participants were randomly assigned to two groups", but in a split-mouth design every child gets both materials. MTA always went first, Biodentine a week later. There is no sequence generation, no allocation concealment, and no statement of which side or tooth was randomized. *Fix:* report what was randomized (side or order), how, and how it was concealed.
2. **Data that don't reconcile.** In Table 1 the 8-year-old row shows Group A = 11 successes + 1 failure = **12** at 18 months, but only **11** at 12 months. A count cannot rise between visits. In a split-mouth design both arms must also have the same patient count at every visit, yet Group A sums to **51** and Group B to **50** at 18 months, against the stated 50. Groups A and B are never mapped to Biodentine or MTA (the abstract uses "Group I/II"). *(Reading check: Table 1 was extracted as flat text; the same column reading reproduces the header totals exactly at 3, 6 and 12 months (59, 57, 53), so the 18-month mismatch is in the paper, not the parsing.)* *Fix:* correct Table 1, label the groups, and supply a CONSORT flow diagram with numbers.
3. **"No significant difference" with no stated test and no power.** The Data analysis section says only "a descriptive analysis was conducted", yet Results state "Statistical analysis indicated no significant difference". No test is named and there is no sample-size calculation. With 2 vs 3 failures in 50 pairs, the study cannot support "similar success" or "both materials are effective" (absence of evidence ≠ evidence of absence). *Fix:* a paired test (McNemar) with an effect size and 95% CI, an a-priori power or equivalence margin, and toned-down conclusions.
4. **Contradictory blinding statements.** Methods: "evaluators remained blinded to group assignments". Limitations: "blinding of the radiographic assessments was not possible, as the differences in radiopacity… were readily discernible". These can't both be true. Radiographic outcomes are part of the composite success measure.
5. **Loss to follow-up misdescribed.** 18 of 68 children (26%) were not analysed, and 5 never received the second material. The Discussion calls this "a low dropout rate". There is no intention-to-treat or sensitivity analysis, and only 5 events in total.

## Minor concerns

1. No trial registration and no ethics committee name or approval number (CONSORT 23/24); the paper only says it "adhered to the ethical standards".
2. The Discussion says "meticulous attention was given to the complete removal of infected dentin", while Methods describe selective removal that leaves affected dentine. The wording should be made consistent.
3. The Discussion leans on in-vitro properties (microhardness, compressive strength, TGF-β1) to explain clinical results.
4. "First known clinical evaluation of Biodentine as an IPT agent in primary molars" isn't supported by a search strategy.
5. Every tooth received a stainless-steel crown. This may hide differences between the materials (the authors note it); it should be framed as a limit on generalisability.

## Risk of bias (Cochrane RoB 2, primary outcome: clinical/radiographic success at 18 months)

| Domain | Judgement | Reason |
|---|---|---|
| D1 Randomization process | **High** | Fixed order (MTA first); no sequence generation or concealment reported |
| D2 Deviations from intended interventions | Some concerns | Operator unblinded (unavoidable); per-protocol only; 5 children never received the 2nd intervention |
| D3 Missing outcome data | Some concerns | 26% of children lost, with only 5 events; no sensitivity analysis |
| D4 Measurement of the outcome | Some concerns | Contradictory blinding statements; radiographic assessor could identify the material |
| D5 Selection of the reported result | Some concerns | Unregistered; no pre-specified analysis; test not named |
| **Overall** | **High** | One domain High |

## Questions to the authors
1. What exactly was randomized, and how was the sequence generated and concealed?
2. Which group (A/B) is Biodentine? Please correct Table 1 (8-year row; arm totals).
3. Which statistical test produced "no significant difference"?
4. Were radiographic assessors blinded or not?

---

## What the skill caught vs what it needed help with

| Finding | Caught by the skill as written? |
|---|---|
| No power calc → "no difference" overreach | ✅ rct.md 7a, stats file |
| Split-mouth → paired analysis | ✅ rct.md |
| Numbers don't add up (Table 1) | ⚠️ Only "do subgroup n's sum to total". Needed a stronger rule: counts can't rise between visits, and split-mouth arms must match at every visit |
| **Fixed treatment order in split-mouth** | ❌ Not covered |
| **Contradictions between Methods / Results / Limitations** (blinding; "descriptive only" vs "statistically significant"; "low dropout" at 26%) | ❌ No explicit check |
| RoB 2 output | ⚠️ "one-line justification" — no fixed table format |
