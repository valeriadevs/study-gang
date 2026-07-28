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
      { type: 'callout', id: 'db4-intro', calloutType: 'info', title: '🕵️ From Data Detective to Data Chef', content: 'So far you have only **interrogated** data with SELECT — you are a detective, asking questions. Today you become a **data chef**: you will **cook up new rows** with INSERT INTO, **plate them beautifully** with ORDER BY, and learn the elegant art of **pagination** with LIMIT. Reading + Writing + Presenting = a complete database skillset. Put on your apron.' },
      { type: 'heading', id: 'db4-order', level: 2, content: 'ORDER BY — The Presentation Layer' },
      { type: 'paragraph', id: 'db4-order-intro', content: 'Databases are chaotic by nature — rows go wherever the database feels like putting them. `ORDER BY` is your **stylist**. It takes the raw, unsorted truth and presents it in whatever order YOU command. Without it, the same query can return rows in different orders on different days. Never trust the database\'s mood.' },
      { type: 'code', id: 'db4-order-code', lang: 'sql', title: 'ORDER BY — Your Sorting Toolbox', code: `-- Sort by birth date (oldest first = ascending, the default)
SELECT name, birth FROM pet ORDER BY birth;

-- Explicit ascending (same as default — ASC is optional but polite)
SELECT name, birth FROM pet ORDER BY birth ASC;

-- Descending (newest first — like checking "sort by newest" on Amazon)
SELECT name, birth FROM pet ORDER BY birth DESC;

-- Multi-column sort: species alphabetically, within species: newest born first
SELECT name, species, birth FROM pet
ORDER BY species ASC, birth DESC;
-- Birds (newest→oldest), then cats (newest→oldest), then dogs...

-- The power move: sort by a CALCULATED value!
SELECT name, birth,
    TIMESTAMPDIFF(YEAR, birth, CURDATE()) AS age
FROM pet
ORDER BY age DESC;  -- oldest pets first, even though 'age' is not a real column!` },
      { type: 'callout', id: 'db4-order-fun', calloutType: 'tip', title: '🎮 Sorting Challenge — Predict the Output', content: 'Before running each query below, PREDICT the exact output order. Write it down. THEN run it. If your prediction matches, you have truly internalized ORDER BY.\n\n```sql\n-- Data: Alice(2018, dog, f), Bob(2019, cat, m), Charlie(2017, dog, m), Diana(2020, cat, f)\nSELECT name FROM pet WHERE species = \'dog\' ORDER BY name DESC;\n-- Your prediction: _______\n\nSELECT species, name FROM pet ORDER BY species ASC, name ASC;\n-- Your prediction: _______\n```\nCheck your answers: Q1 = Charlie, Alice. Q2 = cat Bob, cat Diana, dog Alice, dog Charlie. Did you get them right? If yes — you have earned the Sorter badge (imaginary but satisfying).' },
      { type: 'heading', id: 'db4-limit', level: 2, content: 'LIMIT — Because Nobody Wants 10 Million Rows' },
      { type: 'paragraph', id: 'db4-limit-intro', content: 'Real databases have millions of rows. `LIMIT` caps how many rows come back. Combine it with `ORDER BY` to get "top N" or "bottom N" — like "top 5 most expensive products" or "3 youngest pets." This is pagination: the thing that powers every "Load More" button you have ever clicked.' },
      { type: 'code', id: 'db4-limit-code', lang: 'sql', title: 'LIMIT and OFFSET — Pagination Power', code: `-- Top 3 youngest pets (sort by birth DESC = newest first, then take 3)
SELECT name, birth FROM pet
ORDER BY birth DESC
LIMIT 3;
-- ^ "Show me ONLY the 3 newest pets"

-- Skip 2, then show 3 (page 2 of results, 3 per page)
SELECT name, birth FROM pet
ORDER BY birth DESC
LIMIT 3 OFFSET 2;
-- ^ Skip the first 2 results, then show the next 3

-- Real-world pagination pattern:
-- Page 1: LIMIT 10 OFFSET 0   (rows 1-10)
-- Page 2: LIMIT 10 OFFSET 10  (rows 11-20)
-- Page 3: LIMIT 10 OFFSET 20  (rows 21-30)

-- MySQL shortcut: LIMIT offset, count
SELECT name FROM pet ORDER BY name LIMIT 2, 3;
-- ^ Same as LIMIT 3 OFFSET 2` },
      { type: 'callout', id: 'db4-limit-gotcha', calloutType: 'warn', title: '⚡ LIMIT Without ORDER BY = Random Sampling', content: '`SELECT * FROM pet LIMIT 5;` — which 5 pets do you get? **Nobody knows.** Without ORDER BY, the database picks any 5 rows it feels like. If you want "top 5," you NEED ORDER BY first. LIMIT alone is like grabbing 5 books off a shelf blindfolded — you get 5 books, but which ones? Mystery!' },
      { type: 'heading', id: 'db4-insert', level: 2, content: 'INSERT INTO — Becoming a Data Chef 🧑‍🍳' },
      { type: 'paragraph', id: 'db4-insert-intro', content: '`INSERT INTO` is your first **DML** (Data Manipulation Language) command — you are no longer just reading the cookbook, you are adding YOUR OWN recipes. The data you INSERT is permanent until explicitly changed. Every row you add makes the database YOURS. Embrace the power. (And the responsibility.)' },
      { type: 'code', id: 'db4-insert-code', lang: 'sql', title: 'INSERT INTO — Your Data Cooking Station', code: `-- 🥇 Method 1: Specify columns (RECOMMENDED — clear, safe, professional)
INSERT INTO pet (name, owner, species, sex, birth, death)
VALUES ('Puffball', 'Diane', 'hamster', 'f', '2020-03-30', NULL);

-- 🥈 Method 2: Omit column list (DANGER — depends on column order in the table)
INSERT INTO pet
VALUES ('Fluffy', 'Harold', 'cat', 'f', '2018-05-15', NULL);

-- 🥉 Method 3: Insert only SOME columns (others become NULL or DEFAULT)
INSERT INTO pet (name, species, sex)
VALUES ('Tweety', 'bird', 'm');
-- owner, birth, death will be NULL (if the columns allow NULL)

-- 🚀 PRO MOVE: Insert multiple rows in ONE statement (way faster!)
INSERT INTO pet (name, owner, species, sex, birth)
VALUES
    ('Max', 'Alice', 'dog', 'm', '2019-06-01'),
    ('Luna', 'Alice', 'cat', 'f', '2020-01-15'),
    ('Charlie', 'Bob', 'dog', 'm', '2017-11-20');
-- ^ Three rows inserted with ONE command instead of three. Efficient.` },
      { type: 'callout', id: 'db4-insert-gotcha', calloutType: 'warn', title: '💀 INSERT Without Column List — A Disaster Waiting to Happen', content: '`INSERT INTO pet VALUES (...)` assumes you are providing values for **every single column, in the exact order they were defined in CREATE TABLE**. Six months later, someone adds a `color` column as column 2. BOOM — your old INSERT now puts \'Harold\' in the color column instead of owner. **Always use explicit columns**: `INSERT INTO pet (name, species) VALUES (...)`.\n\nThis is the difference between code that works today and code that works forever.' },
      { type: 'callout', id: 'db4-fun-challenge', calloutType: 'info', title: '🎯 The Pet Census Challenge', content: 'You are the newly appointed Chief Data Officer of the Pet Shelter. Your mission:\n\n1. **Insert 12 pets** — at least 4 species (dog, cat, bird, hamster, snake, rabbit). Mix genders.\n2. Make at least 2 pets "deceased" (give them a death date).\n3. Leave at least 2 pets with NULL owners (strays!).\n4. After inserting, write ONE query that shows: total pets, pets per species (sorted most→least), and the name of the oldest pet.\n\nHint for #4: You will need COUNT, GROUP BY, ORDER BY, and MIN — all in separate queries. Bonus points if you can display them all in one query (you cannot, but trying teaches you why).' },
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
VALUES (1, 'Vinayak', 'AIML', 3, 8.5);

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
      { type: 'callout', id: 'db5-intro', calloutType: 'info', title: '🔧 Modifying Data + The Art of JOINs', content: 'Two big skills today. First: **UPDATE and DELETE** — the most dangerous SQL commands (one missing WHERE and your table is GONE). Second: **JOINs** — how you connect tables together to answer questions like "which owner has the most pets?" and "show me each pet with its owner\'s phone number." This is the day you stop playing with one table and start thinking like a real database engineer.' },
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
      // ================================================================
      // JOINs — THE BIG ONE
      // ================================================================
      { type: 'heading', id: 'db5-joins', level: 2, content: 'JOINs — The Superpower That Connects Everything 🔗' },
      { type: 'paragraph', id: 'db5-joins-intro', content: 'So far, every query has been on ONE table. That is like having a phone with only one contact. JOINs let you **combine rows from two or more tables** based on a related column. This is THE skill that separates "I know SQL" from "I can actually build applications." Every real database has multiple tables. You MUST learn JOINs.' },
      { type: 'callout', id: 'db5-joins-why', calloutType: 'info', title: '🧠 The "Why JOINs?" Thought Experiment', content: 'Imagine a pet shelter database. You COULD put everything in one giant `pet` table: pet_name, owner_name, owner_phone, owner_email, owner_address. But if Harold owns 5 pets, his name, phone, email, and address get repeated 5 times. Update his phone number? You must find and update 5 rows. Miss one? Data corruption.\n\n**The solution**: Split into `pets` table (pet data) and `owners` table (owner data). Connect them with a `owner_id` column. Now Harold\'s info is stored ONCE. To get "show each pet with their owner\'s phone," you JOIN.' },
      { type: 'heading', id: 'db5-join-types', level: 2, content: 'The Four JOIN Types — A Visual Guide' },
      { type: 'table', id: 'db5-join-table', headers: ['JOIN Type', 'What It Returns', 'Visual (Venn Diagram)', 'Use When...'], rows: [['INNER JOIN', 'Only rows that match in BOTH tables. The intersection.', '🟢🟢 (overlap only)', 'You only want pets that HAVE an owner'], ['LEFT JOIN', 'ALL rows from the LEFT table + matching right rows. Unmatched right = NULL.', '🟢🟢⚪ (all left, some right)', 'You want ALL pets, even those without owners (strays)'], ['RIGHT JOIN', 'ALL rows from the RIGHT table + matching left rows. Unmatched left = NULL.', '⚪🟢🟢 (some left, all right)', 'You want ALL owners, even those with no pets'], ['FULL OUTER JOIN', 'ALL rows from BOTH tables. NULL where no match exists.', '⚪🟢🟢⚪ (everything)', 'MySQL does not support this directly — use UNION']] },
      { type: 'callout', id: 'db5-join-viz', calloutType: 'tip', title: '🎨 The Dinner Plate Analogy', content: 'Think of JOINs like combining two guest lists for a dinner party:\n\n**INNER JOIN** = Only guests on BOTH lists (the mutual friends).\n**LEFT JOIN** = Everyone from List A + anyone from List B who is also on List A. Guests exclusively on List B are ignored.\n**RIGHT JOIN** = Everyone from List B + anyone from List A who is also on List B. Guests exclusively on List A are ignored.\n\nIf the party has 10 people from List A and 7 from List B, and 4 are on both:\n- INNER JOIN = 4 people\n- LEFT JOIN = 10 people (all of List A)\n- RIGHT JOIN = 7 people (all of List B)' },
      { type: 'heading', id: 'db5-inner-join', level: 2, content: 'INNER JOIN — The Default (and Most Common)' },
      { type: 'code', id: 'db5-inner-code', lang: 'sql', title: 'INNER JOIN — Pets With Known Owners', code: `-- Set up: two related tables (run this first!)
CREATE TABLE owners (
    owner_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    phone VARCHAR(15),
    city VARCHAR(30)
);

INSERT INTO owners (name, phone, city) VALUES
('Harold', '9876543210', 'Mumbai'),
('Gwen', '8765432109', 'Delhi'),
('Diane', '7654321098', 'Mumbai'),
('Rahul', '6543210987', 'Bangalore');
-- Note: Rahul has NO pets (we will test LEFT JOIN with him)

-- Modify pet table: replace 'owner' column with owner_id
-- (In real life: ALTER TABLE pet ADD owner_id INT, then update, then drop owner)
-- For now, imagine pet has an 'owner_id' column pointing to owners.owner_id

-- === INNER JOIN: Only pets that HAVE a matching owner ===
SELECT pet.name AS pet_name,
       pet.species,
       owners.name AS owner_name,
       owners.phone,
       owners.city
FROM pet
INNER JOIN owners ON pet.owner_id = owners.owner_id;
-- Result: every pet that has a valid owner_id. Strays (owner_id=NULL) are EXCLUDED.
-- Rahul (in owners table but has no pets) is also EXCLUDED.` },
      { type: 'code', id: 'db5-inner-alias', lang: 'sql', title: 'INNER JOIN with Aliases (Cleaner)', code: `-- Table aliases make JOINs readable (p = pet, o = owners)
SELECT p.name AS pet, p.species, o.name AS owner, o.city
FROM pet p
INNER JOIN owners o ON p.owner_id = o.owner_id
WHERE o.city = 'Mumbai'
ORDER BY p.name;
-- ^ "Show me all pets whose owners live in Mumbai, alphabetically"` },
      { type: 'heading', id: 'db5-left-join', level: 2, content: 'LEFT JOIN — "Keep Everything From the Left"' },
      { type: 'paragraph', id: 'db5-left-intro', content: 'LEFT JOIN keeps **every row from the LEFT table** (the one you write first, before JOIN). If there is no match in the right table, the right-side columns show NULL. This is how you find orphans, strays, or items without a category.' },
      { type: 'code', id: 'db5-left-code', lang: 'sql', title: 'LEFT JOIN — Find Stray Pets', code: `-- LEFT JOIN: Show ALL pets, even those without an owner
SELECT p.name AS pet, p.species, o.name AS owner, o.phone
FROM pet p
LEFT JOIN owners o ON p.owner_id = o.owner_id
ORDER BY o.name;
-- Pets with an owner → owner + phone shown
-- Pets WITHOUT an owner (owner_id IS NULL) → owner shows NULL
-- Rahul (has NO pets) → does NOT appear (he is on the RIGHT side)

-- 🕵️ Detective query: Find ONLY the strays!
SELECT p.name, p.species
FROM pet p
LEFT JOIN owners o ON p.owner_id = o.owner_id
WHERE o.owner_id IS NULL;
-- ^ "Show me pets that have NO matching owner." Clean, elegant, powerful.` },
      { type: 'callout', id: 'db5-left-trick', calloutType: 'tip', title: '🪄 The LEFT JOIN + WHERE NULL Trick', content: 'This is the most elegant SQL pattern for finding "items without a match":\n\n```sql\nSELECT * FROM table_a\nLEFT JOIN table_b ON a.id = b.a_id\nWHERE b.id IS NULL;\n```\nTranslation: "Show me everything in A that has NO corresponding row in B."\n\nUse cases:\n- Pets without owners (strays)\n- Students who have not enrolled in any course\n- Products that have never been ordered\n- Users who have not logged in for 30 days\n\nThis pattern is used in **every production application**. Memorize it.' },
      { type: 'heading', id: 'db5-right-join', level: 2, content: 'RIGHT JOIN — The Mirror Image' },
      { type: 'code', id: 'db5-right-code', lang: 'sql', title: 'RIGHT JOIN — Find Owners Without Pets', code: `-- RIGHT JOIN: Show ALL owners, even those without pets
SELECT p.name AS pet, o.name AS owner, o.phone
FROM pet p
RIGHT JOIN owners o ON p.owner_id = o.owner_id
ORDER BY o.name;
-- Owners WITH pets → pet name shown
-- Rahul (has NO pets) → appears! pet name = NULL
-- Stray pets (no owner) → do NOT appear (they are on the LEFT side)

-- PRO TIP: Most developers avoid RIGHT JOIN and just swap the table order with LEFT JOIN.
-- "RIGHT JOIN" is the same as swapping the tables and using LEFT JOIN:
-- FROM pet p RIGHT JOIN owners o = FROM owners o LEFT JOIN pet p

-- 🕵️ Find owners with NO pets (using RIGHT JOIN):
SELECT o.name, o.phone
FROM pet p
RIGHT JOIN owners o ON p.owner_id = o.owner_id
WHERE p.pet_id IS NULL;
-- ^ "Show me owners who have zero pets." (Empty-nesters!)` },
      { type: 'heading', id: 'db5-multi-join', level: 2, content: 'Joining 3+ Tables — Now You Are Thinking in Graphs' },
      { type: 'code', id: 'db5-multi-code', lang: 'sql', title: 'Three-Way JOIN — Pets → Owners → Cities', code: `-- Add a third table: cities (for city-level statistics)
CREATE TABLE cities (
    city_id INT PRIMARY KEY AUTO_INCREMENT,
    city_name VARCHAR(30),
    state VARCHAR(30),
    population BIGINT
);

-- Now: pet → owner → city (chain JOINs!)
SELECT p.name AS pet,
       o.name AS owner,
       c.city_name AS city,
       c.state,
       c.population
FROM pet p
INNER JOIN owners o ON p.owner_id = o.owner_id
INNER JOIN cities c ON o.city = c.city_name;
-- ^ "For every pet with an owner, show me the city + state + population"
-- This chains through three tables. You can chain as many as you need.` },
      { type: 'callout', id: 'db5-join-mindset', calloutType: 'info', title: '🧭 The JOIN Mindset — How to Think About Complex Queries', content: 'When you need data from multiple tables, do NOT try to write the entire query at once. Build it incrementally:\n\n**Step 1**: Start with the "main" table (usually the one you want ALL rows from).\n```sql\nSELECT * FROM pet;\n```\n\n**Step 2**: Add the first JOIN. Check the results.\n```sql\nSELECT * FROM pet p INNER JOIN owners o ON p.owner_id = o.owner_id;\n```\n\n**Step 3**: Add the next JOIN. Check again.\n```sql\nSELECT * FROM pet p\nINNER JOIN owners o ON p.owner_id = o.owner_id\nINNER JOIN cities c ON o.city = c.city_name;\n```\n\n**Step 4**: NOW add WHERE, ORDER BY, LIMIT.\n\n**Step 5**: Replace `SELECT *` with the specific columns you actually need.\n\nThis "build and verify" approach prevents the #1 JOIN mistake: writing a 5-table JOIN in one shot and getting 10,000 wrong rows.' },
      { type: 'heading', id: 'db5-subquery', level: 2, content: 'Subqueries — A Query Inside a Query 🔍' },
      { type: 'paragraph', id: 'db5-sub-intro', content: 'A subquery is a SELECT statement nested inside another SELECT, INSERT, UPDATE, or DELETE. It is like asking the database a question, and using that answer to ask another question. Subqueries are the "inception" of SQL — queries within queries.' },
      { type: 'code', id: 'db5-sub-code', lang: 'sql', title: 'Subquery Patterns You Will Actually Use', code: `-- Pattern 1: Subquery in WHERE (find pets older than average)
SELECT name, birth
FROM pet
WHERE birth < (SELECT AVG(birth) FROM pet);
-- ^ "Pets born before the average birth date" (older than average)

-- Pattern 2: Subquery with IN (find owners who live in cities with >1M population)
SELECT name, city FROM owners
WHERE city IN (SELECT city_name FROM cities WHERE population > 1000000);

-- Pattern 3: Subquery in SELECT (show each pet's age vs the average)
SELECT name,
       TIMESTAMPDIFF(YEAR, birth, CURDATE()) AS age,
       (SELECT AVG(TIMESTAMPDIFF(YEAR, birth, CURDATE())) FROM pet) AS avg_age
FROM pet;
-- ^ Each row shows the pet's age AND the overall average age

-- Pattern 4: Correlated subquery (reference outer query — runs once per row)
SELECT o.name,
       (SELECT COUNT(*) FROM pet p WHERE p.owner_id = o.owner_id) AS pet_count
FROM owners o;
-- ^ "For each owner, count how many pets they have." Correlated = depends on outer row.` },
      { type: 'callout', id: 'db5-sub-join', calloutType: 'warn', title: 'Subquery vs JOIN — Which Should You Use?', content: 'Many problems can be solved with BOTH subqueries and JOINs. Here is the decision framework:\n\n**Use JOIN when**:\n- You need columns from multiple tables in the output.\n- The relationship is direct (FK → PK).\n- You want to display "pet name + owner name + city" in one row.\n\n**Use subquery when**:\n- You need to filter based on an aggregate (COUNT, AVG, MAX).\n- The inner query is independent (you can run it alone).\n- You are checking existence: `WHERE EXISTS (SELECT ...)`.\n\n**When in doubt**: JOIN for display, subquery for filtering. And always check which one runs faster with EXPLAIN.' },
      // ================================================================
      // Doubt Clinics for JOINs & DML
      // ================================================================
      { type: 'callout', id: 'db5-d1', calloutType: 'doubt', title: 'How do I know which table goes on the LEFT vs RIGHT in a LEFT JOIN?', content: 'The LEFT table is the one you write FIRST in the FROM clause. Every row from it appears in the output, guaranteed. The RIGHT table (after JOIN) only contributes data when there is a match.\n\n**Mental model**: "I want ALL of THIS (left), plus whatever matches from THAT (right)."\n\nExample: "Show ALL pets, plus their owner\'s phone if they have one."\n- Pets = LEFT table (I want every pet)\n- Owners = RIGHT table (phone if available)\n```sql\nFROM pet p LEFT JOIN owners o ON p.owner_id = o.owner_id\n```\nIf a pet has no owner → phone shows NULL. The pet still appears.' },
      { type: 'callout', id: 'db5-d2', calloutType: 'doubt', title: 'Can I undo a DELETE or UPDATE? I accidentally deleted everything!', content: '**Only if you used a transaction.** Without transactions, UPDATE and DELETE are **permanent and immediate** — no undo. This is terrifying. Here is your safety net:\n\n1. **Always test with SELECT first.**\n2. **Use transactions for risky operations**:\n```sql\nSTART TRANSACTION;\nDELETE FROM pet WHERE owner_id IS NULL;  -- risky!\n-- Check if count is reasonable\nSELECT COUNT(*) FROM pet;  -- if wrong:\nROLLBACK;  -- undo! Everything back to pre-DELETE state.\n-- if correct:\nCOMMIT;   -- make it permanent.\n```\n3. **Backup before major changes**: `mysqldump -u root -p menagerie > backup.sql`\n4. In phpMyAdmin → Export tab before any destructive operation.' },
      { type: 'callout', id: 'db5-d3', calloutType: 'doubt', title: 'When should I use a subquery instead of a JOIN?', content: '**Decision framework**:\n\n**Use JOIN when**: You need columns from MULTIPLE tables in your final output. "Show pet name + owner name + city" = JOIN.\n\n**Use subquery when**:\n- Filtering by an aggregate: "pets older than the average age" → `WHERE birth < (SELECT AVG(birth) FROM pet)`\n- Checking existence: "owners who have at least one pet" → `WHERE EXISTS (SELECT 1 FROM pet WHERE owner_id = o.id)`\n- Displaying a summary value alongside individual rows: showing a pet\'s age next to the average age.\n\n**When both work**: JOINs are usually faster (the optimizer handles them better). But subqueries are often more readable for simple filtering. When in doubt: write both, check EXPLAIN, pick the faster one.' },
      // ================================================================
      // Exam Alert (updated with JOINs)
      // ================================================================
      { type: 'callout', id: 'db5-exam', calloutType: 'exam', title: 'Exam Alert — CE-1 & ST-1 (JOINs + DML)', content: '1. **INNER JOIN vs LEFT JOIN** — KNOW THIS. "Which JOIN keeps unmatched left rows?" → LEFT JOIN. Guaranteed MCQ.\n2. **UPDATE without WHERE** — updates every row. Classic trick question.\n3. **LEFT JOIN + WHERE right.id IS NULL** — the "find orphans" pattern. Likely 5-mark coding question.\n4. **Subquery in WHERE**: WHERE col IN (SELECT ...). MCQ + coding favorite.\n5. **DELETE vs TRUNCATE vs DROP** — know the differences.\n6. **ON vs WHERE in JOINs**: ON defines the join condition. WHERE filters AFTER the join.\n7. **CE-1 coding (5 marks each)**: Write an INNER JOIN, a LEFT JOIN to find unmatched rows, and an UPDATE with subquery.' },
      // ================================================================
      // Bridge
      // ================================================================
      { type: 'callout', id: 'db5-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'JOINs are the SQL equivalent of **Pandas merge()** (SDE Day 3) and Python dictionary lookups. LEFT JOIN + WHERE NULL patterns are used in data quality checks, ETL validation, and every backend API. Subqueries with COUNT map directly to HAVING (Day 6). If you master JOINs today, Day 6 aggregates with grouped JOINs will feel natural.' },
      // ================================================================
      // Quick Reference
      // ================================================================
      { type: 'table', id: 'db5-qref', headers: ['Concept', 'Key Point'], rows: [['INNER JOIN', 'Only matching rows from both tables. ON a.id = b.a_id.'], ['LEFT JOIN', 'All LEFT table rows. NULL where no match in right. Find orphans: WHERE right.col IS NULL.'], ['Subquery in WHERE', 'WHERE col IN (SELECT ...). Filter by another query\'s result.'], ['Subquery in SELECT', 'Show aggregate per row alongside row data: SELECT (SELECT AVG(x) FROM t).'], ['UPDATE safety', 'Test with SELECT first. Without WHERE = update ALL rows.'], ['DELETE vs TRUNCATE', 'DELETE = surgical with WHERE. TRUNCATE = all rows instantly, no conditions.'], ['ON vs WHERE', 'ON = join condition (runs DURING join). WHERE = filter AFTER join. Different timing.']] },
      // ================================================================
      // Quiz — expanded with JOINs
      // ================================================================
      { type: 'quiz', id: 'db5-quiz', title: 'Day 5 Quiz — DML, JOINs & Subqueries', questions: [
        { id: 'db5-q1', question: 'What does LEFT JOIN return when there is NO matching row in the right table?', options: ['The row is excluded from results', 'The row appears with NULL values for right-table columns', 'An error is thrown', 'A default synthetic row is inserted'], correctIndex: 1, explanation: 'LEFT JOIN keeps ALL left-table rows. Unmatched right columns show NULL. This is how you detect orphan records — add WHERE right.id IS NULL.' },
        { id: 'db5-q2', question: 'Which of these approaches finds all pets WITHOUT an owner?', options: ['SELECT * FROM pet WHERE owner_id IS NULL', 'SELECT * FROM pet LEFT JOIN owners ON pet.owner_id=owners.id WHERE owners.id IS NULL', 'Both of the above work for different scenarios', 'DELETE FROM pet WHERE owner_id IS NULL'], correctIndex: 2, explanation: 'Both work. Direct NULL check is simpler. LEFT JOIN + NULL check also catches cases where owner_id points to a non-existent (deleted) owner ID.' },
        { id: 'db5-q3', question: 'What does WHERE city IN (SELECT city FROM large_cities WHERE population > 1000000) do?', options: ['Joins two tables together', 'Filters to only rows where city appears in the subquery\'s result list', 'Deletes cities not in the subquery result', 'Creates a new table from the subquery result'], correctIndex: 1, explanation: 'The subquery runs first, producing a list of large cities. The outer query then keeps only rows whose city is in that list. IN = membership check.' },
        { id: 'db5-q4', question: 'What is the most important difference between DELETE and TRUNCATE?', options: ['DELETE allows WHERE for selective removal; TRUNCATE removes all rows instantly with no conditions', 'TRUNCATE is always slower', 'DELETE removes the table structure too', 'There is no practical difference'], correctIndex: 0, explanation: 'DELETE is surgical — you pick which rows. TRUNCATE is a chainsaw — every row gone instantly, AUTO_INCREMENT resets. TRUNCATE cannot be rolled back.' },
        { id: 'db5-q5', question: 'In a LEFT JOIN, which table\'s rows are ALL guaranteed to appear?', options: ['The right table (after JOIN)', 'The left table (after FROM)', 'Both tables equally', 'Only rows with matches'], correctIndex: 1, explanation: 'The LEFT table (specified in FROM, before the JOIN keyword) is fully preserved. Every row appears, even if there is no match in the right table.' },
      ] },
      // ================================================================
      // Flashcards — expanded
      // ================================================================
      { type: 'flashcard', id: 'db5-cards', title: 'Day 5 Flashcards — JOINs & DML Mastery', cards: [
        { id: 'db5-f1', front: 'INNER JOIN vs LEFT JOIN — one-line each?', back: 'INNER: only rows that match in BOTH tables (intersection). LEFT: ALL rows from the LEFT table + matching right. Unmatched right columns = NULL. LEFT JOIN + WHERE right.id IS NULL = find orphans/strays.', hint: 'Intersection vs keep-everything-left...' },
        { id: 'db5-f2', front: '4 subquery patterns you will actually use?', back: '1. WHERE col IN (SELECT...): filter by another query\'s result list. 2. WHERE col > (SELECT AVG...): compare against an aggregate. 3. SELECT (SELECT COUNT...): subquery as a computed column. 4. Correlated subquery: references the outer query, runs once per outer row.', hint: 'Filter, compare, display, correlate...' },
        { id: 'db5-f3', front: 'UPDATE/DELETE safety workflow?', back: '1. SELECT with same WHERE to SEE affected rows. 2. COUNT to VERIFY the number is correct. 3. Run UPDATE/DELETE. 4. SELECT again to CONFIRM. Use START TRANSACTION / ROLLBACK as your undo button for risky operations.', hint: 'Test → verify → execute → verify...' },
        { id: 'db5-f4', front: 'How to build a 3+ table JOIN query?', back: 'Incrementally! Start with FROM t1 only. Add JOIN t2, run and check results. Add JOIN t3, check again. Then add WHERE, ORDER BY, LIMIT. Finally replace SELECT * with specific columns. Never write a complex JOIN in one shot.', hint: 'Build one JOIN at a time...' },
        { id: 'db5-f5', front: 'ON vs WHERE in JOINs — what is the difference?', back: 'ON specifies HOW tables connect (the join condition — FK = PK). It runs DURING the join operation. WHERE filters rows AFTER the join completes. Different execution timing. ON for relationships, WHERE for filtering.', hint: 'During join vs after join...' },
      ] },
      // ================================================================
      // Practice Editors — rewritten for JOINs
      // ================================================================
      { type: 'practice', id: 'db5-p1', lang: 'sql', title: 'Practice: JOIN Detective Agency 🕵️', starter: `-- You run the City Pet Detective Agency. Solve these cases:
-- Tables: owners (owner_id, name, phone, city)
--         pets (pet_id, name, species, owner_id)

-- CASE 1: The Full Report
-- Show every pet with their owner's name and phone (INNER JOIN)
-- Only include pets that actually have an owner.

-- CASE 2: The Stray Census
-- The mayor wants a count of ALL pets, including strays.
-- Show pet name, species, owner name (NULL if stray). Use LEFT JOIN.

-- CASE 3: The No-Owner Alert
-- Animal Control needs ONLY the list of strays.
-- Show pets with NO owner. (LEFT JOIN + WHERE NULL trick!)

-- CASE 4: The Lonely Hearts Club
-- Some owners registered but never adopted. Find them.
-- Show owners who have ZERO pets.

-- Write your queries below:`, hint: 'C1: INNER JOIN owners o ON p.owner_id = o.owner_id. C2: LEFT JOIN instead. C3: LEFT JOIN + WHERE o.owner_id IS NULL. C4: Swap tables: FROM owners o LEFT JOIN pet p ON ... WHERE p.pet_id IS NULL.' },
      { type: 'practice', id: 'db5-p2', lang: 'sql', title: 'Practice: Subquery Dojo 🥋', starter: `-- Level 1: White Belt — Simple subquery
-- Find all pets born AFTER the average birth date.
-- (These are the "younger than average" pets)

-- Level 2: Green Belt — Subquery with IN
-- Find owners who live in cities where at least ONE other owner also lives.
-- Hint: a city is "shared" if it appears more than once in the owners table.

-- Level 3: Black Belt — Correlated subquery
-- For each species, show the species name and the count of pets.
-- Then filter to only show species with MORE pets than the average count across all species.
-- Hint: You will need a subquery inside HAVING.`, hint: 'L1: WHERE birth > (SELECT AVG(birth) FROM pet). L2: WHERE city IN (SELECT city FROM owners GROUP BY city HAVING COUNT(*) > 1). L3: HAVING COUNT(*) > (SELECT AVG(cnt) FROM (SELECT COUNT(*) AS cnt FROM pet GROUP BY species) AS t).' },
      { type: 'practice', id: 'db5-p3', lang: 'sql', title: 'Practice: The Great Pet Transfer 🔄', starter: `-- BREAKING NEWS: Gwen is relocating to Bangalore.
-- Rahul has generously offered to adopt all her pets.

-- IDENTIFY: Find Gwen's owner_id and Rahul's owner_id.
SELECT owner_id, name FROM owners WHERE name IN ('Gwen', 'Rahul');

-- VERIFY: How many pets does Gwen currently have? (COUNT first!)
-- Never UPDATE without knowing how many rows will change.

-- TRANSFER: Write the UPDATE that transfers all pets from Gwen to Rahul.
-- Use subqueries to find the correct owner_ids.

-- CONFIRM: Count pets per owner. Gwen should now have 0. 
-- Rahul should have his original pets + Gwen's former pets.`, hint: 'UPDATE pet SET owner_id = (SELECT owner_id FROM owners WHERE name=\'Rahul\') WHERE owner_id = (SELECT owner_id FROM owners WHERE name=\'Gwen\'). COUNT first, COUNT after, verify both.' },
    ],
    tasks: [
      { id: 'dbms-8-d5-t1', text: 'Write INNER JOIN + LEFT JOIN on owners→pets. Explain which rows appear in each.', tag: 'lab' },
      { id: 'dbms-8-d5-t2', text: 'Use LEFT JOIN + WHERE NULL to find pets without owners AND owners without pets.', tag: 'drill' },
      { id: 'dbms-8-d5-t3', text: 'Write a subquery: find pets older than average. Then find species with above-average count.', tag: 'drill' },
      { id: 'dbms-8-d5-t4', text: 'Complete The Great Pet Transfer: UPDATE with subquery. Test with SELECT before and after.', tag: 'lab' },
      { id: 'dbms-8-d5-t5', text: 'Explain: INNER vs LEFT JOIN. What does LEFT JOIN + WHERE NULL do? When would you use it?', tag: 'mcq' },
    ],
  },
];