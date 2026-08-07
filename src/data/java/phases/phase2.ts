import type { Day } from '../../../types';

export const phase2days: Day[] = [
  // ======== DAY 5: Methods (CE-1 Checkpoint) ========
  {
    id: 'java-14-d5', number: 6,
    title: 'Methods Made Simple',
    subtitle: 'Small, reusable steps in Java', duration: 60,
    topics: ['Methods', 'Parameters', 'Return values', 'Calling methods'],
    alignment: ['CodeGym: Working with methods'],
    blocks: [
      { type: 'callout', id: 'd5-intro', calloutType: 'info', title: 'Start Small', content: 'Methods can look like a wall of new words. That is normal. For this first pass, focus on only four ideas: a method has one job, you can call it, it can receive input, and it can give an answer back.' },
      { type: 'heading', id: 'd5-what', level: 2, content: 'The Big Idea' },
      { type: 'paragraph', id: 'd5-def', content: 'A method is a **named mini-program**. Put one small job inside it, give the method a name, and call that name whenever you need the job. This keeps `main` easier to read.' },
      { type: 'list', id: 'd5-four-ideas', listStyle: 'number', items: ['Choose one small job.', 'Give that job a name.', 'Pass information in when needed.', 'Return an answer when needed.'] },
      { type: 'code', id: 'd5-anatomy', lang: 'java', title: 'A Method You Can Read', code: `public static void main(String[] args) {
    sayHello();
    sayHello();
}

static void sayHello() {
    System.out.println("Hello!");
}` },
      { type: 'callout', id: 'd5-anatomy-help', calloutType: 'tip', title: 'What to notice', content: '`static void sayHello()` defines the method. `sayHello();` calls it. Because the call appears twice, the output is `Hello!` followed by `Hello!`. The empty `()` means the method needs no input. The examples include `main` because Java starts running there; focus on the small method above it first.' },
      { type: 'heading', id: 'd5-pass', level: 2, content: 'Give a Method Some Input' },
      { type: 'paragraph', id: 'd5-pass-p', content: 'A **parameter** is a named placeholder inside the parentheses. When you call the method, the value you provide fills that placeholder. The same method can then work with different values.' },
      { type: 'code', id: 'd5-pass-code', lang: 'java', title: 'A Method With a Parameter', code: `public static void main(String[] args) {
    greet("Maya");
    greet("Ravi");
}

static void greet(String name) {
    System.out.println("Hello, " + name);
}` },
      { type: 'table', id: 'd5-void', headers: ['Call', 'Value inside `name`', 'Output'], rows: [['`greet("Maya")`', '`"Maya"`', 'Hello, Maya'], ['`greet("Ravi")`', '`"Ravi"`', 'Hello, Ravi']] },
      { type: 'heading', id: 'd5-return', level: 2, content: 'Get an Answer Back' },
      { type: 'paragraph', id: 'd5-return-p', content: 'A method can also **return** an answer. The word before the method name tells Java what kind of answer to expect. Here, `int` means the answer will be a whole number.' },
      { type: 'code', id: 'd5-methods', lang: 'java', title: 'A Method That Returns a Value', code: `public static void main(String[] args) {
    int total = add(2, 3);
    System.out.println(total);
}

static int add(int first, int second) {
    return first + second;
}` },
      { type: 'table', id: 'd5-types', headers: ['If the method...', 'Use', 'Example call'], rows: [['Only does an action', '`void`', '`greet("Maya");`'], ['Gives an answer', 'An answer type such as `int`', '`int total = add(2, 3);`']] },
      { type: 'callout', id: 'd5-stack', calloutType: 'tip', title: 'What does `static` mean here?', content: 'For this lesson, leave `static` in the method declaration so `main` can call the method directly. You will learn the deeper reason for `static` when you study classes and objects.' },
      // Doubt Clinics
      { type: 'callout', id: 'd5-d1', calloutType: 'doubt', title: 'What is a method call?', content: 'The method is the recipe. The **call** is using the recipe. In `greet("Maya")`, `greet` is the method and the whole line is the call.' },
      { type: 'callout', id: 'd5-d2', calloutType: 'doubt', title: 'What goes inside the parentheses?', content: 'Put the information the method needs there. For `greet(String name)`, the method needs one piece of text. When you call `greet("Maya")`, `"Maya"` fills the `name` placeholder.' },
      { type: 'callout', id: 'd5-d3', calloutType: 'doubt', title: 'What if there is no answer to return?', content: 'Use `void`. A `void` method can print something or perform an action, but it does not hand a value back. You simply call it as its own line, like `sayHello();`.' },
      // Exam Alert
      { type: 'callout', id: 'd5-exam', calloutType: 'exam', title: 'Quick Check', content: '1. A method is a named mini-program.\n2. A method call runs that mini-program.\n3. Parameters bring input in.\n4. `return` sends an answer back.\n5. `void` means there is no answer to store.' },
      // Bridge
      { type: 'callout', id: 'd5-bridge', calloutType: 'bridge', title: 'What Comes Next?', content: 'Methods will soon live inside **classes and objects**. For now, it is enough to feel comfortable writing a small method, giving it input, and using its answer.' },
      // Quick Ref
      { type: 'table', id: 'd5-qref', headers: ['Word', 'Plain meaning'], rows: [['Method', 'A named mini-program with one job'], ['Call', 'The line that runs a method'], ['Parameter', 'A placeholder for input'], ['`return`', 'Sends an answer back'], ['`void`', 'The method does not return an answer']] },
      // Quiz
      { type: 'quiz', id: 'd5-quiz', title: 'Check the Basics',
        questions: [
          { id: 'd5-q1', question: 'What is a method?', options: ['A named mini-program', 'A Java variable', 'A type of loop', 'A file name'], correctIndex: 0, explanation: 'A method is a named set of steps that performs one job.' },
          { id: 'd5-q2', question: 'What does `greet("Maya")` do?', options: ['Creates a new class', 'Calls greet and gives it "Maya" as input', 'Returns an int', 'Stops the program'], correctIndex: 1, explanation: 'The line calls the greet method and puts the text "Maya" into its name parameter.' },
          { id: 'd5-q3', question: 'What does `return` do?', options: ['Repeats a loop', 'Names a parameter', 'Sends an answer back to the caller', 'Prints automatically'], correctIndex: 2, explanation: 'return sends the method result back so the calling code can store or use it.' },
        ],
      },
      // Flashcards
      { type: 'flashcard', id: 'd5-cards', title: 'Remember the Basics',
        cards: [
          { id: 'd5-f1', front: 'What is a method?', back: 'A named mini-program that performs one job.', hint: 'A named set of steps...' },
          { id: 'd5-f2', front: 'What is a parameter?', back: 'A named placeholder for input. In greet(String name), name is the parameter.', hint: 'Input goes in...' },
          { id: 'd5-f3', front: 'What does return do?', back: 'It sends an answer from the method back to the code that called it.', hint: 'Sends the answer back...' },
          { id: 'd5-f4', front: 'What does void mean?', back: 'The method does an action but does not return an answer.', hint: 'No answer comes back...' },
        ],
      },
      { type: 'practice', id: 'd5-p1', lang: 'java', title: 'Practice: Even or Odd Reporter', starter: `public class EvenOdd {
    public static void main(String[] args) {
        // TODO: call report with a few numbers and run the program
    }

    static void report(int number) {
        // TODO: print whether number is even or odd
    }
}`, hint: 'Pick any number you like. Run and check the output matches what you expect.' },
      { type: 'practice', id: 'd5-p2', lang: 'java', title: 'Practice: Temperature Converter', starter: `public class TempConvert {
    public static void main(String[] args) {
        // TODO: call celsiusToFahrenheit with at least one value and print it
    }

    static double celsiusToFahrenheit(double celsius) {
        // TODO: convert celsius to fahrenheit and return the result
        return 0;
    }
}`, hint: 'Body temp (37 C) should print 98.6. Water (100 C) should print 212.0. Watch the 9.0/5.0 — using 9/5 will give the wrong answer.' },
      { type: 'practice', id: 'd5-p3', lang: 'java', title: 'Practice: Greeting Card', starter: `public class GreetingCard {
    public static void main(String[] args) {
        // TODO: call greet with three different names
    }

    // TODO: write a method greet(String name) that prints:
    //   "Hello, <name>! Have a great day."
    // It does NOT return anything (void).
}`, hint: 'static void greet(String name) { System.out.println("Hello, " + name + "! Have a great day."); }' },
      { type: 'practice', id: 'd5-p4', lang: 'java', title: 'Practice: Max of Two', starter: `public class MaxTwo {
    public static void main(String[] args) {
        // TODO: call max with (3, 7), (10, 2), and (-5, -5). Print each result.
    }

    static int max(int a, int b) {
        // TODO: return the larger of a and b
        return 0;
    }
}`, hint: 'return (a > b) ? a : b; — or write it with if/else. Expected: 7, 10, -5.' },
      { type: 'practice', id: 'd5-p5', lang: 'java', title: 'Practice: Three Greetings', starter: `public class ThreeGreetings {
    public static void main(String[] args) {
        // TODO: call greet("Maya"), greet("Ravi"), and greet("Aisha")
        //       what is the output order? why?
    }

    static void greet(String name) {
        System.out.println("Hello, " + name + "!");
        System.out.println("Nice to meet you.");
    }
}`, hint: 'Each call prints BOTH lines before the next call starts — methods run top to bottom. Output: Hello Maya! / Nice to meet you. / Hello Ravi! / ...' },
      { type: 'practice', id: 'd5-p6', lang: 'java', title: 'Practice: Add and Print', starter: `public class AddPrint {
    public static void main(String[] args) {
        // TODO 1: call add(2, 3) and store the result, then print it
        // TODO 2: call add(10, 20) and print "sum = 30" using the returned value
        // TODO 3: call add inside a println:  System.out.println(add(5, 5));
        // TODO 4: what happens if you call add(1, 2) WITHOUT storing or printing?
    }

    static int add(int first, int second) {
        return first + second;
    }
}`, hint: 'A returned value is only useful if you store it or use it. Calling add(1, 2); alone computes 3 and throws it away — the result vanishes.' },
    ],
    tasks: [
      { id: 'java-14-d5-t1', text: 'Write greet(String name) so it prints a friendly greeting.', tag: 'lab' },
      { id: 'java-14-d5-t2', text: 'Write add(int a, int b), return the sum, and call it with two different pairs of numbers.', tag: 'lab' },
      { id: 'java-14-d5-t3', text: 'Change greet so it can print any name passed to it. Explain what the parameter stores.', tag: 'drill' },
      { id: 'java-14-d5-t4', text: 'In your own words, explain the difference between a method, a parameter, and a return value.', tag: 'review' },
    ],
  },
  {
    id: 'java-14-d5-next', number: 7,
    title: 'Methods: Next Level',
    subtitle: 'Understand what Java does with inputs and calls', duration: 90,
    topics: ['Pass-by-value', 'Method signatures', 'Overloading', 'Scope'],
    alignment: ['CodeGym: Working with methods'],
    blocks: [
      { type: 'callout', id: 'd5n-intro', calloutType: 'info', title: 'Build on the Basics', content: 'You already know how to write and call a method. This lesson explains what Java does while that method runs. Take it one section at a time; you do not need to memorize every word before practicing.' },
      { type: 'heading', id: 'd5n-copy', level: 2, content: 'Java Copies the Input' },
      { type: 'paragraph', id: 'd5n-copy-p', content: 'Java is always **pass-by-value**. A method receives a copy of what you pass to it. With a number, the copy is easy to see: changing the copy does not change the original variable.' },
      { type: 'code', id: 'd5n-primitive', lang: 'java', title: 'A Primitive Value Is Copied', code: `public static void main(String[] args) {
    int number = 10;   // the original variable
    changeNumber(number);   // pass a copy of 10 into the method
    System.out.println(number);   // still 10 — the original is untouched
}

// 'value' is a COPY of the number we pass in. Two separate variables.
static void changeNumber(int value) {
    value = 99;        // changes only the local copy
}` },
      { type: 'callout', id: 'd5n-primitive-help', calloutType: 'tip', title: 'Output: 10', content: '`number` and `value` are two separate variables. The method changes its copy, so the original `number` stays 10.' },
      { type: 'heading', id: 'd5n-reference', level: 2, content: 'Arrays Use a Copied Reference' },
      { type: 'paragraph', id: 'd5n-reference-p', content: 'An array variable holds a **reference** that points to the array. Java copies that reference into the method. Both references point to the same array, so changing an element is visible outside the method. Java is still passing a value: the copied reference.' },
      { type: 'code', id: 'd5n-array', lang: 'java', title: 'Changing an Array Element', code: `public static void main(String[] args) {
    int[] numbers = {10, 20};   // one array in memory
    changeFirst(numbers);       // pass a copy of the reference
    System.out.println(numbers[0]);   // 99 — the array was edited
}

// 'values' is a COPY of the reference. Both refs still point to the SAME array.
static void changeFirst(int[] values) {
    values[0] = 99;   // edits the original array through the copied reference
}` },
      { type: 'table', id: 'd5n-copy-table', headers: ['What is passed?', 'Inside the method', 'Original after the call'], rows: [['A number', 'The copied number changes', 'The original number stays the same'], ['An array', 'The copied reference reaches the same array', 'An edited element is visible']] },
      { type: 'callout', id: 'd5n-memory', calloutType: 'note', title: 'The sentence to remember', content: 'Java never gives a method the original variable. It gives the method a copy. For an array, that copy still points to the same array.' },
      { type: 'heading', id: 'd5n-signature', level: 2, content: 'Method Signatures' },
      { type: 'paragraph', id: 'd5n-signature-p', content: 'A **method signature** is the method name plus the types and order of its parameters. The return type is not part of the signature. Java uses the signature to tell methods apart.' },
      { type: 'code', id: 'd5n-signature-code', lang: 'java', title: 'Two Different Signatures', code: `// Signature = name + parameter types. Return type is NOT part of it.
static int add(int first, int second) {        // signature: add(int, int)
    return first + second;
}

static double add(double first, double second) {   // signature: add(double, double)
    return first + second;
}

// Calling add(2, 3) hits the int version; calling add(2.0, 3.0) hits the double version.` },
      { type: 'table', id: 'd5n-signature-table', headers: ['Method', 'Signature'], rows: [['`add(int, int)`', 'Name `add`, then two `int` parameters'], ['`add(double, double)`', 'Name `add`, then two `double` parameters'], ['Same name and same parameter types', 'Same signature, even if return types differ']] },
      { type: 'heading', id: 'd5n-overload', level: 2, content: 'Overloading: One Name, Several Versions' },
      { type: 'paragraph', id: 'd5n-overload-p', content: '**Overloading** means writing methods with the same name but different parameter lists. Java looks at the arguments in the call and chooses the matching version. This happens at compile time.' },
      { type: 'code', id: 'd5n-overload-code', lang: 'java', title: 'Overloaded Methods', code: `public static void main(String[] args) {
    System.out.println(area(4));        // one arg  -> area(int)
    System.out.println(area(4, 6));     // two args -> area(int, int)
}

// Same name, different parameter lists. Java picks the matching version.
static int area(int side) {                 // square: one number
    return side * side;
}

static int area(int length, int width) {    // rectangle: two numbers
    return length * width;
}` },
      { type: 'callout', id: 'd5n-overload-help', calloutType: 'tip', title: 'How Java chooses', content: '`area(4)` matches the one-parameter version. `area(4, 6)` matches the two-parameter version. The method name stays the same because both methods calculate an area.' },
      { type: 'heading', id: 'd5n-scope', level: 2, content: 'Scope: Where a Variable Exists' },
      { type: 'paragraph', id: 'd5n-scope-p', content: 'A local variable belongs to the method where it is created. Another method cannot use that variable by name. Its value can leave through `return`, but the variable itself stays local.' },
      { type: 'code', id: 'd5n-scope-code', lang: 'java', title: 'A Local Variable', code: `public static void main(String[] args) {
    int result = makeScore();   // caller stores the returned value
    System.out.println(result);
}

// 'score' only exists inside makeScore. main cannot see it by name.
static int makeScore() {
    int score = 7;        // local to this method
    return score;         // the value escapes through return
}` },
      { type: 'callout', id: 'd5n-scope-help', calloutType: 'note', title: 'Think of a private workspace', content: 'Each method call gets its own workspace for parameters and local variables. When the method finishes, that workspace goes away. The returned value can still be stored by the caller.' },
      { type: 'callout', id: 'd5n-d1', calloutType: 'doubt', title: 'Is Java pass-by-reference?', content: 'No. Java is always pass-by-value. For objects and arrays, the copied value is a reference, which is why the method can change the object contents.' },
      { type: 'callout', id: 'd5n-d2', calloutType: 'doubt', title: 'Can I overload using only a different return type?', content: 'No. The parameter list must change. Java cannot choose between two methods from the return type because the return value is known after the call is chosen.' },
      { type: 'callout', id: 'd5n-d3', calloutType: 'doubt', title: 'When should I overload?', content: 'Overload when methods do the same kind of job but accept different input shapes, such as `area(4)` and `area(4, 6)`. Use a new method name when the job is different.' },
      { type: 'callout', id: 'd5n-exam', calloutType: 'exam', title: 'Next-Level Check', content: '1. Java is always pass-by-value.\n2. A signature includes the name and parameter types, not the return type.\n3. Overloading uses the same name with different parameters.\n4. Local variables belong only to the method that creates them.' },
      { type: 'callout', id: 'd5n-bridge', calloutType: 'bridge', title: 'Where This Leads', content: 'Overloading returns in **Polymorphism (Day 11)**. Method calls and local workspaces matter again in **Recursion (Day 17)**. Object references become easier to understand when you create classes on **Day 9**.' },
      { type: 'table', id: 'd5n-qref', headers: ['Concept', 'Remember'], rows: [['Pass-by-value', 'A method receives a copy of the input'], ['Array reference', 'The copied reference can still reach the same array'], ['Signature', 'Name + parameter types and order'], ['Overloading', 'Same name, different parameter list'], ['Scope', 'A local variable belongs to its method']] },
      { type: 'quiz', id: 'd5n-quiz', title: 'Next-Level Practice',
        questions: [
          { id: 'd5n-q1', question: 'What prints after changeNumber(number) changes its parameter to 99?', options: ['10', '99', '0', 'Compile error'], correctIndex: 0, explanation: 'The method changes a copy of number, so the original value is still 10.' },
          { id: 'd5n-q2', question: 'Why can a method change an array element even though Java uses pass-by-value?', options: ['Arrays are passed by reference', 'The copied reference points to the same array', 'Arrays are global', 'The JVM skips copying arrays'], correctIndex: 1, explanation: 'Java copies the reference value. Both the original and copied reference point to the same array object.' },
          { id: 'd5n-q3', question: 'Which part is not included in a method signature?', options: ['Method name', 'Parameter types', 'Parameter order', 'Return type'], correctIndex: 3, explanation: 'A signature uses the method name and parameter types in order. The return type is not included.' },
          { id: 'd5n-q4', question: 'What is method overloading?', options: ['Replacing a parent method', 'Same name with different parameter lists', 'Using many return statements', 'Calling a method from itself'], correctIndex: 1, explanation: 'Overloaded methods share a name but differ in the number, types, or order of their parameters.' },
        ],
      },
      { type: 'flashcard', id: 'd5n-cards', title: 'Next-Level Flashcards',
        cards: [
          { id: 'd5n-f1', front: 'What does pass-by-value mean?', back: 'The method receives a copy of the value passed to it. Changing a primitive parameter does not change the original variable.', hint: 'The method gets a copy...' },
          { id: 'd5n-f2', front: 'Why can an array change inside a method?', back: 'The copied reference still points to the same array, so editing an element is visible through the original reference.', hint: 'A copied pointer to the same array...' },
          { id: 'd5n-f3', front: 'What is a method signature?', back: 'The method name plus its parameter types and order. The return type is not part of it.', hint: 'Name plus parameters...' },
          { id: 'd5n-f4', front: 'What is overloading?', back: 'Using the same method name for different parameter lists so Java can choose the matching version.', hint: 'Same name, different inputs...' },
        ],
      },
      { type: 'practice', id: 'd5n-p1', lang: 'java', title: 'Practice: Watch the Copies', starter: `public class WatchCopies {
    public static void main(String[] args) {
        // TODO: call both methods, then print the originals after the call
    }

    static void bumpNumber(int value) {
        // TODO: change value and print the result inside the method
    }

    static void bumpFirst(int[] values) {
        // TODO: change values[0] and print the result inside the method
    }
}`, hint: 'Run, observe, and write down why the two behave differently.' },
      { type: 'practice', id: 'd5n-p2', lang: 'java', title: 'Practice: Three Forms of Average', starter: `public class ThreeAverages {
    public static void main(String[] args) {
        // TODO: call all three methods with the same two numbers and print the results
    }

    static int averageInt(int a, int b) {
        // TODO: return the integer average of a and b
        return 0;
    }

    static double averageDouble(double a, int b) {
        // TODO: return the decimal average of a and b
        return 0;
    }

    static int averageRounded(int a, int b) {
        // TODO: return the average rounded to the nearest whole number
        return 0;
    }
}`, hint: 'For 7 and 8, the three outputs should be 7, 7.5, and 8. Try different inputs to test your solutions.' },
      { type: 'practice', id: 'd5n-p3', lang: 'java', title: 'Practice: Overload Area', starter: `public class OverloadArea {
    public static void main(String[] args) {
        // TODO: call area(5) and area(5, 8). Print both results.
        // TODO: call area(3.5) — which version runs? why?
    }

    // TODO: write TWO overloaded methods:
    //   area(int side)           -> side * side (square)
    //   area(int length, int w)  -> length * w (rectangle)
    // Note: they share the name "area" but differ in parameters.
}`, hint: 'area(3.5) needs a double version to exist — with only int versions, 3.5 does not match area(int). Add area(double side) for it to compile.' },
      { type: 'practice', id: 'd5n-p4', lang: 'java', title: 'Practice: Scope Explorer', starter: `public class ScopeExplorer {
    public static void main(String[] args) {
        // TODO 1: call makeScore() and print the result
        // TODO 2: uncomment the line below — what error do you get?
        // System.out.println(score);
        // TODO 3: explain in a comment why "score" is invisible here
    }

    static int makeScore() {
        int score = 7;   // local to makeScore
        return score;
    }
}`, hint: 'score exists only inside makeScore. main cannot see it — the variable is out of scope. The returned value is what escapes, not the variable.' },
      { type: 'practice', id: 'd5n-p5', lang: 'java', title: 'Practice: Swap Two Values', starter: `public class SwapValues {
    public static void main(String[] args) {
        int a = 5;
        int b = 10;
        // TODO 1: call swap(a, b) — does a and b change? why or why not?
        // TODO 2: print a and b after the call and explain the result

        int[] pair = {5, 10};
        // TODO 3: call swapArray(pair) — does pair change? why?
        // TODO 4: print pair[0] and pair[1] after the call
    }

    static void swap(int x, int y) {
        int t = x; x = y; y = t;
    }

    static void swapArray(int[] arr) {
        int t = arr[0]; arr[0] = arr[1]; arr[1] = t;
    }
}`, hint: 'swap(a, b) swaps COPIES — a and b stay 5, 10. swapArray(pair) swaps the ACTUAL array elements — pair becomes [10, 5]. Pass-by-value vs copied reference.' },
      { type: 'practice', id: 'd5n-p6', lang: 'java', title: 'Practice: Trace the Calls', starter: `public class TraceCalls {
    public static void main(String[] args) {
        // TODO: predict the output of each println, then run and check.
        System.out.println(area(4));        // ?
        System.out.println(area(4, 6));     // ?
        System.out.println(add(1, 2));      // ?
        System.out.println(add(1.5, 2.5)); // ?
    }

    static int area(int side) { return side * side; }
    static int area(int length, int width) { return length * width; }
    static int add(int a, int b) { return a + b; }
    static double add(double a, double b) { return a + b; }

    // TODO: which method does add(1, 2) pick? which does add(1.5, 2.5) pick?
    // TODO: what if you call add(1, 2.5)? which version runs? (Java widens int -> double)
}`, hint: 'add(1, 2) -> int version (3). add(1.5, 2.5) -> double version (4.0). add(1, 2.5) widens 1 to 1.0 and runs the double version (3.5).' },
    ],
    tasks: [
      { id: 'java-14-d5-next-t1', text: 'Run the primitive and array copy examples. Explain why their original outputs differ.', tag: 'lab' },
      { id: 'java-14-d5-next-t2', text: 'Write two overloaded area methods: one for a square and one for a rectangle.', tag: 'lab' },
      { id: 'java-14-d5-next-t3', text: 'List the signatures of three methods and explain why return type is not part of a signature.', tag: 'drill' },
      { id: 'java-14-d5-next-t4', text: 'Explain where a local variable exists and what happens when its method finishes.', tag: 'review' },
    ],
  },

  // ======== DAY 6: Arrays & Strings ========
  {
    id: 'java-14-d6', number: 8,
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
      { type: 'callout', id: 'd6-arr-gotcha', calloutType: 'warn', title: 'Three Array Pitfalls', content: '1. **`ArrayIndexOutOfBoundsException`** — you tried to access an index that does not exist. `scores[5]` on a size-5 array crashes because valid indices are 0-4.\n2. **`.length` is a field, not a method** — write `arr.length`, never `arr.length()`. (Strings use `.length()` with parentheses — different thing!)\n3. **Arrays are objects** — if you pass an array to a method and that method changes an element, the original array IS changed. This surprises people when the methods lessons come back on Day 7.' },
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
      { type: 'callout', id: 'd6-d2', calloutType: 'doubt', title: "What's the fastest way to reverse a String?", content: 'Use `StringBuilder` (Day 13): `new StringBuilder(str).reverse().toString()`.\n\n**Never** reverse by concatenating characters in a loop — each `+` creates a new String object, making it O(n²). StringBuilder mutates a single buffer, giving O(n) performance.' },
      { type: 'callout', id: 'd6-d3', calloutType: 'doubt', title: 'What happens if I access arr[-1] or arr[arr.length]?', content: '**`ArrayIndexOutOfBoundsException` at runtime** — not at compile time! The compiler does not check index bounds. This is a common source of runtime crashes. Always verify before accessing: `if (index >= 0 && index < arr.length)`.' },
      // Exam Alert
      { type: 'callout', id: 'd6-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **String immutability** — #1 String theory question.\n2. **`==` vs `.equals()`** — #1 trick question. ALWAYS use `.equals()` for content.\n3. **Array defaults**: `int → 0`, `boolean → false`, `object → null`.\n4. **`arr.length` (field) vs `str.length()` (method)** — classic MCQ trap.' },
      // Bridge
      { type: 'callout', id: 'd6-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Arrays (fixed size) → **ArrayList (dynamic, Day 16)**. StringBuilder (briefly mentioned) → **Day 13 deep dive**. String immutability matters when using Strings as HashMap keys in collections.' },
      // Quick Ref
      { type: 'table', id: 'd6-qref', headers: ['Concept', 'Key Point'], rows: [['Array declaration', 'int[] arr = new int[n]; OR int[] arr = {1, 2, 3};'], ['Array access', '0-indexed. arr[0] = first, arr[arr.length-1] = last'], ['String immutability', 'Any modification creates a NEW String object'], ['== vs .equals()', '== compares reference. .equals() compares content. USE .equals().'], ['String pool', 'Literals go to the pool and are reused. `new String()` bypasses.']] },
      // Quiz
      { type: 'quiz', id: 'd6-quiz', title: 'Day 8 Quiz',
        questions: [
          { id: 'd6-q1', question: 'String s = "Hello"; s = s + " World"; How many String objects are created?', options: ['1', '2', '3', '0'], correctIndex: 2, explanation: 'Three: "Hello" (literal), " World" (literal), and "Hello World" (concatenation result). The original "Hello" is unchanged (immutable).' },
          { id: 'd6-q2', question: 'What does arr.length return for int[] arr = new int[5]?', options: ['4', '5', 'Compile error', 'Depends on values'], correctIndex: 1, explanation: '5. length is the capacity, not the last index. Valid indices are 0-4.' },
          { id: 'd6-q3', question: 'Which is correct: arr.length or arr.length()?', options: ['arr.length (field)', 'arr.length() (method)', 'Both work', 'Neither — use size()'], correctIndex: 0, explanation: 'Arrays use .length (a field). Strings use .length() (a method). Collections use .size() (a method). Three different syntaxes!' },
        ],
      },
      // Flashcards
      { type: 'flashcard', id: 'd6-cards', title: 'Day 8 Flashcards',
        cards: [
          { id: 'd6-f1', front: 'How to declare and initialize an array?', back: 'int[] arr = new int[5]; (all 0). int[] arr = {1,2,3}; (with values). Array size is FIXED after creation.', hint: 'new type[size]...' },
          { id: 'd6-f2', front: 'What does "Strings are immutable" mean?', back: 'Once created, a String object cannot be changed. Methods like concat(), replace(), substring() create NEW String objects — the original is untouched.', hint: 'Cannot be modified...' },
          { id: 'd6-f3', front: '== vs .equals() for Strings?', back: '== compares memory addresses (same object?). .equals() compares character content. Always use .equals() for String comparison. == only works for String pool literals.', hint: 'Reference vs content...' },
          { id: 'd6-f4', front: 'Name 6 essential String methods.', back: 'length(), charAt(), substring(), equals(), toLowerCase(), trim(), contains(), replace(), split(), indexOf(). Know what each returns and its parameters.', hint: 'length, charAt, substring, equals...' },
        ],
      },
      { type: 'practice', id: 'd6-p1', lang: 'java', title: 'Practice: Student Grade Analyzer', starter: 'public class GradeAnalyzer {\n    public static void main(String[] args) {\n        int[] scores = {85, 92, 78, 95, 88};\n        // TODO: sum, average, max, min\n        // TODO: count above average\n        String[] names = {"Alice","Bob","Charlie"};\n        // TODO: uppercase, count vowel-starting names\n    }\n}', hint: 'For max: init max = scores[0], loop. For vowels: "AEIOU".indexOf(name.charAt(0)) != -1.' },
      { type: 'practice', id: 'd6-p2', lang: 'java', title: 'Practice: Palindrome Checker', starter: 'public class Palindrome {\n    public static void main(String[] args) {\n        String s = "Race car";\n        // TODO: remove spaces, lowercase, check if reversed equals original\n        // Hint: use replaceAll, toLowerCase, StringBuilder reverse\n    }\n}', hint: 'Clean: s = s.replaceAll("[^a-zA-Z]", "").toLowerCase(). Reverse with StringBuilder. Compare with .equals().' },
      { type: 'practice', id: 'd6-p3', lang: 'java', title: 'Practice: Array Reverser', starter: 'public class ArrayReverser {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4, 5};\n\n        // TODO 1: print the array FORWARD\n        // TODO 2: print the array BACKWARD (do not change the array)\n        // TODO 3: now REVERSE the array in place (swap first with last)\n        //         hint: swap nums[i] with nums[nums.length - 1 - i]\n        //         stop halfway! what happens if you loop all the way?\n        // TODO 4: print the reversed array\n    }\n}', hint: 'Reverse loop: for (int i = nums.length - 1; i >= 0; i--). In-place: loop i < nums.length / 2 and swap with a temp variable.' },
      { type: 'practice', id: 'd6-p4', lang: 'java', title: 'Practice: String Method Lab', starter: 'public class StringLab {\n    public static void main(String[] args) {\n        String s = "  Java Programming  ";\n\n        // TODO 1: print the length of s\n        // TODO 2: print s trimmed (remove leading/trailing spaces)\n        // TODO 3: print s in uppercase, then lowercase\n        // TODO 4: print the first 4 characters (substring)\n        // TODO 5: does s contain "gram"? print true/false\n        // TODO 6: replace "Java" with "Python" and print\n        // TODO 7: split s into words and print each on its own line\n        //         (hint: trim first, then split(" "))\n    }\n}', hint: 'trim() -> "Java Programming". substring(0,4) -> "Java". contains("gram") -> true. replace -> "Python Programming". split: String[] words = s.trim().split(" ");' },
      { type: 'practice', id: 'd6-p5', lang: 'java', title: 'Practice: Count Letters', starter: 'public class CountLetters {\n    public static void main(String[] args) {\n        String text = "Java is fun to learn";\n\n        // TODO 1: count how many times the letter \'a\' appears\n        //         (use a loop with charAt, or replace trick:\n        //          text.length() - text.replace("a", "").length())\n\n        // TODO 2: count total vowels (a, e, i, o, u) — case insensitive\n        // TODO 3: count words (split on spaces)\n        // TODO 4: count characters ignoring spaces\n    }\n}', hint: 'Vowel check: "aeiouAEIOU".indexOf(text.toLowerCase().charAt(i)) != -1. Words: text.split(" ").length. No-spaces length: text.replace(" ", "").length().' },
      { type: 'practice', id: 'd6-p6', lang: 'java', title: 'Practice: Equal or Not', starter: 'public class EqualOrNot {\n    public static void main(String[] args) {\n        String s1 = "hello";\n        String s2 = "hello";\n        String s3 = new String("hello");\n        String s4 = "HELLO";\n\n        // TODO 1: predict each line, then run:\n        System.out.println(s1 == s2);        // ? (pool reuse)\n        System.out.println(s1 == s3);        // ? (new object)\n        System.out.println(s1.equals(s3));   // ? (content)\n        System.out.println(s1.equals(s4));   // ? (case-sensitive)\n        System.out.println(s1.equalsIgnoreCase(s4)); // ? (case-insensitive)\n\n        // TODO 2: explain each result in a comment\n        // TODO 3: which comparisons would you use in real code?\n    }\n}', hint: 's1==s2 true (pool). s1==s3 false (new). equals true. equals(s4) false (case). equalsIgnoreCase true. Use .equals() in real code.' },
    ],
    tasks: [
      { id: 'java-14-d6-t1', text: 'Array of 10 scores: calculate sum, average, max, min.', tag: 'lab' },
      { id: 'java-14-d6-t2', text: 'Full name → print length, first name, last name, initials.', tag: 'lab' },
      { id: 'java-14-d6-t3', text: 'Demonstrate String immutability: show concat() does not change original.', tag: 'drill' },
      { id: 'java-14-d6-t4', text: 'Explain == vs .equals(). Write code that demonstrates both.', tag: 'review' },
    ],
  },
];
