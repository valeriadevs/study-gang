import type { Day } from '../../../types';

export const phase3days: Day[] = [
  // DAY 7: Classes & Objects (lighter half of the split)
  {
    id: 'java-14-d7', number: 9,
    title: 'Classes and Objects',
    subtitle: 'Blueprints, instances, and the polite public interface',
    duration: 90,
    topics: ['Class Definition', 'Object Instantiation', 'Encapsulation', 'Getters / Setters'],
    alignment: ['CodeGym: Creating Objects'],
    blocks: [
      { type: 'callout', id: 'd7-intro', calloutType: 'info', title: 'Welcome to OOP', content: 'Up to now, your programs have been lists of instructions — read input, do math, print, repeat. Today you start handing the computer **named shapes** it can build as many copies of as you want. By the end of this day you will have written a class of your own, made objects from it, and given those objects a polite public interface. Tomorrow you will learn the formal way to *introduce* those objects — constructors. Today is about getting the shape right.' },
      { type: 'heading', id: 'd7-class', level: 2, content: 'A Class is a Blueprint' },
      { type: 'paragraph', id: 'd7-class-p', content: 'Think of a class like an architect\'s drawing. It says "every House has a number of rooms, a colour, and a way to be described" — but the drawing itself is not a house. Once you have the drawing, you can build any number of houses from it. In Java, the drawing is the `class`, and each house you build is an **object** (also called an *instance*).' },
      { type: 'code', id: 'd7-class-code', lang: 'java', title: 'Your first class', code: `public class House {            // the blueprint — describes EVERY house
    int rooms;                    // a FIELD (state): how many rooms a house has
    String colour;                // a FIELD (state): what colour a house is

    public static void main(String[] args) {
        House h = new House();    // build ONE object from the blueprint
        // TODO 1: print the default values of rooms and colour (h.rooms, h.colour)
        // TODO 2: assign values to h.rooms and h.colour, then print again
    }
}` },
      { type: 'callout', id: 'd7-defaults', calloutType: 'tip', title: 'No constructor yet — Java fills in defaults', content: 'You have not written any constructor in `House`. Java quietly gives you a **default no-arg constructor** for free. It does nothing except allocate space. Fields with no explicit value get their default: `0` for ints, `false` for booleans, `null` for objects. Tomorrow you will write your own constructors; today, just observe the defaults.' },
      { type: 'heading', id: 'd7-object', level: 2, content: 'An Object is a Built Instance' },
      { type: 'paragraph', id: 'd7-object-p', content: 'You build an object with the `new` keyword. `new House()` runs the constructor and hands you back a fresh object. Each object lives in its own little pocket of memory — change one and the others do not feel it.' },
      { type: 'code', id: 'd7-object-code', lang: 'java', title: 'Two objects, two separate pockets', code: `public static void main(String[] args) {
    House h1 = new House();   // first house — its own memory
    House h2 = new House();   // second house — its own memory

    h1.rooms = 3;
    h2.rooms = 7;

    System.out.println(h1.rooms); // 3
    System.out.println(h2.rooms); // 7 — unaffected by h1
}` },
      { type: 'callout', id: 'd7-dot', calloutType: 'note', title: 'The dot operator', content: '`object.field` reads a field. `object.field = value` writes one. `object.method()` calls a method. The dot means "of this object". Two objects of the same class have the same set of fields and methods, but each has its own values for those fields.' },
      { type: 'heading', id: 'd7-encap', level: 2, content: 'Encapsulation — Keep the Inside Private, Expose a Polite Door' },
      { type: 'paragraph', id: 'd7-encap-p', content: 'Right now `rooms` is *package-private* — anyone can poke at it. That is convenient but dangerous. Real Java code keeps fields **`private`** and exposes **public getters and setters** so the class can validate, log, or change its mind about how things are stored later. This is **encapsulation** — one of the four pillars of OOP.' },
      { type: 'callout', id: 'd7-anatomy', calloutType: 'tip', title: 'Class anatomy — the four kinds of members', content: 'A class body holds four kinds of things. Recognise them at a glance:\n\n1. **Fields** — `private int rooms;` — the data each object owns. Usually `private`.\n2. **Constructors** — `public House(int rooms) { ... }` — run at `new`. (Tomorrow.)\n3. **Methods** — `public int getRooms() { ... }` — the behaviour. `public` = the outside world may call them.\n4. **Getters / Setters** — the polite doors that read and write the private fields.\n\nNaming convention: fields are lowercase (`rooms`), getters are `get` + Capitalised field (`getRooms`), setters are `set` + Capitalised field (`setRooms`). Java expects these exact names — tools, frameworks, and the exam all rely on them.' },
      { type: 'code', id: 'd7-encap-code', lang: 'java', title: 'Encapsulation pattern', code: `public class House {
    // FIELDS are private — nobody outside this class can touch them directly.
    private int rooms;
    private String colour;

    // GETTER — a polite read-only door. "Give me the rooms, please."
    // public = anyone may call it. int = the type it hands back.
    public int getRooms() {
        return rooms;   // hands back the current value of the private field
    }

    // SETTER — a polite write door. "Change the rooms, please."
    // void = it does not hand anything back; it just does the job.
    public void setRooms(int rooms) {
        // VALIDATION — the whole point of encapsulation:
        // we can refuse bad data BEFORE it enters the object.
        if (rooms < 0) {
            System.out.println("Rooms cannot be negative. Keeping previous value.");
            return;          // leave without changing the field
        }
        this.rooms = rooms;  // this.rooms = the FIELD; rooms = the parameter
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        if (colour == null || colour.isBlank()) {
            System.out.println("Colour cannot be empty. Keeping previous value.");
            return;
        }
        this.colour = colour;
    }

    // A regular method that USES the fields (behaviour).
    public void describe() {
        System.out.println("A " + colour + " house with " + rooms + " rooms.");
    }

    public static void main(String[] args) {
        House h = new House();       // build an object
        h.setRooms(3);               // go through the setter (valid)
        h.setColour("blue");         // go through the setter (valid)
        h.describe();                // A blue house with 3 rooms.
        h.setRooms(-1);              // setter REJECTS the negative value
        System.out.println(h.getRooms());  // 3 — unchanged! bad data never got in
        // h.rooms = 99;             // COMPILE ERROR — rooms is private!
    }
}` },
      { type: 'callout', id: 'd7-this-peek', calloutType: 'note', title: 'A quick peek at this', content: 'In `setRooms(int rooms)`, the parameter and the field share the same name. `this.rooms = rooms;` says "the field on *this* object, set to the parameter". You will get the full tour of `this` tomorrow; for now, just notice the pattern.' },
      { type: 'callout', id: 'd7-recipe', calloutType: 'tip', title: 'The 5-step recipe for ANY encapsulated class', content: 'Every practice below (Car, Movie, Student, Counter, Playlist, Thermometer) follows the SAME recipe. If you learn the recipe, you can do all of them.' },
      { type: 'heading', id: 'd7-recipe-s1', level: 3, content: 'Step 1 — Fields' },
      { type: 'paragraph', id: 'd7-recipe-s1-p', content: 'Decide what data the class owns. Make them **`private`**.' },
      { type: 'code', id: 'd7-recipe-s1-code', lang: 'java', title: 'Step 1 — private fields', code: `private String brand;   // one private field per piece of data
private int year;` },
      { type: 'heading', id: 'd7-recipe-s2', level: 3, content: 'Step 2 — Getters' },
      { type: 'paragraph', id: 'd7-recipe-s2-p', content: 'One per field. `public` + the field\'s type + `get` + Capitalised field name. It just returns the field.' },
      { type: 'code', id: 'd7-recipe-s2-code', lang: 'java', title: 'Step 2 — getters', code: `public String getBrand() { return brand; }` },
      { type: 'heading', id: 'd7-recipe-s3', level: 3, content: 'Step 3 — Setters' },
      { type: 'paragraph', id: 'd7-recipe-s3-p', content: 'One per field you want writable. `public void` + `set` + Capitalised field name. **Validate first, then assign** — this is the encapsulation payoff.' },
      { type: 'code', id: 'd7-recipe-s3-code', lang: 'java', title: 'Step 3 — setters with validation', code: `public void setYear(int year) {
    if (year < 1900) {              // validation BEFORE assignment
        System.out.println("Year too old. Keeping previous value.");
        return;                     // reject: leave the field unchanged
    }
    this.year = year;               // accept: assign the parameter to the field
}` },
      { type: 'heading', id: 'd7-recipe-s4', level: 3, content: 'Step 4 — A Behaviour Method' },
      { type: 'paragraph', id: 'd7-recipe-s4-p', content: 'Usually `describe()` or `displayInfo()`, using the fields. This is the "what does this object DO" part.' },
      { type: 'code', id: 'd7-recipe-s4-code', lang: 'java', title: 'Step 4 — behaviour', code: `public void describe() {
    System.out.println(year + " " + brand);
}` },
      { type: 'heading', id: 'd7-recipe-s5', level: 3, content: 'Step 5 — Test in main' },
      { type: 'paragraph', id: 'd7-recipe-s5-p', content: 'Create the object, call setters (including a bad value to prove validation), call getters, call describe.' },
      { type: 'callout', id: 'd7-recipe-summary', calloutType: 'info', title: 'The recipe in one line', content: '`private` fields → getter per field → setter per field (validate!) → a behaviour method → test in `main`.' },
      { type: 'callout', id: 'd7-recipe-readonly', calloutType: 'note', title: 'Read-only fields', content: 'If a practice asks for a **read-only field** (like Thermometer\'s fahrenheit), just SKIP the setter — a getter without a setter means nobody can change it from outside.' },
      { type: 'callout', id: 'd7-d2', calloutType: 'doubt', title: 'Why use getters/setters instead of public fields?', content: 'Three real reasons:\n\n1. **Validation** — reject negative ages, blank names, or null values inside the setter.\n2. **Refactor later** — you can store `age` as a `LocalDate` instead of an `int` without breaking any external code, because nobody ever touched the field directly.\n3. **Read-only fields** — give a getter but no setter.\n\nThis pattern shows up in every OOP design question.' },
      { type: 'callout', id: 'd7-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Class = blueprint, object = instance**. Tested in every MCQ.\n2. **Each object has its own copy** of instance fields. Changing one does not affect another.\n3. **`new ClassName()` runs the constructor** and returns a fresh object.\n4. **Private fields + public getters/setters** is the encapsulation pattern. Expected in code-tracing and design questions.' },
      { type: 'callout', id: 'd7-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Tomorrow (Day 10) you will write **constructors** so each object can start with the values *you* choose, not just Java\'s defaults. The `this` keyword you glimpsed above gets its own section there.\n\nDay 11 (Static + Inheritance) will introduce `super()` — the constructor call that walks up to the parent class.\n\nDay 12 (Polymorphism) depends on the dot operator you just used: `Animal a = new Dog(); a.sound();` — same dot, different behaviour at runtime.' },
      { type: 'table', id: 'd7-qref', headers: ['Concept', 'Key Point'], rows: [['Class', 'Blueprint. Declared with `class`. One per file (usually).'], ['Object', 'Instance built from a class via `new`.'], ['Field', 'Variable declared inside a class. Each object gets its own copy.'], ['Encapsulation', 'private fields + public getters/setters. Validate inside setters.'], ['this (peek)', '`this.field` means "the field of *this* object". Full tour tomorrow.']] },
      { type: 'quiz', id: 'd7-quiz', title: 'Day 9 Quiz', questions: [
        { id: 'd7-q1', question: 'What is the relationship between a class and an object?', options: ['They are the same thing', 'Class is the blueprint; object is a built instance', 'Object is the blueprint; class is a built instance', 'Both must have a main method'], correctIndex: 1, explanation: 'A class is the blueprint (the architect\'s drawing). An object is an actual instance built from that blueprint. One class can produce unlimited objects.' },
        { id: 'd7-q2', question: 'You write `House h = new House();`. What happens at the `new` keyword?', options: ['A copy of the House class file is created', 'The constructor runs and a fresh object is handed back', 'Nothing — you must call a constructor explicitly later'], correctIndex: 1, explanation: '`new` allocates memory, runs the constructor, and returns a reference to the new object. The reference is what `h` holds.' },
        { id: 'd7-q3', question: 'Why do we make fields private and expose getters/setters instead?', options: ['It runs faster', 'It enables validation, refactoring, and read-only control', 'The compiler requires it for non-main classes', 'It uses less memory'], correctIndex: 1, explanation: 'Encapsulation lets you validate inputs, change the internal representation without breaking callers, and make fields read-only by omitting the setter.' },
        { id: 'd7-q4', question: 'Two objects of the same class — do they share their instance fields?', options: ['Yes, all fields are shared', 'No — each object has its own copy', 'Only static fields are shared', 'Only if you assign one to the other'], correctIndex: 1, explanation: 'Each object has its own copy of instance fields. `h1.rooms = 3; h2.rooms = 7;` — `h1.rooms` is still 3. Static fields are the ones that are shared.' },
      ] },
      { type: 'flashcard', id: 'd7-cards', title: 'Day 9 Flashcards', cards: [
        { id: 'd7-f1', front: 'Class vs Object?', back: 'Class = blueprint/template. Object = instance built from blueprint. One class → many objects. Each object has its own copy of instance fields.', hint: 'Blueprint vs house...' },
        { id: 'd7-f2', front: 'What does the new keyword do?', back: 'Three things: (1) allocates memory for the object, (2) runs the constructor, (3) returns a reference to the new object.', hint: 'Allocate, run, return...' },
        { id: 'd7-f3', front: 'What is encapsulation?', back: 'Hiding a class\'s internal state behind private fields and exposing controlled access via public getters and setters. Lets you validate, refactor, and lock fields read-only.', hint: 'Private + getters/setters...' },
        { id: 'd7-f4', front: 'Default values for instance fields?', back: 'int → 0, double → 0.0, boolean → false, char → \'\\u0000\', object references → null. (Only instance and static fields get defaults. Local variables do not — they must be initialised.)', hint: '0, false, null...' },
      ] },
      { type: 'practice', id: 'd7-p1', lang: 'java', title: 'Practice: Car — fields, getters, setters', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create a Car with brand "Honda", model "City", year 2020
        // TODO 2: print every field using the getters
        // TODO 3: try setYear(1800) — observe the rejection message
        // TODO 4: call describe() at the end
    }
}
class Car {
    // TODO 5: declare private fields: brand (String), model (String), year (int)
    // TODO 6: write getters for all three
    // TODO 7: write setters — reject year < 1900, blank brand or model
    // TODO 8: write describe() that prints: "<year> <brand> <model>"
}` },
      { type: 'practice', id: 'd7-p2', lang: 'java', title: 'Practice: Movie — validation in setters', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create a Movie, set all fields, displayInfo()
        // TODO 2: try setDurationMinutes(-45) and setRating(15) — both should be rejected
        // TODO 3: print final values via getters to confirm nothing changed
    }
}
class Movie {
    // TODO 4: private fields: title, director (String), durationMinutes (int), rating (double 0..10)
    // TODO 5: getters + setters with validation (duration > 0, rating 0..10)
    // TODO 6: displayInfo() prints a single-line summary
}` },
      { type: 'practice', id: 'd7-p3', lang: 'java', title: 'Practice: Student — fix the encapsulation', starter: `public class Test {
    public static void main(String[] args) {
        // TODO: create a Student, set name = "Vinayak", age = 20, gpa = 8.4
        // Try setAge(-5) — must be rejected. Print every getter at the end.
    }
}
// The class below is broken — fields are public, setters are missing, and validation is absent.
// Refactor it into a proper encapsulated class without changing the main above.
class Student {
    public String name;
    public int age;
    public double gpa;
}` },
      { type: 'practice', id: 'd7-p4', lang: 'java', title: 'Practice: Counter — many objects, separate state', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create 3 Counter objects with starting values 5, 10, 0
        // TODO 2: bump(), bump(), reset() on each in a way that proves each has its own state
        // TODO 3: print the value of each counter after the operations
    }
}
class Counter {
    // TODO 4: private int value
    // TODO 5: constructor-free is fine here (defaults to 0) — but write setValue(int), bump(), reset(), getValue()
    // Hint: you do NOT need a constructor today. Tomorrow you will learn to write one.
}` },
      { type: 'practice', id: 'd7-p5', lang: 'java', title: 'Practice: Playlist (mini composition)', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create 3 Songs (title, artist, durationSec)
        // TODO 2: create a Playlist, add the songs, playAll() — prints each song
    }
}
// You decide whether to write two classes (Song + Playlist) in this same file.
// Keep Song fully encapsulated. Playlist can hold a Song[] of size 10 for now.
class Song {
    // TODO 3: private fields title, artist, durationSec + getters/setters (validate duration > 0)
    // TODO 4: play() prints "Now playing: <title> by <artist> (<durationSec>s)"
}
class Playlist {
    // TODO 5: private Song[] songs = new Song[10], private int count = 0
    // TODO 6: addSong(Song s), playAll() — loops and calls play()
}` },
      { type: 'practice', id: 'd7-p6', lang: 'java', title: 'Practice: Thermometer — read-only field', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create a Thermometer with celsius = 36.6 (the setter takes celsius, but exposes fahrenheit read-only)
        // TODO 2: print both celsius and fahrenheit
        // TODO 3: try setting fahrenheit directly — confirm it is impossible
    }
}
class Thermometer {
    // TODO 4: private double celsius — with setter that rejects values below -273.15
    // TODO 5: public getter for celsius; NO setter for fahrenheit
    // TODO 6: public double getFahrenheit() — computed (celsius * 9/5 + 32)
}` },
    ],
    tasks: [
      { id: 'java-14-d7-t1', text: 'Write a Book class: title, author, pages, price. Fully encapsulated. Validation in setters (no negative price, non-blank title). Create 3 books and display.', tag: 'lab' },
      { id: 'java-14-d7-t2', text: 'Demonstrate object independence: create two Counter objects, bump only one, print both.', tag: 'drill' },
      { id: 'java-14-d7-t3', text: 'Explain in 3 sentences why encapsulation matters, with one concrete example from today.', tag: 'review' },
    ],
  },

  // DAY 7-NEXT: Constructors & `this` (the deeper half)
  {
    id: 'java-14-d7-next', number: 10,
    title: 'Constructors and the this Keyword',
    subtitle: 'How Java fills in a brand-new object',
    duration: 90,
    topics: ['Constructor Rules', 'Default Constructor', 'Constructor Overloading', 'this Keyword', 'Constructor Chaining'],
    alignment: ['CodeGym: Working with constructors'],
    blocks: [
      { type: 'callout', id: 'd7n-intro', calloutType: 'info', title: 'The moment `new` runs', content: 'Yesterday you built a *shape* — a class — and made a few objects from it. But how does Java actually decide what goes *inside* a brand-new object when you write `new Car(...)`? That is the constructor\'s job. It does a lot more than fill in fields: it can guard bad input, default missing values, and chain to a more specific version of itself. Today you will meet `this` — the most disambiguating keyword Java has.' },
      { type: 'heading', id: 'd7n-con', level: 2, content: 'The Constructor — the Function That Runs at `new`' },
      { type: 'paragraph', id: 'd7n-con-p', content: 'A constructor is a special block that runs the moment you write `new ClassName(...)`. It looks like a method, but it has **no return type** — not even `void` — and its name is exactly the class name. Its job is to put the new object into a valid starting state.' },
      { type: 'code', id: 'd7n-con-code', lang: 'java', title: 'A simple constructor', code: `public class Car {
    private String brand;
    private int year;

    public Car(String brand, int year) {       // no return type, name = class
        this.brand = brand;                    // field gets the parameter
        this.year = year;
    }

    public static void main(String[] args) {
        Car c = new Car("Honda", 2020);        // constructor runs here
        System.out.println(c.getBrand());      // (assume getter exists)
    }
}` },
      { type: 'callout', id: 'd7n-rules', calloutType: 'warn', title: 'Five rules — they come up every exam', content: '1. **Same name as the class.** Not "close to" — exact.\n2. **No return type.** Not even `void`. Adding `void` makes it a regular method.\n3. **Called via `new`.** You never invoke it by name like a method.\n4. **Can be overloaded** — same name, different parameter list.\n5. **If you write zero constructors**, Java provides a default no-arg one. **If you write any**, the default disappears.' },
      { type: 'heading', id: 'd7n-default', level: 2, content: 'The Default Constructor — Appears, Then Disappears' },
      { type: 'paragraph', id: 'd7n-default-p', content: 'When you write no constructor at all, Java quietly gives you `public Car() {}`. It does nothing useful, but it lets you write `new Car()`. The moment you write *any* constructor of your own — even one with parameters — the default no-arg constructor vanishes. If you still want a no-arg option, you have to write it yourself.' },
      { type: 'code', id: 'd7n-default-code', lang: 'java', title: 'When the default disappears', code: `public class Car {
    private String brand;

    public Car(String brand) {                 // you wrote one constructor
        this.brand = brand;
    }
    // No no-arg constructor exists anymore!
}

