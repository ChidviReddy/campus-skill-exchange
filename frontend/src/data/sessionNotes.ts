import type { Session } from "./sessions";

export interface SessionNote {
  sessionId: string;
  mentor: string;
  topic: string;
  date: string;
  duration: string;
  summary: string;
  keyTakeaways: string[];
  additionalNotes: string;
  mentorFeedback: string;
  recommendedResources: { title: string; type: string; url?: string }[];
}

export const sessionNotesData: Record<string, SessionNote> = {
  "3": {
    sessionId: "3",
    mentor: "Ananya Reddy",
    topic: "System Design Fundamentals",
    date: "August 02, 2026",
    duration: "60 minutes",
    summary:
      "Deep dive into high-availability architecture patterns, database scaling mechanisms (replication vs sharding), and caching tiers using Redis.",
    keyTakeaways: [
      "Distinguished between horizontal vs vertical scaling trade-offs and CAP theorem implications.",
      "Implemented a write-through vs cache-aside caching pattern diagram with Redis and CDN edge caching.",
      "Learned how database partitioning and consistent hashing prevent hot spots in distributed key-value stores.",
      "Explored load balancing algorithms including Least Connection and Round Robin with health checks.",
    ],
    additionalNotes:
      "Discussed interview strategies for designing a URL shortener like TinyURL and rate limiter using Token Bucket algorithm. Great progress on breaking down ambiguous system requirements into functional and non-functional specs.",
    mentorFeedback:
      "Strong analytical skills and good grasp of trade-offs. Spend more time practicing back-of-the-envelope calculations for storage and QPS estimation before diving into high-level diagrams.",
    recommendedResources: [
      { title: "Designing Data-Intensive Applications by Martin Kleppmann", type: "Book" },
      { title: "System Design Primer by Donne Martin", type: "GitHub Guide" },
      { title: "Redis Caching Strategies & Architecture Patterns", type: "Article" },
    ],
  },
  "1": {
    sessionId: "1",
    mentor: "Priya Sharma",
    topic: "React Basics",
    date: "August 22, 2026",
    duration: "60 minutes",
    summary:
      "Comprehensive review of React component hierarchy, Hook rules, state lifecycles, and modern patterns with useEffect and custom hooks.",
    keyTakeaways: [
      "Mastered useState and useReducer for managing local and complex component states.",
      "Learned clean dependency array management in useEffect to avoid infinite rendering loops.",
      "Extracted reusable business logic into clean custom hooks (useLocalStorage, useFetch).",
      "Understood React reconciliation, Virtual DOM diffing, and key prop importance in lists.",
    ],
    additionalNotes:
      "Built an interactive Todo dashboard with custom filtering and local storage persistence during the hands-on segment.",
    mentorFeedback:
      "Excellent grasp of JSX and state updates! Continue practicing component decomposition to keep components small, focused, and testable.",
    recommendedResources: [
      { title: "React Official Documentation & Interactive Tutorials", type: "Documentation" },
      { title: "Hooks In-Depth Guide & Common Gotchas", type: "Guide" },
    ],
  },
  "2": {
    sessionId: "2",
    mentor: "Rahul Verma",
    topic: "Machine Learning Basics",
    date: "August 18, 2026",
    duration: "90 minutes",
    summary:
      "Introduction to supervised machine learning pipelines, exploratory data analysis with Pandas, and classification using Scikit-Learn.",
    keyTakeaways: [
      "Understood feature engineering, imputation, one-hot encoding, and feature scaling with StandardScaler.",
      "Built and evaluated Logistic Regression and Random Forest models using accuracy, precision, recall, and F1-score.",
      "Explored bias-variance trade-off and hyperparameter tuning with GridSearchCV.",
      "Visualized confusion matrices and ROC-AUC curves for model performance comparison.",
    ],
    additionalNotes:
      "Worked through the classic Titanic survival dataset. Discussed real-world data drift and cross-validation techniques.",
    mentorFeedback:
      "Great curiosity and solid mathematical foundations. Keep practicing feature selection and interpretation of feature importance graphs.",
    recommendedResources: [
      { title: "Hands-On Machine Learning with Scikit-Learn and PyTorch", type: "Book" },
      { title: "Scikit-Learn Official User Guide & API Reference", type: "Documentation" },
    ],
  },
  "4": {
    sessionId: "4",
    mentor: "Kiran Kumar",
    topic: "DSA - Dynamic Programming",
    date: "July 28, 2026",
    duration: "60 minutes",
    summary:
      "In-depth session solving classic 1D and 2D dynamic programming patterns, focusing on state transitions and space optimization.",
    keyTakeaways: [
      "Formulated state transitions for 0/1 Knapsack, Longest Common Subsequence, and Coin Change.",
      "Learned how to derive top-down memoization from recursion and convert it into bottom-up tabulation.",
      "Applied space optimization techniques reducing O(N*M) space complexity to O(M) using rolling arrays.",
    ],
    additionalNotes:
      "Analyzed recurrence relations step-by-step. Solved 3 LeetCode Medium/Hard DP problems during live coding.",
    mentorFeedback:
      "Impressive speed in identifying overlapping subproblems. Focus on cleanly writing out the base cases before coding the loop iterations.",
    recommendedResources: [
      { title: "Grokking Dynamic Programming Patterns for Coding Interviews", type: "Course" },
      { title: "Dynamic Programming Roadmap & Problem Set", type: "Curated List" },
    ],
  },
};

export const getSessionNotes = (session: Session): SessionNote => {
  if (sessionNotesData[session.id]) {
    return sessionNotesData[session.id];
  }

  // Dynamic fallback for newly completed sessions
  return {
    sessionId: session.id,
    mentor: session.mentor,
    topic: session.topic,
    date: session.date,
    duration: session.duration,
    summary:
      session.sessionDescription ||
      `Comprehensive 1-on-1 mentorship session on ${session.topic} with ${session.mentor}.`,
    keyTakeaways: [
      `Reviewed core concepts and practical real-world patterns in ${session.topic}.`,
      "Walked through hands-on code examples and addressed key architectural questions.",
      `Achieved goal: "${session.learnerGoal || 'Learned practical skills and best practices'}"`,
      "Discussed performance considerations and continuous learning strategies.",
    ],
    additionalNotes: `Mentorship session focused on practical application of ${session.topic}. Discussed next steps, project ideas, and industry-standard workflows.`,
    mentorFeedback: `Great participation and active engagement throughout the session on ${session.topic}. Keep practicing the discussed patterns!`,
    recommendedResources: [
      { title: `${session.teachingSkill} Documentation & Reference Guide`, type: "Documentation" },
      { title: `Practical Projects & Exercises for ${session.topic}`, type: "Project Guide" },
    ],
  };
};
