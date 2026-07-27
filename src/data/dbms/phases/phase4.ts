import type { Day } from '../../../types';

export const dbmsPhase4days: Day[] = [
  // ================================================================
  // DAY 9: Views, Indexes & Performance
  // ================================================================
  {
    id: 'dbms-8-d9', number: 9,
    title: 'Views, Indexes & Query Performance', duration: 60,
    topics: ['CREATE VIEW', 'CREATE INDEX', 'Query Optimization', 'EXPLAIN', 'Composite Indexes'],
    alignment: ['MySQL Documentation: Views', 'MySQL Documentation: Optimization'],
    blocks: [
      { type: 'callout', id: 'db9-intro', calloutType: 'info', title: 'Beyond CRUD — Database Engineering', content: 'Tables and queries get you started. **Views** give you reusable virtual tables. **Indexes** make your queries 100x faster. Today: views for abstraction, indexes for speed, and `EXPLAIN` to peek under the hood of the query optimizer.' },
      { type: 'heading', id: 'db9-views', level: 2, content: 'Views — Virtual Tables That Save Queries' },
      { type: 'paragraph', id: 'db9-view-def', content: 'A **view** is a stored SELECT query that acts like a table. It does NOT store data — it dynamically runs the underlying query every time. Think of it as a **saved query with a name**. Views hide complex JOINs, restrict sensitive columns, and provide backward compatibility when table structure changes.' },
      { type: 'code', id: 'db9-view-code', lang: 'sql', title: 'Creating and Using Views', code: `-- Create a view: pets with their owners (hide the JOIN complexity)
CREATE VIEW pet_details AS
SELECT p.name AS pet_name, p.species,
       o.name AS owner_name, o.phone
FROM pet p
LEFT JOIN owners o ON p.owner_id = o.owner_id;

-- Now query the view like a table!
SELECT * FROM pet_details WHERE species = 'dog';

-- Views are LIVE — inserting into pet makes it appear in pet_details instantly
-- (provided the view is updatable)

-- Show all views
SHOW FULL TABLES WHERE Table_type = 'VIEW';

-- Check view definition
SHOW CREATE VIEW pet_details;

-- Replace a view (modify without dropping)
CREATE OR REPLACE VIEW pet_details AS
SELECT p.name AS pet_name, p.species, p.birth,
       o.name AS owner_name, o.city
FROM pet p
LEFT JOIN owners o ON p.owner_id = o.owner_id;

-- Drop a view (data is safe — views don't store data)
DROP VIEW IF EXISTS pet_details;` },
      { type: 'callout', id: 'db9-view-rules', calloutType: 'warn', title: 'View Limitations — What You Cannot Do', content: '1. **ORDER BY in view** — ignored unless you also use LIMIT. Use ORDER BY in the outer query.\n2. **Cannot have subquery in FROM clause** — MySQL restriction for views (use derived tables instead).\n3. **Cannot CREATE INDEX on a view** — views are virtual, no data to index. Index the underlying table.\n4. **Some views are not updatable** — if they use JOIN, GROUP BY, DISTINCT, aggregate, or subquery, INSERT/UPDATE/DELETE may fail.\n5. **Views can reference other views** — but avoid deep nesting (performance hell).' },
      { type: 'heading', id: 'db9-indexes', level: 2, content: 'Indexes — The Speed Multiplier 🚀' },
      { type: 'paragraph', id: 'db9-idx-def', content: 'An **index** is a separate data structure (B-tree) that the database maintains alongside your table. It maps column values to row locations — like the index at the back of a textbook. Without an index, MySQL scans EVERY row (full table scan). With an index, it jumps directly to matching rows.' },
      { type: 'code', id: 'db9-idx-code', lang: 'sql', title: 'Creating Indexes', code: `-- Primary Key is automatically indexed — no need to add
-- CREATE INDEX for columns you frequently search/filter/join on

-- Single column index
CREATE INDEX idx_owner ON pet(owner);

-- Unique index (enforces uniqueness + speeds up lookups)
CREATE UNIQUE INDEX idx_email ON members(email);

-- Composite index: (species, sex) — columns in THIS order
-- Works for: WHERE species='dog'   (leftmost prefix rule)
-- Works for: WHERE species='dog' AND sex='f'
-- Does NOT work for: WHERE sex='f'  (skipped the leftmost column)
CREATE INDEX idx_species_sex ON pet(species, sex);

-- Show all indexes on a table
SHOW INDEX FROM pet;

-- Drop an index
DROP INDEX idx_owner ON pet;

-- Full-text index (for MATCH...AGAINST search)
CREATE FULLTEXT INDEX idx_description ON articles(title, body);
SELECT * FROM articles WHERE MATCH(title, body) AGAINST('database');` },
      { type: 'callout', id: 'db9-composite', calloutType: 'tip', title: 'Composite Index — Leftmost Prefix Rule', content: 'A composite index on (A, B, C) acts as an index on:\n- A (leftmost)\n- A, B\n- A, B, C (all three)\n\nIt does NOT act as an index on:\n- B alone\n- C alone\n- B, C\n\n**Rule**: Always put the most SELECTIVE column first (column with the most unique values). For a `WHERE city = ? AND status = ?` query, if city has 1000 distinct values and status has 3, index should be `(status, city)` — status first because it narrows faster.' },
      { type: 'heading', id: 'db9-explain', level: 2, content: 'EXPLAIN — Peek Inside the Query Optimizer 🔍' },
      { type: 'code', id: 'db9-explain-code', lang: 'sql', title: 'Using EXPLAIN', code: `-- EXPLAIN shows how MySQL will execute your query
EXPLAIN SELECT * FROM pet WHERE species = 'dog';

-- Key columns to watch:
-- type:     'ALL' = full table scan (BAD). 'ref' = index lookup (GOOD). 'const' = best.
-- key:      Which index is being used (NULL = no index = BAD)
-- rows:     Estimated rows examined. Lower = better.
-- Extra:    'Using filesort' = sorting without index (BAD).
--           'Using temporary' = creating temp table (BAD for large results).
--           'Using index' = covering index (GOOD — only index read, no table access).

-- Before optimization: check what EXPLAIN shows
EXPLAIN SELECT p.name, o.name
FROM pet p JOIN owners o ON p.owner_id = o.owner_id
WHERE p.species = 'dog' AND o.city = 'Mumbai';

-- If type=ALL and rows=100000, you need an INDEX!
CREATE INDEX idx_owner ON pet(owner_id);
CREATE INDEX idx_species ON pet(species);
EXPLAIN SELECT ... ;  -- now type=ref, rows=10!` },
      // Doubt
      { type: 'callout', id: 'db9-d1', calloutType: 'doubt', title: 'If indexes make queries faster, why not index EVERY column?', content: 'Indexes are NOT free:\n1. **Storage**: Each index takes disk space (B-tree structure).\n2. **Write slowdown**: INSERT/UPDATE/DELETE must update ALL indexes on the table. More indexes = slower writes.\n3. **Memory pressure**: Indexes compete for RAM (buffer pool). Too many indexes → cache eviction → slower everything.\n\n**Rule of thumb**: Index columns in WHERE, JOIN, ORDER BY, and GROUP BY. Index foreign keys (they are used in JOINs). 3-5 indexes per table is typical. Measure with EXPLAIN before adding.' },
      { type: 'callout', id: 'db9-d2', calloutType: 'doubt', title: 'When should I use a view vs just writing the query?', content: '**Use a view when**:\n- The JOIN/query is complex and used in MANY places (write once, reuse).\n- You need to hide sensitive columns from certain users (grant access to view, not table).\n- You need backward compatibility when restructuring tables.\n\n**Write the query directly when**:\n- It is used once or twice.\n- Performance is critical (views add a layer of indirection — sometimes the optimizer cannot push WHERE clauses through complex views).\n\nFor exams: views are tested as a DDL concept. Know that they are virtual, stored queries, not physical tables.' },
      // Exam
      { type: 'callout', id: 'db9-exam', calloutType: 'exam', title: 'Exam Alert — ST-1/ST-2', content: '1. **View = virtual table, stored query** — guaranteed 1-mark MCQ.\n2. **Index speeds SELECT, slows INSERT/UPDATE/DELETE** — tradeoff question.\n3. **Composite index leftmost prefix rule** — advanced MCQ.\n4. **EXPLAIN output interpretation** — type=ALL means full scan, type=ref means index used.\n5. **Cannot index views** — indexes go on the underlying table.' },
      // Bridge
      { type: 'callout', id: 'db9-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Views provide the same abstraction as methods in Java — hide complexity behind a simple interface. Indexes are like HashMap — O(1) lookup instead of O(n) scan. The EXPLAIN tool is your SQL debugger — use it before every exam query. Stored procedures (Day 10) are the natural next step after views.' },
      // Quick Ref
      { type: 'table', id: 'db9-qref', headers: ['Concept', 'Key Point'], rows: [
        ['CREATE VIEW', 'Virtual table from SELECT. Does NOT store data. `DROP VIEW` to remove.'],
        ['CREATE INDEX', 'B-tree on column(s). Speeds SELECT. Slows INSERT/UPDATE/DELETE.'],
        ['Composite index', '(col1, col2). Leftmost prefix rule: col1 queries use it, col2 alone does NOT.'],
        ['EXPLAIN', 'Shows execution plan. type=ALL = bad. key=NULL = no index used.'],
        ['Full-text index', 'For MATCH...AGAINST text search. Separate from B-tree indexes.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'db9-quiz', title: 'Day 9 Quiz', questions: [
        { id: 'db9-q1', question: 'Does a view store data?', options: ['Yes — it is a copy of the table', 'No — it is a stored query that runs when accessed', 'Only if you use MATERIALIZED VIEW', 'Views store data in a cache'], correctIndex: 1, explanation: 'A view is a stored SELECT statement. It does NOT store data — it runs the underlying query every time it is queried. MySQL does not support materialized views (which WOULD store data).' },
        { id: 'db9-q2', question: 'What is the downside of adding indexes?', options: ['They slow down SELECT queries', 'They slow down INSERT, UPDATE, and DELETE', 'They prevent JOINs', 'They use too much network bandwidth'], correctIndex: 1, explanation: 'Every INSERT/UPDATE/DELETE must update all indexes. More indexes = slower writes. Indexes speed up SELECT but have a write cost.' },
        { id: 'db9-q3', question: 'A composite index on (A, B). Which query can use it?', options: ['WHERE B = 5', 'WHERE A = 10 AND B = 5', 'Both of the above', 'Neither'], correctIndex: 1, explanation: 'Leftmost prefix rule: the index can be used if queries reference the leftmost column(s). (A, B) works for A alone or A,B. NOT for B alone.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'db9-cards', title: 'Day 9 Flashcards', cards: [
        { id: 'db9-f1', front: 'What is a view and when to use it?', back: 'Virtual table = stored SELECT query. No data stored. Use for: hiding complex JOINs, restricting column access, backward compatibility. CREATE VIEW v AS SELECT...; SHOW CREATE VIEW v; DROP VIEW v;', hint: 'Stored query, not stored data...' },
        { id: 'db9-f2', front: 'Indexes — benefit and cost?', back: 'Benefit: 10-100x faster SELECT on indexed columns. Cost: slower INSERT/UPDATE/DELETE (must update index too), uses disk space. Index WHERE, JOIN, ORDER BY columns. Do NOT index every column.', hint: 'Speed for reads, penalty for writes...' },
        { id: 'db9-f3', front: 'EXPLAIN — what to look for?', back: 'type=ALL → full table scan (BAD). key=NULL → no index (BAD). Extra: Using filesort/Using temporary → sorting/grouping without index (BAD). rows=small → good filtering. type=ref/const → index used (GOOD).', hint: 'Execution plan diagnosis...' },
      ] },
      { type: 'practice', id: 'db9-p1', lang: 'sql', title: 'Practice: Build and Use Views', starter: `-- The pet+owners schema from earlier days
-- TODO: Create a view showing all dogs with their owners
CREATE VIEW dog_owners AS
-- Your SELECT here

-- TODO: Create a view for pet statistics per owner
-- (owner name, city, pet count, oldest pet name)
CREATE VIEW owner_stats AS
-- Your SELECT with JOIN + GROUP BY here
`,
        hint: 'dog_owners: SELECT p.name, o.name AS owner FROM pet p JOIN owners o ON p.owner_id=o.owner_id WHERE species=\'dog\'. owner_stats: SELECT o.name, o.city, COUNT(p.pet_id), MIN(p.birth) FROM owners o LEFT JOIN pet p ON o.owner_id=p.owner_id GROUP BY o.owner_id, o.name, o.city;' },
      { type: 'practice', id: 'db9-p2', lang: 'sql', title: 'Practice: Index Optimization', starter: `-- Given a slow query:
SELECT * FROM orders
WHERE customer_id = 42 AND order_date > '2026-01-01'
ORDER BY order_date DESC;

-- TODO: What index(es) would you create?
-- CREATE INDEX ...

-- TODO: Use EXPLAIN before and after to see the difference
EXPLAIN SELECT * FROM orders WHERE customer_id = 42;`,
        hint: 'Composite index: CREATE INDEX idx_cust_date ON orders(customer_id, order_date). customer_id first (equality check), order_date second (range + ORDER BY). EXPLAIN should show type=ref (not ALL) and key=idx_cust_date.' },
    ],
    tasks: [
      { id: 'dbms-8-d9-t1', text: 'Create a view for pet+owner details. Query it like a table. Show that inserting into pet appears in the view.', tag: 'lab' },
      { id: 'dbms-8-d9-t2', text: 'Add indexes on frequently queried columns. Use EXPLAIN to compare before/after (rows examined).', tag: 'lab' },
      { id: 'dbms-8-d9-t3', text: 'Create a composite index on (species, sex). Test which queries use it and which don\'t (leftmost prefix rule).', tag: 'drill' },
      { id: 'dbms-8-d9-t4', text: 'Explain: Why not index every column? What does EXPLAIN tell you?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 10: Stored Procedures, Functions & Triggers
  // ================================================================
  {
    id: 'dbms-8-d10', number: 10,
    title: 'Stored Procedures, Functions & Triggers', duration: 60,
    topics: ['Stored Procedures', 'DELIMITER', 'Functions', 'Triggers', 'BEFORE/AFTER INSERT', 'Event Scheduler'],
    alignment: ['MySQL Documentation: Stored Programs', 'W3Schools: MySQL Stored Procedures'],
    blocks: [
      { type: 'callout', id: 'db10-intro', calloutType: 'info', title: 'Programming Inside the Database', content: 'SQL is a query language — but MySQL can also run **procedural code**: loops, conditions, variables, error handling. **Stored procedures** package SQL logic into reusable blocks. **Functions** return values (used in SELECT). **Triggers** automatically fire on INSERT/UPDATE/DELETE. Today: bring programming INTO your database.' },
      { type: 'heading', id: 'db10-sp', level: 2, content: 'Stored Procedures — Reusable SQL Programs' },
      { type: 'paragraph', id: 'db10-sp-def', content: 'A stored procedure is a **named block of SQL code** stored in the database. It can accept parameters (IN, OUT, INOUT), contain variables, loops, IF/ELSE, and execute multiple queries. Once created, you call it with `CALL procedure_name(args)`.' },
      { type: 'code', id: 'db10-sp-code', lang: 'sql', title: 'Your First Stored Procedure', code: `-- DELIMITER changes the statement terminator temporarily
-- (needed because the procedure body contains semicolons)
DELIMITER //

CREATE PROCEDURE GetPetsBySpecies(IN species_name VARCHAR(20))
BEGIN
    SELECT name, sex, birth
    FROM pet
    WHERE species = species_name
    ORDER BY birth DESC;
END //

DELIMITER ;

-- Call the procedure
CALL GetPetsBySpecies('dog');

-- Procedure with OUT parameter (returns a value)
DELIMITER //
CREATE PROCEDURE CountSpecies(IN species_name VARCHAR(20), OUT pet_count INT)
BEGIN
    SELECT COUNT(*) INTO pet_count
    FROM pet
    WHERE species = species_name;
END //
DELIMITER ;

-- Call and capture the OUT parameter
CALL CountSpecies('cat', @count);
SELECT @count;  -- displays the count` },
      { type: 'heading', id: 'db10-sp-advanced', level: 2, content: 'Variables, IF/ELSE, and Loops in Procedures' },
      { type: 'code', id: 'db10-sp-adv-code', lang: 'sql', title: 'Procedure with Logic', code: `DELIMITER //

CREATE PROCEDURE PetAgeCategory(IN pet_id INT, OUT category VARCHAR(20))
BEGIN
    DECLARE pet_age INT;
    -- Calculate age
    SELECT TIMESTAMPDIFF(YEAR, birth, IFNULL(death, CURDATE()))
    INTO pet_age FROM pet WHERE pet_id = pet_id;

    -- Conditional logic
    IF pet_age < 2 THEN
        SET category = 'Baby';
    ELSEIF pet_age < 8 THEN
        SET category = 'Adult';
    ELSEIF pet_age < 15 THEN
        SET category = 'Senior';
    ELSE
        SET category = 'Ancient';
    END IF;
END //

DELIMITER ;

CALL PetAgeCategory(1, @cat);
SELECT @cat;  -- 'Adult' or whatever matches` },
      { type: 'callout', id: 'db10-delimiter', calloutType: 'warn', title: 'The DELIMITER Trick — Do NOT Forget This', content: 'Inside a stored procedure, semicolons (`;`) terminate each SQL statement. But the `CREATE PROCEDURE` statement itself also needs a terminator. Without changing the delimiter, MySQL would think the first `;` ends the whole CREATE PROCEDURE — breaking everything.\n\n**Solution**: `DELIMITER //` (or `$$`) tells MySQL to use `//` as the statement terminator instead of `;`. Inside the procedure, `;` works normally. End the procedure with `//`, then `DELIMITER ;` to reset.\n\nThis trips up EVERY student on their first stored procedure. Do not be that person.' },
      { type: 'heading', id: 'db10-functions', level: 2, content: 'Functions — Stored Procedures That Return a Value' },
      { type: 'code', id: 'db10-func-code', lang: 'sql', title: 'Creating and Using Functions', code: `DELIMITER //

CREATE FUNCTION FullName(first_name VARCHAR(50), last_name VARCHAR(50))
RETURNS VARCHAR(101)
DETERMINISTIC  -- means: same input → same output (optimization hint)
BEGIN
    RETURN CONCAT(first_name, ' ', last_name);
END //

DELIMITER ;

-- Use the function in SELECT
SELECT FullName('Vinay', 'Kumar') AS name;
-- Vinay Kumar

-- Function to calculate tax
DELIMITER //
CREATE FUNCTION CalculateTax(amount DECIMAL(10,2), rate DECIMAL(4,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN amount * rate / 100;
END //
DELIMITER ;

SELECT amount, CalculateTax(amount, 18) AS tax FROM invoices;` },
      { type: 'callout', id: 'db10-func-vs-sp', calloutType: 'tip', title: 'Stored Procedure vs Function — When to Use Which', content: '**Function**: Must RETURN a value. Used in SELECT (like built-in functions). Cannot modify data (INSERT/UPDATE/DELETE). Deterministic or not.\n\n**Procedure**: May or may not return values (via OUT params). Used with CALL. CAN modify data. Supports transaction control.\n\nRule: If you need to COMPUTE something → Function. If you need to DO something (insert, update, complex logic) → Procedure.' },
      { type: 'heading', id: 'db10-triggers', level: 2, content: 'Triggers — Automatic Actions on Data Changes' },
      { type: 'code', id: 'db10-trigger-code', lang: 'sql', title: 'Creating Triggers', code: `-- Audit log table
CREATE TABLE pet_audit (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pet_id INT,
    action VARCHAR(10),
    old_name VARCHAR(20),
    new_name VARCHAR(20),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

-- Trigger BEFORE INSERT: auto-capitalize name
CREATE TRIGGER trg_pet_name_capitalize
BEFORE INSERT ON pet
FOR EACH ROW
BEGIN
    SET NEW.name = CONCAT(UPPER(SUBSTRING(NEW.name, 1, 1)),
                          LOWER(SUBSTRING(NEW.name, 2)));
END //

-- Trigger AFTER UPDATE: log the change
CREATE TRIGGER trg_pet_audit
AFTER UPDATE ON pet
FOR EACH ROW
BEGIN
    INSERT INTO pet_audit (pet_id, action, old_name, new_name)
    VALUES (OLD.pet_id, 'UPDATE', OLD.name, NEW.name);
END //

-- Trigger BEFORE DELETE: prevent deleting if pet has an owner
CREATE TRIGGER trg_pet_nodelete_owned
BEFORE DELETE ON pet
FOR EACH ROW
BEGIN
    DECLARE owner_count INT;
    SELECT COUNT(*) INTO owner_count FROM owners
    WHERE owner_id = OLD.owner_id;
    IF owner_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete pet with an owner!';
    END IF;
END //

DELIMITER ;` },
      { type: 'callout', id: 'db10-trigger-rules', calloutType: 'warn', title: 'Trigger Rules — OLD and NEW', content: '**INSERT**: Only `NEW.column` is available (there is no old row).\n**UPDATE**: Both `OLD.column` (before value) and `NEW.column` (after value) are available.\n**DELETE**: Only `OLD.column` is available (there is no new row).\n\n**AFTER triggers** run after the data change. Use for logging/auditing.\n**BEFORE triggers** run before the data change. Use for validation or data transformation.\n\n**DANGER**: Triggers make debugging hell. Use sparingly. Never put slow operations inside triggers.' },
      // Doubt
      { type: 'callout', id: 'db10-d1', calloutType: 'doubt', title: 'Stored procedures vs application code — which should I use?', content: 'This is a religious debate in software engineering.\n\n**Use stored procedures when**:\n- Business logic must be consistent across multiple applications.\n- Operations are data-intensive (processing 1M rows inside DB > moving them to app).\n- Security: grant EXECUTE on procedure, but no direct table access.\n\n**Use application code when**:\n- Logic is complex (loops, string processing — SQL is terrible at these).\n- You need unit testing (testing stored procedures is painful).\n- You use version control (SQL scripts are harder to version than application code).\n\nModern trend: Keep logic in application code. Use procedures only for performance-critical batch operations.' },
      { type: 'callout', id: 'db10-d2', calloutType: 'doubt', title: 'Can triggers cause infinite loops?', content: '**YES.** An AFTER UPDATE trigger that updates the same table triggers itself again → infinite loop → MySQL terminates after `max_sp_recursion_depth` iterations (default 0, meaning no recursion).\n\nThis is why triggers are dangerous. If you must update the same table in a trigger, carefully check that your condition eventually stabilizes.' },
      // Exam
      { type: 'callout', id: 'db10-exam', calloutType: 'exam', title: 'Exam Alert — ST-1/ST-2', content: '1. **DELIMITER** — why it is needed for stored procedures (body contains ;).\n2. **IN vs OUT vs INOUT** parameters — IN is default.\n3. **Function vs Procedure**: Function returns value + used in SELECT. Procedure uses CALL.\n4. **OLD vs NEW in triggers**: INSERT→NEW only. UPDATE→both. DELETE→OLD only.\n5. **BEFORE vs AFTER triggers**: BEFORE for validation/transform. AFTER for logging/audit.' },
      // Bridge
      { type: 'callout', id: 'db10-bridge', calloutType: 'bridge', title: 'Connect the Dots — Full DBMS Journey', content: 'Stored procedures use the same IF/ELSE logic as Java (Day 3). Triggers are event-driven — like the Observer pattern. Functions are like Java methods that return values (Day 5). The database now has programming capabilities — views (Day 9) for abstraction, procedures for logic, triggers for automation.\n\nYour 10-day DBMS journey:\n**Days 1-2**: DDL, basic queries. **Day 3**: Filtering. **Days 4-5**: DML, JOINs, subqueries.\n**Day 6**: Aggregates. **Day 7**: ACID, normalization. **Day 8**: ST-1 mock.\n**Day 9**: Views, indexes, EXPLAIN. **Day 10**: Procedures, functions, triggers.\n\nYou now know more SQL than 80% of CS graduates.' },
      // Quick Ref
      { type: 'table', id: 'db10-qref', headers: ['Concept', 'Syntax / Key Point'], rows: [
        ['Stored procedure', 'CREATE PROCEDURE name(IN/OUT params) BEGIN ... END. CALL name(args).'],
        ['DELIMITER', 'Change from ; to // (or $$) before CREATE PROCEDURE/FUNCTION. Reset after.'],
        ['Function', 'CREATE FUNCTION name(params) RETURNS type BEGIN ... RETURN ... END.'],
        ['Trigger', 'CREATE TRIGGER name BEFORE|AFTER INSERT|UPDATE|DELETE ON table FOR EACH ROW.'],
        ['OLD / NEW', 'INSERT: NEW only. UPDATE: both OLD and NEW. DELETE: OLD only.'],
        ['SIGNAL', 'Throw a custom error inside procedure/trigger. SIGNAL SQLSTATE \'45000\' SET MESSAGE_TEXT=\'...\'.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'db10-quiz', title: 'Day 10 Quiz', questions: [
        { id: 'db10-q1', question: 'Why do you need DELIMITER when creating a stored procedure?', options: ['It makes procedures run faster', 'Without it, MySQL would treat ; inside the procedure as end of CREATE PROCEDURE', 'It is just a convention', 'Only for procedures with parameters'], correctIndex: 1, explanation: 'Procedures contain multiple SQL statements ending with ;. Without changing the delimiter, MySQL would think the first ; ends the whole CREATE PROCEDURE statement.' },
        { id: 'db10-q2', question: 'What is the difference between a stored procedure and a function?', options: ['No difference', 'Functions return a value and can be used in SELECT. Procedures use CALL.', 'Procedures are faster', 'Functions cannot have parameters'], correctIndex: 1, explanation: 'Functions MUST return a value and can be used in SELECT (like built-in functions). Procedures use CALL and can modify data through OUT parameters.' },
        { id: 'db10-q3', question: 'In an UPDATE trigger, what does OLD.name and NEW.name represent?', options: ['Both refer to the same value', 'OLD.name = value BEFORE update. NEW.name = value AFTER update.', 'OLD and NEW are read-only system variables', 'OLD and NEW are table aliases'], correctIndex: 1, explanation: 'In an UPDATE trigger, OLD refers to the row BEFORE the update (the values being replaced), and NEW refers to the row AFTER the update (the new values).' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'db10-cards', title: 'Day 10 Flashcards', cards: [
        { id: 'db10-f1', front: 'Stored procedure syntax?', back: 'DELIMITER // CREATE PROCEDURE name(IN param1 TYPE, OUT param2 TYPE) BEGIN ... END // DELIMITER ; CALL name(arg1, @out); SELECT @out; Use INTO to assign to OUT params: SELECT col INTO outParam FROM table.', hint: 'Change delimiter, create, call...' },
        { id: 'db10-f2', front: 'Function vs Procedure — key differences?', back: 'Function: RETURNS type, used in SELECT, cannot modify data (INSERT/UPDATE/DELETE). Procedure: uses CALL, can have OUT params, CAN modify data. Both need DELIMITER. Both stored in DB.', hint: 'Return value vs CALL...' },
        { id: 'db10-f3', front: 'Trigger types and OLD/NEW?', back: 'BEFORE/AFTER + INSERT/UPDATE/DELETE = 6 combinations. INSERT: NEW only. UPDATE: OLD + NEW. DELETE: OLD only. BEFORE = validation/transform. AFTER = logging/audit. FOR EACH ROW = runs per modified row.', hint: 'Six trigger types...' },
      ] },
      { type: 'practice', id: 'db10-p1', lang: 'sql', title: 'Practice: Grade Calculator Procedure', starter: `DELIMITER //
CREATE PROCEDURE CalculateGrade(IN student_marks INT, OUT grade CHAR(1))
BEGIN
    -- TODO: IF/ELSEIF to assign grade based on marks
    -- S: 90+, A: 80-89, B: 70-79, C: 60-69, D: 50-59, E: 40-49, F: <40
END //
DELIMITER ;

-- Test it
CALL CalculateGrade(85, @g);
SELECT @g;  -- should be 'A'`,
        hint: 'IF marks>=90 SET grade=\'S\'; ELSEIF marks>=80 SET grade=\'A\'; ... END IF. Remember: assign to the OUT parameter, not return.' },
      { type: 'practice', id: 'db10-p2', lang: 'sql', title: 'Practice: Auto-Timestamp Trigger', starter: `-- Add a last_updated column to pet table
ALTER TABLE pet ADD COLUMN last_updated TIMESTAMP;

DELIMITER //
-- TODO: Create BEFORE UPDATE trigger that auto-sets last_updated
CREATE TRIGGER trg_pet_update_timestamp
BEFORE UPDATE ON pet
FOR EACH ROW
BEGIN
    -- Your trigger body here
END //
DELIMITER ;

-- Test: UPDATE pet SET name='Buddy' WHERE pet_id=1;
-- Then SELECT name, last_updated FROM pet WHERE pet_id=1;`,
        hint: 'SET NEW.last_updated = CURRENT_TIMESTAMP; Simple one-liner. BEFORE UPDATE lets you modify NEW values before they are written.' },
    ],
    tasks: [
      { id: 'dbms-8-d10-t1', text: 'Create a stored procedure that takes species name and returns count and oldest pet. Use IN and OUT parameters.', tag: 'lab' },
      { id: 'dbms-8-d10-t2', text: 'Write a function that calculates pet age given birth_date. Use it in a SELECT statement.', tag: 'lab' },
      { id: 'dbms-8-d10-t3', text: 'Create an AFTER INSERT trigger that logs new pets to an audit table.', tag: 'lab' },
      { id: 'dbms-8-d10-t4', text: 'Create a BEFORE DELETE trigger that prevents deletion of pets that have an owner (using SIGNAL).', tag: 'drill' },
      { id: 'dbms-8-d10-t5', text: 'Explain: DELIMITER purpose. Function vs Procedure. OLD vs NEW in triggers.', tag: 'mcq' },
    ],
  },
];