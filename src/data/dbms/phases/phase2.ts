import type { Day } from '../../../types';

export const dbmsPhase2days: Day[] = [
  // DAY 3: Advanced Filtering & Logic
  {
    id: 'dbms-8-d3', number: 3,
    title: 'Advanced Filtering and Logic', duration: 60,
    topics: ['AND / OR / NOT', 'Comparison Operators', 'BETWEEN', 'IN', 'LIKE'],
    alignment: ['SQLBolt Lessons 3 & 4'],
    blocks: [
      { type: 'callout', id: 'db3-intro', calloutType: 'info', title: 'Getting Surgical with Your Queries', content: 'Simple WHERE is like a wide net. Today you learn to be a **surgeon** — combining multiple conditions with AND/OR, matching patterns with LIKE, selecting ranges with BETWEEN, and checking memberships with IN. These are the tools that transform basic queries into precise data extraction.' },
      { type: 'heading', id: 'db3-logical', level: 2, content: 'AND, OR, NOT — Combining Conditions' },
      { type: 'table', id: 'db3-logic-table', headers: ['Operator', 'Meaning', 'Truth Rule', 'Example'], rows: [['AND', 'Both conditions true', 'TRUE AND TRUE = TRUE. Everything else = FALSE.', "WHERE species='dog' AND sex='f'"], ['OR', 'At least one true', 'FALSE OR FALSE = FALSE. Everything else = TRUE.', "WHERE species='dog' OR species='cat'"], ['NOT', 'Reverses the condition', 'NOT TRUE = FALSE. NOT FALSE = TRUE.', "WHERE NOT species='dog'"], ['() parentheses', 'Group conditions', 'Evaluated first, like math.', "WHERE (a OR b) AND c"] ] },
      { type: 'code', id: 'db3-logic-code', lang: 'sql', title: 'AND/OR/NOT in Action', code: `-- AND: both conditions must be true
SELECT name, species, sex FROM pet
WHERE species = 'dog' AND sex = 'f';
-- Returns: only female dogs

-- OR: at least one condition true
SELECT name, species FROM pet
WHERE species = 'dog' OR species = 'cat';
-- Returns: all dogs AND all cats

-- NOT: flips the condition
SELECT name, species FROM pet
WHERE NOT species = 'dog';
-- Returns: everything EXCEPT dogs

-- Combined: parentheses control evaluation order
SELECT name, species, sex FROM pet
WHERE (species = 'dog' OR species = 'cat') AND sex = 'f';
-- Returns: female dogs + female cats (parentheses group the OR first)` },
      { type: 'callout', id: 'db3-parens', calloutType: 'warn', title: 'Parentheses Are NOT Optional', content: 'Without parentheses, AND has **higher precedence** than OR.\n\n`WHERE species = \'dog\' OR species = \'cat\' AND sex = \'f\'`\nThis actually means: `species = \'dog\' OR (species = \'cat\' AND sex = \'f\')`\nReturns: ALL dogs + only female cats. Probably not what you wanted!\n\n**Always use parentheses** when mixing AND and OR.' },
      { type: 'heading', id: 'db3-between', level: 2, content: 'BETWEEN — Ranges Made Easy' },
      { type: 'code', id: 'db3-between-code', lang: 'sql', title: 'BETWEEN Examples', code: `-- BETWEEN is inclusive (includes both endpoints!)
SELECT name, birth FROM pet
WHERE birth BETWEEN '2015-01-01' AND '2020-12-31';
-- Returns: pets born from 2015 through 2020 (inclusive)

-- Equivalent to:
SELECT name, birth FROM pet
WHERE birth >= '2015-01-01' AND birth <= '2020-12-31';

-- NOT BETWEEN — outside the range
SELECT name, birth FROM pet
WHERE birth NOT BETWEEN '2015-01-01' AND '2020-12-31';` },
      { type: 'heading', id: 'db3-in', level: 2, content: 'IN — Check Against a List' },
      { type: 'code', id: 'db3-in-code', lang: 'sql', title: 'IN Examples', code: `-- IN replaces multiple OR conditions
SELECT name, species FROM pet
WHERE species IN ('dog', 'cat', 'bird');
-- Equivalent to:
-- WHERE species = 'dog' OR species = 'cat' OR species = 'bird'

-- NOT IN — exclude a list
SELECT name, species FROM pet
WHERE species NOT IN ('snake', 'spider');

-- IN with numbers
SELECT name FROM pet
WHERE YEAR(birth) IN (2018, 2019, 2020);  -- born in those years` },
      { type: 'heading', id: 'db3-like', level: 2, content: 'LIKE — Pattern Matching' },
      { type: 'paragraph', id: 'db3-like-intro', content: '`LIKE` searches for patterns in text. Use `%` (matches **any sequence** of characters) and `_` (matches **exactly one** character). This is SQL\'s version of "search" or "contains."' },
      { type: 'code', id: 'db3-like-code', lang: 'sql', title: 'LIKE Pattern Examples', code: `-- % matches ANY number of characters (including zero)
SELECT name FROM pet WHERE name LIKE 'B%';
-- Matches: Buddy, Bella, Bob (starts with B)

SELECT name FROM pet WHERE name LIKE '%y';
-- Matches: Buddy, Lucy, Molly (ends with y)

SELECT name FROM pet WHERE name LIKE '%ar%';
-- Matches: Charlie, Marley (contains 'ar' anywhere)

-- _ matches exactly ONE character
SELECT name FROM pet WHERE name LIKE 'B_d';
-- Matches: Bud, Bid, Bad (B + one char + d) — NOT Bird (2 chars)

-- NOT LIKE — does not match the pattern
SELECT name FROM pet WHERE name NOT LIKE '%y';` },
      { type: 'callout', id: 'db3-like-case', calloutType: 'warn', title: 'LIKE Is Case-Insensitive in MySQL (by Default)', content: "In MySQL, `LIKE 'a%'` matches 'Alice', 'alice', and 'ALICE'. On other databases (PostgreSQL, Oracle), LIKE may be case-sensitive. Always check your DBMS behavior. For case-sensitive matching in MySQL, use `LIKE BINARY 'A%'`." },
      // Doubt
      { type: 'callout', id: 'db3-d1', calloutType: 'doubt', title: 'When should I use IN vs multiple OR conditions?', content: '**IN is cleaner** when checking against a list of values. `WHERE species IN (\'dog\', \'cat\')` is much more readable than `WHERE species = \'dog\' OR species = \'cat\'`.\n\nPerformance-wise, they are equivalent in MySQL. But IN has one advantage: you can use a subquery inside IN: `WHERE id IN (SELECT pet_id FROM owners WHERE city = \'Mumbai\')`. You cannot do that with OR.' },
      { type: 'callout', id: 'db3-d2', calloutType: 'doubt', title: 'What is the difference between % and _ in LIKE?', content: '`%` = **any number** of characters (0, 1, or many). Like a wildcard that expands.\n`_` = **exactly one** character. Like a placeholder for a single unknown character.\n\n`LIKE \'A%\'` → A, Ab, Abc, Abcdefg (everything starting with A)\n`LIKE \'A_\'` → Ab, A1, Az (A followed by exactly ONE character)\n`LIKE \'A__\'` → Abc, A12 (A followed by exactly TWO characters)' },
      // Exam
      { type: 'callout', id: 'db3-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **BETWEEN is inclusive** — includes both endpoints. Trick: "How many rows for WHERE x BETWEEN 1 AND 5?" Answer: rows with x=1,2,3,4,5.\n2. **LIKE with % at the beginning (`%text`) cannot use indexes** — performance question.\n3. **AND has higher precedence than OR** — parentheses question.\n4. **NOT IN with NULL values can produce unexpected results** — advanced MCQ.' },
      // Bridge
      { type: 'callout', id: 'db3-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'The pattern matching you learn today (LIKE) is used heavily in data cleaning (removing bad records). AND/OR logic returns in **HAVING (Day 6)** for filtering after aggregation. BETWEEN is the foundation for **date range queries** in real-world reporting.' },
      // Quick Ref
      { type: 'table', id: 'db3-qref', headers: ['Pattern/Operator', 'Syntax', 'Example'], rows: [['AND', 'WHERE a AND b', "WHERE species='dog' AND sex='f'"], ['OR', 'WHERE a OR b', "WHERE species='dog' OR species='cat'"], ['BETWEEN', 'WHERE col BETWEEN x AND y', 'WHERE birth BETWEEN \'2018\' AND \'2022\''], ['IN', 'WHERE col IN (v1,v2)', "WHERE species IN ('dog','cat')"], ['LIKE %', 'Matches any chars', "LIKE 'A%' → starts with A"], ['LIKE _', 'Matches one char', "LIKE 'B_d' → B+d+anything"] ] },
      // Quiz
      { type: 'quiz', id: 'db3-quiz', title: 'Day 3 Quiz', questions: [
        { id: 'db3-q1', question: 'Is BETWEEN inclusive of the endpoints?', options: ['Yes — includes both', 'No — excludes both', 'Includes lower, excludes upper', 'Depends on data type'], correctIndex: 0, explanation: 'BETWEEN is inclusive: WHERE x BETWEEN 1 AND 5 includes 1 and 5. Equivalent to x >= 1 AND x <= 5.' },
        { id: 'db3-q2', question: 'What does WHERE name LIKE \'B_d\' match?', options: ['Bird', 'Bad, Bed, Bid, Bud', 'Any name starting with B', 'Bad only'], correctIndex: 1, explanation: '_ matches exactly ONE character. B_d matches B + any single character + d. So Bad, Bed, Bid, Bod, Bud all match. Bird has TWO characters (ir) — does NOT match.' },
        { id: 'db3-q3', question: 'What happens without parentheses: WHERE a OR b AND c?', options: ['(a OR b) AND c', 'a OR (b AND c)', 'All conditions are equal', 'Syntax error'], correctIndex: 1, explanation: 'AND has higher precedence. It is evaluated as a OR (b AND c). Always use parentheses for clarity when mixing AND/OR.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'db3-cards', title: 'Day 3 Flashcards', cards: [
        { id: 'db3-f1', front: 'BETWEEN — inclusive or exclusive?', back: 'INCLUSIVE of both endpoints. WHERE x BETWEEN 1 AND 5 = x >= 1 AND x <= 5. For dates, includes both boundary dates.', hint: 'Both ends count...' },
        { id: 'db3-f2', front: 'IN vs multiple OR — which to use?', back: 'IN is cleaner for lists: WHERE x IN (1,2,3) instead of x=1 OR x=2 OR x=3. Functionally equivalent, but IN also supports subqueries. Use IN for readability.', hint: 'Shorter and cleaner...' },
        { id: 'db3-f3', front: '% vs _ in LIKE?', back: '% = any number of characters (0 or more). _ = exactly one character. LIKE \'A%\' matches A, Ab, Abc. LIKE \'A_\' matches only Ab, A1 (A + one char).', hint: 'Any vs exactly one...' },
        { id: 'db3-f4', front: 'AND vs OR precedence?', back: 'AND has higher precedence. WHERE a OR b AND c = a OR (b AND c). Always use parentheses to be explicit about your intent.', hint: 'AND wins over OR...' },
      ] },
      { type: 'practice', id: 'db3-p1', lang: 'sql', title: 'Practice: Pet Detective Queries', starter: `-- Write queries for:
-- 1. All pets born between 2015 and 2020 (inclusive)
-- 2. Female dogs OR female cats
-- 3. Any pet whose name starts with 'B'
-- 4. Species that are NOT dog, cat, or bird (use NOT IN)
-- 5. Pets whose name contains 'ar' (like Charlie, Marley)

SELECT * FROM pet;  -- start exploring here`, hint: 'Use BETWEEN for dates. Parentheses for (dog OR cat) AND female. LIKE \'B%\' for starts with. NOT IN for exclusion.' },
      { type: 'practice', id: 'db3-p2', lang: 'sql', title: 'Practice: Build a Product Filter', starter: `-- Imagine an e-commerce database
CREATE TABLE products (
    name VARCHAR(50), category VARCHAR(20),
    price DECIMAL(6,2), stock INT
);

-- TODO: Write queries for:
-- 1. Products priced between 500 and 2000
-- 2. Products in 'Electronics' or 'Books' category with stock > 10
-- 3. Product names starting with 'S' or 'P'`, hint: 'BETWEEN 500 AND 2000. Use (cat=\'Elec\' OR cat=\'Books\') AND stock>10. Use LIKE with OR: name LIKE \'S%\' OR name LIKE \'P%\'.' },
    ],
    tasks: [
      { id: 'dbms-8-d3-t1', text: 'Write queries using AND, OR, NOT on the pet table. Mix them with parentheses.', tag: 'lab' },
      { id: 'dbms-8-d3-t2', text: 'Find pets born between two dates using BETWEEN. Verify it includes the endpoints.', tag: 'lab' },
      { id: 'dbms-8-d3-t3', text: 'Use LIKE with %, _, and NOT LIKE. Find names starting with B and names exactly 4 characters.', tag: 'drill' },
    ],
  },

  // DAY 4: Sorting & Data Insertion (DML Part 1)
  {
    id: 'dbms-8-d4', number: 4,
    title: 'Sorting and Data Manipulation (DML — Part 1)', duration: 60,
    topics: ['ORDER BY', 'ASC / DESC', 'INSERT INTO', 'NULL'],
    alignment: ['SQLBolt Lessons 13 & 14'],
    blocks: [
      { type: 'callout', id: 'db4-intro', calloutType: 'info', title: 'From Reading to Writing', content: 'So far you have only **read** data (SELECT). Today you start **writing** data with `INSERT INTO` and learn to **sort** results with `ORDER BY`. Reading + Writing = a complete database skillset.' },
      { type: 'heading', id: 'db4-order', level: 2, content: 'ORDER BY — Controlling the Output' },
      { type: 'paragraph', id: 'db4-order-intro', content: 'Databases do NOT guarantee any order unless you explicitly ask for it. `ORDER BY` sorts your results. Without it, rows can appear in any order — and that order can change between queries, even with the same data.' },
      { type: 'code', id: 'db4-order-code', lang: 'sql', title: 'ORDER BY Examples', code: `-- Sort by birth date (oldest first = ascending, the default)
SELECT name, birth FROM pet ORDER BY birth;

-- Explicit ascending (same as default)
SELECT name, birth FROM pet ORDER BY birth ASC;

-- Descending (newest first)
SELECT name, birth FROM pet ORDER BY birth DESC;

-- Sort by multiple columns: species first, then birth within each species
SELECT name, species, birth FROM pet
ORDER BY species ASC, birth DESC;
-- All birds (sorted by birth, newest first), then cats, then dogs...

-- ORDER BY with WHERE
SELECT name, species FROM pet
WHERE sex = 'f'
ORDER BY name;` },
      { type: 'callout', id: 'db4-order-position', calloutType: 'tip', title: 'Sort by Column Position (Shortcut)', content: 'You can use column numbers instead of names: `ORDER BY 2, 3` sorts by the 2nd column, then the 3rd. This is shorter but **fragile** — if you change the SELECT columns, the sort breaks silently. Use column names unless you are writing a quick throwaway query.' },
      { type: 'heading', id: 'db4-insert', level: 2, content: 'INSERT INTO — Adding Data to Tables' },
      { type: 'paragraph', id: 'db4-insert-intro', content: '`INSERT INTO` is your first **DML** (Data Manipulation Language) command. Unlike SELECT (read-only), INSERT actually **modifies** the database. The data you add is permanent until deleted or updated.' },
      { type: 'code', id: 'db4-insert-code', lang: 'sql', title: 'INSERT INTO — All Variations', code: `-- Method 1: Specify columns (RECOMMENDED — clearer, safer)
INSERT INTO pet (name, owner, species, sex, birth, death)
VALUES ('Puffball', 'Diane', 'hamster', 'f', '2020-03-30', NULL);

-- Method 2: Omit column list (values must match ALL columns in table order)
INSERT INTO pet
VALUES ('Fluffy', 'Harold', 'cat', 'f', '2018-05-15', NULL);

-- Method 3: Insert only specific columns (others get NULL or default)
INSERT INTO pet (name, species, sex)
VALUES ('Tweety', 'bird', 'm');
-- owner, birth, death will be NULL

-- Insert multiple rows at once (faster than individual inserts)
INSERT INTO pet (name, owner, species, sex, birth)
VALUES
    ('Max', 'Alice', 'dog', 'm', '2019-06-01'),
    ('Luna', 'Alice', 'cat', 'f', '2020-01-15'),
    ('Charlie', 'Bob', 'dog', 'm', '2017-11-20');` },
      { type: 'callout', id: 'db4-insert-gotcha', calloutType: 'warn', title: 'INSERT Without Column List — Dangerous!', content: '`INSERT INTO pet VALUES (...)` assumes you are providing values for **every column in the exact table order**. If someone adds a column to the table later, your INSERT breaks. Always use the explicit form: `INSERT INTO pet (col1, col2) VALUES (val1, val2)`. This is mandatory in production code.' },
      { type: 'heading', id: 'db4-null', level: 2, content: 'NULL in INSERT — The Missing Value' },
      { type: 'code', id: 'db4-null-code', lang: 'sql', title: 'Working with NULL', code: `-- Explicitly set NULL for unknown values
INSERT INTO pet (name, species, sex, birth, death)
VALUES ('Whiskers', 'cat', 'm', '2019-07-07', NULL);
-- death is NULL (pet is alive) — you explicitly said "unknown"

-- In text files for LOAD DATA, use \\N (backslash-N) for NULL
-- LOAD DATA LOCAL INFILE 'pets.txt' INTO TABLE pet;

-- Finding rows with NULL
SELECT * FROM pet WHERE death IS NULL;      -- alive pets
SELECT * FROM pet WHERE death IS NOT NULL;  -- deceased pets
SELECT * FROM pet WHERE owner IS NOT NULL;  -- pets with known owners` },
      // Doubt
      { type: 'callout', id: 'db4-d1', calloutType: 'doubt', title: 'What if I INSERT a row without specifying all columns?', content: 'Columns you omit get:\n- **NULL** — if the column allows NULL (default).\n- **The DEFAULT value** — if the column has a DEFAULT defined (e.g., `status VARCHAR(10) DEFAULT \'active\'`).\n- **AUTO_INCREMENT value** — for auto-increment primary keys.\n- **ERROR** — if the column is NOT NULL and has no DEFAULT.\nAlways check your table structure with `DESCRIBE table;` before inserting.' },
      // Exam
      { type: 'callout', id: 'db4-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **ORDER BY default is ASC** — not specifying is the same as ASC.\n2. **INSERT without column list is dangerous** — exam may ask "what happens if columns are added?"\n3. **NULL vs empty string**: NULL is unknown, \'\' is a known empty value. Different concepts.\n4. **CE-1 coding (5 marks)**: you will be asked to INSERT multiple rows and then SELECT with ORDER BY.' },
      // Bridge
      { type: 'callout', id: 'db4-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'INSERT (today) + SELECT (Day 2) + WHERE (Day 3) = the foundation of every data pipeline. Tomorrow: UPDATE and DELETE (DML Part 2) complete the CRUD operations. ORDER BY will combine with GROUP BY (Day 6) for reporting.' },
      // Quick Ref
      { type: 'table', id: 'db4-qref', headers: ['Operation', 'Syntax', 'Notes'], rows: [['Sort ascending', 'ORDER BY col ASC', 'Default. ASC is optional.'], ['Sort descending', 'ORDER BY col DESC', 'Reverse order.'], ['Multi-column sort', 'ORDER BY c1, c2 DESC', 'c1 asc, then c2 desc within c1 groups.'], ['Insert (explicit)', 'INSERT INTO t(c1,c2) VALUES(v1,v2)', 'RECOMMENDED — column list specified.'], ['Insert (implicit)', 'INSERT INTO t VALUES(v1,v2)', 'DANGEROUS — depends on column order.'], ['Insert NULL', 'INSERT INTO t(c1) VALUES(NULL)', 'Or omit column if nullable.']] },
      // Quiz
      { type: 'quiz', id: 'db4-quiz', title: 'Day 4 Quiz', questions: [
        { id: 'db4-q1', question: 'What is the default sort order for ORDER BY?', options: ['DESC (descending)', 'ASC (ascending)', 'Random', 'No default — must specify'], correctIndex: 1, explanation: 'ASC (ascending) is the default. ORDER BY name and ORDER BY name ASC produce identical results.' },
        { id: 'db4-q2', question: "Why is INSERT INTO pet VALUES ('Max', 'Alice') dangerous?", options: ['It is slower', 'It depends on column order — breaks if table structure changes', 'It does not work with NULL', 'VALUES is deprecated'], correctIndex: 1, explanation: 'Without a column list, the values must match ALL columns in the exact table order. If someone adds/removes a column, the INSERT breaks or inserts data into wrong columns.' },
        { id: 'db4-q3', question: 'What happens to omitted columns in an INSERT?', options: ['They get 0 or empty string', 'They get NULL or the DEFAULT value', 'Error — all columns are required', 'The INSERT fails silently'], correctIndex: 1, explanation: 'Omitted columns get NULL (if nullable) or their DEFAULT value. If a column is NOT NULL and has no DEFAULT, the INSERT fails with an error.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'db4-cards', title: 'Day 4 Flashcards', cards: [
        { id: 'db4-f1', front: 'ORDER BY syntax?', back: 'ORDER BY column [ASC|DESC]. Multiple: ORDER BY col1 ASC, col2 DESC. Sorts col1 first, then col2 within same col1 values. Default is ASC.', hint: 'Sorting your results...' },
        { id: 'db4-f2', front: 'INSERT INTO — safe vs unsafe?', back: 'SAFE: INSERT INTO t(col1, col2) VALUES(v1, v2). Specifies columns explicitly.\nUNSAFE: INSERT INTO t VALUES(v1, v2). Depends on column order, breaks if table changes.', hint: 'Always specify columns...' },
        { id: 'db4-f3', front: 'NULL in INSERT?', back: 'Write NULL explicitly, or omit the column (if nullable). NULL means "unknown." Omitted columns get NULL (if nullable) or DEFAULT value. NOT NULL columns without DEFAULT will cause an error.', hint: 'Explicit NULL or omission...' },
      ] },
      { type: 'practice', id: 'db4-p1', lang: 'sql', title: 'Practice: Populate the pet Table', starter: `-- Insert at least 8 pets into your pet table
INSERT INTO pet (name, owner, species, sex, birth, death)
VALUES
    ('Fluffy', 'Harold', 'cat', 'f', '2018-05-15', NULL),
    ('Buffy', 'Harold', 'dog', 'f', '2019-03-22', NULL);
-- TODO: Add 6 more pets of different species
-- At least one with a death date, at least one with NULL owner

-- After inserting, write a query that shows all pets sorted by birth (oldest first)`, hint: 'Mix species: dog, cat, bird, hamster, snake. Some with death dates (deceased), some with NULL death (alive). Use ORDER BY birth at the end.' },
      { type: 'practice', id: 'db4-p2', lang: 'sql', title: 'Practice: Student Records', starter: `CREATE TABLE students (
    id INT, name VARCHAR(50), branch VARCHAR(10),
    semester INT, gpa DECIMAL(3,2)
);

-- TODO: Insert 5 students
INSERT INTO students (id, name, branch, semester, gpa)
VALUES (1, 'Vinay', 'AIML', 3, 8.5);

-- TODO: Query students sorted by GPA (highest first)
-- TODO: Query AIML students sorted by name`, hint: 'ORDER BY gpa DESC. WHERE branch = \'AIML\' ORDER BY name. Use explicit column list in INSERT.' },
    ],
    tasks: [
      { id: 'dbms-8-d4-t1', text: 'Insert 10+ rows into the pet table. Use both explicit and multi-row INSERT syntax.', tag: 'lab' },
      { id: 'dbms-8-d4-t2', text: 'Write SELECT queries sorted by: birth (oldest first), species then name, birth descending.', tag: 'lab' },
      { id: 'dbms-8-d4-t3', text: 'Insert a row with NULL values. Query to find all rows where a column IS NULL.', tag: 'drill' },
    ],
  },

  // DAY 5: Updates & Deletions (DML Part 2)
  {
    id: 'dbms-8-d5', number: 5,
    title: 'Data Integrity: Updates and Deletions (DML — Part 2)', duration: 60,
    topics: ['UPDATE', 'DELETE', 'IS NULL / IS NOT NULL', 'DESCRIBE'],
    alignment: ['SQLBolt Lesson 15'],
    blocks: [
      { type: 'callout', id: 'db5-intro', calloutType: 'info', title: 'Modifying Existing Data — With Care', content: 'UPDATE and DELETE are the most **dangerous** SQL commands. One missing WHERE clause can destroy your entire table. Today you will learn to modify data safely, check conditions first, and always verify before executing.' },
      { type: 'heading', id: 'db5-update', level: 2, content: 'UPDATE — Changing Existing Rows' },
      { type: 'code', id: 'db5-update-code', lang: 'sql', title: 'UPDATE Syntax and Examples', code: `-- Basic syntax: UPDATE table SET column = value WHERE condition;

-- Update a single row (WHERE with primary key = safest)
UPDATE pet SET birth = '2019-06-15'
WHERE name = 'Fluffy' AND owner = 'Harold';

-- Update multiple rows
UPDATE pet SET owner = 'Gwen' WHERE owner = 'Gwenyth';
-- All pets owned by 'Gwenyth' now belong to 'Gwen'

-- Update multiple columns at once
UPDATE pet
SET owner = 'Diane', species = 'hamster'
WHERE name = 'Puffball';

-- ⚠️ DANGER: Omitting WHERE updates EVERY row!
UPDATE pet SET owner = 'Unknown';
-- Every pet in the table now has owner = 'Unknown' — likely wrong!` },
      { type: 'callout', id: 'db5-update-safety', calloutType: 'warn', title: 'The Golden Rule of UPDATE and DELETE', content: '**ALWAYS test with SELECT first!**\n```sql\n-- Step 1: See what rows will be affected\nSELECT * FROM pet WHERE name = \'Fluffy\';\n\n-- Step 2: Check the row count — is it what you expect?\nSELECT COUNT(*) FROM pet WHERE name = \'Fluffy\';\n\n-- Step 3: Now run your UPDATE\nUPDATE pet SET birth = \'2019-06-15\' WHERE name = \'Fluffy\';\n```\nIf Step 1 returns 500 rows when you expected 1, you just saved yourself from a disaster.' },
      { type: 'heading', id: 'db5-delete', level: 2, content: 'DELETE — Removing Rows' },
      { type: 'code', id: 'db5-delete-code', lang: 'sql', title: 'DELETE Syntax', code: `-- Delete a specific row (always use WHERE!)
DELETE FROM pet WHERE name = 'Puffball' AND species = 'hamster';

-- Delete all deceased pets
DELETE FROM pet WHERE death IS NOT NULL;

-- ⚠️ DANGER: This deletes EVERYTHING!
DELETE FROM pet;
-- All rows gone. Table structure remains. No undo.` },
      { type: 'callout', id: 'db5-truncate', calloutType: 'tip', title: 'DELETE vs TRUNCATE vs DROP', content: '**DELETE**: Removes rows one by one. Can have WHERE. Can be rolled back (in transactions). Slower.\n**TRUNCATE**: Removes ALL rows instantly. Cannot have WHERE. Cannot be rolled back. Resets auto-increment. Faster.\n**DROP**: Deletes the ENTIRE table (structure + data). Gone forever.\n\nFor clearing a table completely: use TRUNCATE (fast). For selective removal: use DELETE with WHERE.' },
      { type: 'heading', id: 'db5-describe', level: 2, content: 'DESCRIBE — Know Your Table Before You Modify' },
      { type: 'code', id: 'db5-describe-code', lang: 'sql', title: 'DESCRIBE Output', code: `-- Always check structure before INSERT/UPDATE
DESCRIBE pet;
-- Shows: Field, Type, Null, Key, Default, Extra
-- 'Null' column: YES = allows NULL, NO = must have value
-- 'Key' column: PRI = primary key, UNI = unique

-- Also try:
SHOW COLUMNS FROM pet;          -- same as DESCRIBE
SHOW CREATE TABLE pet;          -- shows the full CREATE statement` },
      // Doubt
      { type: 'callout', id: 'db5-d1', calloutType: 'doubt', title: 'Can I undo a DELETE or UPDATE?', content: '**Only if you used a transaction.** Without transactions (default in MySQL with MyISAM tables), UPDATE and DELETE are **permanent and immediate** — no undo.\n\nSafety practices:\n1. Always test with SELECT first.\n2. Use transactions: `START TRANSACTION; UPDATE ...;` — if wrong: `ROLLBACK;` — if correct: `COMMIT;`\n3. Take a backup before major changes: `mysqldump -u root -p menagerie > backup.sql`\n4. In XAMPP/phpMyAdmin, you can export the table before modifying.' },
      // Exam
      { type: 'callout', id: 'db5-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **UPDATE without WHERE** — what happens? (Updates every row). Guaranteed MCQ.\n2. **DELETE vs TRUNCATE vs DROP** — know the differences.\n3. **NULL check with IS NULL, not = NULL** — tested again and again.\n4. **DESCRIBE before DML** — practical coding question may ask you to verify structure first.\n5. **CE-1 coding (5 marks)**: Write UPDATE and DELETE with correct WHERE clauses.' },
      // Bridge
      { type: 'callout', id: 'db5-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'CRUD operations are now complete: CREATE (Day 1), READ/SELECT (Day 2), UPDATE (today), DELETE (today). Tomorrow: aggregation functions combine with SELECT for powerful data analysis. The DESCRIBE command will be essential when we add ALTER TABLE (Day 8).' },
      // Quick Ref
      { type: 'table', id: 'db5-qref', headers: ['Command', 'Effect', 'Reversible?', 'Speed'], rows: [['UPDATE ... SET ... WHERE', 'Changes specific rows', 'Only with transaction', 'Moderate'], ['UPDATE ... SET ... (no WHERE)', 'Changes EVERY row', 'Only with transaction', 'Moderate'], ['DELETE ... WHERE', 'Removes specific rows', 'Only with transaction', 'Slow (row-by-row)'], ['DELETE (no WHERE)', 'Removes ALL rows', 'Only with transaction', 'Slow'], ['TRUNCATE', 'Removes ALL rows instantly', 'NO', 'Very fast'], ['DROP TABLE', 'Deletes table + data', 'NO', 'Instant']] },
      // Quiz
      { type: 'quiz', id: 'db5-quiz', title: 'Day 5 Quiz', questions: [
        { id: 'db5-q1', question: 'What happens if you run UPDATE pet SET owner = \'Unknown\'; without WHERE?', options: ['Nothing — syntax error', 'Only the first row is updated', 'Every row\'s owner becomes \'Unknown\'', 'The table is deleted'], correctIndex: 2, explanation: 'Without WHERE, UPDATE affects EVERY row in the table. Every pet now has owner = \'Unknown\'. This is almost never what you want.' },
        { id: 'db5-q2', question: 'What is the difference between DELETE and TRUNCATE?', options: ['No difference', 'DELETE allows WHERE, TRUNCATE removes all rows instantly', 'TRUNCATE is slower', 'DELETE removes the table structure'], correctIndex: 1, explanation: 'DELETE can use WHERE to target specific rows and is row-by-row. TRUNCATE removes ALL rows instantly without the ability to filter.' },
        { id: 'db5-q3', question: 'Which command shows the structure (columns, types) of a table?', options: ['SHOW TABLE', 'DESCRIBE table;', 'SELECT * FROM table;', 'STRUCTURE table;'], correctIndex: 1, explanation: 'DESCRIBE table; (or DESC table; for short) shows column names, data types, nullability, keys, and defaults.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'db5-cards', title: 'Day 5 Flashcards', cards: [
        { id: 'db5-f1', front: 'UPDATE syntax and safety rule?', back: 'UPDATE table SET col=val WHERE condition. ALWAYS test with SELECT first to verify which rows will be affected. Without WHERE, ALL rows are updated.', hint: 'Test before you execute...' },
        { id: 'db5-f2', front: 'DELETE vs TRUNCATE vs DROP?', back: 'DELETE: removes rows with WHERE, slow, reversible in transaction.\nTRUNCATE: removes ALL rows instantly, no WHERE, irreversible.\nDROP: deletes entire table (structure + data), irreversible.', hint: 'Surgical vs chainsaw vs demolition...' },
        { id: 'db5-f3', front: 'NULL handling in UPDATE/DELETE?', back: 'Use IS NULL or IS NOT NULL. UPDATE t SET col=NULL WHERE ...; (set to NULL). DELETE FROM t WHERE col IS NULL; (delete null rows). Never use = NULL.', hint: 'IS, not = ...' },
      ] },
      { type: 'practice', id: 'db5-p1', lang: 'sql', title: 'Practice: Pet Database Maintenance', starter: `-- Scenario: You are the database admin for the pet shelter
-- 1. Fluffy was adopted — change her owner to 'Gwen'
-- 2. All of Harold\'s pets now belong to 'Alice' (Harold moved)
-- 3. Whiskers passed away — set death to '2023-06-15'
-- 4. Remove all deceased pets from the active table
--    (Hint: test with SELECT first!)

-- Write your UPDATE and DELETE statements here:`, hint: '1. UPDATE with WHERE name. 2. UPDATE with WHERE owner. 3. UPDATE SET death. 4. DELETE with WHERE death IS NOT NULL — but SELECT first!' },
      { type: 'practice', id: 'db5-p2', lang: 'sql', title: 'Practice: Safe DELETE Workflow', starter: `-- You need to delete all birds from the pet table.
-- Follow the safety workflow:

-- Step 1: See what would be deleted
SELECT * FROM pet WHERE species = 'bird';

-- Step 2: Count how many
SELECT COUNT(*) FROM pet WHERE species = 'bird';

-- Step 3: Check if this count makes sense
-- If step 2 says 500 but you expect 3 — STOP! Fix your WHERE.

-- Step 4: After verifying, run the DELETE
-- DELETE FROM pet WHERE species = 'bird';

-- Step 5: Verify deletion
SELECT * FROM pet WHERE species = 'bird'; -- should return empty`, hint: 'The safety workflow is: SELECT → COUNT → verify → DELETE → verify again. Make this a habit.' },
    ],
    tasks: [
      { id: 'dbms-8-d5-t1', text: 'UPDATE: change owner for specific pets. Verify with SELECT before and after.', tag: 'lab' },
      { id: 'dbms-8-d5-t2', text: 'DELETE: remove deceased pets (WHERE death IS NOT NULL). Test with SELECT first.', tag: 'lab' },
      { id: 'dbms-8-d5-t3', text: 'Use DESCRIBE on your tables. Document the structure. Use SHOW CREATE TABLE for full DDL.', tag: 'drill' },
      { id: 'dbms-8-d5-t4', text: 'Explain: DELETE vs TRUNCATE vs DROP. Which supports WHERE? Which is fastest for clearing a table?', tag: 'mcq' },
    ],
  },
];
