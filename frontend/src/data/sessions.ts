export type SessionFilter =
  | "all"
  | "upcoming"
  | "pending"
  | "completed"
  | "cancelled";

export interface Session {
  id: string;
  mentor: string;
  mentorRole: string;
  mentorRating: number;
  reviewCount: number;
  mentorAvatar?: string;
  teachingSkill: string;
  topic: string;
  sessionDescription: string;
  learnerGoal: string;
  date: string;
  time: string;
  duration: string;
  credits: number;
  status: "upcoming" | "pending" | "completed" | "cancelled";
}

export const sessions: Session[] = [
  {
    id: "1",
    mentor: "Priya Sharma",
    mentorRole: "React Developer",
    mentorRating: 4.9,
    reviewCount: 42,
    teachingSkill: "React & Frontend Development",
    topic: "React Basics",
    sessionDescription:
      "Learn how to work with React Hooks, manage component state effectively, and understand common patterns used in modern React applications.",
    learnerGoal:
      "I want to understand useEffect, custom hooks, and how to structure state management properly in larger React applications.",
    date: "August 22, 2026",
    time: "5:00 PM – 6:00 PM",
    duration: "60 minutes",
    credits: 5,
    status: "upcoming",
  },
  {
    id: "2",
    mentor: "Rahul Verma",
    mentorRole: "AI / ML Engineer",
    mentorRating: 4.8,
    reviewCount: 28,
    teachingSkill: "Machine Learning & Python",
    topic: "Machine Learning Basics",
    sessionDescription:
      "Introduction to core machine learning concepts, supervised vs unsupervised learning, and building your first model using Scikit-Learn.",
    learnerGoal:
      "I want to get a solid grasp of classification algorithms and how to preprocess dataset features effectively.",
    date: "August 18, 2026",
    time: "11:00 AM – 12:30 PM",
    duration: "90 minutes",
    credits: 40,
    status: "pending",
  },
  {
    id: "3",
    mentor: "Ananya Reddy",
    mentorRole: "Senior Backend Architect",
    mentorRating: 5.0,
    reviewCount: 64,
    teachingSkill: "Distributed Systems & System Design",
    topic: "System Design Fundamentals",
    sessionDescription:
      "Deep dive into scalable backend architectures, load balancing, caching strategies, and database sharding principles.",
    learnerGoal:
      "Understand how to design a high-throughput, fault-tolerant distributed system for interview preparation.",
    date: "August 02, 2026",
    time: "4:30 PM – 5:30 PM",
    duration: "60 minutes",
    credits: 25,
    status: "completed",
  },
  {
    id: "4",
    mentor: "Kiran Kumar",
    mentorRole: "Competitive Programmer",
    mentorRating: 4.7,
    reviewCount: 35,
    teachingSkill: "Data Structures & Algorithms",
    topic: "DSA - Dynamic Programming",
    sessionDescription:
      "Master dynamic programming patterns, memoization, tabulation, and solve classic grid/knapsack problems.",
    learnerGoal:
      "Overcome difficulties in identifying recurrence relations and optimizing overlapping subproblems.",
    date: "July 28, 2026",
    time: "5:00 PM – 6:00 PM",
    duration: "60 minutes",
    credits: 25,
    status: "cancelled",
  },
];
