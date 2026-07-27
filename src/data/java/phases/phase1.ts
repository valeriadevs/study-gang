import type { Day } from '../../../types';

export const phase1days: Day[] = [
  // ======== DAY 1: Environment & Basic Structure ========
  {
    id: 'java-14-d1', number: 1, title: 'Environment & Basic Structure', duration: 120,
    topics: ['JDK / JRE Setup', 'Hello World', 'JVM', 'Platform Independence'],
    alignment: ['Codecademy: Hello World', 'CodeGym: Commands in Java'],
    blocks: [
      { type: 'callout', id: 'd1-intro', calloutType: 'info', title: 'What You Will Learn Today', content: 'By the end of Day 1, you will understand **why Java is platform-independent**, install the JDK, write your first program, and know exactly what happens when you type `javac HelloWorld.java && java HelloWorld`.' },
      { type: 'heading', id: 'd1-jdk', level: 2, content: 'The JDK / JRE / JVM Trio' },
      { type: 'paragraph', id: 'd1-jdk-p', content: 'This is the single most common confusion point. Let us settle it now.' },
      { type: 'table', id: 'd1-trio', headers: ['Component', 'Stands For', 'What It Does', 'Who Needs It'], rows: [['**JVM**', 'Java Virtual Machine', 'Executes bytecode (.class files). Memory management, GC, security.', 'End users'], ['**JRE**', 'Java Runtime Environment', 'JVM + core libraries. Minimum to **run** Java.', 'Anyone running Java apps'], ['**JDK**', 'Java Development Kit', 'JRE + dev tools (javac, jar, jdb). Complete toolkit.', 'Developers — you!']] },
      { type: 'callout', id: 'd1-analogy', calloutType: 'tip', title: 'Kitchen Analogy', content: '**JVM** = stove (cooks). **JRE** = kitchen (stove + pots). **JDK** = full restaurant kitchen (kitchen + recipe books + measuring tools).' },
      { type: 'heading', id: 'd1-platform', level: 2, content: 'Platform Independence — Write Once, Run Anywhere' },
      { type: 'paragraph', id: 'd1-wora', content: 'Java compiles to **bytecode** (.class file), not machine code. Each platform\'s JVM translates the **same bytecode** into native instructions at runtime. No recompilation needed when moving between OSes.' },
      { type: 'code', id: 'd1-flow', lang: 'text', title: 'Compilation Flow', code: 'HelloWorld.java ──javac──▶ HelloWorld.class ──java──▶ Output' },
      { type: 'callout', id: 'd1-exam-q', calloutType: 'warn', title: 'Common Exam Question', content: '**Q: Is Java compiled or interpreted?**\nA: **Both.** Compiled by javac to bytecode, then interpreted (and JIT-compiled) by JVM at runtime.' },
      { type: 'heading', id: 'd1-hello', level: 2, content: 'Your First Java Program' },
      { type: 'code', id: 'd1-hello-code', lang: 'java', title: 'HelloWorld.java', code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
      { type: 'list', id: 'd1-breakdown', listStyle: 'number', items: ['`public class HelloWorld {` — Public class. Filename MUST match class name.', '`public static void main(String[] args)` — Entry point. `public` (JVM access), `static` (no instance needed), `void` (no return), `main` (special name), `String[] args` (CLI args).', '`System.out.println(...)` — `System` = built-in class, `out` = static PrintStream field, `println` = print + newline. Semicolon `;` terminates every statement.', '`}` — Closes method, then class. Every `{` needs matching `}`.'] },
      { type: 'code', id: 'd1-commands', lang: 'bash', title: 'Terminal', code: 'javac HelloWorld.java   # compile\njava HelloWorld          # run (no .class extension!)' },
      { type: 'callout', id: 'd1-errors', calloutType: 'warn', title: 'Common Errors', content: '1. **javac not recognized** → JDK missing or PATH not set.\n2. **Could not find main class** → You typed `java HelloWorld.class` instead of `java HelloWorld`.\n3. **Class X is public** → Filename does not match class name.' },
      { type: 'heading', id: 'd1-jvm-deep', level: 2, content: 'JVM Memory Areas' },
      { type: 'table', id: 'd1-memory', headers: ['Area', 'Stores', 'Key Fact'], rows: [['**Heap**', 'Objects (new), instance variables', 'Garbage collected. Shared by all threads.'], ['**Stack**', 'Local vars, method call frames', 'Per thread. Cleared when method returns.'], ['**Method Area**', 'Class metadata, static vars', 'Loaded once per class.']] },
      { type: 'callout', id: 'd1-jit', calloutType: 'tip', title: 'JIT Compiler', content: 'The JVM identifies "hot spots" (frequently run code) and compiles them to native machine code. This is why modern Java approaches C++ speeds for long-running applications.' },
      // Doubt Clinics
      { type: 'callout', id: 'd1-doubt-1', calloutType: 'doubt', title: "Why can't I double-click a .class file?", content: '`.class` contains **bytecode**, not a native executable. Your OS does not understand bytecode — only the JVM does. You must run it via `java ClassName` from terminal.' },
      { type: 'callout', id: 'd1-doubt-2', calloutType: 'doubt', title: 'JDK 17 vs JDK 21 — which should I install?', content: 'Both are **LTS** (Long-Term Support). JDK 21 is newer with more features. Your university syllabus works on **JDK 17+**. Install 21 for the latest, 17 if your lab machines use it. Do NOT install JDK 8 unless specifically required.' },
      { type: 'callout', id: 'd1-doubt-3', calloutType: 'doubt', title: 'Do I need JAVA_HOME on every OS?', content: '**Windows**: Highly recommended (tools like Maven/Hadoop need it). Set via System Environment Variables.\n**macOS**: Auto-set by Homebrew (`brew install openjdk`).\n**Linux**: Set in `~/.bashrc`: `export JAVA_HOME=/usr/lib/jvm/java-21-openjdk`.\nPATH lets `javac` work. JAVA_HOME is a separate variable IDEs and build tools use.' },
      // Exam Alert
      { type: 'callout', id: 'd1-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Every word in main is tested**: `public`, `static`, `void`, `main`, `String[] args`.\n2. **JDK > JRE > JVM** — guaranteed 1-mark MCQ.\n3. **Platform independence answer**: ALWAYS "bytecode + JVM", never "Java compiles to native code."\n4. **Filename rule**: `public class Foo` MUST be in `Foo.java`.' },
      // Bridge
      { type: 'callout', id: 'd1-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Heap vs Stack (today) matters on **Day 7** (objects in heap, locals in stack). `public static void main` is the foundation of every program you write. GC will be revisited in Advanced Java.' },
      // Quick Reference
      { type: 'table', id: 'd1-quickref', headers: ['Command', 'Description'], rows: [['`javac X.java`', 'Compile to bytecode'], ['`java X`', 'Run in JVM (no .class)'], ['`javadoc X.java`', 'Generate HTML docs'], ['`jar cvf a.jar *.class`', 'Package into JAR'], ['`java -version`', 'Show Java version']] },
      // Quiz
      { type: 'quiz', id: 'd1-quiz', title: 'Day 1 Quiz',
        questions: [
          { id: 'd1-q1', question: 'Which component actually executes Java bytecode?', options: ['JDK', 'JRE', 'JVM', 'javac'], correctIndex: 2, explanation: 'The JVM (Java Virtual Machine) is the execution engine. javac compiles, JDK is the dev kit, JRE is the runtime.' },
          { id: 'd1-q2', question: 'What is the correct main method signature?', options: ['public void main(String[] args)', 'public static void main(String[] args)', 'public static void main(String args)', 'static void main(String[] args)'], correctIndex: 1, explanation: 'Must be `public static void main(String[] args)`. All four keywords are mandatory in that exact order.' },
          { id: 'd1-q3', question: 'Can a .class file compiled on Windows run on Linux?', options: ['No — recompilation needed', 'Yes — bytecode is platform-independent', 'Only if you rename the file', 'Only on 64-bit Linux'], correctIndex: 1, explanation: 'Bytecode (.class) is platform-independent. The Linux JVM executes the same bytecode without changes. That\'s the whole point of Java.' },
          { id: 'd1-q4', question: 'Where do objects created with `new` live?', options: ['Stack', 'Heap', 'Method Area', 'PC Register'], correctIndex: 1, explanation: 'Objects live on the Heap. The Stack holds local variables and method frames. Heap is garbage collected; Stack clears on method return.' },
        ],
      },
      // Flashcards
      { type: 'flashcard', id: 'd1-cards', title: 'Day 1 Flashcards',
        cards: [
          { id: 'd1-f1', front: 'What does JVM do?', back: 'Executes bytecode, manages memory (heap/stack), performs garbage collection, provides platform independence.', hint: 'The engine of Java...' },
          { id: 'd1-f2', front: 'JDK vs JRE vs JVM hierarchy?', back: 'JDK (dev kit) > JRE (runtime) > JVM (engine). JDK = JRE + tools. JRE = JVM + libraries.', hint: 'Kitchen analogy...' },
          { id: 'd1-f3', front: 'Meaning of each word in main?', back: 'public = JVM access. static = no instance. void = no return. main = special name. String[] args = CLI args.', hint: '5 keywords, 5 purposes...' },
          { id: 'd1-f4', front: 'Compile and run commands?', back: 'javac MyClass.java → MyClass.class. java MyClass (no .class). Filename must match class name.', hint: 'Two commands...' },
          { id: 'd1-f5', front: 'What is bytecode?', back: 'Intermediate code (.class) from javac. Not machine code. Each platform\'s JVM translates the same bytecode to native instructions. Enables WORA.', hint: 'Not source, not machine — intermediate...' },
        ],
      },
      { type: 'practice', id: 'd1-p1', lang: 'java', title: 'Practice: Hello World', starter: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}', hint: 'Add your name, university, and current date on separate lines.' },
      { type: 'practice', id: 'd1-p2', lang: 'java', title: 'Practice: Memory Demo', starter: 'public class MemoryDemo {\n    public static void main(String[] args) {\n        int age = 20;        // lives on the _____\n        String name = new String("Vinay"); // object on the _____\n        System.out.println(name + " is " + age);\n    }\n}', hint: 'Primitives live on the stack. Objects created with new live on the heap.' },
    ],
    tasks: [
      { id: 'java-14-d1-t1', text: 'Install JDK 21 and verify java -version and javac -version work.', tag: 'lab' },
      { id: 'java-14-d1-t2', text: 'Write, compile, and run HelloWorld.java from terminal (no IDE).', tag: 'lab' },
      { id: 'java-14-d1-t3', text: 'Explain: Why does Java not need recompilation when moving .class from Windows to Linux?', tag: 'review' },
      { id: 'java-14-d1-t4', text: 'Draw and label the JDK > JRE > JVM hierarchy.', tag: 'drill' },
      { id: 'java-14-d1-t5', text: 'Which stores objects — Heap or Stack?', tag: 'mcq' },
    ],
  },

  // ======== DAY 2: Data Types, Variables, and I/O ========
  {
    id: 'java-14-d2', number: 2, title: 'Data Types, Variables, and I/O', duration: 120,
    topics: ['Primitives', 'Scanner', 'Assignment Operator'],
    alignment: ['CodeGym: Types and keyboard input', 'Codecademy: Variables'],
    blocks: [
      { type: 'callout', id: 'd2-intro', calloutType: 'info', title: 'What You Will Build Today', content: 'Every program processes data. Today: Java\'s **8 primitive types**, variables, keyboard input via `Scanner`, and how the assignment operator `=` really works. These are the atoms of every Java program.' },
      { type: 'heading', id: 'd2-prim', level: 2, content: 'The 8 Primitive Types' },
      { type: 'table', id: 'd2-prim-table', headers: ['Type', 'Size', 'Range', 'Example', 'Note'], rows: [['byte', '1B', '-128 to 127', 'byte b=100;', 'Rare — file I/O'], ['short', '2B', '±32,767', 'short s=30000;', 'Rarely used'], ['int', '4B', '~±2.1B', 'int age=21;', '**Default integer**'], ['long', '8B', 'huge', 'long pop=8B L;', '**Must end with L**'], ['float', '4B', '~6-7 digits', 'float pi=3.14f;', '**Must end with f**'], ['double', '8B', '~15 digits', 'double e=2.718;', '**Default decimal**'], ['char', '2B', 'Unicode', "char g='A';", '**Single quotes**'], ['boolean', '1b', 'true/false', 'boolean f=true;', 'Only two values']] },
      { type: 'callout', id: 'd2-default', calloutType: 'warn', title: 'Default Values', content: '**Instance variables** get defaults (0, false, \\u0000). **Local variables** (inside methods) do NOT get defaults — you MUST initialize before use. This is a CE-1 MCQ favorite.' },
      { type: 'heading', id: 'd2-vars', level: 2, content: 'Variables and Assignment' },
      { type: 'code', id: 'd2-var-code', lang: 'java', title: 'Variable Patterns', code: 'int age = 21;\ndouble gpa = 8.75;\nchar section = \'A\';\n\n// Declaration then initialization\nString name;\nname = "Vinay";\n\n// Constant\nfinal double PI = 3.14159;\n// PI = 3.14; // COMPILE ERROR!' },
      { type: 'callout', id: 'd2-int-div', calloutType: 'warn', title: 'Integer Division Trap', content: '`int x = 5 / 2;` gives **2**, not 2.5! When both operands are int, Java truncates. Use `double x = 5.0 / 2;` for 2.5. This is a guaranteed CE-1 trick question.' },
      { type: 'heading', id: 'd2-cast', level: 2, content: 'Type Casting' },
      { type: 'table', id: 'd2-cast-table', headers: ['Type', 'Direction', 'Automatic?', 'Data Loss?', 'Example'], rows: [['Widening', 'Smaller→Larger', 'Yes', 'No', 'int→long'], ['Narrowing', 'Larger→Smaller', 'No—needs cast', 'Possible!', 'double→int: (int)3.99 = 3']] },
      { type: 'code', id: 'd2-cast-code', lang: 'java', title: 'Casting', code: '// Widening (automatic)\nint i = 10;\nlong l = i;   // OK\n\n// Narrowing (explicit)\ndouble d = 3.99;\nint j = (int) d;  // 3 (fraction lost)\n\n// char↔int\nchar c = \'A\';\nint ascii = c;        // 65\nchar next = (char)(c+1); // \'B\'' },
      { type: 'heading', id: 'd2-scanner', level: 2, content: 'Taking Input with Scanner' },
      { type: 'code', id: 'd2-sc-code', lang: 'java', title: 'Scanner Basics', code: 'import java.util.Scanner;\n\npublic class Input {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Name: ");\n        String name = sc.nextLine();\n        System.out.print("Age: ");\n        int age = sc.nextInt();\n        sc.nextLine(); // consume leftover newline!\n        System.out.print("City: ");\n        String city = sc.nextLine();\n        System.out.printf("%s, %d, from %s%n", name, age, city);\n        sc.close();\n    }\n}' },
      { type: 'callout', id: 'd2-sc-gotcha', calloutType: 'warn', title: 'The Scanner Newline Trap', content: 'After `nextInt()`, `nextDouble()`, or `nextBoolean()`, a newline `\\n` is **left in the buffer**. The next `nextLine()` consumes it (returns empty string). **Fix**: add an extra `sc.nextLine()` after every numeric/boolean input to clear the buffer.' },
      { type: 'table', id: 'd2-sc-methods', headers: ['Method', 'Returns', 'Stops At'], rows: [['nextLine()', 'String (entire line)', 'Enter key'], ['next()', 'String (one token)', 'Whitespace'], ['nextInt()', 'int', 'Whitespace'], ['nextDouble()', 'double', 'Whitespace']] },
      { type: 'code', id: 'd2-printf', lang: 'java', title: 'printf Formatting', code: 'double gpa = 8.753;\nSystem.out.printf("GPA: %.2f%n", gpa);  // 8.75\n// %s=string, %d=int, %f=double, %.2f=2 decimals, %n=newline' },
      // Doubt Clinics
      { type: 'callout', id: 'd2-d1', calloutType: 'doubt', title: 'When should I use float vs double?', content: '**Always use double** unless you have a specific memory constraint (e.g., millions of floats in an ML model). double has 15 digits of precision vs float\'s 7. For your university work, double is the safe default.' },
      { type: 'callout', id: 'd2-d2', calloutType: 'doubt', title: 'What happens if I assign a long to an int?', content: '**Compiler error.** You need an explicit cast: `int x = (int) myLong;`. This may lose data if the long value exceeds int\'s range (~±2.1 billion). Always check the value first.' },
      { type: 'callout', id: 'd2-d3', calloutType: 'doubt', title: 'Why does Scanner.nextInt() skip my nextLine()? Visual explanation.', content: 'Imagine the input buffer as: `"42\\nVinay\\n"`.\n- `nextInt()` reads `42` but leaves `\\n` in the buffer.\n- `nextLine()` then reads `\\n` (empty string!) instead of `"Vinay"`.\n- **Fix**: After `nextInt()`, call `sc.nextLine()` to consume `\\n`. Now the buffer has `"Vinay\\n"` and `nextLine()` works.' },
      // Exam Alert
      { type: 'callout', id: 'd2-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Integer division**: `5/2 = 2` — guaranteed trick question.\n2. **Scanner newline trap**: CE-1 coding question staple.\n3. **Default values for local vs instance variables**: MCQ favorite.\n4. **All 8 primitive types and sizes**: Memorize byte/short/int/long sizes in bytes.' },
      // Bridge
      { type: 'callout', id: 'd2-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'The assignment operator `=` and value types you learn today become critical on **Day 5** with parameter passing (pass-by-value). Scanner will be used in **every lab task** from here onward.' },
      // Quick Ref
      { type: 'table', id: 'd2-qref', headers: ['Concept', 'Key Point'], rows: [['8 primitives', 'byte(1),short(2),int(4),long(8),float(4),double(8),char(2),boolean'], ['Integer division', 'int/int = int (truncated). Use double for decimals.'], ['Scanner', 'import java.util.Scanner; new Scanner(System.in)'], ['Newline trap', 'Add sc.nextLine() after nextInt/Double/Boolean'], ['printf', '%s=string %d=int %f=double %.2f=round %n=newline']] },
      // Quiz
      { type: 'quiz', id: 'd2-quiz', title: 'Day 2 Quiz',
        questions: [
          { id: 'd2-q1', question: 'What is the value of `5 / 2` in Java?', options: ['2.5', '2', '2.0', 'Compile error'], correctIndex: 1, explanation: 'Both operands are int, so integer division occurs. Result is 2 (truncated). Use 5.0/2 for 2.5.' },
          { id: 'd2-q2', question: 'Which of these requires an explicit cast?', options: ['int→long', 'byte→int', 'double→int', 'char→int'], correctIndex: 2, explanation: 'double→int is narrowing (loses fractional part). All others are widening conversions — automatic.' },
          { id: 'd2-q3', question: 'What happens if you don\'t clear the buffer after nextInt() before calling nextLine()?', options: ['Program crashes', 'nextLine() returns empty string', 'nextLine() reads the int again', 'Nothing — it works fine'], correctIndex: 1, explanation: 'nextLine() consumes the leftover newline character and returns an empty string, skipping your actual input.' },
          { id: 'd2-q4', question: 'Which primitive type is the default for decimal numbers in Java?', options: ['float', 'double', 'decimal', 'long'], correctIndex: 1, explanation: 'double is the default. float literals must end with \'f\': `3.14f`. double is also the return type of Math methods.' },
        ],
      },
      // Flashcards
      { type: 'flashcard', id: 'd2-cards', title: 'Day 2 Flashcards',
        cards: [
          { id: 'd2-f1', front: 'Name all 8 primitive types with sizes.', back: 'byte(1B), short(2B), int(4B), long(8B), float(4B), double(8B), char(2B), boolean(JVM-dependent).', hint: 'Byte, short, int, long, float, double, char, boolean...' },
          { id: 'd2-f2', front: 'What is the integer division trap?', back: 'int/int = int (truncated). 5/2 = 2, not 2.5. Use 5.0/2 or cast one operand to double.', hint: 'Both integers → integer result...' },
          { id: 'd2-f3', front: 'How to fix the Scanner newline trap?', back: 'After nextInt()/nextDouble()/nextBoolean(), add an extra sc.nextLine() to consume leftover \\n before reading the next string.', hint: 'Extra nextLine() call...' },
          { id: 'd2-f4', front: 'printf format specifiers?', back: '%s = string, %d = int, %f = double/float, %.2f = 2 decimal places, %n = platform newline.', hint: 's, d, f with modifiers...' },
          { id: 'd2-f5', front: 'Default values: instance vs local variables?', back: 'Instance variables: 0/false/null. Local variables: NO default — must initialize or compile error.', hint: 'Fields get defaults, method variables do not...' },
        ],
      },
      { type: 'practice', id: 'd2-p1', lang: 'java', title: 'Practice: Student Info', starter: 'import java.util.Scanner;\npublic class StudentInfo {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // TODO: Ask for name, age, gpa, enrollment\n        // Print with printf. Clear buffer after numeric inputs!\n        sc.close();\n    }\n}', hint: 'nextLine() for name, nextInt() for age, nextDouble() for gpa. Remember: sc.nextLine() after numeric inputs!' },
      { type: 'practice', id: 'd2-p2', lang: 'java', title: 'Practice: Temperature Converter', starter: 'import java.util.Scanner;\npublic class TempConvert {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Celsius: ");\n        double c = sc.nextDouble();\n        // TODO: Convert to Fahrenheit: F = (C * 9/5) + 32\n        // Use printf to show 1 decimal place\n        sc.close();\n    }\n}', hint: 'Formula: fahrenheit = (celsius * 9.0/5.0) + 32. Use %.1f for one decimal place.' },
    ],
    tasks: [
      { id: 'java-14-d2-t1', text: 'Declare all 8 primitive types with values. Print each with a label.', tag: 'lab' },
      { id: 'java-14-d2-t2', text: 'Scanner program: take name, age, GPA, print formatted with printf.', tag: 'lab' },
      { id: 'java-14-d2-t3', text: 'Demonstrate the Scanner newline trap: call nextInt() then nextLine() without clearing. Observe. Then fix.', tag: 'drill' },
      { id: 'java-14-d2-t4', text: 'Swap two integers without a third variable (use arithmetic).', tag: 'bonus' },
      { id: 'java-14-d2-t5', text: 'What is (int) 3.99? Why?', tag: 'mcq' },
    ],
  },

  // ======== DAY 3: Decision Making ========
  {
    id: 'java-14-d3', number: 3, title: 'Decision Making', duration: 120,
    topics: ['if-else', 'switch-case', 'Menu-driven Programs'],
    alignment: ['CodeGym: Conditions and If', 'Codecademy: Conditionals'],
    blocks: [
      { type: 'callout', id: 'd3-intro', calloutType: 'info', title: 'The Brain of Every Program', content: 'Decision-making lets your program **choose** which code to execute. Without it, programs would do the same thing every time. Master `if-else` chains, `switch-case`, and the subtle differences between them.' },
      { type: 'heading', id: 'd3-if', level: 2, content: 'if-else — The Universal Decision Maker' },
      { type: 'code', id: 'd3-if-code', lang: 'java', title: 'if-else-if Ladder', code: 'int marks = 85;\n\nif (marks >= 90)      System.out.println("S");\nelse if (marks >= 80) System.out.println("A");\nelse if (marks >= 70) System.out.println("B");\nelse if (marks >= 60) System.out.println("C");\nelse if (marks >= 50) System.out.println("D");\nelse if (marks >= 40) System.out.println("E");\nelse                  System.out.println("F");' },
      { type: 'table', id: 'd3-ops', headers: ['Operator', 'Meaning', 'Example'], rows: [['==', 'Equal', '5==5→true'], ['!=', 'Not equal', '5!=3→true'], ['>', 'Greater', '10>5→true'], ['<', 'Less', '10<5→false'], ['>=', 'Greater or eq', '10>=10→true'], ['<=', 'Less or eq', '5<=10→true'], ['&&', 'AND (both true)', '(5>2)&&(3<10)→true'], ['||', 'OR (one true)', '(5<2)||(3<10)→true'], ['!', 'NOT (flip)', '!(5>2)→false']] },
      { type: 'callout', id: 'd3-short', calloutType: 'tip', title: 'Short-Circuit Evaluation', content: '`false && anything` → immediately `false` (right side never runs). `true || anything` → immediately `true`. Useful for safety: `if (arr != null && arr.length > 0)` — prevents NullPointerException.' },
      { type: 'heading', id: 'd3-switch', level: 2, content: 'switch-case — For Menu-Driven Programs' },
      { type: 'callout', id: 'd3-sw-types', calloutType: 'info', title: 'What Can You Switch On?', content: '`byte`, `short`, `int`, `char`, `String` (Java 7+), `enum`. NOT: `long`, `float`, `double`, `boolean`.' },
      { type: 'code', id: 'd3-sw-code', lang: 'java', title: 'Calculator Menu', code: 'switch (choice) {\n    case 1: result = a + b; break;\n    case 2: result = a - b; break;\n    case 3: result = a * b; break;\n    case 4:\n        if (b != 0) result = a / b;\n        else System.out.println("Cannot divide by zero!");\n        break;\n    default: System.out.println("Invalid choice!");\n}' },
      { type: 'callout', id: 'd3-fall', calloutType: 'warn', title: 'break — DO NOT FORGET', content: 'Without `break`, execution **falls through** to the next case. This is the #1 switch bug. Use it deliberately only when grouping cases (e.g., grade S and A share the same output).' },
      { type: 'table', id: 'd3-switch-vs-if', headers: ['Scenario', 'Use'], rows: [['Equality against fixed values', 'switch'], ['Range checks (>, <)', 'if-else'], ['Complex AND/OR conditions', 'if-else'], ['Menu-driven programs', 'switch'], ['Only 2-3 conditions', 'if-else']] },
      // Doubt Clinics
      { type: 'callout', id: 'd3-d1', calloutType: 'doubt', title: 'Should I write `if (flag == true)` or just `if (flag)`?', content: '**Always `if (flag)`.** They are identical, but the shorter form is cleaner and idiomatic. For false: `if (!flag)`. The `== true` version is redundant — `flag` already evaluates to a boolean.' },
      { type: 'callout', id: 'd3-d2', calloutType: 'doubt', title: 'When is switch fall-through useful?', content: 'When multiple cases share the same code:\n```java\ncase \'S\':\ncase \'A\': System.out.println("Excellent!"); break;\ncase \'B\':\ncase \'C\': System.out.println("Good"); break;\n```\nBoth S and A trigger the same output without duplicating code.' },
      { type: 'callout', id: 'd3-d3', calloutType: 'doubt', title: "Why can't I switch on double or long?", content: '**double**: Floating-point imprecision — `3.0` might be `2.9999999` internally, making exact matches unreliable.\n**long**: The range is too large for the jump table optimization the compiler uses for switch. Only smaller integer types and strings are supported.' },
      // Exam Alert
      { type: 'callout', id: 'd3-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **switch with String**: Added in Java 7 — classic MCQ.\n2. **Missing break**: Most common coding error in CE-1.\n3. **Short-circuit evaluation**: Tested in both MCQ and code-tracing questions.\n4. **Ternary operator**: Often appears as a 1-liner alternative to if-else in coding questions.' },
      // Bridge
      { type: 'callout', id: 'd3-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Boolean logic (&&, ||, !) is reused in **loop conditions (Day 4)** and **exception handling (Day 12)**. The comparison operators are the same you use for sorting (Comparable on Day 14).' },
      // Quick Ref
      { type: 'table', id: 'd3-qref', headers: ['Concept', 'Key Point'], rows: [['if-else-if', 'First true branch executes, rest skipped'], ['Ternary', 'condition ? trueVal : falseVal'], ['switch', 'Only: byte,short,int,char,String,enum'], ['break', 'Prevents fall-through. Group cases deliberately.'], ['&& vs &', '&& short-circuits. & evaluates both sides always.']] },
      // Quiz
      { type: 'quiz', id: 'd3-quiz', title: 'Day 3 Quiz',
        questions: [
          { id: 'd3-q1', question: 'What does `false && (10/0 == 0)` evaluate to?', options: ['Runtime error (division by zero)', 'false', 'true', 'Compile error'], correctIndex: 1, explanation: 'Short-circuit evaluation: since the left side is false, the right side is never evaluated. The division by zero never happens.' },
          { id: 'd3-q2', question: 'Which type CANNOT be used in a switch statement?', options: ['int', 'String', 'char', 'double'], correctIndex: 3, explanation: 'double cannot be switched. Floating-point imprecision makes exact equality comparisons unreliable.' },
          { id: 'd3-q3', question: 'What happens if you forget `break` in a switch case?', options: ['Compile error', 'The case is skipped', 'Execution falls through to next case', 'The program crashes'], correctIndex: 2, explanation: 'Without break, execution continues to the next case\'s code. This is called fall-through and is a deliberate language feature.' },
        ],
      },
      // Flashcards
      { type: 'flashcard', id: 'd3-cards', title: 'Day 3 Flashcards',
        cards: [
          { id: 'd3-f1', front: 'What is short-circuit evaluation?', back: '&& stops at first false. || stops at first true. The right side is never evaluated if the result is already determined.', hint: 'Think of it as "lazy evaluation"...' },
          { id: 'd3-f2', front: 'Which types work with switch?', back: 'byte, short, int, char, String (Java 7+), enum. NOT: long, float, double, boolean.', hint: 'Small integers + String + enum...' },
          { id: 'd3-f3', front: 'Ternary operator syntax?', back: 'condition ? valueIfTrue : valueIfFalse. Can be nested but becomes hard to read.', hint: 'One-line if-else...' },
        ],
      },
      { type: 'practice', id: 'd3-p1', lang: 'java', title: 'Practice: Grade Calculator', starter: 'import java.util.Scanner;\npublic class Grades {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Marks: ");\n        int m = sc.nextInt();\n        // TODO: if-else-if ladder for S/A/B/C/D/E/F\n        sc.close();\n    }\n}', hint: 'S: 90+, A: 80-89, B: 70-79, C: 60-69, D: 50-59, E: 40-49, F: below 40.' },
      { type: 'practice', id: 'd3-p2', lang: 'java', title: 'Practice: ATM Menu', starter: 'import java.util.Scanner;\npublic class ATM {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        double balance = 5000;\n        System.out.println("1.Check 2.Deposit 3.Withdraw 4.Exit");\n        int ch = sc.nextInt();\n        // TODO: switch with deposit/withdraw logic\n        sc.close();\n    }\n}', hint: 'For withdraw, check if balance >= amount. Use a while loop to keep ATM running until Exit is chosen.' },
    ],
    tasks: [
      { id: 'java-14-d3-t1', text: 'Marks → Grade using if-else-if ladder.', tag: 'lab' },
      { id: 'java-14-d3-t2', text: 'Menu-driven calculator with switch-case.', tag: 'lab' },
      { id: 'java-14-d3-t3', text: 'Leap year checker (divisible by 4, but century years must be divisible by 400).', tag: 'drill' },
      { id: 'java-14-d3-t4', text: 'Demonstrate switch fall-through: write without break, observe, then add breaks.', tag: 'drill' },
      { id: 'java-14-d3-t5', text: 'What is short-circuit evaluation? How does it prevent NullPointerException?', tag: 'mcq' },
    ],
  },

  // ======== DAY 4: Iterative Logic ========
  {
    id: 'java-14-d4', number: 4, title: 'Iterative Logic (Loops)', duration: 120,
    topics: ['for', 'while', 'do-while', 'Entry vs Exit Control'],
    alignment: ['CodeGym: Loops in Java', 'Codecademy: Loops'],
    blocks: [
      { type: 'callout', id: 'd4-intro', calloutType: 'info', title: 'Loops — The Engine of Computation', content: 'Loops let you repeat code **without rewriting it**. Master all three types — `for`, `while`, `do-while` — and the critical difference between **entry-controlled** and **exit-controlled** loops. Guaranteed CE-1 topic.' },
      { type: 'heading', id: 'd4-types', level: 2, content: 'The Three Loops' },
      { type: 'table', id: 'd4-compare', headers: ['Loop', 'Control', 'When to Use', 'Structure'], rows: [['for', 'Entry', 'Known count', 'for(init;cond;update){}'], ['while', 'Entry', 'Unknown count', 'while(cond){}'], ['do-while', 'Exit', 'Body MUST run at least once', 'do{}while(cond);']] },
      { type: 'code', id: 'd4-for', lang: 'java', title: 'for Loop', code: '// Print 1-10\nfor (int i = 1; i <= 10; i++) System.out.print(i + " ");\n// 1 2 3 4 5 6 7 8 9 10\n\n// Count down\nfor (int i = 10; i >= 1; i--) System.out.print(i + " ");\n\n// Step of 2\nfor (int i = 0; i <= 20; i += 2) System.out.print(i + " ");' },
      { type: 'code', id: 'd4-while', lang: 'java', title: 'while Loop', code: '// Count digits\nint num = 12345, count = 0;\nwhile (num != 0) { num /= 10; count++; }\nSystem.out.println(count); // 5\n\n// Sum until 0 (sentinel)\nint sum = 0, input;\nwhile ((input = sc.nextInt()) != 0) sum += input;' },
      { type: 'code', id: 'd4-do-while', lang: 'java', title: 'do-while (Menu Example)', code: 'int choice;\ndo {\n    System.out.println("1.Hello 2.Goodbye 3.Exit");\n    choice = sc.nextInt();\n} while (choice != 3);\n// Menu displays AT LEAST ONCE regardless of choice' },
      { type: 'callout', id: 'd4-entry-exit', calloutType: 'info', title: 'Entry vs Exit Control', content: '**Entry-controlled** (for, while): Condition checked **before** body. If false initially, body never runs.\n**Exit-controlled** (do-while): Condition checked **after** body. Body **always** runs at least once.\nClassic MCQ: "Which loop executes at least once?" → **do-while**.' },
      { type: 'heading', id: 'd4-break', level: 2, content: 'break and continue' },
      { type: 'code', id: 'd4-bc-code', lang: 'java', title: 'break vs continue', code: '// break: EXITS the loop\nfor (int i=1; i<=10; i++) { if (i==5) break; System.out.print(i+" "); }\n// 1 2 3 4\n\n// continue: SKIPS this iteration\nfor (int i=1; i<=10; i++) { if (i%2==0) continue; System.out.print(i+" "); }\n// 1 3 5 7 9\n\n// Labeled break\nouter: for (int i=1; i<=3; i++)\n    for (int j=1; j<=3; j++)\n        if (i==2 && j==2) break outer; // exits both loops' },
      // Factorial
      { type: 'heading', id: 'd4-fact', level: 2, content: 'Lab: Factorial — All Three Ways' },
      { type: 'code', id: 'd4-fact-code', lang: 'java', title: 'Factorial (for, while, do-while)', code: 'int n=5, f1=1, f2=1, f3=1;\n// for\nfor (int i=1; i<=n; i++) f1 *= i;\n// while\nint j=1; while (j<=n) { f2 *= j; j++; }\n// do-while\nint k=1; if (n>0) do { f3 *= k; k++; } while (k<=n);' },
      // Doubt Clinics
      { type: 'callout', id: 'd4-d1', calloutType: 'doubt', title: 'When should I use while vs for?', content: '**Decision framework**:\n- Know the exact count? → `for` (e.g., array iteration, print 1-10)\n- Unknown count (reading until "quit")? → `while`\n- Must execute at least once (menu)? → `do-while`\nAny loop can be rewritten as any other — choose for clarity.' },
      { type: 'callout', id: 'd4-d2', calloutType: 'doubt', title: 'How do I avoid infinite loops?', content: 'Checklist before running:\n1. Is the **condition** eventually going to become false?\n2. Is the **update step** actually changing the variable?\n3. For while: is there an **increment/decrement** inside the body?\nCommon mistake: `int i=0; while(i<10) { print(i); }` — forgot `i++`!\nUse **Ctrl+C** to kill a runaway program.' },
      { type: 'callout', id: 'd4-d3', calloutType: 'doubt', title: 'Can I nest loops as deep as I want?', content: 'Yes, but each nesting level **multiplies** complexity. Two nested loops = O(n²). Three nested = O(n³). For CS students: if you find yourself at 4+ levels, there is almost certainly a better algorithm. The practical limit for readable code is 3 levels.' },
      // Exam Alert
      { type: 'callout', id: 'd4-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **do-while is the ONLY exit-controlled loop** — memorize this.\n2. **break EXITS the loop, continue SKIPS one iteration.**\n3. **For-loop scope**: Variable declared in for header is only accessible inside the loop.\n4. **Factorial/Sum of digits**: Guaranteed CE-1 coding question — practice until muscle memory.' },
      // Bridge
      { type: 'callout', id: 'd4-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Nested loops (today) are essential for **2D arrays and matrix operations (Day 11)**. break/continue logic is used in switch (Day 3). Loop patterns appear in every algorithm you will study in DSA.' },
      // Quick Ref
      { type: 'table', id: 'd4-qref', headers: ['Concept', 'Key Point'], rows: [['for', 'for(init;cond;update){body} — known count'], ['while', 'while(cond){body} — unknown count'], ['do-while', 'do{body}while(cond); — runs at least once'], ['break', 'Exits the INNERMOST loop (or labeled loop)'], ['continue', 'Skips rest of CURRENT iteration'], ['Entry vs Exit', 'for/while=entry. do-while=exit (MCQ!)']] },
      // Quiz
      { type: 'quiz', id: 'd4-quiz', title: 'Day 4 Quiz',
        questions: [
          { id: 'd4-q1', question: 'Which loop guarantees at least one execution?', options: ['for', 'while', 'do-while', 'All of them'], correctIndex: 2, explanation: 'do-while checks condition AFTER the body, so the body always executes at least once regardless of the condition.' },
          { id: 'd4-q2', question: 'What does `break` do inside a loop?', options: ['Skips to next iteration', 'Exits the loop entirely', 'Restarts the loop', 'Pauses the loop'], correctIndex: 1, explanation: 'break immediately exits the loop. Execution continues at the first statement after the loop body.' },
          { id: 'd4-q3', question: 'What is the scope of `int i` declared in `for(int i=0; i<10; i++)`?', options: ['Entire class', 'Entire method', 'Only inside the loop body', 'Inside loop and after'], correctIndex: 2, explanation: 'A variable declared in the for-loop header is only accessible inside the loop. It is destroyed when the loop ends.' },
          { id: 'd4-q4', question: 'What happens when `while(true)` runs without a break?', options: ['Compile error', 'Single iteration', 'Infinite loop', 'Nothing — it skips'], correctIndex: 2, explanation: 'The condition is always true, so the loop never stops. This creates an infinite loop. Use Ctrl+C to stop it.' },
        ],
      },
      // Flashcards
      { type: 'flashcard', id: 'd4-cards', title: 'Day 4 Flashcards',
        cards: [
          { id: 'd4-f1', front: 'For loop syntax?', back: 'for(initialization; condition; update) { body }. All three parts are optional. for(;;) is an infinite loop.', hint: 'Three parts in parentheses...' },
          { id: 'd4-f2', front: 'While vs do-while: key difference?', back: 'while checks condition BEFORE body (entry-controlled). do-while checks AFTER body (exit-controlled, always runs at least once).', hint: 'When is the condition checked...' },
          { id: 'd4-f3', front: 'break vs continue?', back: 'break = EXIT the loop entirely. continue = SKIP the rest of current iteration, go to next iteration. Both only affect the innermost loop (unless labeled).', hint: 'Exit vs skip...' },
          { id: 'd4-f4', front: 'What causes an infinite loop?', back: 'A condition that never becomes false. Examples: while(true), for(;;), or forgetting the update step (i++).', hint: 'The condition never changes...' },
        ],
      },
      { type: 'practice', id: 'd4-p1', lang: 'java', title: 'Practice: Sum of Digits', starter: 'public class SumDigits {\n    public static void main(String[] args) {\n        int number = 9876; // try: 123 → 6\n        // TODO: with while loop\n        // Extract: n%10, Remove: n/10\n    }\n}', hint: 'sum=0. while(n>0): sum += n%10; n/=10. Answer for 9876 is 30.' },
      { type: 'practice', id: 'd4-p2', lang: 'java', title: 'Practice: GCD (Euclidean Algorithm)', starter: 'import java.util.Scanner;\npublic class GCD {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a=48, b=18;\n        // TODO: while(b!=0): temp=b; b=a%b; a=temp;\n        System.out.println("GCD: " + a);\n        sc.close();\n    }\n}', hint: 'Euclidean: while(b != 0) { int t = b; b = a % b; a = t; }. GCD of 48 and 18 is 6.' },
    ],
    tasks: [
      { id: 'java-14-d4-t1', text: 'Factorial using for, while, AND do-while. Compare all three.', tag: 'lab' },
      { id: 'java-14-d4-t2', text: 'Sum of digits using while loop (e.g., 123→6).', tag: 'lab' },
      { id: 'java-14-d4-t3', text: 'Multiplication table (1-10) using for loop.', tag: 'lab' },
      { id: 'java-14-d4-t4', text: 'Sentinel-controlled while: sum positive numbers, stop on negative.', tag: 'drill' },
      { id: 'java-14-d4-t5', text: 'Which loop guarantees at least one execution? Why?', tag: 'mcq' },
    ],
  },
];
