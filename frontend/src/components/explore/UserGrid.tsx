import { mentors } from "@/data/mentors";
import UserCard from "./UserCard";

const UserGrid = () => {
  return (
    <section className="mt-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mentors.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
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