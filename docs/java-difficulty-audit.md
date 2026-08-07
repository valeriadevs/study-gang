# Java Course Difficulty Audit

A read-only review of `src/data/java/` (Java Mastery) and `src/data/java-adv/` (Advanced Java) to flag days where the difficulty jumps too suddenly, and to estimate the extra days required to fully soften each jump.

## Method

Every day was read end-to-end. Each day was assigned a depth rating:

- **1** — plain concept, plain language.
- **2** — code-heavy but no layered theory.
- **3** — layered theory or multiple sub-concepts in one day.
- **4** — dense, abstraction-heavy, or paradigm-shifting.

A “jump” is any transition where the next day adds a new sub-concept, a new mental model, or a noticeable depth increase without a bridge.

## Java Mastery (java-14, 22 days)

| # | Day ID | Title | Depth |
|---|---|---|---|
| 1 | `java-14-d1` | Environment & Basic Structure | 2 |
| 2 | `java-14-d2` | Data Types & Variables | 1 |
| 3 | `java-14-d3-scan` | Scanner — Input & Interaction | 2 |
| 4 | `java-14-d3` | Decision Making | 2 |
| 5 | `java-14-d4` | Iterative Logic (Loops) | 2 |
| 6 | `java-14-d5` | Methods (basics) | 1 |
| 7 | `java-14-d5-next` | Methods (deep) | 3 |
| 8 | `java-14-d6` | Arrays & Strings | 3 |
| 9 | `java-14-d7` | Classes, Objects, Constructors | 3 |
| 10 | `java-14-d8` | Static Members and Inheritance | 3 |
| 11 | `java-14-d9` | Polymorphism Mastery | 4 |
| 12 | `java-14-d10` | Abstraction and Interfaces | 4 |
| 13 | `java-14-d11` | CE-2 Checkpoint | 4 |
| 14 | `java-14-d12` | Exceptions & Wrapper Classes | 4 |
| 15 | `java-14-d13` | File Handling and Serialization | 3 |
| 16 | `java-14-d14` | Collections & Custom Sorting | 3 |
| 17 | `java-14-d15` | Recursion | 4 |
| 18 | `java-14-d16` | Enums & Wrappers | 3 |
| 19 | `java-14-d17` | Generics | 4 |
| 20 | `java-14-d18` | HashMap & HashSet | 3 |
| 21 | `java-14-d19` | TreeMap & LinkedHashMap | 3 |
| 22 | `java-14-d20` | Lambdas, Streams & Inner Classes | 4 |

### Major jumps

1. **Day 6 → Day 7 (d5 → d5-next), depth 1 → 3** — soft method-syntax day is immediately followed by pass-by-value, signature rules, overloading constraints, and scope.
   *Split:* put Overloading & Signatures on their own day. **+1 day.**
2. **Day 8 → Day 9 (d6 → d7), depth 3 → 3 but biggest conceptual shift** — first OOP day; class/instance/`this`/encapsulation in one go.
   *Split:* “Classes & Objects” then “Constructors & this”. **+1 day.**
3. **Day 10 → Day 11 (d8 → d9), depth 3 → 4** — Static + Inheritance → compile-time vs runtime binding, dynamic dispatch, full overloading/overriding table.
   *Split:* insert a guided inheritance practice day before polymorphism. **+1 day.**
4. **Day 12 → Day 13 (d10 → d11), depth 4 → 4 but 4-topic compression** — Packages, 4 access modifiers, 2D arrays, jagged arrays, O(n³) matrix multiplication, StringBuilder all in one day. File labels it “boss level”.
   *Split:* (a) Packages + Access + StringBuilder, (b) 2D arrays + jagged + matrix multiplication. **+1 day.**
5. **Day 13 → Day 14 (d11 → d12), depth 4 → 4** — Exceptions (hierarchy, checked/unchecked, multi-catch, try-with-resources, custom, throw vs throws, finally-with-return) + Wrappers + autoboxing + Integer cache trap.
   *Split:* Exceptions day, then Wrappers day. **+1 day.**
6. **Day 16 → Day 17 (d14 → d15), depth 3 → 4** — Collections (iterative) into Recursion (stack frame mental model, O(2ⁿ) Fibonacci, stack overflow, tail-recursion-not-optimised).
   *Split:* Linear recursion, then binary recursion & stack effects. **+1 day.**
7. **Day 18 → Day 19 (d16 → d17), depth 3 → 4** — Enums into Generics (type erasure proof, PECS).
   *Split:* Generic methods & bounded types, then generic classes + wildcards + PECS. **+1 day.**
8. **Day 21 → Day 22 (d19 → d20), depth 3 → 4** — TreeMap/LRU straight into Lambdas + 7 functional interfaces + full Stream pipeline + inner-class taxonomy.
   *Split:* Lambdas & functional interfaces, then Streams + inner classes. **+1 day.**

### Subtotal — Java Mastery: **+8 days → 30 days**

## Advanced Java (java-adv, 8 days)

| # | Day ID | Title | Depth |
|---|---|---|---|
| 1 | `java-adv-d1` | Course Administration & Evaluation | 1 |
| 2 | `java-adv-d2` | Mini Project & Project-Based Evaluation | 1 |
| 3 | `java-adv-d3` | RDBMS & MySQL Technical Environment | 2 |
| 4 | `java-adv-d4` | Data Definition & Retrieval via JDBC | 3 |
| 5 | `java-adv-d5` | PreparedStatement & CRUD Operations | 3 |
| 6 | `java-adv-d6` | Transactions, Batch, Pooling | 3 |
| 7 | `java-adv-d7` | Multithreading | 4 |
| 8 | `java-adv-d8` | Synchronization & Thread Safety | 4 |

### Major jumps

1. **Day 3 → Day 4 (d3 → d4), depth 2 → 3** — first JDBC day bundles 5-step pattern, 1-based ResultSet trap, executeQuery vs executeUpdate, DDL-via-JDBC, and SQL injection in one sitting.
   *Split:* (a) Connect + Load Driver + DDL, (b) Statement + ResultSet + executeQuery/Update. **+1 day.**
2. **Day 6 → Day 7 (d6 → d7), depth 3 → 4, complete cross-domain jump** — JDBC transactions end, multithreading begins with no bridge.
   *Split:* insert a capstone/review day, or split threads vs sync across d7/d8. **+1 day.**
3. **Day 7 → Day 8 (d7 → d8), depth 4 → 4, densest day in either track** — race conditions, synchronized method/block, volatile (visibility, not atomicity), wait/notify with producer-consumer rules, ExecutorService.
   *Split:* (a) Race conditions + synchronized + volatile, (b) wait/notify + ExecutorService. **+1 day.**

### Subtotal — Advanced Java: **+3 days → 11 days**

## Top three priority fixes (highest leverage)

1. **Java Mastery day 8 → 9 (first OOP day)** — biggest conceptual leap in the track.
2. **Java Mastery day 12 → 13 (CE-2 checkpoint)** — most compressed day in the course; explicit “boss level” label.
3. **Advanced Java day 7 → 8 (sync + wait/notify + ExecutorService in one day)** — densest single day across both tracks.

If only a handful of fixes are feasible, these three remove the most student pain.

## Grand total

- Java Mastery: **+8 days**
- Advanced Java: **+3 days**
- **Combined: +11 days (Mastery 30, Advanced 11)**
