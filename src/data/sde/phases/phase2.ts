import type { Day } from '../../../types';

export const sdePhase2days: Day[] = [
  // DAY 5: Big Data Architecture
  {
    id: 'sde-8-d5', number: 5,
    title: 'Introduction to Big Data Architecture', duration: 60,
    topics: ['5 Vs of Big Data', 'RDBMS Limitations', 'Distributed Systems'],
    blocks: [
      { type: 'callout', id: 'sd5-intro', calloutType: 'info', title: 'When Data Outgrows a Single Machine', content: 'Traditional databases (MySQL, PostgreSQL) run on a **single server**. What happens when you have petabytes of data and millions of users? Today: the 5 Vs of Big Data, why RDBMS cannot scale infinitely, and how distributed systems solve the problem.' },
      { type: 'heading', id: 'sd5-5v', level: 2, content: 'The 5 Vs of Big Data' },
      { type: 'table', id: 'sd5-5v-table', headers: ['V', 'Stands For', 'Definition', 'Example'], rows: [['Volume', 'Scale of data', 'Terabytes to Petabytes', 'Facebook: 500+ TB/day of new data'], ['Velocity', 'Speed of data', 'Data streaming in real-time', 'Twitter: 6000 tweets/second'], ['Variety', 'Different formats', 'Structured, semi-structured, unstructured', 'Text, images, videos, sensor logs, JSON, CSV'], ['Veracity', 'Uncertainty/quality', 'How trustworthy is the data?', 'Social media: spam, bots, misinformation'], ['Value', 'Business worth', 'Turning data into insights', 'Netflix: recommendation engine = $1B/year']] },
      { type: 'heading', id: 'sd5-rdbms', level: 2, content: 'Why RDBMS Cannot Scale to Big Data' },
      { type: 'paragraph', id: 'sd5-rdbms-p', content: 'Traditional RDBMS (MySQL, Oracle) are designed for **vertical scaling** (bigger machine). But there is a limit to how big a single server can be. Big Data demands **horizontal scaling** (more machines) — which RDBMS cannot do natively.' },
      { type: 'table', id: 'sd5-scale-table', headers: ['Aspect', 'Vertical Scaling (RDBMS)', 'Horizontal Scaling (Big Data)'], rows: [['How?', 'Add more CPU, RAM, SSD to ONE server', 'Add MORE servers (nodes) to a cluster'], ['Cost', 'Expensive hardware. Limited ceiling.', 'Commodity hardware. Linear cost growth.'], ['Failure', 'Single point of failure. Downtime = disaster.', 'Built-in redundancy. Nodes fail often — no downtime.'], ['Examples', 'Upgrade from 64GB→256GB RAM', 'Add 10 more servers to Hadoop cluster'], ['Limit', 'Eventually hit physical ceiling', 'Theoretically unlimited (100s-1000s of nodes)']] },
      { type: 'heading', id: 'sd5-distributed', level: 2, content: 'Distributed Systems — The Core Idea' },
      { type: 'paragraph', id: 'sd5-dist-p', content: 'A distributed system splits data and computation across **multiple machines** (nodes) connected by a network. Data is **partitioned** (each node stores a chunk) and **replicated** (copies on multiple nodes for fault tolerance). Computation moves to the data — instead of moving petabytes across the network, you send small programs to each node.' },
      { type: 'list', id: 'sd5-principles', listStyle: 'number', items: ['**Data Partitioning (Sharding)**: Each node stores a subset of the data. Example: users A-M on node 1, N-Z on node 2.', '**Replication**: Each piece of data is copied to 2-3 nodes. If one fails, replicas take over.', '**Data Locality**: Move computation TO the data, not data to computation. This is Hadoop\'s secret sauce.', '**Fault Tolerance**: Assume nodes WILL fail. Design the system to handle failures gracefully without data loss or downtime.', '**Consistency vs Availability**: The CAP theorem — you cannot have both perfect consistency AND perfect availability in a distributed system.'] },
      // Doubt
      { type: 'callout', id: 'sd5-d1', calloutType: 'doubt', title: 'If RDBMS are so limited, why do we still use MySQL?', content: 'RDBMS excel at:\n1. **ACID transactions** — banking, where consistency is critical.\n2. **Small-to-medium data** — most applications have <1TB of data.\n3. **Complex JOINs and relationships** — SQL is unmatched for relational queries.\n\nBig Data tools (Hadoop, Spark) are for when data volume, velocity, or variety exceeds RDBMS limits. In practice, modern architectures use **both**: RDBMS for transactional data, Big Data tools for analytics and ML pipelines.' },
      // Exam
      { type: 'callout', id: 'sd5-exam', calloutType: 'exam', title: 'Exam Alert — ST-2 Theory', content: '1. **5 Vs of Big Data** — name and explain each. Guaranteed MCQ.\n2. **Vertical vs Horizontal scaling** — difference, pros/cons of each.\n3. **Data locality** — WHY Hadoop moves computation to data (saves network bandwidth).\n4. **CAP theorem**: Consistency, Availability, Partition tolerance — pick 2.\n5. **ST-2 MCQs (Level 1 + Level 2)** will heavily test Big Data concepts.' },
      // Bridge
      { type: 'callout', id: 'sd5-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Distributed systems concepts (partitioning, replication, data locality) are the foundation of **Hadoop HDFS (Day 6)** and **Spark (Day 6)**. The CAP theorem extends to every distributed database decision. These concepts also apply to distributed ML training (model parallelism, data parallelism).' },
      // Quick Ref
      { type: 'table', id: 'sd5-qref', headers: ['Concept', 'Key Point'], rows: [['5Vs', 'Volume, Velocity, Variety, Veracity, Value'], ['Vertical scaling', 'Bigger single machine. Limited ceiling. RDBMS.'], ['Horizontal scaling', 'More machines. Near-linear growth. Big Data.'], ['Data locality', 'Move code to data, not data to code. Saves network.'], ['Fault tolerance', 'Replication. Assume failure. Design for it.'], ['CAP theorem', 'Pick 2: Consistency, Availability, Partition tolerance.']] },
      // Quiz
      { type: 'quiz', id: 'sd5-quiz', title: 'Day 5 Quiz', questions: [
        { id: 'sd5-q1', question: 'Which of the 5 Vs refers to the SPEED at which data is generated?', options: ['Volume', 'Velocity', 'Variety', 'Veracity'], correctIndex: 1, explanation: 'Velocity = speed of data generation and processing. Think real-time streams: tweets/second, sensor readings/millisecond, stock trades/microsecond.' },
        { id: 'sd5-q2', question: 'What is the main advantage of horizontal scaling over vertical scaling?', options: ['Faster single queries', 'Better ACID compliance', 'Near-linear cost growth and no physical ceiling', 'Less complex to implement'], correctIndex: 2, explanation: 'Horizontal scaling adds more commodity machines — cost grows linearly with capacity, and there is no hard limit. Vertical scaling hits a physical ceiling with the largest available server.' },
        { id: 'sd5-q3', question: 'Why does Hadoop move computation TO the data instead of moving data to computation?', options: ['Security reasons', 'Network bandwidth is the bottleneck — moving code is cheaper', 'Computation is faster near data sources', 'It is a legacy design choice'], correctIndex: 1, explanation: 'Moving petabytes of data across the network is SLOW and EXPENSIVE. Sending a small MapReduce program (KB) to each node where the data already lives is vastly more efficient.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'sd5-cards', title: 'Day 5 Flashcards', cards: [
        { id: 'sd5-f1', front: 'Name and explain the 5 Vs of Big Data.', back: 'Volume (scale), Velocity (speed), Variety (formats — structured/unstructured), Veracity (quality/trustworthiness), Value (business insights). Know these for ST-2 MCQ.', hint: 'Five V words...' },
        { id: 'sd5-f2', front: 'Vertical vs Horizontal scaling?', back: 'Vertical = bigger machine (more RAM/CPU). Horizontal = more machines (cluster). Vertical has physical ceiling. Horizontal scales near-linearly. Big Data uses horizontal.', hint: 'Up vs out...' },
        { id: 'sd5-f3', front: 'What is data locality?', back: 'Move COMPUTATION to where DATA is stored, instead of moving data across the network. Saves massive bandwidth. Core principle of Hadoop and Spark. Each node processes its local data.', hint: 'Code travels, data stays...' },
      ] },
      { type: 'practice', id: 'sd5-p1', lang: 'python', title: 'Practice: Distributed Processing Simulation', starter: `# Simulate: split data across nodes, process locally, combine results
import random

# 1 million numbers split across 4 "nodes"
data = [random.randint(1, 1000) for _ in range(1_000_000)]
nodes = 4
chunk_size = len(data) // nodes

# TODO: Split data into 4 chunks (simulate partitioning)
# Process each chunk locally (count, sum, avg per chunk)
# Combine results to get global count, sum, avg
# This is a simplified MapReduce!`, hint: 'chunks = [data[i:i+chunk_size] for i in range(0, len(data), chunk_size)]. For each: len(chunk), sum(chunk), sum(chunk)/len(chunk). Combine by summing counts and sums, compute global avg.' },
    ],
    tasks: [
      { id: 'sde-8-d5-t1', text: 'Write the 5 Vs of Big Data with one-line explanations and real-world examples for each.', tag: 'review' },
      { id: 'sde-8-d5-t2', text: 'Compare vertical vs horizontal scaling. Why does Big Data require horizontal scaling?', tag: 'review' },
      { id: 'sde-8-d5-t3', text: 'Explain data locality. Why is moving code cheaper than moving data in a distributed system?', tag: 'mcq' },
    ],
  },

  // DAY 6: Hadoop & Spark
  {
    id: 'sde-8-d6', number: 6,
    title: 'Distributed Processing (Hadoop & Spark)', duration: 60,
    topics: ['HDFS', 'MapReduce', 'Spark In-Memory Processing'],
    blocks: [
      { type: 'callout', id: 'sd6-intro', calloutType: 'info', title: 'The Two Giants of Big Data', content: '**Hadoop** pioneered distributed data processing with HDFS (storage) and MapReduce (computation). **Spark** improved on Hadoop by keeping data in **memory** (RAM) instead of writing to disk between steps — making it 10-100x faster for iterative algorithms like ML.' },
      { type: 'heading', id: 'sd6-hadoop', level: 2, content: 'The Hadoop Ecosystem' },
      { type: 'paragraph', id: 'sd6-hadoop-p', content: 'Hadoop is not a single tool — it is an **ecosystem** of components that together form a distributed data platform. The two core components are HDFS and MapReduce.' },
      { type: 'table', id: 'sd6-hadoop-table', headers: ['Component', 'Purpose', 'Analogy'], rows: [['HDFS', 'Distributed file system. Splits files into blocks (128MB) and stores copies across nodes.', 'Google Drive but split across 1000 machines'], ['MapReduce', 'Programming model. MAP (filter/transform on each node) → SHUFFLE (redistribute) → REDUCE (aggregate).', 'Assembly line: workers process parts, then combine results'], ['YARN', 'Resource manager. Allocates CPU/RAM to applications.', 'Operating system for the cluster'], ['Hive', 'SQL-like queries on Hadoop. Translates SQL→MapReduce.', 'MySQL interface on top of HDFS data'], ['HBase', 'NoSQL database on HDFS. Real-time read/write.', 'BigTable-like column store']] },
      { type: 'heading', id: 'sd6-mapreduce', level: 2, content: 'MapReduce — The Programming Model' },
      { type: 'code', id: 'sd6-mr-python', lang: 'python', title: 'MapReduce Word Count (Python Simulation)', code: `# Simplified MapReduce: Word Count
# Real MapReduce runs distributed across 100s of nodes

texts = [
    "hello world",
    "hello hadoop",
    "world of big data",
    "hadoop and spark"
]

# MAP phase: emit (key, value) pairs
def mapper(text):
    pairs = []
    for word in text.split():
        pairs.append((word, 1))  # each word → count 1
    return pairs

# Apply MAP to each chunk (parallel on each node)
mapped = []
for text in texts:
    mapped.extend(mapper(text))
# mapped = [('hello',1), ('world',1), ('hello',1), ('hadoop',1), ...]

# SHUFFLE: group by key (network transfer between nodes)
grouped = {}
for word, count in mapped:
    if word not in grouped:
        grouped[word] = []
    grouped[word].append(count)
# grouped = {'hello': [1,1], 'world': [1,1], ...}

# REDUCE phase: aggregate per key
def reducer(word, counts):
    return (word, sum(counts))

reduced = [reducer(w, c) for w, c in grouped.items()]
# reduced = [('hello',2), ('world',2), ('hadoop',2), ...]` },
      { type: 'heading', id: 'sd6-spark', level: 2, content: 'Apache Spark — In-Memory Revolution' },
      { type: 'paragraph', id: 'sd6-spark-p', content: 'Spark\'s key innovation: **keep intermediate results in RAM** instead of writing to disk after every step. Hadoop MapReduce writes to disk between Map and Reduce — safe but SLOW. Spark keeps data in memory across transformations — 10-100x faster for multi-step pipelines like ML training.' },
      { type: 'table', id: 'sd6-spark-vs-mr', headers: ['Feature', 'Hadoop MapReduce', 'Apache Spark'], rows: [['Processing', 'Disk-based (writes to disk between steps)', 'In-memory (keeps data in RAM across steps)'], ['Speed', 'Slower (disk I/O bottleneck)', '10-100x faster for iterative workloads'], ['Ease of use', 'Java only. Verbose code.', 'Python, Scala, Java, R, SQL APIs'], ['ML support', 'Requires Mahout (separate tool)', 'Built-in MLlib'], ['Streaming', 'Batch only', 'Spark Streaming (micro-batches)'], ['Best for', 'One-pass ETL, simple aggregations', 'ML training, iterative algorithms, SQL analytics']] },
      { type: 'code', id: 'sd6-spark-example', lang: 'python', title: 'PySpark Example (Conceptual)', code: `# Real PySpark distributed across a cluster
# This is what production ML pipelines look like

# from pyspark.sql import SparkSession
# spark = SparkSession.builder.appName("WordCount").getOrCreate()

# Read a text file from HDFS
# text_file = spark.read.text("hdfs://data/books.txt")

# Word count in 3 lines (vs 50+ lines in Hadoop MapReduce!)
# from pyspark.sql.functions import explode, split, col
# words = text_file.select(explode(split(col("value"), " ")).alias("word"))
# word_counts = words.groupBy("word").count().orderBy("count", ascending=False)
# word_counts.show(10)

# That is it! Spark handles distribution, fault tolerance, and optimization.` },
      // Doubt
      { type: 'callout', id: 'sd6-d1', calloutType: 'doubt', title: 'Is Spark replacing Hadoop? Should I learn both?', content: 'Spark is NOT replacing Hadoop — they complement each other:\n- **HDFS** (Hadoop\'s file system) is still widely used as Spark\'s data source.\n- **YARN** (Hadoop\'s resource manager) often manages Spark jobs.\n- Spark runs ON Hadoop clusters using HDFS + YARN.\n\nFor ST-2: know the Hadoop ecosystem AND Spark. Spark for computation speed. Hadoop for storage and resource management. Modern stacks: HDFS (storage) + Spark (compute) + YARN/Kubernetes (orchestration).' },
      // Exam
      { type: 'callout', id: 'sd6-exam', calloutType: 'exam', title: 'Exam Alert — ST-2', content: '1. **HDFS block size**: 128MB (default). Blocks are replicated (default 3 copies).\n2. **MapReduce phases**: Map → Shuffle → Reduce. Know what happens in each.\n3. **Why Spark is faster**: In-memory processing vs disk-based. This is THE key difference.\n4. **Spark components**: Spark SQL, MLlib, GraphX, Spark Streaming.\n5. **Data locality in MapReduce**: Mapper runs on the node where data block lives.' },
      // Bridge
      { type: 'callout', id: 'sd6-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'MapReduce\'s map/reduce pattern is the same functional programming pattern used in **Python\'s map()/reduce()** and Pandas groupby. Spark\'s DataFrame API is designed to feel like **Pandas (Days 2-3)** — same syntax, but running on a cluster. These tools power the ETL pipelines you will design on Day 7.' },
      // Quick Ref
      { type: 'table', id: 'sd6-qref', headers: ['Concept', 'Key Point'], rows: [['HDFS', 'Distributed FS. 128MB blocks. 3x replication. NameNode + DataNodes.'], ['MapReduce', 'Map (filter/transform) → Shuffle (redistribute) → Reduce (aggregate).'], ['Spark', 'In-memory processing. 10-100x faster for iterative workloads.'], ['RDD', 'Resilient Distributed Dataset — Spark\'s core abstraction.'], ['DataFrame', 'Spark\'s structured API — like Pandas but distributed.'], ['MLlib', 'Spark\'s built-in ML library. Classification, regression, clustering.']] },
      // Quiz
      { type: 'quiz', id: 'sd6-quiz', title: 'Day 6 Quiz', questions: [
        { id: 'sd6-q1', question: 'Why is Apache Spark faster than Hadoop MapReduce for iterative algorithms?', options: ['Spark uses faster CPUs', 'Spark keeps intermediate results in memory, not disk', 'Spark has fewer features', 'Spark runs on GPUs'], correctIndex: 1, explanation: 'MapReduce writes intermediate results to disk between every map and reduce step. Spark keeps them in RAM — eliminating disk I/O for multi-step pipelines (like ML training).' },
        { id: 'sd6-q2', question: 'What are the three phases of MapReduce?', options: ['Load → Process → Save', 'Map → Shuffle → Reduce', 'Extract → Transform → Load', 'Read → Compute → Write'], correctIndex: 1, explanation: 'Map (process each record locally), Shuffle (redistribute data by key across nodes), Reduce (aggregate results per key).' },
        { id: 'sd6-q3', question: 'What is HDFS\'s default block size?', options: ['64 KB', '1 MB', '128 MB', '1 GB'], correctIndex: 2, explanation: '128 MB is the default. Larger than traditional file system blocks because HDFS is optimized for large files (GB-TB). Larger blocks = less metadata overhead.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'sd6-cards', title: 'Day 6 Flashcards', cards: [
        { id: 'sd6-f1', front: 'Hadoop ecosystem components?', back: 'HDFS (storage), MapReduce (compute), YARN (resource mgmt), Hive (SQL), HBase (NoSQL), Pig (scripting), Sqoop (data transfer), Flume (log collection). Core: HDFS + MapReduce.', hint: 'Storage, compute, resource management, SQL...' },
        { id: 'sd6-f2', front: 'MapReduce phases?', back: 'MAP: process each record → emit (key, value) pairs. SHUFFLE: redistribute pairs by key across nodes. REDUCE: aggregate values per key → final output. Map is parallel, Reduce is per-key.', hint: 'Three steps...' },
        { id: 'sd6-f3', front: 'Spark vs Hadoop MapReduce?', back: 'Spark: in-memory, 10-100x faster for iterative ML. Hadoop MR: disk-based between steps. Spark has Python API (PySpark), built-in MLlib, SQL, Streaming. Hadoop MR is Java-only.', hint: 'Memory vs disk...' },
      ] },
      { type: 'practice', id: 'sd6-p1', lang: 'python', title: 'Practice: Build a MapReduce Simulator', starter: `# Simulate MapReduce for finding max temperature per city
data = [
    ("Mumbai", 32), ("Delhi", 28), ("Mumbai", 35),
    ("Delhi", 30), ("Mumbai", 33), ("Chennai", 38),
    ("Chennai", 36), ("Delhi", 27)
]

# TODO:
# MAP: data is already (city, temp) pairs — no transformation needed
# SHUFFLE: group temperatures by city
# REDUCE: find max temperature per city`, hint: 'Shuffle: use a dict with city→list of temps. Reduce: max(temps) for each city. Mumbai: 35, Delhi: 30, Chennai: 38.' },
      { type: 'practice', id: 'sd6-p2', lang: 'python', title: 'Practice: Compare Disk vs Memory', starter: `import time
import random

# Simulate: 100,000 numbers, process in 10 "steps"
data = [random.randint(1, 1000) for _ in range(100_000)]

# "Disk-based" (MapReduce style): write to list after each step
# "Memory-based" (Spark style): keep in variable, chain operations

# TODO: Time both approaches for 10 filtering+transforming steps
# Show the in-memory approach is faster`, hint: 'Disk: create new list after each operation. Memory: chain in a single list comprehension or generator. Use time.time() to measure.' },
    ],
    tasks: [
      { id: 'sde-8-d6-t1', text: 'Draw the Hadoop ecosystem. Explain HDFS, MapReduce, and YARN roles.', tag: 'review' },
      { id: 'sde-8-d6-t2', text: 'Simulate MapReduce in Python: word count with map/shuffle/reduce phases.', tag: 'lab' },
      { id: 'sde-8-d6-t3', text: 'Compare Hadoop MapReduce vs Apache Spark. Why is Spark preferred for ML?', tag: 'mcq' },
    ],
  },

  // DAY 7: ETL Pipelines & Data Warehousing
  {
    id: 'sde-8-d7', number: 7,
    title: 'ETL Pipelines and Data Warehousing', duration: 60,
    topics: ['Extract', 'Transform', 'Load', 'Data Warehouse Design'],
    blocks: [
      { type: 'callout', id: 'sd7-intro', calloutType: 'info', title: 'From Raw Data to Business Insights', content: '**ETL** (Extract, Transform, Load) is the pipeline that moves data from source systems to a **Data Warehouse** — a central repository optimized for analytics. Today: the ETL workflow, Python\'s role in each phase, and data warehouse design principles.' },
      { type: 'heading', id: 'sd7-etl', level: 2, content: 'ETL — Extract, Transform, Load' },
      { type: 'table', id: 'sd7-etl-table', headers: ['Phase', 'What Happens', 'Python Tools', 'Example'], rows: [['EXTRACT', 'Pull data from source systems', 'pd.read_csv(), pd.read_sql(), requests (APIs), boto3 (S3)', 'Read sales data from MySQL, CSV files, and REST APIs'], ['TRANSFORM', 'Clean, validate, enrich, aggregate', 'Pandas (groupby, merge), NumPy (stats), custom functions', 'Convert dates, fill missing values, join with product catalog, compute revenue'], ['LOAD', 'Write to destination (Data Warehouse)', 'df.to_sql(), to_parquet(), write to S3/HDFS', 'Load clean aggregated data into warehouse fact table']] },
      { type: 'code', id: 'sd7-etl-code', lang: 'python', title: 'Simple ETL Pipeline in Python', code: `import pandas as pd
import numpy as np
from datetime import datetime

# ===== EXTRACT =====
# From CSV (in real life: from DB, API, S3, Kafka...)
orders = pd.read_csv('raw_orders.csv')
products = pd.read_csv('product_catalog.csv')

# ===== TRANSFORM =====
# 1. Clean: remove rows with missing critical data
orders = orders.dropna(subset=['order_id', 'product_id', 'amount'])

# 2. Validate: remove negative amounts (data errors)
orders = orders[orders['amount'] > 0]

# 3. Enrich: join with product catalog
orders = orders.merge(products, on='product_id', how='left')

# 4. Derive: compute total = quantity * unit_price
orders['total'] = orders['quantity'] * orders['unit_price']

# 5. Aggregate: daily sales summary
daily_sales = orders.groupby('order_date').agg(
    total_revenue=('total', 'sum'),
    order_count=('order_id', 'nunique'),
    avg_order_value=('total', 'mean')
).reset_index()

# ===== LOAD =====
# To database (conceptual)
# daily_sales.to_sql('daily_sales_summary', engine, if_exists='append')

# To file
daily_sales.to_csv('daily_sales_clean.csv', index=False)
print(f"ETL complete: {len(daily_sales)} daily records loaded")` },
      { type: 'heading', id: 'sd7-warehouse', level: 2, content: 'Data Warehouse Design' },
      { type: 'paragraph', id: 'sd7-dw-p', content: 'A Data Warehouse is a **central repository** optimized for analytical queries (OLAP), not transactions (OLTP). It stores historical data from multiple sources in a structured format designed for reporting and analysis.' },
      { type: 'table', id: 'sd7-oltp-olap', headers: ['Feature', 'OLTP (Operational DB)', 'OLAP (Data Warehouse)'], rows: [['Purpose', 'Run the business (transactions)', 'Analyze the business (reporting)'], ['Queries', 'Simple, fast, many small transactions', 'Complex aggregations, large scans'], ['Data', 'Current, operational', 'Historical, summarized'], ['Normalization', 'Highly normalized (3NF)', 'Denormalized (star/snowflake schema)'], ['Users', 'Thousands of operational users', 'Hundreds of analysts/managers'], ['Examples', 'MySQL, PostgreSQL (order entry)', 'Snowflake, Redshift, BigQuery']] },
      { type: 'heading', id: 'sd7-schema', level: 3, content: 'Star Schema — The Data Warehouse Pattern' },
      { type: 'code', id: 'sd7-star', lang: 'text', title: 'Star Schema Design', code: `# FACT TABLE (center): quantitative measurements
# sales_fact: date_key, product_key, store_key, units_sold, revenue

# DIMENSION TABLES (points of the star):
# dim_date:     date_key, date, month, quarter, year, is_holiday
# dim_product:  product_key, name, category, brand, price
# dim_store:    store_key, name, city, state, region

# Query pattern: JOIN fact with dimensions, then GROUP BY/aggregate
# "Revenue by product category in Q3 2026" =
#   sales_fact ⋈ dim_date ⋈ dim_product
#   WHERE dim_date.quarter = 3 AND dim_date.year = 2026
#   GROUP BY dim_product.category` },
      // Doubt
      { type: 'callout', id: 'sd7-d1', calloutType: 'doubt', title: 'ETL vs ELT — what is the difference and which is better?', content: '**ETL** (Extract → Transform → Load): Transform data BEFORE loading into warehouse. Good when transformations are complex and you want clean data in the warehouse.\n**ELT** (Extract → Load → Transform): Load raw data FIRST, transform later INSIDE the warehouse. Modern approach — leverages powerful cloud warehouses (Snowflake, BigQuery) to do transformations at query time.\n\nFor ST-2: know both. ETL = traditional. ELT = modern cloud. The choice depends on warehouse compute power and data volume.' },
      // Exam
      { type: 'callout', id: 'sd7-exam', calloutType: 'exam', title: 'Exam Alert — ST-2', content: '1. **ETL phases**: Extract, Transform, Load — know what happens in each.\n2. **OLTP vs OLAP**: Transaction processing vs analytical processing.\n3. **Star Schema**: Fact table (center) + Dimension tables. Denormalized for query speed.\n4. **Data Warehouse vs Data Lake**: Warehouse = structured, processed. Lake = raw, all formats.\n5. **Python\'s role in ETL**: Pandas for transformation, SQLAlchemy for DB connections, Airflow for orchestration.' },
      // Bridge
      { type: 'callout', id: 'sd7-bridge', calloutType: 'bridge', title: 'Connect the Dots', content: 'Your Phase 1 Python skills (NumPy/Pandas Days 1-3) are the TRANSFORM step of ETL. Phase 2 Big Data tools (Hadoop/Spark Day 6) scale ETL to petabytes. The star schema design here mirrors how your Pandas groupby results would be stored in a production data warehouse.' },
      // Quick Ref
      { type: 'table', id: 'sd7-qref', headers: ['Concept', 'Key Point'], rows: [['Extract', 'Pull from sources: DB, CSV, API, streaming'], ['Transform', 'Clean, validate, join, aggregate — Pandas heavy'], ['Load', 'Write to warehouse: SQL, Parquet, cloud storage'], ['OLTP', 'Fast transactions. Normalized. Day-to-day operations.'], ['OLAP', 'Complex analytics. Denormalized. Star schema.'], ['Fact table', 'Quantitative measurements. Foreign keys to dimensions.'], ['Dimension table', 'Descriptive attributes. Product, date, store, customer.']] },
      // Quiz
      { type: 'quiz', id: 'sd7-quiz', title: 'Day 7 Quiz', questions: [
        { id: 'sd7-q1', question: 'What does the \'T\' in ETL stand for and what happens in this phase?', options: ['Transfer — move data between systems', 'Transform — clean, validate, enrich, and aggregate data', 'Test — verify data quality', 'Truncate — remove bad data'], correctIndex: 1, explanation: 'Transform is where the real work happens: cleaning missing values, validating data types, joining with reference tables, computing derived columns, and aggregating.' },
        { id: 'sd7-q2', question: 'What is the key difference between OLTP and OLAP systems?', options: ['OLTP uses SQL, OLAP does not', 'OLTP is for transactions (day-to-day ops), OLAP is for analytics (reporting)', 'OLAP is faster', 'There is no difference'], correctIndex: 1, explanation: 'OLTP = fast simple transactions (order entry). OLAP = complex analytical queries (monthly revenue by region). Different optimizations, different schemas.' },
        { id: 'sd7-q3', question: 'In a star schema, what goes in the FACT table?', options: ['Descriptive text like product names and categories', 'Quantitative measurements and foreign keys to dimensions', 'Only primary keys', 'Metadata about the schema'], correctIndex: 1, explanation: 'Fact tables contain measurements (sales amount, quantity) and foreign keys pointing to dimension tables (date_key, product_key). Dimensions contain the descriptive attributes.' },
      ] },
      // Flashcards
      { type: 'flashcard', id: 'sd7-cards', title: 'Day 7 Flashcards', cards: [
        { id: 'sd7-f1', front: 'ETL — what happens in each phase?', back: 'EXTRACT: pull from sources (DB, CSV, API). TRANSFORM: clean, validate, join, aggregate (Pandas heavy). LOAD: write to warehouse (SQL, Parquet). Python + Pandas = the Transform workhorse.', hint: 'Pull, clean, write...' },
        { id: 'sd7-f2', front: 'OLTP vs OLAP?', back: 'OLTP: fast transactions, normalized, current data, operational (MySQL). OLAP: complex queries, denormalized, historical data, analytical (Snowflake). Warehouse = OLAP.', hint: 'Transactions vs analytics...' },
        { id: 'sd7-f3', front: 'Star schema structure?', back: 'FACT table (center): measurements + foreign keys. DIMENSION tables (points): descriptive attributes (date, product, store, customer). Denormalized for fast analytical queries.', hint: 'Center + points...' },
      ] },
      { type: 'practice', id: 'sd7-p1', lang: 'python', title: 'Practice: Build an ETL Pipeline', starter: `import pandas as pd
import numpy as np

# Simulate raw data with quality issues
raw = pd.DataFrame({
    'order_id': [1, 2, 3, 4, 5, 6],
    'date': ['2026-01-01', '2026-01-01', '2026-01-02', 'bad_date', '2026-01-02', '2026-01-03'],
    'product': ['A', 'B', 'A', 'C', 'B', 'A'],
    'quantity': [2, -1, 3, 1, 0, 5],  # negative and zero!
    'price': [100, 200, 100, 150, 200, None]  # missing price!
})

# TODO: Build ETL pipeline
# EXTRACT: already done (raw df)
# TRANSFORM:
#   1. Remove rows with invalid dates
#   2. Remove rows with quantity <= 0
#   3. Fill missing price with median price
#   4. Compute revenue = quantity * price
# LOAD: Print cleaned DataFrame`, hint: 'pd.to_datetime(raw[\'date\'], errors=\'coerce\') then dropna. Filter: quantity > 0. Fill price: raw[\'price\'].fillna(raw[\'price\'].median()).' },
      { type: 'practice', id: 'sd7-p2', lang: 'python', title: 'Practice: Design a Star Schema', starter: `# Scenario: E-commerce analytics warehouse
# Business questions:
# - Daily revenue by product category
# - Monthly sales by region
# - Top 10 products by units sold

# TODO: Design a star schema with:
# - One FACT table for sales
# - At least 3 DIMENSION tables
# - List the columns for each table
# - Write the SQL/Pandas query for "daily revenue by category"`, hint: 'FACT: sales_fact (date_key, product_key, customer_key, units, revenue). DIM: dim_date, dim_product (with category), dim_customer (with region). Query: merge fact with dims, groupby date+category, sum revenue.' },
    ],
    tasks: [
      { id: 'sde-8-d7-t1', text: 'Build a mini ETL pipeline: extract from CSV/data, transform (clean+aggregate), load to a new DataFrame.', tag: 'lab' },
      { id: 'sde-8-d7-t2', text: 'Design a star schema for an e-commerce data warehouse. Identify fact and dimension tables.', tag: 'lab' },
      { id: 'sde-8-d7-t3', text: 'Compare OLTP vs OLAP. When would you use each?', tag: 'mcq' },
    ],
  },

  // DAY 8: Final Synthesis
  {
    id: 'sde-8-d8', number: 8,
    title: 'Final Mini-Project Synthesis', duration: 60,
    topics: ['Pipeline Integration', 'Statistical Analysis', 'Conceptual Warehouse'],
    blocks: [
      { type: 'callout', id: 'sd8-intro', calloutType: 'info', title: 'Putting It All Together', content: 'Today you will **integrate everything** from Days 1-7 into a conceptual end-to-end data engineering pipeline: ingest raw data → clean with Pandas → analyze with NumPy/stats → design a warehouse schema. This is the big picture that ST-1 and ST-2 test.' },
      { type: 'heading', id: 'sd8-pipeline', level: 2, content: 'The End-to-End Data Engineering Pipeline' },
      { type: 'paragraph', id: 'sd8-pipe-p', content: 'A real data engineering pipeline connects all the concepts you learned. Here is the complete flow mapped to SDE days:' },
      { type: 'list', id: 'sd8-flow', listStyle: 'number', items: ['**Ingest** (Day 5-6): Raw data from CSV, APIs, or streaming (Kafka). Stored in Data Lake (HDFS/S3).', '**Clean & Transform** (Day 2-3): Pandas handles missing values, type conversions, joins, and aggregations. At scale: Spark does the same across clusters.', '**Analyze** (Day 1, 4): NumPy for statistical computations. Hypothesis testing to validate insights.', '**Store** (Day 7): Clean data loaded into a Data Warehouse (star schema) for BI tools and dashboards.', '**Orchestrate** (Bonus): Airflow schedules and monitors the pipeline. Runs daily/weekly.'] },
      { type: 'heading', id: 'sd8-mapping', level: 2, content: 'SDE Day → Pipeline Component Mapping' },
      { type: 'table', id: 'sd8-mapping-table', headers: ['Pipeline Step', 'SDE Day(s)', 'Tools'], rows: [['Data Generation', 'Day 1 (NumPy random)', 'NumPy distributions for simulation'], ['Data Wrangling', 'Day 2-3 (Pandas)', 'Pandas for cleaning, merging, grouping'], ['Statistical Analysis', 'Day 4 (Statistics)', 'scipy.stats for hypothesis testing'], ['Big Data Storage', 'Day 5-6 (Hadoop/Spark)', 'HDFS for storage, Spark for distributed processing'], ['ETL Pipeline', 'Day 7 (ETL)', 'Extract → Transform → Load workflow'], ['Data Warehouse', 'Day 7 (Warehousing)', 'Star schema. OLAP for analytics.']] },
      { type: 'heading', id: 'sd8-exam', level: 2, content: 'Exam Readiness Checklist' },
      { type: 'table', id: 'sd8-checklist', headers: ['Exam', 'Focus Days', 'MCQ Topics', 'Coding Topics'], rows: [['ST-1 (22 Aug)', 'Days 1-4', 'NumPy vs lists, mean vs median, .loc vs .iloc, CLT, p-value interpretation, Type I/II errors', 'NumPy array operations, Pandas cleaning (missing values, filtering, groupby), t-test'], ['ST-2 (21 Nov)', 'Days 5-8', '5Vs, vertical vs horizontal scaling, MapReduce phases, Spark vs Hadoop, ETL phases, OLTP vs OLAP, star schema', 'MapReduce simulation, ETL pipeline code, Star schema design']] },
      // Final Review
      { type: 'callout', id: 'sd8-review', calloutType: 'success', title: '🎉 8-Day SDE Speedrun — Complete!', content: '**Phase 1 (Days 1-4)**: NumPy arrays + stats, Pandas wrangling, groupby/pivot/merge, hypothesis testing + CLT.\n**Phase 2 (Days 5-8)**: Big Data (5Vs, scaling), Hadoop ecosystem + MapReduce, Spark in-memory processing, ETL pipelines, Data Warehouse design.\n\n**ST-1 Preparation (15 coding marks)**:\n- NumPy: create arrays, compute statistics, generate distributions.\n- Pandas: load data, clean missing values, filter with conditions, groupby + aggregate.\n- Stats: run a t-test, interpret p-value, state hypotheses.\n\n**ST-2 Preparation (15 coding marks)**:\n- MapReduce: explain map/shuffle/reduce with an example.\n- ETL: write a Python ETL pipeline for a given dataset.\n- Warehouse: design a star schema for a business scenario.\n\n**MCQ success tip**: The theory-heavy days (4, 5, 6, 7) have the most MCQs. Review the quick-ref tables and flashcards.' },
      // Bridge
      { type: 'callout', id: 'sd8-bridge', calloutType: 'bridge', title: 'Connect the Dots — Beyond This Course', content: 'These skills map directly to real-world roles:\n- **Data Engineer**: ETL pipelines, Spark, Airflow, data warehouses.\n- **Data Analyst**: Pandas, SQL, visualization, statistics.\n- **ML Engineer**: NumPy + Pandas for feature engineering, Spark MLlib for distributed training.\nThe Python data stack (NumPy→Pandas→Scipy) is the #1 job skill in data science. Keep practicing on Kaggle datasets.' },
      // Quick Ref: Full Course
      { type: 'table', id: 'sd8-qref', headers: ['Quick Ref', 'Syntax/Answer'], rows: [['NumPy mean', 'np.mean(arr) — axis=0 for columns'], ['Pandas read CSV', 'pd.read_csv(\'file.csv\')'], ['Filter rows', 'df[(df.a>5) & (df.b<10)]'], ['GroupBy + agg', 'df.groupby(\'col\').agg({\'a\':\'mean\',\'b\':\'sum\'})'], ['t-test', 'stats.ttest_1samp(data, population_mean)'], ['CLT', 'Sample means → normal as n→∞'], ['p < 0.05', 'Reject H0 — statistically significant'], ['5Vs', 'Volume, Velocity, Variety, Veracity, Value'], ['Spark > MR', 'In-memory vs disk-based'], ['ETL phases', 'Extract → Transform → Load'], ['Star Schema', 'Fact (center) + Dimensions (points)']] },
      // Quiz: Full Course Review
      { type: 'quiz', id: 'sd8-quiz', title: 'SDE Course Review Quiz', questions: [
        { id: 'sd8-q1', question: 'What Python library would you use for statistical hypothesis testing?', options: ['NumPy', 'Pandas', 'SciPy (scipy.stats)', 'Matplotlib'], correctIndex: 2, explanation: 'SciPy\'s stats module provides t-tests, ANOVA, chi-square, and more. NumPy handles basic stats (mean, std). Pandas handles data manipulation.' },
        { id: 'sd8-q2', question: 'Which tool keeps intermediate data in memory for faster iterative processing?', options: ['Hadoop MapReduce', 'Apache Spark', 'HDFS', 'MySQL'], correctIndex: 1, explanation: 'Spark keeps intermediate results in RAM across pipeline steps. MapReduce writes to disk between each step.' },
        { id: 'sd8-q3', question: 'What is the correct order of an ETL pipeline?', options: ['Load → Transform → Extract', 'Extract → Transform → Load', 'Transform → Extract → Load', 'Extract → Load → Transform'], correctIndex: 1, explanation: 'Extract (pull data), Transform (clean/enrich), Load (write to warehouse). Modern ELT does Extract → Load → Transform using cloud warehouse compute.' },
        { id: 'sd8-q4', question: 'In a star schema, what type of table stores quantitative measurements?', options: ['Dimension table', 'Fact table', 'Reference table', 'Bridge table'], correctIndex: 1, explanation: 'Fact tables store measurements (sales amounts, quantities) and foreign keys. Dimension tables store descriptive attributes (names, categories, dates).' },
      ] },
      // Flashcards: Full Course
      { type: 'flashcard', id: 'sd8-cards', title: 'SDE Course Flashcards', cards: [
        { id: 'sd8-f1', front: 'NumPy vs Pandas — when to use each?', back: 'NumPy: numerical computing, arrays, stats on homogeneous data. Pandas: data wrangling, DataFrames, heterogeneous data, CSV/DB I/O. Pandas is built ON NumPy.', hint: 'Arrays vs DataFrames...' },
        { id: 'sd8-f2', front: 'MapReduce vs Spark?', back: 'MapReduce: disk-based between steps, Java. Slower. Spark: in-memory, Python API (PySpark), 10-100x faster for iterative ML. Both process data distributed across clusters.', hint: 'Disk vs memory...' },
        { id: 'sd8-f3', front: 'Data Lake vs Data Warehouse?', back: 'Data Lake: raw data, all formats (structured + unstructured), schema-on-read, cheap storage (HDFS/S3). Data Warehouse: processed/clean data, structured, schema-on-write, optimized for analytics.', hint: 'Raw vs processed...' },
      ] },
      { type: 'practice', id: 'sd8-p1', lang: 'python', title: 'Final Project: End-to-End Pipeline', starter: `# Build a complete data pipeline
# Scenario: Analyze student performance data

import numpy as np
import pandas as pd
np.random.seed(42)

# === STEP 1: INGEST (simulate raw data) ===
n = 200
df = pd.DataFrame({
    'student_id': range(1, n+1),
    'branch': np.random.choice(['AIML','CSE','ECE','ME'], n),
    'semester': np.random.choice([1,2,3,4], n),
    'marks': np.random.normal(75, 12, n),
    'hours_studied': np.random.normal(20, 8, n)
})
# Add some messiness: missing values, outliers
df.loc[np.random.choice(n, 10), 'marks'] = np.nan
df.loc[np.random.choice(n, 5), 'hours_studied'] = 999  # outlier!

# TODO:
# STEP 2: CLEAN — fill missing marks, cap hours at 60
# STEP 3: TRANSFORM — add grade column (A/B/C/D/F based on marks)
# STEP 4: ANALYZE — avg marks by branch, correlation hours vs marks
# STEP 5: State a hypothesis and test it`, hint: 'Clean: fillna(median), clip hours to 60. Grade: pd.cut or np.select. Analyze: groupby branch marks.mean(), df[[\'hours\',\'marks\']].corr(). Hypothesis: "AIML students score higher" — t-test between AIML and non-AIML.' },
    ],
    tasks: [
      { id: 'sde-8-d8-t1', text: 'Build the end-to-end pipeline: ingest messy data → clean → transform → analyze → report findings.', tag: 'lab' },
      { id: 'sde-8-d8-t2', text: 'Review all 8 days. Identify your 3 weakest topics. Revisit those flashcards and practice editors.', tag: 'review' },
      { id: 'sde-8-d8-t3', text: 'Create your own ST-1 mock: write 3 coding questions covering NumPy, Pandas, and Stats. Solve them timed.', tag: 'review' },
    ],
  },
];
