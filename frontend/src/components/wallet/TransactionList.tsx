import TransactionCard from "./TransactionCard";

const TransactionList = () => {
  return (
    <section className="space-y-6">

      <TransactionCard
        type="earned"
        title="Referral Bonus"
        description="You earned credits for referring a new learner."
        credits={25}
        date="Today"
      />

      <TransactionCard
        type="spent"
        title="Advanced React Mentorship"
        description="Credits used to book a 60-minute mentorship session."
        credits={40}
        date="Yesterday"
      />

      <TransactionCard
        type="refund"
        title="Session Refund"
        description="Credits refunded after mentor cancelled the session."
        credits={25}
        date="2 days ago"
      />

      <TransactionCard
        type="spent"
        title="System Design Session"
        description="Credits used for a premium mentorship session."
        credits={60}
        date="5 days ago"
      />

      <TransactionCard
        type="purchase"
        title="Credit Purchase"
        description="Successfully purchased additional credits."
        credits={100}
        date="1 week ago"
      />

    </section>
  );
};

export default TransactionList;