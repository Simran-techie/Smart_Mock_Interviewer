// ============================================================
// LandingPage.jsx — Hero section with animated entrance
// ============================================================

import { useEffect, useState } from "react";

const LandingPage = ({ onStart }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const roles = ["Frontend Developer", "Java Developer", "Data Analyst", "Python Developer", "DevOps Engineer"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: "🎯", title: "Role-Specific Questions", desc: "Tailored questions for your exact tech stack and domain" },
    { icon: "⏱️", title: "Timed Responses", desc: "Practice under realistic interview pressure with countdown timer" },
    { icon: "🤖", title: "AI Evaluation", desc: "Instant smart feedback on technical depth and communication" },
    { icon: "📊", title: "Detailed Report", desc: "Download a full PDF report with scores and suggestions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center text-sm">🎯</div>
          <span className="text-white font-bold text-lg tracking-tight">MockAI</span>
        </div>
        <button
          onClick={onStart}
          className="text-sm text-blue-300 hover:text-white border border-blue-500/40 hover:border-blue-400 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-500/10"
        >
          Get Started →
        </button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-24 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium px-4 py-2 rounded-full mb-8 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          AI-Powered Interview Practice — Free & Instant
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "0.1s" }}
        >
          Ace Your Next
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Tech Interview
          </span>
        </h1>

        {/* Rotating role */}
        <div
          className="text-xl md:text-2xl text-slate-400 mb-4 h-8 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "0.2s" }}
        >
          Practice as a{" "}
          <span
            key={currentRole}
            className="text-cyan-300 font-semibold"
            style={{ animation: "fadeSlideIn 0.4s ease" }}
          >
            {roles[currentRole]}
          </span>
        </div>

        <p
          className="text-slate-400 text-lg max-w-2xl leading-relaxed mb-10 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "0.3s" }}
        >
          Get role-specific technical questions, answer under real time pressure, and receive detailed AI feedback — all in your browser, no sign-up needed.
        </p>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row gap-4 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "0.4s" }}
        >
          <button
            onClick={onStart}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-105 hover:shadow-blue-500/40"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Interview
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
          <button className="text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 font-medium text-lg px-8 py-4 rounded-2xl transition-all duration-200">
            How it works ↓
          </button>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 mt-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "0.5s" }}
        >
          {[
            { value: "5+", label: "Tech Roles" },
            { value: "25+", label: "Questions" },
            { value: "AI", label: "Evaluation" },
            { value: "PDF", label: "Reports" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Features grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-center text-slate-400 text-sm font-semibold uppercase tracking-widest mb-10">Everything you need to prepare</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-white/5 hover:bg-white/8 border border-white/10 hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{ animation: `fadeSlideIn 0.5s ease ${i * 0.1}s both` }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
