// ============================================================
// questions.js — Predefined question sets per role
// ============================================================

export const questionBank = {
  "Frontend Developer": [
    {
      id: 1,
      question: "Explain the difference between var, let, and const in JavaScript. When would you use each?",
      keywords: ["var", "let", "const", "scope", "hoisting", "block", "function", "reassign", "temporal dead zone", "ES6"],
      category: "JavaScript",
    },
    {
      id: 2,
      question: "What is the Virtual DOM in React and how does it improve performance?",
      keywords: ["virtual dom", "reconciliation", "diffing", "real dom", "render", "state", "re-render", "fiber", "update", "performance"],
      category: "React",
    },
    {
      id: 3,
      question: "Explain CSS Flexbox and Grid. What are their main differences and when would you use each?",
      keywords: ["flexbox", "grid", "one-dimensional", "two-dimensional", "align", "justify", "container", "item", "row", "column", "gap", "layout"],
      category: "CSS",
    },
    {
      id: 4,
      question: "What are React Hooks? Explain useState and useEffect with examples.",
      keywords: ["hooks", "usestate", "useeffect", "functional component", "state", "side effect", "dependency array", "cleanup", "class component", "lifecycle"],
      category: "React",
    },
    {
      id: 5,
      question: "What is event delegation in JavaScript and why is it useful?",
      keywords: ["event delegation", "bubbling", "parent", "child", "listener", "propagation", "performance", "dynamic", "target", "DOM"],
      category: "JavaScript",
    },
  ],

  "Java Developer": [
    {
      id: 1,
      question: "Explain the four pillars of Object-Oriented Programming with examples in Java.",
      keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction", "class", "object", "interface", "extends", "override", "access modifier"],
      category: "OOPs",
    },
    {
      id: 2,
      question: "What is the difference between ArrayList and LinkedList in Java Collections?",
      keywords: ["arraylist", "linkedlist", "array", "node", "index", "insertion", "deletion", "search", "memory", "iterator", "collections", "list"],
      category: "Collections",
    },
    {
      id: 3,
      question: "Explain Exception Handling in Java. What is the difference between checked and unchecked exceptions?",
      keywords: ["try", "catch", "finally", "throw", "throws", "checked", "unchecked", "runtime", "compile", "exception", "error", "handle"],
      category: "Core Java",
    },
    {
      id: 4,
      question: "What is JDBC? Explain the steps to connect a Java application to a database.",
      keywords: ["jdbc", "connection", "drivermanager", "statement", "resultset", "preparedstatement", "url", "driver", "query", "close", "database", "sql"],
      category: "JDBC",
    },
    {
      id: 5,
      question: "What are Java Streams? Explain with an example of filtering and mapping a list.",
      keywords: ["stream", "filter", "map", "collect", "lambda", "functional", "pipeline", "terminal", "intermediate", "list", "forEach", "reduce"],
      category: "Java 8",
    },
  ],

  "Data Analyst": [
    {
      id: 1,
      question: "What is the difference between supervised and unsupervised machine learning? Give examples.",
      keywords: ["supervised", "unsupervised", "label", "classification", "regression", "clustering", "kmeans", "neural", "training", "prediction", "algorithm"],
      category: "ML Basics",
    },
    {
      id: 2,
      question: "Explain SQL JOIN types (INNER, LEFT, RIGHT, FULL). When would you use each?",
      keywords: ["inner join", "left join", "right join", "full join", "null", "matching", "table", "on", "foreign key", "relationship", "query"],
      category: "SQL",
    },
    {
      id: 3,
      question: "What is data normalization and why is it important in machine learning?",
      keywords: ["normalization", "scaling", "min-max", "standardization", "z-score", "range", "feature", "bias", "gradient", "outlier", "preprocessing"],
      category: "Data Processing",
    },
    {
      id: 4,
      question: "How would you handle missing values in a dataset? Explain different strategies.",
      keywords: ["missing", "null", "imputation", "mean", "median", "mode", "drop", "forward fill", "backward fill", "interpolation", "strategy", "pandas"],
      category: "Data Cleaning",
    },
    {
      id: 5,
      question: "What is a confusion matrix and how do you interpret precision, recall, and F1 score?",
      keywords: ["confusion matrix", "precision", "recall", "f1", "true positive", "false positive", "true negative", "false negative", "accuracy", "classification", "threshold"],
      category: "Evaluation Metrics",
    },
  ],

  "Python Developer": [
    {
      id: 1,
      question: "What are Python decorators? Write an example of a decorator that logs function calls.",
      keywords: ["decorator", "wrapper", "functools", "wraps", "function", "closure", "@", "higher order", "log", "return", "argument"],
      category: "Python Advanced",
    },
    {
      id: 2,
      question: "Explain the difference between a list, tuple, set, and dictionary in Python.",
      keywords: ["list", "tuple", "set", "dictionary", "mutable", "immutable", "ordered", "unordered", "key", "value", "duplicate", "index"],
      category: "Data Structures",
    },
    {
      id: 3,
      question: "What is a generator in Python? How is it different from a regular function?",
      keywords: ["generator", "yield", "iterator", "lazy", "memory", "next", "for loop", "iterable", "return", "state", "pause"],
      category: "Python Advanced",
    },
    {
      id: 4,
      question: "Explain Python's GIL (Global Interpreter Lock) and its impact on multi-threading.",
      keywords: ["GIL", "global interpreter lock", "thread", "multiprocessing", "concurrency", "cpu-bound", "io-bound", "parallel", "lock", "cpython"],
      category: "Concurrency",
    },
    {
      id: 5,
      question: "What are list comprehensions and generator expressions? Give examples of both.",
      keywords: ["list comprehension", "generator expression", "comprehension", "filter", "map", "for", "if", "memory", "iterable", "expression", "bracket"],
      category: "Python Basics",
    },
  ],

  "DevOps Engineer": [
    {
      id: 1,
      question: "Explain the CI/CD pipeline. What tools would you use to set one up?",
      keywords: ["ci", "cd", "continuous integration", "continuous delivery", "pipeline", "jenkins", "github actions", "gitlab", "build", "test", "deploy", "artifact"],
      category: "CI/CD",
    },
    {
      id: 2,
      question: "What is Docker? Explain the difference between an image and a container.",
      keywords: ["docker", "container", "image", "dockerfile", "layer", "run", "build", "registry", "hub", "volume", "network", "isolation"],
      category: "Docker",
    },
    {
      id: 3,
      question: "What is Kubernetes and how does it differ from Docker Compose?",
      keywords: ["kubernetes", "k8s", "pod", "node", "cluster", "deployment", "service", "orchestration", "scale", "docker compose", "container", "replicas"],
      category: "Kubernetes",
    },
    {
      id: 4,
      question: "What is Infrastructure as Code (IaC)? Explain Terraform or Ansible with an example.",
      keywords: ["infrastructure as code", "iac", "terraform", "ansible", "provision", "state", "module", "playbook", "declarative", "idempotent", "cloud"],
      category: "IaC",
    },
    {
      id: 5,
      question: "How would you monitor a production application? What metrics and tools would you use?",
      keywords: ["monitoring", "prometheus", "grafana", "alert", "metric", "log", "dashboard", "uptime", "latency", "cpu", "memory", "elk", "datadog"],
      category: "Monitoring",
    },
  ],
};

