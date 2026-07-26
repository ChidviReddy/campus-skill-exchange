import { Check, X } from "lucide-react";

const requests = [
  {
    id: 1,
    title: "DSA Doubt Session",
    requester: "Sneha R.",
  },
];

const PendingRequests = () => {
  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">
        Pending Requests
      </h2>

      <div className="mt-6 space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between rounded-xl p-2 transition hover:bg-violet-50"
          >
            <div>
              <h3 className="font-medium text-slate-800">
                {request.title}
              </h3>

              <p className="text-sm text-slate-500">
                requested by {request.requester}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition hover:bg-emerald-200">
                <Check size={18} />
              </button>

              <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-200">
                <X size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingRequests;