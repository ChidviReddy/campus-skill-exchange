import { useSessions } from "@/hooks/useSessions";
import UserCard from "./UserCard";

const UserGrid = () => {
  const { users, currentUser } = useSessions();
  const visibleMentors = users.filter(
    (user) => user.id !== currentUser.id && user.teaches && user.teaches.length > 0
  );

  return (
    <section className="mt-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleMentors.map((user) => (
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