// Default fallback questions
export const defaultQuestions = [
  {
    id: 1,
    question: "Tell me about yourself and your professional background.",
    keywords: ["experience", "background", "skill", "work", "project", "team", "role", "year", "technology", "learn"],
    category: "General",
  },
  {
    id: 2,
    question: "What are your greatest strengths and how have they helped you in your work?",
    keywords: ["strength", "skill", "problem solving", "communication", "teamwork", "leadership", "analytical", "creative", "adapt"],
    category: "Behavioral",
  },
  {
    id: 3,
    question: "Describe a challenging project you worked on and how you overcame obstacles.",
    keywords: ["challenge", "overcome", "solution", "team", "deadline", "problem", "approach", "result", "learn", "communicate"],
    category: "Behavioral",
  },
  {
    id: 4,
    question: "Where do you see yourself in 5 years?",
    keywords: ["goal", "growth", "learn", "senior", "lead", "technology", "career", "skill", "contribute", "team"],
    category: "Career",
  },
  {
    id: 5,
    question: "Why are you interested in this role and what makes you a good fit?",
    keywords: ["interest", "passion", "skill", "experience", "fit", "contribute", "match", "value", "challenge", "opportunity"],
    category: "Motivation",
  },
];

export const getQuestionsForRole = (role) => {
  return questionBank[role] || defaultQuestions;
};
