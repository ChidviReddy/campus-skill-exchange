import { useState, useMemo } from "react";
import { useSessions } from "@/hooks/useSessions";
import { getDayOfWeekFromDate } from "@/utils/sessionTime";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import ExploreHeader from "./ExploreHeader";
import SkillTabs from "./SkillTabs";
import ExploreFilters from "./ExploreFilters";
import UserGrid from "./UserGrid";

const ExploreLayout = () => {
  const { users, currentUser } = useSessions();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  const todayStr = new Date().toISOString().split("T")[0];
  const dayName = getDayOfWeekFromDate(todayStr);
  const currentDayOfWeek = dayName ? dayName.toLowerCase() : "";

  const isFiltered =
    searchQuery.trim().length > 0 ||
    selectedSkill !== "All" ||
    selectedDepartment !== "All" ||
    selectedYear !== "All" ||
    selectedRating !== "All" ||
    selectedAvailability !== "All" ||
    sortBy !== "recommended";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedSkill("All");
    setSelectedDepartment("All");
    setSelectedYear("All");
    setSelectedRating("All");
    setSelectedAvailability("All");
    setSortBy("recommended");
  };

  const normalizeDepartment = (dept: string | undefined): string => {
    if (!dept) return "";
    const d = dept.toLowerCase().trim();
    if (d === "cse" || d.includes("computer science") || d === "cs") return "CSE";
    if (d === "ece" || d.includes("electronics") || d === "ec") return "ECE";
    if (d === "eee" || d.includes("electrical") || d === "ee") return "EEE";
    if (d === "it" || d.includes("information technology")) return "IT";
    if (d === "mech" || d.includes("mechanical")) return "MECH";
    if (d === "civil" || d.includes("civil")) return "CIVIL";
    return dept.toUpperCase().trim();
  };

  const filteredUsers = useMemo(() => {
    // 1. Base eligibility: exclude current user and require teaching skills
    let result = users.filter(
      (user) => user.id !== currentUser.id && user.teaches && user.teaches.length > 0
    );

    // 2. Search filter: specifically by MENTOR/USER NAME with PREFIX matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((u) => u.name.toLowerCase().startsWith(q));
    }

    // 3. Department filter: exact normalized department matching
    if (selectedDepartment !== "All") {
      const targetDept = normalizeDepartment(selectedDepartment);
      result = result.filter(
        (u) => normalizeDepartment(u.department) === targetDept
      );
    }

    // 4. Skill tab filter
    if (selectedSkill !== "All") {
      const targetSkill = selectedSkill.toLowerCase();
      result = result.filter((u) => {
        const inTeaches = u.teaches?.some(
          (t) => t.toLowerCase() === targetSkill || t.toLowerCase().includes(targetSkill)
        );
        const inTeachingSkill = u.teachingSkill?.toLowerCase().includes(targetSkill);
        return inTeaches || inTeachingSkill;
      });
    }

    // 5. Year filter
    if (selectedYear !== "All") {
      result = result.filter((u) =>
        u.year.toLowerCase().includes(selectedYear.toLowerCase())
      );
    }

    // 6. Rating filter
    if (selectedRating !== "All") {
      const minRating = parseFloat(selectedRating);
      if (!isNaN(minRating)) {
        result = result.filter((u) => u.rating >= minRating);
      }
    }

    // 7. Availability filter
    if (selectedAvailability === "today") {
      result = result.filter((u) =>
        u.availability?.some(
          (a) => a.day.toLowerCase() === currentDayOfWeek && a.enabled
        )
      );
    } else if (selectedAvailability === "week") {
      result = result.filter((u) => u.availability?.some((a) => a.enabled));
    }

    // 8. Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "reviews") {
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "experience") {
        const expA = parseFloat(a.experienceYears) || 0;
        const expB = parseFloat(b.experienceYears) || 0;
        return expB - expA;
      }
      // default: recommended (preserve default order in users list)
      return 0;
    });

    return result;
  }, [
    users,
    currentUser.id,
    searchQuery,
    selectedSkill,
    selectedDepartment,
    selectedYear,
    selectedRating,
    selectedAvailability,
    sortBy,
    currentDayOfWeek,
  ]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <Topbar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search mentors by name..."
        />

        <ExploreHeader />

        <SkillTabs
          selectedSkill={selectedSkill}
          onSelectSkill={setSelectedSkill}
        />

        <ExploreFilters
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          selectedAvailability={selectedAvailability}
          onAvailabilityChange={setSelectedAvailability}
          sortBy={sortBy}
          onSortChange={setSortBy}
          isFiltered={isFiltered}
          onClearFilters={handleClearFilters}
          resultsCount={filteredUsers.length}
        />

        <UserGrid
          users={filteredUsers}
          isFiltered={isFiltered}
          onClearFilters={handleClearFilters}
        />
      </main>
    </div>
  );
};

export default ExploreLayout;