import type { Day } from '../../../types';

export const phase1days: Day[] = [
  // ======== DAY 1: Environment & Basic Structure ========
  {
    id: 'java-14-d1', number: 1, title: 'Environment & Basic Structure', duration: 120,
    topics: ['JDK / JRE Setup', 'Hello World', 'JVM', 'Platform Independence'],
    alignment: ['Codecademy: Hello World', 'CodeGym: Commands in Java'],
    blocks: [
      { type: 'callout', id: 'd1-intro', calloutType: 'info', title: 'What You Will Learn Today', content: 'By the end of Day 1 you will: install the JDK, write your first Java program, and run it from the terminal. You will also learn **why** Java can run the same file on Windows, Mac, and Linux without changes — and the three pieces (JDK, JRE, JVM) that make it possible.' },
      { type: 'heading', id: 'd1-jdk', level: 2, content: 'The JDK / JRE / JVM Trio' },
      { type: 'paragraph', id: 'd1-jdk-p', content: 'This is the single most common confusion point. Let us settle it now.' },
      { type: 'table', id: 'd1-trio', headers: ['Component', 'Stands For', 'What It Does', 'Who Needs It'], rows: [['**JVM**', 'Java Virtual Machine', 'The program that actually runs your code. It reads the `.class` file, manages memory, and cleans up objects you no longer use (garbage collection).', 'End users'], ['**JRE**', 'Java Runtime Environment', 'JVM + the standard libraries. Everything you need to **run** a Java program — nothing more.', 'Anyone running Java apps'], ['**JDK**', 'Java Development Kit', 'JRE + the tools you use to write code: `javac` (compiler), `jar` (packager), `jdb` (debugger).', 'Developers — you!']] },
      { type: 'callout', id: 'd1-analogy', calloutType: 'tip', title: 'Kitchen Analogy', content: '**JVM** = the stove (it cooks). **JRE** = the kitchen (stove + pots, enough to cook). **JDK** = the full restaurant (kitchen + recipe books + measuring tools — everything to create new dishes).' },
      { type: 'heading', id: 'd1-platform', level: 2, content: 'Platform Independence — Write Once, Run Anywhere' },
      { type: 'paragraph', id: 'd1-wora', content: 'When you compile a Java file, you do not get a program your computer can run directly. You get a `.class` file — a list of instructions written for the JVM (this list is called **bytecode**). The JVM on Windows, Mac, and Linux can all read the **same** `.class` file. Each one turns it into instructions its own OS understands. That is why you can copy a `.class` file from a Windows laptop to a Linux server and run it without recompiling.' },
      { type: 'code', id: 'd1-flow', lang: 'text', title: 'Compilation Flow', code: 'HelloWorld.java ──javac──▶ HelloWorld.class ──java──▶ Output' },
      { type: 'callout', id: 'd1-exam-q', calloutType: 'warn', title: 'Common Exam Question', content: '**Q: Is Java compiled or interpreted?**\nA: **Both.** `javac` compiles your `.java` file into a `.class` file (bytecode). Then the JVM reads that `.class` file and runs it. As it runs, the JVM also uses the JIT compiler to turn the most-used parts of your code into faster machine code on the fly — that is why Java stays fast on long-running programs.' },
      { type: 'heading', id: 'd1-hello', level: 2, content: 'Your First Java Program' },
      { type: 'code', id: 'd1-hello-code', lang: 'java', title: 'HelloWorld.java', code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
      { type: 'list', id: 'd1-breakdown', listStyle: 'number', items: ['`public class HelloWorld {` — declares a class called `HelloWorld`. The file **must** be named `HelloWorld.java` (capital H, capital W — exact match). `public` means anyone can use this class.', '`public static void main(String[] args)` — this is **where every Java program starts running**. Each word has a job, explained in the next callout.', '`System.out.println(...)` — `System` is a built-in class. `out` is a field inside it (the standard output stream). `println` prints the text and moves to a new line. The semicolon `;` ends the statement.', '`}` — closes the method and then the class. Every `{` you open must have a matching `}` to close it.'] },
      { type: 'code', id: 'd1-commands', lang: 'bash', title: 'Terminal', code: 'javac HelloWorld.java   # compile — creates HelloWorld.class\njava HelloWorld          # run — no .class on the command!' },
      { type: 'callout', id: 'd1-errors', calloutType: 'warn', title: 'Common Errors', content: '1. **`javac` not recognized** → JDK is not installed (or its `bin` folder is not on your PATH). Reinstall JDK and restart the terminal.\n2. **Could not find main class HelloWorld** → you typed `java HelloWorld.class`. Drop the `.class` — the JVM adds it for you.\n3. **Class HelloWorld is public, must be declared in a file named HelloWorld.java** → the file name and the `class` name must match exactly, including capital letters.' },
      { type: 'heading', id: 'd1-jvm-deep', level: 2, content: 'JVM Memory Areas' },
      { type: 'table', id: 'd1-memory', headers: ['Area', 'What Lives There', 'Key Fact'], rows: [['**Heap**', 'Objects (anything you make with `new`) and instance variables', 'Garbage collected — the JVM cleans up objects you no longer reference. Shared by every thread.'], ['**Stack**', 'Local variables and method call frames', 'One per thread. Cleared automatically when a method returns.'], ['**Method Area**', 'Class metadata and static variables', 'Loaded once per class, shared by every thread.']] },
      { type: 'callout', id: 'd1-jit', calloutType: 'tip', title: 'JIT Compiler', content: 'Some parts of your program run thousands of times. While running, the JVM watches for those "hot spots" and quietly compiles them into fast machine code the OS can run directly. The first few runs are slower; the loop gets fast on its own. This is why Java can keep up with C++ on long-running programs.' },
      // Doubt Clinics
      { type: 'callout', id: 'd1-doubt-1', calloutType: 'doubt', title: "Why can't I double-click a .class file?", content: 'A `.class` file is **bytecode** — instructions for the JVM, not for your operating system. Your OS does not know what to do with bytecode. Only the JVM does. So you have to run it with `java ClassName` from the terminal, and `java` (the JVM launcher) asks the JVM to run it for you.' },
      { type: 'callout', id: 'd1-doubt-2', calloutType: 'doubt', title: 'JDK 17 vs JDK 21 — which should I install?', content: 'Both are **LTS** (Long-Term Support) versions — Oracle commits to updating them for years. JDK 21 is newer and has more features. Your university syllabus works on **JDK 17 or higher**. Install JDK 21 for the latest, JDK 17 if your lab machines have it. Skip JDK 8 unless your syllabus specifically says you need it.' },
      { type: 'callout', id: 'd1-doubt-3', calloutType: 'doubt', title: 'Do I need JAVA_HOME on every OS?', content: 'Two variables matter:\n\n- **`PATH`** — lets you type `javac` and `java` from any folder. You almost always need this.\n- **`JAVA_HOME`** — points to your JDK folder. Some tools (Maven, Hadoop, IntelliJ) read it to find Java. You usually set this on **Windows** (System Environment Variables). On **macOS** with Homebrew, it is set automatically. On **Linux**, add `export JAVA_HOME=/usr/lib/jvm/java-21-openjdk` to `~/.bashrc`.' },
      // Exam Alert
      { type: 'callout', id: 'd1-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Every word in `main` is tested**: `public`, `static`, `void`, `main`, `String[] args`. Know what each one does.\n2. **JDK > JRE > JVM** — guaranteed 1-mark MCQ. JDK contains JRE, JRE contains JVM.\n3. **Platform independence answer**: ALWAYS say "bytecode + JVM", never "Java compiles to native code."\n4. **Filename rule**: `public class Foo` MUST be in `Foo.java` — exact match, case included.' },
      // Bridge
      { type: 'callout', id: 'd1-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Heap vs Stack (today) matters on **Day 7** when you start creating objects — you will see that `new` puts things on the Heap, and local variables in methods live on the Stack. `public static void main` is the foundation of every program you will ever write. Garbage collection (GC) gets revisited in Advanced Java.' },
      // Quick Reference
      { type: 'table', id: 'd1-quickref', headers: ['Command', 'Description'], rows: [['`javac X.java`', 'Compile a file into a `.class` (bytecode)'], ['`java X`', 'Run the program (drop the `.class` extension!)'], ['`javadoc X.java`', 'Generate HTML documentation from comments'], ['`jar cvf a.jar *.class`', 'Package your classes into a JAR archive'], ['`java -version`', 'Show the Java version you have installed']] },
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
      { type: 'practice', id: 'd1-p2', lang: 'java', title: 'Practice: Memory Demo', starter: 'public class MemoryDemo {\n    public static void main(String[] args) {\n        int age = 20;        // lives on the _____\n        String name = new String("Vinayak"); // object on the _____\n        System.out.println(name + " is " + age);\n    }\n}', hint: 'Primitives live on the stack. Objects created with new live on the heap.' },
      { type: 'practice', id: 'd1-p3', lang: 'bash', title: 'Practice: Terminal Commands', starter: '# Run each command in your terminal and write down what it prints.\n# Then answer the questions in comments.\n\n# 1. What Java version is installed?\njava -version\n\n# 2. What does the Java compiler say about itself?\njavac -version\n\n# 3. Where is Java installed? (Windows)\nwhere java\n\n# 4. Where is Java installed? (macOS / Linux)\n# which java\n\n# TODO: what is the difference between the version of `java` and `javac`?', hint: 'java -version prints the runtime (JVM + JRE). javac -version prints the compiler (JDK tool). They can differ if you have multiple JDKs installed.' },
      { type: 'practice', id: 'd1-p4', lang: 'java', title: 'Practice: Fix the Compile Errors', starter: 'public class FixMe {\n    public static void main(String[] args) {\n        System.out.println("I love Java")\n        System.out.println("Compiled and ran!");\n    }\n}', hint: 'The first println is missing a semicolon. Add it, compile with javac FixMe.java, then run java FixMe. Notice how the compiler tells you the exact line.' },
      { type: 'practice', id: 'd1-p5', lang: 'java', title: 'Practice: Print Patterns', starter: 'public class Patterns {\n    public static void main(String[] args) {\n        // TODO 1: print this EXACTLY (use multiple println calls):\n        //   *\n        //   **\n        //   ***\n\n        // TODO 2: print a box:\n        //   +------+\n        //   | Java |\n        //   +------+\n\n        // TODO 3: print your name in a "banner" with lines of = above and below\n    }\n}', hint: 'Each println prints one line. The box needs 3 lines: top border, the | Java | line, bottom border. Use System.out.println for each line.' },
      { type: 'practice', id: 'd1-p6', lang: 'java', title: 'Practice: Predict the Output', starter: 'public class Predict {\n    public static void main(String[] args) {\n        System.out.print("A");\n        System.out.println("B");\n        System.out.print("C");\n        System.out.print("D");\n    }\n}\n// TODO: write down what you expect the output to be (one line), then run it.\n// TODO: which calls put text on the SAME line? which start a NEW line?', hint: 'print() leaves the cursor on the same line; println() moves to the next. Expected output: "AB" then "CD" — so the whole output is AB followed by CD on the same line.' },
    ],
    tasks: [
      { id: 'java-14-d1-t1', text: 'Install JDK 21 and verify java -version and javac -version work.', tag: 'lab' },
      { id: 'java-14-d1-t2', text: 'Write, compile, and run HelloWorld.java from terminal (no IDE).', tag: 'lab' },
      { id: 'java-14-d1-t3', text: 'Explain: Why does Java not need recompilation when moving .class from Windows to Linux?', tag: 'review' },
      { id: 'java-14-d1-t4', text: 'Draw and label the JDK > JRE > JVM hierarchy.', tag: 'drill' },
      { id: 'java-14-d1-t5', text: 'Which stores objects — Heap or Stack?', tag: 'mcq' },
    ],
  },

  // ======== DAY 2: Data Types & Variables ========
  {
    id: 'java-14-d2', number: 2, title: 'Data Types & Variables', duration: 90,
    topics: ['Primitives', 'Variables', 'Casting', 'Assignment'],
    alignment: ['CodeGym: Types in Java', 'Codecademy: Variables'],
    blocks: [
      { type: 'callout', id: 'd2-intro', calloutType: 'info', title: 'The Building Blocks of Data', content: 'Every program stores and manipulates data. Today you will learn Java\'s **8 primitive types** — the basic "boxes" for storing different kinds of values. You will also learn how to create **variables** (named boxes), how to **cast** between types, and the integer division trap that catches every beginner.' },
      { type: 'heading', id: 'd2-prim', level: 2, content: 'The 8 Primitive Types' },
      { type: 'paragraph', id: 'd2-prim-p', content: 'Java has 8 primitive types. Think of them as different-sized boxes. A `byte` is a tiny box. An `int` is a medium box. A `double` is for decimals. For your first few weeks, you mostly need just 4: **int** (whole numbers), **double** (decimals), **char** (single letters), and **boolean** (true/false).' },
      { type: 'table', id: 'd2-prim-table', headers: ['Type', 'Size', 'Range', 'Example', 'Note'], rows: [['byte', '1 byte', '-128 to 127', 'byte b=100;', 'Rare'], ['short', '2 bytes', '±32,767', 'short s=30000;', 'Rare'], ['int', '4 bytes', 'about ±2.1 billion', 'int age=21;', 'Default for whole numbers — use this!'], ['long', '8 bytes', 'huge', 'long pop=8_000_000_000L;', 'Must end with L'], ['float', '4 bytes', 'about 6-7 digits', 'float pi=3.14f;', 'Must end with f'], ['double', '8 bytes', 'about 15 digits', 'double e=2.718;', 'Default for decimals — use this!'], ['char', '2 bytes', 'Unicode (one character)', "char grade='A';", 'Single quotes'], ['boolean', '~1 byte', 'true/false', 'boolean flag=true;', 'Only two values']] },
      { type: 'heading', id: 'd2-vars', level: 2, content: 'Variables — Named Boxes' },
      { type: 'code', id: 'd2-var-code', lang: 'java', title: 'Variable Patterns', code: '// Pattern: type name = value;\nint age = 21;          // a box called "age" holding the number 21\ndouble gpa = 8.75;     // a box called "gpa" holding the decimal 8.75\nchar section = \'A\';    // a box called "section" holding the letter A\nboolean passed = true; // a box called "passed" holding true\n\n// Declare first, assign later\nString name;\nname = "Vinayak";\n\n// final = constant — the value can never change\nfinal double PI = 3.14159;\n// PI = 3.14; // COMPILE ERROR! Final means final.' },
      { type: 'callout', id: 'd2-default', calloutType: 'warn', title: 'Default Values — A CE-1 Favorite', content: 'A variable is just a labelled box. If you forget to put something in it, what is inside?\n\n- **Instance variables** (declared in a class, outside methods) → Java fills the box for you: `0`, `false`, or `null`.\n- **Local variables** (declared inside a method) → Java does **not** fill the box. You must put something in before you read it, or the compiler will refuse to build your program.\n\nThis distinction shows up in every CE-1 exam.' },
      { type: 'heading', id: 'd2-cast', level: 2, content: 'Type Casting — Moving Between Box Sizes' },
      { type: 'table', id: 'd2-cast-table', headers: ['Type', 'Direction', 'Automatic?', 'Data Loss?', 'Example'], rows: [['Widening', 'Smaller box → bigger box', 'Yes — Java does it for you', 'No', 'int → long / double'], ['Narrowing', 'Bigger box → smaller box', 'No — you must write a cast', 'Possible!', 'double → int: `(int)3.99` becomes `3`']] },
      { type: 'code', id: 'd2-cast-code', lang: 'java', title: 'Casting Examples', code: '// Widening (automatic — small to big)\nint i = 10;\nlong l = i;    // OK, int fits inside long\ndouble d = i;  // OK, 10 becomes 10.0\n\n// Narrowing (explicit — big to small)\ndouble price = 3.99;\nint rupees = (int) price;  // 3 (the .99 is dropped, not rounded!)\n\n// char ↔ int (characters are really numbers under the hood)\nchar c = \'A\';\nint ascii = c;           // 65 (the ASCII code for A)\nchar next = (char)(c+1); // \'B\'' },
      { type: 'heading', id: 'd2-int-div', level: 2, content: 'Integer Division — The #1 Beginner Trap' },
      { type: 'code', id: 'd2-int-div-code', lang: 'java', title: 'Why 5/2 = 2 in Java', code: '// When BOTH sides of division are integers:\nint x = 5 / 2;     // x = 2 (NOT 2.5!)\nint y = 10 / 3;    // y = 3 (NOT 3.33!)\n\n// Java throws away the fraction. This is integer division.\n\n// To get a decimal result: make at least one side a double\ndouble a = 5.0 / 2;   // 2.5\ndouble b = 5 / 2.0;   // 2.5\ndouble c = 5.0 / 2.0; // 2.5\n\n// This matters in real code:\ndouble avg = total / count; // integer division if both are int!\ndouble avg = (double) total / count; // safe' },
      { type: 'callout', id: 'd2-int-div-warn', calloutType: 'warn', title: 'Guaranteed CE-1 Trick Question', content: '`int / int = int` — Java silently truncates. No warning, no crash, just the wrong answer. Always check: are both sides whole numbers? If yes, the result will also be a whole number. Use `5.0 / 2` or cast one side to double to get a decimal.' },
      // Doubt Clinics
      { type: 'callout', id: 'd2-d1', calloutType: 'doubt', title: 'When should I use float vs double?', content: '**Always use `double`.** `double` gives you ~15 digits of precision, `float` gives only ~7. For university work, `double` is the safe default.' },
      { type: 'callout', id: 'd2-d2', calloutType: 'doubt', title: 'What happens if I assign a long to an int?', content: 'The compiler will refuse — "incompatible types: possible lossy conversion". You must write the cast yourself: `int x = (int) myLong;`. If the value is bigger than int can hold, you silently get a wrong number. Always check first.' },
      { type: 'callout', id: 'd2-d3', calloutType: 'doubt', title: 'Is String a primitive type?', content: '**No.** String is a **class**, not a primitive. Notice the capital S — that is the clue it is a class. Primitives start with lowercase: `int`, `double`, `char`, `boolean`. You create a String with quotes: `String name = "Vinayak";`, but under the hood it is a full object. You will learn more about Strings on Day 6.' },
      // Exam Alert
      { type: 'callout', id: 'd2-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Integer division**: `5 / 2 = 2` (not 2.5) — guaranteed trick question.\n2. **All 8 primitive types and sizes**: memorize byte(1), short(2), int(4), long(8), float(4), double(8), char(2), boolean.\n3. **Default values for local vs instance variables**: MCQ favorite. Locals MUST be initialized.\n4. **Narrowing requires explicit cast**: `(int) 3.99 = 3` (truncates, does NOT round).' },
      // Bridge
      { type: 'callout', id: 'd2-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Variables and types become second nature very quickly. Tomorrow (Day 3) you will learn `Scanner` — how to ask the user for values and store them in these variables. Casting matters again on Day 6 (parameter passing) and Day 10 (polymorphism).' },
      // Quick Ref
      { type: 'table', id: 'd2-qref', headers: ['Concept', 'Key Point'], rows: [['8 primitives', 'byte(1), short(2), int(4), long(8), float(4), double(8), char(2), boolean'], ['You need 4', 'int, double, char, boolean handle 90% of cases'], ['Variable', 'type name = value;  →  int age = 21;'], ['Integer division', 'int / int = int (truncated). Use double for decimals.'], ['Widening', 'Small→big: automatic. No cast needed.'], ['Narrowing', 'Big→small: MUST cast. (int)3.99 = 3 (truncates).']] },
      // Quiz
      { type: 'quiz', id: 'd2-quiz', title: 'Day 2 Quiz',
        questions: [
          { id: 'd2-q1', question: 'What is the value of `5 / 2` in Java?', options: ['2.5', '2', '2.0', 'Compile error'], correctIndex: 1, explanation: 'Both operands are int, so integer division occurs. Result is 2 (truncated). Use 5.0/2 for 2.5.' },
          { id: 'd2-q2', question: 'Which of these requires an explicit cast?', options: ['int→long', 'byte→int', 'double→int', 'char→int'], correctIndex: 2, explanation: 'double→int is narrowing (loses fractional part). All others are widening conversions — automatic.' },
          { id: 'd2-q3', question: 'Which 4 primitives cover 90% of use cases?', options: ['byte, short, long, float', 'int, double, char, boolean', 'int, float, boolean, byte', 'double, long, short, char'], correctIndex: 1, explanation: 'int (whole numbers), double (decimals), char (single letters), boolean (true/false) cover most cases.' },
          { id: 'd2-q4', question: 'Which primitive type is the default for decimal numbers in Java?', options: ['float', 'double', 'decimal', 'long'], correctIndex: 1, explanation: 'double is the default. float literals must end with \'f\': `3.14f`.' },
        ],
      },
      // Flashcards
      { type: 'flashcard', id: 'd2-cards', title: 'Day 2 Flashcards',
        cards: [
          { id: 'd2-f1', front: 'Name all 8 primitive types with sizes.', back: 'byte(1B), short(2B), int(4B), long(8B), float(4B), double(8B), char(2B), boolean(JVM-dependent).', hint: 'Byte, short, int, long, float, double, char, boolean...' },
          { id: 'd2-f2', front: 'What is the integer division trap?', back: 'int/int = int (truncated). 5/2 = 2, not 2.5. Use 5.0/2 or cast one operand to double to get decimal result.', hint: 'Both integers → integer result...' },
          { id: 'd2-f3', front: 'Widening vs narrowing casting?', back: 'Widening = small→big (int→long): automatic, no data loss. Narrowing = big→small (double→int): explicit (int) cast required, data loss possible.', hint: 'Small-to-big vs big-to-small...' },
          { id: 'd2-f4', front: 'Default values: instance vs local variables?', back: 'Instance variables: 0/false/null (auto). Local variables: NO default — must initialize or compile error. CE-1 favorite.', hint: 'Fields get defaults, method variables do not...' },
          { id: 'd2-f5', front: 'What is a variable in simple terms?', back: 'A named box. type name = value; — int age = 21; "age" is the name, "int" is the type of box, "21" is what is inside.', hint: 'Named box...' },
        ],
      },
      { type: 'practice', id: 'd2-p1', lang: 'java', title: 'Practice: Type Explorer', starter: 'public class TypeExplorer {\n    public static void main(String[] args) {\n        // TODO: Declare all 8 primitive types with values\n        // Print each with a descriptive label\n\n        // TODO: Try casting — declare a double, cast to int, print both\n\n        // TODO: Demonstrate integer division: print 5/2 and 5.0/2\n    }\n}', hint: 'int age=21; double price=99.50; char grade=\'A\'; boolean active=true;. Casting: double d=3.99; int i=(int)d; println both. Division: println(5/2); println(5.0/2);' },
      { type: 'practice', id: 'd2-p2', lang: 'java', title: 'Practice: Circle Calculator', starter: 'public class CircleCalc {\n    public static void main(String[] args) {\n        double radius = 5.0;\n        final double PI = 3.14159;\n        // TODO: Calculate area = PI * radius * radius\n        // TODO: Calculate circumference = 2 * PI * radius\n        // Print results. What if you used int for radius?\n    }\n}', hint: 'double area = PI * radius * radius; double circumference = 2 * PI * radius; println each. Try changing radius to int — still works because widening is automatic.' },
      { type: 'practice', id: 'd2-p3', lang: 'java', title: 'Practice: Fix the Casting', starter: 'public class FixCasting {\n    public static void main(String[] args) {\n        // Each line below has a problem. Fix it (do not remove the line).\n        double pi = 3.14159;\n        // int almostPi = pi;            // TODO: why does this not compile?\n        // long big = 100_000_000_000;   // TODO: is there a problem?\n        // float f = 2.5;                // TODO: what is wrong here?\n        // char c = "A";                 // TODO: char vs String\n        // boolean b = 1;                // TODO: Java is not C!\n        System.out.println("All fixed: " + pi);\n    }\n}', hint: 'Narrowing needs a cast: (int) pi. long literal needs L: 100_000_000_000L. float literal needs f: 2.5f. char uses single quotes: \'A\'. boolean only takes true/false.' },
      { type: 'practice', id: 'd2-p4', lang: 'java', title: 'Practice: Swap Two Numbers', starter: 'public class Swap {\n    public static void main(String[] args) {\n        int a = 5;\n        int b = 10;\n        System.out.println("Before: a = " + a + ", b = " + b);\n\n        // TODO 1: swap using a third variable (temp)\n        // TODO 2: swap WITHOUT a third variable (use + and -)\n        // TODO 3: swap using XOR (^) — the classic bit trick\n\n        System.out.println("After: a = " + a + ", b = " + b);\n    }\n}', hint: 'With temp: int t=a; a=b; b=t;. Without temp: a=a+b; b=a-b; a=a-b;. XOR: a=a^b; b=a^b; a=a^b;. All three should end with a=10, b=5.' },
      { type: 'practice', id: 'd2-p5', lang: 'java', title: 'Practice: Average Without the Trap', starter: 'public class Average {\n    public static void main(String[] args) {\n        int math = 85;\n        int physics = 92;\n        int chemistry = 78;\n\n        // TODO: compute the average of the three marks\n        // BUG: the line below is WRONG — integer division!\n        // double avg = (math + physics + chemistry) / 3;\n\n        // TODO: fix it two ways:\n        //   1. make the divisor a double (3.0)\n        //   2. cast the sum to double\n        // Print both results and explain in a comment which is correct.\n    }\n}', hint: 'Option 1: (math+physics+chemistry) / 3.0. Option 2: (double)(math+physics+chemistry) / 3. Expected: 85.0 — because 255/3 = 85 exactly, the trap hides here! Try marks 90, 95, 100 to see 95.0 vs 95.' },
      { type: 'practice', id: 'd2-p6', lang: 'java', title: 'Practice: char Detective', starter: 'public class CharDetective {\n    public static void main(String[] args) {\n        char letter = \'A\';\n\n        // TODO 1: print the char, then cast it to int — what number is A?\n        // TODO 2: add 1 to the char and print — what letter do you get?\n        // TODO 3: what is the int value of \'a\' (lowercase)? of \'0\' (zero)?\n        // TODO 4: convert lowercase \'m\' to uppercase using ONLY arithmetic\n        //         (hint: lowercase and uppercase letters are 32 apart)\n    }\n}', hint: 'A is 65, a is 97, \'0\' is 48. letter+1 = \'B\'. To uppercase: subtract 32 — (char)(\'m\' - 32) = \'M\'.' },
    ],
    tasks: [
      { id: 'java-14-d2-t1', text: 'Declare all 8 primitive types with values. Print each with a descriptive label using println.', tag: 'lab' },
      { id: 'java-14-d2-t2', text: 'Demonstrate integer division: print 5/2, then 5.0/2. Explain the difference in comments.', tag: 'drill' },
      { id: 'java-14-d2-t3', text: 'Demonstrate widening and narrowing: int→double (auto), double→int (cast). Print before and after.', tag: 'drill' },
      { id: 'java-14-d2-t4', text: 'What is (int) 3.99? What is (int) -3.99? Why?', tag: 'mcq' },
      { id: 'java-14-d2-t5', text: 'Swap two integers without a third variable (use addition and subtraction).', tag: 'bonus' },
    ],
  },

  // ======== DAY 3: Scanner — Talking to Your User ========
  {
    id: 'java-14-d3-scan', number: 3, title: 'Scanner — Input & Interaction', duration: 90,
    topics: ['Scanner', 'nextLine/nextInt/nextDouble', 'Input Buffer', 'printf'],
    alignment: ['CodeGym: Keyboard input', 'Codecademy: Input'],
    blocks: [
      { type: 'callout', id: 'd3-scan-intro', calloutType: 'info', title: 'Making Programs Interactive', content: 'Yesterday you learned how to store data in variables. Today: how to **ask the user** for that data. `Scanner` reads what the user types. By the end you will write programs that actually interact with a real person.' },
      { type: 'heading', id: 'd3-scan-setup', level: 2, content: 'The 3-Step Scanner Pattern' },
      { type: 'code', id: 'd3-scan-code', lang: 'java', title: 'Scanner Setup', code: '// STEP 1: Import at the top of your file\nimport java.util.Scanner;\n\npublic class MyProgram {\n    public static void main(String[] args) {\n        // STEP 2: Create ONE Scanner (name it anything — "sc" is common)\n        Scanner sc = new Scanner(System.in);\n\n        // STEP 3: Ask questions, read answers\n        System.out.print("What is your name? ");\n        String name = sc.nextLine();  // reads a line of text\n\n        System.out.print("How old are you? ");\n        int age = sc.nextInt();       // reads a whole number\n\n        System.out.println("Hello " + name + ", you are " + age + ".");\n\n        sc.close(); // STEP 4 (optional): close when done\n    }\n}' },
      { type: 'table', id: 'd3-scan-methods', headers: ['Method', 'What It Reads', 'Stops At', 'User types', 'You get'], rows: [['nextLine()', 'Entire line (with spaces)', 'Enter key', '"Vinayak Kumar"', '"Vinayak Kumar"'], ['next()', 'One word (no spaces)', 'Space or Enter', '"Vinayak Kumar"', '"Vinayak"'], ['nextInt()', 'A whole number', 'Space or Enter', '"21"', '21'], ['nextDouble()', 'A decimal number', 'Space or Enter', '"8.75"', '8.75']] },
      { type: 'heading', id: 'd3-scan-trap', level: 2, content: 'The Scanner Newline Trap ⚠️' },
      { type: 'paragraph', id: 'd3-scan-trap-p', content: 'When you type a number and hit Enter, Scanner reads the number but **leaves the Enter key behind**. If your next step is `nextLine()`, it eats that leftover Enter instead of your real input. This is the #1 beginner mistake.' },
      { type: 'code', id: 'd3-scan-trap-code', lang: 'java', title: 'The Trap — And The Fix', code: '// ❌ BROKEN: nextLine() skips your input\nSystem.out.print("Age: ");\nint age = sc.nextInt();\nSystem.out.print("Name: ");\nString name = sc.nextLine();  // reads the leftover Enter, NOT your name!\nSystem.out.println(name);     // prints "" (empty!) — name is blank\n\n// ✅ FIXED: add a dummy nextLine() after every numeric input\nSystem.out.print("Age: ");\nint age = sc.nextInt();\nsc.nextLine();                // 👈 swallows the leftover Enter key\nSystem.out.print("Name: ");\nString name = sc.nextLine();  // now reads your actual name\nSystem.out.println(name);     // prints "Vinayak" — works!' },
      { type: 'callout', id: 'd3-scan-trap-visual', calloutType: 'doubt', title: 'Visual Explanation', content: 'Picture the input buffer as a queue of characters:\n\n```\nUser types: "42 [Enter] Vinayak [Enter]"\nBuffer:     42 \\n V i n a y \\n\n```\n\n1. `nextInt()` reads `42` and stops. The `\\n` is still waiting.\n2. `nextLine()` reads **up to the next `\\n`** — which is the leftover `\\n`. Returns `""`.\n3. "Vinayak" sits unread!\n\n**Fix**: add `sc.nextLine()` after `nextInt()` to eat the `\\n`. Now "Vinayak" is next.' },
      { type: 'heading', id: 'd3-scan-printf', level: 2, content: 'printf — Formatted Output' },
      { type: 'code', id: 'd3-scan-printf-code', lang: 'java', title: 'printf Basics', code: 'double gpa = 8.753;\nString name = "Vinayak";\nint age = 21;\n\nSystem.out.printf("%s is %d years old.%n", name, age);\n// Vinayak is 21 years old.\n\nSystem.out.printf("GPA: %.2f%n", gpa);\n// GPA: 8.75\n\n// Format specifiers:\n// %s = string    %d = int    %f = double\n// %.2f = 2 decimal places    %.1f = 1 decimal place\n// %n = newline (use this instead of \\n)' },
      { type: 'callout', id: 'd3-scan-print-vs', calloutType: 'tip', title: 'print vs println vs printf', content: '- `print()` — no newline after (cursor stays). Good for prompts.\n- `println()` — newline after (cursor moves down). Good for output.\n- `printf()` — same as print but lets you format. No newline unless you add `%n`.' },
      // Doubt Clinics
      { type: 'callout', id: 'd3-scan-d1', calloutType: 'doubt', title: 'Do I really need to close the Scanner?', content: 'For simple programs that run once and exit — technically no. But it is good practice and IDEs will warn you. Just add `sc.close()` at the very end of your `main` method.' },
      { type: 'callout', id: 'd3-scan-d2', calloutType: 'doubt', title: 'What if the user types letters when I ask for a number?', content: 'Your program will crash with `InputMismatchException`. Handling this requires `try-catch` which you will learn on Day 12. For now, trust that the user types numbers when asked.' },
      // Exam Alert
      { type: 'callout', id: 'd3-scan-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Scanner newline trap** — guaranteed CE-1 coding question. After `nextInt()`/`nextDouble()`, always add `sc.nextLine()`.\n2. **`next()` vs `nextLine()`**: `next()` reads one word, `nextLine()` reads the whole line.\n3. **printf specifiers**: `%s` (string), `%d` (int), `%.2f` (2-decimal double), `%n` (newline).\n4. **`import java.util.Scanner;`** is mandatory — forgetting it is a compile error.' },
      // Bridge
      { type: 'callout', id: 'd3-scan-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'You will use `Scanner` in **every lab task** going forward. The newline trap is the single most common beginner bug — memorize the fix now. Tomorrow (Day 4: Decision Making), you will use `if-else` to make programs that choose different paths.' },
      // Quick Ref
      { type: 'table', id: 'd3-scan-qref', headers: ['Concept', 'Key Point'], rows: [['Scanner setup', 'import java.util.Scanner; → new Scanner(System.in) → sc.close()'], ['nextLine()', 'Reads entire line with spaces. Use for names, sentences.'], ['nextInt/nextDouble', 'Reads numbers. Leaves Enter in buffer — clear with extra nextLine()!'], ['Newline trap fix', 'After nextInt/nextDouble, add sc.nextLine() before next text read.'], ['printf', '%s=string, %d=int, %.2f=2-decimal, %n=newline.']] },
      // Quiz
      { type: 'quiz', id: 'd3-scan-quiz', title: 'Day 3 Quiz',
        questions: [
          { id: 'd3-scan-q1', question: 'What happens if you call nextLine() right after nextInt() without clearing?', options: ['Program crashes', 'nextLine() returns an empty string', 'nextLine() reads the same integer', 'Nothing — works fine'], correctIndex: 1, explanation: 'nextInt() leaves \\n in the buffer. nextLine() eats it and returns "". Add sc.nextLine() after nextInt().' },
          { id: 'd3-scan-q2', question: 'What does printf("%.2f", 3.14159) print?', options: ['3.14159', '3.14', '3.1', '3'], correctIndex: 1, explanation: '%.2f rounds to 2 decimal places. %.1f would give 3.1.' },
          { id: 'd3-scan-q3', question: 'Which method should you use to read "Vinayak Kumar" (first and last name)?', options: ['next()', 'nextLine()', 'nextInt()', 'nextWord()'], correctIndex: 1, explanation: 'next() stops at the first space. nextLine() reads the whole line including spaces.' },
          { id: 'd3-scan-q4', question: 'What must you ALWAYS write at the top to use Scanner?', options: ['import java.util.Scanner;', 'import java.Scanner;', 'include Scanner;', 'Nothing — built in'], correctIndex: 0, explanation: 'Scanner is in java.util package. You must import it. String and Math are built-in — no import needed.' },
        ],
      },
      // Flashcards
      { type: 'flashcard', id: 'd3-scan-cards', title: 'Day 3 Flashcards',
        cards: [
          { id: 'd3-scan-f1', front: 'Scanner 3-step setup?', back: '1. import java.util.Scanner; (top). 2. Scanner sc = new Scanner(System.in); (in main). 3. Read with sc.nextLine(), sc.nextInt(), etc. 4. sc.close(); (end).', hint: 'Import, create, use, close...' },
          { id: 'd3-scan-f2', front: 'Scanner newline trap fix?', back: 'After nextInt()/nextDouble(), add an extra sc.nextLine() to consume the leftover \\n before your next text input.', hint: 'Extra nextLine() after numbers...' },
          { id: 'd3-scan-f3', front: 'printf format specifiers?', back: '%s=string, %d=int, %f=double, %.2f=2 decimals, %n=newline. printf does not add a newline automatically.', hint: 's, d, f with modifiers...' },
          { id: 'd3-scan-f4', front: 'next() vs nextLine()?', back: 'next() = one word (stops at space). nextLine() = whole line (stops at Enter). Use nextLine() for names, addresses, full sentences.', hint: 'Word vs line...' },
        ],
      },
      { type: 'practice', id: 'd3-scan-p1', lang: 'java', title: 'Practice: Student Info Form', starter: 'import java.util.Scanner;\n\npublic class StudentInfo {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        // TODO: Ask name, age, gpa, branch\n        // Remember: sc.nextLine() after nextInt/nextDouble!\n        // Print everything neatly with printf\n\n        sc.close();\n    }\n}', hint: 'Order: name (nextLine), age (nextInt + nextLine), gpa (nextDouble + nextLine), branch (nextLine). Print: printf("Name: %s%nAge: %d%nGPA: %.2f%nBranch: %s%n", name, age, gpa, branch).' },
      { type: 'practice', id: 'd3-scan-p2', lang: 'java', title: 'Practice: Temperature Converter', starter: 'import java.util.Scanner;\n\npublic class TempConvert {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.print("Celsius: ");\n        double celsius = sc.nextDouble();\n\n        // TODO: F = (C * 9.0/5.0) + 32. Print with 1 decimal\n        // Use 9.0/5.0 (not 9/5) to avoid integer division!\n\n        sc.close();\n    }\n}', hint: 'double f = (celsius * 9.0 / 5.0) + 32; System.out.printf("%.1f C = %.1f F%n", celsius, f);' },
      { type: 'practice', id: 'd3-scan-p3', lang: 'java', title: 'Practice: See the Newline Trap', starter: 'import java.util.Scanner;\n\npublic class NewlineTrap {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        // STEP 1: run this EXACT code. What does it print for the name?\n        System.out.print("Age: ");\n        int age = sc.nextInt();\n        System.out.print("Name: ");\n        String name = sc.nextLine();\n        System.out.println("Age=" + age + ", Name=[" + name + "]");\n\n        // STEP 2: fix it with one extra sc.nextLine() after nextInt().\n        // STEP 3: in a comment, explain WHY the first version fails.\n\n        sc.close();\n    }\n}', hint: 'STEP 2: insert sc.nextLine(); right after nextInt() and before the nextLine() that reads the name. STEP 3: nextInt() leaves the \\n in the buffer, so nextLine() eats the leftover newline and returns "".' },
      { type: 'practice', id: 'd3-scan-p4', lang: 'java', title: 'Practice: printf Formatter', starter: 'public class Formatter {\n    public static void main(String[] args) {\n        String name = "Vinayak";\n        int age = 21;\n        double gpa = 8.7531;\n        int marks = 92;\n\n        // TODO 1: "%s is %d years old" — print name and age\n        // TODO 2: print gpa with 2 decimals, then with 1 decimal\n        // TODO 3: print marks as a percentage: "92%" (use %% to print %)\n        // TODO 4: print a table row: | name | age | gpa |\n        //         use %-10s to LEFT-align text in a 10-wide column\n    }\n}', hint: 'printf("%s is %d years old%n", name, age); %.2f and %.1f for gpa. "92%%" prints 92%. Row: printf("| %-10s | %-4d | %.2f |%n", name, age, gpa);' },
      { type: 'practice', id: 'd3-scan-p5', lang: 'java', title: 'Practice: Word vs Line', starter: 'import java.util.Scanner;\n\npublic class WordVsLine {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        // TODO 1: ask for a full name, read it with next(), print it\n        //         what happens if you type "Vinayak Kumar"?\n\n        // TODO 2: ask again, read with nextLine(), print it\n        //         now what happens?\n\n        // TODO 3: ask for three words in ONE line, read all three\n        //         with next() three times — what do you get?\n\n        sc.close();\n    }\n}', hint: 'next() stops at the first space, so "Vinayak Kumar" becomes just "Vinayak". nextLine() grabs the whole line. Three next() calls on one line read three words: first, second, third.' },
      { type: 'practice', id: 'd3-scan-p6', lang: 'java', title: 'Practice: Bill Splitter', starter: 'import java.util.Scanner;\n\npublic class BillSplit {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        // TODO 1: ask the total bill amount (nextDouble)\n        // TODO 2: ask how many friends are splitting (nextInt)\n        // TODO 3: compute each share = total / friends\n        //         WATCH OUT: total is double, friends is int — is this\n        //         integer division? why or why not?\n        // TODO 4: print "Each person pays: Rs. X.XX" with printf\n        //         (use %,f or just %.2f)\n\n        sc.close();\n    }\n}', hint: 'double share = total / friends; — this is NOT integer division because total is double (mixed division promotes to double). Print: System.out.printf("Each person pays: Rs. %.2f%n", share);' },
    ],
    tasks: [
      { id: 'java-14-d3-scan-t1', text: 'Write a Scanner program: ask for first name, last name, age, city. Print formatted summary with printf.', tag: 'lab' },
      { id: 'java-14-d3-scan-t2', text: 'Demonstrate newline trap: nextInt() then nextLine() without clearing. Observe empty result. Then fix.', tag: 'drill' },
      { id: 'java-14-d3-scan-t3', text: 'Temperature converter: Celsius to Fahrenheit. Print result with 1 decimal place using printf.', tag: 'lab' },
      { id: 'java-14-d3-scan-t4', text: 'Try print vs println vs printf. What happens when you use printf without %n?', tag: 'drill' },
      { id: 'java-14-d3-scan-t5', text: 'Which Scanner method reads a full name (with spaces)? Why not next()?', tag: 'mcq' },
    ],
  },

  // ======== DAY 3: Decision Making ========
  {
    id: 'java-14-d3', number: 4, title: 'Decision Making', duration: 120,
    topics: ['if-else', 'switch-case', 'Menu-driven Programs'],
    alignment: ['CodeGym: Conditions and If', 'Codecademy: Conditionals'],
    blocks: [
      { type: 'callout', id: 'd3-intro', calloutType: 'info', title: 'The Brain of Every Program', content: 'Decision-making lets your program **choose** which code to run. Without it, every program would do the same thing every time. Today: `if-else` chains, `switch-case`, and the small differences between them.' },
      { type: 'heading', id: 'd3-if', level: 2, content: 'if-else — The Universal Decision Maker' },
      { type: 'code', id: 'd3-if-code', lang: 'java', title: 'if-else-if Ladder', code: `int marks = 85;

if (marks >= 90) {
    System.out.println("S");
} else if (marks >= 80) {
    System.out.println("A");
} else if (marks >= 70) {
    System.out.println("B");
} else if (marks >= 60) {
    System.out.println("C");
} else if (marks >= 50) {
    System.out.println("D");
} else if (marks >= 40) {
    System.out.println("E");
} else {
    System.out.println("F");
}
// Output: A` },
      { type: 'table', id: 'd3-ops', headers: ['Operator', 'Meaning', 'Example'], rows: [['==', 'Equal', '5 == 5 → true'], ['!=', 'Not equal', '5 != 3 → true'], ['>', 'Greater', '10 > 5 → true'], ['<', 'Less', '10 < 5 → false'], ['>=', 'Greater or equal', '10 >= 10 → true'], ['<=', 'Less or equal', '5 <= 10 → true'], ['&&', 'AND (both must be true)', '(5 > 2) && (3 < 10) → true'], ['||', 'OR (at least one true)', '(5 < 2) || (3 < 10) → true'], ['!', 'NOT (flip true ↔ false)', '!(5 > 2) → false']] },
      { type: 'callout', id: 'd3-short', calloutType: 'tip', title: 'Short-Circuit Evaluation', content: 'Java stops checking as soon as it knows the answer.\n\n- `false && anything` → result is `false` immediately, the right side is **never run**.\n- `true || anything` → result is `true` immediately, the right side is **never run**.\n\nThis is useful for safety: `if (arr != null && arr.length > 0)` — the `arr.length` check is skipped if `arr` is `null`, which prevents a `NullPointerException`.' },
      { type: 'heading', id: 'd3-switch', level: 2, content: 'switch-case — For Menu-Driven Programs' },
      { type: 'callout', id: 'd3-sw-types', calloutType: 'info', title: 'What Can You Switch On?', content: 'You can `switch` on these types: `byte`, `short`, `int`, `char`, `String` (Java 7+), and `enum`.\n\nYou **cannot** switch on `long`, `float`, `double`, or `boolean`.' },
      { type: 'code', id: 'd3-sw-code', lang: 'java', title: 'Calculator Menu', code: `switch (choice) {
    case 1:
        result = a + b;
        break;
    case 2:
        result = a - b;
        break;
    case 3:
        result = a * b;
        break;
    case 4:
        if (b != 0) {
            result = a / b;
        } else {
            System.out.println("Cannot divide by zero!");
        }
        break;
    default:
        System.out.println("Invalid choice!");
}` },
      { type: 'callout', id: 'd3-fall', calloutType: 'warn', title: 'break — DO NOT FORGET', content: 'Without `break`, execution **falls through** to the next case. This is the #1 switch bug.\n\nThe only time you want fall-through is when multiple cases should share the same code. Example: treat grade `S` and grade `A` the same.' },
      { type: 'table', id: 'd3-switch-vs-if', headers: ['Scenario', 'Use'], rows: [['Equality against a fixed set of values', 'switch'], ['Range checks (>, <)', 'if-else'], ['Complex AND/OR conditions', 'if-else'], ['Menu-driven programs', 'switch'], ['Only 2-3 conditions', 'if-else']] },
      // Doubt Clinics
      { type: 'callout', id: 'd3-d1', calloutType: 'doubt', title: 'Should I write `if (flag == true)` or just `if (flag)`?', content: '**Always `if (flag)`.** They are identical, but the shorter form is cleaner and is what experienced Java programmers write. For `false`, write `if (!flag)`. The `== true` version is redundant — `flag` already evaluates to a boolean on its own.' },
      { type: 'callout', id: 'd3-d2', calloutType: 'doubt', title: 'When is switch fall-through useful?', content: 'When multiple cases share the same code:\n\n```java\ncase \'S\':\ncase \'A\': System.out.println("Excellent!"); break;\ncase \'B\':\ncase \'C\': System.out.println("Good"); break;\n```\n\nBoth `S` and `A` trigger the same output without duplicating the line. The empty `case` labels "fall through" into the shared code.' },
      { type: 'callout', id: 'd3-d3', calloutType: 'doubt', title: "Why can't I switch on double or long?", content: '**double** — floating-point numbers cannot be compared exactly. `3.0` might be stored as `2.9999999` internally, so a "match" against `3.0` could miss. Switch requires exact equality.\n\n**long** — the range is too large for the jump table the compiler builds under the hood for switch. Only smaller integer types and `String` are supported.' },
      // Exam Alert
      { type: 'callout', id: 'd3-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **`switch` with `String`**: added in Java 7 — classic MCQ.\n2. **Missing `break`**: most common coding error in CE-1.\n3. **Short-circuit evaluation**: tested in both MCQ and code-tracing questions.\n4. **Ternary operator**: often appears as a 1-liner alternative to `if-else` in coding questions.' },
      // Bridge
      { type: 'callout', id: 'd3-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Boolean logic (`&&`, `||`, `!`) shows up again in **loop conditions (Day 4)** and **exception handling (Day 12)**. The comparison operators are the same you use for sorting (Comparable on Day 14).' },
      // Quick Ref
      { type: 'table', id: 'd3-qref', headers: ['Concept', 'Key Point'], rows: [['if-else-if', 'First true branch executes, the rest are skipped'], ['Ternary', 'condition ? trueValue : falseValue'], ['switch', 'Only: byte, short, int, char, String, enum'], ['break', 'Prevents fall-through. Group cases deliberately.'], ['&& vs &', '&& short-circuits. & evaluates both sides always.']] },
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
      { type: 'practice', id: 'd3-p1', lang: 'java', title: 'Practice: Grade Calculator', starter: `import java.util.Scanner;

public class Grades {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Marks: ");
        int marks = sc.nextInt();

        // TODO: write an if-else-if ladder.
        // S: 90+, A: 80-89, B: 70-79, C: 60-69,
        // D: 50-59, E: 40-49, F: below 40.

        sc.close();
    }
}`, hint: 'S: 90+, A: 80-89, B: 70-79, C: 60-69, D: 50-59, E: 40-49, F: below 40.' },
      { type: 'practice', id: 'd3-p2', lang: 'java', title: 'Practice: ATM Menu', starter: `import java.util.Scanner;

public class ATM {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        double balance = 5000;

        System.out.println("1. Check balance");
        System.out.println("2. Deposit");
        System.out.println("3. Withdraw");
        System.out.println("4. Exit");
        int choice = sc.nextInt();

        // TODO: use a switch statement.
        // For withdraw, check if balance >= amount first.
        // Use a while loop to keep the ATM running until Exit is chosen.

        sc.close();
    }
}`, hint: 'For withdraw, check if balance >= amount. Use a while loop to keep ATM running until Exit is chosen.' },
      { type: 'practice', id: 'd3-p3', lang: 'java', title: 'Practice: Leap Year Checker', starter: `import java.util.Scanner;

public class LeapYear {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Year: ");
        int year = sc.nextInt();

        // TODO: a year is a leap year if:
        //   - divisible by 4, AND
        //   - NOT divisible by 100, UNLESS also divisible by 400
        // 2000 -> leap (divisible by 400)
        // 1900 -> NOT leap (divisible by 100 but not 400)
        // 2024 -> leap, 2023 -> not
        // Print "leap year" or "not a leap year"

        sc.close();
    }
}`, hint: 'if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0). Test: 2000, 1900, 2024, 2023.' },
      { type: 'practice', id: 'd3-p4', lang: 'java', title: 'Practice: Fall-Through Lab', starter: `import java.util.Scanner;

public class FallThrough {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Grade (S/A/B/C/D/E/F): ");
        String grade = sc.nextLine();

        // STEP 1: write a switch on grade where EVERY case has a message
        //         but REMOVE all the break statements. Run it with "B".
        //         Observe what happens. Write it down in a comment.

        // STEP 2: add break back to every case. Run with "B" again.

        // STEP 3: use DELIBERATE fall-through so that:
        //         S and A both print "Excellent"
        //         B and C both print "Good"
        //         D and E both print "Pass"
        //         F prints "Fail"
        //         anything else prints "Invalid"

        sc.close();
    }
}`, hint: 'STEP 1 with no break, input B prints B\'s message then EVERYTHING after it (C, D, E, F, default). STEP 3: stack empty cases: case "S": case "A": System.out.println("Excellent"); break;' },
      { type: 'practice', id: 'd3-p5', lang: 'java', title: 'Practice: Number Classifier', starter: `import java.util.Scanner;

public class Classify {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int n = sc.nextInt();

        // TODO 1: print "positive", "negative", or "zero"
        // TODO 2: print "even" or "odd"
        // TODO 3: print "small" if |n| < 10, "medium" if < 100, else "large"
        //         (use Math.abs(n) for absolute value)
        // TODO 4: print "multiple of 7" if n % 7 == 0

        sc.close();
    }
}`, hint: 'Use if/else chains for sign and size. n % 2 == 0 for even. Combine conditions with && where needed. Test: 0, -5, 7, 49, -250.' },
      { type: 'practice', id: 'd3-p6', lang: 'java', title: 'Practice: Ternary Tracer', starter: `public class TernaryTracer {
    public static void main(String[] args) {
        int marks = 65;

        // TODO 1: rewrite this if-else as a ternary and print the result
        String verdict;
        if (marks >= 40) {
            verdict = "Pass";
        } else {
            verdict = "Fail";
        }

        // TODO 2: write a ternary that gives "Adult" for age >= 18 else "Minor"
        //         (declare int age = 20;)
        // TODO 3: write a NESTED ternary for three grades:
        //         marks >= 75 -> "Distinction", >= 40 -> "Pass", else "Fail"
        // TODO 4: in a comment, explain why nested ternaries are hard to read
    }
}`, hint: 'verdict = (marks >= 40) ? "Pass" : "Fail";. Nested: (marks >= 75) ? "Distinction" : (marks >= 40) ? "Pass" : "Fail".' },
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
    id: 'java-14-d4', number: 5, title: 'Iterative Logic (Loops)', duration: 120,
    topics: ['for', 'while', 'do-while', 'Entry vs Exit Control'],
    alignment: ['CodeGym: Loops in Java', 'Codecademy: Loops'],
    blocks: [
      { type: 'callout', id: 'd4-intro', calloutType: 'info', title: 'Loops — The Engine of Computation', content: 'Loops let you repeat code **without rewriting it**. Today: all three loop types — `for`, `while`, `do-while` — and the critical difference between **entry-controlled** and **exit-controlled** loops. Guaranteed CE-1 topic.' },
      { type: 'heading', id: 'd4-types', level: 2, content: 'The Three Loops' },
      { type: 'table', id: 'd4-compare', headers: ['Loop', 'Control', 'When to Use', 'Structure'], rows: [['for', 'Entry', 'Known count', 'for(init; cond; update) { }'], ['while', 'Entry', 'Unknown count', 'while(cond) { }'], ['do-while', 'Exit', 'Body MUST run at least once', 'do { } while(cond);']] },
      { type: 'code', id: 'd4-for', lang: 'java', title: 'for Loop', code: `// Print the numbers 1 to 10
for (int i = 1; i <= 10; i++) {
    System.out.print(i + " ");
}
// Output: 1 2 3 4 5 6 7 8 9 10

// Count down from 10 to 1
for (int i = 10; i >= 1; i--) {
    System.out.print(i + " ");
}
// Output: 10 9 8 7 6 5 4 3 2 1

// Count in steps of 2
for (int i = 0; i <= 20; i += 2) {
    System.out.print(i + " ");
}
// Output: 0 2 4 6 8 10 12 14 16 18 20` },
      { type: 'code', id: 'd4-while', lang: 'java', title: 'while Loop', code: `// Count how many digits are in a number
int num = 12345;
int count = 0;

while (num != 0) {
    num = num / 10;   // remove the last digit
    count = count + 1; // count how many times we removed one
}

System.out.println(count); // Output: 5

// Keep adding numbers until the user enters 0
int sum = 0;
int input = sc.nextInt();   // read the first number before the loop

while (input != 0) {
    sum = sum + input;       // add the latest input to the total
    input = sc.nextInt();    // read the next number
}` },
      { type: 'code', id: 'd4-do-while', lang: 'java', title: 'do-while (Menu Example)', code: `int choice;

do {
    // Show the menu
    System.out.println("1. Hello");
    System.out.println("2. Goodbye");
    System.out.println("3. Exit");

    // Ask the user to pick
    choice = sc.nextInt();

} while (choice != 3);

// The menu ALWAYS shows at least once,
// because the condition is checked at the END.` },
      { type: 'callout', id: 'd4-entry-exit', calloutType: 'info', title: 'Entry vs Exit Control', content: '**Entry-controlled** (`for`, `while`): the condition is checked **before** the body runs. If it is false the first time, the body never runs.\n\n**Exit-controlled** (`do-while`): the condition is checked **after** the body runs. The body **always** runs at least once.\n\nClassic MCQ: "Which loop is guaranteed to execute at least once?" → **`do-while`**.' },
      { type: 'heading', id: 'd4-break', level: 2, content: 'break and continue' },
      { type: 'code', id: 'd4-bc-code', lang: 'java', title: 'break vs continue', code: `// break: EXITS the loop entirely
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;      // stop the loop completely
    }
    System.out.print(i + " ");
}
// Output: 1 2 3 4

// continue: SKIPS this one iteration
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;   // skip even numbers, keep looping
    }
    System.out.print(i + " ");
}
// Output: 1 3 5 7 9

// Labeled break: exits both loops at once
outer:
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i == 2 && j == 2) {
            break outer;   // jump out of BOTH loops
        }
    }
}` },
      // Factorial
      { type: 'heading', id: 'd4-fact', level: 2, content: 'Lab: Factorial — All Three Ways' },
      { type: 'code', id: 'd4-fact-code', lang: 'java', title: 'Factorial (for, while, do-while)', code: `int n = 5;
int factorialFor = 1;
int factorialWhile = 1;
int factorialDoWhile = 1;

// --- Using a for loop ---
for (int i = 1; i <= n; i++) {
    factorialFor = factorialFor * i;
}

// --- Using a while loop ---
int j = 1;
while (j <= n) {
    factorialWhile = factorialWhile * j;
    j++;
}

// --- Using a do-while loop ---
// The guard (n > 0) makes sure it works when n = 0 (0! = 1)
int k = 1;
if (n > 0) {
    do {
        factorialDoWhile = factorialDoWhile * k;
        k++;
    } while (k <= n);
}` },
      // Doubt Clinics
      { type: 'callout', id: 'd4-d1', calloutType: 'doubt', title: 'When should I use while vs for?', content: '**Decision framework**:\n\n- Know the exact count? → `for` (e.g., array iteration, print 1-10)\n- Unknown count (reading until "quit")? → `while`\n- Must execute at least once (menu)? → `do-while`\n\nAny loop can be rewritten as any other — choose for clarity.' },
      { type: 'callout', id: 'd4-d2', calloutType: 'doubt', title: 'How do I avoid infinite loops?', content: 'Checklist before running:\n\n1. Is the **condition** eventually going to become false?\n2. Is the **update step** actually changing the variable?\n3. For `while`: is there an **increment/decrement** inside the body?\n\nCommon mistake: `int i=0; while(i<10) { System.out.println(i); }` — forgot `i++`!\n\nUse **Ctrl+C** to kill a runaway program.' },
      { type: 'callout', id: 'd4-d3', calloutType: 'doubt', title: 'Can I nest loops as deep as I want?', content: 'Yes, but each nesting level **multiplies** the work. Two nested loops = O(n²). Three nested = O(n³). For CS students: if you find yourself at 4+ levels, there is almost certainly a better algorithm. The practical limit for readable code is 3 levels.' },
      // Exam Alert
      { type: 'callout', id: 'd4-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **`do-while` is the ONLY exit-controlled loop** — memorize this.\n2. **`break` EXITS the loop, `continue` SKIPS one iteration.**\n3. **For-loop scope**: a variable declared in the `for` header is only accessible inside the loop body.\n4. **Factorial / Sum of digits**: guaranteed CE-1 coding question — practice until muscle memory.' },
      // Bridge
      { type: 'callout', id: 'd4-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Nested loops (today) are essential for **2D arrays and matrix operations (Day 11)**. `break`/`continue` logic shows up in `switch` (Day 3). Loop patterns appear in every algorithm you will study in DSA.' },
      // Quick Ref
      { type: 'table', id: 'd4-qref', headers: ['Concept', 'Key Point'], rows: [['for', 'for(init; cond; update) { body } — known count'], ['while', 'while(cond) { body } — unknown count'], ['do-while', 'do { body } while(cond); — runs at least once'], ['break', 'Exits the INNERMOST loop (or labeled loop)'], ['continue', 'Skips the rest of the CURRENT iteration'], ['Entry vs Exit', 'for/while = entry. do-while = exit (MCQ!)']] },
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
      { type: 'practice', id: 'd4-p1', lang: 'java', title: 'Practice: Sum of Digits', starter: `public class SumDigits {
    public static void main(String[] args) {
        int number = 9876;   // try: 123  ->  1 + 2 + 3 = 6

        // TODO: use a while loop to add up the digits.
        //
        // Two tools you will need (think about what they do):
        //   number % 10   — extracts the LAST digit
        //   number / 10   — removes the LAST digit
        //
        // Keep looping while number is not 0. Add each extracted
        // digit to a running sum.
    }
}`, hint: 'sum=0. while(n>0): sum += n%10; n/=10. Answer for 9876 is 30.' },
      { type: 'practice', id: 'd4-p2', lang: 'java', title: 'Practice: GCD (Euclidean Algorithm)', starter: `import java.util.Scanner;

public class GCD {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int a = 48;
        int b = 18;

        // GCD = the biggest number that divides BOTH a and b evenly.
        // Example: GCD(48, 18) = 6, because 6 divides both,
        // and no number bigger than 6 does.

        // Euclid's trick: GCD(a, b) = GCD(b, a % b).
        // We shrink the pair down until b becomes 0 — then a is the answer.
        //
        // Trace with a=48, b=18:
        //   48 % 18 = 12  ->  now solve (18, 12)
        //   18 % 12 = 6   ->  now solve (12, 6)
        //   12 % 6  = 0   ->  now solve (6, 0)  -> b is 0, so answer is 6!
        //
        // TODO: write the while loop.
        //   keep looping WHILE b is not 0.
        //   each iteration: replace the pair (a, b) with (b, a % b).
        //   (you will need a temp variable so you do not lose b's old value)
        // When b becomes 0, a holds the GCD.

        System.out.println("GCD: " + a);
        sc.close();
    }
}`, hint: `Follow the trace, do not skip it:
   (48, 18) -> (18, 12) -> (12, 6) -> (6, 0)  -> answer is 6

Each step replaces (a, b) with (b, a % b) until b is 0.
Think: how do you swap two values without losing one?
The last non-zero remainder IS the GCD.` },
      { type: 'practice', id: 'd4-p3', lang: 'java', title: 'Practice: Multiplication Table', starter: `import java.util.Scanner;

public class TimesTable {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Which table? ");
        int n = sc.nextInt();

        // TODO 1: print the table from n x 1 to n x 10 using a for loop
        //         output format: "5 x 3 = 15"

        // TODO 2: print ONLY the even rows (2, 4, 6, 8, 10) using continue

        // TODO 3: stop the loop entirely at 5 using break (print rows 1-4)

        sc.close();
    }
}`, hint: 'for (int i = 1; i <= 10; i++) { System.out.println(n + " x " + i + " = " + (n * i)); }. For even rows: if (i % 2 != 0) continue;. For break: if (i == 5) break;' },
      { type: 'practice', id: 'd4-p4', lang: 'java', title: 'Practice: Sentinel Sum', starter: `import java.util.Scanner;

public class SentinelSum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // TODO 1: keep reading numbers and adding them to a sum.
        //         STOP when the user enters 0 (the "sentinel").
        //         Print the total at the end.
        //         Use a while loop. Read the FIRST number before the loop!

        // TODO 2: change the sentinel to -1.
        // TODO 3: count how many numbers were entered (excluding the sentinel).

        sc.close();
    }
}`, hint: 'int input = sc.nextInt(); while (input != 0) { sum += input; input = sc.nextInt(); }. The first read before the loop is the classic pattern.' },
      { type: 'practice', id: 'd4-p5', lang: 'java', title: 'Practice: do-while Menu', starter: `import java.util.Scanner;

public class DoWhileMenu {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;

        // TODO 1: build a do-while menu:
        //   1. Say Hello
        //   2. Tell a Joke
        //   3. Exit
        //   The menu MUST show at least once. Loop until choice == 3.

        // TODO 2: add a default message in the switch for invalid choices.

        // TODO 3: in a comment, explain why do-while is the right loop here
        //         instead of while.

        sc.close();
    }
}`, hint: 'do { print menu; choice = sc.nextInt(); switch(choice) {...} } while (choice != 3);. The menu must display once before we know the choice, so the exit-controlled do-while fits.' },
      { type: 'practice', id: 'd4-p6', lang: 'java', title: 'Practice: Loop Detective', starter: `public class LoopDetective {
    public static void main(String[] args) {
        // For EACH loop below: predict the output, run it, and write
        // the actual output in a comment. Then answer the question.

        // LOOP A: how many times does this print?
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }

        // LOOP B: does this ever print anything?
        int j = 10;
        while (j < 5) {
            System.out.print("B: " + j + " ");
        }

        // LOOP C: how many times does this run?
        int k = 10;
        do {
            System.out.print("C: " + k + " ");
            k++;
        } while (k < 5);

        // LOOP D: is this an infinite loop? why or why not?
        // for (int m = 1; m > 0; m++) { System.out.print(m + " "); }

        // TODO: in one sentence each, explain the difference between
        //       loop B and loop C.
    }
}`, hint: 'A prints 0 1 2 3 4 (5 times). B prints nothing — condition false before body. C prints "C: 10 " once — body runs before the check. D is infinite — m keeps growing past 0 forever.' },
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
