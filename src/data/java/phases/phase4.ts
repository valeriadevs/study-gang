import type { Day } from '../../../types';

export const phase4days: Day[] = [
  // ================================================================
  // DAY 11 (Part 1): Packages, Access Modifiers, StringBuilder
  // ================================================================
  {
    id: 'java-14-d11', number: 15,
    title: 'Packages, Access Modifiers & StringBuilder',
    subtitle: 'Where code lives, who can touch it, and how to build strings fast',
    duration: 90,
    topics: ['Packages', 'Access Modifiers', 'String Immutability', 'StringBuilder'],
    alignment: ['CodeGym: Packages & Access Modifiers'],
    blocks: [
      { type: 'callout', id: 'd11-intro', calloutType: 'info', title: 'Half the boss level', content: 'Today is the first half of what was once labelled the CE-2 boss level — broken in two so it actually fits in your head. Three skills, one day: **packages** give your code a real address, **access modifiers** decide who is allowed to knock on the door, and **StringBuilder** is the speed trick that makes loops 100x faster. Every single one of these shows up on the exam. By tonight you will know which modifier to reach for and when string concatenation needs an upgrade.' },
      { type: 'heading', id: 'd11-pkg', level: 2, content: 'Packages — Your Code\'s Postal Address' },
      { type: 'paragraph', id: 'd11-pkg-intro', content: 'A package is a **folder** that organises related classes. Just like you would not dump every file on your Desktop, you should not dump every Java class in one folder. Packages prevent naming collisions and control access (the "default" access level is package-private).' },
      { type: 'code', id: 'd11-pkg-code', lang: 'java', title: 'Package Structure — Filesystem = Namespace', code: '// File MUST be at: com/university/models/Student.java\npackage com.university.models;  // MUST be first line (before imports!)\n\nimport java.util.ArrayList;     // imports come AFTER package\n\npublic class Student {\n    public String branch;       // accessible EVERYWHERE\n    protected int rollNo;        // subclass + same package\n    int semester;                // default = same package only\n    private String name;         // this class ONLY\n\n    public Student(String name) {\n        this.name = name;  // private field accessed in same class = OK\n    }\n}' },
      { type: 'callout', id: 'd11-pkg-fun', calloutType: 'info', title: 'Package Naming — The Reverse Domain Trick', content: 'Java packages follow the **reverse domain name** convention: `com.google.maps`, `org.apache.commons`. This guarantees global uniqueness — no two companies can own the same domain. For university projects, use `com.yourname.coursename` or just `university.models`. The `package` statement MUST be the very first non-comment line of your file.' },
      { type: 'heading', id: 'd11-access', level: 2, content: 'Access Modifiers — The Four Walls of Your Code Castle' },
      { type: 'table', id: 'd11-access-table', headers: ['Modifier', 'Same Class', 'Same Pkg', 'Subclass (diff pkg)', 'Anywhere', 'Use When...'], rows: [
        ['private', '✅', '❌', '❌', '❌', 'Internal data ONLY this class touches. Fields, helper methods.'],
        ['default (none)', '✅', '✅', '❌', '❌', 'Package-internal utilities. No outside world access.'],
        ['protected', '✅', '✅', '✅', '❌', 'Subclasses need it. Template method pattern. Override hooks.'],
        ['public', '✅', '✅', '✅', '✅', 'The API. External contracts. Getters, core methods.'],
      ] },
      { type: 'callout', id: 'd11-access-game', calloutType: 'info', title: 'The Access Modifier Challenge — Predict the Compiler', content: 'Given the Student class above (with all 4 access levels), predict: does each line below COMPILE or FAIL?\n\n```java\n// In a DIFFERENT package (com.university.tests):\nStudent s = new Student("Vinayak");\ns.branch = "AIML";        // COMPILE or FAIL?\ns.rollNo = 42;            // COMPILE or FAIL?\ns.semester = 3;           // COMPILE or FAIL?\ns.name = "NewName";       // COMPILE or FAIL?\n```\nAnswers:\n\n- `branch` → ✅ (public, accessible everywhere).\n- `rollNo` → ❌ — protected in a different package is ONLY accessible via inheritance (e.g., `this.rollNo` inside a subclass), NOT via a reference variable like `s.rollNo`.\n- `semester` → ❌ (default = same package only).\n- `name` → ❌ (private).\n\nOnly `s.branch` compiles. This is the #1 protected trap on CE-2.' },
      { type: 'heading', id: 'd11-sb-why', level: 2, content: 'Why StringBuilder Exists — String is Immutable' },
      { type: 'paragraph', id: 'd11-sb-why-p', content: 'Quick recap from Day 8: every Java `String` is **immutable** — once created, it cannot change. That is a feature (thread-safe, cacheable, hashable, secure). But it has a cost: building a string in a loop with `+` creates a brand-new `String` object every iteration, and each new String copies all the data from the previous one. That is O(n²) work for an n-character result.' },
      { type: 'code', id: 'd11-sb-code', lang: 'java', title: 'String vs StringBuilder — The Speed Test', code: '// ❌ BAD: String concatenation in a loop — O(n²) time and memory\nString bad = "";\nfor (int i = 0; i < 100_000; i++) bad += i;\n// 100,000 String objects created and thrown away. The garbage collector cries.\n\n// ✅ GOOD: StringBuilder — single mutable buffer, O(n)\nStringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 100_000; i++) sb.append(i);\nString good = sb.toString();  // ONE String at the end\n\n// Toolkit: append, insert, delete, reverse, replace\n// StringBuilder is not thread-safe but faster.\n// StringBuffer is thread-safe but slower. Use StringBuilder 99% of the time.' },
      { type: 'callout', id: 'd11-sb-bench', calloutType: 'info', title: 'Run This Benchmark Yourself', content: '```java\nlong start = System.currentTimeMillis();\nString s = ""; for (int i=0; i<100000; i++) s += "x";\nlong stringTime = System.currentTimeMillis() - start;\nstart = System.currentTimeMillis();\nStringBuilder sb = new StringBuilder();\nfor (int i=0; i<100000; i++) sb.append("x");\nlong sbTime = System.currentTimeMillis() - start;\nSystem.out.println("String +  : " + stringTime + "ms");  // ~2000ms\nSystem.out.println("Builder   : " + sbTime + "ms");       // ~3ms\nSystem.out.println("Speedup   : " + (stringTime/(double)sbTime) + "x");\n```\n\nTypical result: 600x speedup for 100K iterations. Now imagine 1 million.' },
      // Doubt Clinics
      { type: 'callout', id: 'd11-d1', calloutType: 'doubt', title: 'Why must directory structure mirror package names? What if I put everything in one folder?', content: 'The JVM looks for `com/university/models/Student.class` relative to the classpath. The compiler enforces this — if your `package` declaration says `com.university.models` but the file lives in `/src/`, you get a compile error. You can skip packages entirely (default package), but classes in the default package CANNOT be imported by classes in named packages. It is a dead end — never use it for real projects.' },
      { type: 'callout', id: 'd11-d2', calloutType: 'doubt', title: 'When should I use private, protected, default, or public? Real example?', content: 'Consider a `BankAccount` class:\n\n- `private double balance;` — NO ONE touches this directly. Expose via `getBalance()` and controlled `withdraw()`.\n- `private String accountNumber;` — internal identifier, set once.\n- `double interestRate;` (default) — shared by accounts in the same package.\n- `protected boolean isActive;` — a subclass like `SavingsAccount` can check/modify it.\n- `public void deposit(double amt)` — the external API.\n\n**Rule of thumb**: fields are ALWAYS private. Methods meant for subclass override → protected. Everything else public.' },
      { type: 'callout', id: 'd11-d3', calloutType: 'doubt', title: 'Why does StringBuilder exist? Why not make String mutable?', content: '**Immutability is a feature.** Immutable Strings are:\n\n- Thread-safe (no one can mutate them out from under you)\n- Cacheable (the String pool reuses literals)\n- Secure (passwords cannot be tampered with)\n- Safe as HashMap keys (hashCode never changes)\n\n`StringBuilder` gives you mutability when you actually need it (building strings incrementally). The split design — immutable String for storage and sharing, mutable StringBuilder for construction — is deliberate and used in most modern languages.' },
      // Exam
      { type: 'callout', id: 'd11-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Access modifier table** — memorise. The protected nuance (inheritance vs reference) is an advanced MCQ.\n2. **StringBuilder vs String +** in loops — performance MCQ. Answer: immutable String creates new objects each iteration.\n3. **`package` statement must be the FIRST line** (before imports).\n4. **Reverse-domain naming** — `com.yourname.coursename` is the convention.' },
      // Bridge
      { type: 'callout', id: 'd11-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'StringBuilder replaces String concatenation (Day 8). Access modifiers are the foundation of encapsulation (Day 9). Package structure is how EVERY real Java project is organised — Spring Boot, Android, Minecraft mods, all of them.\n\nTomorrow (Day 15) is the second half of this boss level: 2D arrays, jagged arrays, and the matrix multiplication triple-loop. The CE-2 will hand you a blank editor and ask you to write it from scratch.' },
      // Quick Ref
      { type: 'table', id: 'd11-qref', headers: ['Concept', 'Key Point'], rows: [
        ['package', 'First line. Mirrors directory. Reverse domain naming convention.'],
        ['private', 'Same class only. Fields should ALWAYS be private.'],
        ['default', 'Same package only. No keyword. Rarely intentional.'],
        ['protected', 'Same pkg + subclasses (via inheritance, NOT reference in different pkg!).'],
        ['public', 'Everywhere. Use for your API methods.'],
        ['String + in loop', 'O(n²). Avoid.'],
        ['StringBuilder', 'Mutable. append(), insert(), delete(), reverse(). Often 100x-600x faster than + in loops.'],
        ['StringBuffer', 'Thread-safe StringBuilder. Slower. Use StringBuilder 99% of the time.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd11-quiz', title: 'Day 15 Quiz', questions: [
        { id: 'd11-q1', question: 'Which access modifier allows a subclass in a DIFFERENT package to access a field?', options: ['private', 'default (no modifier)', 'protected', 'public'], correctIndex: 2, explanation: 'protected allows subclass access, BUT only when the subclass code accesses the field via `this` or `super`, NOT via a reference variable. This distinction is a classic CE-2 trap.' },
        { id: 'd11-q2', question: 'Why is StringBuilder dramatically faster than String + in a loop?', options: ['It uses native C code', 'String + creates a new object every iteration; StringBuilder mutates one buffer', 'StringBuilder pre-allocates 1GB of memory', 'They are equally fast when optimized'], correctIndex: 1, explanation: 'String is immutable — each + creates a new object and copies everything (O(n²)). StringBuilder appends to the SAME internal char array (O(n) amortized).' },
        { id: 'd11-q3', question: 'What MUST be the first non-comment line of a Java file?', options: ['class declaration', 'package statement', 'import statements', 'public static void main'], correctIndex: 1, explanation: 'package must be the first line. Then imports. Then class. Any other order = compile error.' },
        { id: 'd11-q4', question: 'You write `package com.lpu.cse;` at the top of Book.java. Where must the file live on disk?', options: ['Any folder named "cse"', 'com/lpu/cse/Book.java relative to the classpath', 'Just the src folder', 'cse/com/lpu/Book.java'], correctIndex: 1, explanation: 'The directory structure MUST mirror the package structure. com.lpu.cse → com/lpu/cse/Book.java. The compiler enforces this.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd11-cards', title: 'Day 15 Flashcards', cards: [
        { id: 'd11-f1', front: '4 access modifiers: most→least restrictive?', back: 'private (same class only) → default (same package) → protected (same pkg + subclasses via inheritance) → public (everywhere). Protected nuance: accessible via subclass code (this.rollNo), NOT via reference variable (s.rollNo) in diff pkg.', hint: 'Concentric circles, expanding outward...' },
        { id: 'd11-f2', front: 'StringBuilder — WHY faster? Key methods?', back: 'String immutable: each + = new object + copy (O(n²)). StringBuilder mutable: same char[] buffer (O(n)). Methods: append(), insert(idx,str), delete(s,e), reverse(), replace(s,e,str), toString().', hint: 'Mutable char array...' },
        { id: 'd11-f3', front: 'Where must a package statement live?', back: 'Very first non-comment line of the file. Before imports, before class. Directory structure must mirror the dotted package name: com.lpu.cse → com/lpu/cse/Book.java.', hint: 'First line, mirror the dots as slashes...' },
        { id: 'd11-f4', front: 'StringBuffer vs StringBuilder?', back: 'StringBuilder: not thread-safe, faster. StringBuffer: thread-safe (all methods synchronized), slower. In 99% of code, use StringBuilder. Reach for StringBuffer only when multiple threads share one buffer.', hint: '99% StringBuilder...' },
      ] },
      // Practices (5-6, at end of day)
      { type: 'practice', id: 'd11-p1', lang: 'java', title: 'Practice: Student — four access levels', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create a Student, set branch via the public field, observe it works
        // TODO 2: try setting semester (default) from main — observe COMPILE ERROR (different pkg)
        // TODO 3: try setting name (private) from main — observe COMPILE ERROR
        // In your head, fix the access so each line compiles.
    }
}
// Place this file in package com.lpu.cse.models
class Student {
    public String branch;        // public
    protected int rollNo;        // protected
    int semester;                // default (package-private)
    private String name;         // private

    // TODO 4: write a constructor and getters/setters
}` },
      { type: 'practice', id: 'd11-p2', lang: 'java', title: 'Practice: Multi-package LibrarySystem', starter: `// Three files in three folders. Replace "src" with your own folder.
// File 1: src/com/library/model/Book.java
// File 2: src/com/library/util/BookPrinter.java
// File 3: src/com/library/main/Main.java
//
// File 1
package com.library.model;
public class Book {
    // TODO 1: private fields title, author, year
    // TODO 2: public constructor + getters
}

// File 2
package com.library.util;
import com.library.model.Book;
public class BookPrinter {
    public static String toLine(Book b) {
        // TODO 3: return "<year> <title> by <author>" using StringBuilder
    }
}

// File 3 (main)
package com.library.main;
import com.library.model.Book;
import com.library.util.BookPrinter;
public class Main {
    public static void main(String[] args) {
        // TODO 4: create 2 Books, print each via BookPrinter.toLine()
    }
}` },
      { type: 'practice', id: 'd11-p3', lang: 'java', title: 'Practice: CSV builder with StringBuilder', starter: `public class Test {
    public static void main(String[] args) {
        // Build the CSV header + 3 student rows using StringBuilder.append
        // Expected output:
        //   id,name,grade
        //   1,Vinayak,A
        //   2,Riya,B
        //   3,Amit,A
        //
        // Constraint: NEVER write "result += ..." inside a loop. Use StringBuilder only.
    }
}
class Student {
    int id;
    String name;
    char grade;
    Student(int id, String name, char grade) { this.id=id; this.name=name; this.grade=grade; }
    // TODO 1: write toRow() that returns a String with StringBuilder: "<id>,<name>,<grade>"
}
class CsvBuilder {
    // TODO 2: buildHeader() returns "id,name,grade"
    // TODO 3: build(java.util.List<Student> students) — header + each student's toRow()
}` },
      { type: 'practice', id: 'd11-p4', lang: 'java', title: 'Practice: Trace access — predict the compiler', starter: `public class Test {
    public static void main(String[] args) {
        Box b = new Box();
        b.publicField = 1;       // COMPILE or FAIL?
        // b.protectedField = 2;  // COMPILE or FAIL? (uncomment to test)
        // b.defaultField = 3;    // COMPILE or FAIL? (uncomment to test)
        // b.privateField = 4;    // COMPILE or FAIL? (uncomment to test)
    }
}
// Place this in a DIFFERENT package than Box.java
class Box {
    public int publicField;
    protected int protectedField;
    int defaultField;
    private int privateField;
}
// Question: write a comment in main explaining which lines compile and why.` },
      { type: 'practice', id: 'd11-p5', lang: 'java', title: 'Practice: StringUtils in com.text.utils', starter: `// File 1: src/com/text/utils/StringUtils.java
package com.text.utils;
public class StringUtils {
    // TODO 1: public static String reverse(String s) — using StringBuilder.reverse()
    // TODO 2: public static String capitalize(String s) — first letter upper, rest lower
    // TODO 3: public static String join(String[] parts, String sep) — using StringBuilder
}

// File 2: src/com/text/app/Main.java
package com.text.app;
import com.text.utils.StringUtils;
public class Main {
    public static void main(String[] args) {
        // TODO 4: test each utility with a few inputs and print the result
    }
}` },
      { type: 'practice', id: 'd11-p6', lang: 'java', title: 'Practice: Account + package-private BankOperations', starter: `// Two files in the SAME package (com.bank.internal)
//
// File 1
package com.bank.internal;
public class Account {
    private double balance;
    private String holder;
    Account(String holder, double balance) { this.holder=holder; this.balance=balance; }
    public double getBalance() { return balance; }
    public String getHolder() { return holder; }
}

// File 2 (same package!)
package com.bank.internal;
class BankOperations {
    static double totalExposure(Account[] accts) {
        // TODO 1: sum up balances — relies on default access to accts.getBalance()
        // Actually you will use the public getter.
    }
    static void audit(Account a) {
        // TODO 2: print "<holder>: <balance>" using StringBuilder
    }
}
// TODO 3: write a Main in a DIFFERENT package that creates an Account and tries to call BankOperations.audit().
// Observe: it fails because BankOperations has default (package-private) access. That is intentional — internal helpers should not be reachable from outside.` },
    ],
    tasks: [
      { id: 'java-14-d11-t1', text: 'Create package com.yourname.models. Add Student with all 4 access modifiers. Test from a DIFFERENT package.', tag: 'lab' },
      { id: 'java-14-d11-t2', text: 'Speed test: String + vs StringBuilder with n=10000, 100000, 500000. Record and explain the results.', tag: 'drill' },
      { id: 'java-14-d11-t3', text: 'Build a multi-package project (model + util + main). Use one class from each package.', tag: 'lab' },
      { id: 'java-14-d11-t4', text: 'Implement StringUtils with reverse, capitalize, join using StringBuilder. Test from another package.', tag: 'lab' },
      { id: 'java-14-d11-t5', text: 'Explain: protected member accessed from different package — when does it work and when does it fail?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 11-NEXT: 2D Arrays, Jagged Arrays & Matrix Multiplication
  // ================================================================
  {
    id: 'java-14-d11-next', number: 16,
    title: '2D Arrays, Jagged Arrays & Matrix Multiplication',
    subtitle: 'The engine behind images, neural nets, and every linear algebra op',
    duration: 90,
    topics: ['2D Arrays', 'Jagged Arrays', 'Matrix Addition', 'Matrix Multiplication', 'Triple-Nested Loop'],
    alignment: ['CodeGym: Working with arrays'],
    blocks: [
      { type: 'callout', id: 'd11n-intro', calloutType: 'info', title: 'The matrix has you', content: 'Yesterday you sorted out where code lives and who can touch it. Today is the second half — and the heavier one. We are going to talk about the **matrix**: the data structure behind every image, every neural network weight, every linear algebra operation you will ever write. By the end of today you will know how to declare, traverse, and multiply 2D arrays — including the O(n³) triple-loop pattern that the CE-2 will absolutely ask you to write from scratch.' },
      { type: 'heading', id: 'd11n-2d', level: 2, content: '2D Arrays — Arrays of Arrays' },
      { type: 'paragraph', id: 'd11n-2d-intro', content: 'A 2D array is exactly what it sounds like: an array where each slot holds another array. Think of a grid — rows and columns. For AIML students: every image is a 2D array of pixels, every neural network weight matrix is a 2D array of floats, every spreadsheet is a 2D array of cells.' },
      { type: 'code', id: 'd11n-2d-code', lang: 'java', title: '2D Arrays — Creation and Traversal', code: '// Inline literal — 3 rows, 3 cols\nint[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};\nSystem.out.println(matrix[0][0]);  // 1 (first row, first col)\nSystem.out.println(matrix[1][2]);  // 6 (second row, third col)\n\n// Dynamic creation: 3 rows, 4 cols — all zeros\nint[][] grid = new int[3][4];\n\n// ⚠️ matrix.length = NUMBER OF ROWS\n// ⚠️ matrix[i].length = NUMBER OF COLUMNS in row i (matters for jagged)\nSystem.out.println(matrix.length);      // 3\nSystem.out.println(matrix[0].length);   // 3\n\n// The universal traversal pattern\nfor (int i = 0; i < matrix.length; i++) {          // rows\n    for (int j = 0; j < matrix[i].length; j++) {   // cols in THIS row\n        System.out.print(matrix[i][j] + " ");\n    }\n    System.out.println();\n}' },
      { type: 'heading', id: 'd11n-jagged', level: 2, content: 'Jagged Arrays — Rows of Different Lengths' },
      { type: 'paragraph', id: 'd11n-jagged-p', content: 'Java lets each row have a different length. Useful for Pascal\'s triangle, sparse matrices, and any data where the rows naturally vary. You allocate the outer array first, then each row separately.' },
      { type: 'code', id: 'd11n-jagged-code', lang: 'java', title: 'Jagged Pascal\'s Triangle', code: 'int n = 6;\nint[][] triangle = new int[n][];   // outer array: 6 rows (no col count yet)\nfor (int i = 0; i < n; i++) {\n    triangle[i] = new int[i + 1];   // row i has i+1 columns\n    triangle[i][0] = triangle[i][i] = 1;\n    for (int j = 1; j < i; j++)\n        triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];\n}\n// triangle = {{1}, {1,1}, {1,2,1}, {1,3,3,1}, {1,4,6,4,1}, {1,5,10,10,5,1}}' },
      { type: 'callout', id: 'd11n-jagged-tip', calloutType: 'tip', title: 'Why jagged saves memory', content: 'A square 6×6 array always has 36 ints. The Pascal triangle above uses 1+2+3+4+5+6 = 21 ints — about 40% less. For sparse matrices (most cells are zero), jagged arrays can be an order of magnitude smaller. The catch: indexing gets uglier, and `arr[i].length` is the only safe way to walk a row.' },
      { type: 'heading', id: 'd11n-add', level: 2, content: 'Matrix Addition — The Warm-upup' },
      { type: 'paragraph', id: 'd11n-add-p', content: 'Before multiplication, the easier op: add two same-shape matrices element by element. O(n²) time, double nested loop. Same indexing shape on both sides.' },
      { type: 'code', id: 'd11n-add-code', lang: 'java', title: 'Matrix Addition', code: 'int[][] A = {{1,2,3},{4,5,6}};\nint[][] B = {{7,8,9},{10,11,12}};\nint[][] C = new int[2][3];  // result is same shape as A and B\n\nfor (int i = 0; i < A.length; i++)\n    for (int j = 0; j < A[i].length; j++)\n        C[i][j] = A[i][j] + B[i][j];\n// C = {{8,10,12},{14,16,18}}' },
      { type: 'heading', id: 'd11n-mul', level: 2, content: 'Matrix Multiplication — The Triple Loop (O(n³))' },
      { type: 'paragraph', id: 'd11n-mul-p', content: 'Here is the one that shows up on CE-2. To multiply A (r1×c1) by B (r2×c2), the inner dimensions must match: c1 == r2. The result C is r1×c2. Each cell C[i][j] is the dot product of row i of A with column j of B — a sum over the shared dimension.' },
      { type: 'code', id: 'd11n-mul-code', lang: 'java', title: 'Matrix Multiply (O(n³))', code: '// A = 2×3, B = 3×2, C = A × B = 2×2\nint[][] A = {{1,2,3},{4,5,6}};\nint[][] B = {{7,8},{9,10},{11,12}};\nint[][] C = new int[2][2];  // rows of A × cols of B\n\nfor (int i = 0; i < A.length; i++)           // for each row of A\n    for (int j = 0; j < B[0].length; j++)     // for each column of B\n        for (int k = 0; k < B.length; k++)    // sum over the shared dimension\n            C[i][j] += A[i][k] * B[k][j];\n// C = {{58,64},{139,154}}\n// C[0][0] = 1*7 + 2*9 + 3*11 = 7+18+33 = 58 ✅' },
      { type: 'callout', id: 'd11n-mul-viz', calloutType: 'tip', title: 'Matrix Multiply Memory Trick', content: 'A[r1 × c1] × B[r2 × c2] is valid ONLY if c1 == r2 (the inner dimensions match). The result is [r1 × c2]. The triple loop:\n\n- `i` walks the rows of the result\n- `j` walks the columns of the result\n- `k` bridges the shared dimension\n\nCE-2 WILL ask you to write this from scratch. Practice until it is muscle memory.' },
      // Doubt
      { type: 'callout', id: 'd11n-d1', calloutType: 'doubt', title: 'Why are jagged arrays more memory-efficient for some problems?', content: 'For a triangular shape like Pascal\'s, a square 10×10 array uses 100 cells but Pascal only needs 1+2+…+10 = 55. A jagged array stores only what you actually need. For *sparse* matrices (think a million cells where 99% are zero), jagged arrays with a list-of-non-zeros can be 100x smaller than a dense 2D array.\n\nThe cost: each row can have a different length, so you must use `arr[i].length` instead of `arr[0].length` to traverse safely.' },
      { type: 'callout', id: 'd11n-d2', calloutType: 'doubt', title: 'Can I have a 3D array? What about higher dimensions?', content: 'Yes — `int[][][] cube = new int[3][4][5]` works, and so do 4D, 5D. Each extra `[]` adds one more dimension. In practice, anything beyond 2D is rare in beginner code. Neural networks often use 4D tensors (batch, channels, height, width) but that is NumPy/PyTorch territory, not Java arrays.\n\nIf you ever feel like you need 5D arrays in Java, you almost certainly want a class with fields instead — `class Pixel { int x, y; int[] channels; }` is usually clearer than `int[][][][][]`.' },
      { type: 'callout', id: 'd11n-d3', calloutType: 'doubt', title: 'How do I avoid index-out-of-bounds errors in matrix code?', content: 'Three habits:\n\n1. **Always use `arr.length` and `arr[i].length`** — never hardcode `arr[0].length` (breaks for jagged arrays).\n2. **Allocate the result first** — `int[][] C = new int[A.length][B[0].length]` before the loop. If you allocate inside the loop you get garbage.\n3. **Initialise to zero** — Java does this for you with `new int[][]`, but if you ever switch to `new Integer[][]`, autoboxing leaves them as `null`.' },
      // Exam
      { type: 'callout', id: 'd11n-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Matrix multiplication** — triple nested loop. GUARANTEED 10-mark CE-2 coding question.\n2. **Time complexity** — three nested loops over n → O(n³).\n3. **Dimension rule** — A[r1×c1] × B[c1×c2] = C[r1×c2]. Inner dimensions must match.\n4. **Jagged arrays** — `int[][] j = new int[3][]; j[0] = new int[5];` is valid. MCQ favourite.\n5. **Traverse safely** — `arr.length` (rows), `arr[i].length` (cols in row i).' },
      // Bridge
      { type: 'callout', id: 'd11n-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: '2D arrays + nested loops (Day 4) = every ML matrix operation. Jagged arrays are how you represent variable-shape data cleanly. Matrix multiplication is the engine behind neural network forward passes.\n\nTomorrow (Day 17) is **Exceptions & Wrappers** — the other side of robustness. After today\'s 2D arrays, you have seen pretty much every "data structure" Java offers. Tomorrow you learn what happens when things go wrong.' },
      // Quick Ref
      { type: 'table', id: 'd11n-qref', headers: ['Concept', 'Key Point'], rows: [
        ['2D array', 'int[][] m = new int[rows][cols]. m.length = rows. m[i].length = cols in row i.'],
        ['Jagged array', 'Rows can have different lengths: int[][] j = new int[3][]; j[0] = new int[5];'],
        ['Matrix add', 'Same shape. C[i][j] = A[i][j] + B[i][j]. O(n²).'],
        ['Matrix mult', 'A[r1×c1] × B[c1×c2] = C[r1×c2]. Triple loop: i(rows), j(cols), k(shared). O(n³).'],
        ['Dimension rule', 'Inner dimensions of A and B MUST match (c1 == r2).'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd11n-quiz', title: 'Day 16 Quiz', questions: [
        { id: 'd11n-q1', question: 'What is the time complexity of naive matrix multiplication (two n×n matrices)?', options: ['O(n)', 'O(n²)', 'O(n³)', 'O(2ⁿ)'], correctIndex: 2, explanation: 'Three nested loops, each iterating n times → O(n³). Strassen does it in O(n^2.807) but is more complex.' },
        { id: 'd11n-q2', question: 'You have A[2×3] and B[3×4]. Can you multiply A × B? What is the result shape?', options: ['No — sizes must match', 'Yes — result is 2×4', 'Yes — result is 3×3', 'No — must be square'], correctIndex: 1, explanation: 'Inner dimensions match (3 == 3). Result is rows of A (2) × cols of B (4) = 2×4.' },
        { id: 'd11n-q3', question: 'What is a jagged array?', options: ['An array with missing elements', 'A 2D array where rows have DIFFERENT lengths', 'A corrupted array', 'An array of Objects'], correctIndex: 1, explanation: 'Jagged array: int[][] jagged = new int[3][]; jagged[0] = new int[5]; jagged[1] = new int[2]. Each row can have a different length. Used for Pascal\'s triangle, sparse data.' },
        { id: 'd11n-q4', question: 'In `int[][] m`, what does `m.length` return and what does `m[i].length` return?', options: ['Both return total element count', 'm.length = rows, m[i].length = cols in row i', 'Both return the column count', 'm.length = cols, m[i].length = rows in col i'], correctIndex: 1, explanation: 'm.length is the number of rows. m[i].length is the number of columns in row i — which matters for jagged arrays where rows can differ.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd11n-cards', title: 'Day 16 Flashcards', cards: [
        { id: 'd11n-f1', front: 'Matrix multiplication triple loop?', back: 'for(i: rows of A) for(j: cols of B) for(k: shared dim) C[i][j] += A[i][k] * B[k][j]. A[r1×c1] × B[c1×c2] → C[r1×c2]. Columns of A MUST equal rows of B.', hint: 'i, j, k — rows of A, cols of B, shared...' },
        { id: 'd11n-f2', front: 'Jagged array — what and how?', back: '2D array where rows have DIFFERENT lengths. int[][] j = new int[3][]; j[0] = new int[5]; j[1] = new int[2]; j[2] = new int[8]; Uses: Pascal\'s triangle, sparse matrices, variable-length records.', hint: 'Rows can be different sizes...' },
        { id: 'd11n-f3', front: 'm.length vs m[i].length?', back: 'm.length = number of rows. m[i].length = number of columns in row i. Use m[i].length (NOT m[0].length) so the code works for jagged arrays too.', hint: 'Rows vs columns-in-row-i...' },
        { id: 'd11n-f4', front: 'Why O(n³) for matrix multiplication?', back: 'Three nested loops: i (n rows of A), j (n cols of B), k (n shared dimension). Total work: n × n × n = n³. Strassen\'s algorithm does ~n^2.807 but is rarely worth the complexity in practice.', hint: 'Three nested loops of size n...' },
      ] },
      // Practices (5-6, at end of day)
      { type: 'practice', id: 'd11n-p1', lang: 'java', title: 'Practice: Matrix addition', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: define A = {{1,2,3},{4,5,6}} and B = {{7,8,9},{10,11,12}}
        // TODO 2: allocate C with the same shape as A
        // TODO 3: nested loop — C[i][j] = A[i][j] + B[i][j]
        // TODO 4: print A, B, C using printMatrix()
    }
}
// Helper to add as a static method in the same file (so main can call it without an instance)
class MatrixOps {
    // TODO 5: public static void printMatrix(int[][] m) — print rows one per line, values separated by spaces
    // TODO 6: public static int[][] add(int[][] A, int[][] B) — assume same shape, return new matrix
}` },
      { type: 'practice', id: 'd11n-p2', lang: 'java', title: 'Practice: Matrix multiplication (the boss)', starter: `public class Test {
    public static void main(String[] args) {
        // 2x3 times 3x2 → 2x2
        int[][] A = {{1,2,3},{4,5,6}};
        int[][] B = {{7,8},{9,10},{11,12}};
        // TODO 1: allocate C with shape [A.length][B[0].length]
        // TODO 2: write the triple loop — C[i][j] += A[i][k] * B[k][j]
        // TODO 3: print C using a helper. Expected:
        //   58 64
        //  139 154
    }
}
class MatrixOps {
    // TODO 4: public static int[][] multiply(int[][] A, int[][] B) — full implementation
    //   Pre-check: A[0].length == B.length, else throw IllegalArgumentException
    // TODO 5: public static void printMatrix(int[][] m)
}` },
      { type: 'practice', id: 'd11n-p3', lang: 'java', title: 'Practice: Pascal\'s Triangle — jagged', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: read n from args (default 7)
        // TODO 2: build jagged triangle of height n using the formula triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
        // TODO 3: print centered (use StringBuilder for each row)
        //   For row i, print (n - i) spaces then numbers separated by spaces
        // Sample output for n=5:
        //         1
        //       1   1
        //     1   2   1
        //   1   3   3   1
        // 1   4   6   4   1
    }
}` },
      { type: 'practice', id: 'd11n-p4', lang: 'java', title: 'Practice: Transpose', starter: `public class Test {
    public static void main(String[] args) {
        int[][] m = {{1,2,3},{4,5,6}};  // 2x3
        // TODO 1: allocate transposed with shape [m[0].length][m.length] — i.e. 3x2
        // TODO 2: fill it — transposed[j][i] = m[i][j]
        // TODO 3: print both side by side
        // Expected:
        //   1 2 3       1 4
        //   4 5 6       2 5
        //               3 6
    }
}` },
      { type: 'practice', id: 'd11n-p5', lang: 'java', title: 'Practice: Sparse matrix (jagged)', starter: `public class Test {
    public static void main(String[] args) {
        // A "sparse" matrix stores only non-zero values.
        // We represent it as an array of (row, col, value) entries.
        // TODO 1: write a class SparseMatrix with add(row, col, value) and get(row, col)
        //   get(row, col) returns 0 if no entry at that position
        // TODO 2: build a 1000x1000 sparse matrix with only 5 entries
        // TODO 3: print get(...) for the 5 stored entries (each prints its value)
        //         and for a missing entry (prints 0)
        // Bonus: print the "memory saved" — compare to a dense int[1000][1000]
    }
}
class SparseMatrix {
    // TODO 4: private int[][] entries — jagged, each inner array = {row, col, value}
    // TODO 5: private int count
    // TODO 6: add(int r, int c, int v) — append an entry
    // TODO 7: get(int r, int c) — scan entries, return 0 if not found
}` },
      { type: 'practice', id: 'd11n-p6', lang: 'java', title: 'Practice: Verify matrix multiply by hand', starter: `public class Test {
    public static void main(String[] args) {
        // Two small matrices A (2x3) and B (3x2). Multiply them.
        // Then manually compute ONE cell of the result and assert it matches.
        int[][] A = {{1,2,3},{4,5,6}};
        int[][] B = {{7,8},{9,10},{11,12}};
        // TODO 1: multiply → C, shape [2][2]
        // TODO 2: compute C[1][0] by hand:
        //   C[1][0] = A[1][0]*B[0][0] + A[1][1]*B[1][0] + A[1][2]*B[2][0]
        //         = 4*7 + 5*9 + 6*11
        //         = 28 + 45 + 66 = 139
        // TODO 3: assert your computed C[1][0] == 139. If it does not, your code is wrong.
        // TODO 4: print the whole C and verify by eye for one more cell.
    }
}` },
    ],
    tasks: [
      { id: 'java-14-d11-next-t1', text: 'Matrix multiplication: two 3×3 matrices with random values. Print inputs, output, verify with a known example.', tag: 'lab' },
      { id: 'java-14-d11-next-t2', text: 'Pascal\'s triangle using jagged arrays up to row 10. Print centered. Why are jagged arrays more memory-efficient here?', tag: 'bonus' },
      { id: 'java-14-d11-next-t3', text: 'Implement a sparse matrix (only store non-zeros). Compare memory to a dense int[1000][1000].', tag: 'drill' },
      { id: 'java-14-d11-next-t4', text: 'Build a 4x4 identity matrix (1s on diagonal, 0s elsewhere). Verify A × I = A for a few random A.', tag: 'lab' },
      { id: 'java-14-d11-next-t5', text: 'Transpose a matrix, then multiply it with the original. What shape does the result have, and why?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 12: Exception Handling — bumped number 15 → 17 (wrappers split out)
  // ================================================================
  {
    id: 'java-14-d12', number: 17, title: 'Exception Handling', duration: 90,
    subtitle: 'Errors will happen — be ready',
    topics: ['try-catch-finally', 'throw vs throws', 'Custom Exceptions', 'try-with-resources', 'Checked vs Unchecked'],
    blocks: [
      { type: 'callout', id: 'd12-intro', calloutType: 'info', title: 'Errors will happen', content: 'Every program you write WILL encounter errors — missing files, bad user input, network failures, database crashes. The difference between a crash and a graceful recovery is **exception handling**. Today: the exception family tree, try-catch-finally, throw vs throws, custom exception types, and try-with-resources for automatic cleanup. Tomorrow (Day 18) covers wrapper classes and autoboxing — the other half of what used to be one compressed day.' },
      { type: 'heading', id: 'd12-hierarchy', level: 2, content: 'The Exception Family Tree' },
      { type: 'code', id: 'd12-hier-code', lang: 'text', title: 'Throwable Hierarchy', code: 'Throwable\n├── Error                          ← Do NOT catch these!\n│   ├── OutOfMemoryError          JVM ran out of heap memory\n│   ├── StackOverflowError        Infinite recursion ate your stack\n│   └── NoClassDefFoundError      Missing .class file at runtime\n│\n└── Exception                     ← Handle these\n    ├── RuntimeException           ← UNCHECKED (optional to handle)\n    │   ├── NullPointerException   Calling .method() on null\n    │   ├── ArithmeticException    Division by zero (integers)\n    │   ├── IndexOutOfBoundsException Array/List index too high\n    │   ├── IllegalArgumentException Bad argument passed\n    │   └── NumberFormatException  "hello" cannot become an int\n    │\n    └── IOException               ← CHECKED (MUST handle)\n        ├── FileNotFoundException  File not where you said it was\n        ├── SQLException           Database connection/query failed\n        └── ClassNotFoundException Class.forName() could not find the class' },
      { type: 'callout', id: 'd12-checked', calloutType: 'warn', title: 'Checked vs Unchecked — The Compiler as Traffic Cop', content: '**Checked** (IOException, SQLException): the compiler FORCES you to handle them — either try-catch or `throws`. These represent EXTERNAL failures (file missing, DB down).\n\n**Unchecked** (NullPointerException, ArithmeticException): the compiler does NOT force handling. These usually represent PROGRAMMING BUGS — you should FIX the code, not catch the exception.\n\nGolden rule: catch checked exceptions, fix unchecked ones. Catching NullPointerException is like putting a bandage on a broken leg — the leg is still broken.' },
      { type: 'heading', id: 'd12-try', level: 2, content: 'try-catch-finally — The Safety Net' },
      { type: 'code', id: 'd12-try-code', lang: 'java', title: 'Exception Handling — All Patterns', code: '// Pattern 1: Basic try-catch\ntry {\n    int x = Integer.parseInt(input);\n    System.out.println("You entered: " + x);\n} catch (NumberFormatException e) {\n    System.out.println("That is not a number! Try again.");\n}\n\n// Pattern 2: Multiple catches — most specific FIRST\ntry {\n    int[] arr = {1, 2, 3};\n    int x = arr[10];                     // throws ArrayIndexOutOfBoundsException\n    int y = Integer.parseInt("abc");     // throws NumberFormatException\n} catch (ArrayIndexOutOfBoundsException e) {\n    System.out.println("Index out of bounds!");\n} catch (NumberFormatException e) {\n    System.out.println("Not a number!");\n} catch (Exception e) {  // catch-all LAST\n    System.out.println("Something else: " + e);\n}\n\n// Pattern 3: finally ALWAYS executes (even after return!)\ntry {\n    return computeResult();\n} catch (Exception e) {\n    return fallbackValue();\n} finally {\n    cleanupResources();  // ALWAYS runs, before either return\n}\n// The ONLY thing that stops finally: System.exit(0) or a JVM crash.' },
      { type: 'callout', id: 'd12-finally-fun', calloutType: 'info', title: 'The finally Mind-Bender', content: 'What does this return?\n\n```java\npublic static int mystery() {\n    try { return 1; }\n    finally { return 2; }\n}\n// Returns: 2\n```\n\n`return 1` is in the try block — but `finally` runs BEFORE the return completes. And if `finally` has its own `return`, it OVERRIDES the try\'s return. **Moral**: never put `return` inside `finally`. Use `finally` ONLY for cleanup.' },
      { type: 'heading', id: 'd12-throw', level: 2, content: 'throw vs throws — Two Confusingly Named Keywords' },
      { type: 'code', id: 'd12-throw-code', lang: 'java', title: 'Custom Exception + throw/throws', code: '// Step 1: Create your own exception class\nclass InsufficientFundsException extends Exception {\n    private double shortage;\n    public InsufficientFundsException(String msg, double shortage) {\n        super(msg);\n        this.shortage = shortage;\n    }\n    public double getShortage() { return shortage; }\n}\n\n// Step 2: Use it — "throws" in signature, "throw" in body\nclass Account {\n    private double balance;\n    // "throws" = DECLARATION: "I might throw this. Callers, be ready."\n    public void withdraw(double amount) throws InsufficientFundsException {\n        if (amount > balance) {\n            // "throw" = ACTION: Creates and throws NOW\n            throw new InsufficientFundsException(\n                "Need " + amount + ", have " + balance,\n                amount - balance\n            );\n        }\n        balance -= amount;\n    }\n}' },
      { type: 'callout', id: 'd12-throw-vs', calloutType: 'tip', title: 'The One-Sentence Distinction', content: '**`throw`**: creates and throws an exception object RIGHT NOW. Used INSIDE the method body. Action.\n\n**`throws`**: declares that a method MIGHT throw certain exceptions. Used in the METHOD SIGNATURE. Warning label.\n\nMemory trick: "I **throw** a ball (action). I declare what my method **throws** (warning)." CE-2 WILL ask this.' },
      { type: 'heading', id: 'd12-twr', level: 2, content: 'try-with-resources — The Automatic Cleanup' },
      { type: 'code', id: 'd12-twr-code', lang: 'java', title: 'try-with-resources (Java 7+)', code: '// ❌ OLD WAY: Manual finally + null check (Java 6 and earlier)\nScanner sc = null;\ntry {\n    sc = new Scanner(new File("data.txt"));\n    while (sc.hasNextLine()) System.out.println(sc.nextLine());\n} catch (FileNotFoundException e) {\n    System.out.println("File not found!");\n} finally {\n    if (sc != null) sc.close();  // ugh — null check + manual close\n}\n\n// ✅ NEW WAY: try-with-resources (Java 7+)\ntry (Scanner sc = new Scanner(new File("data.txt"))) {\n    while (sc.hasNextLine()) System.out.println(sc.nextLine());\n} catch (FileNotFoundException e) {\n    System.out.println("File not found!");\n}\n// sc.close() called AUTOMATICALLY. No finally. No null check. Clean.' },
      // Doubt
      { type: 'callout', id: 'd12-d1', calloutType: 'doubt', title: 'Should I catch Exception or specific exceptions?', content: '**Catch the MOST specific exception that you can actually handle.**\n\n```java\n// ❌ BAD: catches everything, including bugs\ntry { ... } catch (Exception e) { e.printStackTrace(); }\n\n// ✅ GOOD: specific catches, meaningful responses\ntry { readFile("config.txt"); }\ncatch (FileNotFoundException e) { createDefaultConfig(); }\ncatch (IOException e) { logger.error("Filesystem issue", e); }\n```\n\nRule of thumb: if you can RECOVER from the error, catch it. If you cannot (OutOfMemoryError), let it propagate. Catch-all should be your LAST resort.' },
      { type: 'callout', id: 'd12-d2', calloutType: 'doubt', title: 'When should I create my own exception class?', content: 'Create a custom exception when:\n\n1. **No built-in exception describes the problem.** `IllegalArgumentException` could mean anything. `InvalidGradeException` is clear.\n2. **You want callers to catch THIS error separately.** `catch (PaymentFailedException e)` is cleaner than guessing what `catch (RuntimeException e)` means.\n3. **You need domain-specific data.** `PaymentFailedException` carries the transaction ID, the amount, and the failure reason.\n\nBut do not over-engineer. If `IllegalArgumentException` with a clear message works, use it.' },
      // Exam
      { type: 'callout', id: 'd12-exam', calloutType: 'exam', title: 'Exam Alert — CE-2 Exception Focus', content: '1. **throw vs throws** — throw = action, throws = declaration. Tested EVERY CE-2.\n2. **finally ALWAYS executes** — even after return, break, or exception. Except `System.exit()`.\n3. **Checked vs Unchecked** — checked = compiler forces handling. Unchecked = optional.\n4. **try-with-resources** — auto-closes `AutoCloseable` resources. Java 7+ feature.\n5. **Custom exceptions** — extend `Exception` (checked) or `RuntimeException` (unchecked).' },
      // Bridge
      { type: 'callout', id: 'd12-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'try-catch-finally → used in **File I/O (Day 19)** for resource cleanup. Custom exceptions → real-world validation in your **Advanced Java project**. try-with-resources → the standard way to handle JDBC connections, file streams, and network sockets.\n\nTomorrow (Day 18) is the second half of this pair: **Wrappers & Autoboxing** — how primitives cross over to the object world so Collections can hold them.' },
      // Quick Ref
      { type: 'table', id: 'd12-qref', headers: ['Concept', 'Key Point'], rows: [
        ['try-catch', 'Catch most specific first. Generic last.'],
        ['finally', 'ALWAYS runs. No return in finally!'],
        ['throw', 'Create + throw exception NOW. Action.'],
        ['throws', 'Declare method might throw. Warning label on signature.'],
        ['try-with-res', 'Auto-closes AutoCloseable resources. No finally needed.'],
        ['Checked', 'Compiler forces handling. IOException, SQLException.'],
        ['Unchecked', 'Optional. NullPointer, Arithmetic, IndexOutOfBounds. Fix code instead.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd12-quiz', title: 'Day 17 Quiz', questions: [
        { id: 'd12-q1', question: 'Does finally execute if there is a return statement in try?', options: ['No — return exits immediately', 'Yes — finally ALWAYS runs, even after return', 'Only if an exception occurred', 'It depends on the JVM'], correctIndex: 1, explanation: 'Yes! finally is GUARANTEED. The only exception to this rule is System.exit(0).' },
        { id: 'd12-q2', question: 'What is the difference between throw and throws?', options: ['No difference', 'throw creates/throws an exception; throws is a method declaration', 'throw is for checked, throws for unchecked', 'throw is a Java keyword, throws is a compiler directive'], correctIndex: 1, explanation: 'throw = ACTION (creates and throws). throws = DECLARATION (method signature warning). "I throw a ball" vs "this method throws IOException."' },
        { id: 'd12-q3', question: 'Why must catch blocks be ordered from most specific to most general?', options: ['Performance', 'Because the first matching catch wins — a general one would shadow a specific one', 'It does not matter — order is just style', 'Compiler requires alphabetical order'], correctIndex: 1, explanation: 'Java picks the FIRST catch whose exception type matches. If you put `catch (Exception e)` first, it would catch everything and the specific catches below would be unreachable (compile error).' },
        { id: 'd12-q4', question: 'What does try-with-resources do that a manual finally does not?', options: ['Nothing — they are equivalent', 'It auto-closes any AutoCloseable resource, even on exception, with no null check', 'It makes code run faster', 'It catches more exception types'], correctIndex: 1, explanation: 'try-with-resources calls close() on every resource declared in try() — automatically, even if an exception is thrown. No finally, no null check. Cleaner and safer.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd12-cards', title: 'Day 17 Flashcards', cards: [
        { id: 'd12-f1', front: 'throw vs throws — one-sentence each?', back: 'throw = creates and throws an exception OBJECT right now (action, inside method body). throws = declares in the METHOD SIGNATURE that this method might throw certain checked exceptions (warning to callers).', hint: 'Action vs declaration...' },
        { id: 'd12-f2', front: 'try-with-resources — what and why?', back: 'Resources declared in try() are auto-closed when block exits. Works for any AutoCloseable: Scanner, FileReader, Connection, Statement, ResultSet. No finally needed. Cleaner, safer — resources close even on exception.', hint: 'Auto-close, no finally...' },
        { id: 'd12-f3', front: 'Checked vs Unchecked exceptions?', back: 'Checked (IOException): compiler FORCES handling — try-catch or throws. External failures. Unchecked (NullPointerException): no compiler enforcement — fix the code, do not catch. Checked = environment. Unchecked = your code bugs.', hint: 'Compiler enforcement...' },
        { id: 'd12-f4', front: 'When does finally NOT run?', back: 'Almost never. finally runs after try OR after catch, even after return/break/continue. The only ways to skip it: System.exit(0), a JVM crash, or an infinite loop inside the try block.', hint: 'Almost never — only System.exit or crash...' },
      ] },
      // Practices (6, at end of day)
      { type: 'practice', id: 'd12-p1', lang: 'java', title: 'Practice: try-catch patterns', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: try parsing "abc" as int — catch NumberFormatException, print "Not a number!"
        // TODO 2: access index 10 of an int[] {1,2,3} inside a try block.
        //         catch ArrayIndexOutOfBoundsException and print "Out of bounds!"
        //         then add a SECOND catch (Exception e) for everything else
        // TODO 3: write a finally block that prints "cleanup done"
        //         even when an exception is thrown above
    }
}` },
      { type: 'practice', id: 'd12-p2', lang: 'java', title: 'Practice: Custom InsufficientFundsException', starter: `public class ATM {
    public static void main(String[] args) {
        Account a = new Account("Vinayak", 5000);
        // TODO 1: try withdraw(10000) — catch the custom exception, print message + shortage
        // TODO 2: try withdraw(2000) — valid path
        // TODO 3: try withdraw(-500) — should throw IllegalArgumentException, catch it
    }
}
class InsufficientFundsException extends Exception {
    private double shortage;
    InsufficientFundsException(String msg, double shortage) {
        super(msg);
        this.shortage = shortage;
    }
    // TODO 4: getter for shortage
}
class Account {
    private String holder;
    private double balance;
    Account(String h, double b) { holder=h; balance=b; }
    // TODO 5: withdraw(double amount) — throws InsufficientFundsException
    //   - reject negative/zero with IllegalArgumentException
    //   - reject over-balance with InsufficientFundsException (carrying shortage)
    //   - otherwise deduct + print success
}` },
      { type: 'practice', id: 'd12-p3', lang: 'java', title: 'Practice: try-with-resources for a file', starter: `import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
public class FileReader {
    public static void main(String[] args) {
        // TODO 1: use try-with-resources on a Scanner(new File("data.txt"))
        //   inside the try: read every line with hasNextLine() + nextLine(), print each
        // TODO 2: catch FileNotFoundException — print "File not found: " + e.getMessage()
        // TODO 3: BEFORE you fix the catch, temporarily rename the file to "missing.txt"
        //         to see the exception fire. Then put it back.
        // Bonus: write a NEW version using the OLD try-finally pattern (without
        //        try-with-resources) to feel the difference.
    }
}` },
      { type: 'practice', id: 'd12-p4', lang: 'java', title: 'Practice: Trace the finally mind-bender', starter: `public class Test {
    public static void main(String[] args) {
        // Run each method. Predict the output BEFORE running.
        // Then write a comment explaining why.
        System.out.println("--- version A ---");
        System.out.println(mysteryA());
        System.out.println("--- version B ---");
        System.out.println(mysteryB());
        System.out.println("--- version C ---");
        System.out.println(mysteryC());
    }
    static int mysteryA() {
        try { return 1; }
        finally { System.out.println("A finally"); }
    }
    static int mysteryB() {
        try { return 1; }
        finally { return 2; }
    }
    static int mysteryC() {
        try { throw new RuntimeException("boom"); }
        finally { System.out.println("C finally"); }
    }
}` },
      { type: 'practice', id: 'd12-p5', lang: 'java', title: 'Practice: Multi-catch + rethrow', starter: `public class MultiCatch {
    public static void main(String[] args) {
        // TODO 1: write a method parseAndSquare(String s) that returns int
        //   - try: Integer.parseInt(s) → square it → return
        //   - catch (NumberFormatException | NullPointerException e):
        //         print "Bad input: " + s
        //         return 0
        //   - This is Java 7+ MULTI-CATCH — one handler for two types
        //
        // TODO 2: call parseAndSquare("5"), parseAndSquare("abc"), parseAndSquare(null)
        //         print each result
        //
        // TODO 3: try a different shape — "catch (Exception e) { throw e; }"
        //         This is RETHROW — used to log and re-throw.
        //         Demonstrate with a method that prints "logged: " + e.getMessage()
        //         then re-throws the same exception.
    }
}` },
      { type: 'practice', id: 'd12-p6', lang: 'java', title: 'Practice: Account + AuditLogger', starter: `// Two paired classes in the same file.
public class BankApp {
    public static void main(String[] args) {
        // TODO 1: create Account("Vinayak", 5000), try 3 withdrawals (10000, 2000, -500)
        //         wrap EACH in try-catch
        // TODO 2: pass each failed withdrawal to AuditLogger.log(e)
        //         AuditLogger prints "[AUDIT] <exception class>: <message>"
        // TODO 3: after the loop, print the final balance via account.getBalance()
    }
}
class InsufficientBalanceException extends Exception {
    InsufficientBalanceException(String msg) { super(msg); }
}
class Account {
    private String holder;
    private double balance;
    Account(String h, double b) { holder=h; balance=b; }
    double getBalance() { return balance; }
    void withdraw(double amount) throws InsufficientBalanceException {
        if (amount<=0) throw new IllegalArgumentException("Must be positive");
        if (amount>balance) throw new InsufficientBalanceException(
            holder+" needs "+(amount-balance)+" more");
        balance-=amount;
    }
}
class AuditLogger {
    // TODO 4: public static void log(Exception e) — prints "[AUDIT] " + e.getClass().getSimpleName() + ": " + e.getMessage()
}` },
    ],
    tasks: [
      { id: 'java-14-d12-t1', text: 'Create custom InsufficientBalanceException. Write Account class with withdraw(). Test valid, insufficient, and negative paths.', tag: 'lab' },
      { id: 'java-14-d12-t2', text: 'Build a safe number parser: read inputs until "done." Catch NumberFormatException. Report sum, count, and average.', tag: 'lab' },
      { id: 'java-14-d12-t3', text: 'Write a method that proves finally runs even after return. Try finally-return-overrides-the-try-return.', tag: 'drill' },
      { id: 'java-14-d12-t4', text: 'Convert one old try-finally-close pattern to try-with-resources. Feel the brevity.', tag: 'lab' },
      { id: 'java-14-d12-t5', text: 'Explain: throw vs throws. What is the difference? Which one goes in the method signature?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 12-NEXT: Wrappers & Autoboxing
  // ================================================================
  {
    id: 'java-14-d12-next', number: 18,
    title: 'Wrapper Classes & Autoboxing',
    subtitle: 'How primitives cross over to the object world',
    duration: 90,
    topics: ['Wrapper Classes', 'Autoboxing', 'Unboxing', 'Integer Cache', 'parseInt vs valueOf'],
    alignment: ['CodeGym: Wrapper class types'],
    blocks: [
      { type: 'callout', id: 'd12n-intro', calloutType: 'info', title: 'Primitives in an object world', content: 'Yesterday you learned to catch errors. Today you learn how **primitives** — `int`, `double`, `boolean`, `char` — get dressed up as objects so they can live in Collections, generics, and `Object`-typed APIs. Every primitive has a **wrapper class** (`Integer`, `Double`, `Boolean`, `Character`), and Java auto-converts between them via **autoboxing** and **unboxing**. By tonight you will know the difference between `parseInt` and `valueOf`, why `Integer == Integer` is sometimes a trap, and where the null bomb hides.' },
      { type: 'heading', id: 'd12n-table', level: 2, content: 'The Eight Primitives and Their Wrappers' },
      { type: 'table', id: 'd12n-wrap-table', headers: ['Primitive', 'Wrapper', 'Autoboxing', 'Unboxing'], rows: [
        ['int', 'Integer', 'Integer i = 42;', 'int x = i;'],
        ['double', 'Double', 'Double d = 3.14;', 'double v = d;'],
        ['char', 'Character', 'Character c = \'A\';', 'char t = c;'],
        ['boolean', 'Boolean', 'Boolean f = true;', 'boolean q = f;'],
      ] },
      { type: 'callout', id: 'd12n-why', calloutType: 'info', title: 'Why wrappers exist at all', content: 'Java\'s generics are **erased** to Object at runtime. Primitives are NOT Objects, so they cannot participate in generics. C# solved this with reified generics. Java chose type erasure for backward compatibility — pre-Java-5 code had raw collections, and changing them would have broken the world.\n\nProject Valhalla (in development) will add value types that unify primitives and objects. Until then: wrappers. The compiler hides the friction with autoboxing.' },
      { type: 'heading', id: 'd12n-auto', level: 2, content: 'Autoboxing and Unboxing in Action' },
      { type: 'code', id: 'd12n-auto-code', lang: 'java', title: 'The Compiler Does the Lifting', code: '// Autoboxing: primitive → wrapper (automatic)\nArrayList<Integer> scores = new ArrayList<>();\nscores.add(95);   // int → Integer.valueOf(95) — you do not see this\nscores.add(88);\n\n// Unboxing: wrapper → primitive (automatic)\nint total = 0;\nfor (Integer score : scores) total += score;  // Integer → int per iteration\n\n// In arithmetic — wrappers unbox automatically\nInteger a = 10, b = 20;\nint sum = a + b;   // a.intValue() + b.intValue()\n\n// In comparisons — wrappers unbox to primitives\nSystem.out.println(a < b);  // true (unboxes both sides)\n\n// ⚠️ NULL unboxing → 💥 NullPointerException\nInteger possiblyNull = null;\nint x = possiblyNull;  // 💥 calls possiblyNull.intValue() on null → NPE!\n\n// ✅ Safe unboxing: always null-check first\nif (possiblyNull != null) { int y = possiblyNull; }' },
      { type: 'callout', id: 'd12n-null', calloutType: 'warn', title: 'The Null Unboxing Bomb', content: 'Whenever you unbox a wrapper, ask: **could this be null?** If the wrapper came from a `Map.get()` (which returns `null` for missing keys), from a database column that allowed NULL, or from any method that documented "may return null" — yes, it could be.\n\nThe classic crash:\n```java\nMap<String, Integer> ages = new HashMap<>();\nages.put("Vinayak", 21);\nint age = ages.get("Riya");  // returns null → auto-unboxes → NPE 💥\n```\n\nDefensive fix: use `Integer age = ages.get("Riya"); if (age == null) { ... }`. Or `Integer age = ages.getOrDefault("Riya", 0);` if 0 is a valid sentinel.' },
      { type: 'heading', id: 'd12n-utils', level: 2, content: 'Wrapper Utility Methods — Your Swiss Army Knife' },
      { type: 'code', id: 'd12n-utils-code', lang: 'java', title: 'parseInt, valueOf, toString, compare', code: '// ===== PARSE: String → Primitive =====\nint i = Integer.parseInt("42");\ndouble d = Double.parseDouble("3.14");\nboolean b = Boolean.parseBoolean("true");\nlong l = Long.parseLong("9223372036854775807");\n\n// ===== valueOf: String → Wrapper (uses cache) =====\nInteger cached = Integer.valueOf(127);   // cached object\nInteger fresh  = Integer.valueOf(128);   // new object\n// valueOf is preferred over new Integer() (deprecated since Java 9)\n\n// ===== toString: Primitive → String =====\nString s1 = Integer.toString(255);          // "255"\nString s2 = Integer.toBinaryString(255);    // "11111111"\nString s3 = Integer.toHexString(255);       // "ff"\nString s4 = Integer.toOctalString(255);     // "377"\n\n// ===== compare: safe comparison (no overflow trap) =====\nint cmp1 = Integer.compare(10, 20);   // -1\nint cmp2 = Double.compare(3.14, 3.14); // 0\n\n// ===== Constants =====\nint max = Integer.MAX_VALUE;  // 2147483647\nint min = Integer.MIN_VALUE;  // -2147483648\nint size = Integer.SIZE;      // 32 (bits)\nint bytes = Integer.BYTES;    // 4' },
      { type: 'callout', id: 'd12n-parse', calloutType: 'warn', title: 'parseInt vs valueOf — Pick the Right One', content: '**`Integer.parseInt("42")`** returns a primitive `int`. Use it when you need a number for math.\n\n**`Integer.valueOf("42")`** returns a wrapper `Integer` (cached for -128 to 127). Use it when you need an object for Collections, generics, or boxing.\n\nBoth throw `NumberFormatException` on bad input. `parseInt` is slightly faster (no boxing), but `valueOf` reuses cached objects for small values.' },
      { type: 'heading', id: 'd12n-cache', level: 2, content: 'The Integer Cache Trap — Interview Favourite' },
      { type: 'callout', id: 'd12n-cache-callout', calloutType: 'warn', title: '== compares references for wrappers, not values', content: '```java\nInteger a = 127;\nInteger b = 127;\nSystem.out.println(a == b);  // true (cached!)\n\nInteger c = 128;\nInteger d = 128;\nSystem.out.println(c == d);  // false (WHAT?!)\n```\n\nJava caches Integer objects from **-128 to 127**. For values in that range, autoboxing returns the SAME cached object. Outside that range, autoboxing creates new objects. `==` compares REFERENCES, not values, so two different objects with the same number return `false`.\n\n**ALWAYS use `.equals()` for wrapper comparison.** This is a CE-2 MCQ and a classic interview question.\n\nSame trap applies to: `Short`, `Byte`, `Long` (cached -128..127), `Character` (cached 0..127). `Float` and `Double` are NEVER cached.' },
      // Doubt
      { type: 'callout', id: 'd12n-d1', calloutType: 'doubt', title: 'Why is Integer not cached from 0 to some bigger number?', content: 'For performance. The cache range -128..127 covers the vast majority of values that show up in real code (array indices, small counts, ASCII-ish chars). Making it wider would balloon memory use. The exact range is technically tunable via `-XX:AutoBoxCacheMax` JVM flag, but 99% of code should never touch it. The right fix is always: use `.equals()` for wrapper comparison, full stop.' },
      { type: 'callout', id: 'd12n-d2', calloutType: 'doubt', title: 'When should I use Integer vs int?', content: '**Use `int`** (or `long`, `double`, etc.) by default. Primitives are faster and use less memory. Reach for the wrapper only when:\n\n1. **You must use generics** — `List<Integer>` works, `List<int>` does not.\n2. **You need a nullable value** — `Integer age = null` is valid; `int age = null` is a compile error.\n3. **An API requires Object** — reflection, `Object[]`, or any library method that takes `Number`.' },
      // Exam
      { type: 'callout', id: 'd12n-exam', calloutType: 'exam', title: 'Exam Alert — Wrapper Focus', content: '1. **Autoboxing** = primitive → wrapper (automatic). **Unboxing** = wrapper → primitive (automatic).\n2. **Null unboxing → NullPointerException**. Always null-check first.\n3. **Integer cache (-128 to 127)** — `==` compares references, use `.equals()`. #1 MCQ.\n4. **`parseInt` returns int, `valueOf` returns Integer** — pick the right one.\n5. **Same cache applies to** Short, Byte, Long (-128..127), Character (0..127). Float/Double NEVER cached.' },
      // Bridge
      { type: 'callout', id: 'd12n-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Wrapper classes → **Collections (Day 19)** require objects. Every `ArrayList<Integer>`, every `HashMap<String, Double>`, every generic type is autoboxing under the hood.\n\nAutoboxing + Integer cache → the #1 "weird Java bug" in real codebases. **Always `.equals()` for wrappers.** Tomorrow (Day 19) is File I/O and Serialization — the practical pay-off of all this exception and wrapper machinery.' },
      // Quick Ref
      { type: 'table', id: 'd12n-qref', headers: ['Concept', 'Key Point'], rows: [
        ['Autoboxing', 'Primitive → Wrapper automatically.'],
        ['Unboxing', 'Wrapper → Primitive automatically. Null = NPE!'],
        ['Integer cache', '-128 to 127 cached. Use .equals(), never == for wrappers.'],
        ['parseInt', 'String → primitive int. Throws NumberFormatException.'],
        ['valueOf', 'String → Integer wrapper. Cached for -128..127.'],
        ['equals vs ==', 'Wrappers: always .equals(). Primitives: == is fine.'],
        ['Null unboxing', 'Integer i = null; int x = i; → NPE. Always null-check.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd12n-quiz', title: 'Day 18 Quiz', questions: [
        { id: 'd12n-q1', question: 'Integer a = 200; Integer b = 200; What does (a == b) print?', options: ['true', 'false', 'Compile error', 'Runtime error'], correctIndex: 1, explanation: '200 is outside the Integer cache (-128 to 127). Two different Integer objects are created. `==` compares references (different → false). Use a.equals(b) → true.' },
        { id: 'd12n-q2', question: 'What happens when you unbox a null Integer?', options: ['It becomes 0', 'NullPointerException', 'It becomes Integer.MIN_VALUE', 'Compile error prevents this'], correctIndex: 1, explanation: 'Unboxing calls intValue() on the Integer object. null.intValue() → NullPointerException. Always null-check before unboxing.' },
        { id: 'd12n-q3', question: 'What is the difference between Integer.parseInt and Integer.valueOf?', options: ['No difference', 'parseInt returns int primitive; valueOf returns Integer wrapper (cached -128..127)', 'parseInt is slower', 'valueOf throws a different exception'], correctIndex: 1, explanation: 'parseInt("42") returns int. valueOf("42") returns Integer wrapper (cached for small values). Both throw NumberFormatException on bad input. valueOf is preferred over the deprecated new Integer().' },
        { id: 'd12n-q4', question: 'Why do we need wrapper classes at all?', options: ['Performance', 'Generics are erased to Object at runtime; primitives are not Objects', 'Style preference', 'They are optional decoration'], correctIndex: 1, explanation: 'Java generics are erased to Object. Primitives cannot participate in generics (no List<int>). Wrappers bridge the gap, and autoboxing hides the friction.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd12n-cards', title: 'Day 18 Flashcards', cards: [
        { id: 'd12n-f1', front: 'Autoboxing and the Integer cache trap?', back: 'Autoboxing: int → Integer automatically (Integer.valueOf()). Java caches Integer objects from -128 to 127. For cached values, == works (same object). Outside cache: == FAILS. ALWAYS use .equals() for wrapper comparisons.', hint: '-128 to 127 cached...' },
        { id: 'd12n-f2', front: 'parseInt vs valueOf?', back: 'parseInt(s) → int primitive. valueOf(s) → Integer wrapper (cached for -128..127). parseInt is faster (no boxing). valueOf gives you an object for Collections. Both throw NumberFormatException on bad input.', hint: 'Primitive vs wrapper...' },
        { id: 'd12n-f3', front: 'Null unboxing crash?', back: 'Unboxing calls intValue() on the Integer. null.intValue() → NullPointerException. Always null-check before unboxing. Common source: Map.get() returning null for missing keys.', hint: 'null → intValue() → NPE...' },
        { id: 'd12n-f4', front: 'Which wrappers have a cache?', back: 'Integer, Short, Byte, Long: -128..127. Character: 0..127. Float, Double: NEVER cached. The cache is JVM-tunable via -XX:AutoBoxCacheMax, but defaults are above.', hint: 'Integer/Short/Byte/Long -128..127, Character 0..127...' },
      ] },
      // Practices (6, at end of day)
      { type: 'practice', id: 'd12n-p1', lang: 'java', title: 'Practice: Autoboxing into ArrayList<Integer>', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create ArrayList<Integer> scores = new ArrayList<>()
        // TODO 2: add the ints 95, 88, 76, 100, 84 — autoboxing does the work
        // TODO 3: compute the total by unboxing in a for-each loop
        // TODO 4: compute the average (sum / count) using a double cast
        // TODO 5: find the max via Collections.max(scores) — note the return type
        // TODO 6: print each score with a label like "Score 1: 95"
    }
}` },
      { type: 'practice', id: 'd12n-p2', lang: 'java', title: 'Practice: Safe unboxing — guard the null', starter: `public class Test {
    public static void main(String[] args) {
        // Given the array below, write a helper intOrDefault(Integer i, int fallback)
        // that returns i if i is not null, else returns fallback.
        Integer[] values = {10, null, 20, null, 30};
        // TODO 1: loop over values — call intOrDefault(v, -1) for each, print the result
        // TODO 2: try the same WITHOUT intOrDefault — see the NPE
        // TODO 3: explain in a comment why "unboxing a null is dangerous"
    }
}` },
      { type: 'practice', id: 'd12n-p3', lang: 'java', title: 'Practice: Integer Cache Detective', starter: `public class CacheDetective {
    public static void main(String[] args) {
        System.out.println("Value  |  == (reference)  |  .equals()");
        System.out.println("-------|-------------------|------------");
        // TODO 1: loop from 120 to 135. For each i: Integer a = i; Integer b = i;
        //   print i, a==b, a.equals(b). At what value does == flip to false?
        //
        // TODO 2: also test new Integer(5) vs Integer.valueOf(5) — does "new" use cache?
        // TODO 3: test Short, Byte, Long caches too (range -128..127)
        // TODO 4: test Character cache (range 0..127)
        // Bonus: write a method that proves the cache range is JVM-tunable via -XX:AutoBoxCacheMax=500
    }
}` },
      { type: 'practice', id: 'd12n-p4', lang: 'java', title: 'Practice: Predict == vs .equals()', starter: `public class PredictOutput {
    public static void main(String[] args) {
        // Predict EACH line, then run and check.
        // Write a comment explaining each result.

        Integer a = 127, b = 127;
        System.out.println("a == b: " + (a == b));                  // ?
        System.out.println("a.equals(b): " + a.equals(b));          // ?

        Integer c = 128, d = 128;
        System.out.println("c == d: " + (c == d));                  // ?
        System.out.println("c.equals(d): " + c.equals(d));          // ?

        Integer e = new Integer(5);
        Integer f = new Integer(5);
        System.out.println("e == f: " + (e == f));                  // ?
        System.out.println("e.equals(f): " + e.equals(f));          // ?

        Integer g = Integer.valueOf(5);
        Integer h = Integer.valueOf(5);
        System.out.println("g == h: " + (g == h));                  // ?
        System.out.println("g.equals(h): " + g.equals(h));          // ?
    }
}` },
      { type: 'practice', id: 'd12n-p5', lang: 'java', title: 'Practice: parseInt vs valueOf timing', starter: `public class Timing {
    public static void main(String[] args) {
        // TODO 1: time 10 million iterations of Integer.parseInt("123")
        // TODO 2: time 10 million iterations of Integer.valueOf("123")
        // TODO 3: print which is faster and by roughly how much
        // Hint: System.currentTimeMillis() before and after the loop
        // Bonus: try both with a cached value ("5") and a non-cached value ("1000000")
        //        — observe whether the gap shrinks or grows
    }
}` },
      { type: 'practice', id: 'd12n-p6', lang: 'java', title: 'Practice: ScoreTracker with autoboxing + safe nulls', starter: `public class ScoreTracker {
    public static void main(String[] args) {
        // TODO 1: create HashMap<String, Integer> highScores
        // TODO 2: add ("Riya", 95), ("Vinayak", 88), ("Amit", 76), ("Neha", 92)
        // TODO 3: for each name, get the score and print "<name>: <score>"
        //   — but handle the null case: "Map has no entry for <name>" if get returns null
        // TODO 4: for a name NOT in the map ("Diya"), print "no record"
        //   using getOrDefault(key, 0) — but print "no record" if default was used
        //   (hint: getOrDefault cannot tell you whether 0 was real or default — use containsKey)
        // TODO 5: print the average of all present scores (skip the missing one)
    }
}` },
    ],
    tasks: [
      { id: 'java-14-d12-next-t1', text: 'Build a HashMap<String, Integer> age-book. Handle get() returning null without crashing.', tag: 'lab' },
      { id: 'java-14-d12-next-t2', text: 'Demonstrate Integer cache: find the exact boundary where == stops working. Test Short, Byte, Long, Character caches.', tag: 'drill' },
      { id: 'java-14-d12-next-t3', text: 'Time parseInt vs valueOf for 10M iterations. Report the difference for cached and non-cached values.', tag: 'bonus' },
      { id: 'java-14-d12-next-t4', text: 'Explain: why == works for cached Integers but not for non-cached. What is the fix?', tag: 'mcq' },
      { id: 'java-14-d12-next-t5', text: 'Build a wrapper-typed score tracker with safe get + sum + average + max — never let a null unbox.', tag: 'lab' },
    ],
  },
];