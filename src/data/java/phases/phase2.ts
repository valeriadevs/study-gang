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
      { type: 'callout', id: 'd6-intro', calloutType: 'info', title: 'Storing Multiple Values', content: 'So far you have stored one value per variable: `int age = 21;`. But what if you have 100 students\' ages? You don\'t want 100 variables. **Arrays** let you store many values of the same type in a single container. **Strings** are the other big topic today — they look simple but are full objects under the hood. Both are essential for every Java program.' },
      { type: 'heading', id: 'd6-arr', level: 2, content: 'Arrays — A Container for Many Values' },
      { type: 'paragraph', id: 'd6-arr-what', content: 'An array is a fixed-size list of values, all of the same type. Think of it as a row of numbered lockers. Each locker has a number (the **index**, starting from 0) and can hold one value. You cannot add more lockers after creating the array — the size is locked in.' },
      { type: 'paragraph', id: 'd6-arr-create', content: 'There are two ways to create an array. The first is to specify the size and let Java fill it with default values (0 for numbers, false for boolean, null for objects). The second is to list the values directly — Java counts them and sets the size for you.' },
      { type: 'code', id: 'd6-arr-code', lang: 'java', title: 'Creating Arrays', code: '// Method 1: Specify size. Java fills with defaults (all 0).\nint[] marks = new int[5];\n// marks = [0, 0, 0, 0, 0] — five slots, numbered 0 through 4\n\n// Method 2: List the values. Java counts them.\ndouble[] gpas = {8.5, 9.2, 7.8, 9.0};\n// gpas has 4 slots: indices 0, 1, 2, 3' },
      { type: 'paragraph', id: 'd6-arr-access', content: 'You read or change a value by writing the array name, square brackets, and the index number. **Indices start at 0** — this is the #1 thing to remember. The first element is at index 0. The last element is at index `length - 1`. An array of size 5 has valid indices 0, 1, 2, 3, and 4.' },
      { type: 'code', id: 'd6-arr-access-code', lang: 'java', title: 'Reading and Writing Array Elements', code: 'int[] scores = {85, 92, 78, 95, 88};  // size = 5\n\n// READ: arrayName[index]\nint first  = scores[0];  // 85 (first element)\nint last   = scores[4];  // 88 (last element — index 4, not 5!)\n\n// WRITE: arrayName[index] = newValue;\nscores[2] = 80;  // changed the third element from 78 to 80\n\n// How many elements? .length (notice: NO parentheses!)\nint count = scores.length;  // 5\nSystem.out.println("We have " + count + " scores");' },
      { type: 'paragraph', id: 'd6-arr-loop', content: 'Arrays and loops are best friends. You use a `for` loop with an index to visit every element. Or, if you just need the values (not the index numbers), Java has a simpler **for-each** loop.' },
      { type: 'code', id: 'd6-arr-loop-code', lang: 'java', title: 'Looping Through Arrays', code: 'int[] nums = {10, 20, 30, 40, 50};\n\n// for loop with index — you control the index variable\nint sum = 0;\nfor (int i = 0; i < nums.length; i++) {\n    sum += nums[i];  // i goes 0, 1, 2, 3, 4\n}\nSystem.out.println("Sum: " + sum);  // 150\n\n// for-each loop — simpler, when you don\'t need the index\nfor (int n : nums) {\n    System.out.print(n + " ");  // prints: 10 20 30 40 50\n}' },
      { type: 'callout', id: 'd6-arr-gotcha', calloutType: 'warn', title: 'Three Array Pitfalls', content: '1. **`ArrayIndexOutOfBoundsException`** — you tried to access an index that does not exist. `scores[5]` on a size-5 array crashes because valid indices are 0-4.\n2. **`.length` is a field, not a method** — write `arr.length`, never `arr.length()`. (Strings use `.length()` with parentheses — different thing!)\n3. **Arrays are objects** — if you pass an array to a method and that method changes an element, the original array IS changed. This surprises people on Day 6 (Methods).' },
      { type: 'heading', id: 'd6-str', level: 2, content: 'Strings — Immutable Objects' },
      { type: 'paragraph', id: 'd6-str-p', content: '`String` is a **class**, not a primitive. Notice the capital S — that is the clue. You create a String with double quotes like `"Hello"`, but under the hood it is a full object. The most important fact about Strings: they are **immutable**. Once a String object is created, its characters can never change. Any operation that looks like it "modifies" a String actually creates a brand new String object and leaves the original untouched.' },
      { type: 'paragraph', id: 'd6-str-imm-p', content: 'Here is a concrete example. `s1` starts as `"Hello"`. `s2` is set to point to the same object as `s1`. Then we "add" to `s1`. But because Strings cannot change, Java creates a new String `"Hello World"` and makes `s1` point to it. `s2` still points to the original `"Hello"` — it was never modified.' },
      { type: 'code', id: 'd6-str-imm', lang: 'java', title: 'String Immutability in Action', code: 'String s1 = "Hello";\nString s2 = s1;              // both point to the SAME "Hello" object\ns1 = s1 + " World";          // creates a NEW String "Hello World"\nSystem.out.println(s1);      // Hello World\nSystem.out.println(s2);      // Hello (unchanged! The original was never touched)' },
      { type: 'paragraph', id: 'd6-str-equals-p', content: 'Since Strings are objects, comparing them with `==` checks whether two variables point to the **exact same object** in memory. That is almost never what you want. Instead, use `.equals()` to check whether two Strings contain the **same characters**. This is the most common mistake in beginner Java.' },
      { type: 'code', id: 'd6-str-eq-code', lang: 'java', title: '== vs .equals()', code: 'String a = new String("hello");\nString b = new String("hello");\n\nSystem.out.println(a == b);       // false — two different objects in memory\nSystem.out.println(a.equals(b));  // true  — both contain the same characters\n\n// Rule: ALWAYS use .equals() to compare String content.\n// The only time == works is with string literals (explained next).' },
      { type: 'paragraph', id: 'd6-str-pool-p', content: 'There is one special case that confuses people. When you create Strings using quotes (not `new`), Java stores them in a shared pool and reuses them. So two quoted `"Hello"` values actually point to the same pool object, making `==` return true. This is a performance optimization — not something you should rely on.' },
      { type: 'code', id: 'd6-pool', lang: 'java', title: 'The String Pool (Why == Sometimes "Works")', code: 'String s1 = "Hello";             // stored in the string pool\nString s2 = "Hello";             // Java reuses the pool entry — SAME object!\nSystem.out.println(s1 == s2);    // true (same pool object)\n\nString s3 = new String("Hello"); // forces a NEW object on the heap (NOT pool)\nSystem.out.println(s1 == s3);    // false (different objects)' },
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
