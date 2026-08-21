import { useParams } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import BackButton from "./BackButton";
import ProfileHeader from "./ProfileHeader";
import AboutCard from "./AboutCard";
import SkillsSection from "./SkillsSection";
import ReviewsSection from "./ReviewsSection";
import RequestSessionCard from "./RequestSessionCard";

const ProfileLayout = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById, currentUser } = useSessions();
  const mentor = (id && id !== "me" ? getUserById(id) : currentUser) || currentUser;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Topbar />

        <BackButton />

        <div className="mt-8 grid gap-8 xl:grid-cols-[2fr_1fr]">
          {/* Left Section */}
          <div className="space-y-8">
            <ProfileHeader mentor={mentor} />

            <AboutCard mentor={mentor} />

            <SkillsSection mentor={mentor} />

            <ReviewsSection user={mentor} />
          </div>

          {/* Right Section */}
          <div>
            <RequestSessionCard mentor={mentor} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;