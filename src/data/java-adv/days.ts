import type { Day } from '../../types';

export const javaAdvDays: Day[] = [
  // ======== DAY 1: Course Administration & Evaluation ========
  {
    id: 'java-adv-d1', number: 1,
    title: 'Course Administration & Evaluation Structure', duration: 90,
    topics: ['Academic Schedule', 'CE-1', 'CE-2', 'CE-3', 'Internal Rubrics'],
    blocks: [
      { type: 'callout', id: 'ja1-intro', calloutType: 'info', title: 'The Big Picture — How This Course Is Graded', content: 'Before writing a single line of JDBC code, you need to understand **exactly how you will be evaluated**. Advanced Java (24CAI0202) is graded differently from the core Java course — three Continuous Evaluations (CEs) spread across the semester, plus a project. Today: the exam blueprint.' },
      { type: 'heading', id: 'ja1-timeline', level: 2, content: 'Academic Timeline — September to December 2026' },
      { type: 'table', id: 'ja1-timeline-table', headers: ['Event', 'Date', 'Duration', 'Marks', 'Topics Covered'], rows: [
        ['Course Start', '23 Sep 2026', '—', '—', 'JDBC, Multithreading, GUI basics'],
        ['CE-1', '10 Oct 2026', '60 min', '20', 'SQL foundations, JDBC intro, DriverManager'],
        ['CE-2', '30 Oct 2026', '60 min', '25', 'PreparedStatement, ResultSet, CRUD via JDBC'],
        ['CE-3', '27 Nov 2026', '60 min', '25', 'Transactions, connection pooling, multithreading'],
        ['Course End', '9 Dec 2026', '—', '—', 'Project submission + viva'],
        ['End Term', '~10 Dec 2026', '2-3 hrs', '—', 'Entire syllabus + project demo'],
      ] },
      { type: 'heading', id: 'ja1-rubrics', level: 2, content: 'Evaluation Rubrics — Know Where Your Marks Come From' },
      { type: 'table', id: 'ja1-rubric-table', headers: ['Assessment', 'MCQ (1 mark)', 'Coding (5 marks)', 'Coding (10 marks)', 'Total'], rows: [
        ['CE-1', '5 questions = 5 marks', '3 questions = 15 marks', '0', '20 marks'],
        ['CE-2', '5 questions = 5 marks', '2 questions = 10 marks', '1 question = 10 marks', '25 marks'],
        ['CE-3', '5 questions = 5 marks', '2 questions = 10 marks', '1 question = 10 marks', '25 marks'],
        ['Project', '—', '—', '—', 'Separate evaluation'],
      ] },
      { type: 'callout', id: 'ja1-ce1-breakdown', calloutType: 'exam', title: 'CE-1 Focus (10 Oct — 17 days from course start)', content: 'CE-1 is the FIRST assessment and covers only the SQL + JDBC basics. **5 MCQs (5 marks) + 3 coding tasks (15 marks).**\n\nWhat to expect:\n\n1. MCQ: SQL syntax, JDBC driver loading, `DriverManager.getConnection()` parameters.\n2. Coding Task 1 (5 marks): write a SQL CREATE TABLE or SELECT with WHERE.\n3. Coding Task 2 (5 marks): write a JDBC connection snippet (load driver, get connection).\n4. Coding Task 3 (5 marks): execute a simple query and print the results.\n\n**Strategy**: the 5-mark coding questions are bite-sized — focus on getting the JDBC boilerplate code into muscle memory.' },
      { type: 'heading', id: 'ja1-75', level: 2, content: 'The 75% Attendance Rule — Non-Negotiable' },
      { type: 'paragraph', id: 'ja1-attendance', content: 'University guidelines require a **minimum of 75% attendance** to be eligible for the End Semester Examination. This applies to ALL subjects, not just Java. At 3 classes per week over ~11 weeks, you can miss at most ~8 classes. Falling below 75% means you cannot sit for the End Term exam — regardless of your internal marks.' },
      { type: 'callout', id: 'ja1-d1', calloutType: 'doubt', title: 'How is the project evaluated? Is it part of CE marks?', content: 'The project is evaluated **separately** from the CEs. It typically includes:\n\n1. **Project proposal** (submitted early): problem statement + team details + tech stack.\n2. **Mid-review**: progress check. Working prototype expected.\n3. **Final demo + viva**: working application + individual questioning.\n4. **Project report**: document with diagrams, code snippets, screenshots.\n\nThe project often integrates JDBC + GUI (Swing/JavaFX) + multithreading. Start brainstorming your project idea NOW — the best projects are the ones with time to iterate.' },
      { type: 'callout', id: 'ja1-d2', calloutType: 'doubt', title: 'What if I miss a CE due to medical reasons?', content: 'Most universities have a **re-CE** provision for valid medical reasons with documentation. But re-CEs are typically harder and may have different question patterns. Do not rely on this — aim to attend every CE on the first attempt. If you must miss one, inform your course coordinator BEFORE the exam, not after.' },
      { type: 'callout', id: 'ja1-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'The SQL you test in CE-1 comes directly from your DBMS course. If you completed the DBMS 8-day speedrun, you already know 80% of CE-1\'s SQL content. The remaining 20% is JDBC — connecting Java to that SQL knowledge. This course is the BRIDGE between pure Java (14-day) and pure SQL (8-day).' },
      { type: 'table', id: 'ja1-qref', headers: ['Assessment', 'When', 'MCQ', 'Coding 5M', 'Coding 10M', 'Key Topics'], rows: [
        ['CE-1', '10 Oct', '5×1=5', '3×5=15', '0', 'SQL basics + JDBC connection'],
        ['CE-2', '30 Oct', '5×1=5', '2×5=10', '1×10=10', 'PreparedStatement, CRUD'],
        ['CE-3', '27 Nov', '5×1=5', '2×5=10', '1×10=10', 'Transactions, multithreading'],
      ] },
      { type: 'quiz', id: 'ja1-quiz', title: 'Day 1 Quiz', questions: [
        { id: 'ja1-q1', question: 'How many coding tasks does CE-1 have and what are their marks?', options: ['2 tasks: 10 marks each', '3 tasks: 5 marks each', '1 task: 20 marks', '4 tasks: 5 marks each'], correctIndex: 1, explanation: 'CE-1 has 3 coding tasks worth 5 marks each (total 15) + 5 MCQs worth 1 mark each (total 5) = 20 marks.' },
        { id: 'ja1-q2', question: 'What is the minimum attendance required to be eligible for End Semester exams?', options: ['60%', '75%', '85%', '90%'], correctIndex: 1, explanation: 'University mandates 75% minimum attendance. Below this, you are debarred from the End Term exam regardless of internal marks.' },
        { id: 'ja1-q3', question: 'When does CE-2 take place and how many marks is the 10-mark coding question?', options: ['10 Oct — 2 questions', '30 Oct — 1 question', '27 Nov — 1 question', '9 Dec — 3 questions'], correctIndex: 1, explanation: 'CE-2 is on 30 Oct. It has 1 coding question worth 10 marks, 2 worth 5 marks, and 5 MCQs. Total: 25 marks.' },
      ] },
      { type: 'flashcard', id: 'ja1-cards', title: 'Day 1 Flashcards', cards: [
        { id: 'ja1-f1', front: 'CE-1 date, marks, and structure?', back: '10 Oct 2026. 20 marks: 5 MCQs (5) + 3 coding tasks at 5 marks each (15). Covers SQL basics + JDBC driver/connection.', hint: 'First assessment, 20 marks...' },
        { id: 'ja1-f2', front: 'CE-2 vs CE-3 differences?', back: 'CE-2 (30 Oct): 25 marks, PreparedStatement, ResultSet, CRUD. CE-3 (27 Nov): 25 marks, transactions, connection pooling, multithreading. Both have 1×10-mark coding question that CE-1 lacks.', hint: 'Both 25 marks, different topics...' },
        { id: 'ja1-f3', front: '75% attendance rule — what happens if below?', back: 'DEBARRED from End Semester Exam. Cannot sit for it regardless of internal marks. Track your attendance weekly. At 3 classes/week, you can miss ~8 classes max.', hint: 'Mandatory minimum...' },
      ] },
      { type: 'practice', id: 'ja1-p1', lang: 'text', title: 'Practice: Plan Your CE Strategy', starter: `// COURSE ADMIN PLANNER — fill this out like a study plan.
// This is a planning exercise, not a coding exercise.
// Answer each question in comments or on paper.

// 1. CE-1 is 17 days from course start (10 Oct).
//    Write a 4-week prep plan: what will you revise in each week?
//    Week 1: ?
//    Week 2: ?
//    Week 3: ?
//    Week 4: ?

// 2. CE-1 = 5 MCQs (5 marks) + 3 coding tasks (15 marks).
//    Which is worth more? Where should most of your prep time go?

// 3. You can miss at most ~8 classes (75% rule).
//    Track your current attendance: how many classes have you attended?
//    How many can you still miss safely?

// 4. Project idea: write ONE problem statement for a JDBC + GUI app
//    you would actually build. One sentence only.`, hint: 'The 3 coding tasks are 75% of CE-1 marks — practice JDBC boilerplate until it is muscle memory. Attendance: count attended/total classes; you can miss at most 25% of total.' },
      { type: 'practice', id: 'ja1-p2', lang: 'bash', title: 'Practice: Set Up Your Java Environment', starter: `# Your first command-line warm-up for this course.
# Run each command and note the output.

# 1. Confirm Java is installed (JDK 17 or 21 recommended)
java -version

# 2. Confirm the compiler is available
javac -version

# 3. Check where Java lives
where java        # Windows
# which java      # macOS / Linux

# 4. Create a folder for this course and cd into it
mkdir advanced-java
cd advanced-java

# 5. Write, compile, and run a "hello" program:
#    echo 'public class Hello { public static void main(String[] a) { System.out.println("Ready for Advanced Java"); } }' > Hello.java
#    javac Hello.java
#    java Hello

# TODO: if javac is missing, install a JDK (17 or 21) and retry.`, hint: 'You need BOTH java (runtime) and javac (compiler). If javac is missing, install a JDK — the runtime alone (JRE) is not enough to compile. Expect output: "Ready for Advanced Java".' },
      { type: 'practice', id: 'ja1-p3', lang: 'text', title: 'Practice: Marks Calculator', starter: `// EVALUATION MATH — do the calculations in comments.

// CE-1 = 20 marks: 5 MCQs (1 each) + 3 coding (5 each)
// CE-2 = 25 marks: 5 MCQs (1 each) + 2 coding (5 each) + 1 coding (10)
// CE-3 = 25 marks: 5 MCQs (1 each) + 2 coding (5 each) + 1 coding (10)

// Q1: You score 4/5 MCQs and 2.5/3 coding in CE-1.
//     What is your CE-1 total? (4 + 12.5 = 16.5 → rounded how?)

// Q2: What is the MAXIMUM total from the 3 CEs combined?
//     (20 + 25 + 25 = ?)

// Q3: You get 18/20 in CE-1, 20/25 in CE-2, 22/25 in CE-3.
//     Total? Percentage? (out of 70)

// Q4: The 10-mark coding question is worth what % of CE-2?

// Q5: If you skip ALL MCQs (5 marks) in CE-3, what is the
//     best you can still score? Is that a pass?`, hint: 'Q1: 16.5/20. Q2: 70. Q3: 60/70 = 85.7%. Q4: 10/25 = 40%. Q5: 20/25 = 80% — still passing, but never skip MCQs!' },
      { type: 'practice', id: 'ja1-p4', lang: 'text', title: 'Practice: Attendance Tracker', starter: `// ATTENDANCE PLANNER — answer in comments.

// Rules: 3 classes/week. 75% minimum. ~11 weeks total.

// Q1: Total classes in the semester? (11 weeks × 3)

// Q2: How many classes can you miss and still hit 75%?
//     (total × 0.25 = max misses)

// Q3: It is Week 5 (15 classes done). You have missed 5.
//     What is your current attendance %?
//     (attended = 10, so 10/15 = ?)

// Q4: In the remaining 6 weeks (18 classes), how many can you
//     still miss while staying above 75% overall?
//     (hint: total misses allowed - 5 already missed)

// Q5: Write a plan: which classes are "safe to skip" this week
//     and which are NOT? (labs vs theory, CE review classes...)`, hint: 'Q1: 33 classes. Q2: 8 misses max. Q3: 66.7% — DANGER zone! Q4: only 3 more misses allowed across 18 classes. Q5: never skip CE review or lab demo days.' },
      { type: 'practice', id: 'ja1-p5', lang: 'text', title: 'Practice: CE Strategy Planner', starter: `// STUDY PLAN — write your answers as comments.

// CE-1 (10 Oct) covers: SQL basics + JDBC connection.
// You have ~17 days from course start. Plan 4 weeks:

// Week 1 (Days 1-7):  ?
//   - revise DBMS SQL: CREATE, SELECT, WHERE
//   - practice JDBC boilerplate 3x/day

// Week 2 (Days 8-14): ?
// Week 3 (Days 15-21): ?
// Week 4 (Days 22-28): ? (mock tests, weak areas)

// For EACH week write:
//   1. one concrete goal
//   2. the daily time budget (30 min? 1 hr?)
//   3. how you will TEST yourself (quiz? rewrite from memory?)

// Then: what is your #1 weak area RIGHT NOW, and what is
// the FIRST action you will take on it?`, hint: 'The 3 coding tasks = 75% of CE-1. Daily 15-min JDBC boilerplate rewrite (from memory) is the highest-ROI habit. Test yourself by writing the full connection flow without notes.' },
    ],
    tasks: [
      { id: 'java-adv-d1-t1', text: 'Write down the dates and mark distribution for CE-1, CE-2, and CE-3. Put them in your calendar.', tag: 'lab' },
      { id: 'java-adv-d1-t2', text: 'Calculate how many classes you can miss while staying above 75% attendance. Track your current count.', tag: 'review' },
      { id: 'java-adv-d1-t3', text: 'Brainstorm 2-3 project ideas that combine JDBC + GUI + real-world data. Write a one-line problem statement for each.', tag: 'lab' },
    ],
  },

  // ======== DAY 2: Mini Project & Project-Based Evaluation ========
  {
    id: 'java-adv-d2', number: 2,
    title: 'Mini Project & Project-Based Evaluation', duration: 90,
    topics: ['Project Statement', 'Team Details', 'Project Evaluation Phases', 'Tech Stack Planning'],
    blocks: [
      { type: 'callout', id: 'ja2-intro', calloutType: 'info', title: 'Your Project = Your Portfolio', content: 'The mini project is not just for marks — it is your **first real application** that goes on your resume. A good project (JDBC + MySQL + Java GUI) can be the difference between getting shortlisted and getting ignored in campus placements. Today: how to choose, plan, and execute a project that scores high AND impresses recruiters.' },
      { type: 'heading', id: 'ja2-phases', level: 2, content: 'Project Evaluation — The Three Checkpoints' },
      { type: 'table', id: 'ja2-phases-table', headers: ['Phase', 'When', 'What You Submit', 'What Evaluators Check', 'Marks Weight'], rows: [
        ['Proposal', 'Early Oct', 'Problem statement + team (2-3 members) + tech stack + timeline', 'Feasibility, clarity, relevance to syllabus', 'Low (approval gate)'],
        ['Mid-Review', 'Early Nov', 'Working prototype — at least 2-3 connected modules', 'Database connected? CRUD working? GUI functional?', 'Medium (progress check)'],
        ['Final Demo', 'Early Dec', 'Complete application + report + individual viva', 'Full functionality, code quality, individual understanding', 'High (final verdict)'],
      ] },
      { type: 'heading', id: 'ja2-ideas', level: 2, content: 'Project Ideas — Pick One, Own It' },
      { type: 'paragraph', id: 'ja2-ideas-intro', content: 'The best projects solve **real problems** with **real data**. Here are proven ideas that score well and teach you JDBC thoroughly:' },
      { type: 'list', id: 'ja2-idea-list', listStyle: 'number', items: [
        '**Student Management System** — CRUD for students, courses, enrollments. Generate mark sheets. The classic, but do it WELL with search, filters, and reports.',
        '**Library Management System** — Books, members, borrow/return tracking. Due date alerts. Fine calculation. Good for demonstrating transaction management.',
        '**Hospital Appointment Scheduler** — Doctors, patients, appointments, prescriptions. Slot management with conflict detection. Multithreading for concurrent bookings.',
        '**E-commerce Order Tracker** — Products, customers, orders, inventory. Auto-decrement stock on order. Sales reports with date filters. JDBC transactions for order processing.',
        '**Attendance & Grade Tracker** — Students, subjects, attendance records, marks. Auto-calculate attendance percentage, generate defaulter lists. Aggregate grade reports.',
        '**Expense Splitter (like Splitwise)** — Users, groups, expenses, settlements. Calculate who owes whom. Good for demonstrating complex SQL queries (joins, aggregates).',
      ] },
      { type: 'heading', id: 'ja2-tech', level: 2, content: 'Tech Stack — Your Toolkit' },
      { type: 'table', id: 'ja2-tech-table', headers: ['Layer', 'Technology', 'Why This?', 'Syllabus?'], rows: [
        ['Database', 'MySQL (XAMPP)', 'Free, local, matches university lab. Full SQL support.', '✅'],
        ['Backend (Java)', 'JDBC (java.sql)', 'Core syllabus. DriverManager, Connection, Statement, ResultSet.', '✅'],
        ['GUI', 'Java Swing or JavaFX', 'Swing is simpler and in syllabus. JavaFX is modern but may not be in lab.', '✅ Swing'],
        ['Build Tool', 'Manual (javac) or Maven', 'Manual for small projects. Maven for dependency management (MySQL connector JAR).', '⚠️ Optional'],
        ['Version Control', 'Git + GitHub', 'Not in syllabus but IMPRESSIVE to evaluators. Shows professional workflow.', '❌ (bonus)'],
      ] },
      { type: 'code', id: 'ja2-mysql-jar', lang: 'bash', title: 'Adding MySQL Connector to Your Project', code: `# Step 1: Download MySQL Connector/J (JDBC driver)
# https://dev.mysql.com/downloads/connector/j/
# Get the .jar file (e.g., mysql-connector-j-8.0.33.jar)

# Step 2: Add to classpath when compiling/running
# Windows:
javac -cp ".;mysql-connector-j-8.0.33.jar" *.java
java -cp ".;mysql-connector-j-8.0.33.jar" MainClass

# macOS/Linux:
javac -cp ".:mysql-connector-j-8.0.33.jar" *.java
java -cp ".:mysql-connector-j-8.0.33.jar" MainClass

# Step 3 (IntelliJ IDEA):
# File → Project Structure → Libraries → + → Java → select the JAR` },
      { type: 'callout', id: 'ja2-d1', calloutType: 'doubt', title: 'Can I do the project alone or do I need a team?', content: 'Most universities allow teams of **2-3 students**. You CAN do it alone, but teams have advantages:\n\n- **Division of work**: one person on GUI, another on database, third on business logic.\n- **Viva backup**: if you blank on one question, your teammate might cover.\n- **Learning**: you learn from each other\'s approaches.\n\n⚠️ Warning: choose teammates who will ACTUALLY work. A non-contributing teammate drags everyone down. The viva is INDIVIDUAL — you must understand the ENTIRE codebase, not just your part.' },
      { type: 'callout', id: 'ja2-exam', calloutType: 'exam', title: 'Exam Alert — Project Viva Survival', content: 'The viva is where evaluators separate genuine work from copy-paste:\n\n1. **They WILL ask you to explain any random line of code** — know your entire codebase.\n2. **They WILL ask "Why did you choose X over Y?"** — have reasons for every tech choice.\n3. **They WILL ask you to modify something on the spot** — practice live coding changes.\n4. **Common viva questions**: "How did you handle database connection failures?" "What happens if two users book the same slot?" "Show me your transaction management code."\n\n**Pro tip**: the students who score highest are the ones who can EXPLAIN their code clearly, not the ones with the fanciest GUI.' },
      { type: 'callout', id: 'ja2-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Your project integrates **everything** you have learned so far:\n\n- **Java OOP (Days 7-10)**: classes for entities (Student, Book, Order). Inheritance for user roles.\n- **SQL (DBMS 8-day)**: CREATE, INSERT, SELECT with JOINs. The database is half your project.\n- **JDBC (Days 3-6 of this course)**: the bridge between Java and MySQL.\n- **Exception handling (Java Day 12)**: every database call needs try-catch.\n- **Collections (Java Day 14)**: store query results in ArrayLists for GUI display.' },
      { type: 'table', id: 'ja2-qref', headers: ['Checkpoint', 'What To Have Ready', 'Common Mistakes'], rows: [
        ['Proposal', 'Clear problem statement, realistic timeline', 'Too ambitious, too vague, no database component'],
        ['Mid-Review', 'Working prototype, DB connected, 2-3 CRUD operations', 'No database connected yet, only GUI screenshots'],
        ['Final Demo', 'Complete flow, error handling, reports', 'Hardcoded data, no validation, crashes on bad input'],
        ['Report', 'ER diagram, class diagram, screenshots, code snippets', 'Copy-pasted theory, no original content'],
        ['Viva', 'Can explain every line, reasons for choices', 'Cannot explain teammate\'s code, memorized answers'],
      ] },
      { type: 'quiz', id: 'ja2-quiz', title: 'Day 2 Quiz', questions: [
        { id: 'ja2-q1', question: 'What is the first project checkpoint and what do you submit?', options: ['Final demo — complete application', 'Mid-review — working prototype', 'Proposal — problem statement + team + tech stack', 'Report — documentation'], correctIndex: 2, explanation: 'The proposal comes first (early Oct). You submit the problem statement, team members (2-3), tech stack, and a rough timeline.' },
        { id: 'ja2-q2', question: 'Why should you NOT hardcode data in your project?', options: ['It makes the project slower', 'It defeats the purpose of JDBC — project needs live database interaction', 'Hardcoded data cannot be displayed in GUI', 'It violates Java naming conventions'], correctIndex: 1, explanation: 'The project must demonstrate JDBC connectivity. Hardcoding data shows no database integration — evaluators will deduct heavily or reject the project entirely.' },
        { id: 'ja2-q3', question: 'What is the MySQL Connector JAR and why do you need it?', options: ['A GUI library for MySQL', 'The JDBC driver that lets Java talk to MySQL', 'A MySQL backup tool', 'A Java compiler plugin'], correctIndex: 1, explanation: 'The MySQL Connector/J is the JDBC driver — a .jar file that implements the JDBC API for MySQL. Without it, Java cannot connect to a MySQL database.' },
      ] },
      { type: 'flashcard', id: 'ja2-cards', title: 'Day 2 Flashcards', cards: [
        { id: 'ja2-f1', front: 'Three project evaluation phases?', back: '1. Proposal (early Oct) — idea + team. 2. Mid-Review (early Nov) — working prototype. 3. Final Demo + Viva (early Dec) — complete app + individual questioning.', hint: 'Propose, demonstrate, defend...' },
        { id: 'ja2-f2', front: 'Tech stack for the project?', back: 'MySQL (database) + JDBC (Java-DB bridge) + Swing/JavaFX (GUI). Use XAMPP for local MySQL. mysql-connector-j.jar for JDBC driver. Git/GitHub for version control (bonus points).', hint: 'DB + bridge + GUI...' },
        { id: 'ja2-f3', front: 'Viva survival tips?', back: 'Know EVERY line of code (including teammate\'s). Have reasons for tech choices. Practice live code modifications. Prepare answers for: connection failures, concurrent access, transaction management, error handling.', hint: 'Explain, don\'t memorize...' },
      ] },
      { type: 'practice', id: 'ja2-p1', lang: 'java', title: 'Practice: Project Class Diagram', starter: `// Sketch the main classes for a Library Management System
// Think about: what are the ENTITIES? Book, Member, BorrowRecord...

class Book {
    // TODO: fields (id, title, author, isbn, available)
    // TODO: constructor, getters
}

class Member {
    // TODO: fields (id, name, email, phone)
    // TODO: constructor, getters
}

class LibraryDB {
    // TODO: methods: addBook(), issueBook(), returnBook(), searchBooks()
    // HINT: These will use JDBC — Connection, Statement, ResultSet
}

public class LibraryApp {
    public static void main(String[] args) {
        // TODO: Create GUI or console menu
        // Connect to DB → Show menu → Perform operations
    }
}`, hint: 'Book needs: id, title, author, isbn, available (boolean). LibraryDB methods will connect to MySQL via JDBC. Each method = one SQL query (INSERT, SELECT, UPDATE).' },
      { type: 'practice', id: 'ja2-p2', lang: 'text', title: 'Practice: Project Proposal Draft', starter: `// PROJECT PROPOSAL WORKSHEET — fill this out for YOUR project.
// This is a planning exercise: write your answers as comments.

// 1. PROBLEM STATEMENT (one sentence, specific):
//    e.g. "A library management system that tracks books, members,
//    and borrow/return records with due-date alerts."

// 2. TEAM (2-3 members): names + who owns which module
//    (GUI / Database / Business logic)

// 3. TECH STACK — fill the blanks:
//    Database: MySQL via _____ (XAMPP)
//    Java-DB bridge: _____ (java.sql)
//    GUI: _____ (Swing or JavaFX)
//    Driver JAR: mysql-connector-_____.jar

// 4. TIMELINE — 3 checkpoints with dates:
//    Proposal: ___   Mid-Review: ___   Final Demo: ___

// 5. RISKS — what could go wrong, and your backup plan?`, hint: 'Tech stack blanks: XAMPP, JDBC, Swing/JavaFX, mysql-connector-j. Checkpoints: early Oct, early Nov, early Dec. Risk example: teammate drops out → have a plan to cover their module.' },
      { type: 'practice', id: 'ja2-p3', lang: 'sql', title: 'Practice: Design Your Project Schema', starter: `-- Design the DATABASE schema for your project idea.
-- Example (Library Management System):

CREATE TABLE books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(80),
    isbn VARCHAR(20) UNIQUE,
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE members (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(100) UNIQUE
);

-- TODO 1: create the borrowings table with:
--   borrow_id PK, book_id FK -> books, member_id FK -> members,
--   borrow_date DATE, return_date DATE (nullable!)
-- TODO 2: think about the business rule:
--   can a book be borrowed twice at the same time?
--   what constraint (or app logic) prevents that?
-- TODO 3: add an overdue_days column? or compute it?`, hint: 'borrowings: borrow_id INT PRIMARY KEY AUTO_INCREMENT, book_id INT, member_id INT, borrow_date DATE, return_date DATE, FOREIGN KEY (book_id) REFERENCES books(book_id), FOREIGN KEY (member_id) REFERENCES members(member_id). To prevent double-borrowing: check available flag in app logic, or add a UNIQUE partial index on (book_id) WHERE return_date IS NULL (MySQL 8+).' },
      { type: 'practice', id: 'ja2-p4', lang: 'text', title: 'Practice: Project Risk Plan', starter: `// RISK PLANNING — write your answers in comments.

// Every project hits problems. Plan for them now.

// Q1: Your teammate stops responding 3 weeks before the demo.
//     What do you do? (3 concrete steps)

// Q2: MySQL won't start on demo day (port conflict / crash).
//     What is your backup? (hint: exports, screenshots, reinstall)

// Q3: You realize the GUI needs 3x more code than planned.
//     What scope do you CUT first? (features, not the DB layer!)

// Q4: The viva asks about a line of code your teammate wrote.
//     You do not understand it. What NOW?
//     (hint: you should have read EVERY line before the demo)

// Q5: Write ONE sentence each for:
//     - your fallback if the database is lost
//     - your fallback if the GUI framework breaks
//     - your "minimum viable demo" (what MUST work)`, hint: 'Q1: split work, take over their module, inform coordinator. Q2: phpMyAdmin export + screenshots + XAMPP reinstall. Q3: cut cosmetic features, keep CRUD + 1 report. Q4: you should know all code — prepare by code-walkthroughs with teammates. MVP: login + 1 CRUD flow.' },
      { type: 'practice', id: 'ja2-p5', lang: 'text', title: 'Practice: Viva Mock Interview', starter: `// VIVA PREP — answer each question OUT LOUD, then write it.

// Q1: "Explain your project in 30 seconds."
//     (problem → tech stack → your role → one cool feature)

// Q2: "Why did you choose MySQL over a file-based store?"
//     (transactions, concurrency, SQL queries, the syllabus)

// Q3: "Show me how you handle a database connection failure."
//     (try-catch, user-friendly message, retry, log)

// Q4: "What happens if two users borrow the same book at once?"
//     (race condition → synchronized / transaction / check available)

// Q5: "Why is your data normalized? Or why not?"
//     (3NF removes redundancy; a little denormalization is OK for reports)

// Q6: "What would you add with more time?"
//     (one realistic feature + why it matters)

// Tip: record yourself answering Q1. Listen back. Repeat until
// it is under 30 seconds and smooth.`, hint: 'The 30-second pitch is the most reused answer — perfect it. Q4: your transaction + available-flag logic IS the answer. Practicing out loud beats reading notes.' },
    ],
    tasks: [
      { id: 'java-adv-d2-t1', text: 'Choose a project idea from the list (or create your own). Write a 1-paragraph problem statement.', tag: 'lab' },
      { id: 'java-adv-d2-t2', text: 'Download mysql-connector-j.jar. Add it to your project classpath. Write a test class that loads the driver.', tag: 'lab' },
      { id: 'java-adv-d2-t3', text: 'Sketch the class diagram for your project. Identify entities, their fields, and relationships.', tag: 'lab' },
    ],
  },

  // ======== DAY 3: RDBMS & MySQL Environment ========
  {
    id: 'java-adv-d3', number: 3,
    title: 'RDBMS & MySQL Technical Environment', duration: 90,
    topics: ['RDBMS', 'Tables', 'XAMPP', 'MySQL', 'LocalHost', 'phpMyAdmin'],
    blocks: [
      { type: 'callout', id: 'ja3-intro', calloutType: 'info', title: 'The Database Layer — Your Project\'s Foundation', content: 'Every JDBC application needs a database to connect TO. Today: the MySQL environment setup, creating databases and tables, and understanding how your Java code will interact with MySQL. This is the "DB" half of JDBC.' },
      { type: 'heading', id: 'ja3-rdbms', level: 2, content: 'RDBMS Refresher — The 2-Minute Version' },
      { type: 'paragraph', id: 'ja3-rdbms-p', content: 'An RDBMS (Relational Database Management System) like MySQL organizes data into **tables** (relations) with fixed columns and variable rows. Tables are connected through **primary keys** (unique IDs) and **foreign keys** (references to primary keys in other tables).' },
      { type: 'code', id: 'ja3-schema', lang: 'sql', title: 'Your Project Database — Example Schema', code: `-- Library Management System schema
CREATE DATABASE library_db;
USE library_db;

CREATE TABLE books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100),
    isbn VARCHAR(20) UNIQUE,
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE members (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    join_date DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE borrowings (
    borrow_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    member_id INT,
    borrow_date DATE DEFAULT (CURRENT_DATE),
    due_date DATE,
    return_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);` },
      { type: 'heading', id: 'ja3-xampp', level: 2, content: 'XAMPP + MySQL — Your Local Development Server' },
      { type: 'paragraph', id: 'ja3-xampp-p', content: 'XAMPP provides a local MySQL server accessible at `localhost` (IP: 127.0.0.1) on port 3306. Your Java application connects to this local server — no internet needed. This is exactly what evaluators will check during project demos.' },
      { type: 'code', id: 'ja3-xampp-check', lang: 'bash', title: 'Verifying Your MySQL Setup', code: `# Check if MySQL is running
# Windows: XAMPP Control Panel → MySQL should be green
# Or from terminal:
mysql -u root -p

# Create a test database
CREATE DATABASE test_db;
USE test_db;

# Check connection parameters you will use in Java:
# URL:      jdbc:mysql://localhost:3306/test_db
# User:     root
# Password: (your MySQL password — default is blank with XAMPP)` },
      { type: 'callout', id: 'ja3-connection-string', calloutType: 'tip', title: 'The JDBC Connection URL — Decoded', content: 'The connection URL tells Java EXACTLY where your database lives:\n\n```\njdbc:mysql://localhost:3306/library_db\n│    │      │         │       │\n│    │      │         │       └── Database name\n│    │      │         └── Port (3306 = MySQL default)\n│    │      └── Host (localhost = your machine)\n│    └── Database type (mysql)\n└── Protocol (jdbc)\n```\n\nThis URL is the first parameter to `DriverManager.getConnection()`. Get it wrong and nothing works.' },
      { type: 'heading', id: 'ja3-phpmyadmin', level: 2, content: 'phpMyAdmin — Your Visual Database Manager' },
      { type: 'paragraph', id: 'ja3-phpmyadmin-p', content: 'phpMyAdmin (`http://localhost/phpmyadmin`) is a web-based GUI for MySQL. Use it for:\n\n- **Creating databases/tables** visually (faster than typing SQL).\n- **Browsing data** after your Java app inserts it (verify your code works).\n- **Exporting/importing** SQL files (backup your project database).\n- **Running test queries** before writing them in Java.' },
      { type: 'callout', id: 'ja3-d1', calloutType: 'doubt', title: 'Do I need to install MySQL separately, or is XAMPP enough?', content: '**XAMPP is enough.** It bundles MariaDB (a MySQL-compatible database). For your university project, MariaDB and MySQL are interchangeable — same SQL syntax, same JDBC driver (mysql-connector-j), same port (3306). Do NOT install a separate MySQL — it will conflict with XAMPP\'s MariaDB on port 3306.' },
      { type: 'callout', id: 'ja3-exam', calloutType: 'exam', title: 'Exam Alert — CE-1 Preparation', content: 'CE-1 will test your ability to:\n\n1. **Write a correct JDBC connection URL** — `jdbc:mysql://localhost:3306/dbname`\n2. **Load the MySQL driver**: `Class.forName("com.mysql.cj.jdbc.Driver")`\n3. **Connect**: `DriverManager.getConnection(url, user, password)`\n4. **Handle SQLException** — every JDBC call needs try-catch.\n\nThese four lines are the JDBC boilerplate. If you can write them from memory, you have secured at least 5 marks in CE-1.' },
      { type: 'callout', id: 'ja3-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'This day\'s MySQL setup is the same environment you used in the DBMS 8-day course. The SQL you write in phpMyAdmin today is the same SQL your Java code will execute via JDBC on Days 4-6. The only difference: instead of typing queries into the MySQL terminal, your Java program sends them programmatically.' },
      { type: 'table', id: 'ja3-qref', headers: ['Component', 'What It Is', 'How Java Uses It'], rows: [
        ['MySQL/MariaDB', 'Database server (via XAMPP)', 'Stores all your project data persistently'],
        ['localhost:3306', 'Your local database address', 'Connection URL target — jdbc:mysql://localhost:3306/db'],
        ['mysql-connector-j.jar', 'JDBC driver JAR file', 'Added to classpath. Enables Java→MySQL communication.'],
        ['phpMyAdmin', 'Web-based MySQL GUI', 'Visual DB management. Verify Java code output.'],
        ['DriverManager', 'JDBC class in java.sql', 'Creates Connection objects from URLs.'],
      ] },
      { type: 'quiz', id: 'ja3-quiz', title: 'Day 3 Quiz', questions: [
        { id: 'ja3-q1', question: 'What is the JDBC connection URL format for a local MySQL database named "project_db"?', options: ['mysql://localhost/project_db', 'jdbc:mysql://localhost:3306/project_db', 'jdbc:mysql://project_db:3306', 'http://localhost:3306/project_db'], correctIndex: 1, explanation: 'Format: jdbc:mysql://host:port/database. For local: host=localhost, port=3306.' },
        { id: 'ja3-q2', question: 'Why do you need mysql-connector-j.jar in your project?', options: ['It compiles Java code faster', 'It is the JDBC driver — without it Java cannot talk to MySQL', 'It provides GUI components', 'It is a MySQL backup tool'], correctIndex: 1, explanation: 'The connector JAR contains the Driver class that implements JDBC interfaces for MySQL. Without it, DriverManager.getConnection() throws SQLException: "No suitable driver found."' },
        { id: 'ja3-q3', question: 'What does XAMPP provide for your project?', options: ['A Java compiler', 'A local MySQL/MariaDB server + phpMyAdmin', 'A web hosting service', 'A code editor'], correctIndex: 1, explanation: 'XAMPP bundles Apache + MySQL/MariaDB + phpMyAdmin. For Java projects, you use the MySQL component as your local database server.' },
      ] },
      { type: 'flashcard', id: 'ja3-cards', title: 'Day 3 Flashcards', cards: [
        { id: 'ja3-f1', front: 'JDBC connection URL format?', back: 'jdbc:mysql://[host]:[port]/[database]. Local: jdbc:mysql://localhost:3306/mydb. Port 3306 is MySQL default. This is the first argument to DriverManager.getConnection().', hint: 'Protocol, host, port, database...' },
        { id: 'ja3-f2', front: 'What is mysql-connector-j.jar?', back: 'The official MySQL JDBC driver. Contains com.mysql.cj.jdbc.Driver class. Must be in classpath (-cp) when compiling and running. Without it, Java cannot communicate with MySQL.', hint: 'The bridge JAR file...' },
        { id: 'ja3-f3', front: 'phpMyAdmin — what and why?', back: 'Web-based MySQL GUI at http://localhost/phpmyadmin. Use for: creating databases/tables visually, browsing data, running test queries, exporting/importing SQL. Verify what your Java code wrote to the database.', hint: 'Visual DB tool...' },
      ] },
      { type: 'practice', id: 'ja3-p1', lang: 'sql', title: 'Practice: Create Your Project Schema', starter: `-- Create the database for YOUR project
-- Example: Library Management, Student System, or your own idea
CREATE DATABASE my_project;
USE my_project;

-- TODO: Create at least 2 related tables with PRIMARY KEY and FOREIGN KEY
-- TODO: Insert 5+ sample rows into each table
-- Test: SELECT with JOIN across your tables`, hint: 'Start with your main entity (e.g., students, books, products). Add a second table that references it (e.g., enrollments, borrowings, orders). Always include a PRIMARY KEY AUTO_INCREMENT.' },
      { type: 'practice', id: 'ja3-p2', lang: 'java', title: 'Practice: JDBC Connection Test', starter: `import java.sql.*;

public class DBTest {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/my_project";
        String user = "root";
        String password = "";  // default XAMPP password is blank

        // TODO: Load the driver (Class.forName)
        // TODO: Create the connection (DriverManager.getConnection)
        // TODO: Print "Connected!" or the error message
        // TODO: Close the connection in finally block
    }
}`, hint: 'Use try-catch for ClassNotFoundException and SQLException. In try: Class.forName("com.mysql.cj.jdbc.Driver"); Connection conn = DriverManager.getConnection(url, user, pass); In finally: if (conn != null) conn.close();' },
      { type: 'practice', id: 'ja3-p3', lang: 'java', title: 'Practice: Connection URL Builder', starter: `// THINKING EXERCISE — answer in comments.

// Write the CORRECT JDBC URL for each scenario:
//
// 1. MySQL on localhost, default port, database "school_db"
// 2. MySQL on a server at 192.168.1.10, port 3307, database "project"
// 3. MySQL on localhost, database "library", port 3306
// 4. What are the 4 parts of a JDBC URL?
//    (jdbc : mysql : // host:port/dbname)

// For #1, write the full DriverManager.getConnection line:
//   DriverManager.getConnection("____", "root", "");

// Q5: What happens if you use the WRONG port in the URL?
// Q6: What happens if the database name does not exist?`, hint: '1: jdbc:mysql://localhost:3306/school_db. 2: jdbc:mysql://192.168.1.10:3307/project. 3: jdbc:mysql://localhost:3306/library. Wrong port → Connection refused / timeout. Wrong db → SQLException: Unknown database.' },
      { type: 'practice', id: 'ja3-p4', lang: 'sql', title: 'Practice: Schema for Your Project', starter: `-- Design the schema YOUR project will use.
-- (If you chose Library: books/members/borrowings.
--  If Student System: students/courses/enrollments. etc.)

-- Requirements:
-- 1. At least 2 related tables (PK + FK)
-- 2. At least 1 UNIQUE column (email, isbn, roll_no)
-- 3. At least 1 BOOLEAN or DATE column
-- 4. 5+ sample INSERT rows per table
-- 5. One JOIN query that combines both tables

-- TODO: write the CREATE DATABASE, CREATE TABLEs, INSERTs,
--       and the JOIN query here.

-- In comments: which table will your Java DAO class
-- (Day 5) talk to first?`, hint: 'Design with the DAO in mind: your Java app will INSERT/SELECT/UPDATE/DELETE these tables. Keep column names simple (snake_case) so JDBC rs.getString("column_name") is easy.' },
      { type: 'practice', id: 'ja3-p5', lang: 'bash', title: 'Practice: MySQL Environment Check', starter: `# Run each command and record the result.

# 1. Is MySQL running? (XAMPP: green light on MySQL)
#    Or check the port:
netstat -an | findstr 3306     # Windows
# ss -tlnp | grep 3306          # macOS/Linux

# 2. Login to MySQL:
mysql -u root -p

# 3. Inside MySQL, run:
#    SHOW DATABASES;
#    SELECT VERSION();
#    SELECT CURRENT_USER();

# 4. Create your project database:
#    CREATE DATABASE IF NOT EXISTS my_project;
#    USE my_project;

# 5. Exit: \\q

# TODO: in comments, write down:
#   - MySQL version you are running
#   - whether port 3306 is free or taken
#   - the exact URL Java will use to connect`, hint: 'Port 3306 busy → another MySQL/Skype/Windows service. Fix in XAMPP my.ini → 3307, then Java URL uses :3307. Java URL: jdbc:mysql://localhost:3306/my_project.' },
    ],
    tasks: [
      { id: 'java-adv-d3-t1', text: 'Set up XAMPP MySQL. Create your project database with at least 2 related tables (PK + FK).', tag: 'lab' },
      { id: 'java-adv-d3-t2', text: 'Download mysql-connector-j.jar. Write a Java class that loads the driver and connects to your database.', tag: 'lab' },
      { id: 'java-adv-d3-t3', text: 'Test your connection: print "Connected to MySQL!" on success. Handle SQLException and ClassNotFoundException.', tag: 'drill' },
    ],
  },

  // ======== DAY 4: SQL Data Definition & Retrieval via JDBC ========
  {
    id: 'java-adv-d4', number: 4,
    title: 'Data Definition & Retrieval via JDBC', duration: 90,
    topics: ['JDBC Statement', 'executeQuery', 'ResultSet', 'SELECT', 'executeUpdate', 'CREATE TABLE'],
    blocks: [
      { type: 'callout', id: 'ja4-intro', calloutType: 'info', title: 'Java Speaks SQL', content: 'Today you will bridge the gap: write Java code that executes SQL queries and reads results. The three key objects are **Connection** (the pipeline), **Statement** (the messenger), and **ResultSet** (the returned data). Master this pattern and you have mastered JDBC.' },
      { type: 'heading', id: 'ja4-jdbc-flow', level: 2, content: 'The JDBC Workflow — 5 Steps Every Time' },
      { type: 'list', id: 'ja4-flow', listStyle: 'number', items: ['**Load the driver** — `Class.forName("com.mysql.cj.jdbc.Driver")` registers the MySQL driver with JDBC.', '**Create a connection** — `Connection conn = DriverManager.getConnection(url, user, pass)` opens a TCP connection to MySQL.', '**Create a statement** — `Statement stmt = conn.createStatement()` creates an object that can send SQL to the database.', '**Execute the query** — `ResultSet rs = stmt.executeQuery(sql)` for SELECT. `int rows = stmt.executeUpdate(sql)` for INSERT/UPDATE/DELETE/CREATE.', '**Process results + close** — loop through the ResultSet. Close rs → stmt → conn in reverse order (preferably in finally or try-with-resources).'] },
      { type: 'heading', id: 'ja4-execute', level: 2, content: 'executeQuery vs executeUpdate — Know the Difference' },
      { type: 'table', id: 'ja4-exec-table', headers: ['Method', 'Use For', 'Returns', 'SQL Commands'], rows: [
        ['executeQuery(sql)', 'Reading data', 'ResultSet', 'SELECT'],
        ['executeUpdate(sql)', 'Modifying data/structure', 'int (row count or 0)', 'INSERT, UPDATE, DELETE, CREATE, ALTER, DROP'],
        ['execute(sql)', 'Unknown SQL type', 'boolean (true=ResultSet, false=update count)', 'Any SQL (rarely used directly)'],
      ] },
      { type: 'code', id: 'ja4-select', lang: 'java', title: 'Complete SELECT Example', code: `import java.sql.*;

public class SelectDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/library_db";
        String user = "root";
        String pass = "";

        // try-with-resources auto-closes Connection, Statement, ResultSet
        String sql = "SELECT book_id, title, author FROM books WHERE available = true";

        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            System.out.println("Available Books:");
            System.out.println("---------------");

            while (rs.next()) {
                int id = rs.getInt("book_id");        // by column name
                String title = rs.getString("title");
                String author = rs.getString(3);       // by column index (1-based!)

                System.out.printf("%d. %s by %s%n", id, title, author);
            }

        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
        }
    }
}` },
      { type: 'callout', id: 'ja4-resultset', calloutType: 'warn', title: 'ResultSet Column Indices Are 1-Based (Not 0-Based!)', content: 'This is the #1 JDBC off-by-one error:\n\n```java\nrs.getString(0);  // ERROR — columns start at 1, not 0\nrs.getString(1);  // Correct — first column\nrs.getString(3);  // Third column\n```\n\nAlways prefer column **names** over indices — `rs.getString("title")` is clearer and immune to column reordering. Use indices only when column names are unknown (e.g., metadata queries).' },
      { type: 'heading', id: 'ja4-ddl-jdbc', level: 2, content: 'Executing DDL and DML via JDBC' },
      { type: 'code', id: 'ja4-ddl', lang: 'java', title: 'CREATE TABLE and INSERT via JDBC', code: `// CREATE TABLE (DDL) via JDBC
String createSQL = "CREATE TABLE IF NOT EXISTS students (" +
    "id INT PRIMARY KEY AUTO_INCREMENT, " +
    "name VARCHAR(50), " +
    "branch VARCHAR(10)" +
    ")";

try (Connection conn = DriverManager.getConnection(url, user, pass);
     Statement stmt = conn.createStatement()) {

    stmt.executeUpdate(createSQL);  // returns 0 for DDL
    System.out.println("Table created!");

    // INSERT (DML) via JDBC
    String insertSQL = "INSERT INTO students (name, branch) " +
                       "VALUES ('Vinayak', 'AIML')";
    int rows = stmt.executeUpdate(insertSQL);  // returns 1 (rows affected)
    System.out.println(rows + " row(s) inserted.");

} catch (SQLException e) {
    e.printStackTrace();
}` },
      { type: 'callout', id: 'ja4-d1', calloutType: 'doubt', title: "Why do we close Connection, Statement, and ResultSet? What happens if we don't?", content: 'Each object holds **database resources** (memory, network sockets, cursors). If you do not close them:\n\n1. **Memory leak** — the database server keeps resources allocated for your session.\n2. **Connection exhaustion** — after many unclosed connections, MySQL refuses new ones (max_connections limit).\n3. **Cursor leak** — unclosed ResultSets keep locks on rows, blocking other queries.\n\n**Try-with-resources** (Java 7+) is the cleanest solution:\n\n```java\ntry (Connection c = ...; Statement s = ...; ResultSet r = ...) { ... }\n// All three auto-close when the try block exits.\n```' },
      { type: 'callout', id: 'ja4-exam', calloutType: 'exam', title: 'Exam Alert — CE-1 Coding Focus', content: 'CE-1 coding tasks WILL include:\n\n1. **Write a complete JDBC connection + query** (boilerplate code).\n2. **Loop through ResultSet and print values.**\n3. **Use executeUpdate for INSERT/UPDATE/DELETE.**\n\n**Marks**: 5 per task. Full marks if: connection opens, query executes, results processed correctly, connection closes. Deductions for: missing try-catch, using the wrong execute method (executeQuery for INSERT), forgetting to close resources.' },
      { type: 'callout', id: 'ja4-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'ResultSet iteration (`while (rs.next())`) is the same pattern as **iterating arrays (Java Day 6)** and **ArrayList iteration (Java Day 14)**. The SQL inside `executeQuery()` is the same SQL you wrote in the **DBMS 8-day course**. The try-catch is the exception handling from **Java Day 12**.' },
      { type: 'table', id: 'ja4-qref', headers: ['JDBC Step', 'Code', 'Notes'], rows: [
        ['Load driver', 'Class.forName("com.mysql.cj.jdbc.Driver")', 'Throws ClassNotFoundException'],
        ['Connect', 'DriverManager.getConnection(url, user, pass)', 'Returns Connection. Throws SQLException.'],
        ['Statement', 'conn.createStatement()', 'For static SQL. Day 5: PreparedStatement for dynamic.'],
        ['Query', 'stmt.executeQuery(sql)', 'For SELECT. Returns ResultSet.'],
        ['Update', 'stmt.executeUpdate(sql)', 'For INSERT/UPDATE/DELETE/DDL. Returns row count.'],
        ['Read result', 'while(rs.next()) { rs.getString("col") }', 'Column index is 1-BASED.'],
        ['Close', 'rs.close(); stmt.close(); conn.close()', 'Or use try-with-resources for auto-close.'],
      ] },
      { type: 'quiz', id: 'ja4-quiz', title: 'Day 4 Quiz', questions: [
        { id: 'ja4-q1', question: 'Which JDBC method do you use for a SELECT query?', options: ['stmt.executeUpdate(sql)', 'stmt.executeQuery(sql)', 'stmt.execute(sql)', 'stmt.runQuery(sql)'], correctIndex: 1, explanation: 'executeQuery() is for SELECT — it returns a ResultSet. executeUpdate() is for INSERT, UPDATE, DELETE, and DDL — it returns an int (row count).' },
        { id: 'ja4-q2', question: 'What does rs.getInt(1) return if the ResultSet is empty?', options: ['0', 'null', 'SQLException — cannot call getInt before calling next()', '-1'], correctIndex: 2, explanation: 'You must call rs.next() BEFORE reading any column. The cursor starts BEFORE the first row. Calling getInt() without next() throws SQLException.' },
        { id: 'ja4-q3', question: 'Why is try-with-resources preferred for JDBC code?', options: ['It is faster', 'It automatically closes Connection, Statement, and ResultSet', 'It handles SQLException silently', 'It does not require a catch block'], correctIndex: 1, explanation: 'try-with-resources auto-closes any AutoCloseable object (Connection, Statement, ResultSet) when the try block exits — even if an exception occurs. No manual finally block needed.' },
      ] },
      { type: 'flashcard', id: 'ja4-cards', title: 'Day 4 Flashcards', cards: [
        { id: 'ja4-f1', front: '5 JDBC steps?', back: '1. Load driver (Class.forName). 2. Connect (DriverManager.getConnection). 3. Statement (conn.createStatement). 4. Execute (executeQuery/executeUpdate). 5. Process + Close (rs→stmt→conn, or try-with-resources).', hint: 'Load, connect, create, execute, close...' },
        { id: 'ja4-f2', front: 'executeQuery vs executeUpdate?', back: 'executeQuery(sql): for SELECT → returns ResultSet. executeUpdate(sql): for INSERT/UPDATE/DELETE/DDL → returns int (rows affected). Never use executeQuery for INSERT.', hint: 'Read vs write...' },
        { id: 'ja4-f3', front: 'ResultSet iteration pattern?', back: 'while(rs.next()) { ... }. Cursor starts BEFORE first row. Column index is 1-BASED (rs.getString(1) = first column). Prefer column names: rs.getString("name").', hint: 'while next, 1-based columns...' },
      ] },
      { type: 'practice', id: 'ja4-p1', lang: 'java', title: 'Practice: CRUD Reader', starter: `import java.sql.*;

public class CRUDReader {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/library_db";
        String user = "root", pass = "";

        // TODO: 1. Connect to DB
        // TODO: 2. Execute SELECT * FROM books
        // TODO: 3. Loop ResultSet, print id, title, author, available
        // TODO: 4. Count how many books are available vs total
        // TODO: 5. Close all resources (use try-with-resources)
    }
}`, hint: 'Use try(Connection c = DriverManager.getConnection(...); Statement s = c.createStatement(); ResultSet r = s.executeQuery("SELECT * FROM books")). Count available: if(rs.getBoolean("available")) count++.' },
      { type: 'practice', id: 'ja4-p2', lang: 'java', title: 'Practice: Table Creator via JDBC', starter: `import java.sql.*;

public class TableCreator {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/my_project";
        String user = "root", pass = "";

        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {

            // TODO: CREATE TABLE IF NOT EXISTS for your project entity
            // TODO: INSERT 3 sample rows
            // TODO: SELECT and print all rows
            // Catch and print SQLException
        }
    }
}`, hint: 'CREATE TABLE: use stmt.executeUpdate(). INSERT: also executeUpdate() — check return value (should be 1 per INSERT). SELECT: executeQuery(), then while(rs.next()).' },
      { type: 'practice', id: 'ja4-p3', lang: 'java', title: 'Practice: ResultSet Reader', starter: `import java.sql.*;

public class ResultSetReader {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/library_db", user = "root", pass = "";

        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM books")) {

            // TODO 1: print the number of columns:
            //         ResultSetMetaData md = rs.getMetaData();
            //         md.getColumnCount()
            // TODO 2: print each column NAME: md.getColumnName(i)
            // TODO 3: loop rows, print EVERY column value using
            //         rs.getObject(i) in a loop (works for any type)
            // TODO 4: count rows as you go, print total at the end
        }
    }
}`, hint: 'getMetaData() gives column count/names. rs.getObject(i) returns any type — print it directly. Count rows with an int counter inside while(rs.next()).' },
      { type: 'practice', id: 'ja4-p4', lang: 'java', title: 'Practice: executeUpdate Return Values', starter: `import java.sql.*;

public class UpdateReturn {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/library_db", user = "root", pass = "";

        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {

            // TODO 1: INSERT a book, print the return value
            //         (expect 1 — one row affected)
            // TODO 2: UPDATE a book title, print return value
            // TODO 3: DELETE a book, print return value
            // TODO 4: CREATE TABLE temp (id INT), print return
            //         value (expect 0 — DDL returns 0!)
            // TODO 5: DROP TABLE temp, print return value

            // TODO 6: in comments: what does executeUpdate
            //         return for DML vs DDL? why?
        }
    }
}`, hint: 'INSERT/UPDATE/DELETE return rows affected (1+). CREATE/DROP/ALTER return 0 (no rows). This is how you verify a write succeeded: if (rows > 0) print("success").' },
      { type: 'practice', id: 'ja4-p5', lang: 'java', title: 'Practice: Search by Keyword', starter: `import java.sql.*;

public class SearchBook {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/library_db", user = "root", pass = "";
        String keyword = "Java";  // the user's search term

        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {

            // TODO 1: write a SELECT with LIKE:
            //   SELECT * FROM books WHERE title LIKE '%Java%'
            //   (concatenate the keyword into the SQL string)
            // TODO 2: loop the ResultSet, print title + author
            // TODO 3: if no rows matched, print "No books found"
            // TODO 4: in comments: why is this DANGEROUS with
            //         real user input? (SQL injection — Day 5!)
        }
    }
}`, hint: 'String sql = "SELECT * FROM books WHERE title LIKE \'%" + keyword + "%\'";. Track a boolean found flag. Comment: string concatenation of user input = SQL injection risk — PreparedStatement fixes it tomorrow.' },
    ],
    tasks: [
      { id: 'java-adv-d4-t1', text: 'Write a JDBC program that connects to MySQL, executes SELECT, and prints all rows from your project table.', tag: 'lab' },
      { id: 'java-adv-d4-t2', text: 'Use executeUpdate to CREATE a table and INSERT rows via JDBC. Verify in phpMyAdmin.', tag: 'lab' },
      { id: 'java-adv-d4-t3', text: 'Demonstrate the 1-based column index pitfall: try rs.getString(0) and observe the error.', tag: 'drill' },
    ],
  },

  // ======== DAY 5: Advanced Filtering & Data Modification ========
  {
    id: 'java-adv-d5', number: 5,
    title: 'PreparedStatement & CRUD Operations', duration: 90,
    topics: ['PreparedStatement', 'Parameterized Queries', 'SQL Injection', 'CRUD Pattern', 'ResultSet Metadata'],
    blocks: [
      { type: 'callout', id: 'ja5-intro', calloutType: 'info', title: 'From Static to Dynamic — Safe SQL', content: 'Yesterday you used **Statement** for fixed SQL. Today: **PreparedStatement** — the professional way to write JDBC. It prevents **SQL injection** (the #1 security vulnerability), handles special characters automatically, and is faster for repeated queries. This is a CE-2 focus topic.' },
      { type: 'heading', id: 'ja5-statement-vs', level: 2, content: 'Statement vs PreparedStatement — Why It Matters' },
      { type: 'table', id: 'ja5-compare', headers: ['Feature', 'Statement', 'PreparedStatement'], rows: [
        ['SQL parameterization', 'No — concatenate strings (dangerous!)', 'Yes — ? placeholders with setXxx() methods'],
        ['SQL injection safe?', '❌ Vulnerable — user input directly in SQL string', '✅ Safe — parameters are escaped automatically'],
        ['Performance', 'Compiled every execution', 'Pre-compiled once, reused with different parameters'],
        ['Readability', 'Messy with quotes and concatenation', 'Clean — SQL separate from data'],
        ['Use for', 'One-off DDL (CREATE, ALTER). Simple fixed queries.', 'ALL queries with user input. Repeated queries. CRUD operations.'],
      ] },
      { type: 'heading', id: 'ja5-injection', level: 2, content: 'SQL Injection — The Attack You Must Prevent' },
      { type: 'code', id: 'ja5-injection', lang: 'java', title: 'SQL Injection Demo (DO NOT USE IN PRODUCTION)', code: `// DANGEROUS: string concatenation with user input
String userInput = "1 OR 1=1";  // malicious input
String sql = "SELECT * FROM users WHERE id = " + userInput;
// Results in: SELECT * FROM users WHERE id = 1 OR 1=1
// 1=1 is ALWAYS true → returns ALL users! DATA BREACH!

// Or worse: userInput = "1; DROP TABLE users; --"
// Results in: SELECT * FROM users WHERE id = 1; DROP TABLE users; --'
// DELETES your entire table!

// SAFE: PreparedStatement with parameters
String sql = "SELECT * FROM users WHERE id = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setInt(1, Integer.parseInt(userInput));
ResultSet rs = pstmt.executeQuery();
// The ? placeholder treats input as a VALUE, not as SQL code.
// Malicious SQL is ESCAPED, not executed.` },
      { type: 'callout', id: 'ja5-injection-warn', calloutType: 'warn', title: 'SQL Injection — Guaranteed CE-2 Question', content: 'Every CE-2 exam paper has at least one question on SQL injection. Know:\n\n1. **What it is** — user injects malicious SQL through unsanitized input fields.\n2. **How it happens** — string concatenation in SQL queries.\n3. **How to prevent** — always use PreparedStatement with `?` placeholders.\n4. **Never** — trust user input. Never concatenate it into SQL strings.\n\nThis is also the most common interview question for Java developer roles.' },
      { type: 'heading', id: 'ja5-crud', level: 2, content: 'Complete CRUD with PreparedStatement' },
      { type: 'code', id: 'ja5-crud-code', lang: 'java', title: 'CRUD Operations — The Professional Pattern', code: `public class BookDAO {  // DAO = Data Access Object pattern
    private Connection conn;

    public BookDAO(Connection conn) { this.conn = conn; }

    // CREATE (Insert)
    public void addBook(String title, String author) throws SQLException {
        String sql = "INSERT INTO books (title, author) VALUES (?, ?)";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, title);
            ps.setString(2, author);
            int rows = ps.executeUpdate();
            System.out.println(rows + " book added.");
        }
    }

    // READ (Select by ID)
    public void getBook(int id) throws SQLException {
        String sql = "SELECT * FROM books WHERE book_id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                System.out.println(rs.getString("title"));
            }
        }
    }

    // UPDATE
    public void updateBook(int id, String newTitle) throws SQLException {
        String sql = "UPDATE books SET title = ? WHERE book_id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, newTitle);
            ps.setInt(2, id);
            ps.executeUpdate();
        }
    }

    // DELETE
    public void deleteBook(int id) throws SQLException {
        String sql = "DELETE FROM books WHERE book_id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        }
    }
}` },
      { type: 'heading', id: 'ja5-setxxx', level: 2, content: 'setXxx() Methods — The Complete Mapping' },
      { type: 'table', id: 'ja5-set-table', headers: ['SQL Type', 'Java Type', 'PreparedStatement Method'], rows: [
        ['INT, INTEGER', 'int', 'ps.setInt(paramIndex, value)'],
        ['VARCHAR, TEXT', 'String', 'ps.setString(paramIndex, value)'],
        ['DOUBLE, FLOAT', 'double', 'ps.setDouble(paramIndex, value)'],
        ['BOOLEAN', 'boolean', 'ps.setBoolean(paramIndex, value)'],
        ['DATE', 'java.sql.Date', 'ps.setDate(paramIndex, Date.valueOf("2026-07-27"))'],
        ['NULL', '—', 'ps.setNull(paramIndex, Types.INTEGER)'],
      ] },
      { type: 'callout', id: 'ja5-d1', calloutType: 'doubt', title: 'Can I reuse a PreparedStatement with different parameters?', content: '**Yes!** That is one of its main advantages. Set new parameters and call execute again:\n\n```java\nPreparedStatement ps = conn.prepareStatement("INSERT INTO b(title) VALUES(?)");\nps.setString(1, "Book 1"); ps.executeUpdate();\nps.setString(1, "Book 2"); ps.executeUpdate();\nps.setString(1, "Book 3"); ps.executeUpdate();\n```\n\nThe SQL is compiled ONCE and reused three times — faster than creating three separate Statements.' },
      { type: 'callout', id: 'ja5-exam', calloutType: 'exam', title: 'Exam Alert — CE-2 Focus', content: 'CE-2 will test PreparedStatement heavily:\n\n1. **SQL injection prevention** — MCQ: "Which prevents SQL injection?" → PreparedStatement.\n2. **10-mark coding question**: write a complete CRUD class with PreparedStatement.\n3. **Parameter index is 1-based** — `ps.setString(1, ...)`, not `ps.setString(0, ...)`. Same pitfall as ResultSet.\n4. **`executeUpdate()` for CRUD, `executeQuery()` for SELECT.** Same distinction as Statement.' },
      { type: 'callout', id: 'ja5-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'The DAO pattern (BookDAO class above) is the **industry-standard way** to organize JDBC code. Each entity gets its own DAO class. This pattern appears in Spring Boot, Hibernate, and every production Java application. You are learning not just for exams but for your career.' },
      { type: 'table', id: 'ja5-qref', headers: ['Operation', 'SQL Pattern', 'PreparedStatement Code'], rows: [
        ['INSERT', 'INSERT INTO t(c1,c2) VALUES(?,?)', 'ps.setXxx(1, v1); ps.setXxx(2, v2); ps.executeUpdate();'],
        ['SELECT', 'SELECT * FROM t WHERE id = ?', 'ps.setInt(1, id); ResultSet rs = ps.executeQuery();'],
        ['UPDATE', 'UPDATE t SET c1=? WHERE id=?', 'ps.setXxx(1, v1); ps.setInt(2, id); ps.executeUpdate();'],
        ['DELETE', 'DELETE FROM t WHERE id=?', 'ps.setInt(1, id); ps.executeUpdate();'],
      ] },
      { type: 'quiz', id: 'ja5-quiz', title: 'Day 5 Quiz', questions: [
        { id: 'ja5-q1', question: 'What is the primary reason to use PreparedStatement over Statement?', options: ['It is shorter to write', 'It prevents SQL injection and is faster for repeated queries', 'It does not need a connection', 'It supports more SQL commands'], correctIndex: 1, explanation: 'PreparedStatement is safer (prevents SQL injection by escaping parameters) and faster (pre-compiled SQL, reused with different parameters).' },
        { id: 'ja5-q2', question: "What happens if user input is \"1; DROP TABLE users; --\" and you use Statement with string concatenation?", options: ['Nothing — it is treated as text', 'The DROP TABLE command executes — table is deleted', 'SQLException — invalid syntax', 'The semicolon is escaped automatically'], correctIndex: 1, explanation: 'With string concatenation, the malicious SQL becomes part of the query. The DROP TABLE command executes. This is exactly the SQL injection attack PreparedStatement prevents.' },
        { id: 'ja5-q3', question: 'What does ps.setString(1, "Vinayak") do?', options: ['Sets the first column to "Vinayak"', 'Sets the first ? placeholder to "Vinayak"', 'Sets the first row to "Vinayak"', 'Sets the connection name to "Vinayak"'], correctIndex: 1, explanation: 'setString(1, value) replaces the FIRST ? placeholder in the SQL string with the value "Vinayak". Parameter indices are 1-based, matching the order of ? in the SQL.' },
      ] },
      { type: 'flashcard', id: 'ja5-cards', title: 'Day 5 Flashcards', cards: [
        { id: 'ja5-f1', front: 'What is SQL injection and how to prevent it?', back: 'Attack where malicious SQL is injected through user input via string concatenation. Prevention: ALWAYS use PreparedStatement with ? placeholders. Never concatenate user input into SQL strings.', hint: 'User input becomes SQL code...' },
        { id: 'ja5-f2', front: 'PreparedStatement setXxx() methods?', back: 'setString(idx, val), setInt(idx, val), setDouble(idx, val), setBoolean(idx, val), setDate(idx, val). Index is 1-BASED (first ? = 1). Match the type to the database column type.', hint: 'One method per Java type...' },
        { id: 'ja5-f3', front: 'DAO pattern — what and why?', back: 'Data Access Object. Separate class per entity that handles all database operations (CRUD). Keeps SQL separate from business logic. Industry standard. Each entity (Book, Member, Order) gets its own DAO.', hint: 'One class per database table...' },
      ] },
      { type: 'practice', id: 'ja5-p1', lang: 'java', title: 'Practice: Build a MemberDAO', starter: `import java.sql.*;

public class MemberDAO {
    private Connection conn;
    public MemberDAO(Connection conn) { this.conn = conn; }

    // TODO: addMember(name, email, phone) — INSERT with PreparedStatement
    // TODO: getMember(id) — SELECT by id, print result
    // TODO: updateEmail(id, newEmail) — UPDATE email
    // TODO: deleteMember(id) — DELETE
    // TODO: getAllMembers() — SELECT all, return as list or print

    public static void main(String[] args) throws Exception {
        // TODO: Connect, create DAO, test all 4 CRUD operations
    }
}`, hint: 'Use try-with-resources for each PreparedStatement. addMember: ps.setString(1,name); ps.setString(2,email); ps.executeUpdate(). For getAll: while(rs.next()) print each row.' },
      { type: 'practice', id: 'ja5-p2', lang: 'java', title: 'Practice: SQL Injection Prevention Demo', starter: `import java.sql.*;

public class InjectionDemo {
    public static void main(String[] args) throws Exception {
        // Simulate: user enters "1 OR 1=1" in a search box

        String malicious = "1 OR 1=1";
        String url = "jdbc:mysql://localhost:3306/test", user = "root", pass = "";

        try (Connection conn = DriverManager.getConnection(url, user, pass)) {
            // BAD: Statement with concatenation
            // TODO: try this — does it return all rows?

            // GOOD: PreparedStatement with parameter
            // TODO: try this — does it prevent the attack?
        }
    }
}`, hint: 'For BAD: Statement stmt = conn.createStatement(); stmt.executeQuery("SELECT * FROM t WHERE id=" + malicious); — observe how many rows return. For GOOD: use PreparedStatement with ? — only the row with id=1 returns.' },
      { type: 'practice', id: 'ja5-p3', lang: 'java', title: 'Practice: PreparedStatement Param Types', starter: `import java.sql.*;

public class ParamTypes {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/library_db", user = "root", pass = "";

        try (Connection conn = DriverManager.getConnection(url, user, pass)) {

            // TODO 1: INSERT with 4 different parameter types:
            //   String, int, double, boolean
            //   CREATE TABLE items (
            //     id INT PRIMARY KEY AUTO_INCREMENT,
            //     name VARCHAR(50), qty INT, price DOUBLE, in_stock BOOLEAN)
            //   INSERT INTO items (name, qty, price, in_stock)
            //   VALUES (?, ?, ?, ?)
            //   ps.setString(1, ...); ps.setInt(2, ...);
            //   ps.setDouble(3, ...); ps.setBoolean(4, ...);

            // TODO 2: insert 3 rows with different values
            // TODO 3: SELECT * WHERE in_stock = true — print rows
            // TODO 4: what happens if you setString for an INT
            //         column? (try it, observe the error)
        }
    }
}`, hint: 'setXxx(index, value) — index is the ? position (1-based). Wrong type → SQLException or implicit conversion. setBoolean maps to MySQL BOOLEAN (TINYINT(1)).' },
      { type: 'practice', id: 'ja5-p4', lang: 'java', title: 'Practice: DAO Search Methods', starter: `import java.sql.*;

public class SearchDAO {
    private Connection conn;
    public SearchDAO(Connection conn) { this.conn = conn; }

    // TODO 1: findByTitle(String keyword) — SELECT * WHERE title LIKE ?
    //         (parameter: "%" + keyword + "%")
    // TODO 2: findByAuthor(String author) — exact match
    // TODO 3: countByCategory(String category) — SELECT COUNT(*)
    //         (use rs.getInt(1) for the count)
    // TODO 4: findAvailable() — WHERE available = true
    // TODO 5: in main, connect and test all four

    // Each method: try-with-resources PreparedStatement,
    //              print matching rows, catch SQLException.
}`, hint: 'LIKE parameter: ps.setString(1, "%" + keyword + "%"). COUNT: rs.next() once, then rs.getInt(1). available=true: ps.setBoolean(1, true) or embed in SQL. Print rows with while(rs.next()).' },
      { type: 'practice', id: 'ja5-p5', lang: 'java', title: 'Practice: Reuse PreparedStatement', starter: `import java.sql.*;

public class ReusePS {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/library_db", user = "root", pass = "";

        try (Connection conn = DriverManager.getConnection(url, user, pass);
             PreparedStatement ps = conn.prepareStatement(
                 "INSERT INTO books (title, author) VALUES (?, ?)")) {

            // TODO 1: insert 5 books by REUSING the same ps:
            //   setString(1, title); setString(2, author);
            //   ps.executeUpdate();  — repeat with new values
            //   (NO new prepareStatement each time!)

            // TODO 2: print how many rows inserted total
            // TODO 3: in comments: why is reuse faster than
            //         creating a new statement per insert?
            //         (compiled once, executed many times)
        }
    }
}`, hint: 'The SQL is compiled ONCE by the DB. Each executeUpdate() just binds new params. This is why batch + PreparedStatement is the fastest insert pattern. Add a counter to track total.' },
    ],
    tasks: [
      { id: 'java-adv-d5-t1', text: 'Write a complete CRUD class (DAO) for one of your project entities using PreparedStatement.', tag: 'lab' },
      { id: 'java-adv-d5-t2', text: 'Demonstrate SQL injection using Statement + string concatenation. Then fix it with PreparedStatement.', tag: 'drill' },
      { id: 'java-adv-d5-t3', text: 'Explain: Why is setString(1, ...) 1-based? What happens if you use index 0?', tag: 'mcq' },
    ],
  },

  // ======== DAY 6: Prompts, Transactions & JDBC Wrap-Up ========
  {
    id: 'java-adv-d6', number: 6,
    title: 'Transactions, MySQL Prompts & JDBC Best Practices', duration: 90,
    topics: ['Transactions (commit/rollback)', 'MySQL Prompts', 'Connection Pooling', 'Batch Processing'],
    blocks: [
      { type: 'callout', id: 'ja6-intro', calloutType: 'info', title: 'Production-Ready JDBC', content: 'Today: transactions (all-or-nothing operations), MySQL prompt awareness (debugging aid), connection pooling (performance), and batch processing (efficiency). These separate beginner JDBC from professional JDBC — and they appear in CE-3 and the End Term exam.' },
      { type: 'heading', id: 'ja6-transactions', level: 2, content: 'Transactions — ACID in Action via JDBC' },
      { type: 'code', id: 'ja6-txn-code', lang: 'java', title: 'Transaction Management', code: `// Scenario: transfer money between two accounts.
// This MUST be all-or-nothing (Atomicity).

Connection conn = null;
try {
    conn = DriverManager.getConnection(url, user, pass);
    conn.setAutoCommit(false);  // START TRANSACTION

    // Debit account 1
    PreparedStatement debit = conn.prepareStatement(
        "UPDATE accounts SET balance = balance - ? WHERE id = ?");
    debit.setDouble(1, 1000);
    debit.setInt(2, 1);
    debit.executeUpdate();

    // Credit account 2
    PreparedStatement credit = conn.prepareStatement(
        "UPDATE accounts SET balance = balance + ? WHERE id = ?");
    credit.setDouble(1, 1000);
    credit.setInt(2, 2);
    credit.executeUpdate();

    conn.commit();  // Both succeed → save permanently
    System.out.println("Transfer complete!");

} catch (SQLException e) {
    if (conn != null) {
        try { conn.rollback(); }  // Either fails → undo everything
        catch (SQLException ex) { ex.printStackTrace(); }
    }
    System.err.println("Transfer failed — rolled back.");
} finally {
    if (conn != null) {
        try { conn.setAutoCommit(true); conn.close(); }
        catch (SQLException e) { e.printStackTrace(); }
    }
}` },
      { type: 'callout', id: 'ja6-autocommit', calloutType: 'warn', title: 'Auto-Commit Is ON by Default — Turn It OFF for Transactions', content: 'By default, every SQL statement auto-commits (executes immediately and permanently). This is fine for simple apps but WRONG for transactions:\n\n```java\nconn.setAutoCommit(false);  // Start manual transaction\n// ... multiple SQL statements ...\nconn.commit();              // Save all changes (success)\n// OR\nconn.rollback();            // Undo all changes (failure)\nconn.setAutoCommit(true);   // Restore default\n```\n\nAlways restore auto-commit to true after your transaction. Otherwise, future statements will not auto-commit and appear to "disappear" when the connection closes.' },
      { type: 'heading', id: 'ja6-prompts', level: 2, content: 'MySQL Prompts — The Debugging Lifesaver' },
      { type: 'table', id: 'ja6-prompt-table', headers: ['Prompt', 'Meaning', 'What To Do', 'JDBC Relevance'], rows: [
        ['mysql>', 'Ready for new query', 'Type SQL, end with ;', 'Equivalent to: Statement is ready to execute'],
        ['->', 'Multi-line query continuation', 'Continue typing. End with ; to execute.', 'Same query across multiple lines in JDBC string'],
        ["'>", 'Open single quote — waiting for close', "Type ' to close, then ; or \\c to cancel", 'Forgotten quote in SQL string in Java code'],
        ['">', 'Open double quote — waiting for close', 'Type " to close, then ; or \\c to cancel', 'Mismatched quotes in dynamic SQL'],
        ['\\c', '(You type this)', 'Cancels current query. Returns to mysql>', 'No JDBC equivalent — fix your SQL string'],
      ] },
      { type: 'heading', id: 'ja6-pooling', level: 2, content: 'Connection Pooling — The Performance Secret' },
      { type: 'paragraph', id: 'ja6-pooling-p', content: 'Creating a new Connection for every query is SLOW (TCP handshake, authentication, resource allocation). Connection pooling keeps a **pool of pre-opened connections** that are reused. You "borrow" a connection, use it, and "return" it to the pool.' },
      { type: 'code', id: 'ja6-pool-example', lang: 'java', title: 'Connection Pooling (Conceptual)', code: `// Without pooling: SLOW — new connection per query
for (int i = 0; i < 1000; i++) {
    Connection c = DriverManager.getConnection(...); // TCP + auth each time!
    // ... query ...
    c.close();
}
// 1000 connections created and destroyed — SLOW!

// With pooling (using HikariCP, DBCP, or c3p0):
// HikariDataSource pool = new HikariDataSource(config);
// for (int i = 0; i < 1000; i++) {
//     Connection c = pool.getConnection();  // borrow from pool
//     // ... query ...
//     c.close();  // return to pool (does NOT close TCP)
// }
// Only 5-10 connections created ONCE, reused 1000 times — FAST!` },
      { type: 'heading', id: 'ja6-batch', level: 2, content: 'Batch Processing — Insert 1000 Rows Efficiently' },
      { type: 'code', id: 'ja6-batch-code', lang: 'java', title: 'Batch Insert', code: `// Without batch: one network round-trip per INSERT — SLOW
// With batch: send all INSERTs in one network call — FAST

String sql = "INSERT INTO books (title, author) VALUES (?, ?)";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    for (String[] book : books) {
        ps.setString(1, book[0]);
        ps.setString(2, book[1]);
        ps.addBatch();  // add to batch (no network call yet)
    }
    int[] results = ps.executeBatch();  // ONE network call for all!
    System.out.println(results.length + " books inserted.");
}` },
      { type: 'callout', id: 'ja6-d1', calloutType: 'doubt', title: 'When do I need transactions vs individual auto-commit?', content: 'Use **transactions** (`setAutoCommit(false)`) when:\n\n- Multiple SQL statements form ONE logical operation (bank transfer, order placement, booking).\n- If any statement fails, ALL must be undone (rollback).\n- You need consistency across related tables.\n\nUse **auto-commit** (default) when:\n\n- Single independent operations (insert one record, update one field).\n- Failure of one operation does not affect others.\n- Simpler code is acceptable.\n\n**CE-3 tip**: the 10-mark coding question often involves a transaction scenario (e.g., book borrowing: decrement available count + insert borrowing record — must be atomic).' },
      { type: 'callout', id: 'ja6-exam', calloutType: 'exam', title: 'Exam Alert — CE-3 & End Term', content: 'CE-3 focuses on the advanced topics from today:\n\n1. **Transactions**: commit/rollback. The "money transfer" or "booking" scenario.\n2. **Batch processing**: when and why to use `addBatch`/`executeBatch`.\n3. **Connection lifecycle**: open → use → close. Consequences of not closing.\n4. **Auto-commit behavior**: default is ON. Turn OFF for transactions.\n\nEnd Term Exam will test ALL 6 days + project concepts. The viva will drill into your transaction management and error handling code.' },
      { type: 'callout', id: 'ja6-complete', calloutType: 'success', title: '🎉 Advanced Java — 6-Day Course Complete!', content: '**Day 1-2**: course admin, evaluation structure, project planning.\n**Day 3**: MySQL environment, XAMPP, phpMyAdmin, connection URL.\n**Day 4**: JDBC core — Statement, ResultSet, executeQuery/executeUpdate.\n**Day 5**: PreparedStatement, SQL injection prevention, CRUD pattern.\n**Day 6**: transactions, batch processing, connection pooling, prompts.\n\n**CE-1 (10 Oct)**: Days 3-4 — SQL basics + JDBC connection.\n**CE-2 (30 Oct)**: Day 5 — PreparedStatement, CRUD, SQL injection.\n**CE-3 (27 Nov)**: Day 6 — transactions, batch, pooling.\n**Project Final + Viva (Dec)**: all 6 days + your working application.\n\nYou now have the full JDBC toolkit. Build your project — the best way to solidify these concepts is to USE them.' },
      { type: 'callout', id: 'ja6-bridge', calloutType: 'bridge', title: 'Connect the Dots — The Complete Picture', content: 'Your full Java journey:\n\n- **Java 14-day course**: core language → OOP → Collections.\n- **DBMS 8-day course**: SQL → DDL/DML → aggregates → theory.\n- **SDE 8-day course**: Python data stack → Big Data → ETL.\n- **Advanced Java 6-day course**: JDBC → connects Java to SQL.\n\nThese four courses together cover your ENTIRE semester 3 syllabus. The project is where everything comes together — Java OOP + SQL database + JDBC bridge + (optionally) Python analytics.' },
      { type: 'table', id: 'ja6-qref', headers: ['Topic', 'Key Code'], rows: [
        ['Transaction start', 'conn.setAutoCommit(false);'],
        ['Commit', 'conn.commit();'],
        ['Rollback', 'conn.rollback(); (in catch block)'],
        ['Restore auto-commit', 'conn.setAutoCommit(true);'],
        ['Add to batch', 'ps.addBatch();'],
        ['Execute batch', 'int[] results = ps.executeBatch();'],
        ['Close resources', 'try-with-resources: conn, stmt/ps, rs'],
        ['Transaction scenario', 'Multiple SQL = one logical operation. All or nothing.'],
      ] },
      { type: 'quiz', id: 'ja6-quiz', title: 'Day 6 Quiz', questions: [
        { id: 'ja6-q1', question: 'What does conn.setAutoCommit(false) do?', options: ['Disables the database connection', 'Starts a manual transaction — statements do not auto-save', 'Commits all pending changes', 'Closes the connection automatically'], correctIndex: 1, explanation: 'It turns OFF auto-commit mode. Statements are now part of a manual transaction. You must explicitly call conn.commit() to save or conn.rollback() to undo.' },
        { id: 'ja6-q2', question: 'What happens if an exception occurs after debit but before credit in a transfer transaction?', options: ['The debit is saved, credit is lost — money disappears!', 'Both are rolled back — no money lost', 'The program crashes with no recovery', 'MySQL auto-fixes it'], correctIndex: 1, explanation: 'The catch block calls conn.rollback(), which undoes the debit. Both operations are reverted. The database returns to its pre-transaction state.' },
        { id: 'ja6-q3', question: 'Why is batch processing (addBatch/executeBatch) faster than individual executeUpdate calls?', options: ['It uses a faster SQL dialect', 'It sends all statements in ONE network round-trip instead of one per statement', 'It compiles SQL faster', 'It does not use PreparedStatement'], correctIndex: 1, explanation: 'Each executeUpdate() is a separate network call. Batch processing collects statements locally and sends them all at once — reducing network overhead dramatically for bulk operations.' },
      ] },
      { type: 'flashcard', id: 'ja6-cards', title: 'Day 6 Flashcards', cards: [
        { id: 'ja6-f1', front: 'Transaction flow in JDBC?', back: 'setAutoCommit(false) → execute SQL statements → if success: commit() / if failure: rollback() (in catch) → finally: setAutoCommit(true) + close connection. Restore auto-commit after transaction!', hint: 'Start, execute, commit or rollback, restore...' },
        { id: 'ja6-f2', front: 'MySQL prompts and meanings?', back: 'mysql> = ready. -> = multi-line. \'> = open single quote. "> = open double quote. \\c = cancel query. These help debug when your JDBC SQL string has syntax errors (missing quotes).', hint: 'Arrow and quote prompts...' },
        { id: 'ja6-f3', front: 'Connection pooling — why?', back: 'Creating connections is SLOW (TCP + auth). Pooling keeps a few connections open and REUSES them. Borrow → use → return (do not close). 10-100x faster for apps with frequent queries.', hint: 'Reuse, don\'t recreate...' },
      ] },
      { type: 'practice', id: 'ja6-p1', lang: 'java', title: 'Practice: Transaction — Book Borrowing', starter: `import java.sql.*;

public class BorrowBook {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/library_db";
        String user = "root", pass = "";

        // TODO: Implement a transaction for borrowing a book
        // Step 1: Decrement available count in books table
        // Step 2: Insert a new row in borrowings table
        // Both MUST succeed or both MUST fail (transaction!)
        // Use try-catch with commit/rollback

        try (Connection conn = DriverManager.getConnection(url, user, pass)) {
            conn.setAutoCommit(false);
            // Your transaction code here
            conn.commit();
        } catch (SQLException e) {
            // Rollback here
        }
    }
}`, hint: 'Two PreparedStatements: one UPDATE books SET available = false WHERE id = ?, one INSERT INTO borrowings (book_id, member_id, due_date) VALUES (?, ?, DATE_ADD(CURDATE(), INTERVAL 14 DAY)). If both succeed → commit. If either fails → rollback.' },
      { type: 'practice', id: 'ja6-p2', lang: 'java', title: 'Practice: Batch Insert', starter: `import java.sql.*;

public class BatchInsert {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/library_db", user="root", pass="";

        // 50 books to insert
        String[][] books = new String[50][2];
        for (int i = 0; i < 50; i++) {
            books[i][0] = "Book " + i;
            books[i][1] = "Author " + (i % 5);
        }

        try (Connection conn = DriverManager.getConnection(url, user, pass)) {
            String sql = "INSERT INTO books (title, author) VALUES (?, ?)";
            // TODO: Use PreparedStatement with addBatch/executeBatch
            // TODO: Time how long it takes vs individual inserts
        }
    }
}`, hint: 'PreparedStatement ps = conn.prepareStatement(sql). Loop: setString(1,title); setString(2,author); ps.addBatch(). After loop: int[] results = ps.executeBatch(). Print results.length.' },
      { type: 'practice', id: 'ja6-p3', lang: 'java', title: 'Practice: Transaction Rollback Test', starter: `import java.sql.*;

public class RollbackTest {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/library_db", user = "root", pass = "";
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url, user, pass);
            conn.setAutoCommit(false);

            // STEP 1: INSERT a book (this will be rolled back)
            // STEP 2: deliberately cause a failure — UPDATE a
            //         table that does NOT exist (e.g. nosuchtable)
            //         → SQLException thrown here

            conn.commit();  // never reached
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
            // TODO: rollback here
            // TODO: then SELECT COUNT(*) FROM books — is the
            //       book from STEP 1 there? (should be gone!)
        } finally {
            // TODO: restore auto-commit and close
        }
    }
}`, hint: 'conn.rollback() in catch. The INSERT from step 1 is undone because it was part of the same transaction. finally: if(conn!=null){ conn.setAutoCommit(true); conn.close(); }. This proves atomicity.' },
      { type: 'practice', id: 'ja6-p4', lang: 'java', title: 'Practice: Prompt State Debugger', starter: `// THINKING EXERCISE — answer in comments.

// You wrote this JDBC code and it throws SQLException:
//   String sql = "INSERT INTO books (title, author) VALUES ('Java', 'Gosling)";
//   // (notice: missing closing quote after Gosling)

// Q1: What is WRONG with the SQL string?

// Q2: If you typed the same broken SQL into the MySQL terminal,
//     what PROMPT would appear?  (mysql>, ->, '>, ">, or \\c?)

// Q3: What does the JDBC error message probably say?

// Q4: In the MySQL terminal, what two ways can you recover?
//     (finish the string + execute, OR cancel with \\c)

// Q5: Write the FIXED Java string. What does the Java string
//     need that the terminal version does not?
//     (hint: escaping — \\" inside a Java string)

// Q6: Why does Java need DOUBLE backslashes/escapes that MySQL
//     does not? (Java string rules vs raw SQL)`, hint: 'Q1: unclosed single quote. Q2: single-quote prompt. Q3: syntax error message. Q4: add the closing quote then a semicolon, or cancel with backslash-c. Q5: escape the inner quotes inside the Java string. Q6: Java strings use escaped quotes to include a quote character.' },
      { type: 'practice', id: 'ja6-p5', lang: 'java', title: 'Practice: Batch with Transaction', starter: `import java.sql.*;

public class BatchTxn {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/library_db", user = "root", pass = "";

        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url, user, pass);
            conn.setAutoCommit(false);  // all-or-nothing batch

            String sql = "INSERT INTO books (title, author) VALUES (?, ?)";
            PreparedStatement ps = conn.prepareStatement(sql);

            // TODO 1: add 10 books to the batch
            // TODO 2: executeBatch() — get int[] results
            // TODO 3: print the total rows inserted
            // TODO 4: commit()
        } catch (SQLException e) {
            System.out.println("Batch failed: " + e.getMessage());
            // TODO: rollback — NONE of the 10 books should exist
        } finally {
            // TODO: restore auto-commit, close
        }
    }
}`, hint: 'Loop 10x: setString + addBatch(). Then int[] r = ps.executeBatch(); sum r values. commit() after. If ANY batch item fails, rollback undoes ALL 10 — atomic batch.' },
    ],
    tasks: [
      { id: 'java-adv-d6-t1', text: 'Implement a transaction: book borrowing (decrement available + insert borrow record). Test commit and rollback paths.', tag: 'lab' },
      { id: 'java-adv-d6-t2', text: 'Write a batch insert program. Insert 100 rows using batch vs individual inserts. Compare execution time.', tag: 'drill' },
      { id: 'java-adv-d6-t3', text: 'Memorize the 5 MySQL prompt states. Practice \\c to cancel a broken query in the terminal.', tag: 'drill' },
      { id: 'java-adv-d6-t4', text: 'Final review: Write the complete JDBC boilerplate (driver → connect → execute → process → close) from memory.', tag: 'review' },
    ],
  },

  // ================================================================
  // DAY 7: Multithreading — Concurrent Programming
  // ================================================================
  {
    id: 'java-adv-d7', number: 7,
    title: 'Multithreading — Running Code in Parallel', duration: 90,
    topics: ['Thread', 'Runnable', 'Thread Lifecycle', 'start() vs run()', 'sleep()', 'join()', 'Daemon Threads'],
    blocks: [
      { type: 'callout', id: 'ja7-intro', calloutType: 'info', title: 'Doing Multiple Things at Once', content: '**Multithreading** lets your program execute multiple tasks **concurrently** - like downloading a file while updating a progress bar, or handling multiple client requests on a server. Today: creating threads, controlling their lifecycle, and understanding why `start()` and `run()` are NOT the same thing.' },
      { type: 'heading', id: 'ja7-what', level: 2, content: 'What Is a Thread?' },
      { type: 'paragraph', id: 'ja7-def', content: 'A thread is a **lightweight process** — a single sequence of execution within a program. Every Java program has at least one thread (the **main thread**). Multiple threads share the same memory space (heap) but have their own **stack** and **program counter**. This makes them lighter than full processes but introduces the risk of interference.' },
      { type: 'heading', id: 'ja7-create', level: 2, content: 'Two Ways to Create a Thread' },
      { type: 'code', id: 'ja7-create-code', lang: 'java', title: 'Thread Creation — Runnable (Preferred) vs Extending Thread', code: '// WAY 1: Implement Runnable (PREFERRED — more flexible)\nclass MyTask implements Runnable {\n    @Override\n    public void run() {\n        for (int i = 1; i <= 5; i++) {\n            System.out.println(Thread.currentThread().getName() + ": " + i);\n            try { Thread.sleep(500); } catch (InterruptedException e) { return; }\n        }\n    }\n}\n\npublic class ThreadDemo {\n    public static void main(String[] args) {\n        Thread t1 = new Thread(new MyTask(), "Worker-1");\n        Thread t2 = new Thread(new MyTask(), "Worker-2");\n        t1.start();  // start() — creates new thread, calls run() internally\n        t2.start();\n        // Output: interleaved! Worker-1: 1, Worker-2: 1, Worker-1: 2, ...\n    }\n}\n\n// WAY 2: Extend Thread (less flexible — you cannot extend anything else)\nclass MyThread extends Thread {\n    @Override\n    public void run() {\n        System.out.println("Thread running: " + getName());\n    }\n}\n// MyThread t = new MyThread(); t.start();' },
      { type: 'callout', id: 'ja7-start-vs-run', calloutType: 'warn', title: 'start() vs run() — The #1 Thread Mistake', content: '```java\nThread t = new Thread(myTask);\nt.run();   // ❌ WRONG — runs on CURRENT thread (main), NOT a new thread!\nt.start(); // ✅ CORRECT — creates actual OS thread, then calls run() on it\n```\n\n`run()` is just a method call. `start()` asks the JVM to create a new native thread and schedule `run()` on it. This is tested in EVERY exam and interview.' },
      { type: 'heading', id: 'ja7-lifecycle', level: 2, content: 'Thread Lifecycle — The 5 States' },
      { type: 'table', id: 'ja7-life-table', headers: ['State', 'Description', 'When It Enters'], rows: [
        ['NEW', 'Thread object created, not started yet', 'new Thread(task)'],
        ['RUNNABLE', 'Ready to run or currently running', 't.start()'],
        ['BLOCKED', 'Waiting for a lock (synchronized)', 'Trying to enter synchronized block held by another thread'],
        ['WAITING / TIMED_WAITING', 'Waiting for another thread (indefinite / timed)', 'join(), wait(), sleep(ms)'],
        ['TERMINATED', 'Thread has completed execution', 'run() method finishes or uncaught exception'],
      ] },
      { type: 'code', id: 'ja7-life-code', lang: 'java', title: 'Checking Thread State', code: 'Thread t = new Thread(() -> {\n    try { Thread.sleep(2000); } catch (InterruptedException e) {}\n});\nSystem.out.println(t.getState());  // NEW\nt.start();\nSystem.out.println(t.getState());  // RUNNABLE (or TIMED_WAITING if it reached sleep)\nThread.sleep(100);  // give it time to reach sleep\nSystem.out.println(t.getState());  // TIMED_WAITING\nt.join();  // wait for t to finish\nSystem.out.println(t.getState());  // TERMINATED' },
      { type: 'heading', id: 'ja7-sleep-join', level: 2, content: 'sleep() and join() — Controlling Threads' },
      { type: 'code', id: 'ja7-sleep-code', lang: 'java', title: 'sleep and join in Action', code: '// sleep(ms): pause current thread for ms milliseconds\nSystem.out.println("Starting work...");\nThread.sleep(2000);  // pause 2 seconds — checked exception!\nSystem.out.println("2 seconds later...");\n\n// join(): wait for another thread to DIE\nThread downloader = new Thread(() -> {\n    System.out.println("Downloading...");\n    try { Thread.sleep(3000); } catch (InterruptedException e) {}\n    System.out.println("Download complete!");\n});\ndownloader.start();\n\ndownloader.join();  // MAIN thread WAITS here until downloader finishes\nSystem.out.println("Now processing downloaded data...");\n// Without join: "Processing" would print BEFORE download completes!' },
      { type: 'heading', id: 'ja7-daemon', level: 2, content: 'Daemon Threads — Service Threads' },
      { type: 'code', id: 'ja7-daemon-code', lang: 'java', title: 'Daemon Threads', code: '// Daemon thread: JVM exits when ONLY daemon threads remain\nThread logger = new Thread(() -> {\n    while (true) {\n        System.out.println("Heartbeat at " + System.currentTimeMillis());\n        try { Thread.sleep(1000); } catch (InterruptedException e) { break; }\n    }\n});\nlogger.setDaemon(true);  // mark as daemon BEFORE starting!\nlogger.start();\n\nThread.sleep(5000);  // main sleeps 5 seconds\nSystem.out.println("Main exiting...");\n// logger dies automatically when main exits — no need to stop it\n\n// setDaemon() MUST be called BEFORE start(). After start() → IllegalThreadStateException.' },
      { type: 'callout', id: 'ja7-thread-vs-runnable', calloutType: 'tip', title: 'Thread vs Runnable - Which Should You Use?', content: '**ALWAYS use Runnable.** Here is why:\n\n1. Runnable is a **task** - clean separation of work from the thread mechanism.\n2. If you extend Thread, you CANNOT extend anything else (Java single inheritance).\n3. Runnable can be submitted to **ExecutorService** - the modern way to manage threads.\n4. Runnable works with lambdas: `new Thread(() -> doWork())`.\n\nOnly extend Thread if you need to override Thread behavior itself - which is almost never.' },
      { type: 'callout', id: 'ja7-d1', calloutType: 'doubt', title: 'How many threads should I create? It is faster with more threads, right?', content: '**WRONG.** More threads does not mean faster. The CPU can only run N threads simultaneously (N = number of cores). Beyond that, threads compete for CPU time and context-switching overhead EATS your performance.\n\n**Rule of thumb for CPU-bound tasks**: threads = number of cores (`Runtime.getRuntime().availableProcessors()`).\n\n**For I/O-bound tasks** (DB queries, HTTP calls): threads = cores × 2-4 (because threads spend most time waiting, not computing).\n\nCreating 1000 threads for 4 cores = SLOWER than using 4 threads. Use **ExecutorService** with a thread pool instead of creating threads manually.' },
      { type: 'callout', id: 'ja7-exam', calloutType: 'exam', title: 'Exam Alert - CE-3 Focus', content: '1. **start() vs run()** - start() creates new thread. run() runs on current thread. #1 MCQ.\n2. **Thread states**: NEW → RUNNABLE → (BLOCKED/WAITING/TIMED_WAITING) → TERMINATED.\n3. **sleep() vs join()**: sleep pauses itself. join waits for another thread to die.\n4. **Daemon threads die when only daemon threads remain.** JVM does not wait for them.\n5. **Runnable > Thread** - prefer composition over inheritance (design principle).' },
      { type: 'callout', id: 'ja7-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Threads share the same **heap** (objects) but have separate **stacks** (local variables) — this is the same heap/stack concept from Java Day 1. try-catch for InterruptedException (Java Day 12). Runnable is a functional interface → lambdas (Java Day 20). Thread safety requires synchronized (tomorrow — Day 8).' },
      { type: 'table', id: 'ja7-qref', headers: ['Concept', 'Key Point'], rows: [
        ['Create thread', 'new Thread(runnable).start() — use Runnable, not extend Thread'],
        ['start() vs run()', 'start() = new OS thread + calls run(). run() = just a method on current thread.'],
        ['sleep(ms)', 'Pauses CURRENT thread. Throws InterruptedException (checked).'],
        ['join()', 'CURRENT thread WAITS until target thread DIES. Throws InterruptedException.'],
        ['Daemon', 'JVM exits when only daemon threads remain. Set BEFORE start().'],
        ['getState()', 'Returns Thread.State enum: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.'],
      ] },
      { type: 'quiz', id: 'ja7-quiz', title: 'Day 7 Quiz', questions: [
        { id: 'ja7-q1', question: 'What happens if you call run() instead of start() on a Thread?', options: ['Same as start()', 'run() executes on the CURRENT thread — no new thread created', 'IllegalStateException', 'Compile error'], correctIndex: 1, explanation: 'run() is just a normal method call. It executes on whatever thread called it. Only start() creates a new OS thread and asynchronously executes run().' },
        { id: 'ja7-q2', question: 'What does thread.join() do?', options: ['Merges two threads into one', 'Causes the CALLING thread to wait until the target thread finishes', 'Kills the target thread', 'Pauses the target thread'], correctIndex: 1, explanation: 'join() makes the CURRENT thread WAIT until the thread it is called on TERMINATES. Essential for sequencing: "finish download, then process."' },
        { id: 'ja7-q3', question: 'What happens to daemon threads when the main thread exits?', options: ['They keep running forever', 'The JVM shuts down — they stop', 'They become user threads', 'An exception is thrown'], correctIndex: 1, explanation: 'JVM exits when only daemon threads remain. It does NOT wait for them to finish. This is why daemon threads are used for background tasks (logging, monitoring) — they should not prevent shutdown.' },
      ] },
      { type: 'flashcard', id: 'ja7-cards', title: 'Day 7 Flashcards', cards: [
        { id: 'ja7-f1', front: 'start() vs run() — critical difference?', back: 'start() = creates NEW native thread + JVM calls run() on it. run() = normal method call on CURRENT thread. Calling run() directly defeats the purpose — no concurrency. ALWAYS use start().', hint: 'New thread vs current thread...' },
        { id: 'ja7-f2', front: 'sleep() vs join() — what does each do?', back: 'sleep(ms): pauses the CURRENT thread for ms milliseconds. join(): CURRENT thread waits until target thread finishes (TERMINATED). Both throw InterruptedException. sleep = timed self-pause. join = wait for another.', hint: 'Self-pause vs wait for other...' },
        { id: 'ja7-f3', front: 'Thread lifecycle states?', back: 'NEW (created, not started) → RUNNABLE (running or ready) → BLOCKED (waiting for lock) / WAITING (join, wait) / TIMED_WAITING (sleep, timed join) → TERMINATED (finished or exception). Check with getState().', hint: '5 states, from birth to death...' },
      ] },
      { type: 'practice', id: 'ja7-p1', lang: 'java', title: 'Practice: Multi-Threaded Download Simulator', starter: 'class DownloadTask implements Runnable {\n    private final String filename;\n    DownloadTask(String f) { filename = f; }\n    @Override\n    public void run() {\n        System.out.println("Starting download: " + filename);\n        try {\n            for (int i = 10; i <= 100; i += 10) {\n                Thread.sleep(300);  // simulate download\n                System.out.printf("%s: %d%% complete%n", filename, i);\n            }\n        } catch (InterruptedException e) {\n            System.out.println(filename + " download interrupted!");\n            return;\n        }\n        System.out.println(filename + " download COMPLETE!");\n    }\n}\npublic class DownloadSim {\n    public static void main(String[] args) throws InterruptedException {\n        Thread t1 = new Thread(new DownloadTask("notes.pdf"));\n        Thread t2 = new Thread(new DownloadTask("video.mp4"));\n        Thread t3 = new Thread(new DownloadTask("slides.pptx"));\n        // TODO: Start all 3 threads\n        // TODO: Use join() to wait for ALL to finish\n        // TODO: Print "All downloads complete!" after all finish\n    }\n}', hint: 't1.start(); t2.start(); t3.start(); t1.join(); t2.join(); t3.join(); System.out.println("All downloads complete!"); Try removing join() — see the message appear BEFORE downloads finish.' },
      { type: 'practice', id: 'ja7-p2', lang: 'java', title: 'Practice: Thread State Monitor', starter: 'public class StateMonitor {\n    public static void main(String[] args) throws InterruptedException {\n        Thread worker = new Thread(() -> {\n            try { Thread.sleep(3000); } catch (InterruptedException e) {}\n        }, "Worker");\n\n        System.out.println("State after new: " + worker.getState());\n        worker.start();\n        System.out.println("State after start: " + worker.getState());\n        // TODO: Print state every 500ms until TERMINATED\n        // TODO: Use join() to wait, then print final state\n    }\n}', hint: 'while(worker.isAlive()) { System.out.println(worker.getState()); Thread.sleep(500); } System.out.println("Final: " + worker.getState()); Observe NEW → RUNNABLE → TIMED_WAITING → TERMINATED.' },
      { type: 'practice', id: 'ja7-p3', lang: 'java', title: 'Practice: Race the Threads', starter: 'public class RaceThreads {\n    public static void main(String[] args) throws InterruptedException {\n        // TODO 1: create 3 threads, each printing its name + a\n        //         number 1-10 with a 100ms sleep between prints\n        // TODO 2: start all three — observe INTERLEAVED output\n        // TODO 3: call join() on all three before printing "DONE"\n        // TODO 4: now change ONE thread to call run() instead of\n        //         start() — what changes? (answer in a comment)\n    }\n\n    // TODO 5: write the Runnable task (use a lambda!)\n    //         prints: Thread.currentThread().getName() + ": " + i\n}', hint: 'Runnable task = () -> { for(int i=1;i<=10;i++){ System.out.println(Thread.currentThread().getName()+" : "+i); Thread.sleep(100); } }. run() instead of start() → runs on MAIN thread, sequentially, not interleaved.' },
      { type: 'practice', id: 'ja7-p4', lang: 'java', title: 'Practice: Daemon Logger', starter: 'public class DaemonLogger {\n    public static void main(String[] args) throws InterruptedException {\n        // TODO 1: create a daemon thread that prints a heartbeat\n        //         every second: "heartbeat at <timestamp>"\n        //         (use System.currentTimeMillis() for timestamp)\n        // TODO 2: setDaemon(true) BEFORE start()\n        // TODO 3: main thread sleeps 4 seconds, prints "Main done"\n        // TODO 4: observe — does the logger keep printing after\n        //         main exits? (it should NOT — daemon dies)\n        // TODO 5: remove setDaemon(true) and re-run — now the\n        //         program NEVER exits! why? (answer in comment)\n    }\n}', hint: 'Thread logger = new Thread(() -> { while(true) { System.out.println("heartbeat at " + System.currentTimeMillis()); Thread.sleep(1000); } });. logger.setDaemon(true); logger.start();. Non-daemon infinite loop = JVM never exits.' },
      { type: 'practice', id: 'ja7-p5', lang: 'java', title: 'Practice: Sequential vs Concurrent', starter: 'public class SeqVsConcurrent {\n    public static void main(String[] args) throws InterruptedException {\n        // Task: print "Task X starting..." sleep 500ms print "done"\n        // (write it as a Runnable lambda once, reuse it)\n\n        // TODO 1: SEQUENTIAL — call task.run() 5 times directly.\n        //         Time it: should be ~2.5 seconds.\n\n        // TODO 2: CONCURRENT — create 5 threads, start all,\n        //         join all. Time it: should be ~0.5 seconds.\n\n        // TODO 3: print both timings and the speedup ratio\n\n        // TODO 4: in comments: why is concurrent ~5x faster here?\n        //         (threads sleep in parallel)\n    }\n}', hint: 'long start = System.currentTimeMillis(); ... long end = ...; ratio = seqMs / concMs. Threads sleep simultaneously → wall-clock time ≈ single sleep, not 5×.' },
    ],
    tasks: [
      { id: 'java-adv-d7-t1', text: 'Create 3 threads using Runnable. Each prints numbers 1-5 with their name. Observe interleaved output.', tag: 'lab' },
      { id: 'java-adv-d7-t2', text: 'Demonstrate join(): start a "download" thread. Main thread joins it before printing "Processing...".', tag: 'lab' },
      { id: 'java-adv-d7-t3', text: 'Create a daemon logger thread that prints a heartbeat every second. Prove it dies when main exits.', tag: 'drill' },
      { id: 'java-adv-d7-t4', text: 'Prove start() vs run(): call run() directly and show output is NOT interleaved (sequential). Then use start().', tag: 'drill' },
      { id: 'java-adv-d7-t5', text: 'Explain: Why prefer Runnable over extending Thread? What does daemon thread mean?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 8: Synchronization & Thread Safety
  // ================================================================
  {
    id: 'java-adv-d8', number: 8,
    title: 'Synchronization & Thread Safety', duration: 90,
    topics: ['Race Condition', 'synchronized', 'volatile', 'wait() / notify()', 'ExecutorService', 'Thread Pool'],
    blocks: [
      { type: 'callout', id: 'ja8-intro', calloutType: 'info', title: 'The Dark Side of Concurrency', content: 'Multiple threads sharing data = **race conditions**. Two threads read the same counter, both increment, both write back — one increment is LOST. Today: use `synchronized`, `volatile`, `wait()/notify()`, and the modern **ExecutorService** for thread pools. These are CE-3 and viva essentials.' },
      { type: 'heading', id: 'ja8-race', level: 2, content: 'The Race Condition — Why Threads Are Dangerous' },
      { type: 'code', id: 'ja8-race-code', lang: 'java', title: 'Race Condition Demo', code: 'class Counter {\n    private int count = 0;\n    // ❌ NOT thread-safe!\n    public void increment() { count++; }\n    // count++ is THREE operations: read, increment, write\n    // Thread1 reads 0, Thread2 reads 0,\n    // Thread1 writes 1, Thread2 writes 1 — lost an increment!\n    public int get() { return count; }\n}\n\npublic class RaceDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Counter c = new Counter();\n        Thread[] threads = new Thread[1000];\n        for (int i = 0; i < 1000; i++) {\n            threads[i] = new Thread(() -> {\n                for (int j = 0; j < 1000; j++) c.increment();\n            });\n            threads[i].start();\n        }\n        for (Thread t : threads) t.join();\n        System.out.println("Expected: 1,000,000. Actual: " + c.get());\n        // Expect LESS than 1,000,000 — increments were lost!\n    }\n}' },
      { type: 'heading', id: 'ja8-synchronized', level: 2, content: 'synchronized — The Lock' },
      { type: 'code', id: 'ja8-sync-code', lang: 'java', title: 'synchronized Methods and Blocks', code: 'class SafeCounter {\n    private int count = 0;\n\n    // synchronized METHOD — locks \'this\' object\n    public synchronized void increment() {\n        count++;  // now atomic! only one thread at a time\n    }\n\n    public synchronized int get() { return count; }\n}\n\n// synchronized BLOCK — locks any object (finer control)\nclass FineGrainedCounter {\n    private int countA = 0, countB = 0;\n    private final Object lockA = new Object();\n    private final Object lockB = new Object();\n\n    public void incrementA() {\n        synchronized (lockA) { countA++; }  // only blocks other incrementA calls\n    }\n    public void incrementB() {\n        synchronized (lockB) { countB++; }  // does NOT block incrementA!\n    }\n    // Two unrelated operations do not block each other = better concurrency' },
      { type: 'callout', id: 'ja8-sync-rules', calloutType: 'warn', title: 'synchronized Rules', content: '1. **Only one thread** can hold a lock at a time. Others BLOCK until lock is released.\n2. **synchronized method** locks `this`. All synchronized methods on the same object block each other.\n3. **synchronized block** locks a specific object. Finer control = better performance.\n4. **static synchronized** locks the Class object, not instance.\n5. **Do NOT synchronize on String literals or autoboxed objects** — they are cached/shared, causing deadlocks.\n6. **Keep synchronized blocks SHORT** — hold locks for minimum time.' },
      { type: 'heading', id: 'ja8-volatile', level: 2, content: 'volatile — Visibility, Not Atomicity' },
      { type: 'code', id: 'ja8-volatile-code', lang: 'java', title: 'volatile Keyword', code: 'class Flag {\n    // Without volatile: Thread may cache flag = true FOREVER (CPU cache)\n    // With volatile: changes visible to ALL threads immediately\n    private volatile boolean running = true;\n\n    public void stop() { running = false; }\n\n    public void work() {\n        while (running) {  // reads from MAIN memory every time\n            // do work\n        }\n    }\n}\n\n// volatile guarantees:\n// ✅ Visibility: changes are seen by all threads\n// ✅ Happens-before: write is visible before subsequent reads\n// ❌ Atomicity: count++ is NOT atomic even with volatile!\n//    (count++ is read-modify-write — three operations)' },
      { type: 'callout', id: 'ja8-volatile-vs-sync', calloutType: 'tip', title: 'volatile vs synchronized — When to Use Which', content: '**volatile** — use for flags/state that one thread writes and others read. Visibility only. Example: `volatile boolean running = true`.\n\n**synchronized** — use when multiple threads WRITE shared data. Provides BOTH atomicity AND visibility. Example: incrementing a counter, updating a collection.\n\n**volatile is NOT a substitute for synchronized.** It does NOT make compound operations atomic. `volatile` + `count++` still has race conditions.' },
      { type: 'heading', id: 'ja8-wait-notify', level: 2, content: 'wait(), notify(), notifyAll() — Thread Coordination' },
      { type: 'code', id: 'ja8-wn-code', lang: 'java', title: 'Producer-Consumer Pattern', code: 'class SharedBuffer {\n    private int data;\n    private boolean available = false;\n\n    public synchronized void produce(int value) throws InterruptedException {\n        while (available) wait();  // wait until consumer consumes\n        data = value;\n        available = true;\n        System.out.println("Produced: " + value);\n        notify();  // wake up ONE waiting consumer\n    }\n\n    public synchronized int consume() throws InterruptedException {\n        while (!available) wait();  // wait until producer produces\n        available = false;\n        System.out.println("Consumed: " + data);\n        notify();  // wake up ONE waiting producer\n        return data;\n    }\n}\n// wait(), notify(), notifyAll() MUST be called inside synchronized block\n// They belong to Object — every object has a wait-set' },
      { type: 'callout', id: 'ja8-wn-rules', calloutType: 'warn', title: 'wait/notify Rules — Get These Wrong and Fail', content: '1. **MUST be called inside synchronized** — otherwise IllegalMonitorStateException.\n2. **ALWAYS use while() not if()** for the wait condition — spurious wakeups happen.\n3. **wait() releases the lock**, sleep() does NOT. This is the key difference.\n4. **notify() wakes ONE random waiting thread. notifyAll() wakes ALL.**\n5. **Prefer notifyAll()** unless you are absolutely sure only one thread needs waking.' },
      { type: 'heading', id: 'ja8-executor', level: 2, content: 'ExecutorService — The Modern Way (No More new Thread())' },
      { type: 'code', id: 'ja8-exec-code', lang: 'java', title: 'Thread Pools with ExecutorService', code: 'import java.util.concurrent.*;\n\n// Fixed thread pool — reuses threads! No creating/destroying overhead.\nExecutorService pool = Executors.newFixedThreadPool(4);\n\n// Submit tasks\nfor (int i = 0; i < 10; i++) {\n    final int taskId = i;\n    pool.submit(() -> {\n        System.out.println("Task " + taskId + " on " + Thread.currentThread().getName());\n        try { Thread.sleep(1000); } catch (InterruptedException e) {}\n    });\n}\n\npool.shutdown();  // no new tasks. Finish running tasks then stop.\n// pool.shutdownNow();  // attempt to stop all running tasks immediately\n\n// Wait for all tasks to complete (max 60 seconds)\nif (pool.awaitTermination(60, TimeUnit.SECONDS)) {\n    System.out.println("All tasks completed!");\n} else {\n    pool.shutdownNow();  // force shutdown if timeout\n}' },
      { type: 'table', id: 'ja8-pool-table', headers: ['Method', 'Creates', 'Use Case'], rows: [
        ['newFixedThreadPool(n)', 'Fixed pool of n threads', 'CPU-bound tasks. n = number of cores.'],
        ['newCachedThreadPool()', 'Creates new threads as needed, reuses idle ones', 'Short-lived async tasks. Unbounded growth risk.'],
        ['newSingleThreadExecutor()', 'Single worker thread with unbounded queue', 'Tasks must execute sequentially (order matters).'],
        ['newScheduledThreadPool(n)', 'Pool that can schedule delayed/periodic tasks', 'Heartbeats, retries, cron-like tasks.'],
      ] },
      { type: 'callout', id: 'ja8-d1', calloutType: 'doubt', title: 'Why use ExecutorService instead of creating Threads manually?', content: '1. **Reusability** — threads are expensive to create/destroy. A pool reuses them.\n2. **Resource control** — a fixed pool limits concurrent threads, preventing system overload.\n3. **Task queueing** — submit tasks without worrying about thread lifecycle.\n4. **Future/Callable** — get results back from tasks (Callable<T> returns a value).\n5. **Graceful shutdown** — `shutdown()` + `awaitTermination()` for clean exits.\n\nIn production code, NEVER use `new Thread().start()` directly. Always use ExecutorService.' },
      { type: 'callout', id: 'ja8-exam', calloutType: 'exam', title: 'Exam Alert — CE-3 & Viva Focus', content: '1. **Race condition** — multiple threads read/write shared data without synchronization.\n2. **synchronized** — provides mutual exclusion (only 1 thread in the critical section).\n3. **wait/notify** — MUST be called from synchronized. `wait()` releases the lock, `sleep()` does NOT.\n4. **volatile use case** — visibility of flags. NOT for compound actions (`count++` needs synchronized).\n5. **ExecutorService advantages** — thread pooling, task submission, Futures, proper shutdown.\n6. **CE-3 10-mark coding** — producer-consumer with wait/notify OR synchronized counter demo.' },
      { type: 'callout', id: 'ja8-bridge', calloutType: 'bridge', title: 'Connect the Dots — Your Complete Java Journey', content: 'synchronized uses intrinsic locks — the same Object monitor used by wait/notify. ExecutorService uses Runnable — the same interface from Day 7. Thread pools are used in JDBC connection pooling (Day 6) — same concept, different resource. The synchronized/volatile distinction maps to database ACID Isolation.\n\nYour Semester 3 Java syllabus, in order:\n\n- **Java 20-day** — core language + OOP + Collections + Modern Java.\n- **DBMS 10-day** — SQL + DDL/DML + views + indexes + triggers.\n- **SDE 10-day** — Python data stack + Big Data + visualization.\n- **Advanced Java 8-day** — JDBC + Transactions + Multithreading.\n\nThese four courses cover your ENTIRE AIML Semester 3 syllabus. The project (JDBC + Swing + MySQL) integrates everything.' },
      { type: 'table', id: 'ja8-qref', headers: ['Concept', 'Key Point'], rows: [
        ['Race condition', 'Multiple threads + shared mutable data + no synchronization → lost updates.'],
        ['synchronized method', 'Locks `this`. Only one thread executes any synchronized method on the same object.'],
        ['synchronized block', 'Locks a specified object. Finer-grained than a method. `synchronized(lock) { ... }`'],
        ['volatile', 'Visibility guarantee only. Reads always from main memory. NOT atomic for compound ops.'],
        ['wait()', 'Releases the lock, waits for notify. INSIDE synchronized. Always in a while() loop.'],
        ['notify()/notifyAll()', 'Wakes waiting thread(s). notifyAll() is safer — avoids missed signals.'],
        ['ExecutorService', 'Thread pool. submit(Runnable/Callable). shutdown() + awaitTermination().'],
      ] },
      { type: 'quiz', id: 'ja8-quiz', title: 'Day 8 Quiz', questions: [
        { id: 'ja8-q1', question: 'What is a race condition?', options: ['Two threads running in a race', 'Multiple threads accessing shared data unsynchronized, causing unpredictable results', 'A thread that runs faster than others', 'A thread priority conflict'], correctIndex: 1, explanation: 'Race condition = outcome depends on thread timing. Without synchronization, interleaved reads/writes produce incorrect results (lost increments, corrupted data).' },
        { id: 'ja8-q2', question: 'Does volatile make count++ thread-safe?', options: ['Yes — volatile makes all operations atomic', 'No — volatile only guarantees visibility, not atomicity. count++ is 3 operations.', 'Only on 64-bit JVMs', 'Only for primitive types'], correctIndex: 1, explanation: 'volatile guarantees visibility (reads see latest value) but NOT atomicity. count++ = read + increment + write. Between read and write, another thread can also read the old value.' },
        { id: 'ja8-q3', question: 'Why must wait() be called inside a synchronized block?', options: ['Performance optimization', 'Because wait() releases and reacquires the object\'s monitor lock', 'It is a historical Java bug', 'Because notify() is also synchronized'], correctIndex: 1, explanation: 'wait() temporarily releases the lock so other threads can enter synchronized blocks and call notify(). It reacquires the lock before returning. Without holding the lock, wait() makes no sense — you might miss the notification.' },
      ] },
      { type: 'flashcard', id: 'ja8-cards', title: 'Day 8 Flashcards', cards: [
        { id: 'ja8-f1', front: 'synchronized — what does it lock?', back: 'synchronized METHOD locks `this` object. synchronized STATIC method locks Class object. synchronized BLOCK locks the specified object. Only ONE thread can hold any given lock at a time. Others BLOCK until release.', hint: 'Lock on object...' },
        { id: 'ja8-f2', front: 'volatile — what does it guarantee and NOT guarantee?', back: 'GUARANTEES visibility: writes are immediately visible to ALL threads. GUARANTEES happens-before ordering. Does NOT guarantee atomicity. count++ with volatile still has race conditions. Use for flags, not counters.', hint: 'Visibility yes, atomicity no...' },
        { id: 'ja8-f3', front: 'wait() vs sleep() — key differences?', back: 'wait() releases the LOCK (allows others in). sleep() KEEPS the lock. wait() must be in synchronized. wait() is on Object, sleep() on Thread. wait() is woken by notify(). sleep() is woken by timeout or interrupt.', hint: 'Lock release vs hold...' },
        { id: 'ja8-f4', front: 'ExecutorService — why and how?', back: 'Why: thread pooling = reuse threads, control concurrency, get Future results, graceful shutdown. How: Executors.newFixedThreadPool(n); pool.submit(task); pool.shutdown(); pool.awaitTermination(timeout, unit);', hint: 'Thread pool, not manual threads...' },
      ] },
      { type: 'practice', id: 'ja8-p1', lang: 'java', title: 'Practice: Thread-Safe Bank Transfer', starter: 'class BankAccount {\n    private double balance;\n    BankAccount(double b) { balance = b; }\n\n    // TODO: Make deposit() and withdraw() thread-safe with synchronized\n    public void deposit(double amount) {\n        balance += amount;\n        System.out.println(Thread.currentThread().getName() + " deposited " + amount + ". Balance: " + balance);\n    }\n    public void withdraw(double amount) {\n        if (balance >= amount) {\n            balance -= amount;\n            System.out.println(Thread.currentThread().getName() + " withdrew " + amount + ". Balance: " + balance);\n        }\n    }\n    public double getBalance() { return balance; }\n}\n\npublic class BankTest {\n    public static void main(String[] args) throws InterruptedException {\n        BankAccount acc = new BankAccount(10000);\n        // TODO: Start 5 deposit threads and 5 withdraw threads (each does 100 ops of 100 each)\n        // TODO: Join all, print final balance. Should be 10000 (net zero change).\n    }\n}', hint: 'Add synchronized to deposit(), withdraw(), getBalance(). Net zero: 5 threads × 100 × 100 = +50K deposits. 5 threads × 100 × 100 = -50K withdrawals. Final = 10K. Without synchronized: observe wrong values.' },
      { type: 'practice', id: 'ja8-p2', lang: 'java', title: 'Practice: Thread Pool File Processor', starter: 'import java.util.concurrent.*;\n\npublic class FileProcessor {\n    public static void main(String[] args) throws InterruptedException {\n        String[] files = {"a.txt", "b.txt", "c.txt", "d.txt", "e.txt",\n                          "f.txt", "g.txt", "h.txt", "i.txt", "j.txt"};\n\n        ExecutorService pool = Executors.newFixedThreadPool(3);\n        // TODO: Submit a task for each file (print "Processing <file>" with 2s sleep)\n        // TODO: Shutdown pool, wait max 30s for completion\n        // TODO: Print summary: processed X out of Y files\n    }\n}', hint: 'for(String f : files) pool.submit(() -> { System.out.println("Processing " + f); Thread.sleep(2000); System.out.println("Done: " + f); }); pool.shutdown(); pool.awaitTermination(30, TimeUnit.SECONDS); Notice only 3 process at a time.' },
      { type: 'practice', id: 'ja8-p3', lang: 'java', title: 'Practice: Volatile Flag Demo', starter: 'public class VolatileDemo {\n    // TODO 1: declare a boolean flag WITHOUT volatile\n    //         (private static boolean running = true;)\n\n    public static void main(String[] args) throws InterruptedException {\n        // Worker thread: loops while running is true\n        Thread worker = new Thread(() -> {\n            long count = 0;\n            while (running) {\n                count++;\n            }\n            System.out.println("Worker stopped after " + count + " iterations");\n        });\n        worker.start();\n\n        Thread.sleep(1000);\n        running = false;  // set the flag\n        System.out.println("Flag set to false, waiting...");\n        worker.join(2000);  // give it 2s to stop\n\n        // TODO 2: does the worker stop? (with and without volatile)\n        // TODO 3: add volatile to the flag and re-run\n        // TODO 4: explain the difference in comments\n        //         (CPU cache vs main memory visibility!)\n    }\n}', hint: 'WITHOUT volatile: worker may cache `running=true` in CPU cache forever — never stops. WITH volatile: reads always hit main memory — stops within ~1s. This is the classic volatile use case.' },
      { type: 'practice', id: 'ja8-p4', lang: 'java', title: 'Practice: Producer-Consumer', starter: 'import java.util.LinkedList;\n\npublic class ProducerConsumer {\n    // Shared buffer between producer and consumer threads\n    private static final LinkedList<Integer> buffer = new LinkedList<>();\n    private static final int CAPACITY = 5;\n\n    public static void main(String[] args) {\n        // TODO 1: producer thread — adds 1..10 to the buffer\n        //         synchronized on buffer; wait() if full; notifyAll()\n        // TODO 2: consumer thread — removes and prints from buffer\n        //         synchronized on buffer; wait() if empty; notifyAll()\n        // TODO 3: start both, join both\n        // TODO 4: why wait() inside while() loop? (spurious wakeups)\n    }\n}', hint: 'Producer: synchronized(buffer){ while(buffer.size()==CAPACITY) buffer.wait(); buffer.add(i); buffer.notifyAll(); }. Consumer: while(buffer.isEmpty()) buffer.wait(); int v=buffer.removeFirst(); buffer.notifyAll();. while() re-checks the condition after waking.' },
      { type: 'practice', id: 'ja8-p5', lang: 'java', title: 'Practice: Callable and Future', starter: 'import java.util.concurrent.*;\n\npublic class CallableDemo {\n    public static void main(String[] args) throws Exception {\n        ExecutorService pool = Executors.newFixedThreadPool(2);\n\n        // TODO 1: submit a Callable<Integer> that computes the\n        //         sum 1..100 and RETURNS it (use a lambda)\n        Future<Integer> future = pool.submit(() -> {\n            int s = 0;\n            for (int i = 1; i <= 100; i++) s += i;\n            return s;\n        });\n\n        // TODO 2: get the result (blocks until done)\n        int result = future.get();\n        System.out.println("Sum 1..100 = " + result);  // 5050\n\n        // TODO 3: submit 3 Callables, collect all 3 Futures\n        // TODO 4: shutdown the pool\n        // TODO 5: in comments: Callable vs Runnable difference\n    }\n}', hint: 'future.get() blocks the calling thread until the Callable finishes. Callable<V> returns a value (via Future), Runnable returns void. Sum 1..100 = 5050. Always shutdown() the pool.' },
    ],
    tasks: [
      { id: 'java-adv-d8-t1', text: 'Race condition demo: counter without synchronized. Run 1000 threads incrementing 1000 times. Show lost counts.', tag: 'lab' },
      { id: 'java-adv-d8-t2', text: 'Fix the counter with synchronized. Verify 1,000,000 exactly. Then try synchronized block for finer control.', tag: 'lab' },
      { id: 'java-adv-d8-t3', text: 'Implement producer-consumer with wait/notify. Produce 1-10, consume and print. Use while() not if().', tag: 'drill' },
      { id: 'java-adv-d8-t4', text: 'ExecutorService: process 10 tasks with a fixed pool of 3 threads. Shutdown and await termination.', tag: 'lab' },
      { id: 'java-adv-d8-t5', text: 'Explain: volatile vs synchronized. Can volatile replace synchronized for count++? Why is wait() called in while()?', tag: 'mcq' },
    ],
  },
];
