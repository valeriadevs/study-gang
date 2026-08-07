import type { Day } from '../../../types';

export const dbmsPhase3days: Day[] = [
  // DAY 6: Aggregates & Grouping
  {
    id: 'dbms-8-d6', number: 6,
    title: 'Aggregates and Grouping', duration: 60,
    topics: ['COUNT / SUM / AVG / MIN / MAX', 'TIMESTAMPDIFF', 'CURDATE', 'AS', 'GROUP BY'],
    alignment: ['SQLBolt Lessons 10, 11, 12'],
    blocks: [
      { type: 'callout', id: 'db6-intro', calloutType: 'info', title: 'SQL as a Calculator and Reporter', content: 'Aggregate functions transform rows into **summary statistics** — counts, averages, sums. Combined with `GROUP BY`, you can slice data by categories. This is the core of data analysis and reporting — essential for both CE-1 practicals and your AIML data work.' },
      { type: 'heading', id: 'db6-agg', level: 2, content: 'The 5 Aggregate Functions' },
      { type: 'table', id: 'db6-agg-table', headers: ['Function', 'What It Does', 'Example', 'Ignores NULL?'], rows: [['COUNT(*)', 'Counts ALL rows', 'SELECT COUNT(*) FROM pet;', 'No — counts every row'], ['COUNT(col)', 'Counts non-NULL values in col', 'SELECT COUNT(death) FROM pet;', 'Yes — skips NULL'], ['SUM(col)', 'Total of all values', 'SELECT SUM(price) FROM products;', 'Yes'], ['AVG(col)', 'Average of values', 'SELECT AVG(gpa) FROM students;', 'Yes'], ['MIN(col)', 'Smallest value', 'SELECT MIN(birth) FROM pet;', 'Yes'], ['MAX(col)', 'Largest value', 'SELECT MAX(birth) FROM pet;', 'Yes']] },
      { type: 'code', id: 'db6-basic-agg', lang: 'sql', title: 'Basic Aggregates', code: `-- How many pets are there?
SELECT COUNT(*) AS total_pets FROM pet;

-- How many pets have a known death date? (COUNT ignores NULL)
SELECT COUNT(death) AS deceased_count FROM pet;
-- Note: COUNT(death) only counts rows where death IS NOT NULL

-- What is the oldest pet's birth date?
SELECT MIN(birth) AS oldest_birth FROM pet;

-- What is the youngest pet's birth date?
SELECT MAX(birth) AS youngest_birth FROM pet;` },
      { type: 'callout', id: 'db6-count-star', calloutType: 'warn', title: 'COUNT(*) vs COUNT(column)', content: '`COUNT(*)` counts **every row** regardless of NULL.\n`COUNT(column)` counts only rows where that column **IS NOT NULL**.\n\nThis matters: if 10 pets exist and 3 have a death date, `COUNT(*) = 10` but `COUNT(death) = 3`. Exams love this distinction.' },
      { type: 'heading', id: 'db6-date', level: 2, content: 'Date Functions — Calculating Age' },
      { type: 'code', id: 'db6-date-code', lang: 'sql', title: 'Date Calculations', code: `-- TIMESTAMPDIFF: difference between two dates in specified unit
-- Syntax: TIMESTAMPDIFF(unit, start_date, end_date)

-- Calculate each pet's age in years
SELECT name, birth,
    TIMESTAMPDIFF(YEAR, birth, CURDATE()) AS age
FROM pet;

-- Calculate age in months
SELECT name,
    TIMESTAMPDIFF(MONTH, birth, CURDATE()) AS age_months
FROM pet;

-- How long did deceased pets live?
SELECT name, birth, death,
    TIMESTAMPDIFF(YEAR, birth, death) AS lifespan
FROM pet
WHERE death IS NOT NULL;

-- CURDATE() = current date. NOW() = current date + time.
-- DATE_FORMAT(date, format) for custom formatting` },
      { type: 'heading', id: 'db6-alias', level: 2, content: 'AS — Naming Your Results' },
      { type: 'paragraph', id: 'db6-alias-intro', content: '`AS` gives a temporary name (alias) to a column or table in your result. It does NOT rename anything permanently — it only affects the output of this specific query. Aliases with spaces need backticks or quotes.' },
      { type: 'code', id: 'db6-alias-code', lang: 'sql', title: 'Alias Examples', code: `-- Column alias
SELECT name, TIMESTAMPDIFF(YEAR, birth, CURDATE()) AS age FROM pet;

-- Table alias (useful for joins and self-referencing)
SELECT p.name, p.species FROM pet AS p WHERE p.sex = 'f';

-- Aliases with spaces (use backticks in MySQL)
SELECT COUNT(*) AS \`Total Pets\` FROM pet;` },
      { type: 'heading', id: 'db6-groupby', level: 2, content: 'GROUP BY — The Analytics Superpower' },
      { type: 'paragraph', id: 'db6-groupby-intro', content: '`GROUP BY` groups rows that have the same values in specified columns. You can then apply aggregate functions **per group**. This turns row-level data into grouped summaries.' },
      { type: 'code', id: 'db6-groupby-code', lang: 'sql', title: 'GROUP BY Examples', code: `-- How many pets per species?
SELECT species, COUNT(*) AS count
FROM pet
GROUP BY species;

-- How many male and female pets?
SELECT sex, COUNT(*) AS count
FROM pet
GROUP BY sex;

-- Per owner: count of pets and oldest pet birth
SELECT owner,
    COUNT(*) AS pet_count,
    MIN(birth) AS oldest_pet_birth
FROM pet
GROUP BY owner;

-- GROUP BY with ORDER BY
SELECT species, COUNT(*) AS count
FROM pet
GROUP BY species
ORDER BY count DESC;  -- most common species first

-- HAVING: filter AFTER grouping (like WHERE but for aggregates)
SELECT owner, COUNT(*) AS count
FROM pet
GROUP BY owner
HAVING COUNT(*) >= 2;  -- only owners with 2+ pets` },
      { type: 'callout', id: 'db6-having', calloutType: 'warn', title: 'WHERE vs HAVING — Critical Distinction', content: '**WHERE**: Filters **individual rows** BEFORE grouping. Cannot use aggregates in WHERE.\n**HAVING**: Filters **groups** AFTER grouping. Can use aggregates (COUNT, SUM, AVG).\n\n```sql\n-- WRONG: WHERE COUNT(*) > 1  (aggregate in WHERE)\n-- RIGHT: HAVING COUNT(*) > 1 (aggregate in HAVING)\n```\nThis is the #1 GROUP BY mistake — guaranteed exam question.' },
      // Doubt
      { type: 'callout', id: 'db6-d1', calloutType: 'doubt', title: 'Why does GROUP BY sometimes give an error about non-aggregated columns?', content: 'In standard SQL (and MySQL with strict mode), **every column in SELECT must either be in GROUP BY or be inside an aggregate function**.\n\n```sql\n-- ERROR (if strict mode): species is in GROUP BY, but name is not aggregated\nSELECT species, name, COUNT(*) FROM pet GROUP BY species;\n\n-- CORRECT: everything in SELECT is either grouped or aggregated\nSELECT species, COUNT(*), MIN(birth) FROM pet GROUP BY species;\n```\nMySQL\'s default mode is lenient (it picks a random name), but other databases will reject this. Be strict to be safe.' },
      // Exam
      { type: 'callout', id: 'db6-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **WHERE vs HAVING** — #1 grouping question. WHERE before GROUP BY, HAVING after.\n2. **COUNT(*) vs COUNT(column)** — NULL handling distinction.\n3. **TIMESTAMPDIFF with CURDATE()** — calculate ages dynamically.\n4. **GROUP BY with multiple columns**: groups by unique combinations.\n5. **CE-1 coding (5 marks)**: write aggregates with GROUP BY and HAVING.' },
      // Bridge
      { type: 'callout', id: 'db6-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Aggregate functions are the foundation of **data analytics and reporting**. The GROUP BY logic you learn today directly maps to Pandas `groupby()` in Python (SDE course). HAVING + aggregates = the core of every dashboard query in real applications.' },
      // Quick Ref
      { type: 'table', id: 'db6-qref', headers: ['Concept', 'Key Point'], rows: [['COUNT(*)', 'Counts all rows including NULL'], ['COUNT(col)', 'Counts non-NULL values only'], ['AVG/SUM', 'Ignore NULL values'], ['TIMESTAMPDIFF', 'TIMESTAMPDIFF(YEAR, birth, CURDATE())'], ['AS', 'Column/table alias. Temporary, query-level only.'], ['GROUP BY', 'Groups rows. SELECT must be grouped or aggregated.'], ['HAVING', 'Filters groups. Use with aggregates. After GROUP BY.']] },
      // Quiz
      { type: 'quiz', id: 'db6-quiz', title: 'Day 6 Quiz', questions: [
        { id: 'db6-q1', question: 'What is the difference between WHERE and HAVING?', options: ['No difference', 'WHERE filters rows, HAVING filters groups after aggregation', 'HAVING is faster', 'WHERE works only with numbers'], correctIndex: 1, explanation: 'WHERE filters individual rows BEFORE grouping. HAVING filters groups AFTER aggregation. You CANNOT use aggregate functions (COUNT, SUM) in WHERE.' },
        { id: 'db6-q2', question: 'What does SELECT COUNT(death) FROM pet return?', options: ['Total number of rows', 'Number of pets with a known death date', 'Number of alive pets', 'Always 0'], correctIndex: 1, explanation: 'COUNT(column) counts only rows where that column IS NOT NULL. Pets where death is NULL (still alive) are not counted.' },
        { id: 'db6-q3', question: 'How do you calculate a pet\'s age using SQL?', options: ['age(birth)', 'DATEDIFF(CURDATE(), birth)', 'TIMESTAMPDIFF(YEAR, birth, CURDATE())', 'birth - CURDATE()'], correctIndex: 2, explanation: 'TIMESTAMPDIFF(unit, start, end) calculates the difference. YEAR gives age in years. DATEDIFF gives days. CURDATE() is the current date.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'db6-cards', title: 'Day 6 Flashcards', cards: [
        { id: 'db6-f1', front: '5 aggregate functions?', back: 'COUNT(*), COUNT(col), SUM(col), AVG(col), MIN(col), MAX(col). All except COUNT(*) ignore NULL values. COUNT(col) and COUNT(*) give different results when NULLs exist.', hint: 'Count, sum, average, min, max...' },
        { id: 'db6-f2', front: 'WHERE vs HAVING?', back: 'WHERE = filter rows BEFORE grouping. Cannot use aggregates.\nHAVING = filter groups AFTER grouping. Uses aggregates (COUNT>1, AVG>50).\nExecution: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.', hint: 'Before vs after grouping...' },
        { id: 'db6-f3', front: 'How to calculate age with SQL?', back: 'TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age. Other units: MONTH, DAY, HOUR, MINUTE, SECOND. CURDATE() = current date. Use death instead of CURDATE() for lifespan.', hint: 'TIMESTAMPDIFF function...' },
      ] },
      { type: 'practice', id: 'db6-p1', lang: 'sql', title: 'Practice: Pet Analytics', starter: `-- Using your populated pet table, write queries for:
-- 1. Total number of pets
-- 2. Number of pets per species (GROUP BY)
-- 3. Average age of pets (use TIMESTAMPDIFF)
-- 4. Number of pets per owner, but only show owners with 2+ pets (HAVING)
-- 5. The youngest and oldest pet's birth date

-- Write below:`, hint: '1. COUNT(*). 2. GROUP BY species with COUNT(*). 3. AVG(TIMESTAMPDIFF(...)). 4. GROUP BY owner HAVING COUNT(*) >= 2. 5. MIN(birth) and MAX(birth).' },
      { type: 'practice', id: 'db6-p2', lang: 'sql', title: 'Practice: Student Grade Analytics', starter: `CREATE TABLE grades (
    student VARCHAR(50), subject VARCHAR(30), marks INT
);
INSERT INTO grades VALUES
('Vinayak', 'Java', 85), ('Vinayak', 'DBMS', 90), ('Vinayak', 'SDE', 78),
('Riya', 'Java', 92), ('Riya', 'DBMS', 88),
('Amit', 'Java', 76), ('Amit', 'SDE', 82);

-- TODO:
-- 1. Average marks per subject
-- 2. Each student's highest and lowest mark
-- 3. Subjects where average > 80 (HAVING)
-- 4. Each student's total and average marks`, hint: '1. GROUP BY subject, AVG(marks). 2. GROUP BY student, MAX() and MIN(). 3. GROUP BY subject HAVING AVG(marks) > 80. 4. GROUP BY student, SUM() and AVG().' },
      { type: 'practice', id: 'db6-p3', lang: 'sql', title: 'Practice: COUNT Star vs Column', starter: `-- Using the pet table, predict THEN run:

-- Q1: How many rows total?
SELECT COUNT(*) FROM pet;

-- Q2: How many pets have a KNOWN death date?
SELECT COUNT(death) FROM pet;

-- Q3: How many pets have a NULL death date (alive)?
SELECT COUNT(*) FROM pet WHERE death IS NULL;

-- Q4: Add 2 more pets WITHOUT death dates, then re-run Q1-Q3.
--     Which numbers changed? Which did not?

-- Q5: What does COUNT(DISTINCT species) return?
SELECT COUNT(DISTINCT species) FROM pet;

-- Q6: In comments: when would COUNT(col) differ from COUNT(*)?
--     (think: what if the column has NULLs?)`, hint: 'COUNT(*) = all rows. COUNT(death) = rows where death is not NULL. Adding alive pets increases COUNT(*) and COUNT(*) WHERE death IS NULL but NOT COUNT(death).' },
      { type: 'practice', id: 'db6-p4', lang: 'sql', title: 'Practice: GROUP BY Report Builder', starter: `-- Build a mini report from the pet table:

-- 1. Pets per species, most common first (GROUP BY + ORDER BY count DESC)
-- 2. Pets per owner (GROUP BY owner)
-- 3. Species with MORE than 2 pets (HAVING COUNT(*) > 2)
-- 4. Average birth year per species (AVG(YEAR(birth)))
-- 5. Owners with exactly 1 pet
-- 6. Oldest and newest pet per species (MIN/MAX birth)

-- Write all six queries. For each, comment what the result means.`, hint: '1: GROUP BY species ORDER BY COUNT(*) DESC. 3: HAVING COUNT(*)>2. 5: GROUP BY owner HAVING COUNT(*)=1. 6: GROUP BY species with MIN(birth), MAX(birth).' },
      { type: 'practice', id: 'db6-p5', lang: 'sql', title: 'Practice: Age Calculation Lab', starter: `-- Using the pet table:

-- 1. Show each pet's age in YEARS (TIMESTAMPDIFF + CURDATE())
-- 2. Show each pet's age in MONTHS
-- 3. Deceased pets: show their LIFESPAN (birth to death)
-- 4. The AVERAGE age of all pets
-- 5. The OLDEST pet's name (ORDER BY age DESC LIMIT 1)
-- 6. Average age per species

-- Add an AS alias to every calculated column.`, hint: 'TIMESTAMPDIFF(YEAR, birth, CURDATE()). Lifespan: TIMESTAMPDIFF(YEAR, birth, death). Avg: AVG(TIMESTAMPDIFF(...)). Oldest: ORDER BY age DESC LIMIT 1.' },
    ],
    tasks: [
      { id: 'dbms-8-d6-t1', text: 'Write queries using COUNT, AVG, MIN, MAX on the pet table. Run COUNT(*) vs COUNT(death) and explain the difference.', tag: 'lab' },
      { id: 'dbms-8-d6-t2', text: 'Calculate each pet\'s age using TIMESTAMPDIFF. Find average age by species.', tag: 'lab' },
      { id: 'dbms-8-d6-t3', text: 'Use GROUP BY with HAVING. Write a query that shows only species with more than 2 pets.', tag: 'drill' },
      { id: 'dbms-8-d6-t4', text: 'Explain: WHERE vs HAVING. Can you use COUNT() in WHERE? Why not?', tag: 'mcq' },
    ],
  },

  // DAY 7: Relational Theory & Normalisation
  {
    id: 'dbms-8-d7', number: 7,
    title: 'Relational Logic and Normalisation Theory', duration: 60,
    topics: ['Relational Model', 'Primary Keys', 'Foreign Keys', 'ACID', 'Normalisation'],
    alignment: ['W3Schools MySQL Tutorial'],
    blocks: [
      { type: 'callout', id: 'db7-intro', calloutType: 'info', title: 'The Theory Behind the Practice', content: 'Today is theory-heavy — the concepts that appear in **MCQs**. You will learn the relational model, keys (primary/foreign), ACID properties, and normalisation. These are the "why" behind every SQL command you have learned.' },
      { type: 'heading', id: 'db7-relational', level: 2, content: 'The Relational Model — E.F. Codd\'s Vision (1970)' },
      { type: 'paragraph', id: 'db7-rel-def', content: 'The relational model represents data as **two-dimensional tables** (relations) with fixed columns (attributes) and variable rows (tuples). Every table has a unique name. Relationships between tables are established through **keys** — no physical links, just logical connections through matching values.' },
      { type: 'code', id: 'db7-rel-example', lang: 'sql', title: 'Relational Model in Practice', code: `-- Two related tables
CREATE TABLE owners (
    owner_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    phone VARCHAR(15)
);

CREATE TABLE pets (
    pet_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    species VARCHAR(20),
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES owners(owner_id)
    -- owner_id in pets references owner_id in owners
    -- This is how tables are "related"
);` },
      { type: 'heading', id: 'db7-keys', level: 2, content: 'Primary Keys and Foreign Keys' },
      { type: 'table', id: 'db7-keys-table', headers: ['Property', 'Primary Key', 'Foreign Key'], rows: [['Purpose', 'Uniquely identifies each row', 'Links to primary key in another table'], ['NULL allowed?', 'NO — must have a value', 'YES — can be NULL (orphan record)'], ['Duplicates?', 'NO — must be unique', 'YES — many rows can reference same parent'], ['Auto-increment?', 'Often used with AUTO_INCREMENT', 'Not auto-generated'], ['How many per table?', 'Exactly ONE', 'Multiple allowed'], ['Example', 'pet_id, student_id, order_id', 'owner_id references owners(owner_id)']] },
      { type: 'code', id: 'db7-pk-fk', lang: 'sql', title: 'Primary + Foreign Key in Action', code: `CREATE TABLE departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,  -- PK: unique, not null, auto
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_name VARCHAR(50) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    -- dept_id in employees → dept_id in departments
    -- If dept_id=5 does not exist in departments → INSERT fails!
);` },
      { type: 'callout', id: 'db7-fk-rule', calloutType: 'warn', title: 'Referential Integrity — The Foreign Key Contract', content: 'A foreign key enforces **referential integrity**: you cannot insert a row with a foreign key value that does not exist in the referenced table. You also cannot delete a parent row if child rows reference it (unless you use `ON DELETE CASCADE` — which automatically deletes the children too).' },
      { type: 'heading', id: 'db7-acid', level: 2, content: 'ACID Properties — The Database Guarantee' },
      { type: 'table', id: 'db7-acid-table', headers: ['Property', 'Stands For', 'What It Means', 'Real-World Analogy'], rows: [['A', 'Atomicity', 'A transaction is all-or-nothing. Either ALL changes happen, or NONE do.', 'Bank transfer: debit + credit must BOTH happen or NEITHER.'], ['C', 'Consistency', 'Database moves from one valid state to another. Constraints are never violated.', 'After transfer, total money in system is unchanged.'], ['I', 'Isolation', 'Concurrent transactions do not interfere. Each sees a consistent snapshot.', 'Two people booking the last seat — only one succeeds.'], ['D', 'Durability', 'Once committed, changes survive crashes. Stored on disk permanently.', 'Power outage after "payment received" — payment is NOT lost.']] },
      { type: 'heading', id: 'db7-normalisation', level: 2, content: 'Normalisation — Reducing Redundancy' },
      { type: 'paragraph', id: 'db7-norm-def', content: 'Normalisation is the process of **structuring a database to minimize redundancy**. It involves breaking large tables into smaller, related tables. The goal: each piece of data is stored **exactly once**. This prevents update anomalies (changing data in one place but forgetting another).' },
      { type: 'table', id: 'db7-nf-table', headers: ['Normal Form', 'Rule', 'Example Violation', 'Fix'], rows: [['1NF', 'All columns contain atomic (indivisible) values. No repeating groups.', 'Column `phones` = "9876, 5432" (multiple values)', 'Separate phone_numbers table'], ['2NF', '1NF + all non-key columns depend on the WHOLE primary key.', 'Table: (student_id, course_id, student_name, grade). student_name depends only on student_id, not course.', 'Split into students table + enrollments table'], ['3NF', '2NF + no transitive dependencies (non-key depends on another non-key).', 'Table: (emp_id, dept_id, dept_name). dept_name depends on dept_id, which depends on emp_id.', 'Separate departments table']] },
      // Doubt
      { type: 'callout', id: 'db7-d1', calloutType: 'doubt', title: 'Why bother with normalisation? My small database works fine with one big table.', content: 'For tiny databases (under 100 rows), one table is fine. But as data grows:\n1. **Redundancy**: Storing the same data 1000 times wastes space.\n2. **Update anomaly**: If "CSE" → "Computer Science," you must update 1000 rows. Miss one = inconsistency.\n3. **Delete anomaly**: Deleting the last student in "CSE" also deletes the department name.\n4. **Insert anomaly**: You cannot add a new department until a student enrolls in it.\nNormalisation prevents all of these. It is tested in **every DBMS theory exam**.' },
      // Exam
      { type: 'callout', id: 'db7-exam', calloutType: 'exam', title: 'Exam Alert — ST-1 Theory Focus', content: '1. **ACID properties** — 2-mark MCQ. Know what each letter stands for and the meaning.\n2. **Primary Key vs Foreign Key** — differences tested in 1-mark MCQs.\n3. **Normalisation (1NF, 2NF, 3NF)** — 10-mark theory question. Be ready to explain with examples.\n4. **Referential integrity** — what happens when FK constraint is violated?\n5. **Marks: ST-1 has 10 MCQ marks** — at least 3-4 from theory topics today.' },
      // Bridge
      { type: 'callout', id: 'db7-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Primary keys + Foreign keys enable **JOINs** (not in ST-1 syllabus, but essential for real development). ACID properties matter when you build applications with transactions. Normalisation principles apply to NoSQL data modeling and even Python pandas dataframe design.' },
      // Quick Ref
      { type: 'table', id: 'db7-qref', headers: ['Concept', 'Key Point', 'MCQ Tip'], rows: [['Primary Key', 'Unique + NOT NULL. One per table.', 'AUTO_INCREMENT is common.'], ['Foreign Key', 'References PK of another table.', 'Ensures referential integrity.'], ['ACID', 'Atomicity, Consistency, Isolation, Durability.', 'Memorize the full forms.'], ['1NF', 'Atomic values. No repeating groups.', 'No multi-value columns.'], ['2NF', 'No partial dependencies.', 'All non-key depend on FULL PK.'], ['3NF', 'No transitive dependencies.', 'No non-key→non-key dependencies.']] },
      // Quiz
      { type: 'quiz', id: 'db7-quiz', title: 'Day 7 Quiz', questions: [
        { id: 'db7-q1', question: 'What does the \'A\' in ACID stand for?', options: ['Availability', 'Atomicity', 'Abstraction', 'Aggregation'], correctIndex: 1, explanation: 'Atomicity means a transaction is all-or-nothing. Either all changes in the transaction are applied, or none are. Like a bank transfer: both debit and credit must happen together.' },
        { id: 'db7-q2', question: 'Can a foreign key be NULL?', options: ['No — never', 'Yes — it represents no relationship', 'Only in MySQL', 'Only if the primary key is AUTO_INCREMENT'], correctIndex: 1, explanation: 'A foreign key CAN be NULL. It means "this row has no related parent row." For example, a pet with owner_id=NULL has no known owner. But a primary key can NEVER be NULL.' },
        { id: 'db7-q3', question: 'What problem does 3NF (Third Normal Form) solve?', options: ['Duplicate rows', 'Transitive dependencies', 'NULL values', 'Slow queries'], correctIndex: 1, explanation: '3NF eliminates transitive dependencies — where a non-key column depends on another non-key column, rather than directly on the primary key.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'db7-cards', title: 'Day 7 Flashcards', cards: [
        { id: 'db7-f1', front: 'What does ACID stand for?', back: '**A**tomicity (all-or-nothing), **C**onsistency (valid state transitions), **I**solation (concurrent transactions don\'t interfere), **D**urability (committed data survives crashes).', hint: 'A-C-I-D, four guarantees...' },
        { id: 'db7-f2', front: 'Primary Key vs Foreign Key', back: 'PK: unique, NOT NULL, one per table, identifies rows. FK: references PK of another table, can be NULL, multiple allowed, creates relationships. PK = "this row\'s ID." FK = "this row\'s parent\'s ID."', hint: 'Identifier vs reference...' },
        { id: 'db7-f3', front: '1NF, 2NF, 3NF — one line each?', back: '1NF: atomic values, no repeating groups. 2NF: all non-key attributes depend on the WHOLE primary key. 3NF: no transitive dependencies (non-key → non-key).', hint: 'Atomic → Full key → No chains...' },
        { id: 'db7-f4', front: 'What is referential integrity?', back: 'A foreign key value must match an existing primary key in the referenced table (or be NULL). You cannot insert a child row referencing a non-existent parent. Prevents orphan records.', hint: 'FK must point to something real...' },
      ] },
      { type: 'practice', id: 'db7-p1', lang: 'sql', title: 'Practice: Design a Library Schema', starter: `-- Design tables with primary + foreign keys:
-- books (book_id PK, title, author, pub_year)
-- members (member_id PK, name, email)
-- borrowings (borrow_id PK, book_id FK→books, member_id FK→members, borrow_date, return_date)

-- TODO: Write CREATE TABLE for all three with proper keys
CREATE TABLE books (
    -- your columns here
);`, hint: 'Use INT PRIMARY KEY AUTO_INCREMENT for PKs. For FKs: FOREIGN KEY (col) REFERENCES other_table(col). Make sure types match (both INT).' },
      { type: 'practice', id: 'db7-p2', lang: 'sql', title: 'Practice: Normalize This Schema', starter: `-- Your friend designed a single table for a school. It is a mess.
-- Your job: split it into 3NF.

CREATE TABLE report_card (
    student_id INT,
    student_name VARCHAR(50),
    course_id INT,
    course_name VARCHAR(50),
    teacher VARCHAR(50),
    marks INT,
    PRIMARY KEY (student_id, course_id)
);

-- Problems:
-- 1. student_name depends on student_id only (partial dependency → 2NF)
-- 2. course_name, teacher depend on course_id only (partial dependency)
-- 3. teacher depends on course_name (transitive dependency → 3NF)

-- TODO 1: create students(student_id PK, student_name)
-- TODO 2: create courses(course_id PK, course_name, teacher)
-- TODO 3: create enrollments(student_id FK, course_id FK, marks)
--         (composite PK: both FKs)
-- TODO 4: in comments, label which normal form each fix addresses`, hint: 'students: student_id INT PRIMARY KEY, student_name VARCHAR(50). courses: course_id INT PRIMARY KEY, course_name VARCHAR(50), teacher VARCHAR(50). enrollments: student_id INT, course_id INT, marks INT, PRIMARY KEY (student_id, course_id), FOREIGN KEY (student_id) REFERENCES students(student_id), FOREIGN KEY (course_id) REFERENCES courses(course_id). Splitting removes partial deps (2NF) and the transitive teacher→course_name dep (3NF).' },
      { type: 'practice', id: 'db7-p3', lang: 'sql', title: 'Practice: ACID in Action', starter: `-- ACID WALKTHROUGH — run each step and observe.
-- This is a thinking exercise using a bank transfer.

CREATE TABLE accounts (
    id INT PRIMARY KEY,
    name VARCHAR(30),
    balance DECIMAL(10,2)
);

INSERT INTO accounts VALUES (1, 'Riya', 1000.00), (2, 'Amit', 500.00);

-- STEP 1 — ATOMICITY:
-- Run this transfer. What if the second UPDATE fails?
-- (try it: change id=2 to id=99 in the second UPDATE)
START TRANSACTION;
UPDATE accounts SET balance = balance - 200 WHERE id = 1;
UPDATE accounts SET balance = balance + 200 WHERE id = 2;
COMMIT;

-- STEP 2 — fix it with ROLLBACK:
START TRANSACTION;
UPDATE accounts SET balance = balance - 200 WHERE id = 1;
UPDATE accounts SET balance = balance + 200 WHERE id = 99;  -- fails!
ROLLBACK;  -- both changes undone — money is safe

-- STEP 3 — DURABILITY:
-- after COMMIT, restart MySQL. Is the change still there?

-- TODO: explain in comments which ACID property each step demonstrates`, hint: 'Step 1 shows why atomicity matters — a partial transfer loses money. Step 2: ROLLBACK undoes the debit when the credit fails. Step 3: COMMIT makes the change durable — it survives a restart (write-ahead log).' },
      { type: 'practice', id: 'db7-p4', lang: 'sql', title: 'Practice: FK Constraint Explorer', starter: `-- Create a departments + employees pair with a foreign key.
CREATE TABLE departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_name VARCHAR(50) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

INSERT INTO departments (dept_name) VALUES ('CSE'), ('ECE'), ('ME');
INSERT INTO employees (emp_name, dept_id) VALUES
('Vinayak', 1), ('Riya', 1), ('Amit', 2);

-- TODO 1: try inserting an employee with dept_id=99.
--         What error do you get? Why? (comment)
-- TODO 2: try deleting department 1 (which has employees).
--         What happens? Why? (comment)
-- TODO 3: insert an employee with dept_id=NULL — does it work?
--         Why does that make sense for a FK?
-- TODO 4: add ON DELETE CASCADE version (create table copy)
--         and delete dept 1 — what happens to its employees?`, hint: 'dept_id=99 → FK constraint fails (no such parent). Deleting dept 1 → blocked while employees reference it (or CASCADE deletes them). NULL FK = allowed, means "no department."' },
      { type: 'practice', id: 'db7-p5', lang: 'sql', title: 'Practice: NF Violation Spotter', starter: `-- For each table, identify which normal form is violated
-- and write the FIXED schema (split into proper tables).

-- TABLE A:
CREATE TABLE students_courses (
    student_id INT,
    student_name VARCHAR(50),
    course_list VARCHAR(200)   -- "Java, DBMS, SDE" — multiple values!
);
-- Violation: ______ NF (non-atomic column)

-- TABLE B:
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    student_name VARCHAR(50),   -- depends only on student_id
    marks INT,
    PRIMARY KEY (student_id, course_id)
);
-- Violation: ______ NF (partial dependency)

-- TABLE C:
CREATE TABLE employees2 (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(50),
    dept_id INT,
    dept_name VARCHAR(50)       -- depends on dept_id, not emp_id
);
-- Violation: ______ NF (transitive dependency)

-- TODO: write the fixed schema for each (1, 2, or 3 tables).`, hint: 'A: 1NF — split course_list into a separate table. B: 2NF — move student_name to a students table. C: 3NF — move dept_name to a departments table. Fix = normalize.' },
    ],
    tasks: [
      { id: 'dbms-8-d7-t1', text: 'Write CREATE TABLE for a library system (books, members, borrowings) with PRIMARY KEY and FOREIGN KEY constraints.', tag: 'lab' },
      { id: 'dbms-8-d7-t2', text: 'Memorize ACID properties. Write each with a one-line explanation and a real-world example.', tag: 'review' },
      { id: 'dbms-8-d7-t3', text: 'Explain 1NF, 2NF, 3NF with your own examples. What anomaly does each form prevent?', tag: 'review' },
      { id: 'dbms-8-d7-t4', text: 'Can a foreign key be NULL? Can a primary key be NULL? Why?', tag: 'mcq' },
    ],
  },

  // DAY 8: Final Speedrun & Lab Mock
  {
    id: 'dbms-8-d8', number: 8,
    title: 'Final Speedrun and Lab Mock', duration: 60,
    topics: ['ALTER TABLE', 'DROP TABLE', 'Prompt Awareness', 'ST-1 Simulation'],
    alignment: ['SQLBolt Review Lessons 5, 9, X'],
    blocks: [
      { type: 'callout', id: 'db8-intro', calloutType: 'info', title: 'ST-1 Simulation Day', content: 'Today is your **exam dress rehearsal**. You will review DDL modification commands, practice the SQL prompt states, and attempt a timed ST-1 simulation. Treat this like the real exam — 60 minutes, no help, no distractions.' },
      { type: 'heading', id: 'db8-alter', level: 2, content: 'ALTER TABLE — Modifying Structure' },
      { type: 'paragraph', id: 'db8-alter-intro', content: '`ALTER TABLE` changes the structure of an existing table — add/remove columns, change data types, add/drop constraints. It is the last DDL command you need for ST-1.' },
      { type: 'code', id: 'db8-alter-code', lang: 'sql', title: 'ALTER TABLE Operations', code: `-- Add a new column
ALTER TABLE pet ADD COLUMN color VARCHAR(20);

-- Add multiple columns
ALTER TABLE pet
    ADD COLUMN weight DECIMAL(5,2),
    ADD COLUMN vaccinated BOOLEAN DEFAULT FALSE;

-- Modify a column's data type
ALTER TABLE pet MODIFY COLUMN name VARCHAR(50);

-- Rename a column
ALTER TABLE pet CHANGE COLUMN color fur_color VARCHAR(20);

-- Drop a column
ALTER TABLE pet DROP COLUMN weight;

-- Add a primary key
ALTER TABLE pet ADD PRIMARY KEY (name, owner);

-- Drop a table
DROP TABLE pet;              -- deletes structure + data
DROP TABLE IF EXISTS pet;    -- safer: no error if table does not exist

-- Drop a database
DROP DATABASE menagerie;     -- CAREFUL: deletes everything!` },
      { type: 'heading', id: 'db8-prompts', level: 2, content: 'Understanding MySQL Prompts' },
      { type: 'paragraph', id: 'db8-prompts-intro', content: 'The MySQL prompt gives you feedback about the state of your query. Knowing what each prompt means saves you from panic during exams.' },
      { type: 'table', id: 'db8-prompt-table', headers: ['Prompt', 'Meaning', 'What To Do'], rows: [['mysql>', 'Ready for a new query', 'Type your SQL statement'], ['->', 'Waiting for continuation of multi-line query', "Type the rest. End with ';' to execute"], ["'>", 'Waiting for closing single quote', "You forgot a '. Type ' to close, then ;"], ['">', 'Waiting for closing double quote', 'You forgot a ". Type " to close, then ;'], ['\\c', '(You type this)', 'Cancels the current query. Returns to mysql>']] },
      { type: 'code', id: 'db8-prompt-example', lang: 'sql', title: 'Prompt States in Action', code: `mysql> SELECT name FROM pet WHERE species = '
    '> dog            -- forgot closing quote! Type: '
    '> ;
    -- Now it works because the string is closed

-- Alternative: type \\c to cancel and start over
mysql> SELECT * FROM
    -> \\c
mysql>  -- back to clean state` },
      { type: 'callout', id: 'db8-exam-sim', calloutType: 'exam', title: 'ST-1 Simulation — 60 Minutes, 40 Marks', content: '**Set a timer for 60 minutes.** Attempt the following tasks without looking at notes:\n\n**Section A — MCQs (10 marks, 15 min)**\nAnswer the 4 quiz questions below. (Each 2.5 marks)\n\n**Section B — Coding (10 marks, 45 min)**\nWrite 3 SQL queries on the pet table:\n1. (3 marks) Find all female dogs born after 2018, sorted by birth.\n2. (3 marks) Count pets per owner. Show only owners with 2+ pets (HAVING).\n3. (4 marks) Calculate average age per species using TIMESTAMPDIFF.\n\n**Grading**: MCQs: 4×2.5=10. Coding: 3+3+4=10. Total=20 (scaled to 40 for ST-1).\n\nTarget: 16+/20 for distinction. Go!' },
      // Doubt
      { type: 'callout', id: 'db8-d1', calloutType: 'doubt', title: 'I got stuck in \'"> prompt and panic. What is the fastest escape?', content: 'Type `\\c` (backslash + c) and press Enter. This **cancels** whatever query you were typing and returns you to the clean `mysql>` prompt. It works from any prompt state (->, \'>, ">). No need to close the quote properly — `\\c` aborts everything.\n\nSecond option: Type `\';` (close the quote and add semicolon). This executes whatever broken statement you had, which will probably give an error — but it gets you out of the prompt.' },
      // Exam Review
      { type: 'callout', id: 'db8-review', calloutType: 'success', title: '8-Day DBMS Speedrun — Complete!', content: '**Day 1-2**: DDL + basic DQL (CREATE, SELECT, WHERE, DISTINCT)\n**Day 3**: Advanced filtering (AND/OR/BETWEEN/IN/LIKE)\n**Day 4-5**: DML (INSERT, UPDATE, DELETE) + sorting\n**Day 6**: Aggregates (COUNT, AVG, GROUP BY, HAVING)\n**Day 7**: Theory (ACID, Keys, Normalisation)\n**Day 8**: ALTER, DROP, prompts, ST-1 mock\n\n**For ST-1 (40 marks)**\nMCQ: Focus on Days 1, 3, 5, 7 theory. Coding: Days 2-6 practical queries.\n**For CE-1 (20 marks)**\nMCQ: 5 marks from Days 1-7. Coding: 3 tasks (5 marks each) — likely: CREATE TABLE, INSERT/SELECT with WHERE, GROUP BY with HAVING.\n\nKeep practicing raw SQL in the terminal. The more you type, the more it becomes muscle memory.' },
      // Bridge
      { type: 'callout', id: 'db8-bridge', calloutType: 'bridge', title: 'Connect the Dots — What Comes Next', content: 'SQL skills are the foundation for **JDBC (Advanced Java course)**, data analysis with Python (SDE course), and every backend/ML pipeline you will ever build. The relational model you learned here extends to every database: PostgreSQL, Oracle, SQLite — all speak SQL with minor dialect differences.' },
      // Quick Ref
      { type: 'table', id: 'db8-qref', headers: ['Quick Checklist', 'ST-1 Readiness'], rows: [['SELECT + WHERE', '✅ Must be automatic'], ['INSERT/UPDATE/DELETE', '✅ Know safe patterns'], ['ORDER BY + DISTINCT', '✅ Basic query structure'], ['GROUP BY + HAVING', '✅ Aggregate per category'], ['COUNT/AVG/SUM/MIN/MAX', '✅ Know NULL behavior'], ['TIMESTAMPDIFF', '✅ Calculate age/lifespan'], ['CREATE TABLE + data types', '✅ INT, VARCHAR, DATE, DECIMAL'], ['ACID + Normalisation', '✅ Explain each, give examples']] },
      // Quiz (ST-1 MCQs)
      { type: 'quiz', id: 'db8-quiz', title: 'ST-1 MCQ Simulation', questions: [
        { id: 'db8-q1', question: 'Which command is used to remove all rows from a table while keeping the structure?', options: ['DELETE FROM table;', 'DROP TABLE table;', 'TRUNCATE TABLE table;', 'REMOVE FROM table;'], correctIndex: 2, explanation: 'TRUNCATE removes all rows instantly while keeping the table structure. DELETE also removes rows but is slower (row-by-row). DROP removes the entire table (structure + data).' },
        { id: 'db8-q2', question: 'What does the \'I\' in ACID ensure?', options: ['Data is stored on disk', 'Transactions do not interfere with each other', 'All changes are applied or none', 'Data follows all constraints'], correctIndex: 1, explanation: 'Isolation ensures concurrent transactions do not interfere. Each transaction appears to run in isolation, as if it were the only one.' },
        { id: 'db8-q3', question: 'In the relational model, how are relationships between tables established?', options: ['Joins', 'Foreign Keys', 'Indexes', 'Shared column names'], correctIndex: 1, explanation: 'Foreign Keys reference Primary Keys in other tables, creating logical relationships. Joins USE these keys but do not define the relationship.' },
        { id: 'db8-q4', question: 'Which normal form requires that all non-key attributes depend on the whole primary key?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctIndex: 1, explanation: '2NF eliminates partial dependencies — every non-key column must depend on the ENTIRE primary key, not just part of it. Relevant for composite primary keys.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'db8-cards', title: 'Day 8 Flashcards', cards: [
        { id: 'db8-f1', front: 'ALTER TABLE — 4 common operations?', back: 'ADD COLUMN col type; DROP COLUMN col; MODIFY COLUMN col new_type; CHANGE COLUMN old new type; Also: ADD PRIMARY KEY(col), ADD FOREIGN KEY(col) REF other(col).', hint: 'Add, drop, modify, change...' },
        { id: 'db8-f2', front: 'MySQL prompt states and their meanings?', back: 'mysql> = ready. -> = multi-line continuation. \'> = open single quote. "> = open double quote. \\c = cancel and return to mysql>. Semicolon = execute.', hint: 'Arrow and quote prompts...' },
        { id: 'db8-f3', front: 'ST-1 exam breakdown?', back: '60 min, 40 marks. ~10 MCQ marks (theory: ACID, keys, normalisation). ~10-30 SQL coding marks (DDL, DML, aggregates, GROUP BY). Write 3 distinct queries minimum for coding section.', hint: 'MCQ + coding...' },
      ] },
      { type: 'practice', id: 'db8-p1', lang: 'sql', title: 'ST-1 Coding Simulation (Timed)', starter: `-- ⏱ Timer: 45 minutes for these 3 tasks
-- Use the pet table. Write clean, correct SQL.

-- Task 1 (3 marks): Find all female dogs born after 2018, sorted by birth (oldest first)

-- Task 2 (3 marks): Count pets per owner. Show only owners with 2 or more pets.

-- Task 3 (4 marks): Calculate average age per species.
-- Use TIMESTAMPDIFF(YEAR, birth, CURDATE()).
-- Show species name and average age. Round to 1 decimal if you can.`, hint: 'Task1: WHERE species=\'dog\' AND sex=\'f\' AND birth>\'2018-12-31\' ORDER BY birth.\nTask2: GROUP BY owner HAVING COUNT(*)>=2.\nTask3: GROUP BY species. AVG(TIMESTAMPDIFF(YEAR, birth, CURDATE())) AS avg_age.' },
      { type: 'practice', id: 'db8-p2', lang: 'sql', title: 'Practice: Full Schema Design', starter: `-- Design a small e-commerce database:
-- customers (id PK, name, email, city)
-- orders (id PK, customer_id FK, order_date, total_amount)
-- order_items (id PK, order_id FK, product_name, quantity, price)

-- TODO: Write CREATE TABLE for all three with proper constraints
-- TODO: Insert sample data (2 customers, 3 orders, 5 order_items)
-- TODO: Write a query: total spent per customer (JOIN + GROUP BY)`, hint: 'Customers PK: customer_id INT AUTO_INCREMENT. Orders FK: FOREIGN KEY(customer_id) REFERENCES customers(customer_id). To join: SELECT c.name, SUM(o.total_amount) FROM customers c JOIN orders o ON c.id=o.customer_id GROUP BY c.id.' },
      { type: 'practice', id: 'db8-p3', lang: 'sql', title: 'Practice: ALTER TABLE Workshop', starter: `-- Create a table, then modify it step by step with ALTER TABLE.
CREATE TABLE inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    stock INT
);

-- TODO 1: ADD a column: price DECIMAL(6,2)
-- TODO 2: ADD a column: category VARCHAR(20) AFTER name
-- TODO 3: MODIFY the stock column to BIGINT
-- TODO 4: RENAME the column name -> product_name
--   (MySQL: ALTER TABLE inventory RENAME COLUMN name TO product_name;)
-- TODO 5: CHANGE column stock to qty_available with type INT NOT NULL DEFAULT 0
-- TODO 6: DROP the category column
-- TODO 7: verify each step with DESCRIBE inventory
-- TODO 8: RENAME the whole table to products`, hint: 'ADD: ALTER TABLE t ADD COLUMN price DECIMAL(6,2). MODIFY: ALTER TABLE t MODIFY stock BIGINT. CHANGE: ALTER TABLE t CHANGE stock qty_available INT NOT NULL DEFAULT 0. DROP: ALTER TABLE t DROP COLUMN category. RENAME TABLE inventory TO products.' },
      { type: 'practice', id: 'db8-p4', lang: 'sql', title: 'Practice: MySQL Prompt States', starter: `-- KNOW YOUR PROMPTS — the ST-1 exam loves these.
-- Match each prompt to its meaning:

-- 1. mysql>        a) waiting for closing single quote
-- 2. ->            b) ready for a new query
-- 3. '>            c) waiting for closing double quote
-- 4. ">            d) multi-line query continuation

-- Answers (write in comments): 1=__, 2=__, 3=__, 4=__

-- TODO 1: type an unclosed string: SELECT 'hello;  (no closing quote)
--         what prompt appears? how do you escape?
-- TODO 2: cancel a broken query with \\c
-- TODO 3: write a 3-line query and observe the -> prompts
-- TODO 4: how do you exit the mysql monitor? (\\q or exit)

-- PREDICT: you typed:  SELECT * FROM pet WHERE name = 'Buddy
-- without the closing quote. What prompt do you see?`, hint: '1=b, 2=d, 3=a, 4=c. Unclosed quote → \'> prompt. \\c cancels. \\q or exit quits. Missing closing quote → \'> — type the quote then ; to finish, or \\c to cancel.' },
      { type: 'practice', id: 'db8-p5', lang: 'sql', title: 'Practice: Exam Speed Drill', starter: `-- 10-minute drill. Write each query from memory — no peeking at notes.
-- Use the pet table.

-- 1. All pets, sorted by birth date oldest first
-- 2. Count of pets per species (highest first)
-- 3. Pets whose owner is Harold, sorted by name
-- 4. Average age of all pets
-- 5. Species with MORE than 2 pets
-- 6. Pets born between 2016 and 2020
-- 7. Names starting with 'B' and ending with 'y'
-- 8. Number of pets with a known death date
-- 9. Youngest pet overall (just the birth date)
-- 10. Owners with exactly 2 pets

-- Score yourself: 9-10 = exam ready. 6-8 = review Day 2-6. <6 = redo the labs.`, hint: '1 ORDER BY birth. 2 GROUP BY species ORDER BY COUNT(*) DESC. 4 AVG(TIMESTAMPDIFF(YEAR,birth,CURDATE())). 5 HAVING COUNT(*)>2. 6 BETWEEN. 7 LIKE \'B%y\'. 8 COUNT(death). 9 MAX(birth). 10 HAVING COUNT(*)=2.' },
    ],
    tasks: [
      { id: 'dbms-8-d8-t1', text: 'Complete the timed ST-1 simulation. Score yourself honestly. Review weak areas.', tag: 'review' },
      { id: 'dbms-8-d8-t2', text: 'Write ALTER TABLE to add/drop/modify columns. Test on a sample table.', tag: 'lab' },
      { id: 'dbms-8-d8-t3', text: 'Memorize the 4 MySQL prompt states. Practice \\c to cancel multi-line queries.', tag: 'drill' },
      { id: 'dbms-8-d8-t4', text: 'Design a complete schema: customers→orders→order_items with PKs and FKs.', tag: 'lab' },
    ],
  },
];
