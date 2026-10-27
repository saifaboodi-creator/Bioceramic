---
name: dental-evidence-summary
description: Answer a clinical dental question or summarise the evidence on a dental topic from PubMed, with every claim tied to a verified reference (PMID/DOI), the level of evidence stated, and Claude's own interpretation kept separate. Use for "what does the evidence say about", "summarise studies on", "is X better than Y for", "clinical question", "literature summary", "evidence for MTA/Biodentine/...". Not for critiquing one specific paper (use paper-critic) or editing a manuscript (use dental-manuscript-review).
---

# Dental evidence summary / clinical question

Output in **English**. Tone: academic, detailed, for practising dentists.

## Steps

1. **Frame it as PICO**: Population, Intervention, Comparison, Outcome. If the question is vague, ask before searching.
2. **Search PubMed** (`mcp__PubMed__search_articles`). Work down the evidence pyramid:
   systematic reviews/meta-analyses → RCTs → observational → in-vitro (only if nothing clinical exists).
3. **Read before citing**: get metadata or the abstract (`get_article_metadata`) for every paper you cite. Never cite from memory.
4. **Extract per study**: design, n, follow-up, outcome numbers (with CIs if given), and main limitation.
5. **Rate the overall certainty** in plain words (high / moderate / low / very low), GRADE-style, and say why.
6. **Write** using the template. Keep your interpretation in a separate, labelled section.

## Rules

- Every factual sentence ends with a reference: (Author Year, PMID xxxxx).
- Original sources only. If a number comes from a review that cites another study, say "as reported by".
- Report numbers as given; do not round or re-calculate without saying so.
- Never invent a PMID, DOI, author or number. If you can't verify it, leave it out.
- Flag conflicts of interest and industry funding when the abstract or metadata mentions them.
- **Overlapping reviews are not independent.** Several meta-analyses on one question usually pool the same RCTs. Say "consistent across N reviews drawing on largely the same trials", not "confirmed by N reviews".
- **Separate clinical outcomes from surrogate ones.** Clinical/radiographic success, pain and survival are clinical outcomes. Dentine-bridge histology (often in sound teeth extracted for orthodontics), setting time and bond strength are surrogates. Never let a surrogate answer a clinical question.
- **State what you read.** If only abstracts were read, write "Based on abstracts; full texts not reviewed" under the bottom line.
- Give each reference its DOI link as well as the PMID.

## Template

```
## Question (PICO)
## Bottom line (2–3 sentences)
## Evidence table
| Study | Design | n / follow-up | Result | Key limitation |
## Certainty of evidence: <level> — because ...
## Interpretation [my reading, not from the papers]
## Clinical takeaway
## References (Vancouver, with PMID)
```

## Good example 1

(From a real test run: Biodentine vs MTA for direct pulp capping. All figures checked against the PubMed abstracts.)

> Failure rates with Biodentine were not significantly different from MTA at 12 months (OR 1.21, 95% CI 0.74–1.96) or 24 months (OR 1.47, 95% CI 0.81–2.68) (Komora 2024, PMID 39117767, [doi](https://doi.org/10.1038/s41598-024-69367-7)).

**Why it's good:** a single claim, effect sizes with CIs, and a PMID and DOI you can check.

## Good example 2

> MTA produced complete hard-tissue bridges more often than Biodentine (Silva 2025, PMID 39988950), but this is a histological surrogate measured mostly in sound premolars and third molars extracted for orthodontics, with low certainty. It does not show better clinical success.
> **Interpretation [my reading]:** for a carious exposure in practice, the clinical-success data (no difference) matter more than bridge histology.

**Why it's good:** the surrogate outcome is labelled as one, its limits are stated, and the opinion is kept apart.

## Bad example

> Studies show Biodentine is superior to MTA because it sets faster and has better outcomes [1].

**Why it's bad:** "studies show" with one vague reference; it mixes a lab property (setting time) with a clinical outcome; there's no effect size or certainty; and the reference [1] isn't verifiable.
