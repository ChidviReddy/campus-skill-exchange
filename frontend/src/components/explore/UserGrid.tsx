import UserCard from "./UserCard";

const users = [
  {
    id: 1,
    name: "Priya Sharma",
    department: "CSE",
    year: "3rd Year",
    rating: 4.9,
    credits: 120,
    teaches: ["React", "TypeScript", "Next.js"],
    learns: ["Machine Learning"],
  },
  {
    id: 2,
    name: "Rahul Verma",
    department: "ECE",
    year: "2nd Year",
    rating: 4.8,
    credits: 95,
    teaches: ["Python", "DSA"],
    learns: ["Cloud"],
  },
  {
    id: 3,
    name: "Sneha Reddy",
    department: "CSE",
    year: "4th Year",
    rating: 5.0,
    credits: 180,
    teaches: ["UI/UX", "Figma"],
    learns: ["Flutter"],
  },
  {
    id: 4,
    name: "Arjun Mehta",
    department: "IT",
    year: "3rd Year",
    rating: 4.7,
    credits: 105,
    teaches: ["Java", "Spring Boot"],
    learns: ["React"],
  },
  {
    id: 5,
    name: "Ananya Rao",
    department: "CSE",
    year: "2nd Year",
    rating: 4.9,
    credits: 140,
    teaches: ["Machine Learning"],
    learns: ["UI/UX"],
  },
  {
    id: 6,
    name: "Karthik Kumar",
    department: "EEE",
    year: "4th Year",
    rating: 4.8,
    credits: 110,
    teaches: ["Python", "Data Science"],
    learns: ["DevOps"],
  },
];

const UserGrid = () => {
  return (
    <section className="mt-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            department={user.department}
            year={user.year}
            rating={user.rating}
            credits={user.credits}
            teaches={user.teaches}
            learns={user.learns}
          />
        ))}
      </div>
    </section>
  );
};

export default UserGrid;