export type SessionFilter =
  | "all"
  | "upcoming"
  | "pending"
  | "completed"
  | "cancelled"
  | "rejected";

export interface Session {
  id: string;
  learnerId: string;
  mentorId: string;
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
  status: "upcoming" | "pending" | "completed" | "cancelled" | "rejected";
  role?: "mentor" | "learner";
  learnerName?: string;
  isStarted?: boolean;
  startedAt?: string;
}

export interface RescheduleRequest {
  id: string;
  sessionId: string;
  requestedById: string;
  requestedForId: string;
  mentorId: string;
  learnerId: string;
  topic: string;
  currentDate: string;
  currentTime: string;
  proposedDate: string;
  proposedTime: string;
  duration: string;
  status: "pending" | "accepted" | "rejected" | "cancelled" | "expired";
  createdAt: string;
  respondedAt?: string;
  reason?: string;
}

export interface SessionPdfNote {
  id: string;
  sessionId: string;
  mentorId: string;
  learnerId: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  uploadedAt: string;
}

export const sessions: Session[] = [
  {
    id: "1",
    learnerId: "chidvi",
    mentorId: "1",
    mentor: "Priya Sharma",
    learnerName: "Chidvi",
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
    role: "learner",
  },
  {
    id: "2",
    learnerId: "chidvi",
    mentorId: "2",
    mentor: "Rahul Verma",
    learnerName: "Chidvi",
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
    credits: 5,
    status: "pending",
    role: "learner",
  },
  {
    id: "3",
    learnerId: "chidvi",
    mentorId: "5",
    mentor: "Ananya Rao",
    learnerName: "Chidvi",
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
    credits: 5,
    status: "upcoming",
    role: "learner",
  },
  {
    id: "4",
    learnerId: "chidvi",
    mentorId: "6",
    mentor: "Karthik Kumar",
    learnerName: "Chidvi",
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
    credits: 5,
    status: "cancelled",
    role: "learner",
  },
  {
    id: "5",
    learnerId: "2",
    mentorId: "1",
    mentor: "Priya Sharma",
    learnerName: "Rahul Verma",
    mentorRole: "React Developer",
    mentorRating: 4.9,
    reviewCount: 42,
    teachingSkill: "React & Frontend Development",
    topic: "Advanced React Hooks & Custom Patterns",
    sessionDescription:
      "Deep dive into advanced hooks, custom hook architecture, and performance optimization in React applications.",
    learnerGoal:
      "I want to understand useCallback, useMemo and custom stateful hooks for building responsive UI components.",
    date: "August 25, 2026",
    time: "5:00 PM – 6:00 PM",
    duration: "60 minutes",
    credits: 5,
    status: "pending",
  },
  {
    id: "6",
    learnerId: "4",
    mentorId: "2",
    mentor: "Rahul Verma",
    learnerName: "Arjun Mehta",
    mentorRole: "AI / ML Engineer",
    mentorRating: 4.8,
    reviewCount: 28,
    teachingSkill: "Machine Learning & Python",
    topic: "Intro to PyTorch & Neural Networks",
    sessionDescription:
      "Build neural networks from scratch, backpropagation, and training your first PyTorch model.",
    learnerGoal:
      "Looking to build a neural network for sentiment analysis with Python.",
    date: "August 28, 2026",
    time: "4:00 PM – 5:00 PM",
    duration: "60 minutes",
    credits: 5,
    status: "pending",
  },
];
