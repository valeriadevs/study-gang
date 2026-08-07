# SDE Course Difficulty Audit

Read-only review of `src/data/sde/` to flag days where the difficulty jumps too suddenly, and to estimate the extra days required to soften each jump.

## Method

Every day was read end-to-end. Each day was assigned a depth rating:

- **1** — plain concept, plain language.
- **2** — code-heavy but no layered theory.
- **3** — layered theory or multiple interacting sub-concepts in one day.
- **4** — abstraction-heavy / dense / multiple new primitives stacked.

A “jump” is a transition where the next day adds ≥2 in depth, or shifts to a fundamentally different mental model.

## SDE Course (10 days)

| # | Day ID | Title | Depth |
|---|---|---|---|
| 1 | `sde-8-d1` | NumPy Fundamentals | 2 |
| 2 | `sde-8-d2` | Pandas Data Wrangling | 2 |
| 3 | `sde-8-d3` | Advanced Pandas | 3 |
| 4 | `sde-8-d4` | Descriptive & Inferential Statistics | 4 |
| 5 | `sde-8-d5` | Big Data Architecture | 3 |
| 6 | `sde-8-d6` | Hadoop & Spark | 3 |
| 7 | `sde-8-d7` | ETL & Data Warehousing | 3 |
| 8 | `sde-8-d8` | Final Synthesis | 2 |
| 9 | `sde-8-d9` | Matplotlib | 2 |
| 10 | `sde-8-d10` | Seaborn & Statistical Visuals | 3 |

## Major jump

1. **Day 3 → Day 4 (d3 → d4), depth 3 → 4 (qualitative pivot)** — Day 3 ends on concrete `groupby` / `merge` code. Day 4 jumps to abstract statistical theory: CLT with a sampling-distribution demo, the four-step hypothesis testing procedure, p-value interpretation (and the “almost significant” misuse), Type I/II errors, alpha/beta/power trade-off. No new tooling is introduced; the cognitive load is the introduction of probabilistic reasoning rather than data wrangling.
   *Split suggestion:*
   - **4a**: Descriptive stats review + all four distributions + CLT (with code demo).
   - **4b**: Hypothesis testing workflow (H0/H1, alpha, p-value, t-test) + Type I/II errors + confidence intervals.
   **+1 day.**

## Subtotal — SDE: **+1 day → 11 days**

## Tests that need updates

**`src/data/tests/sde-tests.ts`**

- Test 1 (`sde-test-1`, line 9): `days: 'Days 1-2'` — unaffected.
- Test 2 (`sde-test-2`, line 49): `days: 'Days 2-3'` — unaffected.
- Test 3 (`sde-test-3`, line 89): `days: 'Day 4'` — **rename needed**. Replace with `'Day 4a'` (distributions + CLT) and `'Day 4b'` (hypothesis testing + errors), or split into two tests.
- Test 4 (`sde-test-4`, line 129): `days: 'Days 5-8'` — shift to `'Days 5-9'` once Day 4 becomes 4a/4b.
- Test 5 (`sde-test-5`, line 165): `days: 'All 10 days'` — bump to `'All 11 days'`.

## Priority

The Day 3 → Day 4 jump is the only major one in this track. Fixing it removes the hardest single cognitive leap and also unblocks Days 5–8 (Big Data, Hadoop, ETL) by giving the statistics day a calmer landing.
