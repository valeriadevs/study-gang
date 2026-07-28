import type { Day } from '../../../types';

export const phase2days: Day[] = [
  // ======== DAY 5: Methods (CE-1 Checkpoint) ========
  {
    id: 'java-14-d5', number: 6,
    title: 'Checkpoint — Continuous Evaluation 1 Review',
    subtitle: 'Modular Programming (Methods)', duration: 120,
    topics: ['Methods', 'Parameter Passing', 'void vs non-void', 'Local Memory'],
    alignment: ['CodeGym: Working with methods'],
    blocks: [
      { type: 'callout', id: 'd5-intro', calloutType: 'info', title: 'CE-1 Checkpoint — This Day Matters', content: 'Methods are the first building block of **modular programming**. Today is also the first sessional checkpoint. If you understand methods well, OOP (Days 7-10) builds naturally on top.' },
      { type: 'heading', id: 'd5-what', level: 2, content: 'What Is a Method?' },
      { type: 'paragraph', id: 'd5-def', content: 'A method is a **named block of code that does one specific job**. Write it once, **call** it many times. This is **code reuse** — the single most important idea in software engineering.' },
      { type: 'code', id: 'd5-anatomy', lang: 'java', title: 'Method Anatomy', code: '//  access  static?  return   name      parameters\n//    ↓       ↓       ↓       ↓           ↓\n   public  static   int    add (int a, int b) {\n       return a + b;\n   }  // signature = add(int, int)' },
      { type: 'table', id: 'd5-void', headers: ['Aspect', 'void', 'Non-void'], rows: [['Returns a value?', 'No', 'Yes — must use `return`'], ['`return` statement', 'Optional: `return;` to exit early', 'Mandatory: `return value;`'], ['Used in an expression?', 'No', 'Yes: `int x = add(3, 4);`'], ['Common use', 'Printing, side effects', 'Calculations, queries']] },
      { type: 'code', id: 'd5-methods', lang: 'java', title: 'Complete Method Example', code: 'public class Calc {\n    public static int add(int a, int b) { return a + b; }\n    public static void print(String s) { System.out.println(s); }\n    public static void main(String[] args) {\n        int sum = add(5, 3);      // non-void — captures the result\n        print("5 + 3 = " + sum);  // void — just executes\n    }\n}' },
      { type: 'heading', id: 'd5-pass', level: 2, content: 'Parameter Passing — Pass-by-Value' },
      { type: 'paragraph', id: 'd5-pass-p', content: 'Java is **pass-by-value for ALL types**. For primitives, the value itself is copied. For objects, the **reference** is copied (not the object). Changing the parameter inside the method does NOT change the original variable — but if the parameter is an object reference, you can still modify the object\'s contents through it.' },
      { type: 'code', id: 'd5-pass-code', lang: 'java', title: 'Pass-by-Value Demo', code: 'static void changePrimitive(int x) { x = 100; }       // only the local copy\nstatic void modifyArray(int[] arr) { arr[0] = 999; }   // arr points to the same array\n\npublic static void main(String[] args) {\n    int n = 10;  changePrimitive(n);\n    System.out.println(n);   // STILL 10 (the copy was changed, not the original)\n    int[] d = {5, 10, 15};  modifyArray(d);\n    System.out.println(d[0]);  // 999 (the array content was modified)\n}' },
      { type: 'callout', id: 'd5-stack', calloutType: 'tip', title: 'Method Call Memory', content: 'Every method call creates a **stack frame** holding its own local variables and parameters. When the method returns, the frame is destroyed. Local variables do NOT survive the call.' },
      // Doubt Clinics
      { type: 'callout', id: 'd5-d1', calloutType: 'doubt', title: "Why can't a method return two values?", content: 'A method can only have ONE return type. Workarounds:\n1. **Return an array or list**: `return new int[]{min, max};`\n2. **Return a custom object**: create a small class holding both values.\n3. **Modify a parameter object**: pass in a mutable object and update its fields.\n\nThis is a common exam question — the official answer is: "Java methods return exactly one value."' },
      { type: 'callout', id: 'd5-d2', calloutType: 'doubt', title: 'Actual vs Formal parameters — what\'s the difference?', content: '**Formal parameters** are the names declared in the method signature: `add(int a, int b)` — `a` and `b` are formal.\n\n**Actual parameters** (or **arguments**) are the values you pass during the call: `add(5, 3)` — `5` and `3` are actual.\n\nWhen the method runs, the actual values are copied into the formal parameters.' },
      { type: 'callout', id: 'd5-d3', calloutType: 'doubt', title: 'Can a void method have a return statement?', content: '**Yes!** `return;` (with no value after it) immediately exits the void method. This is useful for early returns:\n\n```java\nvoid process(int x) {\n    if (x < 0) return;  // exit early — nothing to do\n    // process positive x...\n}\n```' },
      // Exam Alert
      { type: 'callout', id: 'd5-exam', calloutType: 'exam', title: 'Exam Alert — CE-1 Focus', content: '1. **"What happens to local variables after a method returns?"** → Stack frame destroyed, variables gone.\n2. **Pass-by-value for both primitives and object references** — tested in code-tracing questions.\n3. **`void` vs non-void** — CE-1 coding may ask you to write methods of each type.\n4. **Method signature** = method name + parameter types (the return type is NOT part of the signature).' },
      // Bridge
      { type: 'callout', id: 'd5-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Every getter on **Day 7 (Classes/Objects)** is a non-void method. Every setter is a void method. Method overloading on **Day 9 (Polymorphism)** extends the ideas we see today.' },
      // Quick Ref
      { type: 'table', id: 'd5-qref', headers: ['Concept', 'Key Point'], rows: [['Method signature', 'name + parameter types (NOT return type)'], ['void', 'No return value. Use `return;` to exit early.'], ['Non-void', 'Must return a value matching the declared return type.'], ['Pass-by-value', 'Copy of primitive OR copy of reference — original is untouched.'], ['Stack frame', 'Created per call. Destroyed on return. Locals disappear.']] },
      // Quiz
      { type: 'quiz', id: 'd5-quiz', title: 'Day 5 Quiz',
        questions: [
          { id: 'd5-q1', question: 'What happens to local variables when a method returns?', options: ['They persist in heap', 'They are garbage collected', 'Their stack frame is destroyed', 'They become global'], correctIndex: 2, explanation: 'The stack frame is destroyed, and all local variables within it are gone. This is why local variables have method scope.' },
          { id: 'd5-q2', question: 'Is Java pass-by-value or pass-by-reference?', options: ['Pass-by-reference', 'Pass-by-value for primitives, reference for objects', 'Pass-by-value for everything', 'It depends on the JVM'], correctIndex: 2, explanation: 'Java is ALWAYS pass-by-value. For objects, it passes a copy of the reference, not the reference itself.' },
          { id: 'd5-q3', question: 'Can a method return two values?', options: ['Yes, with comma: return a, b;', 'Only with arrays/objects', 'No — Java methods return exactly one value', 'Only static methods can'], correctIndex: 1, explanation: 'A method returns exactly one value. To return multiple, use arrays, custom objects, or collections.' },
        ],
      },
      // Flashcards
      { type: 'flashcard', id: 'd5-cards', title: 'Day 5 Flashcards',
        cards: [
          { id: 'd5-f1', front: 'What is a method signature?', back: 'Method name + parameter types. Return type is NOT part of the signature. add(int, int) is the signature of add(int a, int b).', hint: 'Name + params, but not...' },
          { id: 'd5-f2', front: 'void vs non-void: key difference?', back: 'void: no return value, can use return; to exit. Non-void: MUST return a value matching the declared return type.', hint: 'One returns nothing...' },
          { id: 'd5-f3', front: 'What happens in memory during a method call?', back: 'A stack frame is created with local vars and parameters. It is destroyed when the method returns. All locals disappear.', hint: 'Stack frame...' },
        ],
      },
      { type: 'practice', id: 'd5-p1', lang: 'java', title: 'Practice: Method Calculator', starter: 'public class MethodCalc {\n    // TODO: add(), subtract(), multiply(), divide()\n    public static void main(String[] args) {\n        System.out.println("5+3=" + add(5,3));\n    }\n}', hint: 'All methods should be static. Each takes two ints and returns the result. Bonus: add isPrime(int n) that returns boolean.' },
      { type: 'practice', id: 'd5-p2', lang: 'java', title: 'Practice: Prime Number Generator', starter: 'public class PrimeGen {\n    static boolean isPrime(int n) {\n        if (n < 2) return false;\n        // TODO: check divisibility up to sqrt(n)\n        return true;\n    }\n    static int nextPrime(int n) {\n        // TODO: find the next prime after n\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(isPrime(17)); // should be true\n        System.out.println(nextPrime(17)); // should be 19\n    }\n}', hint: 'For isPrime: loop from 2 to sqrt(n). If n%i==0, return false. For nextPrime: increment n until isPrime returns true.' },
    ],
    tasks: [
      { id: 'java-14-d5-t1', text: 'Create methods: add, subtract, multiply, divide (non-void) + a void summary printer.', tag: 'lab' },
      { id: 'java-14-d5-t2', text: 'Write isPrime(int n) returning boolean. Test with numbers 2-20.', tag: 'lab' },
      { id: 'java-14-d5-t3', text: 'Demonstrate pass-by-value: show that changing a parameter inside a method does NOT change the original.', tag: 'drill' },
      { id: 'java-14-d5-t4', text: 'What happens to local variables in a stack frame when the method returns?', tag: 'mcq' },
    ],
  },

  // ======== DAY 6: Arrays & Strings ========
  {
    id: 'java-14-d6', number: 7,
    title: 'Data Organization (Arrays & Basic Strings)', duration: 120,
    topics: ['1D Arrays', 'String Methods', 'Strings as Objects'],
    alignment: ['CodeGym: Arrays in Java', 'CodeGym: Working with strings'],
    blocks: [
      { type: 'callout', id: 'd6-intro', calloutType: 'info', title: 'Storing Multiple Values', content: 'A single variable holds one value. **Arrays** hold multiple values of the same type. **Strings** are immutable objects with a built-in API for working with text. Both are essential for data processing in AIML.' },
      { type: 'heading', id: 'd6-arr', level: 2, content: 'Arrays — Complete Guide' },
      { type: 'code', id: 'd6-arr-code', lang: 'java', title: 'Array Basics', code: '// Declaration + allocation\nint[] marks = new int[5];       // all 0 by default\n\n// Init with values\ndouble[] gpas = {8.5, 9.2, 7.8};\n\n// Access (0-indexed!)\nmarks[0] = 85;  marks[4] = 92;\n\n// length is a field, NOT a method\nSystem.out.println(marks.length);  // 5\n\n// For-each loop\nfor (double g : gpas) System.out.println(g);' },
      { type: 'callout', id: 'd6-arr-gotcha', calloutType: 'warn', title: 'Array Pitfalls', content: '1. **`ArrayIndexOutOfBoundsException`**: accessing an invalid index (e.g., `arr[5]` when size is 5 — valid indices are 0-4).\n2. **`length` is a field**: `arr.length`, NOT `arr.length()` (that is for Strings).\n3. **Arrays are objects**: passed by reference-copy — modifying the array inside a method modifies the original.' },
      { type: 'heading', id: 'd6-str', level: 2, content: 'Strings — Immutable Objects' },
      { type: 'paragraph', id: 'd6-str-p', content: '`String` is a **class**, not a primitive. Strings are **immutable** — once created, they cannot change. Any "modification" actually creates a **new** String object. This is the #1 String exam fact.' },
      { type: 'code', id: 'd6-str-imm', lang: 'java', title: 'String Immutability', code: 'String s1 = "Hello";\nString s2 = s1;\ns1 = s1 + " World";  // creates a NEW String object\nSystem.out.println(s1); // Hello World\nSystem.out.println(s2); // Hello (unchanged!)' },
      { type: 'table', id: 'd6-str-methods', headers: ['Method', 'Does', 'Example → Result'], rows: [['length()', 'Returns the character count', '"Hi".length() → 2'], ['charAt(i)', 'Returns the character at index i', '"Java".charAt(1) → a'], ['substring(i)', 'Returns from index i to the end', '"Hello".substring(2) → "llo"'], ['substring(i, j)', 'Returns from i to j (exclusive)', '"Hello".substring(1, 4) → "ell"'], ['equals(s)', 'Returns true if same content', '"abc".equals("abc") → true'], ['toLowerCase()', 'Returns a lowercase copy', '"JAVA".toLowerCase() → "java"'], ['trim()', 'Returns a copy with leading/trailing spaces removed', '" hi ".trim() → "hi"'], ['contains(s)', 'Returns true if the substring is present', '"hi".contains("i") → true'], ['replace(a, b)', 'Returns a copy with all `a` replaced by `b`', '"java".replace("a", "x") → "jxvx"'], ['split(regex)', 'Returns an array split on the regex', '"a,b".split(",") → ["a", "b"]']] },
      { type: 'callout', id: 'd6-equals', calloutType: 'warn', title: '== vs .equals() — Critical Distinction', content: '`==` compares **memory references** (same object?). `.equals()` compares **content** (same characters?).\n\n```java\nString a = new String("hello");\nString b = new String("hello");\na == b       // false — different objects\na.equals(b)  // true  — same content\n```\n\n**Always use `.equals()` for String content comparison.**' },
      { type: 'code', id: 'd6-pool', lang: 'java', title: 'String Pool', code: 'String s1 = "Hello";      // pool\nString s2 = "Hello";      // SAME pool object\nSystem.out.println(s1 == s2); // true\n\nString s3 = new String("Hello"); // heap (NOT pool)\nSystem.out.println(s1 == s3);    // false' },
      // Doubt Clinics
      { type: 'callout', id: 'd6-d1', calloutType: 'doubt', title: 'Why is length a field for arrays but length() a method for Strings?', content: 'Arrays are low-level constructs built into the JVM — their size is stored as part of the array object\'s header and accessed as a field. Strings are high-level objects — `length()` is a method that counts characters. It is a historical design decision, but the distinction matters: `arr.length` (no parens), `str.length()` (with parens).' },
      { type: 'callout', id: 'd6-d2', calloutType: 'doubt', title: "What's the fastest way to reverse a String?", content: 'Use `StringBuilder` (Day 11): `new StringBuilder(str).reverse().toString()`.\n\n**Never** reverse by concatenating characters in a loop — each `+` creates a new String object, making it O(n²). StringBuilder mutates a single buffer, giving O(n) performance.' },
      { type: 'callout', id: 'd6-d3', calloutType: 'doubt', title: 'What happens if I access arr[-1] or arr[arr.length]?', content: '**`ArrayIndexOutOfBoundsException` at runtime** — not at compile time! The compiler does not check index bounds. This is a common source of runtime crashes. Always verify before accessing: `if (index >= 0 && index < arr.length)`.' },
      // Exam Alert
      { type: 'callout', id: 'd6-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **String immutability** — #1 String theory question.\n2. **`==` vs `.equals()`** — #1 trick question. ALWAYS use `.equals()` for content.\n3. **Array defaults**: `int → 0`, `boolean → false`, `object → null`.\n4. **`arr.length` (field) vs `str.length()` (method)** — classic MCQ trap.' },
      // Bridge
      { type: 'callout', id: 'd6-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Arrays (fixed size) → **ArrayList (dynamic, Day 14)**. StringBuilder (briefly mentioned) → **Day 11 deep dive**. String immutability matters when using Strings as HashMap keys in collections.' },
      // Quick Ref
      { type: 'table', id: 'd6-qref', headers: ['Concept', 'Key Point'], rows: [['Array declaration', 'int[] arr = new int[n]; OR int[] arr = {1, 2, 3};'], ['Array access', '0-indexed. arr[0] = first, arr[arr.length-1] = last'], ['String immutability', 'Any modification creates a NEW String object'], ['== vs .equals()', '== compares reference. .equals() compares content. USE .equals().'], ['String pool', 'Literals go to the pool and are reused. `new String()` bypasses.']] },
      // Quiz
      { type: 'quiz', id: 'd6-quiz', title: 'Day 6 Quiz',
        questions: [
          { id: 'd6-q1', question: 'String s = "Hello"; s = s + " World"; How many String objects are created?', options: ['1', '2', '3', '0'], correctIndex: 2, explanation: 'Three: "Hello" (literal), " World" (literal), and "Hello World" (concatenation result). The original "Hello" is unchanged (immutable).' },
          { id: 'd6-q2', question: 'What does arr.length return for int[] arr = new int[5]?', options: ['4', '5', 'Compile error', 'Depends on values'], correctIndex: 1, explanation: '5. length is the capacity, not the last index. Valid indices are 0-4.' },
          { id: 'd6-q3', question: 'Which is correct: arr.length or arr.length()?', options: ['arr.length (field)', 'arr.length() (method)', 'Both work', 'Neither — use size()'], correctIndex: 0, explanation: 'Arrays use .length (a field). Strings use .length() (a method). Collections use .size() (a method). Three different syntaxes!' },
        ],
      },
      // Flashcards
      { type: 'flashcard', id: 'd6-cards', title: 'Day 6 Flashcards',
        cards: [
          { id: 'd6-f1', front: 'How to declare and initialize an array?', back: 'int[] arr = new int[5]; (all 0). int[] arr = {1,2,3}; (with values). Array size is FIXED after creation.', hint: 'new type[size]...' },
          { id: 'd6-f2', front: 'What does "Strings are immutable" mean?', back: 'Once created, a String object cannot be changed. Methods like concat(), replace(), substring() create NEW String objects — the original is untouched.', hint: 'Cannot be modified...' },
          { id: 'd6-f3', front: '== vs .equals() for Strings?', back: '== compares memory addresses (same object?). .equals() compares character content. Always use .equals() for String comparison. == only works for String pool literals.', hint: 'Reference vs content...' },
          { id: 'd6-f4', front: 'Name 6 essential String methods.', back: 'length(), charAt(), substring(), equals(), toLowerCase(), trim(), contains(), replace(), split(), indexOf(). Know what each returns and its parameters.', hint: 'length, charAt, substring, equals...' },
        ],
      },
      { type: 'practice', id: 'd6-p1', lang: 'java', title: 'Practice: Student Grade Analyzer', starter: 'public class GradeAnalyzer {\n    public static void main(String[] args) {\n        int[] scores = {85, 92, 78, 95, 88};\n        // TODO: sum, average, max, min\n        // TODO: count above average\n        String[] names = {"Alice","Bob","Charlie"};\n        // TODO: uppercase, count vowel-starting names\n    }\n}', hint: 'For max: init max = scores[0], loop. For vowels: "AEIOU".indexOf(name.charAt(0)) != -1.' },
      { type: 'practice', id: 'd6-p2', lang: 'java', title: 'Practice: Palindrome Checker', starter: 'public class Palindrome {\n    public static void main(String[] args) {\n        String s = "Race car";\n        // TODO: remove spaces, lowercase, check if reversed equals original\n        // Hint: use replaceAll, toLowerCase, StringBuilder reverse\n    }\n}', hint: 'Clean: s = s.replaceAll("[^a-zA-Z]", "").toLowerCase(). Reverse with StringBuilder. Compare with .equals().' },
    ],
    tasks: [
      { id: 'java-14-d6-t1', text: 'Array of 10 scores: calculate sum, average, max, min.', tag: 'lab' },
      { id: 'java-14-d6-t2', text: 'Full name → print length, first name, last name, initials.', tag: 'lab' },
      { id: 'java-14-d6-t3', text: 'Demonstrate String immutability: show concat() does not change original.', tag: 'drill' },
      { id: 'java-14-d6-t4', text: 'Explain == vs .equals(). Write code that demonstrates both.', tag: 'review' },
    ],
  },
];
