import type { Day } from '../../../types';

export const sdePhase3days: Day[] = [
  // ================================================================
  // DAY 9: Matplotlib — The Visualization Workhorse
  // ================================================================
  {
    id: 'sde-8-d9', number: 9,
    title: 'Data Visualization with Matplotlib', duration: 60,
    topics: ['Line Plots', 'Bar Charts', 'Scatter Plots', 'Histograms', 'Subplots', 'Styling', 'Titles & Labels'],
    alignment: ['Matplotlib Official Tutorials', 'Python Data Science Handbook'],
    blocks: [
      { type: 'callout', id: 'sd9-intro', calloutType: 'info', title: 'A Picture Is Worth a Thousand Data Points', content: 'Numbers tell a story, but **charts SHOW the story**. Matplotlib is Python\'s foundational visualization library — every other plotting library (Seaborn, Plotly, Pandas .plot()) builds on it. Today: line plots, bar charts, scatter plots, histograms, and the styling tricks that turn raw data into compelling visuals.' },
      { type: 'heading', id: 'sd9-why', level: 2, content: 'Why Visualization Matters (Especially for Exams)' },
      { type: 'paragraph', id: 'sd9-why-p', content: 'Visualization is tested in two ways:\n1. **Code**: Write matplotlib code to generate a specific chart (5-mark coding question).\n2. **Interpretation**: Given a chart, answer questions about trends, outliers, distributions (MCQ or short answer).\n\nFor your AIML career: every data analysis project starts with visualization. You spot patterns, outliers, and relationships in charts that are invisible in tables.' },
      { type: 'heading', id: 'sd9-line', level: 2, content: 'Line Plots — The Foundation' },
      { type: 'code', id: 'sd9-line-code', lang: 'python', title: 'Line Plot Basics', code: `import matplotlib.pyplot as plt
import numpy as np

# Data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create the plot
plt.figure(figsize=(10, 6))       # width, height in inches
plt.plot(x, y, color='teal', linewidth=2, linestyle='-', label='sin(x)')
plt.title('Sine Wave', fontsize=14, fontweight='bold')
plt.xlabel('x (radians)', fontsize=12)
plt.ylabel('sin(x)', fontsize=12)
plt.grid(True, alpha=0.3)         # light grid
plt.legend(loc='upper right')
plt.tight_layout()                # prevent label clipping
plt.show()

# Multiple lines on one plot
y2 = np.cos(x)
plt.plot(x, y, label='sin(x)')
plt.plot(x, y2, '--', label='cos(x)')  # shorthand: linestyle only
plt.legend()
plt.show()` },
      { type: 'heading', id: 'sd9-bar', level: 2, content: 'Bar Charts — Comparing Categories' },
      { type: 'code', id: 'sd9-bar-code', lang: 'python', title: 'Bar Charts', code: `# Simple bar chart
branches = ['AIML', 'CSE', 'ECE', 'ME']
students = [120, 200, 90, 150]
colors = ['#2ecc71', '#3498db', '#e74c3c', '#f39c12']

plt.bar(branches, students, color=colors, edgecolor='black', linewidth=0.5)
plt.title('Students per Branch', fontweight='bold')
plt.xlabel('Branch')
plt.ylabel('Number of Students')

# Add value labels on top of bars
for i, v in enumerate(students):
    plt.text(i, v + 3, str(v), ha='center', fontweight='bold')

plt.show()

# Horizontal bar (better for long category names)
plt.barh(branches, students, color=colors)
plt.xlabel('Number of Students')
plt.title('Students per Branch')
plt.show()

# Grouped bar chart (compare across categories)
men = [80, 140, 60, 100]
women = [40, 60, 30, 50]
x = np.arange(len(branches))
width = 0.35

plt.bar(x - width/2, men, width, label='Men', color='#3498db')
plt.bar(x + width/2, women, width, label='Women', color='#e74c3c')
plt.xticks(x, branches)
plt.legend()
plt.show()` },
      { type: 'heading', id: 'sd9-scatter', level: 2, content: 'Scatter Plots — Find Relationships' },
      { type: 'code', id: 'sd9-scatter-code', lang: 'python', title: 'Scatter Plot with Trend', code: `np.random.seed(42)
hours_studied = np.random.normal(25, 8, 100)   # hours per week
marks = hours_studied * 2.5 + np.random.normal(0, 8, 100)  # marks (correlated)
marks = np.clip(marks, 0, 100)

plt.scatter(hours_studied, marks,
            c=marks,           # color by mark value
            cmap='viridis',    # color map
            s=60,              # point size
            alpha=0.7,         # transparency
            edgecolor='black',
            linewidth=0.3)

plt.colorbar(label='Marks')
plt.xlabel('Hours Studied per Week')
plt.ylabel('Exam Marks')
plt.title('Study Hours vs Exam Performance')

# Add a trend line
z = np.polyfit(hours_studied, marks, 1)
p = np.poly1d(z)
x_trend = np.linspace(5, 45, 100)
plt.plot(x_trend, p(x_trend), 'r--', linewidth=2, label='Trend')
plt.legend()
plt.show()` },
      { type: 'heading', id: 'sd9-hist', level: 2, content: 'Histograms — See the Distribution' },
      { type: 'code', id: 'sd9-hist-code', lang: 'python', title: 'Histogram', code: `np.random.seed(42)
# Generate bimodal data (two peaks)
data1 = np.random.normal(60, 10, 500)   # peak at 60
data2 = np.random.normal(80, 8, 300)    # peak at 80
scores = np.concatenate([data1, data2])

plt.hist(scores,
         bins=30,              # number of bins
         color='steelblue',
         edgecolor='white',
         alpha=0.8,
         density=False)         # True = show probability density

plt.axvline(np.mean(scores), color='red', linestyle='--',
            linewidth=2, label=f'Mean: {np.mean(scores):.1f}')
plt.axvline(np.median(scores), color='green', linestyle='-',
            linewidth=2, label=f'Median: {np.median(scores):.1f}')

plt.xlabel('Exam Score')
plt.ylabel('Number of Students')
plt.title('Exam Score Distribution (Bimodal)')
plt.legend()
plt.show()` },
      { type: 'heading', id: 'sd9-subplots', level: 2, content: 'Subplots — Multiple Charts in One Figure' },
      { type: 'code', id: 'sd9-subplots-code', lang: 'python', title: 'Dashboard Layout', code: `fig, axes = plt.subplots(2, 2, figsize=(12, 10))
# axes is a 2×2 array: axes[row, col]

# Top-left: Line plot
axes[0, 0].plot(x, np.sin(x), 'teal')
axes[0, 0].set_title('Sine Wave')

# Top-right: Scatter
axes[0, 1].scatter(hours_studied, marks, alpha=0.5, s=20)
axes[0, 1].set_title('Hours vs Marks')

# Bottom-left: Histogram
axes[1, 0].hist(scores, bins=25, color='steelblue', edgecolor='white')
axes[1, 0].set_title('Score Distribution')

# Bottom-right: Bar chart
axes[1, 1].bar(branches, students, color=colors)
axes[1, 1].set_title('Students per Branch')

plt.tight_layout()
plt.show()` },
      { type: 'heading', id: 'sd9-style', level: 2, content: 'Styling — Make It Look Professional' },
      { type: 'code', id: 'sd9-style-code', lang: 'python', title: 'Style Presets and Customization', code: `# Use a built-in style
plt.style.use('seaborn-v0_8-darkgrid')
# Available: 'ggplot', 'fivethirtyeight', 'seaborn-v0_8', 'seaborn-v0_8-darkgrid',
#           'bmh', 'dark_background', 'classic', 'grayscale'

# Or set global defaults
plt.rcParams.update({
    'figure.figsize': (10, 6),
    'font.size': 12,
    'axes.titlesize': 14,
    'axes.labelsize': 12,
    'lines.linewidth': 2,
    'axes.grid': True,
    'grid.alpha': 0.3,
})

# Save figure to file (do this before plt.show()!)
plt.savefig('my_plot.png', dpi=300, bbox_inches='tight')
# Formats: .png, .pdf, .svg (vector), .jpg` },
      // Doubt
      { type: 'callout', id: 'sd9-d1', calloutType: 'doubt', title: 'Which chart type should I use for my data?', content: '**Decision framework**:\n- **Trend over time**: Line plot (x=time, y=value).\n- **Comparing categories**: Bar chart. If many categories → horizontal bar.\n- **Relationship between two numeric variables**: Scatter plot.\n- **Distribution of a single variable**: Histogram.\n- **Parts of a whole**: Pie chart (but use with caution — bar charts are usually clearer).\n- **Multiple variables comparison**: Grouped/stacked bar, boxplot, or pairplot (Seaborn).\n\n**Golden rule**: The chart type should make the insight OBVIOUS. If you have to explain the chart, it is the wrong chart.' },
      { type: 'callout', id: 'sd9-d2', calloutType: 'doubt', title: 'plt.show() vs plt.savefig() — what order?', content: '`plt.savefig()` BEFORE `plt.show()`. After `plt.show()`, the figure is cleared from memory — `savefig()` will produce an empty image.\n\nAlso: use `plt.tight_layout()` before saving to prevent label clipping. For publication-quality: `plt.savefig(\'plot.pdf\', dpi=300, bbox_inches=\'tight\')` — PDF is vector (infinitely scalable).' },
      // Exam
      { type: 'callout', id: 'sd9-exam', calloutType: 'exam', title: 'Exam Alert — ST-1', content: '1. **line plot syntax**: `plt.plot(x, y, \'r--\', label=\'...\')` — the shorthand color+style format.\n2. **Figure vs Axes**: `plt.figure()` is the whole window. `axes` is the plot area.\n3. **Subplots**: `fig, axes = plt.subplots(rows, cols)`. Access via `axes[r, c]`.\n4. **Labels and title**: `xlabel()`, `ylabel()`, `title()` — missing these loses marks.\n5. **Must call `plt.show()`** at end — otherwise nothing displays in script mode.' },
      // Bridge
      { type: 'callout', id: 'sd9-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Matplotlib is built on NumPy — every plot uses NumPy arrays (SDE Days 1-2). Pandas .plot() is a wrapper around matplotlib (SDE Day 3). Tomorrow\'s Seaborn (Day 10) is a higher-level wrapper around matplotlib for statistical charts.' },
      // Quick Ref
      { type: 'table', id: 'sd9-qref', headers: ['Plot Type', 'Function', 'Key Parameters'], rows: [
        ['Line', 'plt.plot(x, y)', 'color, linewidth, linestyle, marker, label'],
        ['Scatter', 'plt.scatter(x, y)', 'c (color), s (size), alpha, cmap, edgecolor'],
        ['Bar', 'plt.bar(x, height)', 'color, edgecolor, width, tick_label'],
        ['Histogram', 'plt.hist(data)', 'bins, color, edgecolor, alpha, density'],
        ['Pie', 'plt.pie(values)', 'labels, autopct, colors, explode, startangle'],
        ['Subplots', 'plt.subplots(r, c)', 'figsize. Access: axes[row, col]'],
      ] },
      // Quiz
      { type: 'quiz', id: 'sd9-quiz', title: 'Day 9 Quiz', questions: [
        { id: 'sd9-q1', question: 'Which plot type is best for showing the relationship between two numeric variables?', options: ['Bar chart', 'Scatter plot', 'Histogram', 'Pie chart'], correctIndex: 1, explanation: 'Scatter plots show how two numeric variables relate. Each point is (x, y). Patterns: upward trend (positive correlation), scattered (no correlation), clusters.' },
        { id: 'sd9-q2', question: 'What does plt.tight_layout() do?', options: ['Compresses the plot to save space', 'Adjusts spacing to prevent labels/titles from being clipped', 'Removes empty subplot slots', 'Zooms in on the data'], correctIndex: 1, explanation: 'tight_layout() automatically adjusts padding between subplots and margins to prevent labels, titles, and tick labels from being cut off.' },
        { id: 'sd9-q3', question: 'What happens if you call plt.savefig() AFTER plt.show()?', options: ['It saves correctly', 'The saved file is empty — figure is cleared after show()', 'It re-shows the plot', 'It throws an error'], correctIndex: 1, explanation: 'show() clears the figure from memory. savefig() after show() produces a blank image. Always save before showing.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'sd9-cards', title: 'Day 9 Flashcards', cards: [
        { id: 'sd9-f1', front: 'Line vs Scatter vs Bar vs Histogram?', back: 'Line: trend over time (x=time, y=value). Scatter: relationship between 2 numeric vars. Bar: compare categories. Histogram: distribution of 1 numeric var (bins). Choose based on your DATA, not aesthetics.', hint: 'Four chart types, four purposes...' },
        { id: 'sd9-f2', front: 'Subplots syntax?', back: 'fig, axes = plt.subplots(rows, cols, figsize=(w,h)). axes is 2D array — access: axes[r, c].plot(x, y). Use tight_layout() to prevent overlap. plt.show() at the end.', hint: 'Grid of plots...' },
        { id: 'sd9-f3', front: 'How to add labels, title, legend, grid?', back: 'plt.xlabel(\'text\'), plt.ylabel(\'text\'), plt.title(\'text\'). plt.legend() — requires label= in plot(). plt.grid(True, alpha=0.3). plt.tight_layout() before show/save.', hint: 'Four essential annotations...' },
      ] },
      { type: 'practice', id: 'sd9-p1', lang: 'python', title: 'Practice: Exam Score Analyzer', starter: `import numpy as np
import matplotlib.pyplot as plt
np.random.seed(42)

# Generate data: 200 students, 3 subjects
subjects = ['Java', 'DBMS', 'SDE']
java = np.random.normal(72, 12, 200)
dbms = np.random.normal(78, 10, 200)
sde = np.random.normal(68, 15, 200)

# TODO: Create a 2×2 dashboard
# Top-left: Histogram of Java scores
# Top-right: Histogram of DBMS scores
# Bottom-left: Box plot comparing all 3 subjects [plt.boxplot([java,dbms,sde])]
# Bottom-right: Scatter plot of Java vs DBMS scores (check correlation!)
`, hint: 'fig, axes = plt.subplots(2,2,figsize=(12,10)). Top-left: axes[0,0].hist(java,bins=25,color=\'teal\'). Bottom-left: axes[1,0].boxplot([java,dbms,sde],labels=subjects). Bottom-right: axes[1,1].scatter(java,dbms,alpha=0.5). Add axis labels! Create a practice editor entry.' },
      { type: 'practice', id: 'sd9-p2', lang: 'python', title: 'Practice: Stock Price Dashboard', starter: `import numpy as np
import matplotlib.pyplot as plt
np.random.seed(42)

days = np.arange(1, 31)
# Simulate stock prices (random walk)
price_a = 100 + np.cumsum(np.random.normal(0, 2, 30))
price_b = 50 + np.cumsum(np.random.normal(0.5, 1.5, 30))

# TODO: Plot both stock prices on same chart
# TODO: Add legend, grid, title "Stock Price Comparison"
# TODO: Add horizontal line at initial price (baseline)
# TODO: Fill area between the two lines`, hint: 'plt.plot(days,price_a,label=\'Stock A\'). plt.plot(days,price_b,label=\'Stock B\'). plt.axhline(y=100,color=\'gray\',linestyle=\':\'). plt.fill_between(days,price_a,price_b,alpha=0.3,where=price_a>price_b,color=\'green\'). plt.fill_between(days,price_a,price_b,alpha=0.3,where=price_a<=price_b,color=\'red\').' },
      { type: 'practice', id: 'sd9-p3', lang: 'python', title: 'Practice: Chart Type Selector', starter: `# THINKING EXERCISE — answer in comments. No code needed.

# For each scenario, pick the BEST chart type and explain why:
#   choices: line, bar, scatter, histogram, pie, boxplot

# 1. Stock price over 6 months
# 2. Number of students in each branch
# 3. Relationship between study hours and exam marks
# 4. Distribution of exam scores
# 5. Market share of 5 companies (parts of a whole)
# 6. Comparing salary distributions across 3 cities

# For #2, write the ONE-LINE matplotlib code to draw it.
# For #4, write the ONE-LINE code to draw it.`, hint: '1. line. 2. bar: plt.bar(branches, counts). 3. scatter. 4. histogram: plt.hist(scores, bins=20). 5. pie. 6. boxplot. The chart should make the insight obvious.' },
      { type: 'practice', id: 'sd9-p4', lang: 'python', title: 'Practice: Subplot Grid Master', starter: `import numpy as np
import matplotlib.pyplot as plt
np.random.seed(42)

x = np.linspace(0, 10, 100)
data = np.random.normal(50, 15, 1000)
cats = ['A', 'B', 'C', 'D']
counts = [25, 40, 15, 20]

# TODO: create a 1x3 figure (3 plots side by side)
# Plot 1: line plot of sin(x)
# Plot 2: histogram of data (30 bins)
# Plot 3: bar chart of cats vs counts
# Add a title to EACH subplot.
# Use plt.tight_layout() and plt.show().`, hint: 'fig, axes = plt.subplots(1, 3, figsize=(15, 4)). axes[0].plot(x, np.sin(x)). axes[1].hist(data, bins=30). axes[2].bar(cats, counts). Each axes[i].set_title(...).' },
      { type: 'practice', id: 'sd9-p5', lang: 'python', title: 'Practice: Style Explorer', starter: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

# TODO 1: list available styles: print(plt.style.available)
# TODO 2: create a function plot_sine(style_name) that:
#         - applies plt.style.use(style_name)
#         - plots x vs y with a title and labels
#         - calls plt.show()
# TODO 3: call it with 'ggplot', 'fivethirtyeight',
#         'dark_background', and 'grayscale'
# TODO 4: which style do you like best for a presentation?
#         (answer in a comment)
# TODO 5: for your favorite, save the figure:
#         plt.savefig('sine.png', dpi=150, bbox_inches='tight')
#         BEFORE plt.show()`, hint: 'plt.style.use(name) changes the theme globally. Savefig must come before show(). bbox_inches=\'tight\' prevents clipping. fivethirtyeight and ggplot are popular for slides.' },
    ],
    tasks: [
      { id: 'sde-8-d9-t1', text: 'Create line, bar, scatter, and histogram plots with proper labels, titles, and legends.', tag: 'lab' },
      { id: 'sde-8-d9-t2', text: 'Build a 2×2 subplot dashboard showing different views of the same dataset.', tag: 'lab' },
      { id: 'sde-8-d9-t3', text: 'Try 3 different plt.style.use() presets. Save figures with savefig() at 150 DPI.', tag: 'drill' },
      { id: 'sde-8-d9-t4', text: 'Explain: When should you use a scatter plot vs line plot? What does tight_layout() do?', tag: 'mcq' },
    ],
  },

  // ================================================================
  // DAY 10: Seaborn & Advanced Visualization
  // ================================================================
  {
    id: 'sde-8-d10', number: 10,
    title: 'Statistical Visualization with Seaborn', duration: 60,
    topics: ['Seaborn', 'boxplot', 'violinplot', 'heatmap', 'pairplot', 'Correlation Matrix', 'categorical plots'],
    alignment: ['Seaborn Official Tutorials', 'Python Data Science Handbook'],
    blocks: [
      { type: 'callout', id: 'sd10-intro', calloutType: 'info', title: 'Seaborn — Statistical Charts Made Beautiful', content: 'Matplotlib is powerful but verbose. **Seaborn** wraps Matplotlib with a high-level API designed for **statistical visualization**. Boxplots, violin plots, heatmaps, pairplots — one line of Seaborn replaces 10+ lines of Matplotlib. It integrates directly with Pandas DataFrames. Today: the charts that data scientists use every day.' },
      { type: 'heading', id: 'sd10-box', level: 2, content: 'Boxplots — See the Spread at a Glance' },
      { type: 'code', id: 'sd10-box-code', lang: 'python', title: 'Boxplots and Violin Plots', code: `import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Generate exam data
np.random.seed(42)
df = pd.DataFrame({
    'Marks': np.concatenate([
        np.random.normal(72, 12, 100),  # AIML
        np.random.normal(78, 10, 100),  # CSE
        np.random.normal(65, 15, 100),  # ECE
        np.random.normal(70, 8, 100),   # ME
    ]),
    'Branch': ['AIML']*100 + ['CSE']*100 + ['ECE']*100 + ['ME']*100
})

# Boxplot: median, quartiles, outliers
sns.boxplot(data=df, x='Branch', y='Marks', palette='Set2')
plt.title('Exam Marks Distribution by Branch')
plt.show()

# Violin plot: boxplot + density curve (more detail)
sns.violinplot(data=df, x='Branch', y='Marks', palette='Set2', inner='quartile')
plt.title('Exam Marks Distribution (Violin Plot)')
plt.show()` },
      { type: 'callout', id: 'sd10-box-read', calloutType: 'tip', title: 'How to Read a Boxplot', content: '```\n    ┬  ── Max (or Q3 + 1.5×IQR)\n    │\n    ┼  ── Upper whisker\n    │\n  ┌─┴─┐\n  │   │  ── Q3 (75th percentile)\n  ├───┤  ── Median (50th percentile) — the line in the box\n  │   │  ── Q1 (25th percentile)\n  └─┬─┘\n    │\n    ┼  ── Lower whisker\n    │\n    ┴  ── Min (or Q1 - 1.5×IQR)\n    ○  ── Outlier (beyond whiskers)\n```\n**What to look for**: Long boxes = high variance. Shifted median = skew. Outliers = extreme values. Comparing boxplots side-by-side = the most common exam visualization.' },
      { type: 'heading', id: 'sd10-heatmap', level: 2, content: 'Heatmaps & Correlation Matrix — Find Relationships' },
      { type: 'code', id: 'sd10-heat-code', lang: 'python', title: 'Correlation Heatmap', code: `# Create multi-variable dataset
np.random.seed(42)
df = pd.DataFrame({
    'Hours_Studied': np.random.normal(25, 8, 200),
    'Attendance_Pct': np.random.normal(80, 12, 200),
    'Previous_CGPA': np.random.normal(7.5, 1.5, 200),
    'Assignments_Submitted': np.random.randint(0, 10, 200),
})
df['Exam_Marks'] = (
    df['Hours_Studied'] * 2.0 +
    df['Attendance_Pct'] * 0.3 +
    df['Previous_CGPA'] * 5.0 +
    np.random.normal(0, 5, 200)
).clip(0, 100)

# Correlation matrix
corr = df.corr()

# Heatmap — red = positive correlation, blue = negative
plt.figure(figsize=(10, 8))
sns.heatmap(corr,
            annot=True,          # show numbers
            cmap='coolwarm',     # diverging colormap
            center=0,            # center at 0
            fmt='.2f',           # 2 decimal places
            square=True,         # square cells
            linewidths=1,
            cbar_kws={'shrink': 0.8})
plt.title('Feature Correlation Matrix', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()` },
      { type: 'heading', id: 'sd10-pair', level: 2, content: 'Pairplot — See Everything at Once' },
      { type: 'code', id: 'sd10-pair-code', lang: 'python', title: 'Pairplot', code: `# Pairplot: scatter plot for every pair of numeric columns
# Diagonal: histogram (or KDE) of each column
# THE most information-dense plot in data science

df['Grade'] = pd.cut(df['Exam_Marks'],
                     bins=[0, 40, 60, 80, 100],
                     labels=['F', 'D', 'B', 'A'])

sns.pairplot(df,
             vars=['Hours_Studied', 'Attendance_Pct', 'Previous_CGPA', 'Exam_Marks'],
             hue='Grade',           # color by category
             palette='Set1',
             diag_kind='hist',      # histogram on diagonal
             height=2.5,
             plot_kws={'alpha': 0.6, 's': 30})
plt.suptitle('Pairwise Relationships with Grade Categories', y=1.02, fontsize=14)
plt.show()` },
      { type: 'heading', id: 'sd10-cat', level: 2, content: 'Categorical Plots — Seaborn\'s Superpower' },
      { type: 'code', id: 'sd10-cat-code', lang: 'python', title: 'catplot — All-in-One Categorical', code: `# Create dataset with categories
df['Semester'] = np.random.choice([1, 2, 3, 4], len(df))
df['Gender'] = np.random.choice(['Male', 'Female'], len(df))

# 1. Bar plot with error bars (confidence intervals)
sns.barplot(data=df, x='Branch', y='Exam_Marks',
            hue='Gender', palette='Set2',
            estimator=np.mean, errorbar=('ci', 95))
plt.title('Mean Exam Marks by Branch and Gender')
plt.show()

# 2. Swarm plot — every point shown (for small datasets)
sns.swarmplot(data=df.head(80), x='Branch', y='Exam_Marks')
plt.title('Individual Exam Marks by Branch (first 80 students)')
plt.show()

# 3. Count plot — frequency of categories
sns.countplot(data=df, x='Branch', hue='Grade', palette='Set3')
plt.title('Grade Distribution per Branch')
plt.show()

# 4. catplot — faceted categorical plots
sns.catplot(data=df, x='Branch', y='Exam_Marks',
            col='Semester', kind='box',
            col_wrap=2, height=4, palette='Set2')
plt.suptitle('Exam Marks by Branch, Faceted by Semester', y=1.02)
plt.show()` },
      { type: 'heading', id: 'sd10-dist', level: 2, content: 'Distribution Plots' },
      { type: 'code', id: 'sd10-dist-code', lang: 'python', title: 'KDE and Distribution Plots', code: `# KDE (Kernel Density Estimation) — smooth histogram
plt.figure(figsize=(10, 6))
for branch in ['AIML', 'CSE', 'ECE', 'ME']:
    subset = df[df['Branch'] == branch]['Exam_Marks']
    sns.kdeplot(subset, label=branch, fill=True, alpha=0.3)
plt.xlabel('Exam Marks')
plt.ylabel('Density')
plt.title('Exam Marks Distribution by Branch (KDE)')
plt.legend()
plt.show()

# Histogram + KDE overlay
sns.histplot(data=df, x='Exam_Marks', hue='Branch',
             kde=True, palette='Set2', alpha=0.5, element='step')
plt.title('Exam Marks: Histogram + KDE by Branch')
plt.show()` },
      // Doubt
      { type: 'callout', id: 'sd10-d1', calloutType: 'doubt', title: 'Seaborn vs Matplotlib — which should I use?', content: '**Seaborn** for:\n- Statistical charts (boxplots, violin, heatmap, pairplot) — built-in stats computation.\n- Working with DataFrames — understands column names automatically.\n- Beautiful defaults — looks professional out of the box.\n- Quick exploration — less code for common tasks.\n\n**Matplotlib** for:\n- Full control over every pixel — custom charts that Seaborn cannot do.\n- Non-statistical plots (engineering diagrams, maps, animations).\n- When you need to modify figure-level details Seaborn abstracts away.\n\n**Practical approach**: Use Seaborn for exploration and standard stats charts. Drop to Matplotlib when you need custom styling Seaborn cannot do. They work together — Seaborn IS Matplotlib underneath.' },
      { type: 'callout', id: 'sd10-d2', calloutType: 'doubt', title: 'What does the correlation coefficient (r) actually mean?', content: 'Correlation ranges from **-1 to +1**:\n- **+1**: Perfect positive correlation (as X increases, Y increases proportionally).\n- **0**: No linear correlation (X and Y are unrelated).\n- **-1**: Perfect negative correlation (as X increases, Y decreases proportionally).\n\n**Interpretation guide**:\n- |r| < 0.3: Weak (probably random noise)\n- 0.3 ≤ |r| < 0.7: Moderate\n- |r| ≥ 0.7: Strong\n\n**CRITICAL**: Correlation ≠ Causation. Ice cream sales and drowning deaths are correlated (both increase in summer). Ice cream does not CAUSE drowning.' },
      // Exam
      { type: 'callout', id: 'sd10-exam', calloutType: 'exam', title: 'Exam Alert — ST-1', content: '1. **Boxplot interpretation**: Median, quartiles, whiskers, outliers. Read and explain.\n2. **Correlation heatmap**: Read values. Identify strongest positive/negative correlations.\n3. **Seaborn vs Matplotlib**: Seaborn = statistical, DataFrame-aware, better defaults.\n4. **sns.boxplot() / sns.heatmap() / sns.pairplot()** — know the function names.\n5. **plt.show() is STILL needed** even with Seaborn (Seaborn builds on Matplotlib).' },
      // Bridge
      { type: 'callout', id: 'sd10-bridge', calloutType: 'bridge', title: 'Connect the Dots — Your Complete SDE Journey', content: 'Seaborn uses Pandas DataFrames (Days 2-3) and NumPy arrays (Day 1) as input. The correlation matrix uses the same statistics (correlation coefficient) you learned on Day 4. Boxplots visualize the distributions you generated on Day 1.\n\nYour 10-day SDE journey:\n**Days 1-4**: NumPy, Pandas, stats, hypothesis testing.\n**Days 5-8**: Big Data architecture, Hadoop, Spark, ETL, data warehousing.\n**Days 9-10**: Matplotlib + Seaborn — turning numbers into insights.\n\nYou now have the complete data science toolkit: wrangle → analyze → visualize → communicate.' },
      // Quick Ref
      { type: 'table', id: 'sd10-qref', headers: ['Seaborn Function', 'What It Creates', 'Key Parameters'], rows: [
        ['sns.boxplot()', 'Box with quartiles + outliers', 'data, x, y, hue, palette'],
        ['sns.violinplot()', 'Boxplot + density curve', 'data, x, y, hue, inner, split'],
        ['sns.heatmap()', 'Color-coded matrix', 'data, annot, cmap, center, fmt'],
        ['sns.pairplot()', 'Scatter matrix + histograms', 'data, vars, hue, diag_kind, height'],
        ['sns.barplot()', 'Bar with error bars', 'data, x, y, hue, estimator, errorbar'],
        ['sns.catplot()', 'Faceted categorical plots', 'data, x, y, col, kind, col_wrap'],
        ['sns.histplot()', 'Histogram with KDE option', 'data, x, hue, kde, bins, element'],
        ['sns.kdeplot()', 'Smooth density curve', 'data, x, hue, fill, common_norm'],
        ['sns.scatterplot()', 'Scatter with hue/style/size', 'data, x, y, hue, style, size'],
        ['sns.lineplot()', 'Line with CI band', 'data, x, y, hue, ci, marker'],
        ['df.corr()', 'Correlation matrix', 'Numeric columns only. Returns DataFrame.'],
      ] },
      // Quiz
      { type: 'quiz', id: 'sd10-quiz', title: 'Day 10 Quiz', questions: [
        { id: 'sd10-q1', question: 'What does the line in the middle of a boxplot represent?', options: ['Mean', 'Median', 'Mode', 'Standard deviation'], correctIndex: 1, explanation: 'The central line in a boxplot is the MEDIAN (50th percentile). The box edges are Q1 (25th) and Q3 (75th). The mean is NOT shown by default in a boxplot.' },
        { id: 'sd10-q2', question: 'What does a correlation value of -0.85 indicate?', options: ['No relationship', 'Strong positive correlation', 'Strong negative correlation', 'Weak negative correlation'], correctIndex: 2, explanation: '-0.85 is strong (|r| > 0.7) and negative (negative sign). As one variable increases, the other DECREASES strongly. Example: hours of TV watched vs exam marks.' },
        { id: 'sd10-q3', question: 'What is a pairplot used for?', options: ['Comparing two variables only', 'Showing all pairwise relationships in a dataset at once', 'Plotting time series data', 'Creating pie charts'], correctIndex: 1, explanation: 'Pairplot creates a grid: each scatter plot shows the relationship between two variables, and the diagonal shows the distribution of each variable. Best for exploratory data analysis.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'sd10-cards', title: 'Day 10 Flashcards', cards: [
        { id: 'sd10-f1', front: 'Boxplot anatomy — what do the lines mean?', back: 'Box: Q1 (bottom) to Q3 (top). Line in box: MEDIAN. Whiskers: extend to ~1.5×IQR beyond box. Points beyond whiskers: OUTLIERS. Wide box = high variance. Shifted median = skew. Compare across categories.', hint: 'Quartiles, median, whiskers, outliers...' },
        { id: 'sd10-f2', front: 'Correlation matrix — read the heatmap?', back: 'df.corr() + sns.heatmap(corr, annot=True). Values range -1 to +1. Red (1.0) = perfect positive. White (0) = no correlation. Blue (-1.0) = perfect negative. Look for strongest values (closest to ±1). Correlation ≠ causation.', hint: 'Red positive, blue negative...' },
        { id: 'sd10-f3', front: 'Seaborn vs Matplotlib — when to use which?', back: 'Seaborn: statistical charts (box, violin, heatmap, pairplot), DataFrame-aware, better defaults. Matplotlib: full pixel control, custom charts, non-stats diagrams. Use Seaborn for exploration, Matplotlib for publication.', hint: 'Stats vs custom control...' },
      ] },
      { type: 'practice', id: 'sd10-p1', lang: 'python', title: 'Practice: Complete EDA Dashboard', starter: `import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load the built-in tips dataset (or generate your own)
df = sns.load_dataset('tips')

# TODO: Create a 2×3 dashboard
# Row 1, Col 1: Boxplot of tip by day
# Row 1, Col 2: Violin plot of total_bill by time (Lunch/Dinner)
# Row 1, Col 3: Scatter plot: total_bill vs tip, colored by smoker
# Row 2, Col 1: Correlation heatmap of numeric columns
# Row 2, Col 2: Bar plot: average tip by day, with error bars
# Row 2, Col 3: Histogram of tip, colored by sex`, hint: 'fig, axes = plt.subplots(2,3,figsize=(16,10)). Use sns.boxplot(ax=axes[0,0], ...). sns.violinplot(ax=axes[0,1], ...). sns.scatterplot(ax=axes[0,2], ...). sns.heatmap(ax=axes[1,0], ...). sns.barplot(ax=axes[1,1], ...). sns.histplot(ax=axes[1,2], ...). plt.tight_layout() before show.' },
      { type: 'practice', id: 'sd10-p2', lang: 'python', title: 'Practice: Correlation Detective', starter: `import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
n = 300

# Create a dataset with known relationships
df = pd.DataFrame({
    'Experience_Years': np.random.exponential(scale=5, size=n),
    'Education_Level': np.random.choice([1, 2, 3, 4, 5], n, p=[0.05, 0.15, 0.3, 0.3, 0.2]),
    'Certifications': np.random.poisson(lam=3, size=n),
    'Projects_Completed': np.random.randint(1, 20, n),
})
df['Salary'] = (
    df['Experience_Years'] * 8000 +
    df['Education_Level'] * 12000 +
    df['Certifications'] * 5000 +
    df['Projects_Completed'] * 2000 +
    np.random.normal(0, 15000, n)
)

# TODO:
# 1. Compute correlation matrix
# 2. Plot heatmap with annotations
# 3. Which feature has the STRONGEST correlation with Salary?
# 4. Create a pairplot colored by Education_Level`, hint: 'corr = df.corr(). sns.heatmap(corr, annot=True, cmap=\'coolwarm\', center=0). Strongest: Experience_Years should be highest. Pairplot: sns.pairplot(df, vars=df.columns, hue=\'Education_Level\', palette=\'viridis\').' },
      { type: 'practice', id: 'sd10-p3', lang: 'python', title: 'Practice: Boxplot Interpreter', starter: `import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
df = pd.DataFrame({
    'Branch': ['AIML']*100 + ['CSE']*100 + ['ECE']*100,
    'Marks': np.concatenate([
        np.random.normal(72, 12, 100),
        np.random.normal(78, 10, 100),
        np.random.normal(65, 20, 100),   # high variance branch
    ])
})

# TODO 1: create the boxplot: sns.boxplot(data=df, x='Branch', y='Marks')
# TODO 2: answer in comments:
#   - which branch has the highest MEDIAN?
#   - which branch has the MOST VARIANCE (longest box)?
#   - which branch has outliers?
#   - what do the whiskers represent?
# TODO 3: add a violinplot of the same data. What extra
#         information does the violin show?`, hint: 'CSE has highest median (~78). ECE has the longest box (std=20) and likely outliers. Whiskers extend to ~1.5×IQR. Violin adds the density shape — you see the full distribution, not just quartiles.' },
      { type: 'practice', id: 'sd10-p4', lang: 'python', title: 'Practice: Correlation vs Causation', starter: `import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
np.random.seed(42)

# Ice cream sales vs drowning incidents — both rise in summer!
months = np.arange(12)
ice_cream = 100 + months * 15 + np.random.normal(0, 10, 12)
drownings = 80 + months * 10 + np.random.normal(0, 8, 12)

df = pd.DataFrame({'Month': months, 'Ice_Cream': ice_cream, 'Drownings': drownings})

# TODO 1: compute correlation between Ice_Cream and Drownings
# TODO 2: scatter plot of the two variables
# TODO 3: the correlation will be HIGH and POSITIVE.
#         Does eating ice cream cause drownings? Explain in comments.
# TODO 4: what is the hidden variable here? (the confounder)
# TODO 5: how would a real data scientist verify the real cause?`, hint: 'corr = df[[\'Ice_Cream\',\'Drownings\']].corr() — expect ~0.95+. Confounder: summer heat (or season). Correlation ≠ causation. Verify with experiments or controlling for the confounder.' },
      { type: 'practice', id: 'sd10-p5', lang: 'python', title: 'Practice: KDE Comparison', starter: `import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
np.random.seed(42)

# Three groups with different distributions
df = pd.DataFrame({
    'group': ['A']*200 + ['B']*200 + ['C']*200,
    'value': np.concatenate([
        np.random.normal(50, 5, 200),    # tight, centered
        np.random.normal(60, 15, 200),   # wide, shifted right
        np.random.exponential(10, 200),  # skewed!
    ])
})

# TODO 1: histogram with hue='group' (sns.histplot)
# TODO 2: overlay KDE curves for each group (sns.kdeplot)
# TODO 3: which group is SKEWED? How can you tell from the KDE?
# TODO 4: which group has the tightest spread?
# TODO 5: what does the KDE show that the histogram hides?`, hint: 'sns.histplot(data=df, x=\'value\', hue=\'group\'). sns.kdeplot(data=df, x=\'value\', hue=\'group\', fill=True, alpha=0.3). Group C (exponential) is skewed — the KDE tail extends right. A is tightest. KDE smooths noise into a continuous curve.' },
    ],
    tasks: [
      { id: 'sde-8-d10-t1', text: 'Create boxplots to compare exam marks across branches. Identify which branch has the highest median and most variance.', tag: 'lab' },
      { id: 'sde-8-d10-t2', text: 'Build a correlation heatmap for a multi-feature dataset. Annotate values. Find the strongest positive and negative correlations.', tag: 'lab' },
      { id: 'sde-8-d10-t3', text: 'Create a pairplot with hue coloring. Identify which pairs of variables show clear separation by category.', tag: 'lab' },
      { id: 'sde-8-d10-t4', text: 'Read a boxplot: explain what the median, quartiles, whiskers, and outliers represent. Interpret a given boxplot.', tag: 'mcq' },
    ],
  },
];