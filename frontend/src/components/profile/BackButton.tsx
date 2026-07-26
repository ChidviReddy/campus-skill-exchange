import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/explore")}
      className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
    >
      <ArrowLeft size={18} />
      Back to Explore
    </button>
  );
};

export default BackButton;