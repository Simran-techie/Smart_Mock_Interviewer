// ============================================================
// InterviewForm.jsx — Candidate details form with validation
// ============================================================

import { useState } from "react";

const ROLES = [
  "Frontend Developer",
  "Java Developer",
  "Data Analyst",
  "Python Developer",
  "DevOps Engineer",
];

const EXPERIENCE_LEVELS = [
  { value: "Fresher", label: "Fresher (0 years)", icon: "🌱" },
  { value: "1 Year", label: "1 Year Experience", icon: "📈" },
  { value: "2+ Years", label: "2+ Years Experience", icon: "🚀" },
];

const InterviewForm = ({ onSubmit, onBack }) => {
  const [form, setForm] = useState({ name: "", role: "", experience: "" });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your full name";
    else if (form.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!form.role) newErrors.role = "Please select a job role";
    if (!form.experience) newErrors.experience = "Please select experience level";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit(form);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Home
        </button>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl" style={{ animation: "fadeSlideIn 0.4s ease" }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-blue-500/20">
              📋
            </div>
            <h1 className="text-2xl font-black text-white mb-2">Set Up Your Interview</h1>
            <p className="text-slate-400 text-sm">Fill in your details to get personalized questions</p>
          </div>

          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className={`relative rounded-xl border transition-all duration-200 ${
              errors.name ? "border-red-500/60 bg-red-500/5" :
              focused === "name" ? "border-blue-500/60 bg-blue-500/5" :
              "border-white/10 bg-white/5"
            }`}>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">👤</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-transparent text-white placeholder-slate-500 pl-11 pr-4 py-3.5 rounded-xl outline-none text-sm"
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {errors.name}
              </p>
            )}
          </div>

          {/* Job Role */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Job Role <span className="text-red-400">*</span>
            </label>
            <div className={`relative rounded-xl border transition-all duration-200 ${
              errors.role ? "border-red-500/60 bg-red-500/5" :
              focused === "role" ? "border-blue-500/60 bg-blue-500/5" :
              "border-white/10 bg-white/5"
            }`}>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">💼</span>
              <select
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value)}
                onFocus={() => setFocused("role")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent text-white pl-11 pr-4 py-3.5 rounded-xl outline-none text-sm appearance-none cursor-pointer"
                style={{ colorScheme: "dark" }}
              >
                <option value="" disabled className="bg-slate-800">Select a role...</option>
                {ROLES.map((r) => (
                  <option key={r} value={r} className="bg-slate-800">{r}</option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▾</span>
            </div>
            {errors.role && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {errors.role}
              </p>
            )}
          </div>

          {/* Experience Level */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Experience Level <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {EXPERIENCE_LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => handleChange("experience", level.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                    form.experience === level.value
                      ? "border-blue-500 bg-blue-500/15 text-white shadow-md shadow-blue-500/10"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/8"
                  }`}
                >
                  <span className="text-xl">{level.icon}</span>
                  <span className="text-xs font-medium text-center leading-tight">{level.label}</span>
                </button>
              ))}
            </div>
            {errors.experience && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {errors.experience}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 text-base"
          >
            🚀 Start My Interview
          </button>

          <p className="text-center text-slate-500 text-xs mt-4">
            5 questions • ~10 minutes • Instant AI feedback
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InterviewForm;
