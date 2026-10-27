# CLAUDE.md

## Skills library (`.claude/skills/`)

| Skill | Use for |
|---|---|
| `tafsir-shamela` | تفسير آية من عدة تفاسير في الشاملة |
| `muqarana-fiqhiyya` | مقارنة فقهية: الأقوال بأدلتها ← المناقشة ← الترجيح |
| `tadabbur-muwaththaq` | فوائد وهدايات الآية منقولة عن العلماء + استنباطات مفصولة |
| `tahqiq-iqtibas` | التحقق من اقتباس أو نسبة قول |
| `takhrij-hadith` | تخريج حديث ونقل أحكام المحدثين (الدرر السنية + الشاملة) |
| `dental-evidence-summary` | Clinical dental question / evidence summary from PubMed |
| `dental-explainer` | PDF → animated caption-only explainer in `explainers/<slug>/` |

Shared citation rules for the five Islamic skills: `.claude/skills/_shared/qawaid-al-naql.md`.
Paper critique (CONSORT / PRISMA / RoB 2) uses the account skill `paper-critic`.

## Learning loop

Whenever the user corrects your work:
1. Name the skill that should have prevented it (or say none does).
2. Propose the exact change to that skill as a diff. Fix the skill's rules, not just this one output.
3. Apply it **only after the user says OK**, then add an entry to that skill's `CHANGELOG.md`.

## Guardrails

- No skill sends, publishes, deletes or pays for anything without explicit approval.
- No passwords or API keys in any skill.
- If something about the user's work is unknown, ask. Never invent it.
