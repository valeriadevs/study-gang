import type { Day } from '../../../types';

export const sdePhase1days: Day[] = [
  // DAY 1: NumPy Fundamentals
  {
    id: 'sde-8-d1', number: 1,
    title: 'NumPy Fundamentals for Statistics', duration: 60,
    topics: ['Array Manipulation', 'Math Operations', 'Statistical Functions', 'Distributions'],
    blocks: [
      { type: 'callout', id: 'sd1-intro', calloutType: 'info', title: 'The Numerical Backbone of Data Science', content: 'NumPy is the foundation of Python data science. It provides the **ndarray** — a fast, memory-efficient array that powers everything from basic math to ML model training. If Pandas is the car body, NumPy is the engine. Today you will master array creation, vectorized operations, and statistical functions.' },
      { type: 'heading', id: 'sd1-what', level: 2, content: 'Why NumPy? (And Why Not Plain Python Lists?)' },
      { type: 'paragraph', id: 'sd1-what-p', content: 'Python lists are flexible but **slow** for math. NumPy arrays are **contiguous blocks of memory** with a fixed data type. This means operations run in compiled C code, not interpreted Python. The result: NumPy is 10-100x faster for numerical work.' },
      { type: 'code', id: 'sd1-speed', lang: 'python', title: 'List vs NumPy Speed Comparison', code: `import numpy as np
import time

# Python list — slow, interpreted
py_list = list(range(1_000_000))
start = time.time()
squared = [x**2 for x in py_list]
print(f"Python list: {time.time() - start:.3f}s")

# NumPy array — fast, compiled C
np_arr = np.arange(1_000_000)
start = time.time()
squared = np_arr ** 2
print(f"NumPy array: {time.time() - start:.3f}s")
# NumPy is typically 10-50x faster!` },
      { type: 'heading', id: 'sd1-create', level: 2, content: 'Creating Arrays — Your Toolkit' },
      { type: 'code', id: 'sd1-create-code', lang: 'python', title: 'Array Creation Methods', code: `import numpy as np

# From Python list
arr = np.array([1, 2, 3, 4, 5])

# Pre-filled arrays
zeros = np.zeros(5)          # [0. 0. 0. 0. 0.]
ones = np.ones(5)            # [1. 1. 1. 1. 1.]
full = np.full(5, 7)         # [7 7 7 7 7]

# Sequences
seq = np.arange(0, 10, 2)    # [0 2 4 6 8]  (start, stop, step)
lin = np.linspace(0, 1, 5)   # [0. 0.25 0.5 0.75 1.] (5 evenly spaced)

# Random arrays
rand = np.random.rand(5)        # 5 random floats [0,1)
randint = np.random.randint(0, 10, 5)  # 5 random ints [0,10)
normal = np.random.randn(5)     # 5 from standard normal distribution

# Check attributes
print(arr.shape)    # (5,) — dimensions
print(arr.dtype)    # int64 — data type
print(arr.size)     # 5 — total elements` },
      { type: 'heading', id: 'sd1-2d', level: 2, content: '2D Arrays (Matrices)' },
      { type: 'code', id: 'sd1-2d-code', lang: 'python', title: '2D Array Operations', code: `# Create a 3x3 matrix
mat = np.array([[1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]])

print(mat.shape)     # (3, 3)
print(mat[0, 0])     # 1 — first row, first col
print(mat[0])        # [1 2 3] — first row
print(mat[:, 0])     # [1 4 7] — first column (: means 'all rows')
print(mat[0:2, 1:3]) # [[2 3] [5 6]] — submatrix

# Matrix operations
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print(A + B)       # element-wise addition
print(A * B)       # element-wise multiplication (NOT matrix multiply!)
print(A @ B)       # matrix multiplication (or np.dot(A, B))
print(A.T)         # transpose` },
      { type: 'callout', id: 'sd1-operations', calloutType: 'warn', title: 'A * B = Element-wise, A @ B = Matrix Multiply', content: 'This is the #1 NumPy confusion point:\n- `A * B` — multiplies elements at the same position (Hadamard product).\n- `A @ B` or `np.dot(A, B)` — real matrix multiplication (rows × columns).\n\n```python\nA = [[1,2],[3,4]]; B = [[5,6],[7,8]]\nA * B  = [[5, 12], [21, 32]]    # element-wise\nA @ B  = [[19, 22], [43, 50]]   # matrix multiply\n```\nSDE exam will test this distinction.' },
      { type: 'heading', id: 'sd1-stats', level: 2, content: 'Statistical Functions — The Reason You Need NumPy' },
      { type: 'code', id: 'sd1-stats-code', lang: 'python', title: 'Essential Statistical Functions', code: `data = np.array([12, 15, 18, 22, 25, 28, 30, 35, 40, 100])
# The 100 is an outlier — watch how it affects each measure

print(f"Mean:   {np.mean(data):.1f}")     # 32.5 — pulled up by outlier
print(f"Median: {np.median(data):.1f}")  # 26.5 — robust to outlier
print(f"Std:    {np.std(data):.1f}")      # 25.3 — large spread due to outlier
print(f"Var:    {np.var(data):.1f}")      # 640.4 — variance = std²
print(f"Min:    {np.min(data)}")          # 12
print(f"Max:    {np.max(data)}")          # 100
print(f"Sum:    {np.sum(data)}")          # 325
print(f"Percentile 25: {np.percentile(data, 25)}")  # 20.0
print(f"Percentile 75: {np.percentile(data, 75)}")  # 32.5

# Axis parameter: 0=columns, 1=rows (for 2D arrays)
mat = np.array([[1, 2, 3], [4, 5, 6]])
print(np.mean(mat, axis=0))  # [2.5 3.5 4.5] — mean of each column
print(np.mean(mat, axis=1))  # [2. 5.] — mean of each row` },
      { type: 'heading', id: 'sd1-dist', level: 2, content: 'Random Distributions for Statistics' },
      { type: 'code', id: 'sd1-dist-code', lang: 'python', title: 'Generating Distributions', code: `import numpy as np

# Uniform: every value equally likely
uniform = np.random.uniform(low=0, high=100, size=1000)

# Normal (Gaussian): bell curve
normal = np.random.normal(loc=50, scale=10, size=1000)
# loc=mean, scale=std deviation

# Binomial: n trials, p probability each
binomial = np.random.binomial(n=10, p=0.5, size=1000)

# Poisson: events per interval
poisson = np.random.poisson(lam=5, size=1000)

# Set seed for reproducibility (CRUCIAL for exams!)
np.random.seed(42)
print(np.random.rand(3))  # always [0.374, 0.951, 0.732]` },
      // Doubt
      { type: 'callout', id: 'sd1-d1', calloutType: 'doubt', title: 'When should I use mean vs median?', content: '**Mean** (average): Use when data is **normally distributed** and has no extreme outliers. Sensitive to outliers — one huge value pulls the mean up.\n**Median** (middle value): Use when data is **skewed** or has outliers. Robust — extreme values do not affect it much.\n\nExam example: Salaries [30K, 35K, 40K, 45K, 500K]. Mean = 130K (misleading!). Median = 40K (accurate representation).\n**Rule of thumb**: If mean and median are far apart, your data has outliers or skew. Use median.' },
      { type: 'callout', id: 'sd1-d2', calloutType: 'doubt', title: 'np.random.seed() — why do we need it?', content: '`np.random.seed(42)` makes random numbers **predictable and reproducible**. Without a seed, every run gives different numbers — impossible to debug or grade.\n\n**Exam importance**: If your SDE exam asks you to generate random data, they will expect consistent results. Always set a seed. In interviews, this shows you understand reproducible research.\n\nThe number 42 is arbitrary (any integer works) — it is a programming culture reference to "The Hitchhiker\'s Guide to the Galaxy."' },
      // Exam
      { type: 'callout', id: 'sd1-exam', calloutType: 'exam', title: 'Exam Alert — ST-1 Focus', content: '1. **NumPy array vs Python list** — why is NumPy faster? (contiguous memory + C implementation).\n2. **Statistical functions**: mean, median, std, var, percentile — know which are robust to outliers.\n3. **Random distributions**: uniform, normal, binomial — know the parameters.\n4. **seed() for reproducibility** — guaranteed 1-mark MCQ.\n5. **Coding (5 marks)**: Create an array, compute statistics, generate distributions.' },
      // Bridge
      { type: 'callout', id: 'sd1-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'NumPy arrays are the underlying data structure of **Pandas DataFrames (Day 2-3)**. The statistical functions you learned today (mean, std, percentiles) will be used in **hypothesis testing (Day 4)**. Random distributions are the foundation of **Monte Carlo simulations** and ML model initialization.' },
      // Quick Ref
      { type: 'table', id: 'sd1-qref', headers: ['Concept', 'Syntax', 'Notes'], rows: [['Array from list', 'np.array([1,2,3])', 'All elements must be same type'], ['Zeros/Ones', 'np.zeros(5) / np.ones(5)', 'Returns float64 by default'], ['arange', 'np.arange(0,10,2)', 'start,stop,step — like range()'], ['linspace', 'np.linspace(0,1,5)', 'start,stop,count — evenly spaced'], ['Random ints', 'np.random.randint(0,10,5)', 'low, high, size'], ['Mean/Median', 'np.mean(arr) / np.median(arr)', 'Median is robust to outliers'], ['Std/Var', 'np.std(arr) / np.var(arr)', 'Variance = std²'], ['Matrix multiply', 'A @ B or np.dot(A,B)', 'NOT A * B!']] },
      // Quiz
      { type: 'quiz', id: 'sd1-quiz', title: 'Day 1 Quiz', questions: [
        { id: 'sd1-q1', question: 'Why is NumPy faster than Python lists for numerical operations?', options: ['It uses GPUs', 'Contiguous memory + compiled C code — vectorized operations', 'It is written in Java', 'Lists are interpreted differently'], correctIndex: 1, explanation: 'NumPy arrays are contiguous blocks of memory with a fixed type. Operations are vectorized and run in compiled C, not interpreted Python. No Python-level loops = massive speedup.' },
        { id: 'sd1-q2', question: 'What does A * B do for two NumPy arrays?', options: ['Matrix multiplication', 'Element-wise multiplication', 'Cross product', 'Nothing — it is a syntax error'], correctIndex: 1, explanation: 'A * B does element-wise (Hadamard) multiplication. For matrix multiplication, use A @ B or np.dot(A, B).' },
        { id: 'sd1-q3', question: 'Which measure of central tendency is robust to outliers?', options: ['Mean', 'Median', 'Standard deviation', 'Variance'], correctIndex: 1, explanation: 'Median is robust — extreme values do not change it. Mean is sensitive to outliers and can be misleading for skewed data.' },
        { id: 'sd1-q4', question: 'What does np.random.seed(42) do?', options: ['Generates 42 random numbers', 'Sets a starting point for reproducible random numbers', 'Limits randomness to 42 values', 'Deletes previous random state'], correctIndex: 1, explanation: 'seed() initializes the pseudo-random number generator. Same seed = same sequence of "random" numbers. Essential for reproducible research and exam answers.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'sd1-cards', title: 'Day 1 Flashcards', cards: [
        { id: 'sd1-f1', front: '5 ways to create a NumPy array?', back: 'np.array([...]), np.zeros(n), np.ones(n), np.arange(start,stop,step), np.linspace(start,stop,count), np.random.rand(n), np.random.randint(low,high,size).', hint: 'From lists, pre-filled, sequences, random...' },
        { id: 'sd1-f2', front: 'Mean vs Median — when to use which?', back: 'Mean: normal data, no outliers. Median: skewed data, has outliers. Rule of thumb: if mean and median differ significantly → outliers present → use median.', hint: 'One is pulled by extremes...' },
        { id: 'sd1-f3', front: 'A * B vs A @ B — difference?', back: 'A * B = element-wise multiplication (same position). A @ B = matrix multiplication (rows × columns). np.dot(A,B) is same as A @ B.', hint: 'Star vs at sign...' },
        { id: 'sd1-f4', front: 'Why set np.random.seed()?', back: 'Makes random number generation REPRODUCIBLE. Same seed = same sequence every run. Essential for debugging, grading, and research. Use any integer (42 is a programmer joke).', hint: 'Reproducibility...' },
      ] },
      { type: 'practice', id: 'sd1-p1', lang: 'python', title: 'Practice: Stats Calculator', starter: `import numpy as np
np.random.seed(42)

# Create an array of 50 random integers between 1 and 100
data = np.random.randint(1, 101, 50)
print("Data:", data)

# TODO: Calculate and print:
# - Mean, median, standard deviation, variance
# - Minimum, maximum, sum
# - 25th and 75th percentiles
# - How many values are above the mean?`, hint: 'Use np.mean(), np.median(), np.std(), np.var(). For above mean: data[data > np.mean(data)].size or np.sum(data > np.mean(data)).' },
      { type: 'practice', id: 'sd1-p2', lang: 'python', title: 'Practice: Distribution Generator', starter: `import numpy as np
np.random.seed(42)

# TODO: Generate 1000 samples from:
# 1. Uniform distribution (0 to 100)
# 2. Normal distribution (mean=50, std=10)
# 3. Binomial distribution (n=10, p=0.5)

# For each, print: mean, std, min, max
# Compare: are the sample statistics close to the distribution parameters?`, hint: 'np.random.uniform(0, 100, 1000), np.random.normal(50, 10, 1000), np.random.binomial(10, 0.5, 1000). Sample stats converge to population parameters as n increases.' },
    ],
    tasks: [
      { id: 'sde-8-d1-t1', text: 'Create a NumPy array of 100 random integers. Calculate mean, median, std, var, min, max, percentiles.', tag: 'lab' },
      { id: 'sde-8-d1-t2', text: 'Demonstrate element-wise vs matrix multiplication with two 2×2 arrays. Print both results.', tag: 'lab' },
      { id: 'sde-8-d1-t3', text: 'Generate normal, uniform, and binomial distributions. Set seed. Compare sample stats to population parameters.', tag: 'drill' },
      { id: 'sde-8-d1-t4', text: 'Why is median preferred over mean for skewed data? Give a real-world example.', tag: 'mcq' },
    ],
  },

  // DAY 2: Pandas Data Wrangling
  {
    id: 'sde-8-d2', number: 2,
    title: 'Pandas Data Wrangling (Kaggle Mapping)', duration: 60,
    topics: ['DataFrames', 'Indexing', 'Selection', 'Missing Values', 'Data Type Conversions'],
    alignment: ['Kaggle Datasets'],
    blocks: [
      { type: 'callout', id: 'sd2-intro', calloutType: 'info', title: 'Pandas — The Data Wrangler\'s Swiss Army Knife', content: 'Pandas is built on top of NumPy and gives you **DataFrames** — labeled, 2D tables with row and column names. It is the most-used Python library for data cleaning, transformation, and exploration. Today you will load data, select columns, filter rows, and handle missing values.' },
      { type: 'heading', id: 'sd2-df', level: 2, content: 'Series and DataFrame — The Two Core Objects' },
      { type: 'code', id: 'sd2-basics', lang: 'python', title: 'Creating DataFrames', code: `import pandas as pd
import numpy as np

# Series: 1D labeled array (like a column)
s = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])
print(s['b'])  # 20

# DataFrame: 2D table (the main object you will use)
df = pd.DataFrame({
    'name': ['Vinayak', 'Riya', 'Amit', 'Neha'],
    'age': [21, 20, 22, 21],
    'gpa': [8.5, 9.2, 7.8, 9.5],
    'branch': ['AIML', 'CSE', 'AIML', 'ECE']
})

# From CSV (most common in real work)
# df = pd.read_csv('data.csv')

# From Excel
# df = pd.read_excel('data.xlsx')

# Quick exploration
print(df.head())       # first 5 rows
print(df.info())       # column types, non-null counts
print(df.describe())   # stats for numeric columns
print(df.shape)        # (4, 4) — rows, columns
print(df.columns)      # column names` },
      { type: 'heading', id: 'sd2-select', level: 2, content: 'Selecting and Filtering Data' },
      { type: 'code', id: 'sd2-select-code', lang: 'python', title: 'Selection Methods', code: `# Select a single column → returns Series
print(df['name'])
print(df.name)  # dot notation (only works for simple names)

# Select multiple columns → returns DataFrame
print(df[['name', 'gpa']])

# Filter rows with boolean condition
high_gpa = df[df['gpa'] > 8.5]
aiml_students = df[df['branch'] == 'AIML']

# Multiple conditions: use & (AND), | (OR), ~ (NOT)
# MUST wrap each condition in parentheses!
smart_aiml = df[(df['branch'] == 'AIML') & (df['gpa'] > 8.0)]

# .loc: select by LABEL (index/column names)
print(df.loc[0, 'name'])           # single value: 'Vinayak'
print(df.loc[0:2, ['name','gpa']]) # rows 0-2, name+gpa columns

# .iloc: select by INTEGER POSITION
print(df.iloc[0, 0])               # first row, first col
print(df.iloc[0:2, 1:3])           # first 2 rows, cols 1-2` },
      { type: 'callout', id: 'sd2-loc', calloutType: 'warn', title: '.loc vs .iloc — Do NOT Mix These Up', content: '`.loc[row_label, col_label]` — uses the **index labels** (names). Includes the end index.\n`.iloc[row_pos, col_pos]` — uses **integer positions** (0-based). Excludes the end index (like Python slicing).\n\n```python\ndf.loc[0:2]   # returns rows with labels 0, 1, 2 (INCLUSIVE end)\ndf.iloc[0:2]  # returns rows at positions 0, 1 (EXCLUSIVE end)\n```\nThis is the #1 Pandas confusion point. SDE exam will have an MCQ on this.' },
      { type: 'heading', id: 'sd2-missing', level: 2, content: 'Handling Missing Values — The Real-World Reality' },
      { type: 'paragraph', id: 'sd2-missing-p', content: 'Real data is **never** clean. Missing values are everywhere. Pandas provides methods to detect, remove, or fill them. This is the single most important data cleaning skill for ST-1.' },
      { type: 'code', id: 'sd2-missing-code', lang: 'python', title: 'Missing Value Handling', code: `import pandas as pd
import numpy as np

# Create data with missing values
df = pd.DataFrame({
    'name': ['Vinayak', 'Riya', np.nan, 'Neha'],
    'age': [21, np.nan, 22, 21],
    'gpa': [8.5, 9.2, np.nan, 9.5]
})
# np.nan (or None) represents missing data

# Detect missing values
print(df.isnull())         # True/False for each cell
print(df.isnull().sum())   # count missing per column

# Option 1: Drop rows with ANY missing value
df_clean = df.dropna()

# Option 2: Drop rows only if ALL values are missing
df.dropna(how='all')

# Option 3: Fill missing values
df['age'].fillna(df['age'].mean(), inplace=True)  # fill with mean
df['name'].fillna('Unknown', inplace=True)         # fill with constant
df['gpa'].fillna(method='ffill', inplace=True)     # forward fill

# Option 4: Drop columns with too many missing values
df.dropna(axis=1, thresh=3)  # keep columns with >= 3 non-null values

# Data type conversion
df['age'] = df['age'].astype(int)     # convert to integer
df['gpa'] = pd.to_numeric(df['gpa'], errors='coerce')  # safe conversion` },
      { type: 'callout', id: 'sd2-fill', calloutType: 'tip', title: 'When to Drop vs Fill Missing Values', content: '**Drop (dropna)**: When missing values are few (<5%) and random. Safe to delete.\n**Fill (fillna)**: When missing values are many or systematic. Use mean/median for numbers, mode for categories, or "Unknown" for text.\n**Never blindly drop**: If 30% of rows are missing in a column of 100K rows, that is 30K rows of valid data in other columns you are throwing away.\n\nAlso: always ask **why** data is missing. Is it random? Or does it mean something? (e.g., missing salary = unemployed).' },
      // Doubt
      { type: 'callout', id: 'sd2-d1', calloutType: 'doubt', title: 'When should I use .loc vs .iloc vs basic []?', content: "**Basic []** (df['col'] or df[['c1','c2']]): For column selection. Simplest. Use for quick selection.\n**.loc[label, col]**: When you need row AND column selection by label. More explicit, safer.\n**.iloc[pos, col]**: When you need row AND column selection by position. Use for numeric iteration.\n\nPrefer .loc/.iloc for clarity when selecting both rows and columns." },
      // Exam
      { type: 'callout', id: 'sd2-exam', calloutType: 'exam', title: 'Exam Alert — ST-1 Coding Focus', content: '1. **.loc vs .iloc**: inclusive end (.loc) vs exclusive end (.iloc) — guaranteed MCQ.\n2. **Boolean filtering with & and |**: parentheses around EACH condition are MANDATORY.\n3. **Missing value handling**: isnull(), dropna(), fillna() — 5-mark coding question.\n4. **Data type conversion**: astype(), pd.to_numeric() with errors=\'coerce\'.' },
      // Bridge
      { type: 'callout', id: 'sd2-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'DataFrames you load today will be grouped and aggregated tomorrow (Day 3). Missing value handling is the first step in any **ETL pipeline (Day 7)**. The boolean filtering logic here is the same pattern used in **SQL WHERE clauses (DBMS course)**.' },
      // Quick Ref
      { type: 'table', id: 'sd2-qref', headers: ['Operation', 'Syntax', 'Notes'], rows: [['Read CSV', 'pd.read_csv(\'file.csv\')', 'Most common data source'], ['Head/Tail', 'df.head(n) / df.tail(n)', 'Default n=5'], ['Info', 'df.info()', 'Types + non-null counts'], ['Describe', 'df.describe()', 'Stats for numeric columns'], ['Select cols', 'df[[\'c1\',\'c2\']]', 'Double brackets for multiple'], ['Filter rows', 'df[df[\'col\'] > val]', 'Boolean mask'], ['AND/OR', '(cond1) & (cond2) | (cond3)', 'Parentheses REQUIRED'], ['.loc', 'df.loc[row, col]', 'By LABEL, inclusive end'], ['.iloc', 'df.iloc[row, col]', 'By POSITION, exclusive end'], ['Missing', 'df.isnull().sum()', 'Count missing per column'], ['Drop NA', 'df.dropna()', 'Remove rows with any NA'], ['Fill NA', 'df.fillna(value)', 'Replace NA with value']] },
      // Quiz
      { type: 'quiz', id: 'sd2-quiz', title: 'Day 2 Quiz', questions: [
        { id: 'sd2-q1', question: 'What is the difference between df.loc[0:2] and df.iloc[0:2]?', options: ['No difference', '.loc is inclusive of end index, .iloc is exclusive', '.iloc is inclusive, .loc is exclusive', '.loc works only on columns'], correctIndex: 1, explanation: '.loc uses labels and includes the end index. .iloc uses integer positions and excludes the end index (like standard Python slicing).' },
        { id: 'sd2-q2', question: 'Why are parentheses required in (df[\'a\'] > 5) & (df[\'b\'] < 10)?', options: ['Without them, Python evaluates & before >', 'Without them, Python evaluates > before &', 'They are not required — it is a style convention', 'Parentheses make it faster'], correctIndex: 1, explanation: 'Without parentheses, the comparison operators bind tighter than &. The expression is parsed incorrectly. Always wrap conditions in parentheses when using & or |.' },
        { id: 'sd2-q3', question: 'How do you handle missing values in a numeric column?', options: ['Always delete the rows', 'Fill with mean, median, or 0 depending on context', 'Ignore them — Pandas handles auto', 'Replace with the string "missing"'], correctIndex: 1, explanation: 'Filling with mean/median is standard for numeric columns. Mean works for normal data, median for skewed data. Always consider WHY values are missing before deciding.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'sd2-cards', title: 'Day 2 Flashcards', cards: [
        { id: 'sd2-f1', front: '.loc vs .iloc?', back: '.loc[row_label, col_label] = by label/name, END INCLUSIVE. .iloc[row_pos, col_pos] = by position (0-indexed), END EXCLUSIVE. .loc[\'a\':\'c\'] includes c. .iloc[0:3] excludes index 3.', hint: 'Label vs position, inclusion difference...' },
        { id: 'sd2-f2', front: 'How to filter rows with multiple conditions?', back: 'df[(cond1) & (cond2)] for AND. df[(cond1) | (cond2)] for OR. df[~(cond1)] for NOT. Each condition MUST be in parentheses. Use & not \'and\', | not \'or\'.', hint: 'Parentheses + & symbol...' },
        { id: 'sd2-f3', front: 'Missing value handling methods?', back: 'df.isnull().sum() — count missing. df.dropna() — remove rows. df.fillna(value) — replace with value. df.fillna(df.mean()) — fill with column mean. dropna(thresh=n) — keep rows with n+ non-null.', hint: 'Detect, drop, or fill...' },
      ] },
      { type: 'practice', id: 'sd2-p1', lang: 'python', title: 'Practice: Clean a Messy Dataset', starter: `import pandas as pd
import numpy as np

# Simulate messy student data
df = pd.DataFrame({
    'name': ['Vinayak', 'Riya', np.nan, 'Neha', 'Amit'],
    'age': [21, np.nan, 22, 21, np.nan],
    'gpa': [8.5, 9.2, np.nan, 9.5, 7.8],
    'branch': ['AIML', 'CSE', 'AIML', 'ECE', 'AIML']
})

# TODO:
# 1. Show count of missing values per column
# 2. Fill missing age with median age
# 3. Fill missing name with 'Unknown'
# 4. Fill missing gpa with mean gpa of their branch
# 5. Filter to show only AIML students with gpa > 8.0`, hint: '1. df.isnull().sum(). 2. df[\'age\'].fillna(df[\'age\'].median()). 3. Fill with string. 4. Use groupby + transform. 5. df[(df.branch==\'AIML\') & (df.gpa>8.0)].' },
      { type: 'practice', id: 'sd2-p2', lang: 'python', title: 'Practice: Kaggle-Style Data Exploration', starter: `import pandas as pd
import numpy as np

# Create a sales dataset
df = pd.DataFrame({
    'date': pd.date_range('2026-01-01', periods=10, freq='D'),
    'product': ['A','B','A','C','B','A','C','B','A','C'],
    'quantity': [10, 5, 8, 12, 7, 15, 9, 6, 11, 13],
    'price': [100, 200, 100, 150, 200, 100, 150, 200, 100, 150]
})

# TODO:
# 1. Add a 'revenue' column = quantity * price
# 2. Show only rows where revenue > 1000
# 3. Select only product and revenue columns for those rows
# 4. Find the date with the highest revenue`, hint: '1. df[\'revenue\'] = df[\'quantity\'] * df[\'price\']. 2. df[df[\'revenue\'] > 1000]. 3. .loc with column list. 4. df.loc[df[\'revenue\'].idxmax(), \'date\'].' },
    ],
    tasks: [
      { id: 'sde-8-d2-t1', text: 'Load/create a DataFrame. Use .loc and .iloc to select rows and columns. Demonstrate the inclusive/exclusive difference.', tag: 'lab' },
      { id: 'sde-8-d2-t2', text: 'Create a DataFrame with missing values. Use isnull(), dropna(), and fillna() with different strategies.', tag: 'lab' },
      { id: 'sde-8-d2-t3', text: 'Filter a DataFrame with multiple conditions using & and |. Show the parentheses requirement.', tag: 'drill' },
    ],
  },

  // DAY 3: Advanced Pandas — Grouping, Pivoting, Merging
  {
    id: 'sde-8-d3', number: 3,
    title: 'Advanced Data Transformation with Pandas', duration: 60,
    topics: ['Grouping', 'Pivoting', 'Merging', 'Aggregations'],
    alignment: ['Kaggle Datasets'],
    blocks: [
      { type: 'callout', id: 'sd3-intro', calloutType: 'info', title: 'From Raw Data to Insights', content: 'Loading data is step 1. **Transforming** it into summaries, cross-tabulations, and joined datasets is step 2 — and where real analysis happens. Today: groupby (split-apply-combine), pivot tables (cross-tabulations), and merge (SQL JOINs in Python).' },
      { type: 'heading', id: 'sd3-groupby', level: 2, content: 'groupby — Split, Apply, Combine' },
      { type: 'code', id: 'sd3-groupby-code', lang: 'python', title: 'GroupBy Operations', code: `import pandas as pd

df = pd.DataFrame({
    'branch': ['AIML', 'CSE', 'AIML', 'ECE', 'AIML', 'CSE'],
    'student': ['V', 'R', 'A', 'N', 'K', 'S'],
    'score': [85, 92, 78, 95, 88, 80],
    'hours': [20, 25, 15, 30, 22, 18]
})

# Single aggregation
print(df.groupby('branch')['score'].mean())
# AIML: 83.67, CSE: 86.0, ECE: 95.0

# Multiple aggregations (agg dictionary or list)
stats = df.groupby('branch').agg({
    'score': ['mean', 'min', 'max', 'count'],
    'hours': 'sum'
})

# Named aggregations (cleaner output)
result = df.groupby('branch').agg(
    avg_score=('score', 'mean'),
    max_score=('score', 'max'),
    total_hours=('hours', 'sum'),
    student_count=('student', 'count')
)

# Group by multiple columns
df.groupby(['branch', 'student'])['score'].mean()

# Transform: apply function per group, keep original shape
df['score_vs_branch_mean'] = df.groupby('branch')['score'].transform('mean')
# subtract branch mean from each student's score` },
      { type: 'heading', id: 'sd3-pivot', level: 2, content: 'Pivot Tables — Cross-Tabulations' },
      { type: 'code', id: 'sd3-pivot-code', lang: 'python', title: 'Pivot Table Examples', code: `# Create data with categories
df = pd.DataFrame({
    'dept': ['CSE', 'CSE', 'ECE', 'ECE', 'CSE', 'ECE'],
    'year': [1, 2, 1, 2, 1, 2],
    'students': [120, 110, 90, 85, 115, 88]
})

# pivot_table: like Excel pivot tables
pivot = pd.pivot_table(
    df,
    values='students',     # what to aggregate
    index='dept',          # rows
    columns='year',        # columns
    aggfunc='sum',         # how to aggregate (default: mean)
    fill_value=0           # fill missing combos with 0
)
# Result:
# year    1    2
# dept
# CSE   235  110
# ECE    90  173

# pivot: reshape (no aggregation — just reorganize)
df2 = pd.DataFrame({
    'date': ['2026-01', '2026-01', '2026-02', '2026-02'],
    'city': ['Mumbai', 'Delhi', 'Mumbai', 'Delhi'],
    'temp': [30, 25, 32, 27]
})
pivoted = df2.pivot(index='date', columns='city', values='temp')
# city    Delhi  Mumbai
# date
# 2026-01   25      30
# 2026-02   27      32` },
      { type: 'heading', id: 'sd3-merge', level: 2, content: 'Merging DataFrames — SQL JOINs in Pandas' },
      { type: 'code', id: 'sd3-merge-code', lang: 'python', title: 'Merge (JOIN) Operations', code: `# Two related DataFrames
students = pd.DataFrame({
    'id': [1, 2, 3, 4],
    'name': ['Vinayak', 'Riya', 'Amit', 'Neha']
})

scores = pd.DataFrame({
    'student_id': [1, 1, 2, 3, 5],
    'subject': ['Java', 'DBMS', 'Java', 'SDE', 'DBMS'],
    'marks': [85, 90, 92, 78, 88]
})

# Inner join: only matching rows in both
inner = students.merge(scores, left_on='id', right_on='student_id')
# student 5 dropped (no matching student), student 4 dropped (no scores)

# Left join: all rows from left, matching from right
left = students.merge(scores, left_on='id', right_on='student_id', how='left')
# student 4 kept (marks = NaN), student 5 dropped

# Outer join: all rows from both
outer = students.merge(scores, left_on='id', right_on='student_id', how='outer')
# all 5 student_ids appear

# Concatenation: stack DataFrames vertically or horizontally
df1 = pd.DataFrame({'A': [1,2], 'B': [3,4]})
df2 = pd.DataFrame({'A': [5,6], 'B': [7,8]})
stacked = pd.concat([df1, df2], axis=0)  # vertical stack (rows)
side = pd.concat([df1, df2], axis=1)      # horizontal (columns)` },
      { type: 'callout', id: 'sd3-merge-types', calloutType: 'tip', title: 'Merge Types — Visual Guide', content: '**Inner**: Only records that exist in BOTH tables. (Intersection)\n**Left**: ALL records from left table + matching from right. Right-side columns get NaN for unmatched.\n**Right**: ALL records from right table + matching from left.\n**Outer**: ALL records from both tables. NaN where no match exists.\n\nMnemonic: Inner = common. Left = keep left. Outer = keep everything.\nThis directly maps to SQL JOINs (INNER, LEFT, RIGHT, FULL OUTER).' },
      // Doubt
      { type: 'callout', id: 'sd3-d1', calloutType: 'doubt', title: 'pivot vs pivot_table — when to use which?', content: '**pivot**: Reshapes data WITHOUT aggregation. Use when each (index, column) combination has exactly ONE value. Fails with duplicates.\n**pivot_table**: Reshapes WITH aggregation. Use when (index, column) combinations may have MULTIPLE values — you specify how to combine them (mean, sum, count).\n\n```python\n# pivot fails if there are duplicate (date, city) pairs\ndf.pivot(index=\'date\', columns=\'city\', values=\'temp\')  # error if duplicates!\n\n# pivot_table handles duplicates by aggregating\ndf.pivot_table(index=\'date\', columns=\'city\', values=\'temp\', aggfunc=\'mean\')\n```\nWhen in doubt, use pivot_table — it is more forgiving.' },
      // Exam
      { type: 'callout', id: 'sd3-exam', calloutType: 'exam', title: 'Exam Alert', content: '1. **groupby + agg**: The most common 5-mark coding question. Know how to do multi-column aggregations.\n2. **merge types**: inner/left/right/outer — maps to SQL JOINs. MCQ favorite.\n3. **pivot vs pivot_table**: Difference is aggregation — pivot fails on duplicates.\n4. **transform vs agg**: transform keeps original shape, agg reduces to group level.' },
      // Bridge
      { type: 'callout', id: 'sd3-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Pandas groupby is the Python equivalent of **SQL GROUP BY (DBMS Day 6)**. merge() is Pandas JOIN. These patterns are the foundation of **ETL transformation logic (Day 7)** — you will group, pivot, and join in production pipelines.' },
      // Quick Ref
      { type: 'table', id: 'sd3-qref', headers: ['Operation', 'Syntax', 'SQL Equivalent'], rows: [['Group + aggregate', 'df.groupby(\'col\').mean()', 'GROUP BY with AVG()'], ['Multi-agg', 'df.groupby(\'col\').agg({\'a\':\'mean\',\'b\':\'sum\'})', 'Multiple aggregate functions'], ['Inner join', 'pd.merge(A,B,on=\'key\')', 'INNER JOIN'], ['Left join', 'pd.merge(A,B,on=\'key\',how=\'left\')', 'LEFT JOIN'], ['Pivot table', 'pd.pivot_table(df,index,columns,values)', 'Cross-tabulation'], ['Concatenate', 'pd.concat([df1,df2])', 'UNION ALL']] },
      // Quiz
      { type: 'quiz', id: 'sd3-quiz', title: 'Day 3 Quiz', questions: [
        { id: 'sd3-q1', question: 'What is the difference between .agg() and .transform() in groupby?', options: ['No difference', '.agg reduces groups to one row each, .transform keeps original shape', '.transform is faster', '.agg works only on numbers'], correctIndex: 1, explanation: '.agg() reduces each group to a single summary row. .transform() applies a function per group but returns a result with the SAME shape as the original — useful for creating per-group relative values.' },
        { id: 'sd3-q2', question: 'What happens if you use pivot() on data with duplicate index-column combinations?', options: ['It averages duplicates', 'It raises a ValueError', 'It takes the last value', 'It works normally'], correctIndex: 1, explanation: 'pivot() requires unique (index, column) combinations. Duplicates cause a ValueError. Use pivot_table() instead — it can aggregate duplicates.' },
        { id: 'sd3-q3', question: 'Which merge type keeps ALL rows from the left DataFrame and matching rows from the right?', options: ['Inner', 'Outer', 'Left (how=\'left\')', 'Right (how=\'right\')'], correctIndex: 2, explanation: 'Left merge keeps every row from the left DataFrame. Rows without matches in the right DataFrame get NaN values for right-side columns.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'sd3-cards', title: 'Day 3 Flashcards', cards: [
        { id: 'sd3-f1', front: 'groupby — split-apply-combine pattern?', back: 'SPLIT: group data by a column. APPLY: run a function per group (mean, sum, custom). COMBINE: merge results into a DataFrame. df.groupby(\'col\').agg({...}) or .transform().', hint: 'Three-step process...' },
        { id: 'sd3-f2', front: 'pivot vs pivot_table?', back: 'pivot: reshape WITHOUT aggregation. Fails on duplicate (index,column) pairs. pivot_table: reshape WITH aggregation. Handles duplicates by averaging/summing/counting. Use pivot_table when unsure.', hint: 'With or without aggregation...' },
        { id: 'sd3-f3', front: '4 merge types?', back: 'inner (intersection), left (all from left), right (all from right), outer (all from both). Matches SQL: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN. pd.merge(A, B, on=\'key\', how=\'left\').', hint: 'Inner, left, right, outer...' },
      ] },
      { type: 'practice', id: 'sd3-p1', lang: 'python', title: 'Practice: Sales Analytics', starter: `import pandas as pd

df = pd.DataFrame({
    'region': ['North','North','South','South','East','East','North'],
    'product': ['A','B','A','A','B','A','B'],
    'sales': [100, 200, 150, 120, 180, 160, 220],
    'units': [10, 15, 12, 10, 14, 13, 16]
})

# TODO:
# 1. Total sales and average units per region (groupby + agg)
# 2. Pivot table: avg sales per product per region
# 3. Which region-product combo has the highest average sales?`, hint: '1. df.groupby(\'region\').agg(total_sales=(\'sales\',\'sum\'), avg_units=(\'units\',\'mean\')). 2. pd.pivot_table(df, values=\'sales\', index=\'region\', columns=\'product\', aggfunc=\'mean\'). 3. .idxmax().' },
      { type: 'practice', id: 'sd3-p2', lang: 'python', title: 'Practice: Merge Student Data', starter: `import pandas as pd

students = pd.DataFrame({'id':[1,2,3,4], 'name':['V','R','A','N']})
scores = pd.DataFrame({
    'sid':[1,1,2,3,3,5],
    'sub':['Java','DBMS','Java','Java','SDE','DBMS'],
    'marks':[85,90,92,78,88,82]
})

# TODO:
# 1. Inner merge: only students with scores
# 2. Left merge: all students (NaN for no scores)
# 3. Calculate average marks per student
# 4. Which student is missing from the merge? Why?`, hint: '1. students.merge(scores, left_on=\'id\', right_on=\'sid\'). 2. Add how=\'left\'. 3. Groupby after merge. 4. Student id=4 has no scores — appears in left merge with NaN.' },
    ],
    tasks: [
      { id: 'sde-8-d3-t1', text: 'Group a DataFrame by category and compute mean, sum, min, max, and count for multiple columns.', tag: 'lab' },
      { id: 'sde-8-d3-t2', text: 'Create a pivot table. Demonstrate the difference between pivot and pivot_table with duplicate data.', tag: 'drill' },
      { id: 'sde-8-d3-t3', text: 'Perform inner, left, right, and outer merges. Explain which rows are kept/dropped in each.', tag: 'lab' },
    ],
  },

  // DAY 4: Descriptive & Inferential Statistics
  {
    id: 'sde-8-d4', number: 4,
    title: 'Descriptive and Inferential Statistics Review', duration: 60,
    topics: ['Probability Distributions', 'Hypothesis Testing', 'p-values', 'Confidence Intervals'],
    blocks: [
      { type: 'callout', id: 'sd4-intro', calloutType: 'info', title: 'From Description to Inference', content: '**Descriptive statistics** summarize data (mean, median, std). **Inferential statistics** draw conclusions about populations from samples. Today: probability distributions, hypothesis testing, and p-values. This is the theory that underpins every ML model evaluation.' },
      { type: 'heading', id: 'sd4-desc', level: 2, content: 'Descriptive vs Inferential — The Core Distinction' },
      { type: 'table', id: 'sd4-desc-inf', headers: ['Aspect', 'Descriptive Statistics', 'Inferential Statistics'], rows: [['Purpose', 'SUMMARIZE the data you have', 'INFER about a population from a sample'], ['Questions', 'What is the average? How spread out?', 'Is the difference real? Does treatment work?'], ['Tools', 'Mean, median, std, percentiles, histograms', 'Hypothesis tests, confidence intervals, p-values'], ['Example', 'Avg GPA of this class = 8.2', 'This class\'s GPA is significantly higher than all classes (p<0.05)']] },
      { type: 'heading', id: 'sd4-dist', level: 2, content: 'Probability Distributions — The Shapes of Data' },
      { type: 'code', id: 'sd4-dist-code', lang: 'python', title: 'Key Distributions Visualized', code: `import numpy as np
import pandas as pd
np.random.seed(42)

# Normal (Gaussian): bell curve — most natural phenomena
normal = np.random.normal(loc=50, scale=10, size=10000)
print(f"Normal: mean={normal.mean():.1f}, std={normal.std():.1f}")
# ~68% within 1 std, ~95% within 2 std, ~99.7% within 3 std

# Uniform: every value equally likely
uniform = np.random.uniform(0, 100, 10000)

# Binomial: count of successes in n trials
# e.g., number of heads in 10 coin flips, repeat 10000 times
binomial = np.random.binomial(n=10, p=0.5, size=10000)

# Exponential: time between events (e.g., customer arrivals)
exponential = np.random.exponential(scale=2, size=10000)

# Central Limit Theorem demonstration:
# Take means of many samples → distribution of means is NORMAL
sample_means = []
for _ in range(1000):
    sample = np.random.uniform(0, 100, 30)  # uniform, not normal!
    sample_means.append(sample.mean())
# sample_means is approximately NORMAL — that is the CLT!` },
      { type: 'callout', id: 'sd4-clt', calloutType: 'tip', title: 'Central Limit Theorem (CLT) — The Most Important Statistical Theorem', content: '**No matter what distribution your data comes from** (uniform, exponential, anything), the distribution of **sample means** approaches a **normal distribution** as sample size increases.\n\nWhy this matters: It allows us to use normal-distribution-based tests (z-test, t-test) on almost any data, as long as we have enough samples (n > 30 is the rule of thumb).\n\nThis is a guaranteed ST-1 MCQ. The answer always involves: "distribution of sample means approximates normal."' },
      { type: 'heading', id: 'sd4-hypothesis', level: 2, content: 'Hypothesis Testing — The Scientific Method in Numbers' },
      { type: 'paragraph', id: 'sd4-hypo-intro', content: 'Hypothesis testing is a formal way to decide whether an observed effect is **real** or just **random chance**. Every ML model evaluation (A/B testing, model comparison) uses hypothesis testing.' },
      { type: 'code', id: 'sd4-hypo-code', lang: 'python', title: 'Hypothesis Test Example', code: `from scipy import stats
import numpy as np

# Scenario: Is the new teaching method better?
# Old method average score: 72
# New method: teach 50 students, measure scores
np.random.seed(42)
new_scores = np.random.normal(76, 10, 50)  # avg ~76, std 10

# Step 1: State hypotheses
# H0 (null): new_mean = 72 (no improvement)
# H1 (alternative): new_mean > 72 (improvement)

# Step 2: Choose significance level (alpha)
alpha = 0.05  # 5% chance of Type I error (false positive)

# Step 3: Run the test (one-sample t-test)
t_stat, p_value = stats.ttest_1samp(new_scores, 72)

# For one-tailed: divide p by 2
p_one_tailed = p_value / 2

print(f"T-statistic: {t_stat:.3f}")
print(f"P-value (two-tailed): {p_value:.4f}")
print(f"P-value (one-tailed): {p_one_tailed:.4f}")

# Step 4: Decision
if p_one_tailed < alpha:
    print("REJECT H0: New method IS significantly better (p < 0.05)")
else:
    print("FAIL TO REJECT H0: No significant improvement")` },
      { type: 'heading', id: 'sd4-pvalue', level: 2, content: 'p-value — The Most Misunderstood Number in Science' },
      { type: 'paragraph', id: 'sd4-pvalue-def', content: 'A p-value is the **probability of observing your data (or more extreme) IF the null hypothesis were true**. It is NOT the probability that H0 is true. It is NOT the probability that your result is a fluke.' },
      { type: 'table', id: 'sd4-pvalue-table', headers: ['p-value', 'Interpretation', 'Action'], rows: [['p < 0.01', 'Strong evidence against H0', 'Reject H0 — result is statistically significant'], ['0.01 ≤ p < 0.05', 'Moderate evidence against H0', 'Reject H0 — significant at 5% level'], ['0.05 ≤ p < 0.10', 'Weak evidence against H0', 'Marginal — consider larger sample'], ['p ≥ 0.10', 'No evidence against H0', 'Fail to reject H0 — result could be random chance']] },
      { type: 'callout', id: 'sd4-errors', calloutType: 'warn', title: 'Type I vs Type II Errors', content: '**Type I Error (False Positive)**: Reject H0 when it is actually TRUE. You claim an effect exists when it does not.\n**Type II Error (False Negative)**: Fail to reject H0 when it is actually FALSE. You miss a real effect.\n\nAlpha (α) = probability of Type I error (typically 0.05).\nBeta (β) = probability of Type II error. Power = 1-β (probability of detecting a real effect).\n\nIn ML terms: Type I = false positive in classification. Type II = false negative.' },
      // Doubt
      { type: 'callout', id: 'sd4-d1', calloutType: 'doubt', title: "I got p=0.06. Is that significant? My friend says 'almost significant' is valid.", content: '**No.** "Almost significant" is a common but **incorrect** interpretation. The alpha threshold (usually 0.05) is set BEFORE the experiment. p=0.06 means you FAIL to reject H0 at the 5% level. Period.\n\nWhat you CAN say: "The result is not statistically significant at α=0.05 (p=0.06). Further research with a larger sample may be warranted."\n\nNever: "trending toward significance," "marginally significant," or "approaching significance." These phrases are red flags to examiners and journal reviewers.' },
      // Exam
      { type: 'callout', id: 'sd4-exam', calloutType: 'exam', title: 'Exam Alert — ST-1 Theory Focus', content: '1. **CLT**: Distribution of sample means → normal as n increases. Guaranteed MCQ.\n2. **p-value interpretation**: What it IS and what it is NOT. Classic Level 2 MCQ (2 marks).\n3. **Type I vs Type II errors**: Know the difference, examples, and which is α and which is β.\n4. **Null vs Alternative hypothesis**: How to state them for a given scenario.\n5. **t-test vs z-test**: t-test for small samples or unknown population std. z-test for large samples with known std.' },
      // Bridge
      { type: 'callout', id: 'sd4-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Hypothesis testing is the foundation of **A/B testing** (every tech company uses it), **ML model evaluation** (is model A significantly better than model B?), and **scientific research** (every paper you will read). The CLT is why we can use normal approximations in most ML algorithms.' },
      // Quick Ref
      { type: 'table', id: 'sd4-qref', headers: ['Concept', 'Key Point'], rows: [['CLT', 'Sample means → normal dist as n→∞. Applies to ANY population.'], ['H0 (Null)', 'Default assumption: no effect, no difference.'], ['H1 (Alternative)', 'What you want to prove: there IS an effect.'], ['p-value', 'P(data | H0 true). NOT P(H0 true).'], ['Alpha (α)', 'Significance threshold. Usually 0.05. Prob of Type I error.'], ['Type I Error', 'False positive. Reject H0 when true.'], ['Type II Error', 'False negative. Fail to reject H0 when false.'], ['t-test', 'Compare means. One-sample, two-sample, paired.']] },
      // Quiz
      { type: 'quiz', id: 'sd4-quiz', title: 'Day 4 Quiz', questions: [
        { id: 'sd4-q1', question: 'What does the Central Limit Theorem state?', options: ['All data is normally distributed', 'The distribution of sample means approaches normal as sample size increases', 'Large samples have less variance', 'The mean equals the median in large samples'], correctIndex: 1, explanation: 'CLT: regardless of the population distribution, the distribution of sample means approaches a normal distribution as sample size increases (typically n>30).' },
        { id: 'sd4-q2', question: 'If p = 0.03 and α = 0.05, what is the correct conclusion?', options: ['Accept H0 — no evidence', 'Reject H0 — result is statistically significant', 'The study is inconclusive', 'The effect size is 3%'], correctIndex: 1, explanation: 'p < α means the result is unlikely under H0. We reject H0 and conclude the result is statistically significant at the 5% level.' },
        { id: 'sd4-q3', question: 'What is a Type II error?', options: ['Rejecting a true H0', 'Failing to reject a false H0', 'Using the wrong test', 'Setting α too high'], correctIndex: 1, explanation: 'Type II error = false negative. You fail to detect a real effect because the test lacked power. Probability = β. Power = 1-β.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'sd4-cards', title: 'Day 4 Flashcards', cards: [
        { id: 'sd4-f1', front: 'What is the Central Limit Theorem?', back: 'For ANY population distribution, the distribution of SAMPLE MEANS approaches a NORMAL distribution as sample size increases (n>30). This is why we can use z-tests and t-tests on non-normal data.', hint: 'Sample means → normal...' },
        { id: 'sd4-f2', front: 'p-value: what it IS and is NOT?', back: 'IS: Probability of observing your data (or more extreme) IF H0 is true. P(data | H0). IS NOT: Probability that H0 is true. IS NOT: Probability that results are due to chance.', hint: 'Conditional probability...' },
        { id: 'sd4-f3', front: 'Type I vs Type II error?', back: 'Type I (α): false positive — reject true H0. Type II (β): false negative — fail to reject false H0. Reducing α increases β (trade-off). Power = 1-β.', hint: 'False positive vs false negative...' },
      ] },
      { type: 'practice', id: 'sd4-p1', lang: 'python', title: 'Practice: CLT Demonstration', starter: `import numpy as np
np.random.seed(42)

# Generate 1000 samples of size n from an EXPONENTIAL distribution
# (very non-normal! It is heavily skewed)
n = 30  # try changing to 5, 10, 50, 100
sample_means = []
for _ in range(1000):
    sample = np.random.exponential(scale=2, size=n)
    sample_means.append(sample.mean())

# TODO: Print mean and std of the sample means
# Compare with: population mean = 2, population std / sqrt(n)
# As n increases, sample_means should look more normal
# Try with n=5 (not normal) vs n=100 (very normal)`, hint: 'np.mean(sample_means), np.std(sample_means). Population mean of exponential(2) = 2. Standard error = 2/sqrt(n). CLT says sample_means ≈ normal(2, 2/sqrt(n)).' },
      { type: 'practice', id: 'sd4-p2', lang: 'python', title: 'Practice: Hypothesis Test', starter: `import numpy as np
from scipy import stats
np.random.seed(42)

# A company claims their lightbulbs last 1000 hours on average.
# You test 40 bulbs and get these lifetimes:
sample = np.random.normal(980, 50, 40)

# TODO:
# 1. State H0 and H1
# 2. Run a one-sample t-test against 1000
# 3. Interpret the p-value at α=0.05
# 4. Should you believe the company's claim?`, hint: 'H0: μ=1000. H1: μ<1000 (one-tailed). Use stats.ttest_1samp(sample, 1000). Divide p by 2 for one-tailed. If p/2 < 0.05, reject H0 — bulbs last less than claimed.' },
    ],
    tasks: [
      { id: 'sde-8-d4-t1', text: 'Demonstrate the CLT: take means of samples from a non-normal distribution. Show the means become normal as n increases.', tag: 'lab' },
      { id: 'sde-8-d4-t2', text: 'Run a one-sample t-test. State H0/H1, report t-statistic and p-value, draw conclusion at α=0.05.', tag: 'lab' },
      { id: 'sde-8-d4-t3', text: 'Explain Type I and Type II errors with real-world examples. Which is which in a medical test context?', tag: 'review' },
      { id: 'sde-8-d4-t4', text: 'What does a p-value of 0.03 mean? What does it NOT mean?', tag: 'mcq' },
    ],
  },
];
