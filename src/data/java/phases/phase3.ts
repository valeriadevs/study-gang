import type { Day } from '../../../types';

export const phase3days: Day[] = [
  // DAY 7: Classes, Objects, Constructors
  {
    id: 'java-14-d7', number: 7, title: 'Classes, Objects, and Constructors', duration: 120,
    topics: ['Class Definition', 'this Keyword', 'Constructors'],
    alignment: ['CodeGym: Creating Objects'],
    blocks: [
      { type: 'callout', id: 'd7-intro', calloutType: 'info', title: 'Welcome to OOP', content: 'OOP is a **way of thinking** about code as interacting objects. Class = blueprint. Object = instance. Constructor = the function that initializes a new object. Today: the foundation that Days 8-14 build on.' },
      { type: 'heading', id: 'd7-class', level: 2, content: 'Class vs Object — Blueprint vs House' },
      { type: 'code', id: 'd7-person', lang: 'java', title: 'Person Class (Lab Reference)', code: 'public class Person {\n    String name;\n    int age;\n\n    public Person(String name, int age) {\n        this.name = name;  // this.field = parameter\n        this.age = age;\n    }\n\n    public Person() {  // default constructor\n        this("Unknown", 0);\n    }\n\n    public void introduce() {\n        System.out.println("Hi, I\'m " + name + ", " + age);\n    }\n}' },
      { type: 'heading', id: 'd7-constructors', level: 2, content: 'Constructor Rules (Exam Essentials)' },
      { type: 'list', id: 'd7-con-rules', listStyle: 'number', items: ['Same name as the class. **NO return type** — not even void.', 'If you write NO constructor → Java provides a default no-arg constructor for you.', 'If you write ANY constructor → the default constructor **disappears**.', 'Constructors can be overloaded. Use `this()` for constructor chaining (must be the first line).', 'If you accidentally add `void` before the name, it becomes a regular method — NOT a constructor.'] },
      { type: 'code', id: 'd7-chaining', lang: 'java', title: 'Constructor Chaining', code: 'public class Student {\n    String name; int id; String branch;\n\n    public Student(String n, int i, String b) {\n        name=n; id=i; branch=b;\n    }\n    public Student(String n, int i) { this(n, i, "AIML"); }\n    public Student(String n) { this(n, 0); }\n}' },
      { type: 'heading', id: 'd7-this', level: 2, content: 'The this Keyword — Three Uses' },
      { type: 'list', id: 'd7-this-list', items: ['**this.fieldName** — disambiguates instance variables from parameters with the same name.', '**this.methodName()** — calls another method on the same object (rarely needed, since it is implicit).', '**this()** — calls another constructor of the same class (constructor chaining). Must be the first line.'] },
      // Doubt
      { type: 'callout', id: 'd7-d1', calloutType: 'doubt', title: "What if I don't write ANY constructor?", content: 'Java provides a **default no-arg constructor** automatically: `public Person() {}`. But it **disappears** the moment you write any constructor of your own. If you need both a parameterized AND a no-arg, you must write both explicitly.' },
      { type: 'callout', id: 'd7-d2', calloutType: 'doubt', title: 'Why use getters/setters instead of public fields?', content: '**Encapsulation** gives you three benefits:\n\n1. **Validate data** — reject negative ages, null names, etc., inside the setter.\n2. **Change the internal representation** without breaking external code (e.g., store `age` as `LocalDate` instead of `int`).\n3. **Make fields read-only** by providing a getter but no setter.\n\nThis pattern is tested in both theory and coding questions.' },
      // Exam
      { type: 'callout', id: 'd7-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Constructor has NO return type** — not even void. Adding `void` makes it a regular method.\n2. **Default constructor disappears** when you write your own.\n3. **`this()` must be the first line** in constructor chaining.\n4. **`this.field` vs parameter** — disambiguation is tested in code-tracing.' },
      // Bridge
      { type: 'callout', id: 'd7-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Constructors + `this` → **`super()` (Day 8)** for parent constructors. Getters/setters → **encapsulation** shows up in every OOP design question. Constructor overloading → **method overloading (Day 9)**.' },
      // Quick Ref
      { type: 'table', id: 'd7-qref', headers: ['Concept', 'Key Point'], rows: [['Constructor', 'Same name as class. No return type. Called via `new`.'], ['this keyword', '3 uses: field access, method call, constructor chaining.'], ['Default constructor', 'Auto-provided if no constructor exists. Disappears otherwise.'], ['Encapsulation', 'private fields + public getters/setters. Validate in setters.']] },
      // Quiz
      { type: 'quiz', id: 'd7-quiz', title: 'Day 7 Quiz', questions: [
        { id: 'd7-q1', question: 'Which of these is a valid constructor?', options: ['public void Person() {}', 'public Person() {}', 'public static Person() {}', 'public int Person() {}'], correctIndex: 1, explanation: 'Constructors have NO return type. Adding void, int, or static makes it a regular method, not a constructor.' },
        { id: 'd7-q2', question: 'What happens if you write a parameterized constructor but no default constructor, then try `new Person()`?', options: ['It works — Java provides default', 'Compile error — no default constructor', 'It uses the parameterized one with nulls', 'Runtime error'], correctIndex: 1, explanation: 'Once you write ANY constructor, the default constructor disappears. You must explicitly add `public Person() {}` if you need it.' },
        { id: 'd7-q3', question: 'What is the purpose of encapsulation?', options: ['Making code run faster', 'Hiding implementation details and protecting data', 'Allowing multiple inheritance', 'Reducing class count'], correctIndex: 1, explanation: 'Encapsulation hides internal state and enforces controlled access via getters/setters. It enables validation and implementation changes without breaking external code.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd7-cards', title: 'Day 7 Flashcards', cards: [
        { id: 'd7-f1', front: 'Class vs Object?', back: 'Class = blueprint/template. Object = instance created from blueprint. One class → many objects. Each object has its own copy of instance variables.', hint: 'Blueprint vs house...' },
        { id: 'd7-f2', front: '3 uses of this keyword?', back: '1. this.field (disambiguate). 2. this.method() (call same object method). 3. this() (constructor chaining — must be first line).', hint: 'Field, method, constructor...' },
        { id: 'd7-f3', front: 'Constructor rules?', back: 'Same name as class. NO return type. Can be overloaded. If none written → default provided. If any written → default disappears. this() must be first line.', hint: 'No return type...' },
      ] },
      { type: 'practice', id: 'd7-p1', lang: 'java', title: 'Practice: Book Class', starter: 'public class Book {\n    String title, author; int pages; double price;\n    // TODO: full constructor, 2-param (title,author), default\n    // TODO: display() method\n    public static void main(String[] args) {\n        // Create 3 books, call display()\n    }\n}', hint: 'Chain: 2-param calls full with defaults. Default calls 2-param. Full constructor sets all fields.' },
      { type: 'practice', id: 'd7-p2', lang: 'java', title: 'Practice: Bank Account', starter: 'public class BankAccount {\n    private String holder; private double balance;\n    // TODO: constructor, getters, deposit(amount), withdraw(amount)\n    // withdraw should reject negative amounts and overdrafts\n    public static void main(String[] args) {\n        BankAccount a = new BankAccount("Vinay", 5000);\n        a.deposit(1000);\n        a.withdraw(2000);\n        System.out.println(a.getBalance()); // 4000\n    }\n}', hint: 'In withdraw: if(amount <= 0 || amount > balance) print error and return. Else balance -= amount.' },
    ],
    tasks: [
      { id: 'java-14-d7-t1', text: 'Implement Person class: name, age, email. Parameterized + default constructor, getters, setters, introduce().', tag: 'lab' },
      { id: 'java-14-d7-t2', text: 'Book class with 3 constructors using constructor chaining. Create and display multiple books.', tag: 'lab' },
      { id: 'java-14-d7-t3', text: 'Demonstrate this: local variable shadowing instance variable, resolved by this.field.', tag: 'drill' },
    ],
  },

  // DAY 8: Static & Inheritance
  {
    id: 'java-14-d8', number: 8, title: 'Static Members and Inheritance', duration: 120,
    topics: ['static Variables/Methods', 'Single Inheritance', 'Multilevel Inheritance'],
    blocks: [
      { type: 'callout', id: 'd8-intro', calloutType: 'info', title: 'Shared State and Code Reuse', content: '`static` members belong to the **class itself**, not to individual objects. **Inheritance** lets a child class pick up everything from its parent. Together, they are the backbone of code organization.' },
      { type: 'heading', id: 'd8-static', level: 2, content: 'Static — Belonging to the Class' },
      { type: 'code', id: 'd8-static-code', lang: 'java', title: 'Static Counter Example', code: 'class Student {\n    String name;\n    static int count = 0;\n    public Student(String n) { name=n; count++; }\n    static int getCount() { return count; }\n    // static methods CANNOT use `this` or access instance vars!\n}' },
      { type: 'callout', id: 'd8-static-rules', calloutType: 'warn', title: 'Static Method Rules', content: '1. Can ONLY directly access static members.\n2. CANNOT use `this` (there is no object context).\n3. Instance methods CAN access both static and instance members.\n4. `main` is static because the JVM calls it without first creating an object.' },
      { type: 'heading', id: 'd8-inherit', level: 2, content: 'Inheritance — extends' },
      { type: 'code', id: 'd8-inh-code', lang: 'java', title: 'Single + Multilevel Inheritance', code: 'class Animal {\n    String name;\n    Animal(String n) { name=n; }\n    void eat() { System.out.println(name+" eats"); }\n}\nclass Dog extends Animal {\n    Dog(String n) { super(n); }  // calls the parent constructor\n    void bark() { System.out.println(name+" barks"); }\n}\n// Multilevel: class A → class B → class C (chain of "is-a")' },
      { type: 'callout', id: 'd8-super', calloutType: 'tip', title: 'super — Three Uses', content: '1. **`super()`** — call the parent constructor (must be the first line in the child constructor).\n2. **`super.method()`** — call the parent\'s version of an overridden method.\n3. **`super.field`** — access a parent\'s field that has been shadowed by a same-named field in the child.' },
      { type: 'callout', id: 'd8-diamond', calloutType: 'warn', title: 'No Multiple Class Inheritance', content: 'Java does NOT allow `class C extends A, B`. This avoids the **Diamond Problem**: if A and B both define `doSomething()`, which version does C inherit? Java solves this with **interfaces (Day 10)**.' },
      // Doubt
      { type: 'callout', id: 'd8-d1', calloutType: 'doubt', title: "Why can't static methods use this?", content: '`this` refers to the **current object instance**. Static methods belong to the **class** — there is no object, so `this` has no meaning here. Think of it this way: you can call `Student.getCount()` without ever creating a Student object. What would `this` refer to then? Nothing.' },
      { type: 'callout', id: 'd8-d2', calloutType: 'doubt', title: 'Can a subclass access private members of its parent?', content: '**No.** `private` means private, even from subclasses. The subclass still inherits those members (they exist in memory), but it cannot touch them directly. Use `protected` if you want subclass access, or expose the value through a public/protected getter.' },
      // Exam
      { type: 'callout', id: 'd8-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Java does NOT support multiple class inheritance** — #1 OOP MCQ.\n2. **`super()` must be the first line** in a constructor (same as `this()`).\n3. **Static methods cannot be overridden**, only hidden.\n4. **`protected`** allows subclass access even from different packages.' },
      // Bridge
      { type: 'callout', id: 'd8-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Method overriding (touched on today) → **Polymorphism (Day 9)** for the full treatment. `super` → used heavily when overriding methods. Inheritance hierarchies → **abstract classes (Day 10)** formalize the parent.' },
      // Quick Ref
      { type: 'table', id: 'd8-qref', headers: ['Concept', 'Key Point'], rows: [['static field', 'One copy shared by all instances. Access via ClassName.field.'], ['static method', 'No `this`. Only accesses static members. Called via class.'], ['extends', 'Child inherits all non-private members from the parent.'], ['super()', 'Calls the parent constructor. Must be the first line.'], ['Multiple inheritance', 'NOT supported for classes. Supported via interfaces.']] },
      // Quiz
      { type: 'quiz', id: 'd8-quiz', title: 'Day 8 Quiz', questions: [
        { id: 'd8-q1', question: 'Why can a static method not access instance variables directly?', options: ['Security reasons', 'No object context exists', 'Instance variables are private', 'Static methods are slower'], correctIndex: 1, explanation: 'Static methods belong to the class and can be called without any object. Instance variables require an object to exist. Without an object, there is no instance variable to access.' },
        { id: 'd8-q2', question: 'What keyword does a subclass use to call its parent\'s constructor?', options: ['this', 'parent', 'super', 'base'], correctIndex: 2, explanation: 'super() calls the parent constructor. It must be the first line in the child constructor. If omitted, Java inserts super() (no-arg) automatically.' },
        { id: 'd8-q3', question: 'Why does Java not support multiple inheritance of classes?', options: ['Performance overhead', 'The Diamond Problem', 'Security concerns', 'It does — via extends A, B'], correctIndex: 1, explanation: 'The Diamond Problem: if class C extends A and B, and both have the same method, which version does C inherit? Java solves this with interfaces.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd8-cards', title: 'Day 8 Flashcards', cards: [
        { id: 'd8-f1', front: 'Static vs instance members?', back: 'Static: one copy per CLASS, accessed via ClassName.member. Instance: one copy per OBJECT, accessed via object.member. Static methods cannot use this.', hint: 'Class-level vs object-level...' },
        { id: 'd8-f2', front: 'Three uses of super?', back: 'super() = call parent constructor. super.method() = call parent method. super.field = access parent field (when shadowed). super() MUST be first line.', hint: 'Constructor, method, field...' },
        { id: 'd8-f3', front: 'What is the Diamond Problem?', back: 'When a class inherits from two parents that both define the same method — which version does the child use? Java prevents this by not allowing multiple class inheritance. Interfaces solve it.', hint: 'Two parents, same method...' },
      ] },
      { type: 'practice', id: 'd8-p1', lang: 'java', title: 'Practice: Vehicle Hierarchy', starter: 'class Vehicle {\n    String brand; int speed;\n    Vehicle(String b, int s) { brand=b; speed=s; }\n    void start() { System.out.println(brand+" starting"); }\n}\nclass Car extends Vehicle {\n    int doors;\n    Car(String b, int s, int d) { super(b,s); doors=d; }\n    @Override void start() { System.out.println(brand+" car engine starting"); }\n}\n// TODO: Add Bike class. In main, test both.', hint: 'Bike extends Vehicle. Add hasCarrier field. Override start(). Call super.start() inside to also invoke parent behavior.' },
      { type: 'practice', id: 'd8-p2', lang: 'java', title: 'Practice: Employee Hierarchy', starter: 'class Employee {\n    String name; double salary;\n    Employee(String n, double s) { name=n; salary=s; }\n    double getSalary() { return salary; }\n}\nclass Manager extends Employee {\n    double bonus;\n    Manager(String n, double s, double b) { super(n,s); bonus=b; }\n    @Override double getSalary() { return salary + bonus; }\n}\n// TODO: Add Director extends Manager with stock options\npublic class Test {\n    public static void main(String[] args) {\n        Employee e = new Manager("Vinay", 50000, 10000);\n        System.out.println(e.getSalary()); // polymorphic call\n    }\n}', hint: 'Director extends Manager. Add stockValue. Override getSalary() to include salary + bonus + stockValue.' },
    ],
    tasks: [
      { id: 'java-14-d8-t1', text: 'Counter class: static count variable tracking object creation count.', tag: 'lab' },
      { id: 'java-14-d8-t2', text: 'Vehicle → Car hierarchy with constructors, super(), and method overriding.', tag: 'lab' },
      { id: 'java-14-d8-t3', text: 'Animal → Mammal → Dog multilevel inheritance. Show Dog has methods from all 3.', tag: 'lab' },
      { id: 'java-14-d8-t4', text: 'Why can a static method not access instance variables?', tag: 'mcq' },
    ],
  },

  // DAY 9: Polymorphism
  {
    id: 'java-14-d9', number: 9, title: 'Polymorphism Mastery', duration: 120,
    topics: ['Method Overloading', 'Method Overriding', 'Static vs Dynamic Binding'],
    blocks: [
      { type: 'callout', id: 'd9-intro', calloutType: 'info', title: 'Polymorphism — "Many Forms"', content: 'Same name, different behavior. Two flavours: **compile-time** (overloading) and **runtime** (overriding with dynamic dispatch). Guaranteed CE-2 topic — the comparison table is essential.' },
      { type: 'heading', id: 'd9-overload', level: 2, content: 'Method Overloading (Compile-Time)' },
      { type: 'code', id: 'd9-ol-code', lang: 'java', title: 'Overloading', code: 'class MathUtils {\n    int add(int a, int b) { return a+b; }              // 2 ints\n    int add(int a, int b, int c) { return a+b+c; }    // 3 ints (different count)\n    double add(double a, double b) { return a+b; }    // 2 doubles (different type)\n    double add(int a, double b) { return a+b; }       // mixed types\n}' },
      { type: 'callout', id: 'd9-ol-rules', calloutType: 'info', title: 'Overloading Rules', content: '1. The parameter list MUST differ (count, type, or order).\n2. The return type alone is NOT enough.\n3. The access modifier can change.\n4. Static methods can be overloaded.\n5. Happens in the same class (or parent-child via inheritance).' },
      { type: 'heading', id: 'd9-override', level: 2, content: 'Method Overriding (Runtime / Dynamic)' },
      { type: 'code', id: 'd9-or-code', lang: 'java', title: 'Overriding + Dynamic Dispatch', code: 'class Animal { void sound() { System.out.println("..."); } }\nclass Dog extends Animal {\n    @Override void sound() { System.out.println("Woof!"); }\n}\nclass Cat extends Animal {\n    @Override void sound() { System.out.println("Meow!"); }\n}\n// Dynamic dispatch:\nAnimal a1 = new Dog(); a1.sound(); // "Woof!" (runtime decision)\nAnimal a2 = new Cat(); a2.sound(); // "Meow!"' },
      { type: 'heading', id: 'd9-compare', level: 2, content: 'Overloading vs Overriding — Definitive Table' },
      { type: 'table', id: 'd9-comp-table', headers: ['Feature', 'Overloading', 'Overriding'], rows: [['Where', 'Same class', 'Parent ↔ child'], ['Signature', 'MUST differ', 'MUST be identical'], ['Return type', 'Can differ', 'Same or covariant'], ['Access', 'Can differ', 'Cannot be more restrictive'], ['Binding', 'Compile-time', 'Runtime'], ['Keyword', 'None needed', '@Override (recommended)'], ['static', 'Can overload', 'Cannot override (hidden)'], ['final', 'Can overload', 'Cannot override'], ['Polymorphism', 'Static / compile-time', 'Dynamic / runtime']] },
      { type: 'callout', id: 'd9-binding', calloutType: 'tip', title: 'Static vs Dynamic Binding', content: '**Static binding** — the compiler knows the exact method at compile time. Used for overloaded, static, private, and final methods.\n\n**Dynamic binding** — the JVM decides at RUNTIME based on the actual object type. Used for overridden methods. `Animal a = new Dog(); a.sound();` → the JVM calls `Dog.sound()`.' },
      // Doubt
      { type: 'callout', id: 'd9-d1', calloutType: 'doubt', title: 'Can I overload by changing only the return type?', content: '**NO.** The compiler error is: "method is already defined in the class." The compiler cannot tell which version you wanted just from the return type. The parameter list MUST differ.' },
      { type: 'callout', id: 'd9-d2', calloutType: 'doubt', title: 'Can I prevent a method from being overridden?', content: 'Yes — three ways:\n\n1. **`final` method**: `public final void sound() {}` — subclasses cannot override.\n2. **`final` class**: no subclass can exist at all, so nothing can be overridden.\n3. **`private` method**: not inherited, so it cannot be overridden (a child can "redefine" a same-named method, but that is a new method, not an override).' },
      // Exam
      { type: 'callout', id: 'd9-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **The comparison table** is a guaranteed question. Memorize it.\n2. **Overloading = compile-time. Overriding = runtime.** Always.\n3. **`@Override` annotation** catches signature mistakes at compile time.\n4. **Dynamic dispatch**: parent reference + child object → the child\'s method runs.' },
      // Bridge
      { type: 'callout', id: 'd9-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Runtime polymorphism is WHY **abstract classes and interfaces (Day 10)** work. Without dynamic dispatch, abstraction would be useless. `Comparable`/`Comparator` (Day 14) use the same interface-driven polymorphism.' },
      // Quick Ref
      { type: 'table', id: 'd9-qref', headers: ['Concept', 'Key Point'], rows: [['Overloading', 'Same name, different params. Compile-time.'], ['Overriding', 'Same signature, child redefines parent. Runtime.'], ['@Override', 'Optional but recommended. Catches signature errors.'], ['Dynamic dispatch', 'JVM uses actual object type, not reference type.']] },
      // Quiz
      { type: 'quiz', id: 'd9-quiz', title: 'Day 9 Quiz', questions: [
        { id: 'd9-q1', question: 'Can you overload a method by changing only the return type?', options: ['Yes', 'No — compile error', 'Only if one is void', 'Only in the same package'], correctIndex: 1, explanation: 'No. The compiler cannot distinguish methods by return type alone. The parameter list must differ in count, type, or order.' },
        { id: 'd9-q2', question: 'When is the decision made for an overridden method call?', options: ['Compile time', 'Runtime (JVM)', 'At class loading', 'At JVM startup'], correctIndex: 1, explanation: 'Overridden methods use dynamic binding — the JVM looks at the actual object type at runtime and calls the appropriate version.' },
        { id: 'd9-q3', question: 'What does @Override do?', options: ['Makes the method faster', 'Forces the method to be private', 'Compiler checks that you are actually overriding', 'Nothing — it is just a comment'], correctIndex: 2, explanation: '@Override tells the compiler "I intend to override a parent method." If the signature does not match any parent method, the compiler produces an error.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd9-cards', title: 'Day 9 Flashcards', cards: [
        { id: 'd9-f1', front: 'Overloading vs Overriding?', back: 'Overloading: same name, DIFFERENT params, same class, compile-time. Overriding: same name, SAME params, parent-child, runtime. Complete opposite except they share "same method name."', hint: 'One in same class, one across classes...' },
        { id: 'd9-f2', front: 'What is dynamic method dispatch?', back: 'The JVM decides at RUNTIME which overridden method to call based on the ACTUAL object type, not the reference type. Animal a = new Dog(); a.sound() calls Dog.sound().', hint: 'Runtime decision based on actual object...' },
        { id: 'd9-f3', front: 'Can static methods be overridden?', back: 'NO. Static methods belong to the class and are resolved at compile time. They can be "hidden" by redefining in child, but this is NOT overriding — no dynamic dispatch occurs.', hint: 'Static = compile-time binding...' },
      ] },
      { type: 'practice', id: 'd9-p1', lang: 'java', title: 'Practice: Shape Polymorphism', starter: 'class Shape { double area() { return 0; } }\nclass Circle extends Shape {\n    double r; Circle(double r) { this.r=r; }\n    @Override double area() { return Math.PI*r*r; }\n}\nclass Rectangle extends Shape {\n    double w,h; Rectangle(double w, double h) { this.w=w; this.h=h; }\n    @Override double area() { return w*h; }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Shape s1 = new Circle(5);\n        Shape s2 = new Rectangle(4, 6);\n        // TODO: print both areas. Add overloaded area(String unit)\n    }\n}', hint: 'For overloaded area: area(String unit) returns String like "78.54 sq cm" using String.format("%.2f sq %s", area(), unit).' },
      { type: 'practice', id: 'd9-p2', lang: 'java', title: 'Practice: Payment System', starter: 'class Payment { void pay(double amount) { System.out.println("Paid "+amount); } }\nclass CreditCard extends Payment { @Override void pay(double a) { System.out.println("Paid $"+a+" via Credit Card"); } }\nclass UPI extends Payment { @Override void pay(double a) { System.out.println("Paid $"+a+" via UPI"); } }\npublic class Test {\n    public static void main(String[] args) {\n        Payment p1 = new CreditCard();\n        Payment p2 = new UPI();\n        p1.pay(1000); // which one runs?\n        p2.pay(500);  // which one runs?\n        // TODO: add Cash class, demonstrate overloaded pay(amount, notes)\n    }\n}', hint: 'For overloaded: add `void pay(double amount, String notes)` in Payment. Override it in subclasses. Dynamic dispatch still works for the overridden version.' },
    ],
    tasks: [
      { id: 'java-14-d9-t1', text: 'Overloaded multiply(): int×int, int×double, double×double, 3 ints.', tag: 'lab' },
      { id: 'java-14-d9-t2', text: 'Shape→Circle,Rectangle with overridden area(). Dynamic dispatch with Shape references.', tag: 'lab' },
      { id: 'java-14-d9-t3', text: 'Payment→CreditCard,UPI,Cash. Override pay(). Runtime polymorphism.', tag: 'lab' },
      { id: 'java-14-d9-t4', text: 'Prove overloading=compile-time, overriding=runtime with code.', tag: 'drill' },
    ],
  },

  // DAY 10: Abstraction & Interfaces
  {
    id: 'java-14-d10', number: 10, title: 'Abstraction and Interfaces', duration: 120,
    topics: ['Abstract Classes', 'Abstract Methods', 'Interfaces', 'Multiple Implementation'],
    blocks: [
      { type: 'callout', id: 'd10-intro', calloutType: 'info', title: 'Designing Contracts', content: '**Abstract class** = partial implementation — some methods defined, some left abstract. **Interface** = a pure contract — defines WHAT, not HOW. Both enable polymorphism. Today: when to use each.' },
      { type: 'heading', id: 'd10-abstract', level: 2, content: 'Abstract Classes' },
      { type: 'code', id: 'd10-abs-code', lang: 'java', title: 'Abstract Class', code: 'abstract class Vehicle {\n    String brand;\n    Vehicle(String b) { brand=b; }\n    abstract void startEngine();           // NO body — must be implemented\n    void showBrand() {                     // concrete — inherited as-is\n        System.out.println("Brand: "+brand);\n    }\n}\nclass Car extends Vehicle {\n    Car(String b) { super(b); }\n    @Override void startEngine() { System.out.println(brand+" starts with key"); }\n}' },
      { type: 'heading', id: 'd10-interface', level: 2, content: 'Interfaces' },
      { type: 'code', id: 'd10-if-code', lang: 'java', title: 'Multiple Interfaces', code: 'interface Flyable { void fly(); }\ninterface Swimmable { void swim(); }\nclass Duck implements Flyable, Swimmable {\n    public void fly() { System.out.println("Duck flies"); }\n    public void swim() { System.out.println("Duck swims"); }\n}\n// A class can implement MANY interfaces — solves the diamond problem!' },
      { type: 'heading', id: 'd10-compare', level: 2, content: 'Abstract Class vs Interface' },
      { type: 'table', id: 'd10-comp-table', headers: ['Feature', 'Abstract Class', 'Interface'], rows: [['Keyword', 'abstract class', 'interface'], ['Methods', 'Abstract + concrete', 'Abstract + default/static (Java 8+)'], ['Variables', 'Instance variables OK', 'Only constants (public static final)'], ['Constructors', 'Can have', 'Cannot have'], ['How many', 'Extend ONE only', 'Implement MANY'], ['Use when…', 'Shared state and behavior (is-a)', 'Shared capability (can-do)']] },
      { type: 'callout', id: 'd10-diamond-solved', calloutType: 'tip', title: 'Diamond Problem — Solved', content: 'A class can implement multiple interfaces. If two of those interfaces happen to define the same default method, the class MUST explicitly override that method to resolve ambiguity: `InterfaceA.super.method()`. This forces you to make a conscious choice instead of silently picking one.' },
      // Doubt
      { type: 'callout', id: 'd10-d1', calloutType: 'doubt', title: 'When should I use abstract class vs interface?', content: '**Decision framework**:\n\n- Classes share **state** (fields) and **behavior** (concrete methods)? → **Abstract class**\n- Unrelated classes need to share a **capability**? → **Interface**\n- Need **constructors** or non-public methods? → **Abstract class**\n- Need multiple inheritance of **type**? → **Interface**\n\nIn modern Java, interfaces with default methods blur this line. Rule of thumb: **IS-A** (abstract) vs **CAN-DO** (interface).' },
      { type: 'callout', id: 'd10-d2', calloutType: 'doubt', title: 'Can an interface have a constructor?', content: '**No.** Interfaces cannot be instantiated, so constructors have no purpose. Every field in an interface is implicitly `public static final` (a constant). If you need instance state and constructors, use an abstract class.' },
      // Exam
      { type: 'callout', id: 'd10-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **1 abstract class, MANY interfaces** — that is how multiple inheritance is solved.\n2. **`Serializable`, `Cloneable`, `Comparable`** — these are interfaces, not classes.\n3. **Abstract class CAN have constructors** (called via `super()` from the subclass).\n4. **Interface CANNOT have constructors** — prevents instantiation.' },
      // Bridge
      { type: 'callout', id: 'd10-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Interfaces are EVERYWHERE: **`Comparable`/`Comparator` (Day 14)**, **`Serializable` (Day 13)**, `Runnable` (threads), `ActionListener` (GUIs). This concept never goes away — it is the backbone of all Java APIs.' },
      // Quick Ref
      { type: 'table', id: 'd10-qref', headers: ['Concept', 'Key Point'], rows: [['abstract class', 'Cannot instantiate. Can have constructors. Partial implementation.'], ['interface', 'Pure contract. No constructors. Multiple implementation allowed.'], ['implements', 'Class implements an interface. Must override all abstract methods.'], ['default method', 'Interface method with a body (Java 8+). Can be overridden.'], ['Marker interface', 'No methods. Just marks a class. e.g., Serializable, Cloneable.']] },
      // Quiz
      { type: 'quiz', id: 'd10-quiz', title: 'Day 10 Quiz', questions: [
        { id: 'd10-q1', question: 'How many abstract classes can a single class extend?', options: ['One', 'Two', 'Unlimited', 'Zero — abstract classes cannot be extended'], correctIndex: 0, explanation: 'Exactly ONE. Java does not support multiple class inheritance. But a class can implement unlimited interfaces.' },
        { id: 'd10-q2', question: 'Which of these can have a constructor?', options: ['Interface', 'Abstract class', 'Both', 'Neither'], correctIndex: 1, explanation: 'Abstract classes can have constructors (called via super() from subclasses). Interfaces cannot have constructors.' },
        { id: 'd10-q3', question: 'What is a marker interface?', options: ['An interface that marks performance metrics', 'An interface with no methods — just marks a class', 'An interface that generates markers', 'A deprecated interface'], correctIndex: 1, explanation: 'A marker interface has no methods. It simply "marks" a class as having a certain property. Examples: Serializable, Cloneable, Remote.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd10-cards', title: 'Day 10 Flashcards', cards: [
        { id: 'd10-f1', front: '5 differences between abstract class and interface?', back: '1. abstract can have constructors, interface cannot. 2. abstract can have instance vars, interface only constants. 3. Extend ONE abstract, implement MANY interfaces. 4. abstract can have concrete methods, interface only abstract+default+static. 5. abstract = is-a, interface = can-do.', hint: 'Constructors, variables, count, methods, relationship...' },
        { id: 'd10-f2', front: 'What are default methods in interfaces?', back: 'Methods with a body defined in the interface (Java 8+). Allow adding methods without breaking existing implementations. Classes can override them if needed.', hint: 'Java 8 feature...' },
        { id: 'd10-f3', front: 'Can an abstract class be instantiated?', back: 'NO — that is the whole point. You must create a concrete subclass that implements all abstract methods, then instantiate the subclass. Abstract is a template, not a usable object.', hint: 'Think about what "abstract" means...' },
      ] },
      { type: 'practice', id: 'd10-p1', lang: 'java', title: 'Practice: Smart Device Interface', starter: 'interface Connectable { void connect(); void disconnect(); }\ninterface Chargeable { void charge(); int getBattery(); }\nclass SmartPhone implements Connectable, Chargeable {\n    int battery=100;\n    public void connect() { System.out.println("Phone connected"); }\n    public void disconnect() { System.out.println("Phone disconnected"); }\n    public void charge() { battery=100; System.out.println("Charged"); }\n    public int getBattery() { return battery; }\n}\n// TODO: Add Laptop class. Demonstrate interface polymorphism.\npublic class Test {\n    public static void main(String[] args) {\n        Connectable c = new SmartPhone();\n        c.connect(); // only Connectable methods visible\n    }\n}', hint: 'Laptop implements both interfaces. Create arrays: Connectable[] devices = {new SmartPhone(), new Laptop()}; — call connect() on all.' },
      { type: 'practice', id: 'd10-p2', lang: 'java', title: 'Practice: Payment Gateway Interface', starter: 'interface PaymentGateway {\n    boolean processPayment(double amount);\n    boolean refund(String transactionId);\n}\nclass Razorpay implements PaymentGateway {\n    public boolean processPayment(double a) { System.out.println("Razorpay: $"+a); return true; }\n    public boolean refund(String id) { System.out.println("Razorpay refund: "+id); return true; }\n}\nclass Stripe implements PaymentGateway {\n    public boolean processPayment(double a) { System.out.println("Stripe: $"+a); return true; }\n    public boolean refund(String id) { System.out.println("Stripe refund: "+id); return true; }\n}\npublic class Test {\n    public static void main(String[] args) {\n        PaymentGateway gw = new Razorpay();\n        gw.processPayment(999);\n        // TODO: switch to Stripe. Observe zero code changes needed!\n    }\n}', hint: 'Change `new Razorpay()` to `new Stripe()` — the rest of the code works unchanged. That is the power of interfaces.' },
    ],
    tasks: [
      { id: 'java-14-d10-t1', text: 'Abstract Shape with abstract area(), perimeter(). Concrete display(). Circle, Rectangle, Triangle.', tag: 'lab' },
      { id: 'java-14-d10-t2', text: 'Interface Playable (play, pause, stop). MusicPlayer + VideoPlayer. Interface polymorphism.', tag: 'lab' },
      { id: 'java-14-d10-t3', text: 'Two interfaces with conflicting default methods. Class overrides to resolve.', tag: 'bonus' },
      { id: 'java-14-d10-t4', text: 'List 5 differences between abstract classes and interfaces. Which can have constructors?', tag: 'mcq' },
    ],
  },
];
