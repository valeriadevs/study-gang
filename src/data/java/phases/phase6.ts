import type { Day } from '../../../types';

export const phase6days: Day[] = [
// ================================================================
  // DAY 15: Linear Recursion — One Call, One Stack Frame at a Time
  // ================================================================
  {
    id: 'java-14-d15', number: 21,
    title: 'Linear Recursion',
    subtitle: 'One recursive call, one simpler input',
    duration: 90,
    topics: ['Recursion', 'Base Case', 'Recursive Case', 'Call Stack', 'Linear Patterns', 'Tail Recursion'],
    alignment: ['Codecademy: Recursion'],
    blocks: [
      { type: 'callout', id: 'd15-intro', calloutType: 'info', title: 'One recursive call at a time', content: '**Recursion** is when a method calls itself to solve a smaller version of the same problem. Today you learn the bones: the base case (when to stop), the recursive case (how to reduce), and how the JVM call stack grows as recursion unfolds. We focus on **linear recursion** (one recursive call per invocation) and a few classic linear problems. Tomorrow (Day 22) we go to the heavier stuff: binary recursion (two recursive calls), divide-and-conquer, backtracking, and the call-stack effects you have to think about.' },
      { type: 'heading', id: 'd15-what', level: 2, content: 'What Is Recursion?' },
      { type: 'paragraph', id: 'd15-def', content: 'A recursive method has TWO essential parts:\n\n- **Base case** — the simplest input that stops the recursion. Without this, you get infinite recursion — StackOverflowError.\n- **Recursive case** — calls itself with a **smaller / simpler** input, moving toward the base case.' },
      { type: 'code', id: 'd15-structure', lang: 'java', title: 'Recursion Anatomy', code: '// Template for every recursive method\nreturnType recursiveMethod(parameters) {\n    if (baseCondition) {        // BASE CASE — stop here\n        return baseValue;\n    }\n    // RECURSIVE CASE — call self with reduced input\n    return recursiveMethod(smallerInput);\n}' },
      { type: 'heading', id: 'd15-fact', level: 2, content: 'Factorial — The Classic Example' },
      { type: 'code', id: 'd15-fact-code', lang: 'java', title: 'Factorial: Iterative vs Recursive', code: '// Iterative (loop)\nstatic int factorialLoop(int n) {\n    int result = 1;\n    for (int i = 1; i <= n; i++) result *= i;\n    return result;\n}\n\n// Recursive\nstatic int factorial(int n) {\n    if (n <= 1) return 1;              // base case\n    return n * factorial(n - 1);       // recursive case\n}\n// factorial(5) = 5 * factorial(4)\n//              = 5 * 4 * factorial(3)\n//              = 5 * 4 * 3 * factorial(2)\n//              = 5 * 4 * 3 * 2 * factorial(1)\n//              = 5 * 4 * 3 * 2 * 1 = 120' },
      { type: 'callout', id: 'd15-stack', calloutType: 'tip', title: 'Visualizing the Call Stack', content: 'When `factorial(5)` runs:\n\n1. Call `f(5)` — pushes a frame. Needs `f(4)`.\n2. Call `f(4)` — pushes a frame. Needs `f(3)`.\n3. ...\n4. Call `f(1)` — base case! Returns 1.\n5. `f(2)` frame: gets 1, returns 2*1=2. Pops.\n6. `f(3)` frame: gets 2, returns 3*2=6. Pops.\n7. ...\n8. `f(5)` frame: gets 24, returns 5*24=120. Pops.\n\n**Key insight**: each recursive call creates a NEW stack frame. The stack GROWS until the base case, then UNWINDS.' },
      { type: 'callout', id: 'd15-fib-warn', calloutType: 'warn', title: 'When Recursion Goes Wrong — StackOverflowError', content: 'Every recursive call consumes stack memory (~1KB per frame). The default stack size is ~1MB. That means:\n\n- ~1000 recursive calls before StackOverflowError.\n- `factorial(10000)` = 10000 stack frames = 💥 StackOverflowError.\n- Deep recursion requires tail-call optimization, which Java does NOT have (yet).\n\n**Rule**: recursion depth > 1000 — use iteration or a trampoline pattern. For shallow recursion (tree depth < 20), recursive code is clearer.' },
      { type: 'heading', id: 'd15-patterns', level: 2, content: 'Linear Patterns — One Recursive Call' },
      { type: 'code', id: 'd15-examples', lang: 'java', title: 'Linear Pattern Library', code: '// 1. LINEAR: Sum of array\nstatic int sum(int[] arr, int n) {\n    if (n <= 0) return 0;           // base: empty array\n    return arr[n-1] + sum(arr, n-1); // last element + sum of rest\n}\n\n// 2. LINEAR: Reverse a string\nstatic String reverse(String s) {\n    if (s.isEmpty()) return s;       // base: empty string\n    return reverse(s.substring(1)) + s.charAt(0);\n}\n\n// 3. LINEAR: Check palindrome\nstatic boolean isPalindrome(String s, int l, int r) {\n    if (l >= r) return true;         // base: crossed midpoint\n    if (s.charAt(l) != s.charAt(r)) return false;\n    return isPalindrome(s, l + 1, r - 1);\n}\n\n// 4. LINEAR: Count digits\nstatic int countDigits(int n) {\n    if (n < 10) return 1;            // base: single digit\n    return 1 + countDigits(n / 10);   // recursive\n}' },
      { type: 'heading', id: 'd15-gcd', level: 2, content: 'Euclidean Algorithm — The Perfect Linear Recursion' },
      { type: 'code', id: 'd15-gcd-code', lang: 'java', title: 'GCD (Greatest Common Divisor)', code: '// Euclid\'s algorithm (300 BC) — recursion at its finest\nstatic int gcd(int a, int b) {\n    if (b == 0) return a;            // base case\n    return gcd(b, a % b);            // tail-recursive!\n}\n// gcd(48, 18) = gcd(18, 48%18=12)\n//             = gcd(12, 18%12=6)\n//             = gcd(6, 12%6=0) = 6\n\n// LCM using GCD\nstatic int lcm(int a, int b) {\n    return (a * b) / gcd(a, b);\n}' },
      // Doubt
      { type: 'callout', id: 'd15-d1', calloutType: 'doubt', title: 'Recursion vs Iteration — which should I use?', content: '**Use recursion when**:\n\n- The problem is naturally recursive (trees, graphs, divide-and-conquer).\n- Code clarity matters more than performance.\n- Recursion depth is small (< 1000).\n\n**Use iteration when**:\n\n- Performance is critical (Fib(50) iteratively vs recursively).\n- Depth could be large (processing large arrays/lists).\n- Stack memory is constrained.\n\n**Exam tip**: both can solve the same problems. Recursion is often more elegant but uses more memory. This tradeoff is tested in theory questions.' },
      { type: 'callout', id: 'd15-d2', calloutType: 'doubt', title: 'What is tail recursion and why does Java not optimize it?', content: '**Tail recursion** — the recursive call is the LAST operation (no pending work after).\n\n```java\n// Tail-recursive (gcd example above)\nreturn gcd(b, a % b);  // nothing after the call\n\n// NOT tail-recursive (factorial)\nreturn n * factorial(n - 1);  // multiplication after call returns\n```\n\nLanguages like Scala and Kotlin optimize tail recursion to avoid stack growth. Java does NOT (yet). It is on the roadmap but not implemented. For deep recursion in Java, use iteration or a custom stack.' },
      // Exam
      { type: 'callout', id: 'd15-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Base case is mandatory** — missing base case = StackOverflowError. Guaranteed MCQ.\n2. **Factorial recursively** — most common 5-mark coding question.\n3. **StackOverflowError cause** — too many recursive calls (deep recursion).\n4. **Tail recursion** — the recursive call is the LAST operation. Java does NOT optimize it.\n5. **Linear recursion** — one recursive call per invocation. Easy to analyse.' },
      // Bridge
      { type: 'callout', id: 'd15-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Recursion uses the call stack (Day 1, Day 7). The call stack depth limit is why deep recursion fails (Day 17 — Exceptions). Recursive thinking is essential for tree traversal, graph algorithms, and the Collections framework internals.\n\nTomorrow (Day 22) is the heavier half: **binary recursion** (two recursive calls per invocation), the O(2^n) Fibonacci trap, divide-and-conquer patterns (merge sort, binary search recursion), backtracking, and how to think about stack frames for branching recursion.' },
      // Quick Ref
      { type: 'table', id: 'd15-qref', headers: ['Concept', 'Key Point'], rows: [
        ['Base case', 'MUST exist. Stops recursion. Missing = StackOverflowError.'],
        ['Recursive case', 'Calls self with smaller input. Must move toward base case.'],
        ['Factorial (rec)', 'O(n) time, O(n) stack space. Clean but space-heavy.'],
        ['GCD (Euclidean)', 'Tail-recursive. O(log min(a,b)) depth. Fast even on huge inputs.'],
        ['StackOverflowError', 'Too many recursive calls. Default ~1000 depth limit.'],
        ['Tail recursion', 'Recursive call is the last operation. Java does NOT optimize.'],
        ['Linear recursion', 'One recursive call. Stack depth = number of calls.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd15-quiz', title: 'Day 21 Quiz', questions: [
        { id: 'd15-q1', question: 'What happens if a recursive method has no base case?', options: ['It returns 0', 'It compiles but runs forever until StackOverflowError', 'Compiler rejects it', 'It runs correctly once'], correctIndex: 1, explanation: 'Without a base case, recursion never stops. The call stack grows until it exceeds the JVM limit (~1MB), causing a StackOverflowError.' },
        { id: 'd15-q2', question: 'Which of these is a valid base case for factorial?', options: ['if (n == 0) return 0;', 'if (n <= 1) return 1;', 'return n * factorial(n);', 'if (n > 0) return n;'], correctIndex: 1, explanation: 'n <= 1 returns 1 — factorial(0)=1 and factorial(1)=1. The base case must return a concrete value without further recursion.' },
        { id: 'd15-q3', question: 'What is the time complexity of recursive GCD (Euclidean algorithm)?', options: ['O(n)', 'O(log min(a,b))', 'O(n^2)', 'O(1)'], correctIndex: 1, explanation: 'Euclidean algorithm reduces the problem size by roughly half each step (a % b < a/2). O(log min(a,b)) — very fast.' },
        { id: 'd15-q4', question: 'Which is tail-recursive?', options: ['return n * factorial(n - 1);', 'return gcd(b, a % b);', 'return reverse(s.substring(1)) + s.charAt(0);', 'return 1 + countDigits(n / 10);'], correctIndex: 1, explanation: 'gcd has nothing after the recursive call. factorial multiplies after. reverse concatenates after. countDigits adds 1 after.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd15-cards', title: 'Day 21 Flashcards', cards: [
        { id: 'd15-f1', front: 'Two essential parts of a recursive method?', back: '1. BASE CASE: stops recursion. Missing it = StackOverflowError. 2. RECURSIVE CASE: calls itself with smaller input, moving toward base case. Both are mandatory for correct recursion.', hint: 'Stop condition + self-call...' },
        { id: 'd15-f2', front: 'What does the call stack do during recursion?', back: 'Each recursive call pushes a NEW frame with its parameters and local variables. The stack GROWS until the base case, then UNWINDS as each frame returns its value to the caller above.', hint: 'Grows then unwinds...' },
        { id: 'd15-f3', front: 'Tail-recursive example?', back: 'gcd(b, a % b) — the recursive call is the LAST operation, no work after. Compiler could optimize it to a loop, but Java does NOT (yet). factorial is NOT tail-recursive because n * factorial(n-1) has multiplication after the call.', hint: 'Call is the last thing...' },
        { id: 'd15-f4', front: 'StackOverflowError — cause and fix?', back: 'Cause: too many recursive calls (~1000+). Stack frames consume all stack memory. Fix: convert to iteration, use tail recursion (where optimized), or increase stack size (-Xss JVM flag — not recommended).', hint: 'Stack memory exhausted...' },
      ] },
      // Practices (6, at end of day)
      { type: 'practice', id: 'd15-p1', lang: 'java', title: 'Practice: sumOfArray recursively', starter: `public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        // TODO 1: call sumOfArray(arr) and print the result (expect 15)
        // TODO 2: test on an empty int[] {} (expect 0)
        // TODO 3: test on int[] {-5, 5, -2} (expect -2)
    }
    // TODO 4: implement static int sumOfArray(int[] arr) using recursion
    //   What is the smallest array? What should it return?
    //   Otherwise: split off ONE element and recurse on the rest.
    //   Hint: the LAST element + the sum of everything before it.
    //   bonus: avoid copying the array each call by passing (arr, index) instead
}` },
      { type: 'practice', id: 'd15-p2', lang: 'java', title: 'Practice: reverseString', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: reverseString("hello") -> "olleh"
        // TODO 2: reverseString("Vinayak") -> "kayaniV"
        // TODO 3: reverseString("") -> ""
        // TODO 4: reverseString("a") -> "a"
    }
    // TODO 5: implement static String reverseString(String s) recursively
    //   What string is its own reverse (base case)? What does it return?
    //   Otherwise: take the LAST character, put it FIRST, then reverse the remaining prefix.
}` },
      { type: 'practice', id: 'd15-p3', lang: 'java', title: 'Practice: isPalindrome', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: isPalindrome("racecar") -> true
        // TODO 2: isPalindrome("hello")   -> false
        // TODO 3: isPalindrome("a")       -> true
        // TODO 4: isPalindrome("")        -> true
        // TODO 5: isPalindrome("abba")    -> true (even length)
    }
    // TODO 6: implement static boolean isPalindrome(String s) using recursion
    //   When is a string ALWAYS a palindrome (base case)?
    //   Otherwise: compare the FIRST and LAST characters.
    //   If they differ -> false. If they match -> recurse on WHAT?
    //   Tip: a helper with (s, left, right) indices avoids substring copying
}` },
      { type: 'practice', id: 'd15-p4', lang: 'java', title: 'Practice: Trace factorial(5) on paper', starter: `public class Test {
    public static void main(String[] args) {
        // No TODO here. Just run, then explain.
        System.out.println("Before call");
        int result = factorial(5);
        System.out.println("Result: " + result);
        System.out.println("After call returns");
    }
    // TODO: in a comment in main, write down the exact order of prints
    //       including any prints you might ADD inside factorial to trace it.
    //       Then run and verify your prediction.
    // Hint: think about what prints BEFORE the call returns, and what prints
    //       AFTER the recursive call completes.
    static int factorial(int n) {
        System.out.println("factorial called with n = " + n);
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}` },
      { type: 'practice', id: 'd15-p5', lang: 'java', title: 'Practice: countDigits recursively', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: countDigits(0)   -> 1 (special case: 0 is one digit)
        // TODO 2: countDigits(7)   -> 1
        // TODO 3: countDigits(42)  -> 2
        // TODO 4: countDigits(12345) -> 5
        // TODO 5: countDigits(-123) -> 3 (handle negatives by stripping the sign)
    }
    // TODO 6: implement static int countDigits(int n) recursively
    //   What single-digit input stops the recursion (base case)?
    //   Otherwise: how do you remove one digit, then count the rest + 1?
    //   Hint for negatives: what does -n give you?
}` },
      { type: 'practice', id: 'd15-p6', lang: 'java', title: 'Practice: power + GCD pair', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: power(2, 10)  -> 1024
        // TODO 2: power(3, 0)   -> 1
        // TODO 3: power(5, -2)  -> 0.04 (handle negative exponent)
        // TODO 4: gcd(48, 18)   -> 6
        // TODO 5: gcd(1071, 462) -> 21
        // TODO 6: lcm(4, 6)     -> 12 (use gcd to compute)
    }
    // TODO 7: implement power(double x, int n) recursively
    // TODO 8: implement gcd(int a, int b) recursively (Euclidean)
    // TODO 9: implement lcm(int a, int b) using gcd
}` },
    ],
    tasks: [
      { id: 'java-14-d15-t1', text: 'Write recursive methods: factorial, power(x,n), sum of array, reverse string. Identify base + recursive case in each.', tag: 'lab' },
      { id: 'java-14-d15-t2', text: 'Trace factorial(5) on paper: list every stack frame and every return value. Run it to verify.', tag: 'drill' },
      { id: 'java-14-d15-t3', text: 'Implement GCD using Euclidean algorithm recursively. Test with (48,18), (1071,462).', tag: 'lab' },
      { id: 'java-14-d15-t4', text: 'Convert a for-loop sum/reverse/palindrome to recursion. Feel the difference in code length and clarity.', tag: 'lab' },
      { id: 'java-14-d15-t5', text: 'Explain: what makes a recursive method tail-recursive? Why does Java not optimize tail calls?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 15-NEXT: Binary Recursion and Stack Effects
  // ================================================================
  {
    id: 'java-14-d15-next', number: 22,
    title: 'Binary Recursion & Stack Effects',
    subtitle: 'Two recursive calls, exponential trees, and how to think about the stack',
    duration: 90,
    topics: ['Binary Recursion', 'Fibonacci Trap', 'Memoization', 'Divide and Conquer', 'Backtracking', 'Tree Traversal'],
    alignment: ['GeeksForGeeks: Recursion in Java'],
    blocks: [
      { type: 'callout', id: 'd15n-intro', calloutType: 'info', title: 'When recursion multiplies', content: 'Yesterday you saw **linear** recursion: one recursive call per invocation. Today the picture gets heavier. **Binary recursion** makes TWO recursive calls per invocation, which means the call tree explodes fast. You will see why naive Fibonacci is O(2^n) and how memoization tames it. You will write merge sort (the classic divide-and-conquer). You will try a tiny backtracking problem (4-Queens). And you will think carefully about what the call stack is doing when recursion branches.' },
      { type: 'heading', id: 'd15n-fib', level: 2, content: 'Fibonacci — The Binary Recursion Trap' },
      { type: 'code', id: 'd15n-fib-code', lang: 'java', title: 'Naive vs Memoized Fibonacci', code: '// 💥 NAIVE: O(2^n) — terrible! Redundant calculations explode.\nstatic int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);    // TWO recursive calls\n}\n// fib(50) = ~2^50 operations — will take YEARS!\n\n// ✅ MEMOIZED: O(n) — cache results\nstatic long fibMemo(int n, long[] memo) {\n    if (n <= 1) return n;\n    if (memo[n] != 0) return memo[n];  // already computed?\n    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n    return memo[n];\n}\n\n// ✅ ITERATIVE: O(n), O(1) space — best for Fibonacci\nstatic long fibIter(int n) {\n    if (n <= 1) return n;\n    long a = 0, b = 1;\n    for (int i = 2; i <= n; i++) {\n        long temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n}' },
      { type: 'callout', id: 'd15n-tree', calloutType: 'warn', title: 'Why O(2^n)? The recursion tree', content: 'Draw the call tree for `fib(5)`:\n\n```\n              fib(5)\n            /        \\\n        fib(4)         fib(3)\n       /     \\\\       /    \\\\\n    fib(3) fib(2)  fib(2) fib(1)\n   /  \\\\   /  \\\\   /  \\\\    |\nfib(2) f(1) f(1) f(0) f(1) f(0)\n |    |    |    |    |    |\nf(1) f(0)  1    0    1    0\n```\n\n`fib(3)` is computed TWICE. `fib(2)` is computed THREE TIMES. `fib(1)` is computed FIVE TIMES. At fib(n), the same values get computed exponentially many times. Memoization kills the redundancy: each value is computed ONCE, then cached. Naive is O(2^n), memoized is O(n).' },
      { type: 'callout', id: 'd15n-stack', calloutType: 'tip', title: 'Visualising the call tree for Fibonacci(5). Notice fib(3) appears twice, fib(2) three times.', content: 'See the tree above. Every level roughly DOUBLES the number of calls. fib(n) makes ~2^n calls. fib(50) would make ~10^15 calls — centuries of CPU time. **Memoization** turns this into n calls by caching fib(k) the first time you compute it.' },
      { type: 'heading', id: 'd15n-dc', level: 2, content: 'Divide and Conquer — Merge Sort' },
      { type: 'paragraph', id: 'd15n-dc-p', content: 'Divide and conquer = split the problem into smaller pieces, recurse on each piece, then combine. The merge sort below splits the array in half, sorts each half recursively, and merges the two sorted halves back together. Three recursive calls if you count the merge step carefully, but the **recursive sort step** is two binary calls.' },
      { type: 'code', id: 'd15n-merge-code', lang: 'java', title: 'Merge Sort — Recursive Divide and Conquer', code: '// Merge sort: split, recurse, merge\nstatic int[] mergeSort(int[] arr) {\n    if (arr.length <= 1) return arr;  // base: 0 or 1 elements already sorted\n    int mid = arr.length / 2;\n    int[] left = Arrays.copyOfRange(arr, 0, mid);\n    int[] right = Arrays.copyOfRange(arr, mid, arr.length);\n    return merge(mergeSort(left), mergeSort(right));  // TWO recursive calls\n}\n\nstatic int[] merge(int[] a, int[] b) {\n    int[] result = new int[a.length + b.length];\n    int i = 0, j = 0, k = 0;\n    while (i < a.length && j < b.length) {\n        if (a[i] <= b[j]) result[k++] = a[i++];\n        else result[k++] = b[j++];\n    }\n    while (i < a.length) result[k++] = a[i++];\n    while (j < b.length) result[k++] = b[j++];\n    return result;\n}\n// mergeSort is O(n log n) — classic divide-and-conquer complexity.' },
      { type: 'heading', id: 'd15n-tree', level: 2, content: 'Tree Traversal — Recursive Descent' },
      { type: 'code', id: 'd15n-tree-code', lang: 'java', title: 'Binary Tree Recursive Traversal', code: 'class Node {\n    int value;\n    Node left, right;\n    Node(int v) { value = v; }\n}\n\n// Pre-order: root, left, right\nstatic void preorder(Node n) {\n    if (n == null) return;          // base case: empty subtree\n    System.out.print(n.value + " "); // visit root\n    preorder(n.left);                // recurse left\n    preorder(n.right);               // recurse right\n}\n\n// In-order: left, root, right  (gives sorted output for a BST)\nstatic void inorder(Node n) {\n    if (n == null) return;\n    inorder(n.left);\n    System.out.print(n.value + " ");\n    inorder(n.right);\n}\n\n// Post-order: left, right, root  (use for deleting a tree)\nstatic void postorder(Node n) {\n    if (n == null) return;\n    postorder(n.left);\n    postorder(n.right);\n    System.out.print(n.value + " ");\n}' },
      { type: 'heading', id: 'd15n-bt', level: 2, content: 'Backtracking — Try, Recurse, Undo' },
      { type: 'paragraph', id: 'd15n-bt-p', content: 'Backtracking = try a choice, recurse on the smaller problem, UNDO the choice if it did not work. The classic example: place 4 queens on a 4x4 board so none attack each other. Try row 0 col 0, recurse on row 1, if no safe column there, undo and try the next column.' },
      { type: 'code', id: 'd15n-bt-code', lang: 'java', title: '4-Queens Backtracking (Simplified)', code: '// Solve the 4-queens problem on a 4x4 board\nstatic int[] board = new int[4];  // board[row] = column\n\nstatic boolean solve(int row) {\n    if (row == 4) return true;  // base: all rows placed safely\n    for (int col = 0; col < 4; col++) {\n        if (isSafe(row, col)) {\n            board[row] = col;        // try this column\n            if (solve(row + 1)) return true;  // recurse on next row\n            board[row] = -1;        // UNDO (backtrack) — no safe placement\n        }\n    }\n    return false;  // no column worked\n}\n\nstatic boolean isSafe(int row, int col) {\n    for (int i = 0; i < row; i++) {\n        if (board[i] == col) return false;                       // same column\n        if (Math.abs(board[i] - col) == Math.abs(i - row)) return false;  // diagonal\n    }\n    return true;\n}\n// solve() returns true when all 4 queens are placed. board[] then holds the solution columns.' },
      // Doubt
      { type: 'callout', id: 'd15n-d1', calloutType: 'doubt', title: 'When does the call stack get really deep for binary recursion?', content: 'Binary recursion depth = tree HEIGHT. For a balanced binary tree of n nodes, height = O(log n). So merge sort on 1 million items has only ~20 stack frames at a time.\n\nBut for **skewed** binary recursion (every call only goes one way), depth = number of nodes. Worst case: fib(50) builds a tree ~50 deep on one side, but it spawns 2^50 nodes total.\n\n**Rule**: stack depth = the longest path from root to leaf in the call tree. If your recursion branches and one branch always picks one side, depth = total nodes in that branch.' },
      { type: 'callout', id: 'd15n-d2', calloutType: 'doubt', title: 'Memoization vs iteration for Fibonacci — which wins?', content: '**Iteration wins on speed and memory.** O(n) time, O(1) space, no function call overhead, no cache lookups. For just computing fib(n), use the loop.\n\n**Memoization wins on readability when the recursion has structure.** If you are computing fib values for many different subproblems (DP), memoization is the natural fit.\n\n**Recursion wins when the problem IS the recursion.** Tree traversal, divide-and-conquer, backtracking — these are recursive by nature and writing them iteratively is contortion. Use memoization if the same subproblem repeats.' },
      // Exam
      { type: 'callout', id: 'd15n-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Fibonacci naive time complexity** — O(2^n). Know why (redundant subproblems).\n2. **Memoization** — cache results to avoid recomputation. Turns O(2^n) into O(n).\n3. **Merge sort complexity** — O(n log n). Divide-and-conquer classic.\n4. **Binary recursion depth** — height of the call tree, NOT the number of nodes.\n5. **Backtracking pattern** — try, recurse, undo. 4-Queens is the classic example.' },
      // Bridge
      { type: 'callout', id: 'd15n-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Naive Fibonacci is O(2^n) because of redundant calls — the same idea behind why memoization matters in dynamic programming. Merge sort is divide-and-conquer, the foundation of O(n log n) algorithms. Tree traversals (pre/in/post-order) are how every tree-based data structure works underneath: BSTs, Heaps, ASTs.\n\nTomorrow (Day 24) is the **Enums Deep Dive** — enum-as-class, enum Singleton, constant-specific method bodies. The contrast between linear recursion here and the declarative power of Java\'s enum machinery is striking: both handle "a fixed set of cases" elegantly.' },
      // Quick Ref
      { type: 'table', id: 'd15n-qref', headers: ['Concept', 'Key Point'], rows: [
        ['Binary recursion', 'Two recursive calls per invocation. Stack depth = tree height.'],
        ['Fibonacci (naive)', 'O(2^n) — redundant subproblems explode.'],
        ['Fibonacci (memoized)', 'O(n) — cache results in an array.'],
        ['Fibonacci (iterative)', 'O(n) time, O(1) space. Best when no recursion needed.'],
        ['Divide & conquer', 'Split, recurse, combine. Merge sort = O(n log n).'],
        ['Tree traversal', 'Pre/in/post-order, all recursive. Depth = tree height.'],
        ['Backtracking', 'Try, recurse, UNDO. 4-Queens, Sudoku, maze solving.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd15n-quiz', title: 'Day 22 Quiz', questions: [
        { id: 'd15n-q1', question: 'Why is naive recursive Fibonacci O(2^n)?', options: ['It uses a loop', 'It recomputes the same subproblems many times', 'It uses extra memory', 'It does not use recursion'], correctIndex: 1, explanation: 'fib(n) = fib(n-1) + fib(n-2) computes fib(n-2) TWICE — once in each branch. This redundancy grows exponentially with n.' },
        { id: 'd15n-q2', question: 'What does memoization turn Fibonacci into?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(2^n) (still)'], correctIndex: 2, explanation: 'Each value fib(0)...fib(n) is computed exactly once and cached. Total work = O(n) time + O(n) memory.' },
        { id: 'd15n-q3', question: 'What is the time complexity of merge sort?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'], correctIndex: 1, explanation: 'Merge sort splits the array in half log(n) times and merges in O(n) at each level. Total: O(n log n). Classic divide-and-conquer.' },
        { id: 'd15n-q4', question: 'In backtracking, why do you "undo" a choice after the recursive call returns?', options: ['To free memory', 'So the NEXT iteration of the loop can try a different choice from the same state', 'Because the JVM requires it', 'It is a coding style preference'], correctIndex: 1, explanation: 'The loop tries each possible choice. After recursing on choice X, you must UNDO it so the next loop iteration can try choice Y from the SAME starting state. This is the whole "backtrack" mechanic.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd15n-cards', title: 'Day 22 Flashcards', cards: [
        { id: 'd15n-f1', front: 'Why naive Fibonacci is O(2^n)?', back: 'fib(n) = fib(n-1) + fib(n-2). The same subproblems (fib(3), fib(2), fib(1)) are computed exponentially many times. Memoization caches each value in an array — first call computes and stores, later calls just read.', hint: 'Redundant subproblems...' },
        { id: 'd15n-f2', front: 'Divide and conquer?', back: 'Split the problem into smaller pieces (often halves), recurse on each piece, then combine the results. Merge sort: split array in half, sort each half recursively, merge the two sorted halves. Complexity: O(n log n) for merge sort.', hint: 'Split, recurse, combine...' },
        { id: 'd15n-f3', front: 'Backtracking pattern?', back: 'Try a choice, recurse on the smaller problem, UNDO the choice if it did not lead to a solution, then try the next choice. The undo is the key — it lets the next loop iteration try a different choice from the same starting state.', hint: 'Try, recurse, undo...' },
        { id: 'd15n-f4', front: 'Stack depth for binary recursion?', back: 'Stack depth = height of the call tree, NOT the number of nodes. Balanced binary tree of n nodes has height O(log n). Skewed "all-one-side" recursion has depth = number of nodes. fib(50) is roughly 50 deep on the spine but spawns ~2^50 total calls.', hint: 'Tree height, not count...' },
      ] },
      // Practices (6, at end of day)
      { type: 'practice', id: 'd15n-p1', lang: 'java', title: 'Practice: fibMemo with cached results', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: print fibMemo(0) through fibMemo(10)
        //         0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
        // TODO 2: time fibMemo(40) vs naive fib(40) — the memoized version should finish in microseconds
        // TODO 3: time naive fib(40) — expect a noticeable delay (no memoization)
        // TODO 4: try naive fib(50) — expect a long pause (or StackOverflowError on small stack)
    }
    // TODO 5: implement static long fibMemo(int n, long[] memo)
    //   think: what stops the recursion (base case)?
    //   how do you CHECK the cache before computing?
    //   how do you STORE a result once computed?
    //   (two recursive calls, like naive fib, but cached)
    // TODO 6: implement static int fib(int n) (the naive version for comparison)
    // TODO 7: in main, initialise memo as new long[50+1] before calling fibMemo
}` },
      { type: 'practice', id: 'd15n-p2', lang: 'java', title: 'Practice: mergeSort from scratch', starter: `public class Test {
    public static void main(String[] args) {
        int[] arr = {5, 2, 8, 1, 9, 3, 7, 4, 6};
        // TODO 1: print the array before sorting
        // TODO 2: call mergeSort(arr) and print the result (expect 1,2,3,4,5,6,7,8,9)
        // TODO 3: try with an already-sorted array {1,2,3,4,5}
        // TODO 4: try with an empty array {} and a single-element array {42}
    }
    // TODO 5: implement static int[] mergeSort(int[] arr) recursively
    //   think: when is an array already sorted (base case)?
    //   how do you SPLIT the array in half?
    //   how do you COMBINE two sorted halves (the merge step)?
    //   (look at the lesson example for the merge helper pattern)
    // TODO 6: implement static int[] merge(int[] a, int[] b)
    //   - combine two sorted arrays into one sorted array
}` },
      { type: 'practice', id: 'd15n-p3', lang: 'java', title: 'Practice: tree traversals', starter: `public class Test {
    public static void main(String[] args) {
        // Build this tree:
        //         1
        //        / \
        //       2   3
        //      / \   \
        //     4   5   6
        // TODO 1: write the Node class (int value, Node left, Node right)
        // TODO 2: build the tree manually with new Node(...)
        // TODO 3: preorder(root)  -> expect 1 2 4 5 3 6
        // TODO 4: inorder(root)   -> expect 4 2 5 1 3 6
        // TODO 5: postorder(root) -> expect 4 5 2 6 3 1
    }
    // TODO 6: implement the three traversals recursively
    //   preorder: visit root, preorder(left), preorder(right)
    //   inorder:  inorder(left), visit root, inorder(right)
    //   postorder: postorder(left), postorder(right), visit root
}` },
      { type: 'practice', id: 'd15n-p4', lang: 'java', title: 'Practice: 4-Queens backtracking', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: print solve() result (expect true)
        // TODO 2: print board[] — each entry is the column chosen for that row
        //         sample solution: board = {1, 3, 0, 2} means row 0 col 1, row 1 col 3, etc.
        // TODO 3: visualise the board by printing Q for queen and . for empty
    }
    // TODO 4: implement static boolean solve(int row)
    //   think: when is the board fully solved (base case)?
    //   for each column: if safe, PLACE the queen, recurse on next row.
    //   if recursion fails, UNDO the placement and try next column.
    //   if no column works, return false.
    // TODO 5: implement static boolean isSafe(int row, int col)
    //   - check no earlier row has board[i] == col (same column)
    //   - check no earlier row has |board[i] - col| == |i - row| (diagonal attack)
}` },
      { type: 'practice', id: 'd15n-p5', lang: 'java', title: 'Practice: tail-recursive GCD vs iterative', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: gcdRec(1071, 462) -> 21
        // TODO 2: gcdIter(1071, 462) -> 21 (same result)
        // TODO 3: time both for a = 1_000_003, b = 1_000_000 (large inputs)
        //         the recursive one may hit StackOverflowError at very deep chains
        //         the iterative one will always finish
    }
    // TODO 6: implement static int gcdRec(int a, int b) recursively (tail-recursive)
    // TODO 7: implement static int gcdIter(int a, int b) with a while loop
    //   same idea as gcdRec: keep replacing (a, b) with (b, a % b)
    //   until b is 0. you will need a temp variable to not lose b.
}` },
      { type: 'practice', id: 'd15n-p6', lang: 'java', title: 'Practice: subset-sum backtracking', starter: `public class Test {
    public static void main(String[] args) {
        int[] nums = {3, 7, 1, 8, 4};
        int target = 11;
        // TODO 1: findSubsets(nums, target) and print every subset that sums to 11
        //         expected subsets (order may vary): {3, 8}, {7, 4}, {3, 7, 1}
    }
    // TODO 2: implement static void findSubsets(int[] nums, int target)
    //   - use a helper that takes (nums, index, currentSum, currentPath, target)
    //   think: when do you STOP (two base cases)?
    //   at each index you have TWO choices: include nums[index] or skip it.
    //   INCLUDE: add to the path + currentSum, recurse on next index.
    //   EXCLUDE: leave path/currentSum unchanged, recurse on next index.
    //   (add/remove the element from the path around the recursive call)
    // Hint: use ArrayList<Integer> for currentPath, pass it by reference and add/remove
}` },
    ],
    tasks: [
      { id: 'java-14-d15-next-t1', text: 'Implement Fibonacci three ways: naive recursive (O(2^n)), memoized (O(n)), iterative (O(n) O(1) space). Time all three for n=40.', tag: 'lab' },
      { id: 'java-14-d15-next-t2', text: 'Write merge sort from scratch. Test on random, sorted, empty, and single-element arrays.', tag: 'lab' },
      { id: 'java-14-d15-next-t3', text: 'Implement preorder, inorder, postorder tree traversals on a hand-built 6-node tree. Verify by hand.', tag: 'lab' },
      { id: 'java-14-d15-next-t4', text: 'Solve 4-Queens backtracking. Print the board as Q and . after finding a solution.', tag: 'lab' },
      { id: 'java-14-d15-next-t5', text: 'Explain: why is naive Fibonacci O(2^n)? What does memoization fix? When does memoization NOT help?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 16: Enumerations Deep Dive (slimmed)
  // ================================================================
  {
    id: 'java-14-d16', number: 23,
    title: 'Enumerations Deep Dive',
    subtitle: 'Enums as full classes — fields, methods, and the Singleton pattern',
    duration: 90,
    topics: ['enum', 'Enum Constructors', 'values() / valueOf()', 'ordinal', 'Enum Singleton', 'Abstract enum methods'],
    alignment: ['Oracle Java Tutorials: Enum Types'],
    blocks: [
      { type: 'callout', id: 'd16-intro', calloutType: 'info', title: 'Enums as full classes', content: 'An `enum` in Java is **not just a list of constants** — it is a full class that can have constructors, fields, methods, and even implement interfaces. You already met enums on Day 3 (a basic `Day` enum in a `switch`). Today you go deeper: enums with behaviour, enums as singletons, enums with constant-specific method bodies. Tomorrow (Day 24) you start the bridge from enums to generics — the `<T>` machinery that lets one method handle many types safely.' },
      { type: 'heading', id: 'd16-enum-basic', level: 2, content: 'Basic Enums — The Four Essential Methods' },
      { type: 'code', id: 'd16-enum-basic-code', lang: 'java', title: 'Simple Enum + Its Compiler-Generated Methods', code: 'enum Day {\n    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY\n}\n\nDay today = Day.WEDNESDAY;\nSystem.out.println(today);              // WEDNESDAY (toString)\nSystem.out.println(today.ordinal());    // 2 (index in enum, 0-based)\nSystem.out.println(today.name());       // WEDNESDAY (the constant name)\n\n// Iterate all constants\nfor (Day d : Day.values()) System.out.print(d + " ");\n// MONDAY TUESDAY WEDNESDAY THURSDAY FRIDAY SATURDAY SUNDAY\n\n// Convert String to enum\nDay fromString = Day.valueOf("FRIDAY"); // Day.FRIDAY\n// Day.valueOf("BRODAY");               // IllegalArgumentException!' },
      { type: 'callout', id: 'd16-four', calloutType: 'tip', title: 'The 4 methods you must know', content: '1. **`values()`** — returns an array of ALL constants in declaration order. Compiler-generated.\n2. **`valueOf(String)`** — returns the constant whose `name()` matches. Throws `IllegalArgumentException` if not found.\n3. **`ordinal()`** — the 0-based position of this constant. Avoid it in persisted data — reorderings break callers.\n4. **`name()`** — the String declared name. `toString()` defaults to the same but can be overridden.\n\nThere is also a hidden 5th: every enum has a private constructor (used implicitly by the constants).' },
      { type: 'heading', id: 'd16-enum-advanced', level: 2, content: 'Enums With Fields and Methods' },
      { type: 'code', id: 'd16-enum-adv-code', lang: 'java', title: 'Planet — Real Data Per Constant', code: 'enum Planet {\n    MERCURY(3.303e+23, 2.4397e6),\n    VENUS  (4.869e+24, 6.0518e6),\n    EARTH  (5.976e+24, 6.3781e6),\n    MARS   (6.421e+23, 3.3972e6);\n\n    private final double mass;   // in kg\n    private final double radius; // in meters\n\n    Planet(double mass, double radius) {  // implicitly private\n        this.mass = mass;\n        this.radius = radius;\n    }\n\n    public double surfaceGravity() {\n        final double G = 6.67300E-11;\n        return G * mass / (radius * radius);\n    }\n}\n// Usage\nSystem.out.printf("Earth gravity: %.2f m/s²%n", Planet.EARTH.surfaceGravity());\n// 9.80 m/s²' },
      { type: 'callout', id: 'd16-enum-rules', calloutType: 'info', title: 'Enum Rules — Exam Essentials', content: '1. **Constructor is ALWAYS private** — you cannot call `new Planet(...)`; the JVM creates the constants implicitly.\n2. **Constants must be declared FIRST**, before any fields or methods.\n3. **All enums implicitly extend `java.lang.Enum`** (cannot extend anything else).\n4. **Enums can implement interfaces** — a powerful pattern for state machines.\n5. **Enums are inherently `Serializable` and `Comparable`** (by ordinal).\n6. **`values()` is compiler-generated** — it is not declared in the `Enum` class itself.' },
      { type: 'heading', id: 'd16-enum-switch', level: 2, content: 'Enum in Switch — The Cleanest Control Flow' },
      { type: 'code', id: 'd16-switch-code', lang: 'java', title: 'Enum-Driven Calculator', code: 'enum Operation { ADD, SUBTRACT, MULTIPLY, DIVIDE }\n\nstatic double calculate(double a, double b, Operation op) {\n    switch (op) {\n        case ADD:      return a + b;\n        case SUBTRACT: return a - b;\n        case MULTIPLY: return a * b;\n        case DIVIDE:\n            if (b == 0) throw new ArithmeticException("Divide by zero");\n            return a / b;\n        default: throw new IllegalArgumentException("Unknown op: " + op);\n    }\n}\n// No more magic strings. Type-safe. Compile-time checking.' },
      { type: 'heading', id: 'd16-abstract', level: 2, content: 'Constant-Specific Method Bodies — Each Constant Has Its Own Behaviour' },
      { type: 'code', id: 'd16-abstract-code', lang: 'java', title: 'Abstract Method + Override Per Constant', code: 'enum Operation {\n    // Each constant provides its own implementation\n    ADD      { public double apply(double a, double b) { return a + b; } },\n    SUBTRACT { public double apply(double a, double b) { return a - b; } },\n    MULTIPLY { public double apply(double a, double b) { return a * b; } },\n    DIVIDE   { public double apply(double a, double b) { return a / b; } };\n\n    public abstract double apply(double a, double b);\n}\n// Usage — same shape as the switch above, but no switch\nOperation op = Operation.MULTIPLY;\nSystem.out.println(op.apply(6, 7)); // 42.0\n// Cleaner than switch when behaviour varies significantly per constant.' },
      { type: 'heading', id: 'd16-singleton', level: 2, content: 'Enum Singleton — The Best Singleton Pattern' },
      { type: 'code', id: 'd16-singleton-code', lang: 'java', title: 'Enum Singleton — Thread + Serialization + Reflection Safe', code: '// The BEST way to implement Singleton in Java:\n// thread-safe, serialization-safe, reflection-safe\nenum Database {\n    INSTANCE;  // the single instance\n\n    private Connection connection;\n\n    public Connection getConnection() {\n        if (connection == null) connection = createConnection();\n        return connection;\n    }\n    private Connection createConnection() { /* ... */ return null; }\n}\n\n// Usage\nConnection c1 = Database.INSTANCE.getConnection();\nConnection c2 = Database.INSTANCE.getConnection();\nSystem.out.println(c1 == c2);  // true — always the same instance\n// No getInstance() boilerplate. No synchronized. No double-checked locking.\n// Joshua Bloch, Effective Java — Item 3: "a single-element enum is the best way to implement a singleton."' },
      // Doubt
      { type: 'callout', id: 'd16-d1', calloutType: 'doubt', title: 'When should I use an enum vs static final constants?', content: '**Use enum when**:\n\n- The set of constants is FIXED (days of week, planets, card suits, HTTP status codes).\n- You need type safety — method parameters should only accept valid values.\n- Each constant has associated data or behavior.\n\n**Use static final when**:\n\n- The value might change (configuration values).\n- It is a mathematical or physical constant (`Math.PI` is a `double`, not an enum).\n- You need arithmetic operations on the values.\n\n**Enum advantage**: the compiler ensures only valid values are passed. No runtime errors from invalid strings or magic numbers.' },
      { type: 'callout', id: 'd16-d2', calloutType: 'doubt', title: 'How is an enum "comparable by ordinal"?', content: 'Enums implement `Comparable<Enum<E>>` via `compareTo()`, which compares `ordinal()` values. That is why `EnumSet` and `EnumMap` exist — specialised Collections that exploit the small fixed range of enum ordinals for blazing-fast bitmask operations. You almost never write `Day.MONDAY.compareTo(Day.TUESDAY)` yourself, but it is why enums sort naturally.' },
      // Exam
      { type: 'callout', id: 'd16-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Enum constructor is always private** — cannot be called with `new`. MCQ trap.\n2. **`values()` and `valueOf()`** — know these two compiler-generated methods.\n3. **`ordinal()` returns a 0-based index** — the position in the enum declaration. Avoid depending on it.\n4. **Enum Singleton is the recommended Singleton pattern** (Effective Java).\n5. **Constants first, then fields, then methods** — order matters in an enum body.' },
      // Bridge
      { type: 'callout', id: 'd16-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Enums are used in `switch` statements (Day 3). They are `Comparable` by ordinal, which makes them ideal for `EnumSet` / `EnumMap`. The Singleton pattern with enums is bulletproof.\n\nTomorrow (Day 24) is the bridge from enums into generics — `<T>` machinery that lets one method or class handle *any* type safely. Then Day 25 covers full generics: classes, type erasure, wildcards, and PECS.' },
      // Quick Ref
      { type: 'table', id: 'd16-qref', headers: ['Concept', 'Key Point'], rows: [
        ['enum declaration', 'enum Name { CONST1, CONST2, ...; fields/methods }'],
        ['Constructor', 'Always private. Called implicitly by each constant.'],
        ['values()', 'Returns array of all constants. Compiler-generated.'],
        ['valueOf(String)', 'Returns enum constant by name. Throws IllegalArgumentException if missing.'],
        ['ordinal()', '0-based position. Avoid depending on it.'],
        ['Constant-specific body', 'Each constant can override an abstract method. Cleaner than switch.'],
        ['Enum Singleton', 'Database.INSTANCE — best Singleton pattern (Effective Java).'],
        ['Implements interfaces', 'Enums can implement one or more interfaces.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd16-quiz', title: 'Day 23 Quiz', questions: [
        { id: 'd16-q1', question: 'Can you call `new` on an enum?', options: ['Yes, if the constructor is public', 'No — enum constructors are always private', 'Yes, but only once', 'Only inside the enum itself'], correctIndex: 1, explanation: 'Enum constructors are implicitly private. You cannot call new Day(...). The JVM creates the fixed set of instances at class loading time.' },
        { id: 'd16-q2', question: 'What will Planet.values()[0] return?', options: ['EARTH', 'MERCURY', 'null', '0'], correctIndex: 1, explanation: 'values() returns constants in declaration order. MERCURY is declared first, so it is at index 0.' },
        { id: 'd16-q3', question: 'Why is enum Singleton preferred over a class with private constructor?', options: ['It is faster', 'It handles serialization, reflection attacks, and thread safety automatically', 'It uses less memory', 'It supports inheritance'], correctIndex: 1, explanation: 'Enum singletons are immune to reflection attacks, serialization issues, and multithreading problems. Effective Java Item 3 recommends this pattern.' },
        { id: 'd16-q4', question: 'In what order must constants, fields, and methods appear in an enum body?', options: ['Any order works', 'Constants FIRST, then fields, then methods', 'Methods first, then constants', 'Fields first, then constants'], correctIndex: 1, explanation: 'Constants must come first — they implicitly call the constructor with the values they declare. Fields and methods that depend on the constants must come after.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd16-cards', title: 'Day 23 Flashcards', cards: [
        { id: 'd16-f1', front: '4 essential enum methods?', back: 'values() — array of all constants. valueOf(String) — constant by name. ordinal() — 0-based index. name() — String name of the constant. toString() defaults to name() but can be overridden.', hint: 'List, lookup, index, name...' },
        { id: 'd16-f2', front: 'How to create an enum with fields?', back: 'enum Name { CONST1(val1,val2), CONST2(v1,v2); private fields; private constructor(field params); getters; }. Constants listed FIRST. Constructor called automatically per constant. Always private.', hint: 'Constants first, then fields and methods...' },
        { id: 'd16-f3', front: 'Enum Singleton — why is it the best?', back: 'enum Database { INSTANCE; ... } gives you a thread-safe, serialization-safe, reflection-safe singleton in one line. The JVM guarantees only one instance exists. Joshua Bloch, Effective Java Item 3.', hint: 'One-line, all-safety-built-in...' },
        { id: 'd16-f4', front: 'Constant-specific method bodies?', back: 'Define an abstract method in the enum. Each constant provides its own anonymous-class-style body: ADD { public double apply(...) { ... } }. Cleaner than switch when behaviour varies significantly per constant.', hint: 'Each constant overrides the abstract method...' },
      ] },
      // Practices (6, at end of day)
      { type: 'practice', id: 'd16-p1', lang: 'java', title: 'Practice: Basic enum + switch', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create Color enum { RED, GREEN, BLUE }
        // TODO 2: write a method String describe(Color c) using switch
        //         RED -> "Stop", GREEN -> "Go", BLUE -> "Calm", default -> "Unknown"
        // TODO 3: loop through Color.values() and call describe() on each
        // TODO 4: try Color.valueOf("PURPLE") — observe the IllegalArgumentException
    }
}` },
      { type: 'practice', id: 'd16-p2', lang: 'java', title: 'Practice: Planet with surface gravity', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create Planet enum with constants MERCURY, VENUS, EARTH, MARS
        //         each (mass, radius) — use the values from the lecture
        // TODO 2: add surfaceGravity() method
        // TODO 3: print every planet's gravity using printf("%.2f%n", ...)
        // TODO 4: print Planet.EARTH.ordinal() and Planet.values().length
        // TODO 5: print EARTH.name() vs EARTH.toString() — both should be "EARTH"
    }
}` },
      { type: 'practice', id: 'd16-p3', lang: 'java', title: 'Practice: Traffic Light state machine', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: TrafficLight { RED("Stop"), YELLOW("Caution"), GREEN("Go") }
        // TODO 2: add next() method — RED -> GREEN, GREEN -> YELLOW, YELLOW -> RED
        //   think: how do you move to the NEXT constant and wrap around
        //   from the last one back to the first? (modulo helps)
        // TODO 3: add durationSeconds() — RED=30, YELLOW=5, GREEN=25
        //         (use a field passed in the constant declaration)
        // TODO 4: loop 6 times starting from RED, print "<color> for <duration>s -> <action>"
        //         then advance via next()
    }
}` },
      { type: 'practice', id: 'd16-p4', lang: 'java', title: 'Practice: Operation with constant-specific bodies', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: enum Operation { ADD, SUB, MUL, DIV }
        //         with abstract double apply(double a, double b)
        //         each constant provides its own body
        //         DIV: throw ArithmeticException if b == 0
        // TODO 2: try every operation on 6 and 7
        // TODO 3: print Operation.values().length and Operation.valueOf("MUL")
    }
}` },
      { type: 'practice', id: 'd16-p5', lang: 'java', title: 'Practice: Enum Singleton (Database.INSTANCE)', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: write enum Database { INSTANCE; String url = "jdbc:mysql://localhost/test"; }
        // TODO 2: get the instance twice, compare — must be the SAME object
        // TODO 3: confirm that calling getClass() on both returns the same Class
        //   (proves enums give you a real singleton, not just a class with one instance)
    }
}` },
      { type: 'practice', id: 'd16-p6', lang: 'java', title: 'Practice: HTTP status enum', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: enum HttpStatus with constants OK(200, "OK"), NOT_FOUND(404, "Not Found"),
        //         INTERNAL_ERROR(500, "Server Error"), plus 4 more of your choice
        //         fields: int code, String message
        //         methods: isSuccess() returns true if 200-299, isClientError() 400-499, isServerError() 500-599
        // TODO 2: write String explain(HttpStatus) that returns
        //         "<code> <message>: <success-or-error-classification>"
        //         e.g. "404 Not Found: client error"
        // TODO 3: loop over all constants and print explain()
        // TODO 4: try HttpStatus.valueOf("TEAPOT") and catch the IllegalArgumentException
    }
}` },
    ],
    tasks: [
      { id: 'java-14-d16-t1', text: 'Create a Planet enum with mass, radius, and surfaceGravity(). Print all planets.', tag: 'lab' },
      { id: 'java-14-d16-t2', text: 'Build a Coin enum (PENNY=1, NICKEL=5, DIME=10, QUARTER=25) with getValue(). Write a method that takes a list of Coins and returns total value.', tag: 'lab' },
      { id: 'java-14-d16-t3', text: 'Implement an enum singleton (Database.INSTANCE). Show it returns the same object every time.', tag: 'drill' },
      { id: 'java-14-d16-t4', text: 'Convert a switch-statement calculator (Day 3) to an enum with constant-specific method bodies. Feel the difference.', tag: 'lab' },
      { id: 'java-14-d16-t5', text: 'Explain: Why are enum constructors always private? Why does ordinal() start at 0?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 16-NEXT: Generic Methods & Bounded Types — bridge from enums to generics
  // ================================================================
  {
    id: 'java-14-d16-next', number: 24,
    title: 'Generic Methods & Bounded Types',
    subtitle: 'One method that handles many types safely',
    duration: 90,
    topics: ['Generic Methods', 'Type Parameter <T>', 'Bounded Types', 'Multiple Bounds', 'Static Generic Methods'],
    alignment: ['Oracle Java Tutorials: Generic Methods'],
    blocks: [
      { type: 'callout', id: 'd16n-intro', calloutType: 'info', title: 'The pain generics solves', content: 'Yesterday you saw enums as a way to make a fixed set of constants type-safe. Today you meet a similar idea for **any type**: a method or class that works on `<T>` — whatever type the caller needs. Without generics, every reusable utility either took `Object` (and crashed at runtime with ClassCastException) or got copy-pasted for every new type. Generics give you one version that the compiler checks for safety. Today: generic methods and bounded types. Tomorrow: generic classes, type erasure, wildcards, and PECS.' },
      { type: 'heading', id: 'd16n-why', level: 2, content: 'Life Before Generics — The Object Pain' },
      { type: 'code', id: 'd16n-why-code', lang: 'java', title: 'Pre-Java 5: Everything Was Object', code: '// Pre-Java 5 (2004): Everything was Object\nArrayList list = new ArrayList();\nlist.add("Hello");\nlist.add(42);          // completely legal — both are Object!\nString s = (String) list.get(0);  // cast needed\nString s2 = (String) list.get(1); // 💥 ClassCastException at RUNTIME!\n\n// Post-Java 5: Generics save us\nArrayList<String> safe = new ArrayList<>();\nsafe.add("Hello");\n// safe.add(42);       // COMPILE ERROR — caught before running!\nString s3 = safe.get(0);  // no cast needed — compiler knows the type' },
      { type: 'heading', id: 'd16n-method', level: 2, content: 'Generic Methods — `<T>` Before the Return Type' },
      { type: 'paragraph', id: 'd16n-method-p', content: 'To make a method generic, put `<T>` (or `<T extends Bound>`) BEFORE the return type. `T` is a placeholder — the compiler fills in the actual type at the call site. Same method, many types, one body.' },
      { type: 'code', id: 'd16n-method-code', lang: 'java', title: 'Generic Print and Max', code: '// Generic method: <T> before return type\npublic static <T> void printArray(T[] arr) {\n    for (T element : arr) System.out.print(element + " ");\n    System.out.println();\n}\n\n// Generic method with bounded type\npublic static <T extends Comparable<T>> T max(T a, T b) {\n    return a.compareTo(b) > 0 ? a : b;\n}\n// <T extends Comparable<T>> means: T must implement Comparable<T>\n\n// Usage\nString[] names = {"Alice", "Bob", "Charlie"};\nprintArray(names);          // T = String\nInteger[] nums = {1, 2, 3};\nprintArray(nums);           // T = Integer\n\nString winner = max("apple", "banana");   // T = String\nInteger bigger = max(42, 7);              // T = Integer\n// One method, many types — and the compiler enforces safety.' },
      { type: 'callout', id: 'd16n-syntax', calloutType: 'tip', title: 'Where `<T>` goes — the syntax cheat sheet', content: '```java\n// Class-level: <T> right after the class name\nclass Box<T> { ... }\n\n// Method-level: <T> right before the return type\npublic static <T> void method(T param) { ... }\npublic static <T> T identity(T value) { return value; }\n\n// Bounded: <T extends X>\npublic static <T extends Number> double sqrt(T value) { ... }\n\n// Multiple bounds: <T extends X & Y>\npublic static <T extends Comparable<T> & java.io.Serializable> T max(T a, T b) { ... }\n```\n\nThe compiler infers `T` from the arguments — usually you do not have to write it explicitly.' },
      { type: 'heading', id: 'd16n-bounded', level: 2, content: 'Bounded Type Parameters — Constrain What T Can Be' },
      { type: 'code', id: 'd16n-bounded-code', lang: 'java', title: 'One Bound, Multiple Bounds', code: '// Only types that are Number or its subclasses\nclass NumericBox<T extends Number> {\n    private T value;\n    NumericBox(T value) { this.value = value; }\n    public double sqrt() { return Math.sqrt(value.doubleValue()); }\n}\n// NumericBox<Integer> ✅   NumericBox<Double> ✅   NumericBox<Float> ✅\n// NumericBox<String> ❌  COMPILE ERROR — String is not a Number\n\n// Multiple bounds: T must be Comparable AND Serializable\nclass SortedBox<T extends Comparable<T> & java.io.Serializable> {\n    // T must satisfy ALL interface bounds\n}\n// SortedBox<String>      ✅ — String implements Comparable & Serializable\n// SortedBox<Integer>     ✅\n// SortedBox<java.io.File> ❌ — File is not Comparable' },
      { type: 'callout', id: 'd16n-multi', calloutType: 'info', title: 'Multiple bounds — order matters', content: 'When you write `<T extends A & B & C>`:\n\n- The **first bound can be a class or interface**. The rest must be interfaces.\n- T must satisfy ALL bounds simultaneously.\n- Class-first matters because Java has single inheritance — the class part fixes T\'s superclass.\n\n```java\n// ✅ First bound is class\n<T extends Number & Comparable<Number>>\n\n// ❌ Class must come first\n<T extends Comparable<Number> & Number>  // COMPILE ERROR\n```' },
      // Doubt
      { type: 'callout', id: 'd16n-d1', calloutType: 'doubt', title: 'Why not just use Object and cast?', content: 'Two reasons:\n\n1. **No compile-time safety.** With `Object`, the compiler has no idea what you intend to do with the value. The cast succeeds at compile time and fails at runtime with `ClassCastException`. Generics push that failure to compile time — you catch bugs before running.\n\n2. **No autoboxing/unboxing ceremony.** With generics, `T` becomes the right primitive-or-wrapper type automatically. With `Object`, every primitive needs manual boxing and every read needs manual unboxing — code is twice as long and ten times as buggy.' },
      { type: 'callout', id: 'd16n-d2', calloutType: 'doubt', title: 'When does the compiler infer T vs when do I write it explicitly?', content: '**Inference (most cases):** just call the method. The compiler looks at the argument types and picks `T` for you.\n\n```java\nmax("apple", "banana");  // T inferred as String\n```\n\n**Explicit type witness (rare):** when inference is ambiguous or you want to force a specific type.\n\n```java\nTest.<Number>identity(42);  // forces T = Number, even though 42 is Integer\n```\n\nIf you ever see a compile error like "cannot infer type arguments," that is when you reach for the explicit form.' },
      // Exam
      { type: 'callout', id: 'd16n-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **`<T>` before the return type** — generic method declaration. `public static <T> void sort(List<T> list)`.\n2. **`<T extends X>`** — T must be X or a subclass. NumericBox<String> fails to compile.\n3. **Multiple bounds: first is class, rest are interfaces.** `<T extends Number & Comparable<Number>>` is valid; reverse is not.\n4. **`compareTo()` needs `Comparable`** — `<T extends Comparable<T>>` is the common idiom for "T can be compared to itself."\n5. **Inferred vs explicit T** — usually inferred, explicit only when ambiguous.' },
      // Bridge
      { type: 'callout', id: 'd16n-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Generic methods are the simplest form of generics — `<T>` on the method, used in parameters and return type. You have already used them indirectly via `Collections.sort(list)`, `Arrays.asList(...)`, and every `<T>` you saw on Day 14\'s `ArrayList<Integer>`.\n\nTomorrow (Day 25) takes generics further: generic **classes** (not just methods), the truth about **type erasure**, **wildcards** `<? extends T>` and `<? super T>`, and the **PECS** rule that ties the whole thing together.' },
      // Quick Ref
      { type: 'table', id: 'd16n-qref', headers: ['Syntax', 'Meaning'], rows: [
        ['<T>', 'Generic method or class. T is a type placeholder.'],
        ['<T extends X>', 'T must be X or a subclass.'],
        ['<T extends X & Y>', 'T must satisfy both bounds. First bound can be a class.'],
        ['public static <T> void m(T x)', 'Generic method — <T> goes before return type.'],
        ['class Box<T>', 'Generic class — <T> goes after the class name.'],
        ['T t = new T()', 'NOT ALLOWED — cannot instantiate type parameter.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd16n-quiz', title: 'Day 24 Quiz', questions: [
        { id: 'd16n-q1', question: 'Where does `<T>` go when declaring a generic method?', options: ['After the parameter list', 'Before the return type', 'After the method name', 'Inside the method body'], correctIndex: 1, explanation: 'Generic methods put <T> (or <T extends Bound>) right BEFORE the return type: `public static <T> T identity(T value) { return value; }`.' },
        { id: 'd16n-q2', question: 'Can a NumericBox<String> be instantiated if NumericBox is `<T extends Number>`?', options: ['Yes, with a warning', 'No — compile error', 'Yes, but only at runtime', 'Only if String extends Number'], correctIndex: 1, explanation: 'String does not extend Number, so the compiler rejects NumericBox<String> at compile time. Bounds are checked when the generic type is used, not when the class is written.' },
        { id: 'd16n-q3', question: 'What does `<T extends Comparable<T>>` mean?', options: ['T must extend a class called Comparable', 'T must implement Comparable<T> — i.e., T can compare itself', 'T must be Comparable to any type', 'It is invalid syntax'], correctIndex: 1, explanation: 'The bound says: T must be a type that implements Comparable<T>, meaning it has a `compareTo(T other)` method. The compiler then lets you call `a.compareTo(b)` inside the generic method.' },
        { id: 'd16n-q4', question: 'In `<T extends Number & Comparable<Number>>`, can the order be reversed?', options: ['Yes, order does not matter', 'No — the class bound must come first', 'Only with an interface first', 'Only at runtime'], correctIndex: 1, explanation: 'Java requires the FIRST bound to be the class (if any), then the interfaces. <T extends Comparable<Number> & Number> is a compile error.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd16n-cards', title: 'Day 24 Flashcards', cards: [
        { id: 'd16n-f1', front: 'Where does <T> go for a generic method?', back: 'Right before the return type: `public static <T> void sort(List<T> list)`. For a generic class, <T> goes right after the class name: `class Box<T>`.', hint: 'Before return type (method); after class name (class)...' },
        { id: 'd16n-f2', front: 'Bounded type parameter?', back: '<T extends X> means T must be X or a subclass. <T extends Number> lets you call Number methods on T. The bound is checked at use-site, not declaration-site.', hint: 'T must be a kind of X...' },
        { id: 'd16n-f3', front: 'Multiple bounds — what is the rule?', back: 'The first bound can be a class, the rest must be interfaces. <T extends Number & Comparable<Number>> is valid; reversed is not. T must satisfy ALL bounds.', hint: 'Class first, then interfaces...' },
        { id: 'd16n-f4', front: 'Can you write `T t = new T()`?', back: 'NO. You cannot instantiate a type parameter. The compiler has no way to know what constructor to call. Workaround: pass a Class<T> or use a factory function.', hint: 'No — T is a placeholder, no constructor...' },
      ] },
      // Practices (6, at end of day)
      { type: 'practice', id: 'd16n-p1', lang: 'java', title: 'Practice: Generic printArray + max', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: call printArray() with a String[] {"A", "B", "C"}
        // TODO 2: call printArray() with an Integer[] {1, 2, 3}
        // TODO 3: call max() with two Strings — expect "banana"
        // TODO 4: call max() with two Integers — expect 42
        // TODO 5: try to call printArray(new int[]{1,2,3}) — observe why it fails
        //         (primitives are not Objects; you cannot store int in T[])
    }
    // TODO 6: implement <T> void printArray(T[] arr) — one loop, print each followed by space
    // TODO 7: implement <T extends Comparable<T>> T max(T a, T b) — return whichever compareTo says is greater
}` },
      { type: 'practice', id: 'd16n-p2', lang: 'java', title: 'Practice: NumericBox<T extends Number>', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: NumericBox<Integer> ib = new NumericBox<>(16)
        //         print ib.sqrt() — should be 4.0
        // TODO 2: NumericBox<Double> db = new NumericBox<>(2.25)
        //         print db.sqrt() — should be 1.5
        // TODO 3: try NumericBox<String> — observe the compile error
        //         comment out that line and explain WHY in a comment
    }
}
class NumericBox<T extends Number> {
    private T value;
    // TODO 4: constructor that sets value
    // TODO 5: public double sqrt() — compute the square root of value
    //         (you will need to convert value to a double first)
}` },
      { type: 'practice', id: 'd16n-p3', lang: 'java', title: 'Practice: sortedPair — smallest first', starter: `public class Test {
    public static void main(String[] args) {
        // Call sortedPair with several inputs and print the result.
        // TODO 1: sortedPair(5, 2)       -> [2, 5]
        // TODO 2: sortedPair("apple", "banana") -> [apple, banana]
        // TODO 3: sortedPair(3.14, 2.71) -> [2.71, 3.14]
        // Hint: use Comparable. Return a small array or a Pair<K,V>.
    }
    // TODO 4: implement <T extends Comparable<T>> T[] sortedPair(T a, T b)
    //         — return a 2-element array in ascending order
}` },
      { type: 'practice', id: 'd16n-p4', lang: 'java', title: 'Practice: Trace — what prints?', starter: `public class Test {
    public static void main(String[] args) {
        // Predict EACH line, then run, then explain in a comment.
        Integer[] a = {5, 2, 8, 1};
        Double[] b = {3.14, 2.71, 1.41};
        String[] c = {"banana", "apple", "cherry"};
        printArray(a);
        printArray(b);
        printArray(c);
        System.out.println("max int: " + max(5, 2));
        System.out.println("max double: " + max(3.14, 2.71));
        System.out.println("max string: " + max("apple", "banana"));
    }
    static <T> void printArray(T[] arr) { for (T x : arr) System.out.print(x + " "); System.out.println(); }
    static <T extends Comparable<T>> T max(T a, T b) { return a.compareTo(b) > 0 ? a : b; }
}` },
      { type: 'practice', id: 'd16n-p5', lang: 'java', title: 'Practice: Multi-bound SortedBox', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: SortedBox<String> sb = new SortedBox<>("apple", "banana")
        //         print sb.larger() — should be "banana"
        // TODO 2: SortedBox<Integer> ib = new SortedBox<>(3, 7)
        //         print ib.larger() — should be 7
        // TODO 3: try SortedBox<java.io.File> — observe the compile error
        //         (File does not implement Comparable)
        //         comment out that line and explain WHY in a comment
    }
}
class SortedBox<T extends Comparable<T> & java.io.Serializable> {
    private T a, b;
    // TODO 4: constructor that sets a and b
    // TODO 5: T larger() — return whichever compareTo says is greater
}` },
      { type: 'practice', id: 'd16n-p6', lang: 'java', title: 'Practice: Utils class with multiple bounded methods', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: call Utils.describe(3.14)        -> "double: 3.14"
        // TODO 2: call Utils.describe("hello")      -> "string: hello"
        // TODO 3: call Utils.firstOf("apple", "banana") -> "apple"
        // TODO 4: call Utils.firstOf(3, 7)          -> 3
        // TODO 5: call Utils.describe(new Object()) — observe why it fails
    }
}
// TODO 6: class Utils with TWO static generic methods:
//   - <T> String describe(T value)  — prints the type name + the value
//         (hint: value.getClass().getSimpleName())
//   - <T extends Comparable<T>> T firstOf(T a, T b) — returns the SMALLER one
//         (use compareTo — think about what it returns)
//   Bonus: make describe() handle null without crashing (return "<null>")
}` },
    ],
    tasks: [
      { id: 'java-14-d16-next-t1', text: 'Implement a generic <T extends Comparable<T>> T max(T a, T b). Test with String, Integer, Double.', tag: 'lab' },
      { id: 'java-14-d16-next-t2', text: 'Build NumericBox<T extends Number> with sqrt(), abs(), and negate() methods. Test with Integer, Double, Float.', tag: 'lab' },
      { id: 'java-14-d16-next-t3', text: 'Write a multi-bound generic class: SortedBox<T extends Comparable<T> & Serializable>. Verify which types satisfy it.', tag: 'drill' },
      { id: 'java-14-d16-next-t4', text: 'Implement a Utils class with at least 3 different generic methods, each with different bounds.', tag: 'lab' },
      { id: 'java-14-d16-next-t5', text: 'Explain: why does the compiler reject `new T()`? What is the workaround?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 17: Generic Classes, Type Erasure & PECS
  // ================================================================
  {
    id: 'java-14-d17', number: 25,
    title: 'Generic Classes, Type Erasure & PECS', duration: 120,
    topics: ['Generic Classes', 'Multiple Type Parameters', 'Type Erasure', 'Wildcards ? extends / ? super', 'PECS Rule'],
    alignment: ['Oracle Java Tutorials: Generics', 'GeeksForGeeks: Generics in Java'],
    blocks: [
      { type: 'callout', id: 'd17-intro', calloutType: 'info', title: 'From methods to classes to wildcards', content: 'Yesterday you wrote generic methods — `<T>` on a method, used in parameters and return type. Today you go further: generic **classes** (where `<T>` is on the class itself), the truth about **type erasure** (what actually happens at runtime), **wildcards** `<? extends T>` and `<? super T>`, and the **PECS** rule that ties the whole generics story together. By tonight you will know why `ArrayList<String>` and `ArrayList<Integer>` are the same class at runtime — and why that does not matter to the type checker.' },
      { type: 'heading', id: 'd17-class', level: 2, content: 'Generic Classes — `<T>` on the Class Itself' },
      { type: 'paragraph', id: 'd17-class-p', content: 'You saw generic methods yesterday. A generic class puts `<T>` after the class name — T becomes a placeholder for any reference type, and you use it inside the class for fields, parameters, and return types. Yesterday\'s <T extends Comparable<T>> max method lived inside a class; today\'s Box<T> IS the class.' },
      { type: 'code', id: 'd17-class-code', lang: 'java', title: 'Generic Box<T> — A Container for Any Type', code: '// T = type parameter (placeholder for the actual type)\nclass Box<T> {\n    private T value;\n\n    public Box(T value) { this.value = value; }\n    public T get() { return value; }\n    public void set(T value) { this.value = value; }\n\n    public boolean isEmpty() { return value == null; }\n}\n\n// Usage — T becomes the actual type\nBox<String> stringBox = new Box<>("Hello");\nString s = stringBox.get();  // no cast — type safe!\n\nBox<Integer> intBox = new Box<>(42);\nint x = intBox.get();  // autounboxing — Integer → int' },
      { type: 'heading', id: 'd17-pair', level: 2, content: 'Multiple Type Parameters' },
      { type: 'code', id: 'd17-pair-code', lang: 'java', title: 'Generic Pair<K, V>', code: 'class Pair<K, V> {\n    private K key;\n    private V value;\n\n    public Pair(K key, V value) { this.key = key; this.value = value; }\n    public K getKey() { return key; }\n    public V getValue() { return value; }\n}\n\n// Usage\nPair<String, Integer> grade = new Pair<>("Vinayak", 95);\nString student = grade.getKey();    // "Vinayak"\nint marks = grade.getValue();       // 95\n\nPair<String, Pair<Integer, Double>> nested =\n    new Pair<>("Stats", new Pair<>(3, 8.75));' },
      { type: 'heading', id: 'd17-erasure', level: 2, content: 'Type Erasure — The Hidden Truth' },
      { type: 'paragraph', id: 'd17-erasure-p', content: 'At RUNTIME, generic type information is **ERASED**. `ArrayList<String>` and `ArrayList<Integer>` are both just `ArrayList` to the JVM. The compiler inserts casts behind the scenes. Generics are "compile-time only" — they exist for type safety during compilation, but disappear at runtime.' },
      { type: 'code', id: 'd17-erasure-code', lang: 'java', title: 'Type Erasure Consequences', code: '// These are are the SAME CLASS at runtime!\nArrayList<String> list1 = new ArrayList<>();\nArrayList<Integer> list2 = new ArrayList<>();\nSystem.out.println(list1.getClass() == list2.getClass()); // true!\n// Both are: class java.util.ArrayList\n\n// You CANNOT write any of these:\n// if (list1 instanceof ArrayList<String>)  — compile error: illegal generic type\n// T t = new T();                           — compile error: cannot instantiate T\n// T[] arr = new T[10];                     — compile error: generic array creation\n\n// Workaround for instanceof: use the raw type\nif (list1 instanceof ArrayList) { /* ... */ }  // raw, but works\n\n// Workaround for T[]: create Object[] and cast\n// T[] arr = (T[]) new Object[10];  // warning, but works' },
      { type: 'heading', id: 'd17-wildcard', level: 2, content: 'Wildcards — ? extends, ? super' },
      { type: 'code', id: 'd17-wild-code', lang: 'java', title: 'Wildcard Patterns', code: '// ? extends T — "Producer": you can READ T, but CANNOT WRITE\n// Use when you only need to GET values\npublic static double sum(ArrayList<? extends Number> list) {\n    double total = 0;\n    for (Number n : list) total += n.doubleValue();\n    // list.add(42);  // ❌ COMPILE ERROR — cannot add!\n    return total;\n}\n// Works with: ArrayList<Integer>, ArrayList<Double>, ArrayList<Number>\n\n// ? super T — "Consumer": you can WRITE T, but can only read as Object\n// Use when you only need to ADD values\npublic static void addNumbers(ArrayList<? super Integer> list) {\n    list.add(42);        // ✅ can add Integer\n    list.add(100);       // ✅\n    // Integer x = list.get(0);  // ❌ get returns Object\n}\n// Works with: ArrayList<Integer>, ArrayList<Number>, ArrayList<Object>\n\n// PECS Rule: Producer Extends, Consumer Super\n// Memory trick: Get -> extends. Put -> super.' },
      // Doubt
      { type: 'callout', id: 'd17-d1', calloutType: 'doubt', title: 'Why does Java erase types at runtime? Why not keep them like C#?', content: '**Backward compatibility.** Java 1.0 (1996) had no generics. When generics were added in Java 5 (2004), the decision was made to ERASE them at runtime so that old code (raw types) could still work with new generic code. C# (introduced around the same time as Java 5) did not have this constraint and implemented reified (runtime-preserved) generics.\n\nProject Valhalla (in development for ~10 years) aims to add reified generics to Java, but it is extremely difficult to do without breaking existing code.' },
      { type: 'callout', id: 'd17-d2', calloutType: 'doubt', title: 'When should I use <? extends T> vs <T> in a method?', content: 'Use `<T>` when you need to refer to the type T in multiple places (parameter type AND return type).\n\nUse `<? extends T>` when you only need to READ and do not care about the exact subtype.\n\n```java\n// Use <T> when T connects parameters and return type\npublic static <T> T firstOrNull(List<T> list) { ... }\n\n// Use wildcard when only reading\npublic static void printAll(List<?> list) { ... }\n```\n\nRule of thumb: if T appears in both input AND output, use `<T>`. If only in input, a wildcard is cleaner.' },
      // Exam
      { type: 'callout', id: 'd17-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Type erasure** — the #1 generics theory question. Types are erased at runtime.\n2. **Cannot create generic arrays** — `new T[10]` is illegal. Workaround: `(T[]) new Object[10]`.\n3. **? extends vs ? super** — PECS (Producer Extends, Consumer Super).\n4. **Generic class syntax** — `<T>` after class name: `class Box<T>`.\n5. **Generic method syntax** — `<T>` before return type: `public static <T> void method(T param)`.' },
      // Bridge
      { type: 'callout', id: 'd17-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'You have been using generics since Day 20: `ArrayList<String>`, `Comparable<Student>`, `Comparator<Student>`. Every `<>` you have written is generics. The Collections Framework is built ENTIRELY on generics. JDBC `ResultSet.getObject()` returns `Object` — generics would make it type-safe.\n\nTomorrow (Day 26) is HashMap & HashSet — the data structures you will reach for every single day as a Java developer. Their `hashCode`/`equals` contract depends on understanding object equality, which connects back to generics in subtle ways.' },
      // Quick Ref
      { type: 'table', id: 'd17-qref', headers: ['Syntax', 'Meaning', 'Example'], rows: [
        ['<T>', 'Type parameter on class or method', 'class Box<T>'],
        ['<T extends X>', 'T must be X or a subclass', '<T extends Number>'],
        ['<?>', 'Unknown type (wildcard)', 'List<?> list'],
        ['<? extends T>', 'T or subclass (covariant)', 'List<? extends Number>'],
        ['<? super T>', 'T or superclass (contravariant)', 'List<? super Integer>'],
        ['<T> before return', 'Generic method declaration', 'static <T> T get(List<T> l)'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd17-quiz', title: 'Day 25 Quiz', questions: [
        { id: 'd17-q1', question: 'What happens to generic type information at runtime?', options: ['It is preserved for reflection', 'It is erased — ArrayList<String> becomes ArrayList', 'It is stored in a separate metadata file', 'Only the first type parameter is kept'], correctIndex: 1, explanation: 'Type erasure removes all generic type information. ArrayList<String> and ArrayList<Integer> are the same class at runtime.' },
        { id: 'd17-q2', question: 'Which wildcard should you use if you only need to READ from a collection?', options: ['<? super T>', '<? extends T>', '<?>', '<T extends Readable>'], correctIndex: 1, explanation: 'PECS: Producer Extends (read via <? extends T>), Consumer Super (write via <? super T>). If only reading, use extends.' },
        { id: 'd17-q3', question: 'Can you write: static <T> T pick(T a, T b) { return a; }?', options: ['No — <T> must be on the class', 'Yes — <T> before return type makes it a generic method', 'Only if T extends Object', 'Only in an interface'], correctIndex: 1, explanation: 'Yes! The <T> before the return type declares T as a method-level type parameter. It is independent of any class-level parameter.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd17-cards', title: 'Day 25 Flashcards', cards: [
        { id: 'd17-f1', front: 'What is type erasure?', back: 'At runtime, all generic type information is removed. ArrayList<String> → ArrayList. The compiler inserts casts. Reason: backward compatibility with pre-Java 5 code. C# does not erase — it has reified generics.', hint: 'Generics disappear at runtime...' },
        { id: 'd17-f2', front: 'PECS — what does it mean?', back: 'Producer Extends, Consumer Super. <? extends T> = you can GET T from it (producer). <? super T> = you can PUT T into it (consumer). From Effective Java by Joshua Bloch.', hint: 'Read = extends, write = super...' },
        { id: 'd17-f3', front: 'Generic class vs generic method?', back: 'Generic class: <T> after the class name (e.g., class Box<T>). Generic method: <T> before the return type (e.g., public static <T> T identity(T value)). They can be combined: a non-generic class can have generic methods.', hint: 'Class vs method...' },
      ] },
      { type: 'practice', id: 'd17-p1', lang: 'java', title: 'Practice: Generic Stack<T>', starter: 'import java.util.ArrayList;\n\npublic class TestStack {\n    public static void main(String[] args) {\n        Stack<Integer> s = new Stack<>();\n        // TODO: Push 3 numbers, pop them, print each\n        // TODO: Test with Stack<String>\n        // TODO: What happens if you pop from empty stack?\n    }\n}\nclass Stack<T> {\n    private ArrayList<T> items = new ArrayList<>();\n\n    public void push(T item) { items.add(item); }\n    public T pop() {\n        if (isEmpty()) throw new IllegalStateException("Empty stack");\n        return items.remove(items.size() - 1);\n    }\n    public T peek() {\n        if (isEmpty()) return null;\n        return items.get(items.size() - 1);\n    }\n    public boolean isEmpty() { return items.isEmpty(); }\n    public int size() { return items.size(); }\n}', hint: 's.push(10); s.push(20); s.push(30); while(!s.isEmpty()) System.out.println(s.pop()); // prints 30,20,10. Stack is LIFO.' },
      { type: 'practice', id: 'd17-p2', lang: 'java', title: 'Practice: Generic Binary Search', starter: 'public class BinarySearch {\n    public static void main(String[] args) {\n        Integer[] nums = {1, 3, 5, 7, 9, 11, 13};\n        String[] words = {"apple", "banana", "cherry", "date"};\n        System.out.println(search(nums, 7));     // 3\n        System.out.println(search(nums, 8));     // -1\n        System.out.println(search(words, "cherry")); // 2\n    }\n    // Generic binary search — works with ANY Comparable type!\n    public static <T extends Comparable<T>> int search(T[] arr, T target) {\n        // TODO: Implement binary search using compareTo()\n        return -1;\n    }\n}', hint: 'Three pointers: lo, hi, mid. While lo <= hi: compare target to arr[mid]. Equal -> return mid. Smaller -> search the left half. Larger -> search the right half. If the loop ends, return -1.' },
      { type: 'practice', id: 'd17-p3', lang: 'java', title: 'Practice: Erasure Detective', starter: 'import java.util.*;\n\npublic class ErasureDetective {\n    public static void main(String[] args) {\n        ArrayList<String> strings = new ArrayList<>();\n        ArrayList<Integer> ints = new ArrayList<>();\n\n        // TODO 1: predict: are these the SAME class at runtime?\n        System.out.println(strings.getClass() == ints.getClass());\n\n        // TODO 2: print strings.getClass().getName() — what do you see?\n\n        // TODO 3: try to compile:  strings instanceof ArrayList<String>\n        //         what error do you get? why?\n        // TODO 4: this DOES compile — explain why:\n        if (strings instanceof ArrayList) {\n            System.out.println("raw type works");\n        }\n        // TODO 5: in comments, define type erasure in one sentence\n    }\n}', hint: 'getClass() == getClass() is TRUE — both are java.util.ArrayList at runtime. instanceof with a parameterized type is a compile error (generics are erased). The raw ArrayList works.' },
      { type: 'practice', id: 'd17-p4', lang: 'java', title: 'Practice: Wildcard Reader', starter: 'import java.util.*;\n\npublic class WildcardReader {\n    public static void main(String[] args) {\n        ArrayList<Integer> ints = new ArrayList<>(Arrays.asList(1, 2, 3));\n        ArrayList<Double> doubles = new ArrayList<>(Arrays.asList(1.5, 2.5));\n        ArrayList<String> strings = new ArrayList<>(Arrays.asList("a", "b"));\n\n        System.out.println(sum(ints));     // 6.0\n        System.out.println(sum(doubles));  // 4.0\n        // System.out.println(sum(strings)); // should NOT compile\n    }\n\n    // TODO: implement sum(ArrayList<? extends Number> list)\n    //       that adds every element as a double and returns the total\n    //       (use n.doubleValue())\n}', hint: 'Loop over the list as Number, add n.doubleValue() to a total. The ? extends Number bound accepts Integer and Double but rejects String.' },
      { type: 'practice', id: 'd17-p5', lang: 'java', title: 'Practice: Consumer Writer', starter: 'import java.util.*;\n\npublic class ConsumerWriter {\n    public static void main(String[] args) {\n        ArrayList<Number> numbers = new ArrayList<>();\n        ArrayList<Object> objects = new ArrayList<>();\n\n        addFives(numbers);  // works\n        addFives(objects);  // works\n        // addFives(new ArrayList<String>()); // should NOT compile\n\n        System.out.println(numbers);  // [5, 5]\n        System.out.println(objects);  // [5, 5]\n    }\n\n    // TODO: implement addFives(ArrayList<? super Integer> list)\n    //       that adds the Integer 5 twice\n    //       (hint: ? super Integer accepts Integer, Number, Object)\n}', hint: 'You can WRITE Integer into a ? super Integer list — just add() it. You cannot write into a ? extends list. PECS: Consumer Super.' },
      { type: 'practice', id: 'd17-p6', lang: 'java', title: 'Practice: Generic Pair<T, U>', starter: 'public class PairDemo {\n    public static void main(String[] args) {\n        // TODO 1: create a Pair<String, Integer> for (\"Vinayak\", 95)\n        // TODO 2: create a Pair<Integer, Integer> for (10, 20)\n        // TODO 3: create a Pair<String, String> for (\"A\", \"B\")\n        // TODO 4: print the key and value of each pair\n    }\n}\n\n// TODO 5: write a generic class Pair<T, U> with:\n//   - private fields: T key; U value;\n//   - a constructor that sets both\n//   - getKey() and getValue() methods\n//   - a toString() that returns "key -> value"', hint: 'Two private fields, a constructor setting both, getters for each, and a toString returning key + " -> " + value.' },
    ],
    tasks: [
      { id: 'java-14-d17-t1', text: 'Implement a generic Pair<K,V> class with getKey() and getValue(). Use it with at least 3 different type combinations.', tag: 'lab' },
      { id: 'java-14-d17-t2', text: 'Write a generic Stack<T> (push, pop, peek, isEmpty, size). Test with Integer, String, and custom objects.', tag: 'lab' },
      { id: 'java-14-d17-t3', text: 'Demonstrate type erasure: prove ArrayList<String>.getClass() == ArrayList<Integer>.getClass().', tag: 'drill' },
      { id: 'java-14-d17-t4', text: 'Build a Utils class with at least 3 different generic methods, each with different bounds.', tag: 'lab' },
      { id: 'java-14-d17-t5', text: 'Explain PECS (Producer Extends, Consumer Super). Give an example of each.', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 18: HashMap & HashSet — The Power Pair
  // ================================================================
  {
    id: 'java-14-d18', number: 26,
    title: 'HashMap & HashSet — The Power Pair', duration: 120,
    topics: ['HashMap', 'put() / get() / containsKey()', 'HashSet', 'hashCode()', 'equals() Contract', 'Iteration Patterns'],
    alignment: ['GeeksForGeeks: HashMap in Java', 'Baeldung: HashMap Guide'],
    blocks: [
      { type: 'callout', id: 'd18-intro', calloutType: 'info', title: 'The Most Important Data Structures You Will Use', content: '**HashMap** is the workhorse of every Java application — O(1) average lookup, insert, and delete. **HashSet** is a HashMap in disguise — it guarantees uniqueness. If you only learn two data structures after ArrayList, make them these. Today: the full API, the hashCode-equals contract, and iteration patterns.' },
      { type: 'heading', id: 'd18-hashmap', level: 2, content: 'HashMap<K, V> — Key-Value Store' },
      { type: 'code', id: 'd18-hm-code', lang: 'java', title: 'HashMap Operations', code: 'HashMap<String, Integer> scores = new HashMap<>();\n\n// INSERT / UPDATE\nscores.put("Vinayak", 95);\nscores.put("Riya", 88);\nscores.put("Amit", 76);\nscores.put("Vinayak", 98);  // UPDATE — replaces 95 with 98\n\n// READ\nint v = scores.get("Vinayak");                  // 98\nint unknown = scores.getOrDefault("Neha", 0); // 0 (default)\nboolean has = scores.containsKey("Riya");     // true\nboolean val = scores.containsValue(88);       // true (slow — O(n)!)\n\n// REMOVE\nscores.remove("Amit");  // removes Amit, returns 76\n\n// SIZE + EMPTY\nint size = scores.size();           // 2\nboolean empty = scores.isEmpty();   // false\n\n// REPLACE (only if key exists)\nscores.replace("Vinayak", 100);  // updates to 100\nscores.replace("Neha", 50);    // does nothing — Neha does not exist\n\n// BULK\nHashMap<String, Integer> more = new HashMap<>();\nmore.put("Neha", 82); more.put("Priya", 91);\nscores.putAll(more);  // merge more into scores' },
      { type: 'heading', id: 'd18-iteration', level: 2, content: 'HashMap Iteration — 5 Patterns' },
      { type: 'code', id: 'd18-iter-code', lang: 'java', title: 'All Ways to Iterate a HashMap', code: 'HashMap<String, Integer> map = new HashMap<>();\nmap.put("A", 1); map.put("B", 2); map.put("C", 3);\n\n// 1. keySet() — iterate keys, look up values per key\nfor (String key : map.keySet()) {\n    System.out.println(key + " -> " + map.get(key));\n}\n\n// 2. values() — iterate values only (no keys)\nfor (int val : map.values()) System.out.println(val);\n\n// 3. entrySet() — key + value together (MOST EFFICIENT)\nfor (Map.Entry<String, Integer> entry : map.entrySet()) {\n    System.out.println(entry.getKey() + " = " + entry.getValue());\n}\n\n// 4. forEach (Java 8+)\nmap.forEach((key, value) -> System.out.println(key + ":" + value));\n\n// 5. Iterator (can safely remove while iterating)\nIterator<Map.Entry<String, Integer>> it = map.entrySet().iterator();\nwhile (it.hasNext()) {\n    Map.Entry<String, Integer> entry = it.next();\n    if (entry.getValue() < 2) it.remove();  // safe removal\n}' },
      { type: 'heading', id: 'd18-hashset', level: 2, content: 'HashSet<T> — Uniqueness Guaranteed' },
      { type: 'code', id: 'd18-hs-code', lang: 'java', title: 'HashSet Operations', code: 'HashSet<String> set = new HashSet<>();\n\n// ADD — returns false if already present\nset.add("Java");      // true\nset.add("Python");    // true\nset.add("Java");      // false — duplicate ignored!\n\n// CHECK\nboolean has = set.contains("Python");  // true\nint size = set.size();                 // 2\n\n// REMOVE\nset.remove("Python");  // true\nset.remove("C++");     // false — was never there\n\n// BULK OPERATIONS\nHashSet<String> lang = new HashSet<>();\nlang.add("Java"); lang.add("C++"); lang.add("Rust");\n\nHashSet<String> union = new HashSet<>(set);\nunion.addAll(lang);  // all unique from both\n\nHashSet<String> intersection = new HashSet<>(set);\nintersection.retainAll(lang);  // only common elements\n\nHashSet<String> difference = new HashSet<>(set);\ndifference.removeAll(lang);  // in set but not in lang' },
      { type: 'heading', id: 'd18-contract', level: 2, content: 'The hashCode() — equals() Contract (Critical!)' },
      { type: 'paragraph', id: 'd18-contract-p', content: 'HashMap and HashSet use `hashCode()` to find the bucket, then `equals()` to check for an exact match inside the bucket. If you override `equals()`, you MUST override `hashCode()`. Breaking this rule causes HashMap to lose your objects and HashSet to allow duplicates.' },
      { type: 'code', id: 'd18-contract-code', lang: 'java', title: 'Correct equals/hashCode Implementation', code: 'class Person {\n    String name; int age;\n\n    Person(String n, int a) { name = n; age = a; }\n\n    @Override\n    public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Person)) return false;\n        Person p = (Person) o;\n        return age == p.age && Objects.equals(name, p.name);\n    }\n\n    @Override\n    public int hashCode() {\n        return Objects.hash(name, age);  // consistent with equals!\n    }\n    // Rule: if a.equals(b), then a.hashCode() == b.hashCode()\n    // BUT: same hashCode does NOT guarantee equals (collisions allowed)\n}\n\n// Without hashCode override:\nHashSet<Person> set = new HashSet<>();\nset.add(new Person("Vinayak", 21));\nset.add(new Person("Vinayak", 21));\nSystem.out.println(set.size()); // 2!!! (should be 1) — BROKEN!' },
      { type: 'callout', id: 'd18-contract-warn', calloutType: 'warn', title: 'The Three Rules of the Contract', content: '1. **Consistency** — if `a.equals(b)`, `a.hashCode()` must return the same value as `b.hashCode()` (always, not just once).\n2. **Symmetry** — if `a.equals(b)`, then `b.equals(a)` must also be true.\n3. **Transitivity** — if `a.equals(b)` and `b.equals(c)`, then `a.equals(c)`.\n\nBreak any of these = HashMap/HashSet behave unpredictably. Objects get "lost" in wrong buckets, duplicates appear. This is tested in EVERY advanced Java exam.' },
      // Doubt
      { type: 'callout', id: 'd18-d1', calloutType: 'doubt', title: 'HashMap vs ArrayList — when should I use which?', content: '**HashMap** — lookup by KEY (name -> score, id -> object). O(1) average for get/put/remove. No ordering.\n\n**ArrayList** — access by INDEX (position). O(1) get/set by index. Ordered by insertion.\n\nMental model: ArrayList is a numbered list. HashMap is a dictionary/phonebook.\n\n- "I need to find this student by their roll number" -> `HashMap<Integer, Student>`.\n- "I need the first 10 scores" -> `ArrayList<Integer>`.' },
      { type: 'callout', id: 'd18-d2', calloutType: 'doubt', title: 'What happens if two different objects have the same hashCode?', content: 'That is called a **hash collision**. It is NORMAL and expected. Both objects go into the same bucket. Inside the bucket, HashMap uses `equals()` to distinguish them.\n\nJava 8+ uses a **balanced tree** (red-black tree) inside buckets that grow beyond 8 elements, converting O(n) linked list traversal to O(log n). This protects against denial-of-service attacks that craft keys with the same hash.' },
      // Exam
      { type: 'callout', id: 'd18-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **hashCode-equals contract** — the most tested HashMap concept. Override both or neither.\n2. **`HashMap.put()` returns the PREVIOUS value** (or null if the key is new). Tricky on MCQs.\n3. **`entrySet()` is the most efficient iteration** — avoids redundant `get()` calls.\n4. **HashSet is backed by HashMap** — `add(e)` calls `map.put(e, PRESENT)`. Know this.\n5. **`containsValue` is O(n)** — do not use in performance-critical code.' },
      // Bridge
      { type: 'callout', id: 'd18-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'HashMap uses arrays (Day 8) internally — an array of buckets. `hashCode()` returns int, used to index into that array. ArrayList (Day 20) + HashMap cover 90% of data structure needs. The TreeMap/TreeSet you will learn tomorrow (Day 27) maintain sorted order — HashMap/HashSet do not.' },
      // Quick Ref
      { type: 'table', id: 'd18-qref', headers: ['Operation', 'HashMap', 'HashSet', 'Notes'], rows: [
        ['Add', 'put(k, v)', 'add(e)', 'put returns old value; add returns boolean'],
        ['Get', 'get(k) / getOrDefault(k,d)', 'contains(e)', 'get returns null if key absent'],
        ['Remove', 'remove(k)', 'remove(e', 'Both return boolean/value'],
        ['Size', 'size()', 'size()', 'Same for all collections'],
        ['Check key', 'containsKey(k)', '—', 'HashMap-specific'],
        ['Iterate', 'entrySet()', 'for (T e : set)', 'entrySet is most efficient for map'],
        ['Clear', 'clear()', 'clear()', 'Removes all elements'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd18-quiz', title: 'Day 26 Quiz', questions: [
        { id: 'd18-q1', question: 'What happens if you override equals() but NOT hashCode() and use objects as HashMap keys?', options: ['Nothing — it works fine', 'Equal objects may go to different buckets — get() may fail to find them', 'Compile error', 'Runtime error'], correctIndex: 1, explanation: 'HashMap uses hashCode() to find the bucket. Two equal objects with different hashCodes end up in different buckets. get() cannot find them — they become "lost."' },
        { id: 'd18-q2', question: 'What does HashMap.put() return when adding a NEW key?', options: ['true', 'the new value', 'null', 'the key'], correctIndex: 2, explanation: 'put() returns the PREVIOUS value for that key. If the key is new, there is no previous value, so it returns null. This is the source of many null checks in production code.' },
        { id: 'd18-q3', question: 'Which iteration method is most efficient for HashMap?', options: ['keySet() + get()', 'entrySet()', 'values()', 'They are all the same'], correctIndex: 1, explanation: 'entrySet() iterates once and gives both key and value. keySet()+get() does a lookup per key (redundant). Use entrySet() unless you only need keys or only values.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd18-cards', title: 'Day 26 Flashcards', cards: [
        { id: 'd18-f1', front: 'HashMap key methods?', back: 'put(k,v), get(k), getOrDefault(k,default), remove(k), containsKey(k), containsValue(v) [O(n)!], replace(k,v), putAll(map), clear(), size(), isEmpty(), keySet(), values(), entrySet().', hint: 'CRUD + check + iterate...' },
        { id: 'd18-f2', front: 'hashCode-equals contract?', back: '1. If a.equals(b), then a.hashCode() == b.hashCode(). 2. Consistent: multiple calls return same value if object unchanged. 3. Symmetric: a.equals(b) ↔ b.equals(a). 4. Transitive: a.equals(b) && b.equals(c) → a.equals(c).', hint: 'Four rules...' },
        { id: 'd18-f3', front: 'HashSet vs HashMap relationship?', back: 'HashSet is backed by HashMap. add(e) calls map.put(e, DUMMY_OBJECT). contains(e) calls map.containsKey(e). That is why HashSet has O(1) operations — it is a HashMap with no values, just keys.', hint: 'HashSet IS a HashMap...' },
      ] },
      { type: 'practice', id: 'd18-p1', lang: 'java', title: 'Practice: Student Gradebook', starter: 'import java.util.*;\n\npublic class Gradebook {\n    public static void main(String[] args) {\n        HashMap<String, ArrayList<Integer>> grades = new HashMap<>();\n        // TODO: Add 3 students, each with a list of marks\n        // TODO: Print each student\'s average\n        // TODO: Find the top student\n        // TODO: Add a mark for an existing student\n    }\n}', hint: 'grades.put("Vinayak", new ArrayList<>()); grades.get("Vinayak").add(95); Average: sum/score.size(). Top: iterate entrySet, track max.' },
      { type: 'practice', id: 'd18-p2', lang: 'java', title: 'Practice: Word Frequency Counter', starter: 'import java.util.*;\n\npublic class WordCount {\n    public static void main(String[] args) {\n        String text = "the quick brown fox jumps over the lazy dog the fox was quick";\n        HashMap<String, Integer> freq = new HashMap<>();\n        // TODO: Split text into words. Count frequency of each word.\n        // TODO: Print words sorted by frequency (descending).\n        // TODO: Find the most common word.\n    }\n}', hint: 'String[] words = text.split(" "); for(String w:words) freq.put(w, freq.getOrDefault(w,0)+1). Sort: List<Map.Entry<String,Integer>> list = new ArrayList<>(freq.entrySet()); list.sort((a,b)->b.getValue()-a.getValue());' },
      { type: 'practice', id: 'd18-p3', lang: 'java', title: 'Practice: Phonebook', starter: 'import java.util.*;\n\npublic class Phonebook {\n    public static void main(String[] args) {\n        HashMap<String, String> phonebook = new HashMap<>();\n\n        // TODO 1: add: Vinayak -> 9876543210, Riya -> 9123456780,\n        //         Amit -> 9988776655\n        // TODO 2: look up and print the number for Riya\n        // TODO 3: update the number for Vinayak to a new one\n        // TODO 4: remove Amit\n        // TODO 5: check if the key "Neha" exists (containsKey)\n        // TODO 6: print all entries:  name -> number\n        //         (use entrySet or forEach)\n        // TODO 7: print the total count (size)\n    }\n}', hint: 'phonebook.put("Vinayak", "9876543210"). Get: phonebook.get("Riya"). Update: put with same key replaces. Remove: phonebook.remove("Amit"). Iterate: for (Map.Entry<String,String> e : phonebook.entrySet()) System.out.println(e.getKey() + " -> " + e.getValue());' },
      { type: 'practice', id: 'd18-p4', lang: 'java', title: 'Practice: HashSet Uniqueness', starter: 'import java.util.*;\n\npublic class Uniqueness {\n    public static void main(String[] args) {\n        String[] words = {\"java\", \"python\", \"java\", \"c++\", \"python\", \"java\", \"go\"};\n\n        // TODO 1: add every word to a HashSet and print it\n        //         how many elements? which ones are missing?\n        // TODO 2: check contains(\"go\") and contains(\"rust\")\n        // TODO 3: print the size, then add \"java\" again — size change?\n        // TODO 4: use a HashSet to COUNT DISTINCT words in the array\n        // TODO 5: remove \"go\" and print\n    }\n}', hint: 'HashSet<String> set = new HashSet<>(); for (String w : words) set.add(w);. Duplicates are ignored — size stays 4 for {java, python, c++, go}. contains("go") is true. distinct count = set.size().' },
      { type: 'practice', id: 'd18-p5', lang: 'java', title: 'Practice: equals/hashCode Contract Lab', starter: 'import java.util.*;\n\nclass Person {\n    String name; int age;\n    Person(String n, int a) { name=n; age=a; }\n\n    // TODO 1: override equals() — same name AND age\n    // TODO 2: override hashCode() with Objects.hash(name, age)\n    // TODO 3: run — the HashSet should now treat two equal Persons as ONE\n}\n\npublic class ContractLab {\n    public static void main(String[] args) {\n        HashSet<Person> set = new HashSet<>();\n        set.add(new Person("Vinayak", 21));\n        set.add(new Person("Vinayak", 21));  // equal to the first\n        set.add(new Person("Vinayak", 22));  // different age\n        System.out.println("Size: " + set.size());\n\n        // TODO 4: comment out the hashCode override — run again.\n        //         what happens to the size? WHY?\n        // TODO 5: write the three contract rules in comments\n    }\n}', hint: 'equals: if (this == o) return true; if (!(o instanceof Person)) return false; Person p = (Person) o; return age == p.age && Objects.equals(name, p.name);. hashCode: return Objects.hash(name, age);. Without hashCode, equal objects land in different buckets — duplicates appear (size 3 instead of 2).' },
      { type: 'practice', id: 'd18-p6', lang: 'java', title: 'Practice: put() Return Value', starter: 'import java.util.*;\n\npublic class PutReturn {\n    public static void main(String[] args) {\n        HashMap<String, Integer> map = new HashMap<>();\n\n        // TODO 1: predict the return value, then run:\n        Integer r1 = map.put("A", 1);   // new key -> ?\n        Integer r2 = map.put("A", 2);   // existing key -> ?\n        Integer r3 = map.put("A", 3);   // again -> ?\n        Integer r4 = map.put("B", 10);  // new key -> ?\n\n        System.out.println(r1 + " " + r2 + " " + r3 + " " + r4);\n        System.out.println(map);\n\n        // TODO 2: in comments, write the RULE for what put() returns\n        // TODO 3: use that rule to detect whether a key was NEW or EXISTING:\n        //         Integer prev = map.put(\"C\", 5);\n        //         if (prev == null) -> it was new. print \"C added\"\n        //         else -> it existed. print \"C updated (old value: \" + prev + \")\"\n    }\n}', hint: 'put() returns the PREVIOUS value, or null if the key was new. So: null, 1, 2, null. The null-check pattern is used to distinguish insert from update.' },
    ],
    tasks: [
      { id: 'java-14-d18-t1', text: 'Build a phonebook: name->number using HashMap. Support: add, get, update, delete, list all.', tag: 'lab' },
      { id: 'java-14-d18-t2', text: 'Word frequency counter: count word occurrences in a paragraph. Print top 5 words.', tag: 'lab' },
      { id: 'java-14-d18-t3', text: 'Create a Person class with proper equals/hashCode. Show HashSet correctly prevents duplicates.', tag: 'drill' },
      { id: 'java-14-d18-t4', text: 'Demonstrate what breaks if you override equals() without hashCode(). Use HashSet to show duplicates.', tag: 'drill' },
      { id: 'java-14-d18-t5', text: 'Explain: What does HashMap.put() return? Why is entrySet() more efficient than keySet()+get()?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 19: TreeMap, TreeSet & Sorted Collections
  // ================================================================
  {
    id: 'java-14-d19', number: 27,
    title: 'TreeMap, TreeSet & Sorted Collections', duration: 120,
    topics: ['TreeMap', 'TreeSet', 'Red-Black Tree', 'SortedMap', 'NavigableMap', 'LinkedHashMap', 'LinkedHashSet'],
    alignment: ['GeeksForGeeks: TreeMap in Java', 'Baeldung: Guide to TreeMap'],
    blocks: [
      { type: 'callout', id: 'd19-intro', calloutType: 'info', title: 'When Order Matters', content: 'HashMap gives you speed but NO ordering. **TreeMap** gives you **sorted keys** (natural order or custom Comparator) with O(log n) operations. **TreeSet** is the sorted version of HashSet. Today: when to sacrifice speed for order, and how to master the SortedMap/NavigableMap APIs.' },
      { type: 'heading', id: 'd19-treemap', level: 2, content: 'TreeMap<K, V> — Sorted Key-Value Store' },
      { type: 'code', id: 'd19-tm-code', lang: 'java', title: 'TreeMap Basics', code: '// Natural ordering (alphabetical for String, ascending for Integer)\nTreeMap<String, Integer> scores = new TreeMap<>();\nscores.put("Vinayak", 95);\nscores.put("Amit", 76);\nscores.put("Riya", 88);\nscores.put("Zara", 91);\n\n// TreeMap iterates in KEY ORDER (not insertion order!)\nfor (var entry : scores.entrySet()) {\n    System.out.println(entry.getKey() + " -> " + entry.getValue());\n}\n// Amit -> 76, Riya -> 88, Vinayak -> 95, Zara -> 91  ← alphabetical!\n\n// Custom Comparator (reverse order)\nTreeMap<String, Integer> reverse = new TreeMap<>(Comparator.reverseOrder());\nreverse.putAll(scores);\n// Zara -> 91, Vinayak -> 95, Riya -> 88, Amit -> 76' },
      { type: 'heading', id: 'd19-navigable', level: 2, content: 'NavigableMap — Beyond Basic Get/Put' },
      { type: 'code', id: 'd19-nav-code', lang: 'java', title: 'TreeMap Navigation Methods', code: 'TreeMap<Integer, String> ranks = new TreeMap<>();\nranks.put(1, "Gold"); ranks.put(2, "Silver"); ranks.put(3, "Bronze");\nranks.put(5, "Participant");\n\nSystem.out.println(ranks.firstKey());       // 1\nSystem.out.println(ranks.lastKey());        // 5\nSystem.out.println(ranks.firstEntry());     // 1=Gold\n\n// lower / higher — STRICTLY less/greater (exclusive)\nSystem.out.println(ranks.lowerKey(3));      // 2 (strictly < 3)\nSystem.out.println(ranks.higherKey(3));     // 5 (strictly > 3)\n\n// floor / ceiling — inclusive (≤ or ≥)\nSystem.out.println(ranks.floorKey(3));      // 3 (≤ 3)\nSystem.out.println(ranks.ceilingKey(4));    // 5 (≥ 4 — 4 does not exist)\n\n// Sub-maps (views — changes affect original!)\nSortedMap<Integer, String> podium = ranks.subMap(1, 4);  // [1, 4) — exclusive end\n// podium = {1=Gold, 2=Silver, 3=Bronze}\n\nSystem.out.println(ranks.headMap(3));       // keys < 3: {1=Gold, 2=Silver}\nSystem.out.println(ranks.tailMap(3));       // keys ≥ 3: {3=Bronze, 5=Participant}' },
      { type: 'heading', id: 'd19-treeset', level: 2, content: 'TreeSet<T> — Sorted Uniqueness' },
      { type: 'code', id: 'd19-ts-code', lang: 'java', title: 'TreeSet Operations', code: 'TreeSet<Integer> numbers = new TreeSet<>();\nnumbers.add(42); numbers.add(7); numbers.add(100);\nnumbers.add(7);  // duplicate — ignored!\n\nSystem.out.println(numbers);  // [7, 42, 100] — sorted!\n\nSystem.out.println(numbers.first());     // 7\nSystem.out.println(numbers.last());      // 100\nSystem.out.println(numbers.lower(42));   // 7\nSystem.out.println(numbers.higher(42));  // 100\nSystem.out.println(numbers.ceiling(50)); // 100 (≥ 50)\n\n// Custom ordering: sort by length for Strings\nTreeSet<String> byLength = new TreeSet<>(\n    (a, b) -> a.length() != b.length() ? a.length() - b.length() : a.compareTo(b)\n);\nbyLength.add("cat"); byLength.add("elephant"); byLength.add("dog");\n// [cat, dog, elephant] — sorted by length, ties broken alphabetically' },
      { type: 'heading', id: 'd19-linked', level: 2, content: 'LinkedHashMap & LinkedHashSet — Insertion Order' },
      { type: 'code', id: 'd19-linked-code', lang: 'java', title: 'The Third Option: Insertion Order', code: '// LinkedHashMap: maintains INSERTION ORDER (not sorted, not random)\nLinkedHashMap<String, Integer> lhm = new LinkedHashMap<>();\nlhm.put("Zara", 91);\nlhm.put("Amit", 76);\nlhm.put("Vinayak", 95);\n\nfor (var e : lhm.entrySet()) {\n    System.out.print(e.getKey() + " ");  // Zara Amit Vinayak (insertion order!)\n}\n\n// LinkedHashMap with access order (LRU cache!)\nLinkedHashMap<String, Integer> lru = new LinkedHashMap<>(16, 0.75f, true);\nlru.put("A", 1); lru.put("B", 2); lru.put("C", 3);\nlru.get("A");  // access A — moves to end\n// Iteration order: B, C, A (A moved to end because it was accessed)\n\n// LinkedHashSet: like HashSet but maintains insertion order\nLinkedHashSet<String> lhs = new LinkedHashSet<>();\nlhs.add("Z"); lhs.add("A"); lhs.add("M");\n// Iteration: Z, A, M (insertion order)  vs  HashSet: random' },
      { type: 'heading', id: 'd19-compare', level: 2, content: 'The Complete Collections Comparison' },
      { type: 'table', id: 'd19-compare-table', headers: ['Collection', 'Ordering', 'Duplicates', 'Get/Put', 'Null Keys', 'Use When'], rows: [
        ['HashMap', 'No order', 'Keys: no', 'O(1) avg', '✅ 1 null key', 'Fast lookups. No ordering needed.'],
        ['LinkedHashMap', 'Insertion order', 'Keys: no', 'O(1) avg', '✅ 1 null key', 'Fast lookups + preserve insertion order.'],
        ['TreeMap', 'Sorted (keys)', 'Keys: no', 'O(log n)', '❌ No null keys', 'Need sorted keys. Range queries.'],
        ['HashSet', 'No order', 'No', 'O(1) avg', '✅ 1 null element', 'Uniqueness. No ordering needed.'],
        ['LinkedHashSet', 'Insertion order', 'No', 'O(1) avg', '✅ 1 null element', 'Uniqueness + preserve insertion order.'],
        ['TreeSet', 'Sorted', 'No', 'O(log n)', '❌ No null elements', 'Sorted unique elements. Range queries.'],
        ['ArrayList', 'Insertion order', 'Yes', 'O(1) by index', '✅ Many nulls', 'Indexed access. Duplicates OK.'],
      ] },
      // Doubt
      { type: 'callout', id: 'd19-d1', calloutType: 'doubt', title: 'HashMap vs TreeMap vs LinkedHashMap — which do I choose?', content: '**HashMap** — default choice. Fastest (O(1)). No ordering guarantees. Use 90% of the time.\n\n**TreeMap** — when you need sorted keys or range queries (find all keys between X and Y). Slower (O(log n)). Keys must be Comparable.\n\n**LinkedHashMap** — when you need predictable iteration order (insertion order or access order). Slightly slower than HashMap (doubly-linked list overhead). Perfect for LRU caches.\n\nDecision tree: need sorting? -> TreeMap. Need insertion order? -> LinkedHashMap. Just need speed? -> HashMap.' },
      { type: 'callout', id: 'd19-d2', calloutType: 'doubt', title: 'Why does TreeMap not allow null keys but HashMap does?', content: 'TreeMap uses `compareTo()` or a `Comparator` to sort keys. Calling `null.compareTo(x)` or `comparator.compare(null, x)` throws NullPointerException.\n\nHashMap uses `hashCode()` on keys — which also fails on null. But HashMap has a special case: if the key is null, it goes to bucket 0 without calling `hashCode()`. TreeMap never got this special treatment.\n\nMoral: put null in HashMap if you must (one null key). Never put null in TreeMap.' },
      // Exam
      { type: 'callout', id: 'd19-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **HashMap = O(1), TreeMap = O(log n)** — performance comparison is a guaranteed MCQ.\n2. **TreeMap sorts by KEYS** (natural order or Comparator).\n3. **TreeSet uses TreeMap internally** (same relationship as HashSet -> HashMap).\n4. **Null keys in TreeMap -> NullPointerException** (`compareTo` fails on null).\n5. **LinkedHashMap access-order mode** — `new LinkedHashMap<>(16, 0.75f, true)` for an LRU cache.' },
      // Bridge
      { type: 'callout', id: 'd19-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'TreeMap/TreeSet use the same red-black tree structure that Java\'s PriorityQueue, ConcurrentSkipListMap, and many database indexes use. The Comparator from Day 20 controls TreeMap sorting. Generics (Day 24) make all of this type-safe.' },
      // Quick Ref
      { type: 'table', id: 'd19-qref', headers: ['Map Type', 'Key Feature', 'Performance', 'Null Keys'], rows: [
        ['HashMap', 'Fast. No order.', 'O(1) avg', '1 null key OK'],
        ['LinkedHashMap', 'Insertion-order iteration.', 'O(1) avg', '1 null key OK'],
        ['TreeMap', 'Sorted keys (NavigableMap).', 'O(log n)', '❌ No null keys'],
        ['Hashtable', 'Thread-safe (legacy).', 'O(1)', '❌ No null keys/values'],
        ['ConcurrentHashMap', 'Thread-safe (modern).', 'O(1)', '❌ No null keys/values'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd19-quiz', title: 'Day 27 Quiz', questions: [
        { id: 'd19-q1', question: 'What is the time complexity of TreeMap.get()?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctIndex: 1, explanation: 'TreeMap is backed by a red-black tree. get(), put(), remove() are all O(log n) — the height of a balanced binary search tree.' },
        { id: 'd19-q2', question: 'What happens if you put(null, "value") into a TreeMap?', options: ['It works — null is stored as the first key', 'NullPointerException — because compareTo is called on null', 'null is stored but unsorted', 'Compile error'], correctIndex: 1, explanation: 'TreeMap calls compareTo() on keys during insertion. null.compareTo() throws NullPointerException. HashMap handles null specially (bucket 0).' },
        { id: 'd19-q3', question: 'What does LinkedHashMap\'s access-order mode do?', options: ['Sorts entries alphabetically', 'Moves accessed entries to the end of iteration order', 'Prevents access to certain entries', 'Doubles access speed'], correctIndex: 1, explanation: 'With access-order=true, every get() or put() moves that entry to the END of the iteration order. Least recently accessed ends up at the BEGINNING — perfect for LRU cache.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd19-cards', title: 'Day 27 Flashcards', cards: [
        { id: 'd19-f1', front: 'HashMap vs TreeMap vs LinkedHashMap?', back: 'HashMap: O(1), no order. TreeMap: O(log n), sorted keys. LinkedHashMap: O(1), insertion (or access) order. Choose: speed->HashMap, sorting->TreeMap, ordering->LinkedHashMap.', hint: 'Speed vs sorting vs ordering...' },
        { id: 'd19-f2', front: 'TreeMap navigation methods?', back: 'firstKey/lastKey, lowerKey (strictly <), higherKey (strictly >), floorKey (≤), ceilingKey (≥). subMap(from, to), headMap(toKey), tailMap(fromKey). All return views — changes affect original map.', hint: 'first, last, lower, higher, floor, ceiling...' },
        { id: 'd19-f3', front: 'Why no null keys in TreeMap?', back: 'TreeMap calls compareTo() (or Comparator.compare()) on keys to maintain order. null.compareTo() throws NullPointerException. HashMap has special null handling (bucket 0). TreeMap does not.', hint: 'compareTo on null crashes...' },
      ] },
      { type: 'practice', id: 'd19-p1', lang: 'java', title: 'Practice: Event Scheduler', starter: 'import java.util.*;\n\npublic class EventScheduler {\n    public static void main(String[] args) {\n        // Date → Event name\n        TreeMap<String, String> schedule = new TreeMap<>();\n        schedule.put("2026-09-10", "CE-1 Exam");\n        schedule.put("2026-08-15", "Independence Day");\n        schedule.put("2026-10-30", "CE-2 Exam");\n        schedule.put("2026-09-23", "Course Start");\n\n        // TODO: Print All Time events in chronological order\n        // TODO: Find the next event after 2026-09-01\n        // TODO: Print All Time events in Q3 2026 (July-Sep)\n    }\n}', hint: 'Chronological: just iterate — TreeMap already sorted. Next after: schedule.higherKey("2026-09-01"). Q3: schedule.subMap("2026-07-01", "2026-10-01"). Date strings sort correctly in YYYY-MM-DD format!' },
      { type: 'practice', id: 'd19-p2', lang: 'java', title: 'Practice: LRU Cache with LinkedHashMap', starter: 'import java.util.*;\n\npublic class LRUTest {\n    public static void main(String[] args) {\n        LRUCache<String, String> cache = new LRUCache<>(3);\n        cache.put("A", "1"); cache.put("B", "2"); cache.put("C", "3");\n        cache.get("A");  // access A — moves to end\n        cache.put("D", "4");  // evicts B (least recently used)\n        // TODO: Print cache. Which keys remain? What was evicted?\n    }\n}\nclass LRUCache<K, V> extends LinkedHashMap<K, V> {\n    private final int capacity;\n\n    LRUCache(int capacity) {\n        super(capacity, 0.75f, true);  // access-order!\n        this.capacity = capacity;\n    }\n\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n        return size() > capacity;\n    }\n}', hint: 'After put("D"): cache should contain C, A, D. B was the LRU entry and got evicted. Print using cache.forEach((k,v) -> System.out.println(k+"="+v)).' },
      { type: 'practice', id: 'd19-p3', lang: 'java', title: 'Practice: TreeMap Navigator', starter: 'import java.util.*;\n\npublic class Navigator {\n    public static void main(String[] args) {\n        TreeMap<Integer, String> ranks = new TreeMap<>();\n        ranks.put(1, "Gold"); ranks.put(2, "Silver"); ranks.put(3, "Bronze");\n        ranks.put(5, "Participant");\n\n        // TODO 1: print firstKey, lastKey, firstEntry\n        // TODO 2: print lowerKey(3) and higherKey(3) — strictly less/greater\n        // TODO 3: print floorKey(4) and ceilingKey(4) — inclusive\n        // TODO 4: print headMap(3) and tailMap(3)\n        // TODO 5: print subMap(2, 5) — note the exclusive end\n        // TODO 6: predict each output in a comment BEFORE running\n    }\n}', hint: 'firstKey=1, lastKey=5. lowerKey(3)=2, higherKey(3)=5. floorKey(4)=3, ceilingKey(4)=5. headMap(3)={1,2}, tailMap(3)={3,5}. subMap(2,5)={2,3} — 5 excluded.' },
      { type: 'practice', id: 'd19-p4', lang: 'java', title: 'Practice: TreeSet by Length', starter: 'import java.util.*;\n\npublic class TreeSetLength {\n    public static void main(String[] args) {\n        // TODO 1: build a TreeSet<String> that sorts by LENGTH first,\n        //         then alphabetically for ties:\n        //         Comparator: (a, b) -> a.length() != b.length()\n        //                                ? a.length() - b.length()\n        //                                : a.compareTo(b)\n        // TODO 2: add: cat, elephant, dog, ant, bee, hippopotamus\n        // TODO 3: print — what order do you get? why?\n        // TODO 4: print first(), last(), lower(\"dog\"), higher(\"dog\")\n        // TODO 5: try adding \"ant\" again — does the size change?\n    }\n}', hint: 'Expected order: ant, bee, cat, dog, elephant, hippopotamus. first=ant, last=hippopotamus. lower(\"dog\")=cat, higher(\"dog\")=elephant. Adding \"ant\" again — size stays 6 (TreeSet ignores duplicates).' },
      { type: 'practice', id: 'd19-p5', lang: 'java', title: 'Practice: Insertion Order vs Sorted', starter: 'import java.util.*;\n\npublic class OrderCompare {\n    public static void main(String[] args) {\n        // TODO 1: create a HashMap, LinkedHashMap, and TreeMap\n        //         each with the SAME entries: (Zara, 91), (Amit, 76),\n        //         (Vinayak, 95), (Riya, 88) — inserted in THAT order\n        // TODO 2: print the iteration order of each map\n        //         HashMap: ?   LinkedHashMap: ?   TreeMap: ?\n        // TODO 3: in comments, explain the difference\n        // TODO 4: now do the same with HashSet, LinkedHashSet, TreeSet\n        //         using the strings \"Zara\", \"Amit\", \"Vinayak\", \"Riya\"\n    }\n}', hint: 'HashMap: unpredictable order. LinkedHashMap: Zara, Amit, Vinayak, Riya (insertion). TreeMap: Amit, Riya, Vinayak, Zara (sorted). Same story for the three Sets.' },
      { type: 'practice', id: 'd19-p6', lang: 'java', title: 'Practice: Null Key Showdown', starter: 'import java.util.*;\n\npublic class NullShowdown {\n    public static void main(String[] args) {\n        // TODO 1: this works — run it:\n        HashMap<String, Integer> hashMap = new HashMap<>();\n        hashMap.put(null, 1);\n        System.out.println(hashMap.get(null));  // 1\n\n        // TODO 2: uncomment — what happens?\n        // TreeMap<String, Integer> treeMap = new TreeMap<>();\n        // treeMap.put(null, 1);\n        // TODO 3: explain in a comment WHY it fails\n        //         (what does TreeMap do with keys that HashMap does not?)\n\n        // TODO 4: does HashSet allow null? try it.\n        // TODO 5: does TreeSet allow null? try it.\n    }\n}', hint: 'TreeMap sorts keys with compareTo() — null.compareTo() throws NullPointerException. HashMap uses hashCode() but special-cases null into bucket 0. HashSet allows null (backed by HashMap); TreeSet does not (backed by TreeMap).' },
    ],
    tasks: [
      { id: 'java-14-d19-t1', text: 'Build a TreeMap-based event scheduler. Add, remove, and query events by date range (subMap).', tag: 'lab' },
      { id: 'java-14-d19-t2', text: 'Implement LRU Cache using LinkedHashMap. Test with capacity 3. Demonstrate eviction.', tag: 'lab' },
      { id: 'java-14-d19-t3', text: 'Benchmark: insert 100K entries into HashMap vs TreeMap. Compare insertion and lookup times.', tag: 'drill' },
      { id: 'java-14-d19-t4', text: 'Use TreeSet with custom Comparator to store strings sorted by length, then alphabetically.', tag: 'drill' },
      { id: 'java-14-d19-t5', text: 'Explain: Why does TreeMap not allow null keys? What is O(log n) vs O(1)?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 20: Lambdas & Functional Interfaces
  // ================================================================
  {
    id: 'java-14-d20', number: 28,
    title: 'Lambdas & Functional Interfaces',
    subtitle: 'Functions without names — Java 8 in one day',
    duration: 90,
    topics: ['Lambda Expressions', 'Functional Interfaces', 'java.util.function', 'Method References (intro)', 'Lambda vs Anonymous'],
    alignment: ['Oracle Java Tutorials: Lambda Expressions'],
    blocks: [
      { type: 'callout', id: 'd20-intro', calloutType: 'info', title: 'Functions without names', content: 'Java 8 (2014) was the biggest release in Java history, and **lambdas** were the headline feature. Five lines of anonymous-class boilerplate collapsed into a single line. A lambda can ONLY replace an interface with exactly one abstract method — a **functional interface**. Java ships a rich set of built-in ones in `java.util.function`. Today: the lambda syntax, the standard functional interfaces, and when to reach for a method reference. Tomorrow (Day 29) we layer **streams** on top — the declarative pipeline that lambdas make possible.' },
      { type: 'heading', id: 'd20-lambda', level: 2, content: 'Lambda Syntax — Functions Without Names' },
      { type: 'code', id: 'd20-lambda-code', lang: 'java', title: 'From Anonymous Class to Lambda', code: '// BEFORE Java 8: Anonymous inner class\nRunnable task = new Runnable() {\n    @Override\n    public void run() {\n        System.out.println("Running...");\n    }\n};\n\n// AFTER Java 8: Lambda (equivalent!)\nRunnable task = () -> System.out.println("Running...");\n\n// Lambda syntax: (parameters) -> { body }\n// If the body is one expression, the {} and return are optional.\n\nComparator<String> byLength = (s1, s2) -> s1.length() - s2.length();\n\n// Multiple statements need braces + return\nComparator<String> complex = (s1, s2) -> {\n    int diff = s1.length() - s2.length();\n    if (diff != 0) return diff;\n    return s1.compareTo(s2);\n};' },
      { type: 'callout', id: 'd20-callout', calloutType: 'tip', title: 'Lambda syntax cheatsheet', content: '```java\n() -> expr                          // no params, expression body\nx -> expr * 2                       // one param, no parens\n(x) -> expr * 2                     // one param, with parens\n(x, y) -> expr + x + y              // multiple params\nx -> { stmt; stmt; return value; }  // block body with multiple statements\n```\n\nThe compiler infers parameter types from the target type. You almost never write them explicitly.' },
      { type: 'heading', id: 'd20-functional', level: 2, content: 'Functional Interfaces — The Target Type' },
      { type: 'paragraph', id: 'd20-fi-p', content: 'A lambda can ONLY replace a **functional interface** — an interface with exactly ONE abstract method. The `@FunctionalInterface` annotation enforces this at compile time. Java provides built-in ones in `java.util.function` — learn these four and you can do most of what lambdas are used for.' },
      { type: 'table', id: 'd20-fi-table', headers: ['Interface', 'Method', 'Input → Output', 'Use'], rows: [
        ['Predicate<T>', 'boolean test(T t)', 'T -> boolean', 'Filtering, validation'],
        ['Consumer<T>', 'void accept(T t)', 'T -> void', 'forEach, side effects'],
        ['Function<T,R>', 'R apply(T t)', 'T -> R', 'Transforming, mapping'],
        ['Supplier<T>', 'T get()', '() -> T', 'Lazy generation, factories'],
      ] },
      { type: 'code', id: 'd20-fi-code', lang: 'java', title: 'The Four Pillars of Functional Interfaces', code: '// Predicate: test something, return boolean\nPredicate<String> isEmpty = s -> s.isEmpty();\nPredicate<Integer> isEven = n -> n % 2 == 0;\nSystem.out.println(isEven.test(42));  // true\n\n// Consumer: do something, return nothing\nConsumer<String> printer = s -> System.out.println(s);\nprinter.accept("Hello Lambda!");\n\n// Function: transform input to output\nFunction<String, Integer> length = s -> s.length();\nFunction<Integer, String> stars = n -> "*".repeat(n);\nSystem.out.println(length.apply("Java"));       // 4\nSystem.out.println(stars.apply(5));             // *****\n\n// Supplier: provide values (lazy!)\nSupplier<Double> random = () -> Math.random();\nSystem.out.println(random.get());  // 0.123456...' },
      { type: 'callout', id: 'd20-bi', calloutType: 'info', title: 'The extended family — when you need more', content: 'Beyond the four pillars, `java.util.function` offers:\n\n- **`UnaryOperator<T>`** — `Function<T, T>`. Same input and output type. E.g., `String::trim`.\n- **`BinaryOperator<T>`** — `BiFunction<T, T, T>`. Two inputs of the same type. E.g., `(a, b) -> a + b`.\n- **`BiFunction<T, U, R>`** — two inputs of possibly different types, one output. E.g., `(name, age) -> name + " is " + age`.\n- **`BiPredicate<T, U>`** — two inputs, returns boolean. E.g., `(s, n) -> s.length() > n`.\n- **`BiConsumer<T, U>`** — two inputs, returns void. E.g., map entries `forEach((k, v) -> ...)`.\n\nYou will not need all of these often, but they show up in `Map.forEach`, `Stream.reduce`, and `Comparator.thenComparing`.' },
      { type: 'heading', id: 'd20-methodref', level: 2, content: 'Method References — Lambda Shorthand' },
      { type: 'code', id: 'd20-mr-code', lang: 'java', title: 'Four Kinds of `::`', code: '// 1. Static method: ClassName::methodName\nFunction<String, Integer> parse = Integer::parseInt;\n// Equivalent: s -> Integer.parseInt(s)\n\n// 2. Instance method of a specific object: instance::methodName\nString prefix = "Mr. ";\nFunction<String, String> addPrefix = prefix::concat;\n// Equivalent: s -> prefix.concat(s)\n\n// 3. Instance method of an arbitrary object of the type: ClassName::instanceMethod\nFunction<String, Integer> length = String::length;\n// Equivalent: s -> s.length()\n\n// 4. Constructor reference: ClassName::new\nSupplier<ArrayList<String>> listFactory = ArrayList::new;\n// Equivalent: () -> new ArrayList<>()\n\n// Use `::` whenever the lambda body is JUST a call to one method.\n// Otherwise prefer the explicit lambda for clarity.' },
      // Doubt
      { type: 'callout', id: 'd20-d1', calloutType: 'doubt', title: 'When should I use a lambda vs an anonymous class?', content: '**Lambda** — when the target type is a FUNCTIONAL INTERFACE (1 abstract method). Lambdas are shorter, and the JVM optimizes them better (invokedynamic, no extra .class file generated).\n\n**Anonymous class** — when the target has MULTIPLE methods, when you need to access `this` (a lambda\'s `this` refers to the enclosing instance, an anonymous class\'s `this` refers to itself), or when you need to initialize fields.\n\n99% of the time: lambda. The only common exception: listeners with multiple event methods (rare in modern code).' },
      // Exam
      { type: 'callout', id: 'd20-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Lambda replaces anonymous class of functional interface** — the #1 Java 8 MCQ.\n2. **Functional interface** = exactly one abstract method. `@FunctionalInterface` is optional documentation.\n3. **Method references**: `String::length` (instance), `Integer::parseInt` (static), `ArrayList::new` (constructor).\n4. **Four pillars**: `Predicate<T>` (returns boolean), `Consumer<T>` (returns void), `Function<T,R>` (transforms), `Supplier<T>` (provides).\n5. **Block lambdas need braces and explicit return** for non-expression bodies.' },
      // Bridge
      { type: 'callout', id: 'd20-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Lambdas replace the anonymous Comparator classes from Day 19. Method references use the same `::` syntax you have already seen with `System.out::println`. The functional interfaces here appear in every modern Java framework — Spring, Vert.x, RxJava.\n\nTomorrow (Day 29) is the final day: **Streams & Inner Classes**. Streams layer on top of lambdas and turn imperative loops into declarative pipelines. Inner classes are the one place where anonymous classes still beat lambdas.' },
      // Quick Ref
      { type: 'table', id: 'd20-qref', headers: ['Concept', 'Syntax / Notes'], rows: [
        ['Lambda', '(params) -> expression  OR  (params) -> { statements; }'],
        ['Functional interface', 'Exactly ONE abstract method. @FunctionalInterface optional.'],
        ['Predicate<T>', 'boolean test(T t) — filtering, validation.'],
        ['Consumer<T>', 'void accept(T t) — forEach, side effects.'],
        ['Function<T,R>', 'R apply(T t) — transforms input to output.'],
        ['Supplier<T>', 'T get() — lazy generation, factories.'],
        ['Method ref', 'Class::staticMethod, obj::instanceMethod, Class::instanceMethod, Class::new.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd20-quiz', title: 'Day 28 Quiz', questions: [
        { id: 'd20-q1', question: 'What determines if an interface can be used with a lambda?', options: ['It must be public', 'It must have exactly one abstract method (functional interface)', 'It must extend FunctionalInterface', 'It must have no default methods'], correctIndex: 1, explanation: 'A functional interface has exactly one abstract method. It MAY have default and static methods — those do not count. @FunctionalInterface is optional but recommended.' },
        { id: 'd20-q2', question: 'Which functional interface returns a value of the same type it takes?', options: ['Predicate<T>', 'Consumer<T>', 'UnaryOperator<T>', 'Supplier<T>'], correctIndex: 2, explanation: 'UnaryOperator<T> is Function<T, T> — same input and output. Predicate returns boolean. Consumer returns void. Supplier takes no args and returns T.' },
        { id: 'd20-q3', question: 'What does `Integer::parseInt` represent?', options: ['Instance method reference', 'Static method reference', 'Constructor reference', 'Lambda'], correctIndex: 1, explanation: '`Integer::parseInt` is a reference to the static method `Integer.parseInt(String)`. Equivalent to `s -> Integer.parseInt(s)`.' },
        { id: 'd20-q4', question: 'Which lambda is invalid?', options: ['Runnable r = () -> System.out.println("hi");', 'Comparator<String> c = (a, b) -> a.length() - b.length();', 'Function<Integer, Integer> f = x -> { return x * 2; };', 'Supplier<String> s = "hello";'], correctIndex: 3, explanation: 'Supplier has no parameters and returns T. `"hello"` is an assignment, not a lambda. The other three are valid lambdas.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd20-cards', title: 'Day 28 Flashcards', cards: [
        { id: 'd20-f1', front: 'Lambda syntax?', back: '(params) -> expression  OR  (params) -> { statements; }. Single-expression body: braces and return optional. Block body: braces required, explicit return for non-void. The compiler infers parameter types from the target type.', hint: '(params) -> body...' },
        { id: 'd20-f2', front: 'What is a functional interface?', back: 'An interface with exactly ONE abstract method. May have default and static methods. @FunctionalInterface annotation enforces this at compile time. Lambda can replace any functional interface.', hint: 'One abstract method...' },
        { id: 'd20-f3', front: 'The four pillars of java.util.function?', back: 'Predicate<T> (T -> boolean, test()), Consumer<T> (T -> void, accept()), Function<T,R> (T -> R, apply()), Supplier<T> (() -> T, get()). Combine with .andThen(), .compose(), BiPredicate/BiFunction for two-input versions.', hint: 'Predicate/Consumer/Function/Supplier...' },
        { id: 'd20-f4', front: 'Method reference types?', back: 'Class::staticMethod (Math::max). object::instanceMethod (System.out::println). Class::instanceMethod (String::length). Class::new (ArrayList::new). Use :: to replace simple lambdas that just call one method.', hint: 'Four kinds of double-colon...' },
      ] },
      // Practices (6, at end of day)
      { type: 'practice', id: 'd20-p1', lang: 'java', title: 'Practice: Greet lambda', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: declare a Runnable that prints "Hello, Lambda!" — use a lambda
        // TODO 2: run the Runnable
        // TODO 3: declare a Consumer<String> that prints "Hello, <name>!" — use a lambda
        // TODO 4: call accept() with three different names
        // TODO 5: declare a Supplier<Double> for a random number — call get() 3 times and print
    }
}` },
      { type: 'practice', id: 'd20-p2', lang: 'java', title: 'Practice: StringTransformer interface', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: define a functional interface StringTransformer with String transform(String s)
        // TODO 2: create instances for: uppercase, lowercase, reverse, truncate(10)
        // TODO 3: chain them — apply uppercase then truncate
        // TODO 4: pass each transformer as a method argument to a helper process(String s, StringTransformer t)
    }
    // TODO 5: write process(String s, StringTransformer t) that returns t.transform(s)
    // TODO 6: define the interface inside this file (top-level or nested)
}` },
      { type: 'practice', id: 'd20-p3', lang: 'java', title: 'Practice: Predicate composition', starter: `import java.util.function.Predicate;
public class Test {
    public static void main(String[] args) {
        // TODO 1: Predicate<String> isLongEnough = s -> s.length() >= 3
        // TODO 2: Predicate<String> startsWithVowel = s -> "aeiouAEIOU".indexOf(s.charAt(0)) >= 0
        // TODO 3: Predicate<String> isValidName = isLongEnough.and(startsWithVowel)
        // TODO 4: test isValidName on "Alice", "Bob", "Eve", "Al", "Carol"
        //   expect: Alice=true, Bob=true, Eve=true, Al=false (too short), Carol=true
        // TODO 5: Predicate<String> tooShort = s -> s.length() < 3
        // TODO 6: Predicate<String> isInvalidName = tooShort.or(startsWithVowel.negate())
        // TODO 7: test isInvalidName on the same names — should be the inverse of isValidName
    }
}` },
      { type: 'practice', id: 'd20-p4', lang: 'java', title: 'Practice: Convert lambdas to method references', starter: `import java.util.function.*;
public class Test {
    public static void main(String[] args) {
        // Each lambda below can be rewritten as a method reference.
        // Replace the right-hand side of each line with the :: form.
        // Verify the program still compiles and runs the same.

        // TODO 1: Function<String, Integer> length = s -> s.length();
        //         rewrite as: Function<String, Integer> length = String::length;
        Function<String, Integer> length = s -> s.length();
        System.out.println(length.apply("hello"));  // 5

        // TODO 2: Function<String, String> upper = s -> s.toUpperCase();
        Function<String, String> upper = s -> s.toUpperCase();
        System.out.println(upper.apply("hello"));  // HELLO

        // TODO 3: Supplier<ArrayList<String>> listMaker = () -> new ArrayList<>();
        Supplier<ArrayList<String>> listMaker = () -> new ArrayList<>();
        System.out.println(listMaker.get().size());  // 0

        // TODO 4: Consumer<String> printer = s -> System.out.println(s);
        Consumer<String> printer = s -> System.out.println(s);
        printer.accept("test");  // test

        // TODO 5: BiFunction<Integer, Integer, Integer> add = (a, b) -> Integer.sum(a, b);
        BiFunction<Integer, Integer, Integer> add = (a, b) -> Integer.sum(a, b);
        System.out.println(add.apply(3, 4));  // 7
    }
}` },
      { type: 'practice', id: 'd20-p5', lang: 'java', title: 'Practice: BiFunction chain', starter: `import java.util.function.*;
public class Test {
    public static void main(String[] args) {
        // TODO 1: BiFunction<String, String, String> concat = (a, b) -> a + " " + b
        // TODO 2: Function<String, Integer> wordCount = s -> s.split(" ").length
        // TODO 3: compose them — wordCount.apply(concat.apply("hello", "world"))  // 2
        //         use Function.andThen() / Function.compose() for clarity:
        //         BiFunction<String, String, String> addSpace = ...;
        //         Function<String, Integer> countWords = ...;
        //         apply them in sequence
        // TODO 4: write a method applyTwice(Function<Integer,Integer> f, int x) that returns f(f(x))
        //         use it with n -> n+1 and n -> n*2 starting from 3
    }
}` },
      { type: 'practice', id: 'd20-p6', lang: 'java', title: 'Practice: ScoreValidator pipeline', starter: `import java.util.function.*;
public class Test {
    public static void main(String[] args) {
        int[] scores = {42, 85, 91, 30, 67, 100, 55, 73};

        // TODO 1: Predicate<Integer> isPassing = s -> s >= 50
        // TODO 2: Predicate<Integer> isHonors = s -> s >= 85
        // TODO 3: Function<Integer, String> grade =
        //           s -> s >= 90 ? "A" : s >= 80 ? "B" : s >= 70 ? "C" : s >= 60 ? "D" : "F"
        // TODO 4: Consumer<String> announce = msg -> System.out.println("Result: " + msg)
        // TODO 5: for each score: if isPassing.test(s) print "Score <s>: <grade.apply(s)>"
        //                       if !isPassing.test(s) print "Score <s>: FAILED"
        //         use only the four functional interface variables you defined — no if/else for the
        //         grade logic inside the loop body beyond the pass/fail check
        // TODO 6: count how many honors scores there are using a stream-like helper
        //         (you can use a plain for loop and isHonors, since streams are Day 29)
    }
}` },
    ],
    tasks: [
      { id: 'java-14-d20-t1', text: 'Write a custom functional interface StringTransformer with String transform(String). Use it with three lambdas: upper, lower, reverse.', tag: 'lab' },
      { id: 'java-14-d20-t2', text: 'Chain three Predicate operations: .and(), .or(), .negate(). Build a name validator that requires length >= 3 AND starts with a vowel.', tag: 'lab' },
      { id: 'java-14-d20-t3', text: 'Convert 5 lambdas to method references. Verify the program behaves identically.', tag: 'drill' },
      { id: 'java-14-d20-t4', text: 'Compose BiFunction and Function: take two strings, join with a space, then count words.', tag: 'drill' },
      { id: 'java-14-d20-t5', text: 'Build a ScoreValidator pipeline: Predicate (passing), Predicate (honors), Function (letter grade), Consumer (announce). Use all four in main.', tag: 'lab' },
      { id: 'java-14-d20-t6', text: 'Explain: what is a functional interface? List the four pillars and what each does. Why does Java need the @FunctionalInterface annotation?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 20-NEXT: Streams & Inner Classes — the last day
  // ================================================================
  {
    id: 'java-14-d20-next', number: 29,
    title: 'Streams & Inner Classes',
    subtitle: 'Declarative data pipelines and the one place anonymous still wins',
    duration: 90,
    topics: ['Stream API', 'Intermediate Operations', 'Terminal Operations', 'Collectors', 'Anonymous Classes', 'Inner Classes'],
    alignment: ['Oracle Java Tutorials: Streams', 'Baeldung: Java 8 Streams'],
    blocks: [
      { type: 'callout', id: 'd20n-intro', calloutType: 'info', title: 'Streams + inner classes — the last day', content: 'Yesterday you met lambdas and functional interfaces. Today we layer **streams** on top — SQL-like pipelines for collections. Then we close the loop on **inner classes** — the four flavours (member, static nested, local, anonymous) and the one place where anonymous classes still beat lambdas. By tonight you will have seen every major Java feature covered in this 29-day curriculum. The Phase 5 checkpoint in Day 20 was your midway mark — today is the finish line.' },
      { type: 'heading', id: 'd20n-streams', level: 2, content: 'Stream API — Functional Data Processing' },
      { type: 'paragraph', id: 'd20n-streams-p', content: 'Streams let you process collections with SQL-like operations: filter, map, sort, collect. They do NOT modify the source. They are LAZY — intermediate operations run only when a terminal operation is called. The pipeline has three parts: source, intermediate ops, terminal op.' },
      { type: 'code', id: 'd20n-stream-code', lang: 'java', title: 'Stream Pipeline — The Full Pattern', code: 'List<String> names = Arrays.asList("Vinayak", "Amit", "Riya", "Zara", "Vikram", "Ananya");\n\n// FILTER -> MAP -> SORT -> COLLECT — the standard pipeline\nList<String> result = names.stream()\n    .filter(name -> name.startsWith("V"))       // keep only V names\n    .map(name -> name.toUpperCase())            // transform to uppercase\n    .sorted()                                    // sort alphabetically\n    .collect(Collectors.toList());               // collect into List\n// Result: [VIKRAM, Vinayak]\n\n// More terminal operations:\nlong count = names.stream().filter(n -> n.length() > 4).count();  // count long names\n\nboolean anyV = names.stream().anyMatch(n -> n.startsWith("V"));     // any starts V?\nboolean allLong = names.stream().allMatch(n -> n.length() > 2);     // all > 2 chars?\n\n// Reduce: combine elements into single result\nint totalLength = names.stream()\n    .mapToInt(String::length)   // String::length = method reference\n    .sum();                      // terminal: sum all lengths\n\n// Find first / find any\nOptional<String> first = names.stream().filter(n -> n.length() == 4).findFirst();' },
      { type: 'callout', id: 'd20n-lazy', calloutType: 'warn', title: 'Why laziness matters', content: 'Intermediate operations (`filter`, `map`, `sorted`) do NOT run when called. They just build a recipe. The recipe only executes when you call a **terminal operation** like `collect`, `count`, `forEach`, or `findFirst`.\n\nThis lets the JVM **fuse** operations together, **short-circuit** when possible (e.g., `anyMatch` stops at the first match), and avoid building intermediate collections. The price: debugging streams is harder because nothing prints until the terminal op runs.' },
      { type: 'callout', id: 'd20n-flatmap', calloutType: 'info', title: 'map vs flatMap', content: '**`map`** — transforms each element to one output element.\n\n```java\nList<String> words = Arrays.asList("hello", "world");\nList<Integer> lengths = words.stream().map(String::length).collect(toList());\n// [5, 5]\n```\n\n**`flatMap`** — transforms each element to a STREAM of outputs, then flattens all the streams into one.\n\n```java\nList<String> lines = Arrays.asList("hello world", "foo bar");\nList<String> words = lines.stream()\n    .flatMap(line -> Arrays.stream(line.split(" ")))\n    .collect(toList());\n// [hello, world, foo, bar]\n```\n\nUse `flatMap` when one element expands to many. `map` is for one-to-one.' },
      { type: 'callout', id: 'd20n-collectors', calloutType: 'info', title: 'Collectors — the terminal side', content: '`collect(Collectors.toXxx())` is the most common terminal. Useful collectors:\n\n- `toList()`, `toSet()` — flat collections.\n- `toMap(keyFn, valueFn)` — build a Map.\n- `joining(separator)` — String concatenation.\n- `counting()`, `summingInt(fn)` — numeric reductions.\n- `groupingBy(fn)` — group elements by a key into a `Map<K, List<V>>`.\n- `partitioningBy(predicate)` — split into true/false groups.\n\n```java\nMap<Integer, List<String>> byLength =\n    words.stream().collect(Collectors.groupingBy(String::length));\n// { 3=[foo], 5=[hello, world] }\n```' },
      { type: 'heading', id: 'd20n-inner', level: 2, content: 'Inner Classes — The Four Flavours' },
      { type: 'code', id: 'd20n-inner-code', lang: 'java', title: 'Types of Nested Classes', code: 'class Outer {\n    private int outerField = 10;\n\n    // 1. MEMBER INNER CLASS — inside class, not static.\n    //    Can access outer private fields directly.\n    class Inner {\n        void display() {\n            System.out.println(outerField);\n        }\n    }\n\n    // 2. STATIC NESTED CLASS — behaves like a top-level class\n    //    but lives inside another for namespacing.\n    static class StaticNested {\n        void show() { System.out.println("Static nested"); }\n    }\n\n    void method() {\n        int localVar = 42;  // effectively final (Java 8+)\n\n        // 3. LOCAL CLASS — declared inside a method.\n        //    Can read effectively-final local variables.\n        class Local {\n            void print() { System.out.println(localVar); }\n        }\n\n        // 4. ANONYMOUS CLASS — unnamed, one-time use.\n        //    Defined AND instantiated in a single expression.\n        Runnable r = new Runnable() {\n            @Override\n            public void run() {\n                System.out.println("Anonymous!");\n            }\n        };\n    }\n}\n\n// Use inner classes\nOuter.Inner inner = new Outer().new Inner();  // needs an Outer instance\nOuter.StaticNested nested = new Outer.StaticNested();  // no Outer needed' },
      { type: 'callout', id: 'd20n-this', calloutType: 'info', title: 'this in lambda vs anonymous class — the gotcha', content: '**Inside a lambda**, `this` refers to the **enclosing** instance. The lambda does not have its own `this`.\n\n**Inside an anonymous class**, `this` refers to the anonymous instance itself. If you need the enclosing `this`, write `OuterClass.this`.\n\n```java\nclass Outer {\n    String name = "outer";\n    Runnable lambda = () -> System.out.println(this.name);        // outer\n    Runnable anon   = new Runnable() {\n        @Override public void run() { System.out.println(this.name); }  // null! (anonymous has no name field)\n    };\n}\n```\n\nThis is one of the few cases where anonymous classes still beat lambdas. If you need per-instance state in the callable, anonymous is the right choice.' },
      // Doubt
      { type: 'callout', id: 'd20n-d1', calloutType: 'doubt', title: 'Are streams always faster than loops?', content: '**NOT always.** Streams have overhead (object creation, lambda invocation, pipeline construction). For small collections (< 100 elements), plain loops are often faster.\n\nStreams shine with:\n\n- Large collections (>10K elements) — can be parallelized with `.parallelStream()`.\n- Readability — intent is clearer.\n- Chaining — filter -> map -> collect reads like a pipeline.\n\n**Rule**: use streams for readability and parallel potential. Use loops when microbenchmarks show streams are slower. Never `parallelStream()` on small collections — thread overhead exceeds gains.' },
      { type: 'callout', id: 'd20n-d2', calloutType: 'doubt', title: 'When do I still need an anonymous class?', content: 'Three cases where anonymous still wins over lambdas:\n\n1. **State per instance.** The anonymous class can have its own fields. Lambdas cannot.\n2. **Multiple methods.** An anonymous class can override multiple methods. Lambdas only handle ONE abstract method.\n3. **Need a fresh `this`.** When you need `this` to refer to the callable itself, not the enclosing instance.\n\nFor 95% of real-world usage — Runnable, Callable, Comparator, event listeners, callbacks — lambdas win. Reach for anonymous only when one of the three above applies.' },
      // Exam
      { type: 'callout', id: 'd20n-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Stream is LAZY** — intermediate ops do NOT run until a terminal op is called.\n2. **map vs flatMap** — map is one-to-one, flatMap is one-to-many (then flattens).\n3. **`collect(Collectors.groupingBy(fn))`** — splits a stream into a `Map<K, List<V>>` keyed by `fn`.\n4. **4 inner-class flavours**: member (non-static inner), static nested, local (in method), anonymous (no name).\n5. **`this` in a lambda** refers to the enclosing instance, not the lambda. In an anonymous class, `this` is the anonymous instance.' },
      // Bridge
      { type: 'callout', id: 'd20n-bridge', calloutType: 'bridge', title: 'Connect the Dots — end of course', content: 'You have covered the entire B.E. (AIML) Java syllabus in 29 days: fundamentals, OOP, exceptions, generics, collections, recursion, modern Java. Every concept from the previous 28 days shows up in real code. The lambdas here flow through Spring Boot, every REST controller you will ever write, every Java Streams API call.\n\nYou have finished **Java Mastery** — 29 days of concepts, doubt clinics, exam alerts, and 5–6 practices per day. The completion callout in Day 18 (d12) marks the checkpoint. What you do next is yours: build the project you have been planning, contribute to an open-source Java repo, or move on to the Advanced Java course.' },
      // Quick Ref
      { type: 'table', id: 'd20n-qref', headers: ['Concept', 'Syntax / Notes'], rows: [
        ['Stream pipeline', 'source.stream().intermediate().terminal(). E.g., filter -> map -> collect.'],
        ['filter', 'Stream<T> filter(Predicate<T>) — keeps matching elements.'],
        ['map', 'Stream<R> map(Function<T,R>) — transforms each element.'],
        ['flatMap', 'Stream<R> flatMap(Function<T, Stream<R>>) — one-to-many, then flattens.'],
        ['collect', 'Collectors.toList(), toSet(), toMap(), joining(), groupingBy().'],
        ['reduce', 'Optional<T> reduce(BinaryOperator<T>) — combine to single result.'],
        ['Member inner', 'class Inner { } inside Outer, non-static. Has implicit outer reference.'],
        ['Static nested', 'static class Nested { } inside Outer. No outer reference.'],
        ['Local class', 'class Local { } inside a method. Can read effectively-final locals.'],
        ['Anonymous', 'new Interface() { ... }; no name. Has own `this`.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd20n-quiz', title: 'Day 29 Quiz', questions: [
        { id: 'd20n-q1', question: 'When does a stream\'s filter() operation actually execute?', options: ['Immediately when .filter() is called', 'When a terminal operation (collect, count, forEach) is called', 'At the end of the current statement', 'When the stream is garbage collected'], correctIndex: 1, explanation: 'Streams are LAZY. Intermediate operations (filter, map, sorted) just build a pipeline. They execute only when a terminal operation (collect, count, forEach, reduce) is called.' },
        { id: 'd20n-q2', question: 'What does names.stream().map(String::toUpperCase) use?', options: ['A static method reference', 'An instance method reference of a particular object', 'An instance method reference of an arbitrary object of that type', 'A constructor reference'], correctIndex: 2, explanation: 'String::toUpperCase is an instance method reference of an arbitrary object. Each element (String) calls toUpperCase() on itself. Equivalent to: s -> s.toUpperCase().' },
        { id: 'd20n-q3', question: 'Inside a lambda, what does `this` refer to?', options: ['The lambda itself', 'The enclosing instance', 'The first parameter', 'Null'], correctIndex: 1, explanation: 'A lambda has no own `this`. It refers to the enclosing instance. Anonymous classes DO have their own `this`, pointing to the anonymous instance.' },
        { id: 'd20n-q4', question: 'Which inner-class flavour lets you have multiple methods and per-instance fields?', options: ['Member inner', 'Static nested', 'Local class', 'Anonymous'], correctIndex: 3, explanation: 'Anonymous classes can have fields and implement multiple methods. Lambdas cannot (single abstract method). The other three are limited: member/static need the outer class structure, local is scoped to a method.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd20n-cards', title: 'Day 29 Flashcards', cards: [
        { id: 'd20n-f1', front: 'Stream pipeline — common operations?', back: 'Intermediate (lazy): filter, map, flatMap, distinct, sorted, limit, skip. Terminal (eager): collect, forEach, count, reduce, findFirst, findAny, anyMatch, allMatch, noneMatch.', hint: 'Lazy -> eager...' },
        { id: 'd20n-f2', front: 'map vs flatMap?', back: 'map: one-to-one. Each element -> one transformed element. flatMap: one-to-many. Each element -> a Stream, all streams flattened into one. Use flatMap when splitting a String into words, splitting a List<List<T>> into a flat Stream, etc.', hint: '1-to-1 vs 1-to-many...' },
        { id: 'd20n-f3', front: '4 types of inner/nested classes?', back: '1. Member inner class (inside class, not static). 2. Static nested class (static inside class). 3. Local class (inside method). 4. Anonymous class (unnamed, instantiated inline). Each has different access to enclosing members.', hint: 'Member, static, local, anonymous...' },
        { id: 'd20n-f4', front: 'this in lambda vs anonymous?', back: 'Lambda: `this` = enclosing instance. The lambda has no own `this`. Anonymous: `this` = the anonymous instance itself. If you need the enclosing instance from inside an anonymous, write `OuterClass.this`.', hint: 'Lambda -> enclosing. Anonymous -> own...' },
      ] },
      // Practices (6, at end of day)
      { type: 'practice', id: 'd20n-p1', lang: 'java', title: 'Practice: Stream pipeline', starter: `import java.util.*;
import java.util.stream.*;
public class Test {
    public static void main(String[] args) {
        List<String> words = Arrays.asList(
            "java", "stream", "lambda", "functional", "interface",
            "generic", "collection", "array", "hashmap", "treeset"
        );

        // TODO 1: All words longer than 5 chars, sorted alphabetically — expect [collection, functional, hashmap, interface]
        // TODO 2: The longest word — expect "collection" or "functional"
        // TODO 3: Average word length — expect around 6.0
        // TODO 4: Comma-separated UPPERCASE string — expect "JAVA,STREAM,LAMBDA,..."
        // TODO 5: Group words by their length into a Map<Integer, List<String>>
        //         print each entry like "Length 5: [array, trees]"
        // TODO 6: Find the most common first letter — expect 'c' (collection) or 'f' (functional)
    }
}` },
      { type: 'practice', id: 'd20n-p2', lang: 'java', title: 'Practice: Word counter', starter: `import java.util.*;
import java.util.stream.*;
public class Test {
    public static void main(String[] args) {
        String text = "the quick brown fox jumps over the lazy dog the fox was quick";
        // TODO 1: split into words, count frequency of each word via streams
        //         (NOT a Map, just iterate and count via groupingBy)
        // TODO 2: print each word and its count in descending order
        // TODO 3: print the most common word (single result)
        // TODO 4: print how many words appear exactly once
        //         hint: filter by value == 1, then count
    }
}` },
      { type: 'practice', id: 'd20n-p3', lang: 'java', title: 'Practice: reduce + groupingBy', starter: `import java.util.*;
import java.util.stream.*;
public class Test {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5);

        // TODO 1: sum using reduce(BinaryOperator<Integer>)
        //         hint: nums.stream().reduce(0, (a, b) -> a + b)
        // TODO 2: product using reduce — expect 3 * 1 * 4 * 1 * ... = ?
        // TODO 3: max using reduce — expect 9
        //         hint: nums.stream().reduce(Integer.MIN_VALUE, Integer::max)
        // TODO 4: group by parity (even/odd) — expect {false=[4, 2, 6], true=[3, 1, 1, 5, 9, 5, 3, 5]}
        // TODO 5: partition into two lists: <5 and >=5
        //         hint: partitioningBy(n -> n < 5)
    }
}` },
      { type: 'practice', id: 'd20n-p4', lang: 'java', title: 'Practice: Inner class access', starter: `public class Test {
    public static void main(String[] args) {
        // Build a University with TWO departments and demonstrate:
        // TODO 1: Department (member inner) can access outer.name directly
        // TODO 2: Grade (static nested) can NOT access outer.name directly
        //         confirm this by commenting out the offending line
        // TODO 3: create a local class inside main() that reads a local variable
        //         confirm it works (and what happens if you try to modify the variable)
        // TODO 4: create an anonymous Runnable that prints "Done!" and run it
    }
}
class University {
    private String name = "LPU";

    class Department {
        private String deptName;
        Department(String d) { deptName = d; }
        void display() {
            // TODO 1: print "<name> - <deptName>" — note: name is outer's field
        }
    }

    static class Grade {
        char grade;
        Grade(char g) { grade = g; }
        void show() {
            // TODO 2: try System.out.println(name) here — observe the compile error
            System.out.println("Grade: " + grade);
        }
    }
}` },
      { type: 'practice', id: 'd20n-p5', lang: 'java', title: 'Practice: Parallel stream timing', starter: `import java.util.*;
import java.util.stream.*;
public class Test {
    public static void main(String[] args) {
        // Build a list of 5 million random integers
        java.util.Random rng = new java.util.Random(42);
        List<Integer> nums = rng.ints(5_000_000, 0, 1_000_000).boxed().collect(Collectors.toList());

        // TODO 1: time a sequential stream that sums the even numbers squared
        //         (use System.currentTimeMillis() before and after)
        // TODO 2: time the same operation with .parallelStream()
        // TODO 3: time a plain for-loop doing the same thing
        // TODO 4: which is fastest? which is slowest? document your findings in a comment
        //         try with 100 elements too — does the order change?
    }
}` },
      { type: 'practice', id: 'd20n-p6', lang: 'java', title: 'Practice: Anonymous Comparator', starter: `import java.util.*;
public class Test {
    public static void main(String[] args) {
        // TODO 1: build an ArrayList<String> with 6 random words of varying lengths
        List<String> words = new ArrayList<>(Arrays.asList(
            "ant", "elephant", "bee", "hippopotamus", "cat", "dog"
        ));

        // TODO 2: sort with a LAMBDA by length ascending
        //         (Java's natural order for length is not built-in)
        // TODO 3: sort with an ANONYMOUS Comparator that sorts by length descending,
        //         then alphabetically for ties
        //         (this is where anonymous Comparator fits — multi-field with custom tie-breaking)
        // TODO 4: print the list after each sort

        // Bonus: rewrite step 3 using Comparator.comparingInt(String::length).reversed()
        //        .thenComparing(Comparator.naturalOrder())
        //        confirm it produces the same order
    }
}` },
    ],
    tasks: [
      { id: 'java-14-d20-next-t1', text: 'Process a list of integers with streams: filter even numbers, square them, sort descending, collect to list.', tag: 'lab' },
      { id: 'java-14-d20-next-t2', text: 'Convert a for-loop word counter to use streams: groupingBy identity, count, sort by count descending.', tag: 'drill' },
      { id: 'java-14-d20-next-t3', text: 'Create a member inner class, static nested class, and local class. Demonstrate access (or non-access) to outer members in each.', tag: 'lab' },
      { id: 'java-14-d20-next-t4', text: 'Time parallelStream vs sequential stream vs for-loop on 5M elements. Document when parallel wins.', tag: 'drill' },
      { id: 'java-14-d20-next-t5', text: 'Demonstrate the `this` gotcha: inside a lambda `this` is the outer; inside an anonymous class it is the anon. Write both and print `this.getClass().getName()`.', tag: 'lab' },
      { id: 'java-14-d20-next-t6', text: 'Sort a list of strings by length descending, then alphabetically for ties — once with an anonymous Comparator, once with Comparator.comparingInt().reversed().thenComparing().', tag: 'mcq' },
    ],
  },
];