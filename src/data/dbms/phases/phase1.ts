import type { Day } from '../../../types';

export const dbmsPhase1days: Day[] = [
  // ======== DAY 1: Environment Setup & DDL ========
  {
    id: 'dbms-8-d1', number: 1,
    title: 'Environment Setup and Database Definition (DDL)', duration: 60,
    topics: ['XAMPP', 'MySQL Monitor', 'phpMyAdmin', 'SHOW DATABASES', 'CREATE DATABASE', 'USE', 'CREATE TABLE'],
    alignment: ['SQLBolt Lesson 16'],
    blocks: [
      { type: 'callout', id: 'db1-intro', calloutType: 'info', title: 'Your Database Journey Begins', content: 'Databases are the backbone of every application. Today you will **install MySQL**, create your first database, and build tables that store real data. By the end of this hour, you will be running SQL commands in a terminal — no GUI needed.' },
      { type: 'heading', id: 'db1-what-is', level: 2, content: 'What Is a Database? (The 30-Second Version)' },
      { type: 'paragraph', id: 'db1-def', content: 'A **database** is organized storage for data. Think of it as a **smart filing cabinet**: instead of messy text files, you have structured tables with rows and columns that can be searched, filtered, and combined at lightning speed.' },
      { type: 'paragraph', id: 'db1-why', content: 'As an AIML student, you need SQL because: **data is the fuel for ML models**. Before you can train a model, you need to query, clean, and aggregate data — and SQL is the universal language for doing that.' },
      { type: 'heading', id: 'db1-env', level: 2, content: 'Step 1: Setting Up Your Local Server' },
      { type: 'paragraph', id: 'db1-xampp', content: '**XAMPP** (or ZAMP on some systems) turns your computer into a local web server. It bundles **Apache** (web server), **MySQL/MariaDB** (database), and **phpMyAdmin** (web-based DB manager).' },
      { type: 'list', id: 'db1-env-steps', listStyle: 'number', items: ['Download and install **XAMPP** (free — just Google "XAMPP download").', 'Launch the **XAMPP Control Panel**.', 'Click **Start** on both **Apache** and **MySQL**. If they turn green, you are good!', 'If MySQL fails to start: it might be a port conflict. Skype, Oracle, and some Windows services also use port 3306. Change the port in XAMPP config to 3307.', 'Open your browser and go to: **http://localhost/phpmyadmin**. If you see the phpMyAdmin dashboard, everything is working.'] },
      { type: 'callout', id: 'db1-port', calloutType: 'warn', title: 'Port Conflict? Here Is the Fix', content: 'If port 3306 is blocked, open `xampp/mysql/bin/my.ini` and change `port=3306` to `port=3307` on both lines where it appears. Then restart MySQL. When connecting, use `mysql -u root -p -P 3307` (note the capital `-P`).' },
      { type: 'heading', id: 'db1-terminal', level: 2, content: 'Step 2: The MySQL Command Line' },
      { type: 'paragraph', id: 'db1-term-intro', content: 'While phpMyAdmin is convenient, **real database work happens in the terminal**. The MySQL monitor is where you will practice for exams and where real DBAs work. It looks intimidating but you will master it in 10 minutes.' },
      { type: 'code', id: 'db1-login', lang: 'bash', title: 'Logging into MySQL', code: '# Windows: Open XAMPP Control Panel → Shell → type:\nmysql -u root -p\n\n# macOS / Linux terminal:\nmysql -u root -p\n\n# When prompted for password, press Enter (default is blank with XAMPP)\n# Successful login shows:\n# Welcome to the MariaDB monitor.\n# MariaDB [(none)]>' },
      { type: 'heading', id: 'db1-ddl', level: 2, content: 'Data Definition Language (DDL) — Building the Structure' },
      { type: 'paragraph', id: 'db1-ddl-intro', content: 'DDL commands define the **structure** of your database — the skeleton. These are the "construction crew" commands. Nothing holds data yet; you are just building the containers.' },
      { type: 'code', id: 'db1-basic-commands', lang: 'sql', title: 'Your First 5 SQL Commands', code: `-- 1. Show all databases on the server
SHOW DATABASES;

-- 2. Create a new database
-- WARNING: database names are case-sensitive on Linux/Mac!
CREATE DATABASE menagerie;

-- 3. Switch to your database (select it as active)
USE menagerie;

-- 4. Check which database is currently active
SELECT DATABASE();

-- 5. Create your first table!
CREATE TABLE pet (
    name    VARCHAR(20),
    owner   VARCHAR(20),
    species VARCHAR(20),
    sex     CHAR(1),
    birth   DATE,
    death   DATE
);` },
      { type: 'callout', id: 'db1-case', calloutType: 'warn', title: 'Case Sensitivity: The Silent Killer', content: '**SQL keywords** (SELECT, CREATE, FROM) are **case-insensitive** — you can write `select` or `SELECT`.\n**Database and table names** are **case-sensitive on Unix/Linux/Mac** (case-insensitive on Windows).\nAlways be consistent: pick lowercase for all identifiers and stick with it.\n**Exam tip**: This is a favorite MCQ — "Are SQL keywords case-sensitive?" → NO. "Are table names case-sensitive?" → Depends on the OS.' },
      { type: 'heading', id: 'db1-table-anatomy', level: 2, content: 'Anatomy of CREATE TABLE — Dissected' },
      { type: 'table', id: 'db1-datatypes', headers: ['Data Type', 'Stores', 'Example Value', 'When to Use'], rows: [['INT', 'Whole numbers', '42, -7, 0', 'IDs, counts, ages'], ['VARCHAR(n)', 'Variable text up to n chars', "'Vinayak', 'dog'", 'Names, emails, descriptions'], ['CHAR(n)', 'Fixed-length text', "'M', 'F'", 'Codes, flags — always same length'], ['DATE', 'Date only (no time)', "'2026-07-27'", 'Birth dates, deadlines'], ['DATETIME', 'Date + time', "'2026-07-27 14:30:00'", 'Timestamps, logs'], ['DECIMAL(p,s)', 'Exact decimal numbers', '99.99', 'Money, precise calculations'], ['TEXT', 'Long text (up to 65KB)', 'Long descriptions', 'Articles, comments, notes'], ['BOOLEAN', 'true/false (tinyint(1))', 'TRUE, FALSE', 'Flags, statuses']] },
      { type: 'code', id: 'db1-create-pet', lang: 'sql', title: 'Lab: The pet Table — Step by Step', code: `-- The complete CREATE TABLE syntax, explained
CREATE TABLE pet (
    name    VARCHAR(20),    -- Pet name, max 20 characters
    owner   VARCHAR(20),    -- Owner name, max 20 characters
    species VARCHAR(20),    -- e.g., 'dog', 'cat', 'bird', 'snake'
    sex     CHAR(1),        -- 'm' or 'f' (single character)
    birth   DATE,           -- Format: 'YYYY-MM-DD'
    death   DATE            -- NULL if pet is still alive
);

-- Verify your table was created
SHOW TABLES;

-- See the structure you just built
DESCRIBE pet;` },
      { type: 'callout', id: 'db1-null', calloutType: 'tip', title: 'NULL — The "Unknown" Value', content: 'NULL in SQL means **"unknown"** or **"no value"** — it is NOT the same as 0 or an empty string.\n- For the pet table: `death` is NULL while the pet is alive.\n- NULL is checked with `IS NULL` or `IS NOT NULL` — **never with = NULL**.\n- In exams, they WILL test you on this: `SELECT * FROM pet WHERE death = NULL` returns **0 rows** — it should be `WHERE death IS NULL`.' },
      // Doubt Clinics
      { type: 'callout', id: 'db1-d1', calloutType: 'doubt', title: "I installed XAMPP but MySQL won't start. What do I do?", content: 'Three most common fixes:\n1. **Port conflict**: Skype, another MySQL install, or Windows services may use port 3306. Change to 3307 in XAMPP config.\n2. **Running as admin**: On Windows, right-click XAMPP Control Panel → "Run as Administrator".\n3. **Existing data corruption**: Delete everything in `xampp/mysql/data/` (EXCEPT the folder itself). XAMPP will recreate fresh data files.\nStill stuck? The XAMPP control panel has a "Logs" button — check the MySQL error log for the exact error message.' },
      { type: 'callout', id: 'db1-d2', calloutType: 'doubt', title: 'phpMyAdmin vs MySQL terminal — which should I use?', content: '**For learning/exams**: Use the **terminal**. Every lab exam will test terminal commands. You need muscle memory for `mysql -u root -p` and typing SQL by hand.\n**For quick exploration**: phpMyAdmin is faster for browsing data visually.\n**For real development**: Both. Terminal for scripts/automation, GUI for data exploration.\nMy recommendation: do ALL of Day 1-3 in the terminal. Switch to phpMyAdmin only when you are comfortable.' },
      // Exam Alert
      { type: 'callout', id: 'db1-exam', calloutType: 'exam', title: 'Exam Alert — ST-1 & CE-1 Focus', content: '1. **DDL vs DML vs DQL** — know which commands belong to which category. Guaranteed 1-mark MCQ.\n2. **DDL**: CREATE, ALTER, DROP, TRUNCATE (structure). **DML**: INSERT, UPDATE, DELETE (data). **DQL**: SELECT (query).\n3. **NULL handling**: `IS NULL` not `= NULL` — favorite trick question.\n4. **CREATE TABLE syntax**: semicolon after closing parenthesis. Missing semicolons are the #1 syntax error.\n5. **Marks: 1-2 MCQs in ST-1, 1 coding task (5 marks) in CE-1** for CREATE TABLE.' },
      // Bridge
      { type: 'callout', id: 'db1-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'The table you built today (pet) will be queried, filtered, sorted, and grouped over the next 7 days. Every concept from Day 2-8 builds on this single table. DDL → DML (Day 4-5) → DQL (Day 2-3) → Aggregates (Day 6) → Theory (Day 7). Save your `CREATE TABLE` statements — you will need them.' },
      // Quick Ref
      { type: 'table', id: 'db1-qref', headers: ['Command', 'Category', 'What It Does'], rows: [['SHOW DATABASES;', 'Admin', 'Lists all databases on the server'], ['CREATE DATABASE name;', 'DDL', 'Creates a new empty database'], ['USE name;', 'Admin', 'Selects a database as active'], ['SELECT DATABASE();', 'DQL', 'Shows which database is active'], ['CREATE TABLE t (...);', 'DDL', 'Creates a table with columns and types'], ['SHOW TABLES;', 'Admin', 'Lists all tables in current database'], ['DESCRIBE t;', 'Admin', 'Shows column names, types, and constraints']] },
      // Quiz
      { type: 'quiz', id: 'db1-quiz', title: 'Day 1 Quiz', questions: [
        { id: 'db1-q1', question: 'Which category does CREATE TABLE belong to?', options: ['DML (Data Manipulation)', 'DDL (Data Definition)', 'DQL (Data Query)', 'DCL (Data Control)'], correctIndex: 1, explanation: 'DDL = Data Definition Language. CREATE, ALTER, DROP, and TRUNCATE define the database structure — they do not manipulate data.' },
        { id: 'db1-q2', question: 'How do you check if a column value is NULL?', options: ['WHERE col = NULL', 'WHERE col == NULL', 'WHERE col IS NULL', 'WHERE col EQUALS NULL'], correctIndex: 2, explanation: 'NULL means "unknown" — it cannot be compared with =. Always use IS NULL or IS NOT NULL. WHERE col = NULL returns 0 rows.' },
        { id: 'db1-q3', question: 'Are SQL keywords like SELECT and CREATE case-sensitive?', options: ['Yes — must be uppercase', 'Yes — must be lowercase', 'No — case-insensitive', 'Only on Linux'], correctIndex: 2, explanation: 'SQL keywords are case-insensitive. SELECT, select, and SeLeCt all work. But table/database names may be case-sensitive on Linux/Mac.' },
        { id: 'db1-q4', question: 'What does VARCHAR(20) mean?', options: ['Exactly 20 characters required', 'Up to 20 characters — variable length', '20 bytes of storage always', '20 columns'], correctIndex: 1, explanation: 'VARCHAR(20) = variable-length string with max 20 characters. It only uses as much storage as the actual text length (unlike CHAR(20) which always uses 20).' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'db1-cards', title: 'Day 1 Flashcards', cards: [
        { id: 'db1-f1', front: 'What is DDL? Name 3 DDL commands.', back: 'Data Definition Language — defines database structure. Commands: CREATE (create DB/table), ALTER (modify structure), DROP (delete DB/table), TRUNCATE (delete all rows, keep structure).', hint: 'Think "construction crew"...' },
        { id: 'db1-f2', front: 'How do you create a database and switch to it?', back: 'CREATE DATABASE menagerie; — creates the database.\nUSE menagerie; — selects it as the active database.\nSELECT DATABASE(); — confirms which DB is active.', hint: 'Three commands: CREATE, USE, SELECT DATABASE()...' },
        { id: 'db1-f3', front: 'NULL in SQL — what does it mean and how to check?', back: 'NULL = "unknown" or "no value". NOT the same as 0 or empty string. Use IS NULL or IS NOT NULL. Never use = NULL — it returns nothing.', hint: 'Unknown, not zero or empty...' },
        { id: 'db1-f4', front: 'VARCHAR vs CHAR — difference?', back: 'VARCHAR(n): variable length, max n chars. Only stores what you use. CHAR(n): fixed length, always n chars. Pads with spaces. VARCHAR is more common/space-efficient.', hint: 'Variable vs fixed width...' },
        { id: 'db1-f5', front: 'What is XAMPP and why do we need it?', back: 'XAMPP = cross-platform local server bundle. Includes Apache (web), MySQL/MariaDB (database), phpMyAdmin (web GUI). Turns your computer into a database server for local development.', hint: 'Local server stack...' },
      ] },
      { type: 'practice', id: 'db1-p1', lang: 'sql', title: 'Practice: Create the pet Table', starter: `-- Step 1: Create a database called 'menagerie'
CREATE DATABASE menagerie;

-- Step 2: Switch to it
USE menagerie;

-- Step 3: Create the pet table with columns:
-- name VARCHAR(20), owner VARCHAR(20), species VARCHAR(20),
-- sex CHAR(1), birth DATE, death DATE
CREATE TABLE pet (
    -- TODO: Write the column definitions here
);

-- Step 4: Verify with SHOW TABLES and DESCRIBE pet`, hint: 'Each column definition is: column_name DATA_TYPE, separated by commas. No comma after the last column.' },
      { type: 'practice', id: 'db1-p2', lang: 'sql', title: 'Practice: Build a Student Table', starter: `-- Imagine you are building a university database.
-- Create a table called 'student' with these columns:
-- id INT, name VARCHAR(50), branch VARCHAR(10), semester INT, gpa DECIMAL(3,2)
-- The gpa type means: 3 total digits, 2 after decimal (e.g., 8.75)

CREATE TABLE student (
    -- TODO: Your columns here
);`, hint: 'DECIMAL(3,2) means max value 9.99. INT is for whole numbers. VARCHAR for text. Use semicolon at the end.' },
    ],
    tasks: [
      { id: 'dbms-8-d1-t1', text: 'Install XAMPP and verify Apache + MySQL are running (both green).', tag: 'lab' },
      { id: 'dbms-8-d1-t2', text: 'Connect to MySQL via terminal: mysql -u root -p. Run SHOW DATABASES;', tag: 'lab' },
      { id: 'dbms-8-d1-t3', text: 'Create the menagerie database and pet table. Verify with SHOW TABLES and DESCRIBE pet.', tag: 'lab' },
      { id: 'dbms-8-d1-t4', text: 'Write down the difference between DDL, DML, and DQL with 2 example commands each.', tag: 'review' },
    ],
  },

  // ======== DAY 2: Basic Queries & DQL ========
  {
    id: 'dbms-8-d2', number: 2,
    title: 'Basic Queries and Data Retrieval (DQL)', duration: 60,
    topics: ['SELECT', 'FROM', 'WHERE', 'Wildcards', 'Case Sensitivity', 'DISTINCT'],
    alignment: ['SQLBolt Lessons 1 & 2'],
    blocks: [
      { type: 'callout', id: 'db2-intro', calloutType: 'info', title: 'Learning to Ask Questions', content: 'SQL is a **question-asking language**. Today you will learn to ask the database precise questions using `SELECT`, filter answers with `WHERE`, and remove duplicates with `DISTINCT`. This is the query you will write thousands of times in your career.' },
      { type: 'heading', id: 'db2-select', level: 2, content: 'The SELECT Statement — SQL\'s Heartbeat' },
      { type: 'paragraph', id: 'db2-select-def', content: '`SELECT` is a **DQL** (Data Query Language) command. It reads data from tables without changing anything. Think of it as asking the database a question — it returns a temporary "view" (result set) that looks like a table but does not modify the actual data.' },
      { type: 'code', id: 'db2-basic-select', lang: 'sql', title: 'SELECT Basics', code: `-- Basic structure: SELECT what FROM which_table WHERE conditions;

-- Select ALL columns (the * wildcard)
SELECT * FROM pet;

-- Select specific columns (recommended — faster, clearer)
SELECT name, species, birth FROM pet;

-- Select with a condition
SELECT * FROM pet WHERE species = 'dog';

-- Select with multiple conditions
SELECT * FROM pet WHERE species = 'dog' AND sex = 'f';

-- Select unique values (no duplicates)
SELECT DISTINCT species FROM pet;

-- Select unique combinations
SELECT DISTINCT owner, species FROM pet;` },
      { type: 'callout', id: 'db2-star', calloutType: 'tip', title: 'SELECT * vs SELECT column — Best Practice', content: '`SELECT *` is fine for **exploration** (you do not know what columns exist yet). But for **production code**, always list specific columns. Reason: 1) Faster — only reads needed columns. 2) Safer — if someone adds a column, your code does not break. 3) Clearer — you know exactly what you are getting. Exams may ask about performance implications of `SELECT *`.' },
      { type: 'heading', id: 'db2-where', level: 2, content: 'The WHERE Clause — Filtering Results' },
      { type: 'paragraph', id: 'db2-where-def', content: '`WHERE` acts like a **filter** — only rows that satisfy the condition appear in the result. It is THE most used clause in SQL, and the one that makes databases powerful.' },
      { type: 'table', id: 'db2-comparison', headers: ['Operator', 'Meaning', 'Example', 'Returns'], rows: [['=', 'Equal to', "WHERE species = 'dog'", 'All dogs'], ['<> or !=', 'Not equal to', "WHERE species <> 'dog'", 'Everything except dogs'], ['>', 'Greater than', 'WHERE birth > \'2020-01-01\'', 'Pets born after 2020'], ['<', 'Less than', 'WHERE birth < \'2018-01-01\'', 'Pets born before 2018'], ['>=', 'Greater/equal', 'WHERE birth >= \'2020-01-01\'', 'Born 2020 or later'], ['<=', 'Less/equal', 'WHERE birth <= \'2015-12-31\'', 'Born 2015 or earlier']] },
      { type: 'code', id: 'db2-where-examples', lang: 'sql', title: 'WHERE in Action', code: `-- Find all female dogs
SELECT name, birth FROM pet
WHERE species = 'dog' AND sex = 'f';

-- Find pets born after 2015
SELECT name, species, birth FROM pet
WHERE birth > '2015-01-01';

-- Find pets whose owner is NOT 'Gwen'
SELECT name, owner FROM pet
WHERE owner <> 'Gwen';

-- String comparison is case-insensitive by default in MySQL!
-- 'Dog' matches 'dog', 'DOG', 'dOg' in WHERE comparisons
-- But string content comparison with = is case-insensitive
-- Use BINARY keyword for case-sensitive comparison:
SELECT * FROM pet WHERE BINARY species = 'Dog';  -- only exact match` },
      { type: 'heading', id: 'db2-distinct', level: 2, content: 'DISTINCT — Removing Duplicates' },
      { type: 'paragraph', id: 'db2-distinct-def', content: '`DISTINCT` eliminates duplicate rows from results. It applies to **all columns** in the SELECT list — DISTINCT on (owner, species) removes rows where BOTH values match a previous row.' },
      { type: 'code', id: 'db2-distinct-examples', lang: 'sql', title: 'DISTINCT Examples', code: `-- What species of pets exist? (no repeats)
SELECT DISTINCT species FROM pet;
-- Result: dog, cat, bird, snake, hamster...

-- How many unique owners are there?
SELECT DISTINCT owner FROM pet;

-- Unique owner-species combinations
SELECT DISTINCT owner, species FROM pet;
-- Gwen owns a dog AND a cat → both rows appear
-- Harold owns two dogs → only ONE row for Harold-dog` },
      // Doubt Clinic
      { type: 'callout', id: 'db2-d1', calloutType: 'doubt', title: 'Why does my WHERE clause with LIKE \'A%\' return nothing even though there are names starting with A?', content: 'Three possible causes:\n1. **Case sensitivity**: On some systems (or with BINARY), \'a%\' does not match \'Alice\'. Try both cases or use LOWER().\n2. **Leading spaces**: The name might be `\' Alice\'` (with a space). Use `WHERE TRIM(name) LIKE \'A%\'`.\n3. **Wrong column**: Are you sure the names are in the column you are querying? Double-check with `SELECT * FROM table LIMIT 5` to see the actual data.' },
      { type: 'callout', id: 'db2-d2', calloutType: 'doubt', title: 'When I use SELECT DISTINCT on multiple columns, how does it decide what is a "duplicate"?', content: 'DISTINCT looks at the **entire row** (all columns in the SELECT list). A row is a duplicate only if ALL selected columns match a previous row.\n\nExample: `SELECT DISTINCT owner, species FROM pet;`\n- ("Gwen", "dog") + ("Gwen", "dog") → duplicate → one row\n- ("Gwen", "dog") + ("Gwen", "cat") → different → both rows kept\n- ("Harold", "dog") + ("Gwen", "dog") → different → both rows kept' },
      // Exam Alert
      { type: 'callout', id: 'db2-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **SELECT * vs SELECT column** — performance question.\n2. **WHERE vs HAVING**: WHERE filters rows BEFORE grouping. HAVING filters AFTER grouping. Common trick: putting aggregate in WHERE (wrong!).\n3. **DISTINCT applies to ALL selected columns** — not just the first one.\n4. **Order of execution**: FROM → WHERE → SELECT → DISTINCT → ORDER BY. Knowing this helps debug queries.\n5. **CE-1: 5-mark coding task** will ask for SELECT with WHERE conditions.' },
      // Bridge
      { type: 'callout', id: 'db2-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'SELECT + WHERE (today) is the foundation. Tomorrow (Day 3): multiple conditions with AND/OR and pattern matching. Day 4: sorting results. Day 6: aggregation functions (COUNT, AVG) combined with the queries you learned today.' },
      // Quick Ref
      { type: 'table', id: 'db2-qref', headers: ['Concept', 'Syntax', 'Example'], rows: [['Select all', 'SELECT * FROM t;', 'SELECT * FROM pet;'], ['Select columns', 'SELECT c1, c2 FROM t;', 'SELECT name, birth FROM pet;'], ['Filter', 'WHERE condition', "WHERE species='dog'"], ['AND', 'WHERE c1 AND c2', "WHERE species='dog' AND sex='f'"], ['DISTINCT', 'SELECT DISTINCT col', 'SELECT DISTINCT species FROM pet;'], ['Not equal', '<> or !=', "WHERE owner <> 'Gwen'"], ['NULL check', 'IS NULL / IS NOT NULL', 'WHERE death IS NULL']] },
      // Quiz
      { type: 'quiz', id: 'db2-quiz', title: 'Day 2 Quiz', questions: [
        { id: 'db2-q1', question: 'What does SELECT DISTINCT species, owner FROM pet do?', options: ['Shows unique species only', 'Shows unique owners only', 'Shows unique combinations of species AND owner', 'Shows all rows — DISTINCT has no effect on multiple columns'], correctIndex: 2, explanation: 'DISTINCT applies to ALL columns in SELECT. It removes rows where the entire combination (species, owner) matches a previous row.' },
        { id: 'db2-q2', question: 'Which is the correct order of SQL execution?', options: ['SELECT → FROM → WHERE', 'FROM → WHERE → SELECT', 'WHERE → SELECT → FROM', 'FROM → SELECT → WHERE'], correctIndex: 1, explanation: 'The database first identifies the table (FROM), then filters rows (WHERE), then selects columns (SELECT). Understanding this order helps debug queries.' },
        { id: 'db2-q3', question: 'Why should you prefer SELECT name, species over SELECT *?', options: ['It is faster and clearer', 'SELECT * is deprecated', 'SELECT * does not work in MySQL', 'There is no difference'], correctIndex: 0, explanation: 'Listing specific columns is: faster (reads only needed data), clearer (readers know what to expect), and more maintainable (adding columns to the table does not break the query).' },
        { id: 'db2-q4', question: 'How do you find pets whose death date is unknown?', options: ['WHERE death = NULL', 'WHERE death IS NULL', 'WHERE death == NULL', 'WHERE death = \'\''], correctIndex: 1, explanation: 'Use IS NULL. NULL is not a value — it represents "unknown". You cannot use =, <, or > to compare with NULL.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'db2-cards', title: 'Day 2 Flashcards', cards: [
        { id: 'db2-f1', front: 'What does SELECT do?', back: 'SELECT retrieves data from tables. It is a DQL (Data Query Language) command. It does NOT modify data — it creates a temporary result set (view). Structure: SELECT columns FROM table WHERE conditions;', hint: 'Read-only operation...' },
        { id: 'db2-f2', front: 'How does DISTINCT work with multiple columns?', back: 'DISTINCT looks at the ENTIRE row (all selected columns). Removes rows where ALL selected column values match a previous row. DISTINCT a,b → unique (a,b) combinations.', hint: 'Whole row, not single column...' },
        { id: 'db2-f3', front: 'SQL execution order?', back: '1. FROM (find table)\n2. WHERE (filter rows)\n3. SELECT (pick columns)\n4. DISTINCT (remove duplicates)\n5. ORDER BY (sort)\nWHERE cannot use column aliases — aliases are created in SELECT (step 3).', hint: 'FROM before WHERE before SELECT...' },
        { id: 'db2-f4', front: 'NULL in SQL — how to check and what NOT to do?', back: 'Use IS NULL or IS NOT NULL. Never use = NULL (returns 0 rows). NULL means "unknown" — cannot be compared with equality operators. NULL != NULL is NULL (unknown), not FALSE.', hint: 'IS, not =...' },
      ] },
      { type: 'practice', id: 'db2-p1', lang: 'sql', title: 'Practice: Query the pet Table', starter: `-- Using the pet table from Day 1, write queries for:
-- 1. All female pets
-- 2. Names and birth dates of all dogs
-- 3. Unique list of species
-- 4. All pets owned by 'Gwen'
-- 5. Pets whose death date is NOT NULL (deceased pets)

-- Write your queries below:
`, hint: 'Use WHERE with = for equality. Use IS NOT NULL for checking non-null values. Use DISTINCT for unique lists.' },
      { type: 'practice', id: 'db2-p2', lang: 'sql', title: 'Practice: Build a Course Database', starter: `-- Create a database for university courses
CREATE DATABASE university;
USE university;

-- Create a courses table
CREATE TABLE courses (
    course_code VARCHAR(10),
    course_name VARCHAR(100),
    credits INT,
    department VARCHAR(20)
);

-- TODO: Insert 5 sample courses using INSERT INTO (we will learn this on Day 4)
-- For now, write SELECT queries for:
-- 1. All courses in 'CSE' department
-- 2. Distinct departments offered
-- 3. Courses with more than 3 credits`, hint: 'Use WHERE department = \'CSE\'. Use DISTINCT department. Use WHERE credits > 3.' },
    ],
    tasks: [
      { id: 'dbms-8-d2-t1', text: 'Write 5 SELECT queries on the pet table: all pets, only dogs, female pets, born after 2015, distinct species.', tag: 'lab' },
      { id: 'dbms-8-d2-t2', text: 'Create a courses table with course_code, course_name, credits, department. Query courses by department.', tag: 'lab' },
      { id: 'dbms-8-d2-t3', text: 'Demonstrate DISTINCT on single column vs multiple columns. Explain the difference in your notes.', tag: 'drill' },
      { id: 'dbms-8-d2-t4', text: 'What is the execution order of a SELECT query with WHERE? Why does this matter?', tag: 'mcq' },
    ],
  },
];
