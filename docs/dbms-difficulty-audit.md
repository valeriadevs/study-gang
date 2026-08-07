# DBMS Course Difficulty Audit

Read-only review of `src/data/dbms/` to flag days where the difficulty jumps too suddenly, and to estimate the extra days required to soften each jump.

## Method

Every day was read end-to-end. Each day was assigned a depth rating:

- **1** — plain concept, plain language.
- **2** — code-heavy but no layered theory.
- **3** — layered theory or multiple interacting sub-concepts in one day.
- **4** — abstraction-heavy / dense / multiple new primitives stacked.

A “jump” is a transition where the next day adds ≥2 in depth, or roughly doubles the normal day’s payload of new primitives.

## DBMS Course (10 days)

| # | Day ID | Title | Depth |
|---|---|---|---|
| 1 | `dbms-8-d1` | Environment Setup & DDL | 1 |
| 2 | `dbms-8-d2` | Basic Queries & DQL | 2 |
| 3 | `dbms-8-d3` | Advanced Filtering | 2 |
| 4 | `dbms-8-d4` | Sorting & DML Part 1 | 2 |
| 5 | `dbms-8-d5` | Updates/Deletes + JOINs | 4 |
| 6 | `dbms-8-d6` | Aggregates & Grouping | 3 |
| 7 | `dbms-8-d7` | Relational Theory & NF | 3 |
| 8 | `dbms-8-d8` | Final Speedrun & Mock | 2 |
| 9 | `dbms-8-d9` | Views, Indexes & Performance | 3 |
| 10 | `dbms-8-d10` | Procs, Functions & Triggers | 4 |

## Major jumps

1. **Day 4 → Day 5 (d4 → d5), depth 2 → 4** — `INSERT` and `ORDER BY` end the previous day; the next day adds `UPDATE`, `DELETE`, `DESCRIBE`, all four JOIN types (INNER / LEFT / RIGHT / FULL OUTER), three-table chain JOINs, plus four subquery patterns (WHERE-IN, scalar, SELECT-list, correlated). The “Detective Agency” practice alone has four cases. ~2x normal payload.
   *Split suggestion:*
   - **5a**: UPDATE/DELETE safety, `DESCRIBE`, UPDATE-with-subquery, “Great Pet Transfer” drill.
   - **5b**: All four JOIN types + three-table chains, subquery patterns, `LEFT JOIN WHERE NULL` orphan trick.
   **+1 day.**

2. **Day 9 → Day 10 (d9 → d10), depth 3 → 4** — moves from `VIEW` / `INDEX` / `EXPLAIN` into procedural SQL: `DELIMITER` parser trick, `IF/ELSEIF` inside `BEGIN…END`, `INTO` for OUT parameters, function `DETERMINISTIC` marker, six trigger combinations (BEFORE/AFTER × INSERT/UPDATE/DELETE), `OLD`/`NEW` pseudorows, `SIGNAL SQLSTATE '45000'`. None of this appears in Day 9.
   *Split suggestion:*
   - **10a**: Stored procedures (`DELIMITER`, IN/OUT, variables, IF/ELSE) + functions vs procedures comparison.
   - **10b**: Triggers (BEFORE/AFTER × INSERT/UPDATE/DELETE), `OLD`/`NEW`, `SIGNAL`, infinite-loop warning.
   **+1 day.**

## Subtotal — DBMS: **+2 days → 12 days**

## Tests that need updates

**`src/data/tests/dbms-tests.ts`**

- Test 1 (`dbms-test-1`, line 9): `days: 'Days 1-3'` — unaffected.
- Test 2 (`dbms-test-2`, line 48): `days: 'Days 4-5'` — **split needed**. Replace with `'Days 4-5a'` (DML only) and `'Day 5b'` (JOINs + subqueries), or split into two tests.
- Test 3 (`dbms-test-3`, line 88): `days: 'Days 6-8'` — shift to `'Days 6-9'` once Day 5 becomes 5a/5b.
- Test 4 (`dbms-test-4`, line 127): `days: 'Days 9-10'` — **split needed**. Replace with `'Days 9-10a'` (views/indexes + procedures/functions) and `'Day 10b'` (triggers + `DELIMITER` + `SIGNAL`).
- Test 5 (`dbms-test-5`, line 162): `days: 'All 10 days'` — bump to `'All 12 days'`.

## Priority

If only one fix is feasible, take **Day 4 → Day 5**. It is the most back-loaded day in the track and includes a practice that already has four cases crammed in.
