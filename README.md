# Study Gang

**Complete semester 3 syllabus, inside a single app.** No external links. No context-switching. Just you and the content — plus a surprisingly charming study buddy.

![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![React](https://img.shields.io/badge/React-18-61dafb) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![Vite](https://img.shields.io/badge/Vite-5.4-646cff) ![Zustand](https://img.shields.io/badge/Zustand-4.5-orange)

---

## What It Does

Study Gang is a **self-contained university study hub** built for a B.E. (AIML) Semester 3 student — but designed well enough to show anyone how learning tools *should* feel.

Every course ships as a fully authored day-by-day plan. Each day includes:

- 💡 **Concept explanations** — written to teach, not to dump facts
- ❓ **Doubt Clinics** — the #1 question students actually ask about each topic, pre-answered
- 🎯 **Exam Alerts** — exactly what examiners test, including trick questions and marks weightage
- 🔗 **Connect the Dots** — how today's topic ties to past and future days
- 📝 **Interactive Quizzes** — tap-to-reveal with explanations
- 🃏 **Flashcards** — browsable grids for spaced review
- ✏️ **Practice Editors** — live in-browser code editing (Java, SQL, Python) with syntax highlighting
- 📋 **Task Checklists** — trackable, persist across sessions
- 📊 **Progress Tracking** — per-course stats: tasks done, days completed, minutes studied

...and on top of all that:

- 🏆 **XP & Leveling System** — every action earns XP. Levels unlock progressively.
- 🎖️ **Achievement Badges** — 15+ unlockable achievements (First Step, Day Slayer, Streak Starter, Night Owl…)
- 🎉 **Celebration Layer** — confetti bursts, toast notifications, particle effects. Because small wins deserve pixels.
- 🐾 **Study Buddy** — a floating companion on the home screen that changes personality based on your completion percentage
- 🥚 **Easter Egg** — type "gang" anywhere on home
- ♿ **Reduced Motion** — full `prefers-reduced-motion` support. Every animation respects it.
- 🎨 **Design Token System** — single-source-of-truth for colors, spacing, radii, motion durations, and z-index layers

---

## Courses Included

| Course | Days | Topics Covered |
|--------|------|----------------|
| ☕ **Java Mastery** | 14 | JDK/JVM, primitives, control flow, loops, methods, arrays, strings, full OOP (classes → interfaces), packages, 2D arrays, exceptions, file I/O, serialization, collections, Comparable/Comparator |
| 🗄 **DBMS Speedrun** | 8 | MySQL/XAMPP setup, DDL/DML/DQL, filtering (AND/OR/LIKE/IN), sorting, INSERT/UPDATE/DELETE, aggregates/GROUP BY/HAVING, ACID, normalisation (1NF/2NF/3NF), primary/foreign keys, ST-1 mock exam |
| 📊 **SDE Speedrun** | 8 | NumPy arrays + statistics, Pandas (groupby/pivot/merge), hypothesis testing/CLT/p-values, 5 Vs of Big Data, Hadoop/MapReduce, Apache Spark, ETL pipelines, star schema data warehousing, final capstone project |
| 🚀 **Advanced Java** | 6 | Evaluation rubrics + academic calendar, project planning, MySQL/JDBC setup, Statement + ResultSet, PreparedStatement + CRUD, SQL injection prevention, transactions (commit/rollback), batch processing, connection pooling |

**36 days of self-contained study material.** Every concept explained. Every doubt anticipated. Every exam trick exposed.

---

## Architecture

```
src/
├── components/        # 21 React components
│   ├── AchievementShelf   # Badge grid with unlock animations
│   ├── CelebrationLayer   # Confetti + toast notification system
│   ├── ContentRenderer    # Block-type router (paragraph, code, quiz, flashcard...)
│   ├── HomeView           # Dashboard: buddy, streak, XP, course cards
│   ├── PracticeEditor     # In-browser code editor with syntax highlighting
│   └── ...
├── data/              # Course content (1 folder per course, phases split)
│   ├── java/phases/phase1-5.ts     # 8,500 lines of authored content
│   ├── dbms/phases/phase1-3.ts
│   ├── sde/phases/phase1-2.ts
│   └── java-adv/days.ts
├── store/useStore.ts  # Zustand state: progress, achievements, celebrations
├── utils/
│   ├── progress.ts    # XP calculation, streak detection, achievement conditions
│   ├── confetti.ts    # Typed wrapper around canvas-confetti (dynamic import)
│   └── syntax.ts      # Regex-based syntax highlighter (Java, SQL, Python, Bash)
├── styles/tokens.ts   # Design tokens: spacing, radii, durations, shadows, z-index
└── types/index.ts     # Complete type definitions
```

**Key technical decisions:**

- **Content as TypeScript** — course data is authored in TS files, not markdown or CMS. Type-safe, tree-shakeable, zero runtime parsing.
- **Block-type rendering** — 11 content block types (`paragraph`, `code`, `quiz`, `flashcard`, `callout`…) rendered by a single `ContentRenderer` component. Adding a new block type = 1 new case + 1 new component.
- **Zustand + persist** — all progress, achievements, and interaction stats survive browser refreshes via `localStorage`. Migration logic handles version upgrades gracefully.
- **Dynamic confetti import** — `canvas-confetti` is loaded only when needed. Respects `prefers-reduced-motion` before loading.
- **reicon-react** — curated icon registry with semantic aliases. Swap the icon library by changing one file.

---

## Running Locally

```bash
# Clone
git clone https://github.com/valeriadevs/study-gang.git
cd study-gang

# Install
npm install

# Dev server
npm run dev        # opens at http://localhost:5173

# Build
npm run build      # production build in dist/

# Type-check
npm run lint       # tsc -b --noEmit
```

No backend. No database. No environment variables. Just `npm install && npm run dev`.

---

## Why This Exists

Because the best way to understand something is to build a tool that teaches it. This app was built alongside the semester — every concept in the Java, DBMS, and SDE courses is something the author learned, struggled with, and then turned into a polished explanation.

The design choices (XP gamification, celebrations, study buddy) come from a simple belief: **learning tools should feel like products you actually want to use**, not like textbooks with a search bar.

---

## Design System

A complete [design system file](study-gang-design-system.html) lives in the repo root. It defines:

- Color palette (OKLCH teal depth)
- Typography (Instrument Serif display, Spectral sub, Inter body, JetBrains Mono code)
- Type scale (56px display → 10px chip)
- Component library (buttons, chips, callouts, code blocks, tasks, day list)
- Motion vocabulary (120ms hover, 240ms entrance, 2-3s loops)
- Binding rules (one accent ≤ twice per screen, warn only for destructive, etc.)

Open `study-gang-design-system.html` in a browser to see the full system rendered.

---

## Tech Stack

- **React 18** — UI framework
- **TypeScript 5.6** — type safety
- **Tailwind CSS 3.4** — utility-first styling
- **Zustand 4.5** — state management with localStorage persistence
- **Vite 5.4** — build tool
- **reicon-react** — icon library with curated registry
- **canvas-confetti** — celebration effects (dynamically imported)
- **Lucide React** — fallback icons

---

## License

MIT — use it, fork it, build on it. If this helps you ace your exams, that's the best kind of attribution.
