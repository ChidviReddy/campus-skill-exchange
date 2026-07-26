import SessionCard from "./SessionCard";

const SessionList = () => {
  return (
    <section className="space-y-6">
      <SessionCard
        status="upcoming"
        mentor="Priya Sharma"
        topic="Advanced React Hooks"
        date="15 Aug 2026"
        time="3:00 PM"
        duration="60 Minutes"
        credits={25}
      />

      <SessionCard
        status="pending"
        mentor="Rahul Verma"
        topic="Machine Learning Basics"
        date="18 Aug 2026"
        time="11:00 AM"
        duration="90 Minutes"
        credits={40}
      />

      <SessionCard
        status="completed"
        mentor="Ananya Reddy"
        topic="System Design Fundamentals"
        date="02 Aug 2026"
        time="4:30 PM"
        duration="60 Minutes"
        credits={25}
      />

      <SessionCard
        status="cancelled"
        mentor="Kiran Kumar"
        topic="DSA - Dynamic Programming"
        date="28 Jul 2026"
        time="5:00 PM"
        duration="60 Minutes"
        credits={25}
      />
    </section>
  );
};

export default SessionList;