import type { Day } from '../../../types';

export const phase4days: Day[] = [
  // DAY 11: CE-2 Checkpoint — Packages, Access, 2D Arrays, StringBuilder
  {
    id: 'java-14-d11', number: 11,
    title: 'Checkpoint — CE-2 Review: Packages, Access, 2D Arrays',
    subtitle: 'Packages, Access Modifiers, Multi-Dim Arrays', duration: 120,
    topics: ['Packages', 'Access Modifiers', 'Multi-Dim Arrays', 'StringBuilder'],
    blocks: [
      { type: 'callout', id: 'd11-intro', calloutType: 'info', title: 'CE-2 Checkpoint', content: 'Three practical skills: **packages** (organization), **access modifiers** (encapsulation), **2D arrays** (matrix ops for AI/ML), and **StringBuilder** (efficient string building). Matrix multiplication is directly relevant to your AIML Linear Algebra course.' },
      { type: 'heading', id: 'd11-pkg', level: 2, content: 'Packages — Organizing Code' },
      { type: 'code', id: 'd11-pkg-code', lang: 'java', title: 'Package Structure', code: '// File: com/university/models/Student.java\npackage com.university.models;\npublic class Student {\n    public String branch;       // accessible everywhere\n    protected int rollNo;        // subclass + same pkg\n    int semester;                // default = same pkg only\n    private String name;         // this class only\n}' },
      { type: 'heading', id: 'd11-access', level: 2, content: 'Access Modifiers — Complete Grid' },
      { type: 'table', id: 'd11-access-table', headers: ['Modifier', 'Same Class', 'Same Pkg', 'Subclass (diff pkg)', 'Anywhere'], rows: [['private', '✅', '❌', '❌', '❌'], ['default (none)', '✅', '✅', '❌', '❌'], ['protected', '✅', '✅', '✅', '❌'], ['public', '✅', '✅', '✅', '✅']] },
      { type: 'heading', id: 'd11-2d', level: 2, content: '2D Arrays (Matrix)' },
      { type: 'code', id: 'd11-2d-code', lang: 'java', title: '2D Array Operations', code: 'int[][] m = {{1,2,3},{4,5,6},{7,8,9}};\nSystem.out.println(m[0][0]); // 1\n// Nested loops\nfor (int i=0; i<m.length; i++)\n    for (int j=0; j<m[i].length; j++)\n        System.out.print(m[i][j]+" ");' },
      { type: 'heading', id: 'd11-mul', level: 3, content: 'AIML Drill: Matrix Multiplication' },
      { type: 'code', id: 'd11-mul-code', lang: 'java', title: 'Matrix Multiply (O(n³))', code: 'int[][] A = {{1,2,3},{4,5,6}};   // 2×3\nint[][] B = {{7,8},{9,10},{11,12}}; // 3×2\nint[][] C = new int[2][2];\nfor (int i=0; i<2; i++)\n    for (int j=0; j<2; j++)\n        for (int k=0; k<3; k++)\n            C[i][j] += A[i][k] * B[k][j];\n// C = {{58,64},{139,154}}' },
      { type: 'heading', id: 'd11-sb', level: 2, content: 'StringBuilder — Efficient Strings' },
      { type: 'code', id: 'd11-sb-code', lang: 'java', title: 'StringBuilder vs Concatenation', code: '// BAD: creates 1000 String objects (O(n²))\nString s = ""; for (int i=0; i<1000; i++) s += i;\n\n// GOOD: single mutable buffer (O(n))\nStringBuilder sb = new StringBuilder();\nfor (int i=0; i<1000; i++) sb.append(i);\nString result = sb.toString();\n\n// Methods: append, insert, delete, reverse, replace\n// StringBuilder (not thread-safe, faster) vs StringBuffer (thread-safe, slower)' },
      // Doubt
      { type: 'callout', id: 'd11-d1', calloutType: 'doubt', title: 'Why must directory structure mirror package names?', content: 'The JVM uses the **classpath** to find classes. When you write `import com.university.models.Student;`, the JVM looks for `com/university/models/Student.class` relative to the classpath. The filesystem structure MUST match. This is enforced by the compiler.' },
      { type: 'callout', id: 'd11-d2', calloutType: 'doubt', title: 'private vs protected — which should I use?', content: '**private**: Internal implementation detail. No one outside this class needs it.\n**protected**: Meant to be used by subclasses. Example: a `validate()` method that subclasses override.\n**public**: The external API — what other code should use.\n**Default (no modifier)**: "Package-private" — useful for internal package utilities.' },
      // Exam
      { type: 'callout', id: 'd11-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Matrix multiplication** — guaranteed CE-2 coding question. Triple nested loop pattern.\n2. **Access modifier table** — memorize which one allows subclass access across packages.\n3. **StringBuilder vs String concatenation** in loops — performance question.\n4. **package statement must be first line** of file (before imports).' },
      // Bridge
      { type: 'callout', id: 'd11-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: '2D arrays + loops (Day 4) = matrix operations for AIML Linear Algebra. StringBuilder replaces String concatenation (Day 6). Access modifiers = foundation of encapsulation (Day 7).' },
      // Quick Ref
      { type: 'table', id: 'd11-qref', headers: ['Concept', 'Key Point'], rows: [['package', 'First line. Mirrors directory. Prevents name conflicts.'], ['import', 'import pkg.Class; or import pkg.*;'], ['Access: private', 'Same class only. Most restrictive.'], ['Access: protected', 'Same pkg + subclasses (any pkg).'], ['2D array', 'int[][] m = new int[rows][cols];'], ['StringBuilder', 'Mutable. append(), reverse(). Faster than + in loops.']] },
      // Quiz
      { type: 'quiz', id: 'd11-quiz', title: 'Day 11 Quiz', questions: [
        { id: 'd11-q1', question: 'Which access modifier allows subclass access from a different package?', options: ['private', 'default (no modifier)', 'protected', 'public'], correctIndex: 2, explanation: 'protected allows access within the same package AND by subclasses in any package. default limits to same package only.' },
        { id: 'd11-q2', question: 'Why is StringBuilder faster than String concatenation in a loop?', options: ['It uses native code', 'It modifies the same buffer; + creates new objects', 'It is compiled differently', 'It is not — they are equally fast'], correctIndex: 1, explanation: 'String is immutable — each + creates a new String object (O(n²) total). StringBuilder mutates a single internal buffer (O(n) total).' },
        { id: 'd11-q3', question: 'What is the time complexity of naive matrix multiplication?', options: ['O(n)', 'O(n²)', 'O(n³)', 'O(log n)'], correctIndex: 2, explanation: 'Three nested loops, each iterating n times → O(n³). There are faster algorithms (Strassen: O(n^2.8)), but naive is O(n³).' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd11-cards', title: 'Day 11 Flashcards', cards: [
        { id: 'd11-f1', front: '4 access modifiers from most to least restrictive?', back: 'private (same class only) → default (same package) → protected (same pkg + subclasses) → public (everywhere).', hint: 'Think of expanding circles...' },
        { id: 'd11-f2', front: 'Matrix multiplication pattern?', back: 'Triple nested loop: for i (rows of A) → for j (cols of B) → for k (cols of A / rows of B). C[i][j] += A[i][k] * B[k][j].', hint: 'i, j, k — three loops...' },
        { id: 'd11-f3', front: 'StringBuilder key methods?', back: 'append(), insert(index, str), delete(start, end), reverse(), replace(start, end, str), toString(). All modify the same buffer — O(1) amortized append.', hint: 'Mutable string buffer...' },
      ] },
      { type: 'practice', id: 'd11-p1', lang: 'java', title: 'Practice: Matrix Transpose', starter: 'public class Transpose {\n    public static void main(String[] args) {\n        int[][] m = {{1,2,3},{4,5,6}}; // 2×3\n        // TODO: transpose to 3×2\n        // {{1,4},{2,5},{3,6}}\n    }\n}', hint: 'transpose[j][i] = matrix[i][j]. New dimensions: [cols][rows].' },
      { type: 'practice', id: 'd11-p2', lang: 'java', title: 'Practice: Pascal\'s Triangle', starter: 'public class Pascal {\n    public static void main(String[] args) {\n        int n = 5;\n        int[][] tri = new int[n][];\n        // TODO: generate Pascal\'s triangle\n        // tri[i][0]=1, tri[i][i]=1, tri[i][j]=tri[i-1][j-1]+tri[i-1][j]\n    }\n}', hint: 'Each row has i+1 elements. First and last are 1. Middle elements sum two from the row above.' },
    ],
    tasks: [
      { id: 'java-14-d11-t1', text: 'Custom package with Student class using all 4 access modifiers. Test from same and different packages.', tag: 'lab' },
      { id: 'java-14-d11-t2', text: 'Matrix multiplication: two 3×3 matrices. Print inputs and result.', tag: 'lab' },
      { id: 'java-14-d11-t3', text: 'Build a string from 1 to 100,000 using String vs StringBuilder. Time both. Observe the difference.', tag: 'drill' },
    ],
  },

  // DAY 12: Exceptions & Wrapper Classes
  {
    id: 'java-14-d12', number: 12, title: 'Exceptions & Wrapper Classes', duration: 120,
    topics: ['try-catch-finally', 'throw / throws', 'Custom Exceptions', 'Autoboxing / Unboxing'],
    blocks: [
      { type: 'callout', id: 'd12-intro', calloutType: 'info', title: 'Handling the Unexpected', content: 'Programs crash when errors happen. **Exceptions** let you catch and respond gracefully. **Wrapper classes** turn primitives into objects — required for Collections (Day 14).' },
      { type: 'heading', id: 'd12-hierarchy', level: 2, content: 'Exception Hierarchy' },
      { type: 'code', id: 'd12-hier-code', lang: 'text', title: 'Exception Tree', code: 'Throwable\n├── Error (OutOfMemory, StackOverflow — do NOT catch)\n└── Exception\n    ├── RuntimeException (unchecked: NullPointer, Arithmetic, IndexOutOfBounds)\n    └── IOException (checked: MUST handle or declare)' },
      { type: 'callout', id: 'd12-checked', calloutType: 'warn', title: 'Checked vs Unchecked', content: '**Checked** (IOException, SQLException): Compiler FORCES handling (try-catch or throws). External factors.\n**Unchecked** (NullPointerException, ArithmeticException): Compiler does NOT force handling. Usually programming bugs — fix the code, do not catch.' },
      { type: 'heading', id: 'd12-try', level: 2, content: 'try-catch-finally' },
      { type: 'code', id: 'd12-try-code', lang: 'java', title: 'Full Exception Handling', code: 'try {\n    int result = 10 / 0;  // ArithmeticException\n} catch (ArithmeticException e) {\n    System.out.println("Cannot divide by zero!");\n} catch (Exception e) {\n    System.out.println("Something else: " + e);\n} finally {\n    System.out.println("ALWAYS executes — even after return or exception!");\n}' },
      { type: 'heading', id: 'd12-throw', level: 3, content: 'throw vs throws' },
      { type: 'code', id: 'd12-throw-code', lang: 'java', title: 'Custom Exception', code: 'class InvalidAgeException extends Exception {\n    InvalidAgeException(String msg) { super(msg); }\n}\n\nvoid validate(int age) throws InvalidAgeException {\n    if (age < 0) throw new InvalidAgeException("Age cannot be negative!");\n}\n// throw  = CREATES and throws exception NOW\n// throws = DECLARES that method MIGHT throw this exception' },
      { type: 'heading', id: 'd12-wrapper', level: 2, content: 'Wrapper Classes + Autoboxing' },
      { type: 'table', id: 'd12-wrap-table', headers: ['Primitive', 'Wrapper', 'Autoboxing', 'Unboxing'], rows: [['int', 'Integer', 'Integer i=42;', 'int x=i;'], ['double', 'Double', 'Double d=3.14;', 'double v=d;'], ['char', 'Character', 'Character c=\'A\';', 'char t=c;'], ['boolean', 'Boolean', 'Boolean f=true;', 'boolean q=f;']] },
      { type: 'code', id: 'd12-auto-code', lang: 'java', title: 'Autoboxing in Collections', code: 'ArrayList<Integer> scores = new ArrayList<>();\nscores.add(95);   // autoboxing: int → Integer\nscores.add(88);\nint total = 0;\nfor (Integer s : scores) total += s; // unboxing: Integer → int\n\n// Utility methods\nint n = Integer.parseInt("123");\nString s = Integer.toString(456);' },
      // Doubt
      { type: 'callout', id: 'd12-d1', calloutType: 'doubt', title: 'Should I catch Exception or specific exceptions?', content: '**Catch specific exceptions FIRST, generic last.**\n```java\ntry { ... }\ncatch (FileNotFoundException e) { ... }  // specific first\ncatch (IOException e) { ... }            // broader\ncatch (Exception e) { ... }              // catch-all last\n```\nCatching Exception alone swallows EVERYTHING — including bugs you should fix.' },
      { type: 'callout', id: 'd12-d2', calloutType: 'doubt', title: 'Why do we need wrapper classes?', content: '1. **Collections** (ArrayList, HashMap) can ONLY store objects — not primitives.\n2. **null** in Integer means "no value" — impossible with primitive int.\n3. **Utility methods**: parseInt(), toString(), compare(), max(), min().\n4. **Generics** require object types: `List<Integer>`, not `List<int>`.' },
      // Exam
      { type: 'callout', id: 'd12-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **finally ALWAYS executes** — even after return, break, or exception.\n2. **throw vs throws** — tested in every CE-2. throw = action. throws = declaration.\n3. **Checked vs Unchecked** — #1 exception theory question.\n4. **Autoboxing/unboxing** — MCQs about Integer vs int in conditions/collections.' },
      // Bridge
      { type: 'callout', id: 'd12-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Wrapper classes → **Collections (Day 14)** require objects. try-catch-finally → used in **File I/O (Day 13)** for resource cleanup. Custom exceptions → real-world validation in project-based evaluation.' },
      // Quick Ref
      { type: 'table', id: 'd12-qref', headers: ['Concept', 'Key Point'], rows: [['try-catch-finally', 'finally always runs. Catch most specific first.'], ['throw', 'Explicitly creates and throws an exception.'], ['throws', 'Method declaration: "I might throw this."'], ['Checked', 'Must handle. IOException, SQLException.'], ['Unchecked', 'Optional. NullPointer, Arithmetic, IndexOutOfBounds.'], ['Autoboxing', 'Primitive→Wrapper (automatic). Unboxing = reverse.']] },
      // Quiz
      { type: 'quiz', id: 'd12-quiz', title: 'Day 12 Quiz', questions: [
        { id: 'd12-q1', question: 'Does finally execute if there is a return statement in try?', options: ['No — return exits immediately', 'Yes — finally always runs', 'Only if an exception occurs', 'It depends on the JVM'], correctIndex: 1, explanation: 'Yes! finally ALWAYS executes — even after return, break, continue, or exception. The only exception is System.exit().' },
        { id: 'd12-q2', question: 'What is the difference between throw and throws?', options: ['No difference — synonyms', 'throw is checked, throws is unchecked', 'throw creates exception, throws declares it', 'throw is for methods, throws is for constructors'], correctIndex: 2, explanation: 'throw creates and throws an exception. throws is a method declaration that warns callers the method might throw certain exceptions.' },
        { id: 'd12-q3', question: 'What enables `ArrayList<Integer> list = new ArrayList<>(); list.add(42);` to work?', options: ['Casting', 'Autoboxing', 'Generics', 'Reflection'], correctIndex: 1, explanation: 'Autoboxing automatically converts the int literal 42 to Integer.valueOf(42). Without autoboxing, you would need list.add(Integer.valueOf(42)).' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd12-cards', title: 'Day 12 Flashcards', cards: [
        { id: 'd12-f1', front: 'throw vs throws?', back: 'throw = CREATE and throw exception now. throws = DECLARE that method might throw. throw is an action. throws is a warning label on the method signature.', hint: 'Action vs declaration...' },
        { id: 'd12-f2', front: 'What is autoboxing/unboxing?', back: 'Autoboxing: automatic primitive→wrapper conversion (int→Integer). Unboxing: automatic wrapper→primitive (Integer→int). JVM inserts valueOf() and intValue() calls silently.', hint: 'Automatic conversion...' },
        { id: 'd12-f3', front: 'Checked vs Unchecked exceptions?', back: 'Checked: compiler FORCES handling (IOException, SQLException). Unchecked: RuntimeException subclasses (NullPointer, Arithmetic) — programming bugs, optional to catch.', hint: 'Compiler enforcement...' },
      ] },
      { type: 'practice', id: 'd12-p1', lang: 'java', title: 'Practice: Bank with Custom Exception', starter: 'class InsufficientBalanceException extends Exception {\n    InsufficientBalanceException(String msg) { super(msg); }\n}\nclass Account {\n    double balance;\n    void withdraw(double amount) throws InsufficientBalanceException {\n        if (amount > balance) throw new InsufficientBalanceException("Need "+amount+", have "+balance);\n        balance -= amount;\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Account a = new Account(); a.balance=5000;\n        try { a.withdraw(6000); }\n        catch (InsufficientBalanceException e) { System.out.println(e.getMessage()); }\n        finally { System.out.println("Transaction complete"); }\n    }\n}', hint: 'Add deposit method. Test with valid withdrawal. Add a try-catch for user input parsing (NumberFormatException when parsing String to double).' },
      { type: 'practice', id: 'd12-p2', lang: 'java', title: 'Practice: Number Parser', starter: 'import java.util.Scanner;\npublic class Parser {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Enter a number: ");\n        String input = sc.nextLine();\n        // TODO: try to parse with Integer.parseInt, catch NumberFormatException\n        // Print "Valid: X" or "Invalid input, enter a number"\n        sc.close();\n    }\n}', hint: 'Wrap Integer.parseInt(input) in try-catch. On NumberFormatException: print error. In finally: close scanner.' },
    ],
    tasks: [
      { id: 'java-14-d12-t1', text: 'try-catch-finally for ArithmeticException. Show finally executes even after exception.', tag: 'lab' },
      { id: 'java-14-d12-t2', text: 'Custom InvalidMarksException. validate(int marks) throws if out of 0-100 range.', tag: 'lab' },
      { id: 'java-14-d12-t3', text: 'ArrayList<Integer>: store ints, compute sum. Use Integer.parseInt() for string→int.', tag: 'lab' },
    ],
  },
];
