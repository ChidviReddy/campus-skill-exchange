export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  year: string;
  rating: number;
  reviewCount: number;
  credits: number;
  sessionsCount: number;
  avatar?: string;
  teachingSkill: string;
  teaches: string[];
  learns: string[];
  bio: string;
  experienceYears: string;
  projectsBuilt: string;
  languages: string;
}

export type Mentor = User;

export const mentors: User[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "React Developer",
    department: "Computer Science",
    year: "3rd Year",
    rating: 4.9,
    reviewCount: 42,
    credits: 35,
    sessionsCount: 38,
    avatar: "PS",
    teachingSkill: "React & Frontend Development",
    teaches: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript"],
    learns: ["Machine Learning", "Cloud Computing"],
    bio: "Hi! I'm Priya Sharma, a Computer Science student who enjoys teaching modern frontend development. I love helping students understand concepts through practical examples and hands-on coding sessions.",
    experienceYears: "2+ Years",
    projectsBuilt: "15+",
    languages: "English, Hindi",
  },
  {
    id: "2",
    name: "Rahul Verma",
    role: "AI / ML Engineer",
    department: "Electronics & Communication",
    year: "2nd Year",
    rating: 4.8,
    reviewCount: 28,
    credits: 35,
    sessionsCount: 24,
    avatar: "RV",
    teachingSkill: "Machine Learning & Python",
    teaches: ["Python", "DSA", "Machine Learning", "Scikit-Learn"],
    learns: ["Cloud", "DevOps"],
    bio: "Hi! I'm Rahul Verma. I specialize in Machine Learning pipelines and data analysis in Python. I break down mathematical algorithms into intuitive, practical building blocks.",
    experienceYears: "2 Years",
    projectsBuilt: "10+",
    languages: "English, Hindi",
  },
  {
    id: "3",
    name: "Sneha Reddy",
    role: "UI/UX Designer",
    department: "Computer Science",
    year: "4th Year",
    rating: 5.0,
    reviewCount: 56,
    credits: 35,
    sessionsCount: 45,
    avatar: "SR",
    teachingSkill: "UI/UX & Product Design",
    teaches: ["UI/UX", "Figma", "Design Systems", "Prototyping"],
    learns: ["Flutter", "React"],
    bio: "Hi! I'm Sneha Reddy, a UI/UX designer passionate about wireframing, design systems, and creating delightful user experiences that convert.",
    experienceYears: "3+ Years",
    projectsBuilt: "20+",
    languages: "English, Telugu",
  },
  {
    id: "4",
    name: "Arjun Mehta",
    role: "Backend Developer",
    department: "Information Technology",
    year: "3rd Year",
    rating: 4.7,
    reviewCount: 31,
    credits: 35,
    sessionsCount: 29,
    avatar: "AM",
    teachingSkill: "Java & Backend Architecture",
    teaches: ["Java", "Spring Boot", "SQL", "Microservices"],
    learns: ["React", "TypeScript"],
    bio: "Hi! I'm Arjun Mehta. I focus on building scalable backend architectures in Java and Spring Boot, optimizing database schemas, and writing clean REST APIs.",
    experienceYears: "2+ Years",
    projectsBuilt: "12+",
    languages: "English, Hindi",
  },
  {
    id: "5",
    name: "Ananya Rao",
    role: "Senior Backend Architect",
    department: "Computer Science",
    year: "4th Year",
    rating: 4.9,
    reviewCount: 40,
    credits: 35,
    sessionsCount: 33,
    avatar: "AR",
    teachingSkill: "System Design & Distributed Systems",
    teaches: ["System Design", "Distributed Systems", "Python", "Redis"],
    learns: ["UI/UX", "Product Management"],
    bio: "Hi! I'm Ananya Rao. I love high-throughput distributed systems, caching strategies, and turning complex architectures into easy-to-digest concepts.",
    experienceYears: "3 Years",
    projectsBuilt: "18+",
    languages: "English, Hindi",
  },
  {
    id: "6",
    name: "Karthik Kumar",
    role: "Competitive Programmer",
    department: "Electrical Engineering",
    year: "4th Year",
    rating: 4.8,
    reviewCount: 35,
    credits: 35,
    sessionsCount: 27,
    avatar: "KK",
    teachingSkill: "Data Structures & Algorithms",
    teaches: ["DSA", "Dynamic Programming", "C++", "Python"],
    learns: ["DevOps", "Cloud"],
    bio: "Hi! I'm Karthik Kumar. I help students grasp algorithmic problem solving, time-complexity analysis, and cracking competitive coding interviews.",
    experienceYears: "3+ Years",
    projectsBuilt: "14+",
    languages: "English, Tamil",
  },
  {
    id: "chidvi",
    name: "Chidvi",
    role: "Full-Stack Developer",
    department: "Computer Science",
    year: "3rd Year",
    rating: 4.9,
    reviewCount: 18,
    credits: 35,
    sessionsCount: 15,
    avatar: "CH",
    teachingSkill: "TypeScript & Web Engineering",
    teaches: ["TypeScript", "React", "Node.js"],
    learns: ["AI", "DevOps"],
    bio: "Hi! I'm Chidvi, a CS student exploring full-stack web applications and distributed systems.",
    experienceYears: "2 Years",
    projectsBuilt: "8+",
    languages: "English",
  },
];

export const users: User[] = mentors;

export const getUserById = (id: string | undefined): User | undefined => {
  if (!id) return undefined;
  return users.find((u) => u.id === String(id));
};

export const getMentorById = (id: string | undefined): User | undefined => {
  return getUserById(id);
};

export const getMentorByName = (name: string | undefined): User | undefined => {
  if (!name) return undefined;
  const cleanName = name.toLowerCase().trim();
  return users.find(
    (m) =>
      m.name.toLowerCase().trim() === cleanName ||
      cleanName.includes(m.name.toLowerCase().trim()) ||
      m.name.toLowerCase().trim().includes(cleanName)
  );
};
