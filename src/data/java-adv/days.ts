import type { Day } from '../../types';

export const javaAdvDays: Day[] = [
  // ======== DAY 1: Course Administration & Evaluation ========
  {
    id: 'java-adv-d1', number: 1,
    title: 'Course Administration & Evaluation Structure', duration: 90,
    topics: ['Academic Schedule', 'CE-1', 'CE-2', 'CE-3', 'Internal Rubrics'],
    blocks: [
      { type: 'callout', id: 'ja1-intro', calloutType: 'info', title: 'The Big Picture — How This Course Is Graded', content: 'Before writing a single line of JDBC code, you need to understand **exactly how you will be evaluated**. Advanced Java (24CAI0202) has a different pattern from the core Java course — three Continuous Evaluations spread across the semester, plus a project. Today: the exam blueprint.' },
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
      { type: 'callout', id: 'ja1-ce1-breakdown', calloutType: 'exam', title: 'CE-1 Focus (10 Oct — 17 days from course start)', content: 'CE-1 is the FIRST assessment and covers only the SQL + JDBC basics. **5 MCQs (5 marks) + 3 coding tasks (15 marks).**\n\nWhat to expect:\n1. MCQ: SQL syntax, JDBC driver loading, DriverManager.getConnection() parameters.\n2. Coding Task 1 (5 marks): Write SQL CREATE TABLE or SELECT with WHERE.\n3. Coding Task 2 (5 marks): Write a JDBC connection snippet (load driver, get connection).\n4. Coding Task 3 (5 marks): Execute a simple query and print results.\n\n**Strategy**: The 5-mark coding questions are bite-sized — focus on getting the JDBC boilerplate code into muscle memory.' },
      { type: 'heading', id: 'ja1-75', level: 2, content: 'The 75% Attendance Rule — Non-Negotiable' },
      { type: 'paragraph', id: 'ja1-attendance', content: 'University guidelines require a **minimum of 75% attendance** to be eligible for the End Semester Examination. This applies to ALL subjects, not just Java. At 3 classes per week over ~11 weeks, you can miss at most ~8 classes. Track your attendance. Falling below 75% means you cannot sit for the End Term exam — regardless of your internal marks.' },
      { type: 'callout', id: 'ja1-d1', calloutType: 'doubt', title: 'How is the project evaluated? Is it part of CE marks?', content: 'The project is evaluated **separately** from the CEs. It typically includes:\n1. **Project proposal** (submitted early): Problem statement + team details + tech stack.\n2. **Mid-review**: Progress check. Working prototype expected.\n3. **Final demo + viva**: Working application + individual questioning.\n4. **Project report**: Document with diagrams, code snippets, screenshots.\n\nThe project often integrates JDBC + GUI (Swing/JavaFX) + multithreading. Start brainstorming your project idea NOW — the best projects are the ones with time to iterate.' },
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
        '**Student Management System**: CRUD for students, courses, enrollments. Generate mark sheets. The classic — but do it WELL with search, filters, and reports.',
        '**Library Management System**: Books, members, borrow/return tracking. Due date alerts. Fine calculation. Good for demonstrating transaction management.',
        '**Hospital Appointment Scheduler**: Doctors, patients, appointments, prescriptions. Slot management with conflict detection. Multithreading for concurrent bookings.',
        '**E-commerce Order Tracker**: Products, customers, orders, inventory. Auto-decrement stock on order. Sales reports with date filters. JDBC transactions for order processing.',
        '**Attendance & Grade Tracker**: Students, subjects, attendance records, marks. Auto-calculate attendance percentage, generate defaulter lists. Aggregate grade reports.',
        '**Expense Splitter (like Splitwise)**: Users, groups, expenses, settlements. Calculate who owes whom. Good for demonstrating complex SQL queries (joins, aggregates).',
      ] },
      { type: 'heading', id: 'ja2-tech', level: 2, content: 'Tech Stack — Your Toolkit' },
      { type: 'table', id: 'ja2-tech-table', headers: ['Layer', 'Technology', 'Why This?', 'Syllabus?'], rows: [
        ['Database', 'MySQL (XAMPP)', 'Free, local, matches university lab. Full SQL support.', '✅'],
        ['Backend (Java)', 'JDBC (java.sql)', 'Core syllabus. DriverManager, Connection, Statement, ResultSet.', '✅'],
        ['GUI', 'Java Swing or JavaFX', 'Swing is simpler + in syllabus. JavaFX is modern but may not be in lab.', '✅ Swing'],
        ['Build Tool', 'Manual (javac) or Maven', 'Manual for small projects. Maven for dependency management (MySQL connector JAR).', '⚠️ Optional'],
        ['Version Control', 'Git + GitHub', 'NOT in syllabus but IMPRESSIVE to evaluators. Shows professional workflow.', '❌ (bonus)'],
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
      { type: 'callout', id: 'ja2-d1', calloutType: 'doubt', title: 'Can I do the project alone or do I need a team?', content: 'Most universities allow teams of **2-3 students**. You CAN do it alone, but teams have advantages:\n- **Division of work**: One person on GUI, another on database, third on business logic.\n- **Viva backup**: If you blank on one question, your teammate might cover.\n- **Learning**: You learn from each other\'s approaches.\n\n⚠️ Warning: Choose teammates who will ACTUALLY work. A non-contributing teammate drags everyone down. The viva is INDIVIDUAL — you must understand the ENTIRE codebase, not just your part.' },
      { type: 'callout', id: 'ja2-exam', calloutType: 'exam', title: 'Exam Alert — Project Viva Survival', content: 'The viva is where evaluators separate genuine work from copy-paste:\n1. **They WILL ask you to explain any random line of code** — know your entire codebase.\n2. **They WILL ask "Why did you choose X over Y?"** — have reasons for every tech choice.\n3. **They WILL ask you to modify something on the spot** — practice live coding changes.\n4. **Common viva questions**: "How did you handle database connection failures?" "What happens if two users book the same slot?" "Show me your transaction management code."\n\n**Pro tip**: The students who score highest are the ones who can EXPLAIN their code clearly, not the ones with the fanciest GUI.' },
      { type: 'callout', id: 'ja2-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Your project integrates **everything** you have learned so far:\n- **Java OOP (Days 7-10)**: Classes for entities (Student, Book, Order). Inheritance for user roles.\n- **SQL (DBMS 8-day)**: CREATE, INSERT, SELECT with JOINs. The database is half your project.\n- **JDBC (Days 3-6 of this course)**: The bridge between Java and MySQL.\n- **Exception handling (Java Day 12)**: Every database call needs try-catch.\n- **Collections (Java Day 14)**: Store query results in ArrayLists for GUI display.' },
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
      { type: 'callout', id: 'ja3-connection-string', calloutType: 'tip', title: 'The JDBC Connection URL — Decoded', content: 'The connection URL tells Java EXACTLY where your database lives:\n```\njdbc:mysql://localhost:3306/library_db\n│    │      │         │       │\n│    │      │         │       └── Database name\n│    │      │         └── Port (3306 = MySQL default)\n│    │      └── Host (localhost = your machine)\n│    └── Database type (mysql)\n└── Protocol (jdbc)\n```\nThis URL is the first parameter to `DriverManager.getConnection()`. Get it wrong and nothing works.' },
      { type: 'heading', id: 'ja3-phpmyadmin', level: 2, content: 'phpMyAdmin — Your Visual Database Manager' },
      { type: 'paragraph', id: 'ja3-phpmyadmin-p', content: 'phpMyAdmin (`http://localhost/phpmyadmin`) is a web-based GUI for MySQL. Use it for:\n- **Creating databases/tables** visually (faster than typing SQL).\n- **Browsing data** after your Java app inserts it (verify your code works).\n- **Exporting/importing** SQL files (backup your project database).\n- **Running test queries** before writing them in Java.' },
      { type: 'callout', id: 'ja3-d1', calloutType: 'doubt', title: 'Do I need to install MySQL separately, or is XAMPP enough?', content: '**XAMPP is enough.** It bundles MariaDB (a MySQL-compatible database). For your university project, MariaDB and MySQL are interchangeable — same SQL syntax, same JDBC driver (mysql-connector-j), same port (3306). Do NOT install a separate MySQL — it will conflict with XAMPP\'s MariaDB on port 3306.' },
      { type: 'callout', id: 'ja3-exam', calloutType: 'exam', title: 'Exam Alert — CE-1 Preparation', content: 'CE-1 will test your ability to:\n1. **Write a correct JDBC connection URL** — jdbc:mysql://localhost:3306/dbname\n2. **Load the MySQL driver**: `Class.forName("com.mysql.cj.jdbc.Driver")`\n3. **Connect**: `DriverManager.getConnection(url, user, password)`\n4. **Handle SQLException** — every JDBC call needs try-catch.\n\nThese four lines are the JDBC boilerplate. If you can write them from memory, you have secured at least 5 marks in CE-1.' },
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
      { type: 'list', id: 'ja4-flow', listStyle: 'number', items: ['**Load the driver**: `Class.forName("com.mysql.cj.jdbc.Driver")` — registers the MySQL driver with JDBC.', '**Create connection**: `Connection conn = DriverManager.getConnection(url, user, pass)` — opens a TCP connection to MySQL.', '**Create statement**: `Statement stmt = conn.createStatement()` — creates an object that can send SQL to the database.', '**Execute query**: `ResultSet rs = stmt.executeQuery(sql)` for SELECT. `int rows = stmt.executeUpdate(sql)` for INSERT/UPDATE/DELETE/CREATE.', '**Process results + close**: Loop through ResultSet. Close rs → stmt → conn in reverse order (preferably in finally or try-with-resources).'] },
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

        // try-with-resources: auto-closes Connection, Statement, ResultSet
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
      { type: 'callout', id: 'ja4-resultset', calloutType: 'warn', title: 'ResultSet Column Indices Are 1-Based (Not 0-Based!)', content: 'This is the #1 JDBC off-by-one error:\n```java\nrs.getString(0);  // ERROR! Columns start at 1, not 0\nrs.getString(1);  // Correct — first column\nrs.getString(3);  // Third column\n```\nAlways prefer column **names** over indices — `rs.getString("title")` is clearer and immune to column reordering. Use indices only when column names are unknown (e.g., metadata queries).' },
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
                       "VALUES ('Vinay', 'AIML')";
    int rows = stmt.executeUpdate(insertSQL);  // returns 1 (rows affected)
    System.out.println(rows + " row(s) inserted.");

} catch (SQLException e) {
    e.printStackTrace();
}` },
      { type: 'callout', id: 'ja4-d1', calloutType: 'doubt', title: "Why do we close Connection, Statement, and ResultSet? What happens if we don't?", content: 'Each object holds **database resources** (memory, network sockets, cursors). If you do not close them:\n1. **Memory leak**: The database server keeps resources allocated for your session.\n2. **Connection exhaustion**: After many unclosed connections, MySQL refuses new connections (max_connections limit).\n3. **Cursor leak**: Unclosed ResultSets keep locks on rows, blocking other queries.\n\n**Try-with-resources** (Java 7+) is the cleanest solution:\n```java\ntry (Connection c = ...; Statement s = ...; ResultSet r = ...) { ... }\n// All three auto-close when the try block exits.\n```' },
      { type: 'callout', id: 'ja4-exam', calloutType: 'exam', title: 'Exam Alert — CE-1 Coding Focus', content: 'CE-1 coding tasks WILL include:\n1. **Write a complete JDBC connection + query** (boilerplate code).\n2. **Loop through ResultSet and print values.**\n3. **Use executeUpdate for INSERT/UPDATE/DELETE.**\n\n**Marks**: 5 per task. Full marks if: connection opens, query executes, results processed correctly, connection closes. Deductions for: missing try-catch, using wrong execute method (executeQuery for INSERT), forgetting to close resources.' },
      { type: 'callout', id: 'ja4-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'ResultSet iteration (while rs.next()) is the same pattern as **iterating arrays (Java Day 6)** and **ArrayList iteration (Java Day 14)**. The SQL inside executeQuery() is the same SQL you wrote in the **DBMS 8-day course**. The try-catch is the exception handling from **Java Day 12**.' },
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
      { type: 'code', id: 'ja5-injection', lang: 'java', title: 'SQL Injection Demo (DO NOT USE IN PRODUCTION)', code: `// DANGEROUS: String concatenation with user input
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
      { type: 'callout', id: 'ja5-injection-warn', calloutType: 'warn', title: 'SQL Injection — Guaranteed CE-2 Question', content: 'Every CE-2 exam paper has at least one question on SQL injection. Know:\n1. **What it is**: User injects malicious SQL through unsanitized input fields.\n2. **How it happens**: String concatenation in SQL queries.\n3. **How to prevent**: Always use PreparedStatement with ? placeholders.\n4. **Never**: Trust user input. Never concatenate it into SQL strings.\n\nThis is also the most common interview question for Java developer roles.' },
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
      { type: 'callout', id: 'ja5-d1', calloutType: 'doubt', title: 'Can I reuse a PreparedStatement with different parameters?', content: '**Yes!** That is one of its main advantages. Set new parameters and call execute again:\n```java\nPreparedStatement ps = conn.prepareStatement("INSERT INTO b(title) VALUES(?)");\nps.setString(1, "Book 1"); ps.executeUpdate();\nps.setString(1, "Book 2"); ps.executeUpdate();\nps.setString(1, "Book 3"); ps.executeUpdate();\n```\nThe SQL is compiled ONCE and reused three times — faster than creating three separate Statements.' },
      { type: 'callout', id: 'ja5-exam', calloutType: 'exam', title: 'Exam Alert — CE-2 Focus', content: 'CE-2 will test PreparedStatement heavily:\n1. **SQL injection prevention** — MCQ: "Which prevents SQL injection?" → PreparedStatement.\n2. **10-mark coding question**: Write a complete CRUD class with PreparedStatement.\n3. **Parameter index is 1-based** — ps.setString(1, ...), not ps.setString(0, ...). Same pitfall as ResultSet!\n4. **executeUpdate() for CRUD, executeQuery() for SELECT.** Same distinction as Statement.' },
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
        { id: 'ja5-q3', question: 'What does ps.setString(1, "Vinay") do?', options: ['Sets the first column to "Vinay"', 'Sets the first ? placeholder to "Vinay"', 'Sets the first row to "Vinay"', 'Sets the connection name to "Vinay"'], correctIndex: 1, explanation: 'setString(1, value) replaces the FIRST ? placeholder in the SQL string with the value "Vinay". Parameter indices are 1-based, matching the order of ? in the SQL.' },
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
      { type: 'code', id: 'ja6-txn-code', lang: 'java', title: 'Transaction Management', code: `// Scenario: Transfer money between two accounts
// This MUST be all-or-nothing (Atomicity)

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
      { type: 'callout', id: 'ja6-autocommit', calloutType: 'warn', title: 'Auto-Commit Is ON by Default — Turn It OFF for Transactions', content: 'By default, every SQL statement auto-commits (executes immediately and permanently). This is fine for simple apps but WRONG for transactions:\n\n```java\nconn.setAutoCommit(false);  // Start manual transaction\n// ... multiple SQL statements ...\nconn.commit();              // Save all changes (success)\n// OR\nconn.rollback();            // Undo all changes (failure)\nconn.setAutoCommit(true);   // Restore default\n```\nAlways restore auto-commit to true after your transaction. Otherwise, future statements will not auto-commit and appear to "disappear" when the connection closes.' },
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
      { type: 'callout', id: 'ja6-d1', calloutType: 'doubt', title: 'When do I need transactions vs individual auto-commit?', content: 'Use **transactions** (setAutoCommit(false)) when:\n- Multiple SQL statements form ONE logical operation (bank transfer, order placement, booking).\n- If any statement fails, ALL must be undone (rollback).\n- You need consistency across related tables.\n\nUse **auto-commit** (default) when:\n- Single independent operations (insert one record, update one field).\n- Failure of one operation does not affect others.\n- Simpler code is acceptable.\n\n**CE-3 tip**: The 10-mark coding question often involves a transaction scenario (e.g., book borrowing: decrement available count + insert borrowing record — must be atomic).' },
      { type: 'callout', id: 'ja6-exam', calloutType: 'exam', title: 'Exam Alert — CE-3 & End Term', content: 'CE-3 focuses on the advanced topics from today:\n1. **Transactions**: commit/rollback. The "money transfer" or "booking" scenario.\n2. **Batch processing**: When and why to use addBatch/executeBatch.\n3. **Connection lifecycle**: Open → use → close. Consequences of not closing.\n4. **Auto-commit behavior**: Default is ON. Turn OFF for transactions.\n\nEnd Term Exam will test ALL 6 days + project concepts. The viva will drill into your transaction management and error handling code.' },
      { type: 'callout', id: 'ja6-complete', calloutType: 'success', title: '🎉 Advanced Java — 6-Day Course Complete!', content: '**Day 1-2**: Course admin, evaluation structure, project planning.\n**Day 3**: MySQL environment, XAMPP, phpMyAdmin, connection URL.\n**Day 4**: JDBC core — Statement, ResultSet, executeQuery/executeUpdate.\n**Day 5**: PreparedStatement, SQL injection prevention, CRUD pattern.\n**Day 6**: Transactions, batch processing, connection pooling, prompts.\n\n**CE-1 (10 Oct)**: Days 3-4 — SQL basics + JDBC connection.\n**CE-2 (30 Oct)**: Day 5 — PreparedStatement, CRUD, SQL injection.\n**CE-3 (27 Nov)**: Day 6 — Transactions, batch, pooling.\n**Project Final + Viva (Dec)**: All 6 days + your working application.\n\nYou now have the full JDBC toolkit. Build your project — the best way to solidify these concepts is to USE them.' },
      { type: 'callout', id: 'ja6-bridge', calloutType: 'bridge', title: 'Connect the Dots — The Complete Picture', content: 'Your full Java journey:\n- **Java 14-day course**: Core language → OOP → Collections.\n- **DBMS 8-day course**: SQL → DDL/DML → aggregates → theory.\n- **SDE 8-day course**: Python data stack → Big Data → ETL.\n- **Advanced Java 6-day course**: JDBC → connects Java to SQL.\n\nThese four courses together cover your ENTIRE semester 3 syllabus. The project is where everything comes together — Java OOP + SQL database + JDBC bridge + (optionally) Python analytics.' },
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
    ],
    tasks: [
      { id: 'java-adv-d6-t1', text: 'Implement a transaction: book borrowing (decrement available + insert borrow record). Test commit and rollback paths.', tag: 'lab' },
      { id: 'java-adv-d6-t2', text: 'Write a batch insert program. Insert 100 rows using batch vs individual inserts. Compare execution time.', tag: 'drill' },
      { id: 'java-adv-d6-t3', text: 'Memorize the 5 MySQL prompt states. Practice \\c to cancel a broken query in the terminal.', tag: 'drill' },
      { id: 'java-adv-d6-t4', text: 'Final review: Write the complete JDBC boilerplate (driver → connect → execute → process → close) from memory.', tag: 'review' },
    ],
  },
];
