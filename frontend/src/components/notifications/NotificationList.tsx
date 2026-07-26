import NotificationCard from "./NotificationCard";

const NotificationList = () => {
  return (
    <section className="space-y-6">

      <NotificationCard
        type="session"
        title="Your React Hooks session starts in 30 minutes."
        description="Be ready to join your session with Priya Sharma."
        time="30 mins ago"
        unread
      />

      <NotificationCard
        type="request"
        title="Priya Sharma accepted your session request."
        description="Your mentorship session has been scheduled successfully."
        time="2 hours ago"
      />

      <NotificationCard
        type="review"
        title="How was your last session?"
        description="Leave a review and help other learners choose the right mentor."
        time="Yesterday"
      />

      <NotificationCard
        type="wallet"
        title="25 credits have been refunded."
        description="The cancelled session amount has been credited back to your wallet."
        time="2 days ago"
      />

      <NotificationCard
        type="declined"
        title="Rahul Verma declined your session request."
        description="Don't worry! Explore other mentors with similar expertise."
        time="3 days ago"
      />

    </section>
  );
};

export default NotificationList;