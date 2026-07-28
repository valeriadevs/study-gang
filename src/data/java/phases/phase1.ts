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
      { type: 'callout', id: 'd2-intro', calloutType: 'info', title: 'What You Will Build Today', content: 'Every program processes data. Today: Java\'s **8 primitive types**, how to store a value in a variable, how to ask the user for input via `Scanner`, and how the `=` operator actually works. These are the atoms of every Java program.' },
      { type: 'heading', id: 'd2-prim', level: 2, content: 'The 8 Primitive Types' },
      { type: 'table', id: 'd2-prim-table', headers: ['Type', 'Size', 'Range', 'Example', 'Note'], rows: [['byte', '1 byte', '-128 to 127', 'byte b=100;', 'Rare — mostly for file I/O'], ['short', '2 bytes', '±32,767', 'short s=30000;', 'Rarely used in practice'], ['int', '4 bytes', 'about ±2.1 billion', 'int age=21;', '**Default for whole numbers**'], ['long', '8 bytes', 'huge', 'long pop=8_000_000_000L;', '**Must end with L**'], ['float', '4 bytes', 'about 6-7 digits', 'float pi=3.14f;', '**Must end with f**'], ['double', '8 bytes', 'about 15 digits', 'double e=2.718;', '**Default for decimals**'], ['char', '2 bytes', 'Unicode (one character)', "char grade='A';", '**Single quotes**'], ['boolean', '~1 byte', 'true/false', 'boolean flag=true;', 'Only two values']] },
      { type: 'callout', id: 'd2-default', calloutType: 'warn', title: 'Default Values', content: 'A variable is just a labelled box. If you forget to put something in it, what is inside?\n\n- **Instance variables** (declared in a class, outside methods) → Java fills the box for you: `0`, `false`, or `\\u0000`.\n- **Local variables** (declared inside a method) → Java does **not** fill the box. You must put something in before you read it, or the compiler will refuse to build your program.\n\nThis is a CE-1 MCQ favorite.' },
      { type: 'heading', id: 'd2-vars', level: 2, content: 'Variables and Assignment' },
      { type: 'code', id: 'd2-var-code', lang: 'java', title: 'Variable Patterns', code: 'int age = 21;\ndouble gpa = 8.75;\nchar section = \'A\';\n\n// Declare first, then assign later\nString name;\nname = "Vinay";\n\n// A constant — the value can never change after this line\nfinal double PI = 3.14159;\n// PI = 3.14; // COMPILE ERROR! Final means final.' },
      { type: 'callout', id: 'd2-int-div', calloutType: 'warn', title: 'Integer Division Trap', content: '`int x = 5 / 2;` gives **2**, not 2.5! When both sides of `/` are `int`, Java throws away the fraction. If you want 2.5, at least one side must be a decimal: `double x = 5.0 / 2;`. This is a guaranteed CE-1 trick question.' },
      { type: 'heading', id: 'd2-cast', level: 2, content: 'Type Casting' },
      { type: 'table', id: 'd2-cast-table', headers: ['Type', 'Direction', 'Automatic?', 'Data Loss?', 'Example'], rows: [['Widening', 'Smaller box → bigger box', 'Yes — Java does it for you', 'No', 'int → long'], ['Narrowing', 'Bigger box → smaller box', 'No — you must write a cast', 'Possible!', 'double → int: `(int)3.99` becomes `3`']] },
      { type: 'code', id: 'd2-cast-code', lang: 'java', title: 'Casting', code: '// Widening (automatic — small to big)\nint i = 10;\nlong l = i;   // OK, int fits inside long\n\n// Narrowing (explicit — big to small)\ndouble d = 3.99;\nint j = (int) d;  // 3 (the .99 is dropped, not rounded!)\n\n// char ↔ int (characters are really numbers under the hood)\nchar c = \'A\';\nint ascii = c;           // 65 (the ASCII code for A)\nchar next = (char)(c+1); // \'B\'' },
      { type: 'heading', id: 'd2-scanner', level: 2, content: 'Taking Input with Scanner' },
      { type: 'code', id: 'd2-sc-code', lang: 'java', title: 'Scanner Basics', code: 'import java.util.Scanner;\n\npublic class Input {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Name: ");\n        String name = sc.nextLine();\n        System.out.print("Age: ");\n        int age = sc.nextInt();\n        sc.nextLine(); // consume leftover newline!\n        System.out.print("City: ");\n        String city = sc.nextLine();\n        System.out.printf("%s, %d, from %s%n", name, age, city);\n        sc.close();\n    }\n}' },
      { type: 'callout', id: 'd2-sc-gotcha', calloutType: 'warn', title: 'The Scanner Newline Trap', content: 'After `nextInt()`, `nextDouble()`, or `nextBoolean()`, the **Enter key** you pressed is still sitting in the input buffer, waiting to be read. The next `nextLine()` happily consumes that leftover newline and returns an empty string — so your actual input never gets read.\n\n**Fix**: add an extra `sc.nextLine()` after every numeric/boolean input to eat the leftover newline before your next `nextLine()`.' },
      { type: 'table', id: 'd2-sc-methods', headers: ['Method', 'Returns', 'Stops At'], rows: [['nextLine()', 'The whole line of text (until Enter)', 'Enter key'], ['next()', 'One word (no spaces)', 'Whitespace'], ['nextInt()', 'An int', 'Whitespace'], ['nextDouble()', 'A double', 'Whitespace']] },
      { type: 'code', id: 'd2-printf', lang: 'java', title: 'printf Formatting', code: 'double gpa = 8.753;\nSystem.out.printf("GPA: %.2f%n", gpa);  // prints: GPA: 8.75\n// %s = string, %d = int, %f = double, %.2f = 2 decimals, %n = newline' },
      // Doubt Clinics
      { type: 'callout', id: 'd2-d1', calloutType: 'doubt', title: 'When should I use float vs double?', content: '**Always use `double`**, unless you are storing millions of decimals and every byte of memory matters (for example, weights inside a large ML model). `double` gives you ~15 digits of precision, `float` gives only ~7. For university work, `double` is the safe default.' },
      { type: 'callout', id: 'd2-d2', calloutType: 'doubt', title: 'What happens if I assign a long to an int?', content: 'The compiler will refuse to build the program — you will see an error like "incompatible types: possible lossy conversion". You must write the cast yourself: `int x = (int) myLong;`. If the value is bigger than `int` can hold (~±2.1 billion), you silently get a wrong number. Always check first.' },
      { type: 'callout', id: 'd2-d3', calloutType: 'doubt', title: 'Why does Scanner.nextInt() skip my nextLine()? Visual explanation.', content: 'Picture the input buffer as a queue of characters: `"42\\nVinay\\n"`.\n\n- `nextInt()` reads `42` and stops at the `\\n`. The `\\n` is still in the queue.\n- `nextLine()` runs next. It reads **everything up to the next `\\n`** — which is just the empty newline leftover. It returns `""` and skips `"Vinay"` entirely.\n\n**Fix**: add `sc.nextLine();` right after `nextInt()` to consume the leftover `\\n`. Now the queue looks like `"Vinay\\n"` and `nextLine()` works.' },
      // Exam Alert
      { type: 'callout', id: 'd2-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Integer division**: `5 / 2 = 2` (not 2.5) — guaranteed trick question.\n2. **Scanner newline trap**: CE-1 coding question staple.\n3. **Default values for local vs instance variables**: MCQ favorite.\n4. **All 8 primitive types and sizes**: memorize byte/short/int/long sizes in bytes.' },
      // Bridge
      { type: 'callout', id: 'd2-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'The assignment operator `=` and value types you learn today become critical on **Day 5** with parameter passing (Java passes by value — always). You will use `Scanner` in **every lab task** from here onward, so the newline trap is worth memorizing now.' },
      // Quick Ref
      { type: 'table', id: 'd2-qref', headers: ['Concept', 'Key Point'], rows: [['8 primitives', 'byte(1), short(2), int(4), long(8), float(4), double(8), char(2), boolean'], ['Integer division', 'int / int = int (truncated). Use double for decimals.'], ['Scanner', 'import java.util.Scanner; new Scanner(System.in)'], ['Newline trap', 'Add sc.nextLine() after nextInt/nextDouble/nextBoolean'], ['printf', '%s=string, %d=int, %f=double, %.2f=round, %n=newline']] },
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
      { type: 'callout', id: 'd3-intro', calloutType: 'info', title: 'The Brain of Every Program', content: 'Decision-making lets your program **choose** which code to run. Without it, every program would do the same thing every time. Today: `if-else` chains, `switch-case`, and the small differences between them.' },
      { type: 'heading', id: 'd3-if', level: 2, content: 'if-else — The Universal Decision Maker' },
      { type: 'code', id: 'd3-if-code', lang: 'java', title: 'if-else-if Ladder', code: 'int marks = 85;\n\nif (marks >= 90)      System.out.println("S");\nelse if (marks >= 80) System.out.println("A");\nelse if (marks >= 70) System.out.println("B");\nelse if (marks >= 60) System.out.println("C");\nelse if (marks >= 50) System.out.println("D");\nelse if (marks >= 40) System.out.println("E");\nelse                  System.out.println("F");' },
      { type: 'table', id: 'd3-ops', headers: ['Operator', 'Meaning', 'Example'], rows: [['==', 'Equal', '5 == 5 → true'], ['!=', 'Not equal', '5 != 3 → true'], ['>', 'Greater', '10 > 5 → true'], ['<', 'Less', '10 < 5 → false'], ['>=', 'Greater or equal', '10 >= 10 → true'], ['<=', 'Less or equal', '5 <= 10 → true'], ['&&', 'AND (both must be true)', '(5 > 2) && (3 < 10) → true'], ['||', 'OR (at least one true)', '(5 < 2) || (3 < 10) → true'], ['!', 'NOT (flip true ↔ false)', '!(5 > 2) → false']] },
      { type: 'callout', id: 'd3-short', calloutType: 'tip', title: 'Short-Circuit Evaluation', content: 'Java stops checking as soon as it knows the answer.\n\n- `false && anything` → result is `false` immediately, the right side is **never run**.\n- `true || anything` → result is `true` immediately, the right side is **never run**.\n\nThis is useful for safety: `if (arr != null && arr.length > 0)` — the `arr.length` check is skipped if `arr` is `null`, which prevents a `NullPointerException`.' },
      { type: 'heading', id: 'd3-switch', level: 2, content: 'switch-case — For Menu-Driven Programs' },
      { type: 'callout', id: 'd3-sw-types', calloutType: 'info', title: 'What Can You Switch On?', content: 'You can `switch` on these types: `byte`, `short`, `int`, `char`, `String` (Java 7+), and `enum`.\n\nYou **cannot** switch on `long`, `float`, `double`, or `boolean`.' },
      { type: 'code', id: 'd3-sw-code', lang: 'java', title: 'Calculator Menu', code: 'switch (choice) {\n    case 1: result = a + b; break;\n    case 2: result = a - b; break;\n    case 3: result = a * b; break;\n    case 4:\n        if (b != 0) result = a / b;\n        else System.out.println("Cannot divide by zero!");\n        break;\n    default: System.out.println("Invalid choice!");\n}' },
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
      { type: 'callout', id: 'd4-intro', calloutType: 'info', title: 'Loops — The Engine of Computation', content: 'Loops let you repeat code **without rewriting it**. Today: all three loop types — `for`, `while`, `do-while` — and the critical difference between **entry-controlled** and **exit-controlled** loops. Guaranteed CE-1 topic.' },
      { type: 'heading', id: 'd4-types', level: 2, content: 'The Three Loops' },
      { type: 'table', id: 'd4-compare', headers: ['Loop', 'Control', 'When to Use', 'Structure'], rows: [['for', 'Entry', 'Known count', 'for(init; cond; update) { }'], ['while', 'Entry', 'Unknown count', 'while(cond) { }'], ['do-while', 'Exit', 'Body MUST run at least once', 'do { } while(cond);']] },
      { type: 'code', id: 'd4-for', lang: 'java', title: 'for Loop', code: '// Print 1-10\nfor (int i = 1; i <= 10; i++) System.out.print(i + " ");\n// 1 2 3 4 5 6 7 8 9 10\n\n// Count down\nfor (int i = 10; i >= 1; i--) System.out.print(i + " ");\n\n// Step of 2\nfor (int i = 0; i <= 20; i += 2) System.out.print(i + " ");' },
      { type: 'code', id: 'd4-while', lang: 'java', title: 'while Loop', code: '// Count digits\nint num = 12345, count = 0;\nwhile (num != 0) { num /= 10; count++; }\nSystem.out.println(count); // 5\n\n// Sum until 0 (sentinel)\nint sum = 0, input;\nwhile ((input = sc.nextInt()) != 0) sum += input;' },
      { type: 'code', id: 'd4-do-while', lang: 'java', title: 'do-while (Menu Example)', code: 'int choice;\ndo {\n    System.out.println("1.Hello 2.Goodbye 3.Exit");\n    choice = sc.nextInt();\n} while (choice != 3);\n// Menu displays AT LEAST ONCE regardless of choice' },
      { type: 'callout', id: 'd4-entry-exit', calloutType: 'info', title: 'Entry vs Exit Control', content: '**Entry-controlled** (`for`, `while`): the condition is checked **before** the body runs. If it is false the first time, the body never runs.\n\n**Exit-controlled** (`do-while`): the condition is checked **after** the body runs. The body **always** runs at least once.\n\nClassic MCQ: "Which loop is guaranteed to execute at least once?" → **`do-while`**.' },
      { type: 'heading', id: 'd4-break', level: 2, content: 'break and continue' },
      { type: 'code', id: 'd4-bc-code', lang: 'java', title: 'break vs continue', code: '// break: EXITS the loop entirely\nfor (int i=1; i<=10; i++) { if (i==5) break; System.out.print(i+" "); }\n// 1 2 3 4\n\n// continue: SKIPS this iteration\nfor (int i=1; i<=10; i++) { if (i%2==0) continue; System.out.print(i+" "); }\n// 1 3 5 7 9\n\n// Labeled break: exits both loops at once\nouter: for (int i=1; i<=3; i++)\n    for (int j=1; j<=3; j++)\n        if (i==2 && j==2) break outer;' },
      // Factorial
      { type: 'heading', id: 'd4-fact', level: 2, content: 'Lab: Factorial — All Three Ways' },
      { type: 'code', id: 'd4-fact-code', lang: 'java', title: 'Factorial (for, while, do-while)', code: 'int n=5, f1=1, f2=1, f3=1;\n// for\nfor (int i=1; i<=n; i++) f1 *= i;\n// while\nint j=1; while (j<=n) { f2 *= j; j++; }\n// do-while (with the n>0 guard so it works for n=0 too)\nint k=1; if (n>0) do { f3 *= k; k++; } while (k<=n);' },
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