class TestBad {
    public static void main(String[] args) {
        Car c = new Car();                     // COMPILE ERROR — no such constructor
    }
}` },
      { type: 'heading', id: 'd7n-overload', level: 2, content: 'Constructor Overloading' },
      { type: 'paragraph', id: 'd7n-overload-p', content: 'Just like methods, constructors can be overloaded — same name (the class name), different parameter lists. The compiler picks the right one based on the arguments you pass at `new`. This is how a class offers both a quick-and-dirty constructor and a fully-specified one.' },
      { type: 'code', id: 'd7n-overload-code', lang: 'java', title: 'Three constructors, one class', code: `public class Phone {
    private String brand;
    private String model;
    private int storageGB;

    public Phone(String brand, String model, int storageGB) {  // full
        this.brand = brand;
        this.model = model;
        this.storageGB = storageGB;
    }

    public Phone(String brand, String model) {                 // no storage yet
        this.brand = brand;
        this.model = model;
        this.storageGB = 64;
    }

    public Phone() {                                            // safe defaults
        this.brand = "Unknown";
        this.model = "Unknown";
        this.storageGB = 64;
    }
}` },
      { type: 'heading', id: 'd7n-chain', level: 2, content: 'Constructor Chaining with `this()`' },
      { type: 'paragraph', id: 'd7n-chain-p', content: 'When several constructors do almost the same thing, you do not want to copy-paste. Call one from another using **`this(...)`** — Java\'s "run another constructor of *this same class*". The call **must be the first line** of the constructor. Each constructor funnels into the most specific one.' },
      { type: 'code', id: 'd7n-chain-code', lang: 'java', title: 'Funneling into the full constructor', code: `public class Student {
    private String name;
    private int id;
    private String branch;

    public Student(String name, int id, String branch) {   // full — does the real work
        this.name = name;
        this.id = id;
        this.branch = branch;
    }

    public Student(String name, int id) {                  // default branch
        this(name, id, "AIML");                            // → calls the full one
    }

    public Student(String name) {                          // default id and branch
        this(name, 0);                                     // → calls the 2-param one
    }
}` },
      { type: 'callout', id: 'd7n-chain-rules', calloutType: 'tip', title: 'Chaining rules', content: '1. **`this()` must be the very first line.** Putting it second causes a compile error.\n2. **Cycles are illegal.** Constructor A calls B, B calls A — the compiler will refuse.\n3. **Constructors can call exactly one other constructor** — `this()` is a single call, not a list.\n4. **`this()` and `super()` cannot both appear** — only one is allowed as the first line.' },
      { type: 'heading', id: 'd7n-this', level: 2, content: 'The `this` Keyword — Three Uses' },
      { type: 'list', id: 'd7n-this-list', items: ['**`this.fieldName`** — disambiguates instance variables from parameters (or locals) with the same name. You saw this in yesterday\'s setter pattern.', '**`this.methodName()`** — calls another method on the same object. Rarely needed because the dot is implicit, but useful inside a constructor that wants to call a helper.', '**`this(...)`** — calls another constructor of the same class. Used for chaining. Must be the first line of the constructor.'] },
      { type: 'callout', id: 'd7n-d1', calloutType: 'doubt', title: 'What if I forget to write any constructor at all?', content: 'You get a **default no-arg constructor** for free — `public Car() {}`. It allocates space and leaves fields at their defaults (0, false, null). The moment you write *any* constructor of your own, the default disappears, so if you still need a no-arg version, you must write it explicitly.' },
      { type: 'callout', id: 'd7n-d2', calloutType: 'doubt', title: 'Can I call two constructors from one `this()` line?', content: 'No. `this(...)` is a single call to exactly one other constructor. If you need both a no-arg setup AND a parameterised one, write them as two separate constructors — and chain the simpler one into the more specific one.' },
      { type: 'callout', id: 'd7n-d3', calloutType: 'doubt', title: 'What happens if I accidentally write `void` before the constructor name?', content: 'It stops being a constructor and becomes a **regular method** named after the class. The compiler will not complain — it just will not be called by `new`. This is one of the most common beginner bugs. Get used to the rule: **constructors have no return type at all**.' },
      { type: 'callout', id: 'd7n-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Constructor has NO return type** — not even `void`. Adding `void` makes it a method.\n2. **Default constructor disappears** the moment you write any constructor.\n3. **`this()` must be the first line** in a constructor body.\n4. **`this.field` vs parameter** — disambiguation is tested in code-tracing.\n5. **Constructor overloading** — same name (the class name), different parameter lists.' },
      { type: 'callout', id: 'd7n-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Day 11 (Static + Inheritance) introduces `super()` — the same idea, but for the **parent class**\'s constructor. The first line of a child constructor is either `this(...)` or `super(...)` — never both.\n\nDay 12 (Polymorphism) leans on constructor overloading indirectly: same class name, multiple ways to start an object.\n\nDay 17 (Comparable / Comparator) — `this` shows up again as `this.compareTo(...)` inside natural ordering.' },
      { type: 'table', id: 'd7n-qref', headers: ['Concept', 'Key Point'], rows: [['Constructor', 'Same name as class. No return type. Called via `new`.'], ['Default constructor', 'Provided automatically if you write none. Disappears the moment you write any.'], ['Constructor overloading', 'Multiple constructors with different parameter lists. Resolved at `new` time.'], ['this.field', 'Disambiguates instance variable from parameter/local.'], ['this(...)', 'Calls another constructor of the same class. Must be first line.'], ['this.method()', 'Calls another method on the same object. Usually implicit.']] },
      { type: 'quiz', id: 'd7n-quiz', title: 'Day 10 Quiz', questions: [
        { id: 'd7n-q1', question: 'Which of these is a valid constructor for class `House`?', options: ['public void House() {}', 'public House() {}', 'public static House() {}', 'public int House() {}'], correctIndex: 1, explanation: 'Constructors have NO return type. Adding `void`, `int`, or `static` makes it a regular method, not a constructor.' },
        { id: 'd7n-q2', question: 'You wrote a constructor `House(String address)`. Later you write `new House()`. What happens?', options: ['It works — Java still provides a default', 'Compile error — no matching constructor', 'It runs with address = null', 'Runtime error'], correctIndex: 1, explanation: 'The default no-arg constructor disappears the moment you write any constructor. You must explicitly add `public House() {}` if you need a no-arg version.' },
        { id: 'd7n-q3', question: 'Where must `this(...)` appear inside a constructor?', options: ['Anywhere', 'Last line', 'First line', 'Inside an if block'], correctIndex: 2, explanation: '`this(...)` must be the first line. Putting it anywhere else causes a compile error. This is the same rule as `super()`.' },
        { id: 'd7n-q4', question: 'Inside `setRooms(int rooms) { this.rooms = rooms; }`, what does `this.rooms` mean?', options: ['A local variable', 'The instance field of the current object', 'A static field', 'The parameter'], correctIndex: 1, explanation: '`this.rooms` refers to the instance field. Without `this`, the right-hand `rooms` would shadow it on the left-hand side, and the field would never be assigned.' },
      ] },
      { type: 'flashcard', id: 'd7n-cards', title: 'Day 10 Flashcards', cards: [
        { id: 'd7n-f1', front: 'Three uses of `this`?', back: '1. `this.field` — disambiguate instance field from parameter/local. 2. `this.method()` — call same-object method (usually implicit). 3. `this(...)` — call another constructor of the same class. Must be first line.', hint: 'Field, method, constructor...' },
        { id: 'd7n-f2', front: 'Constructor rules?', back: 'Same name as class. NO return type. Called via `new`. Can be overloaded. If none written → default provided. If any written → default disappears.', hint: 'No return type...' },
        { id: 'd7n-f3', front: 'When does the default constructor disappear?', back: 'The moment you write ANY constructor of your own. Java only provides the default when the class has zero constructors.', hint: 'As soon as you write one...' },
        { id: 'd7n-f4', front: 'Constructor chaining — what is the rule for `this(...)`?', back: 'Must be the FIRST line of the constructor body. Cannot cycle (A → B → A). Cannot coexist with `super()` — only one of `this()` or `super()` is allowed as the first line.', hint: 'First line, no cycles, no super...' },
      ] },
      { type: 'practice', id: 'd7n-p1', lang: 'java', title: 'Practice: Phone — three constructors, chaining', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create a Phone with full constructor: "Apple", "iPhone 15", 256
        // TODO 2: create one with 2-param constructor: "Samsung", "S24"
        // TODO 3: create one with no-arg constructor
        // TODO 4: print all three with describe()
    }
}
class Phone {
    // TODO 5: private fields brand, model, storageGB
    // TODO 6: FULL constructor (brand, model, storageGB) — does the real work
    // TODO 7: 2-param constructor — calls the full one with storageGB = 128
    // TODO 8: no-arg constructor — calls the 2-param with brand = "Unknown", model = "Unknown"
    // TODO 9: describe() prints one line with all three fields
}` },
      { type: 'practice', id: 'd7n-p2', lang: 'java', title: 'Practice: Employee — chain across three constructors', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: new Employee("Vinayak", 101, "AIML")
        // TODO 2: new Employee("Aarav", 102)
        // TODO 3: new Employee("Diya")
        // TODO 4: print each via display()
    }
}
class Employee {
    // TODO 5: private fields name, id, department
    // TODO 6: full constructor (name, id, department)
    // TODO 7: 2-param constructor — defaults department = "AIML"
    // TODO 8: 1-param constructor — defaults id = 0 (calls 2-param)
    // TODO 9: display() prints all three fields
}` },
      { type: 'practice', id: 'd7n-p3', lang: 'java', title: 'Practice: Color — clamp RGB inputs', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: new Color(300, -20, 128) — clamp to (255, 0, 128)
        // TODO 2: new Color(50, 100, 200)
        // TODO 3: print "rgb(<r>,<g>,<b>)" for each via toString()
    }
}
class Color {
    // TODO 4: private int r, g, b — each clamped to 0..255 in the constructor
    // TODO 5: constructor takes three ints
    // TODO 6: toString() returns the "rgb(...)" string
}` },
      { type: 'practice', id: 'd7n-p4', lang: 'java', title: 'Practice: Trace the chain — predict the output', starter: `public class Test {
    public static void main(String[] args) {
        // No TODO here. Just run this and explain in a comment what each line prints and WHY.
        new Trace("a", 1).show();
        new Trace("b").show();
        new Trace().show();
    }
}
class Trace {
    private String tag;
    private int n;

    public Trace(String tag, int n) {
        this.tag = tag;
        this.n = n;
        System.out.println("FULL");
    }

    public Trace(String tag) {
        this(tag, 0);
        System.out.println("ONE-ARG");
    }

    public Trace() {
        this("anon");
        System.out.println("NO-ARG");
    }

    public void show() {
        System.out.println("show: " + tag + "/" + n);
    }
}
// Question to answer in a comment:
//  - Why does "FULL" print BEFORE "ONE-ARG"?
//  - Why does "show: anon/0" print for the third call when no constructor was given?` },
      { type: 'practice', id: 'd7n-p5', lang: 'java', title: 'Practice: Vector2D — chained math-friendly constructors', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: v1 = new Vector2D();               // (0, 0)
        // TODO 2: v2 = new Vector2D(5);              // (5, 5)
        // TODO 3: v3 = new Vector2D(3, 4);           // (3, 4)
        // TODO 4: print all three via toString() — "(x, y)" format
    }
}
class Vector2D {
    // TODO 5: private double x, y
    // TODO 6: no-arg constructor → (0, 0)
    // TODO 7: 1-arg constructor → (n, n) — call the 2-arg version
    // TODO 8: 2-arg constructor → (x, y) — does the real work
    // TODO 9: toString() returns "(x, y)"
}` },
      { type: 'practice', id: 'd7n-p6', lang: 'java', title: 'Practice: Pizza Order — paired classes + constructors', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create 3 Pizzas: small margherita, medium with 2 toppings, large with 4 toppings
        // TODO 2: create an Order, add all three, print receipt
    }
}
class Pizza {
    // TODO 3: private fields size ("S"/"M"/"L"), toppings (String[]), price (double)
    // TODO 4: constructor (size, toppings[]) — sets price based on size + 50 per topping
    //   (S = 100, M = 200, L = 300, plus 50 per topping)
    // TODO 5: describe() prints one-line summary
}
class Order {
    // TODO 6: private Pizza[] pizzas = new Pizza[10]; private int count
    // TODO 7: addPizza(Pizza p), receipt() — loops and prints each describe() plus a total
}` },
    ],
    tasks: [
      { id: 'java-14-d7-next-t1', text: 'BankAccount: holder, balance. Constructor + getters. Deposit, withdraw (reject overdraft/negative).', tag: 'lab' },
      { id: 'java-14-d7-next-t2', text: 'Three constructors in a single class, all chaining into the full one via this().', tag: 'lab' },
      { id: 'java-14-d7-next-t3', text: 'Demonstrate `this.field` disambiguation when parameter and field share the same name.', tag: 'drill' },
      { id: 'java-14-d7-next-t4', text: 'Trace what prints when constructors chain — write the output on paper before running.', tag: 'review' },
    ],
  },

  // DAY 8: Static & Inheritance (number bumped 10 → 11)
  {
    id: 'java-14-d8', number: 11, title: 'Static Members and Inheritance', duration: 120,
    topics: ['static Variables/Methods', 'Single Inheritance', 'Multilevel Inheritance'],
    blocks: [
      { type: 'callout', id: 'd8-intro', calloutType: 'info', title: 'Shared State and Code Reuse', content: '`static` members belong to the **class itself**, not to individual objects. **Inheritance** lets a child class pick up everything from its parent. Together, they are the backbone of code organisation.' },
      { type: 'heading', id: 'd8-static', level: 2, content: 'Static — Belonging to the Class' },
      { type: 'code', id: 'd8-static-code', lang: 'java', title: 'Static Counter Example', code: `class Student {
    String name;
    static int count = 0;   // shared by ALL Student objects

    public Student(String name) {
        this.name = name;
        count++;             // every new Student bumps the shared count
    }

    static int getCount() {
        return count;
    }

    // static methods CANNOT use \`this\` or access instance variables!
}` },
      { type: 'callout', id: 'd8-static-rules', calloutType: 'warn', title: 'Static Method Rules', content: '1. Can ONLY directly access static members.\n2. CANNOT use `this` (there is no object context).\n3. Instance methods CAN access both static and instance members.\n4. `main` is static because the JVM calls it without first creating an object.' },
      { type: 'heading', id: 'd8-inherit', level: 2, content: 'Inheritance — extends' },
      { type: 'code', id: 'd8-inh-code', lang: 'java', title: 'Single + Multilevel Inheritance', code: `class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    void eat() {
        System.out.println(name + " eats");
    }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);   // calls the parent constructor
    }

    void bark() {
        System.out.println(name + " barks");
    }
}

// Multilevel: class A → class B → class C (chain of "is-a")` },
      { type: 'callout', id: 'd8-super', calloutType: 'tip', title: 'super — Three Uses', content: '1. **`super()`** — call the parent constructor (must be the first line in the child constructor).\n2. **`super.method()`** — call the parent\'s version of an overridden method.\n3. **`super.field`** — access a parent\'s field that has been shadowed by a same-named field in the child.' },
      { type: 'callout', id: 'd8-diamond', calloutType: 'warn', title: 'No Multiple Class Inheritance', content: 'Java does NOT allow `class C extends A, B`. This avoids the **Diamond Problem**: if A and B both define `doSomething()`, which version does C inherit? Java solves this with **interfaces (Day 13)**.' },
      // Doubt
      { type: 'callout', id: 'd8-d1', calloutType: 'doubt', title: "Why can't static methods use this?", content: '`this` refers to the **current object instance**. Static methods belong to the **class** — there is no object, so `this` has no meaning here. Think of it this way: you can call `Student.getCount()` without ever creating a Student object. What would `this` refer to then? Nothing.' },
      { type: 'callout', id: 'd8-d2', calloutType: 'doubt', title: 'Can a subclass access private members of its parent?', content: '**No.** `private` means private, even from subclasses. The subclass still inherits those members (they exist in memory), but it cannot touch them directly. Use `protected` if you want subclass access, or expose the value through a public/protected getter.' },
      // Exam
      { type: 'callout', id: 'd8-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **Java does NOT support multiple class inheritance** — #1 OOP MCQ.\n2. **`super()` must be the first line** in a constructor (same as `this()`).\n3. **Static methods cannot be overridden**, only hidden.\n4. **`protected`** allows subclass access even from different packages.' },
      // Bridge
      { type: 'callout', id: 'd8-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Method overriding (touched on today) → **Polymorphism (Day 13)** for the full treatment. `super` → used heavily when overriding methods. Inheritance hierarchies → **abstract classes (Day 14)** formalise the parent.' },
      // Quick Ref
      { type: 'table', id: 'd8-qref', headers: ['Concept', 'Key Point'], rows: [['static field', 'One copy shared by all instances. Access via ClassName.field.'], ['static method', 'No `this`. Only accesses static members. Called via class.'], ['extends', 'Child inherits all non-private members from the parent.'], ['super()', 'Calls the parent constructor. Must be the first line.'], ['Multiple inheritance', 'NOT supported for classes. Supported via interfaces.']] },
      // Quiz
      { type: 'quiz', id: 'd8-quiz', title: 'Day 11 Quiz', questions: [
        { id: 'd8-q1', question: 'Why can a static method not access instance variables directly?', options: ['Security reasons', 'No object context exists', 'Instance variables are private', 'Static methods are slower'], correctIndex: 1, explanation: 'Static methods belong to the class and can be called without any object. Instance variables require an object to exist. Without an object, there is no instance variable to access.' },
        { id: 'd8-q2', question: 'What keyword does a subclass use to call its parent\'s constructor?', options: ['this', 'parent', 'super', 'base'], correctIndex: 2, explanation: 'super() calls the parent constructor. It must be the first line in the child constructor. If omitted, Java inserts super() (no-arg) automatically.' },
        { id: 'd8-q3', question: 'Why does Java not support multiple inheritance of classes?', options: ['Performance overhead', 'The Diamond Problem', 'Security concerns', 'It does — via extends A, B'], correctIndex: 1, explanation: 'The Diamond Problem: if class C extends A and B, and both have the same method, which version does C inherit? Java solves this with interfaces.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd8-cards', title: 'Day 11 Flashcards', cards: [
        { id: 'd8-f1', front: 'Static vs instance members?', back: 'Static: one copy per CLASS, accessed via ClassName.member. Instance: one copy per OBJECT, accessed via object.member. Static methods cannot use this.', hint: 'Class-level vs object-level...' },
        { id: 'd8-f2', front: 'Three uses of super?', back: 'super() = call parent constructor. super.method() = call parent method. super.field = access parent field (when shadowed). super() MUST be first line.', hint: 'Constructor, method, field...' },
        { id: 'd8-f3', front: 'What is the Diamond Problem?', back: 'When a class inherits from two parents that both define the same method — which version does the child use? Java prevents this by not allowing multiple class inheritance. Interfaces solve it.', hint: 'Two parents, same method...' },
      ] },
      { type: 'practice', id: 'd8-p1', lang: 'java', title: 'Practice: Vehicle Hierarchy', starter: 'public class Test {\n    public static void main(String[] args) {\n        // TODO: create a Car, call start(), and also a Bike once you add it\n    }\n}\nclass Vehicle {\n    String brand; int speed;\n    Vehicle(String b, int s) { brand=b; speed=s; }\n    void start() { System.out.println(brand+" starting"); }\n}\nclass Car extends Vehicle {\n    int doors;\n    Car(String b, int s, int d) { super(b,s); doors=d; }\n    @Override void start() { System.out.println(brand+" car engine starting"); }\n}\n// TODO: Add Bike class.', hint: 'Bike extends Vehicle. Add hasCarrier field. Override start(). Call super.start() inside to also invoke parent behaviour.' },
      { type: 'practice', id: 'd8-p2', lang: 'java', title: 'Practice: Employee Hierarchy', starter: 'public class Test {\n    public static void main(String[] args) {\n        Employee e = new Manager("Vinayak", 50000, 10000);\n        System.out.println(e.getSalary()); // polymorphic call\n    }\n}\nclass Employee {\n    String name; double salary;\n    Employee(String n, double s) { name=n; salary=s; }\n    double getSalary() { return salary; }\n}\nclass Manager extends Employee {\n    double bonus;\n    Manager(String n, double s, double b) { super(n,s); bonus=b; }\n    @Override double getSalary() { return salary + bonus; }\n}\n// TODO: Add Director extends Manager with stock options', hint: 'Director extends Manager. Add stockValue. Override getSalary() to include salary + bonus + stockValue.' },
      { type: 'practice', id: 'd8-p3', lang: 'java', title: 'Practice: Counter with static count', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create 3 Counter instances — observe count goes 1, 2, 3
        // TODO 2: print Counter.getCount() after each creation
        // TODO 3: try to access count from outside the class — observe the compile error
        //         (it is private — you must use getCount())
    }
}
class Counter {
    private static int count = 0;
    // TODO 4: constructor that increments count
    // TODO 5: public static int getCount() — returns count
}` },
      { type: 'practice', id: 'd8-p4', lang: 'java', title: 'Practice: BankAccount with static interestRate', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: BankAccount a1 = new BankAccount("Vinayak", 5000);
        // TODO 2: BankAccount a2 = new BankAccount("Riya", 10000);
        // TODO 3: print BankAccount.getInterestRate() — expect 4.5 (one value for ALL accounts)
        // TODO 4: set rate to 6.0 via setInterestRate() — both a1 and a2 now see 6.0
        // TODO 5: add a year of interest — a1.interest() updates a1.balance based on rate
    }
}
class BankAccount {
    private String holder;
    private double balance;
    private static double interestRate = 4.5;

    BankAccount(String holder, double balance) {
        this.holder = holder;
        this.balance = balance;
    }
    // TODO 6: getters for holder and balance
    // TODO 7: public static double getInterestRate() — return interestRate
    // TODO 8: public static void setInterestRate(double rate) — set interestRate
    // TODO 9: void interest() — add balance * interestRate / 100 to balance
}` },
      { type: 'practice', id: 'd8-p5', lang: 'java', title: 'Practice: Animal → Mammal → Dog multilevel chain', starter: `public class Test {
    public static void main(String[] args) {
        // Build a 3-level chain:
        //   Animal (top)      — has name, eat()
        //   Mammal extends Animal   — adds furColor, breathe()
        //   Dog extends Mammal      — adds breed, bark()
        //
        // TODO 1: declare all three classes with the right fields/methods
        // TODO 2: each level's constructor calls super(args)
        // TODO 3: Dog d = new Dog("Rex", "Golden", "Labrador")
        // TODO 4: call d.eat() (from Animal), d.breathe() (from Mammal), d.bark() (from Dog)
        //         — observe that Dog has access to ALL three levels' methods
        // TODO 5: trace: when you call new Dog(...), in what order do the constructors run?
        //         Hint: Animal → Mammal → Dog (parent first)
    }
}` },
    ],
    tasks: [
      { id: 'java-14-d8-t1', text: 'Counter class: static count variable tracking object creation count.', tag: 'lab' },
      { id: 'java-14-d8-t2', text: 'Vehicle → Car hierarchy with constructors, super(), and method overriding.', tag: 'lab' },
      { id: 'java-14-d8-t3', text: 'Animal → Mammal → Dog multilevel inheritance. Show Dog has methods from all 3.', tag: 'lab' },
      { id: 'java-14-d8-t4', text: 'Why can a static method not access instance variables?', tag: 'mcq' },
    ],
  },

  // DAY 8-NEXT: Guided Inheritance Practice — muscle memory before polymorphism
  {
    id: 'java-14-d8-next', number: 12,
    title: 'Inheritance in Practice',
    subtitle: 'Six guided exercises to build the muscle memory',
    duration: 90,
    topics: ['Inheritance Practice', 'super() Chaining', 'Method Overriding', 'Multilevel Hierarchies', 'IS-A vs HAS-A', 'Constructor Order'],
    alignment: ['CodeGym: Inheritance practice'],
    blocks: [
      { type: 'callout', id: 'd8n-intro', calloutType: 'info', title: 'Today is hands-on', content: 'Yesterday you saw inheritance as a concept — extends, super(), the basics. Today you do it with your hands. Six guided exercises, each one a small step up. By the end of this day you will have built four inheritance hierarchies, traced how constructors chain through them, and learned the difference between **IS-A** (use inheritance) and **HAS-A** (use composition — a field instead). Tomorrow, polymorphism will click into place because you will have the muscle memory.' },
      { type: 'heading', id: 'd8n-recap', level: 2, content: 'Quick Recap — The Tools You Have' },
      { type: 'paragraph', id: 'd8n-recap-p', content: 'Before the exercises, here is the toolkit you will reach for over and over today:\n\n- **`class Child extends Parent`** — declares the inheritance.\n- **`super(args)`** in a child constructor — calls the parent constructor. Must be the first line.\n- **`super.method()`** — calls the parent\'s version of an overridden method.\n- **`@Override`** above a method — tells the compiler you intend to override. Catches signature mistakes.\n- **Constructor order**: parent constructor runs FIRST, then the child\'s body executes.' },
      { type: 'heading', id: 'd8n-isa', level: 2, content: 'The IS-A Test — When Inheritance Makes Sense' },
      { type: 'paragraph', id: 'd8n-isa-p', content: 'Before you write `extends`, ask one question: **is the child genuinely a kind of the parent?** A `Dog` IS-A `Animal` — yes. A `Square` IS-A `Rectangle` — sort of, but the behavior breaks (a square cannot have a different width and height). A `Car` HAS-A `Engine` — NO, that should be a field, not a parent. The IS-A test is your friend.' },
      { type: 'callout', id: 'd8n-isa-tip', calloutType: 'tip', title: 'IS-A vs HAS-A in one sentence', content: '**Use inheritance (IS-A) when the child truly is a special case of the parent and the parent\'s full behaviour makes sense for the child.**\n\n**Use composition (HAS-A) when one object just *contains* another as a part.** A `Car` HAS-A `Engine` (composition). A `Dog` IS-A `Animal` (inheritance). When in doubt, prefer composition — it is more flexible.' },
      // Doubt
      { type: 'callout', id: 'd8n-d1', calloutType: 'doubt', title: 'What runs first — parent or child constructor?', content: '**The parent\'s constructor always runs first.** When you write `new Dog("Rex")`, Java runs `Animal("Rex")` (the super call), and THEN runs the body of `Dog(...)`. If you forget to write `super(...)` explicitly, Java inserts a no-arg `super()` for you. This is why a parent without a no-arg constructor forces you to write `super(args)` in every child.' },
      { type: 'callout', id: 'd8n-d2', calloutType: 'doubt', title: 'Can a child access private fields of the parent?', content: '**No.** `private` means private, even from subclasses. The child inherits the field (it exists in memory) but cannot touch it directly. Two options: change the field to `protected`, or expose it through a public/protected getter that the child can call.' },
      { type: 'callout', id: 'd8n-d3', calloutType: 'doubt', title: 'What is the difference between overriding and redefining?', content: '**Overriding** = the child provides a new implementation of a method that exists in the parent. Dynamic dispatch picks the right one at runtime based on the actual object type.\n\n**Redefining (hiding)** = the child writes a static method with the same name as the parent\'s static method. No dynamic dispatch. The reference type decides which version runs. Static methods cannot be truly "overridden."' },
      // Exam
      { type: 'callout', id: 'd8n-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **`super()` must be the first line** in a child constructor — same rule as `this()`.\n2. **Parent constructor runs first** — even if you forget `super()`, Java inserts no-arg `super()` for you.\n3. **IS-A test** before `extends`. If in doubt, prefer composition (HAS-A).\n4. **`private` fields are NOT accessible** to subclasses. Use `protected` or a getter.\n5. **Multilevel inheritance is fine**. Multiple class inheritance is NOT.' },
      // Quick Ref
      { type: 'table', id: 'd8n-qref', headers: ['Concept', 'Key Point'], rows: [
        ['extends', 'class Child extends Parent — single inheritance only.'],
        ['super(args)', 'Calls parent constructor. Must be first line in child constructor.'],
        ['super.method()', 'Calls the parent\'s version of an overridden method.'],
        ['@Override', 'Optional but recommended. Compiler checks the signature.'],
        ['Constructor order', 'Parent constructor runs FIRST, then the child\'s body.'],
        ['IS-A test', 'Before `extends`, ask: is the child genuinely a kind of the parent?'],
        ['HAS-A', 'Use a field, not inheritance. Car HAS-A Engine.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'd8n-quiz', title: 'Day 12 Quiz', questions: [
        { id: 'd8n-q1', question: 'When you write `new Dog("Rex")`, which constructor runs first?', options: ['Dog\'s constructor', 'Animal\'s (parent) constructor', 'Both at the same time', 'Neither — only Dog has a constructor'], correctIndex: 1, explanation: 'Java runs the parent constructor first (via super("Rex")), then the child\'s body executes. If you forget to write super("Rex"), Java inserts a no-arg super() — which will fail to compile if Animal does not have a no-arg constructor.' },
        { id: 'd8n-q2', question: 'A `Square` extends `Rectangle`. Why is this problematic?', options: ['It is perfectly fine', 'Square cannot honour Rectangle\'s setWidth/setHeight independently — violates LSP', 'Java forbids it', 'It uses too much memory'], correctIndex: 1, explanation: 'If Rectangle has setWidth(w) and setHeight(h) as independent setters, a Square would have to override them to keep width == height. That breaks the Liskov Substitution Principle — anywhere a Rectangle is expected, Square behaves differently.' },
        { id: 'd8n-q3', question: 'Where must `super()` appear inside a child constructor?', options: ['Anywhere', 'First line', 'Last line', 'Inside an if block'], correctIndex: 1, explanation: '`super()` must be the first line. Same rule as `this()`. You cannot have both `this()` and `super()` — pick one.' },
        { id: 'd8n-q4', question: 'A `Car` class needs an `Engine`. Should Car extend Engine, or have an Engine field?', options: ['extend Engine — IS-A', 'Have an Engine field — HAS-A (composition)', 'Both work equally well', 'Neither — Java does not allow this'], correctIndex: 1, explanation: 'A Car HAS-A Engine. Composition (a private Engine field) is more flexible than inheritance and respects the HAS-A relationship.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd8n-cards', title: 'Day 12 Flashcards', cards: [
        { id: 'd8n-f1', front: 'Constructor order in inheritance?', back: 'Parent constructor runs FIRST (via super(args)), then the child\'s body executes. If you forget super(), Java inserts no-arg super() — which fails to compile if the parent has no no-arg constructor.', hint: 'Parent first, then child...' },
        { id: 'd8n-f2', front: 'IS-A vs HAS-A?', back: 'IS-A → inheritance (extends). HAS-A → composition (a field). Test: "is the child genuinely a kind of the parent?" If yes, extends. If no — if one just *contains* the other — use a field. When in doubt, prefer composition.', hint: 'A kind of vs contains a...' },
        { id: 'd8n-f3', front: 'Can a child access private fields of the parent?', back: 'NO. `private` means private, even from subclasses. The field still exists in memory (the child inherits it), but it cannot be touched directly. Use `protected` or expose a public/protected getter.', hint: 'No — protected or getter...' },
        { id: 'd8n-f4', front: 'super() vs super.method() vs super.field?', back: 'super() = parent constructor (first line in child constructor). super.method() = parent\'s overridden method. super.field = parent\'s field shadowed by a same-named child field. Three uses, all prefixed with super.', hint: 'Constructor, method, field...' },
      ] },
      // Practices (6, at end of day)
      { type: 'practice', id: 'd8n-p1', lang: 'java', title: 'Practice: Animal → Dog with override', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create Animal("Generic") and call eat()
        // TODO 2: create Dog("Rex") and call eat() — observe the overridden version
        // TODO 3: create Dog("Buddy") and call super-equivalent eat() via Dog's eat()
        //         (hint: inside Dog.eat(), call super.eat() FIRST then add the dog-specific line)
        // TODO 4: cast an Animal reference to a Dog and call the dog-only method fetch()
    }
}
class Animal {
    String name;
    Animal(String name) { this.name = name; }
    void eat() { System.out.println(name + " eats something."); }
}
class Dog extends Animal {
    Dog(String name) { super(name); }
    // TODO 5: override eat() — call super.eat() then add "And wags tail."
    // TODO 6: add fetch() that prints name + " fetches the ball!"
}` },
      { type: 'practice', id: 'd8n-p2', lang: 'java', title: 'Practice: Person → Employee → Manager (multilevel)', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: new Manager("Vinayak", 101, "CSE", 50000)
        // TODO 2: call introduce() — observe ALL THREE layers run via super chaining
        // TODO 3: call role() on each level — print "Manager", "Employee", "Person"
        // TODO 4: call work() — observe the Manager override + super.work() inside it
    }
}
class Person {
    String name;
    Person(String name) { this.name = name; }
    void introduce() { System.out.println("I am " + name); }
}
class Employee extends Person {
    int id;
    Employee(String name, int id) { super(name); this.id = id; }
    @Override void introduce() {
        super.introduce();
        System.out.println("Employee id: " + id);
    }
    void work() { System.out.println(name + " works"); }
}
class Manager extends Employee {
    String dept;
    Manager(String name, int id, String dept, double salary) {
        super(name, id);
        this.dept = dept;
    }
    // TODO 5: override introduce() — call super, then print "Dept: " + dept
    // TODO 6: override work() — call super.work(), then print name + " manages the " + dept + " team"
}` },
      { type: 'practice', id: 'd8n-p3', lang: 'java', title: 'Practice: Shape → Circle with area() override', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: create Shape("generic"), Circle(5.0), Circle(2.5)
        // TODO 2: call describe() on each — observe overriding + super.describe()
        // TODO 3: print the area of each circle via area()
        // TODO 4: cast a Shape reference to Circle and call a Circle-only method
    }
}
class Shape {
    String name;
    Shape(String name) { this.name = name; }
    double area() { return 0; }
    void describe() {
        System.out.print(name + " with area " + area());
    }
}
class Circle extends Shape {
    double radius;
    Circle(double radius) { super("Circle"); this.radius = radius; }
    // TODO 5: override area() — return Math.PI * radius * radius
    // TODO 6: override describe() — call super.describe() then print " (radius " + radius + ")"
    // TODO 7: add circumference() that returns 2 * Math.PI * radius
}` },
      { type: 'practice', id: 'd8n-p4', lang: 'java', title: 'Practice: Override + call super inside', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: new Printer("HP"), LaserPrinter("HP", 30), InkjetPrinter("HP", "color")
        // TODO 2: call print("hello") on each — observe each level adds detail
        // TODO 3: store all three in a Printer[] and call print("test") — observe each version runs
    }
}
class Printer {
    String brand;
    Printer(String brand) { this.brand = brand; }
    void print(String text) {
        System.out.println("[" + brand + "] " + text);
    }
}
class LaserPrinter extends Printer {
    int ppm; // pages per minute
    LaserPrinter(String brand, int ppm) { super(brand); this.ppm = ppm; }
    // TODO 4: override print() — call super.print(), then print "Speed: " + ppm + " ppm"
}
class InkjetPrinter extends Printer {
    String mode; // "bw" or "color"
    InkjetPrinter(String brand, String mode) { super(brand); this.mode = mode; }
    // TODO 5: override print() — call super.print(), then print "Mode: " + mode
}` },
      { type: 'practice', id: 'd8n-p5', lang: 'java', title: 'Practice: Trace constructor order', starter: `public class Test {
    public static void main(String[] args) {
        // Run this and explain the OUTPUT ORDER in a comment.
        // Which print fires first? Why does A fire before B?
        System.out.println("--- starting ---");
        B b = new B("Vinayak");
        System.out.println("--- done ---");
    }
}
class A {
    A() { System.out.println("A constructor"); }
    A(String name) { System.out.println("A constructor: " + name); }
}
class B extends A {
    B(String name) {
        super(name);                   // calls A(String)
        System.out.println("B constructor");
    }
}
// Question: write a comment in main explaining the exact order of prints and why.` },
      { type: 'practice', id: 'd8n-p6', lang: 'java', title: 'Practice: Fix the broken inheritance (HAS-A instead)', starter: `public class Test {
    public static void main(String[] args) {
        // The Team below has a BAD design: it extends Member (a single person).
        // A Team IS-NOT-A Member — a team is a GROUP of members.
        // Refactor Team to use COMPOSITION: a Team HAS-A array of Members.
        //
        // After your refactor:
        //   Team t = new Team("AIML Batch");
        //   t.add(new Member("Vinayak", 101));
        //   t.add(new Member("Riya", 102));
        //   t.list();  // prints the team name + all members
    }
}
class Member {
    String name; int id;
    Member(String name, int id) { this.name = name; this.id = id; }
    void print() { System.out.println(id + ": " + name); }
}

// BEFORE refactor — Team extends Member (WRONG — IS-NOT-A)
// class Team extends Member { ... }

// AFTER refactor — Team HAS-A list of Members (CORRECT)
class Team {
    String name;
    // TODO 1: private Member[] members = new Member[10]; private int count;
    Team(String name) { this.name = name; }
    // TODO 2: void add(Member m) — append to the array
    // TODO 3: void list() — print "<name> team:" then each member via m.print()
}` },
    ],
    tasks: [
      { id: 'java-14-d8-next-t1', text: 'Build a 3-level hierarchy: Person → Employee → Manager. Show all three constructors run in order via super chaining.', tag: 'lab' },
      { id: 'java-14-d8-next-t2', text: 'Refactor the broken Team-extends-Member example. Use composition (HAS-A) and explain why inheritance was wrong.', tag: 'lab' },
      { id: 'java-14-d8-next-t3', text: 'Trace and predict: given a chain of constructors calling super(), write the exact print order before running.', tag: 'drill' },
      { id: 'java-14-d8-next-t4', text: 'Create an Animal → Dog → Puppy chain. Each level overrides speak(). Demonstrate which version runs at each reference type.', tag: 'lab' },
      { id: 'java-14-d8-next-t5', text: 'Explain: IS-A vs HAS-A. Give two examples of each from real code you have written.', tag: 'mcq' },
    ],
  },

  // DAY 9: Polymorphism (number bumped 11 → 12)
  {
    id: 'java-14-d9', number: 13, title: 'Polymorphism Mastery', duration: 120,
    topics: ['Method Overloading', 'Method Overriding', 'Static vs Dynamic Binding'],
    blocks: [
      { type: 'callout', id: 'd9-intro', calloutType: 'info', title: 'Polymorphism — "Many Forms"', content: 'Same name, different behaviour. Two flavours: **compile-time** (overloading) and **runtime** (overriding with dynamic dispatch). Guaranteed CE-2 topic — the comparison table is essential.' },
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
      { type: 'callout', id: 'd9-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **The comparison table** is a guaranteed question. Memorise it.\n2. **Overloading = compile-time. Overriding = runtime.** Always.\n3. **`@Override` annotation** catches signature mistakes at compile time.\n4. **Dynamic dispatch**: parent reference + child object → the child\'s method runs.' },
      // Bridge
      { type: 'callout', id: 'd9-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Runtime polymorphism is WHY **abstract classes and interfaces (Day 14)** work. Without dynamic dispatch, abstraction would be useless. `Comparable`/`Comparator` (Day 18) use the same interface-driven polymorphism.' },
      // Quick Ref
      { type: 'table', id: 'd9-qref', headers: ['Concept', 'Key Point'], rows: [['Overloading', 'Same name, different params. Compile-time.'], ['Overriding', 'Same signature, child redefines parent. Runtime.'], ['@Override', 'Optional but recommended. Catches signature errors.'], ['Dynamic dispatch', 'JVM uses actual object type, not reference type.']] },
      // Quiz
      { type: 'quiz', id: 'd9-quiz', title: 'Day 13 Quiz', questions: [
        { id: 'd9-q1', question: 'Can you overload a method by changing only the return type?', options: ['Yes', 'No — compile error', 'Only if one is void', 'Only in the same package'], correctIndex: 1, explanation: 'No. The compiler cannot distinguish methods by return type alone. The parameter list must differ in count, type, or order.' },
        { id: 'd9-q2', question: 'When is the decision made for an overridden method call?', options: ['Compile time', 'Runtime (JVM)', 'At class loading', 'At JVM startup'], correctIndex: 1, explanation: 'Overridden methods use dynamic binding — the JVM looks at the actual object type at runtime and calls the appropriate version.' },
        { id: 'd9-q3', question: 'What does @Override do?', options: ['Makes the method faster', 'Forces the method to be private', 'Compiler checks that you are actually overriding', 'Nothing — it is just a comment'], correctIndex: 2, explanation: '@Override tells the compiler "I intend to override a parent method." If the signature does not match any parent method, the compiler produces an error.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd9-cards', title: 'Day 13 Flashcards', cards: [
        { id: 'd9-f1', front: 'Overloading vs Overriding?', back: 'Overloading: same name, DIFFERENT params, same class, compile-time. Overriding: same name, SAME params, parent-child, runtime. Complete opposite except they share "same method name."', hint: 'One in same class, one across classes...' },
        { id: 'd9-f2', front: 'What is dynamic method dispatch?', back: 'The JVM decides at RUNTIME which overridden method to call based on the ACTUAL object type, not the reference type. Animal a = new Dog(); a.sound() calls Dog.sound().', hint: 'Runtime decision based on actual object...' },
        { id: 'd9-f3', front: 'Can static methods be overridden?', back: 'NO. Static methods belong to the class and are resolved at compile time. They can be "hidden" by redefining in child, but this is NOT overriding — no dynamic dispatch occurs.', hint: 'Static = compile-time binding...' },
      ] },
      { type: 'practice', id: 'd9-p1', lang: 'java', title: 'Practice: Shape Polymorphism', starter: 'public class Test {\n    public static void main(String[] args) {\n        Shape s1 = new Circle(5);\n        Shape s2 = new Rectangle(4, 6);\n        // TODO: print both areas. Add overloaded area(String unit)\n    }\n}\nclass Shape { double area() { return 0; } }\nclass Circle extends Shape {\n    double r; Circle(double r) { this.r=r; }\n    @Override double area() { return Math.PI*r*r; }\n}\nclass Rectangle extends Shape {\n    double w,h; Rectangle(double w, double h) { this.w=w; this.h=h; }\n    @Override double area() { return w*h; }\n}', hint: 'For overloaded area: area(String unit) returns String like "78.54 sq cm" using String.format("%.2f sq %s", area(), unit).' },
      { type: 'practice', id: 'd9-p2', lang: 'java', title: 'Practice: Payment System', starter: 'public class Test {\n    public static void main(String[] args) {\n        Payment p1 = new CreditCard();\n        Payment p2 = new UPI();\n        p1.pay(1000); // which one runs?\n        p2.pay(500);  // which one runs?\n        // TODO: add Cash class, demonstrate overloaded pay(amount, notes)\n    }\n}\nclass Payment { void pay(double amount) { System.out.println("Paid "+amount); } }\nclass CreditCard extends Payment { @Override void pay(double a) { System.out.println("Paid $"+a+" via Credit Card"); } }\nclass UPI extends Payment { @Override void pay(double a) { System.out.println("Paid $"+a+" via UPI"); } }', hint: 'For overloaded: add `void pay(double amount, String notes)` in Payment. Override it in subclasses. Dynamic dispatch still works for the overridden version.' },
      { type: 'practice', id: 'd9-p3', lang: 'java', title: 'Practice: Calculator with overloaded add()', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: call add(2, 3)         -> expect 5
        // TODO 2: call add(2.5, 3.7)     -> expect 6.2
        // TODO 3: call add("Hello, ", "Java") -> expect "Hello, Java"
        // TODO 4: call add(1, 2, 3)      -> expect 6
        // TODO 5: call add()             -> expect 0 (no-arg version)
    }
}
class Calculator {
    // TODO 6: overloaded add() methods
    //   - int add(int a, int b)
    //   - double add(double a, double b)
    //   - String add(String a, String b)  — concatenates
    //   - int add(int a, int b, int c)
    //   - int add()  — returns 0
}` },
      { type: 'practice', id: 'd9-p4', lang: 'java', title: 'Practice: Vehicle dynamic dispatch with super.method()', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: Vehicle v = new Car("Honda", "Civic");
        //         v.start();    // expect Car.engine start
        //         v.stop();     // expect Vehicle stop (not overridden)
        //         v.honk();     // expect Car honk
        //
        // TODO 2: demonstrate super.method() call:
        //         inside Car.start(), call super.start() FIRST, then print "Car engine on"
        //         so the print order is: "Vehicle starting" → "Car engine on"
    }
}
class Vehicle {
    String brand;
    Vehicle(String brand) { this.brand = brand; }
    void start() { System.out.println(brand + " starting"); }
    void stop() { System.out.println(brand + " stopping"); }
}
class Car extends Vehicle {
    String model;
    Car(String brand, String model) { super(brand); this.model = model; }
    // TODO 3: override start() — call super.start() then add the car-specific line
    // TODO 4: override stop() — do NOT call super.stop(); just print the car stop line
    // TODO 5: add honk() that prints "<brand> <model> goes BEEP!"
}` },
      { type: 'practice', id: 'd9-p5', lang: 'java', title: 'Practice: Overload vs override decision', starter: `public class Test {
    public static void main(String[] args) {
        // TODO 1: predict and run each line, then explain in a comment WHY
        Printer p = new ReceiptPrinter();
        p.print("Hello");            // line A
        p.print("Hello", 3);         // line B
        p.print("Hello", "World");   // line C

        // Hint:
        //   Printer.print(String s)            — prints "<s>"
        //   Printer.print(String s, int n)    — prints "<s>" repeated n times
        //   Printer.print(String a, String b)  — prints "<a> <b>"  (new overload)
        //
        //   ReceiptPrinter.print(String s)    — @Override — prints "[!]<s>[!]"
        //
        //   Which method runs at lines A, B, C? Does dynamic dispatch pick the overridden one?
    }
}
class Printer {
    void print(String s)                  { System.out.println("[" + s + "]"); }
    void print(String s, int n)           { for (int i = 0; i < n; i++) print(s); }
    void print(String a, String b)        { System.out.println(a + " " + b); }
}
class ReceiptPrinter extends Printer {
    @Override
    void print(String s)                  { System.out.println("[!]" + s + "[!]"); }
}` },
    ],
    tasks: [
      { id: 'java-14-d9-t1', text: 'Overloaded multiply(): int×int, int×double, double×double, 3 ints.', tag: 'lab' },
      { id: 'java-14-d9-t2', text: 'Shape→Circle,Rectangle with overridden area(). Dynamic dispatch with Shape references.', tag: 'lab' },
      { id: 'java-14-d9-t3', text: 'Payment→CreditCard,UPI,Cash. Override pay(). Runtime polymorphism.', tag: 'lab' },
      { id: 'java-14-d9-t4', text: 'Prove overloading=compile-time, overriding=runtime with code.', tag: 'drill' },
    ],
  },

  // DAY 10: Abstraction & Interfaces (number bumped 12 → 13)
  {
    id: 'java-14-d10', number: 14, title: 'Abstraction and Interfaces', duration: 120,
    topics: ['Abstract Classes', 'Abstract Methods', 'Interfaces', 'Multiple Implementation'],
    blocks: [
      { type: 'callout', id: 'd10-intro', calloutType: 'info', title: 'Designing Contracts', content: '**Abstract class** = partial implementation — some methods defined, some left abstract. **Interface** = a pure contract — defines WHAT, not HOW. Both enable polymorphism. Today: when to use each.' },
      { type: 'heading', id: 'd10-abstract', level: 2, content: 'Abstract Classes' },
      { type: 'code', id: 'd10-abs-code', lang: 'java', title: 'Abstract Class', code: 'abstract class Vehicle {\n    String brand;\n    Vehicle(String b) { brand=b; }\n    abstract void startEngine();           // NO body — must be implemented\n    void showBrand() {                     // concrete — inherited as-is\n        System.out.println("Brand: "+brand);\n    }\n}\nclass Car extends Vehicle {\n    Car(String b) { super(b); }\n    @Override void startEngine() { System.out.println(brand+" starts with key"); }\n}' },
      { type: 'heading', id: 'd10-interface', level: 2, content: 'Interfaces' },
      { type: 'code', id: 'd10-if-code', lang: 'java', title: 'Multiple Interfaces', code: 'interface Flyable { void fly(); }\ninterface Swimmable { void swim(); }\nclass Duck implements Flyable, Swimmable {\n    public void fly() { System.out.println("Duck flies"); }\n    public void swim() { System.out.println("Duck swims"); }\n}\n// A class can implement MANY interfaces — solves the diamond problem!' },
      { type: 'heading', id: 'd10-compare', level: 2, content: 'Abstract Class vs Interface' },
      { type: 'table', id: 'd10-comp-table', headers: ['Feature', 'Abstract Class', 'Interface'], rows: [['Keyword', 'abstract class', 'interface'], ['Methods', 'Abstract + concrete', 'Abstract + default/static (Java 8+)'], ['Variables', 'Instance variables OK', 'Only constants (public static final)'], ['Constructors', 'Can have', 'Cannot have'], ['How many', 'Extend ONE only', 'Implement MANY'], ['Use when…', 'Shared state and behaviour (is-a)', 'Shared capability (can-do)']] },
      { type: 'callout', id: 'd10-diamond-solved', calloutType: 'tip', title: 'Diamond Problem — Solved', content: 'A class can implement multiple interfaces. If two of those interfaces happen to define the same default method, the class MUST explicitly override that method to resolve ambiguity: `InterfaceA.super.method()`. This forces you to make a conscious choice instead of silently picking one.' },
      // Doubt
      { type: 'callout', id: 'd10-d1', calloutType: 'doubt', title: 'When should I use abstract class vs interface?', content: '**Decision framework**:\n\n- Classes share **state** (fields) and **behaviour** (concrete methods)? → **Abstract class**\n- Unrelated classes need to share a **capability**? → **Interface**\n- Need **constructors** or non-public methods? → **Abstract class**\n- Need multiple inheritance of **type**? → **Interface**\n\nIn modern Java, interfaces with default methods blur this line. Rule of thumb: **IS-A** (abstract) vs **CAN-DO** (interface).' },
      { type: 'callout', id: 'd10-d2', calloutType: 'doubt', title: 'Can an interface have a constructor?', content: '**No.** Interfaces cannot be instantiated, so constructors have no purpose. Every field in an interface is implicitly `public static final` (a constant). If you need instance state and constructors, use an abstract class.' },
      // Exam
      { type: 'callout', id: 'd10-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **1 abstract class, MANY interfaces** — that is how multiple inheritance is solved.\n2. **`Serializable`, `Cloneable`, `Comparable`** — these are interfaces, not classes.\n3. **Abstract class CAN have constructors** (called via `super()` from the subclass).\n4. **Interface CANNOT have constructors** — prevents instantiation.' },
      // Bridge
      { type: 'callout', id: 'd10-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Interfaces are EVERYWHERE: **`Comparable`/`Comparator` (Day 18)**, **`Serializable` (Day 17)**, `Runnable` (threads), `ActionListener` (GUIs). This concept never goes away — it is the backbone of all Java APIs.' },
      // Quick Ref
      { type: 'table', id: 'd10-qref', headers: ['Concept', 'Key Point'], rows: [['abstract class', 'Cannot instantiate. Can have constructors. Partial implementation.'], ['interface', 'Pure contract. No constructors. Multiple implementation allowed.'], ['implements', 'Class implements an interface. Must override all abstract methods.'], ['default method', 'Interface method with a body (Java 8+). Can be overridden.'], ['Marker interface', 'No methods. Just marks a class. e.g., Serializable, Cloneable.']] },
      // Quiz
      { type: 'quiz', id: 'd10-quiz', title: 'Day 14 Quiz', questions: [
        { id: 'd10-q1', question: 'How many abstract classes can a single class extend?', options: ['One', 'Two', 'Unlimited', 'Zero — abstract classes cannot be extended'], correctIndex: 0, explanation: 'Exactly ONE. Java does not support multiple class inheritance. But a class can implement unlimited interfaces.' },
        { id: 'd10-q2', question: 'Which of these can have a constructor?', options: ['Interface', 'Abstract class', 'Both', 'Neither'], correctIndex: 1, explanation: 'Abstract classes can have constructors (called via super() from subclasses). Interfaces cannot have constructors.' },
        { id: 'd10-q3', question: 'What is a marker interface?', options: ['An interface that marks performance metrics', 'An interface with no methods — just marks a class', 'An interface that generates markers', 'A deprecated interface'], correctIndex: 1, explanation: 'A marker interface has no methods. It simply "marks" a class as having a certain property. Examples: Serializable, Cloneable, Remote.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'd10-cards', title: 'Day 14 Flashcards', cards: [
        { id: 'd10-f1', front: '5 differences between abstract class and interface?', back: '1. abstract can have constructors, interface cannot. 2. abstract can have instance vars, interface only constants. 3. Extend ONE abstract, implement MANY interfaces. 4. abstract can have concrete methods, interface only abstract+default+static. 5. abstract = is-a, interface = can-do.', hint: 'Constructors, variables, count, methods, relationship...' },
        { id: 'd10-f2', front: 'What are default methods in interfaces?', back: 'Methods with a body defined in the interface (Java 8+). Allow adding methods without breaking existing implementations. Classes can override them if needed.', hint: 'Java 8 feature...' },
        { id: 'd10-f3', front: 'Can an abstract class be instantiated?', back: 'NO — that is the whole point. You must create a concrete subclass that implements all abstract methods, then instantiate the subclass. Abstract is a template, not a usable object.', hint: 'Think about what "abstract" means...' },
      ] },
      { type: 'practice', id: 'd10-p1', lang: 'java', title: 'Practice: Smart Device Interface', starter: 'public class Test {\n    public static void main(String[] args) {\n        Connectable c = new SmartPhone();\n        c.connect(); // only Connectable methods visible\n    }\n}\ninterface Connectable { void connect(); void disconnect(); }\ninterface Chargeable { void charge(); int getBattery(); }\nclass SmartPhone implements Connectable, Chargeable {\n    int battery=100;\n    public void connect() { System.out.println("Phone connected"); }\n    public void disconnect() { System.out.println("Phone disconnected"); }\n    public void charge() { battery=100; System.out.println("Charged"); }\n    public int getBattery() { return battery; }\n}\n// TODO: Add Laptop class. Demonstrate interface polymorphism.', hint: 'Laptop implements both interfaces. Create arrays: Connectable[] devices = {new SmartPhone(), new Laptop()}; — call connect() on all.' },
      { type: 'practice', id: 'd10-p2', lang: 'java', title: 'Practice: Payment Gateway Interface', starter: 'public class Test {\n    public static void main(String[] args) {\n        PaymentGateway gw = new Razorpay();\n        gw.processPayment(999);\n        // TODO: switch to Stripe. Observe zero code changes needed!\n    }\n}\ninterface PaymentGateway {\n    boolean processPayment(double amount);\n    boolean refund(String transactionId);\n}\nclass Razorpay implements PaymentGateway {\n    public boolean processPayment(double a) { System.out.println("Razorpay: $"+a); return true; }\n    public boolean refund(String id) { System.out.println("Razorpay refund: "+id); return true; }\n}\nclass Stripe implements PaymentGateway {\n    public boolean processPayment(double a) { System.out.println("Stripe: $"+a); return true; }\n    public boolean refund(String id) { System.out.println("Stripe refund: "+id); return true; }\n}', hint: 'Change `new Razorpay()` to `new Stripe()` — the rest of the code works unchanged. That is the power of interfaces.' },
      { type: 'practice', id: 'd10-p3', lang: 'java', title: 'Practice: Abstract Animal', starter: 'public class Test {\n    public static void main(String[] args) {\n        // TODO 1: declare abstract class Animal with:\n        //   - protected String name\n        //   - constructor Animal(String name)\n        //   - abstract void speak()\n        //   - concrete void describe() that prints "I am <name>"\n        //\n        // TODO 2: declare concrete subclasses Dog("Rex"), Cat("Whiskers"), Cow("Bessie")\n        //   each overrides speak() with its own sound\n        //\n        // TODO 3: try Animal a = new Animal("Generic"); -- observe the compile error\n        //         (cannot instantiate abstract class)\n        //\n        // TODO 4: Animal[] zoo = { new Dog("Rex"), new Cat("Whiskers"), new Cow("Bessie") };\n        //         loop and call describe() then speak() on each -- polymorphism in action\n    }\n}' },
      { type: 'practice', id: 'd10-p4', lang: 'java', title: 'Practice: Playable interface with multiple implementations', starter: 'public class Test {\n    public static void main(String[] args) {\n        // TODO 1: declare interface Playable with play(), pause(), stop() -- all void\n        // TODO 2: implement MusicPlayer (prints "music playing", "music paused", "music stopped")\n        // TODO 3: implement VideoPlayer (prints "video playing", "video paused", "video stopped")\n        // TODO 4: implement PodcastPlayer (prints "podcast playing", "podcast paused", "podcast stopped")\n        // TODO 5: Playable[] devices = { new MusicPlayer(), new VideoPlayer(), new PodcastPlayer() };\n        //         for each: play() then stop() -- interface polymorphism\n        //         you do NOT need a "Player" superclass -- interface alone is enough\n    }\n}\ninterface Playable {\n    void play();\n    void pause();\n    void stop();\n}' },
      { type: 'practice', id: 'd10-p5', lang: 'java', title: 'Practice: Drawable with 3 shapes', starter: 'public class Test {\n    public static void main(String[] args) {\n        // TODO 1: declare interface Drawable with String draw() and String color()\n        // TODO 2: Circle(radius)         -- draw returns "Circle(r=<radius>)", color returns "blue"\n        // TODO 3: Square(side)          -- draw returns "Square(<side>x<side>)", color returns "red"\n        // TODO 4: Triangle(base, height) -- draw returns "Triangle(b=<base>,h=<height>)", color returns "green"\n        // TODO 5: Drawable[] shapes = { new Circle(5), new Square(4), new Triangle(3, 6) };\n        //         for each: print color() + " -- " + draw()\n        //         (note: shapes with the same interface can live in one array)\n    }\n}\ninterface Drawable {\n    String draw();\n    String color();\n}' },
      { type: 'practice', id: 'd10-p6', lang: 'java', title: 'Practice: Resolvable conflict with two interfaces', starter: 'public class Test {\n    public static void main(String[] args) {\n        // TODO 1: declare interface Printer with default void print() that prints "Printer.print()"\n        // TODO 2: declare interface Scanner with default void scan() that prints "Scanner.scan()"\n        // TODO 3: declare interface Copier extends Printer, Scanner  (multiple inheritance of interfaces!)\n        // TODO 4: implement class AllInOne implements Copier (no need to override print/scan)\n        // TODO 5: AllInOne a = new AllInOne(); a.print(); a.scan();\n        //         observe that Copier inherits BOTH defaults -- interface multiple inheritance works\n        //\n        // TODO 6: now make Printer have default print() AND Scanner have default print() too\n        //         -- they conflict. Try: interface Copier2 extends Printer, Scanner\n        //         observe the COMPILE ERROR -- Java refuses to pick one.\n        //         Fix: in Copier2, override print() that calls one of the super defaults explicitly\n    }\n}\ninterface Printer { default void print() { System.out.println("Printer.print()"); } }\ninterface Scanner { default void scan()  { System.out.println("Scanner.scan()"); } }\ninterface Copier extends Printer, Scanner {}\nclass AllInOne implements Copier {}' },
    ],
    tasks: [
      { id: 'java-14-d10-t1', text: 'Abstract Shape with abstract area(), perimeter(). Concrete display(). Circle, Rectangle, Triangle.', tag: 'lab' },
      { id: 'java-14-d10-t2', text: 'Interface Playable (play, pause, stop). MusicPlayer + VideoPlayer. Interface polymorphism.', tag: 'lab' },
      { id: 'java-14-d10-t3', text: 'Two interfaces with conflicting default methods. Class overrides to resolve.', tag: 'bonus' },
      { id: 'java-14-d10-t4', text: 'List 5 differences between abstract classes and interfaces. Which can have constructors?', tag: 'mcq' },
    ],
  },
];