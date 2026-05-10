// ============================================================
// ResultsPage.jsx — Beautiful results dashboard
// ============================================================

import { useEffect, useState } from "react";
import { getGrade, getScoreColor } from "../utils/evaluator";
import { generatePDFReport } from "../utils/pdfReport";

// Circular progress ring component
const CircularScore = ({ score, size = 160, strokeWidth = 12 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 10) * circumference;
  const color = getScoreColor(animatedScore);

  useEffect(() => {
    let current = 0;
    const step = score / 40;
    const interval = setInterval(() => {
      current = Math.min(current + step, score);
      setAnimatedScore(parseFloat(current.toFixed(1)));
      if (current >= score) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [score]);

  const { grade, label } = getGrade(score);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: "stroke-dashoffset 0.05s linear, stroke 0.3s ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-black text-white">{animatedScore.toFixed(1)}</div>
        <div className="text-slate-400 text-xs">/10</div>
        <div className="text-xs font-bold mt-1" style={{ color }}>{grade}</div>
      </div>
    </div>
  );
};

// Rating bar component
const RatingBar = ({ label, score, icon, delay = 0 }) => {
  const [width, setWidth] = useState(0);
  const color = getScoreColor(score);

  useEffect(() => {
    const t = setTimeout(() => setWidth((score / 10) * 100), delay);
    return () => clearTimeout(t);
  }, [score, delay]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 w-36 flex-shrink-0">
        <span>{icon}</span>
        <span className="text-slate-300 text-sm font-medium">{label}</span>
      </div>
      <div className="flex-1 bg-white/10 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-white font-bold text-sm w-8 text-right" style={{ color }}>
        {score}
      </span>
    </div>
  );
};

const ResultsPage = ({ candidate, evaluation, answers, questions, onRestart }) => {
  const [visible, setVisible] = useState(false);
  const { grade, label } = getGrade(evaluation.overallScore);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleDownloadPDF = () => {
    generatePDFReport({
      name: candidate.name,
      role: candidate.role,
      experience: candidate.experience,
      evaluation,
      answers,
      questions,
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
  };

  const scoreColor = getScoreColor(evaluation.overallScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div
          className="text-center mb-10 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium px-4 py-2 rounded-full mb-6">
            <span>✅</span> Interview Complete
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Your Results</h1>
          <p className="text-slate-400">
            {candidate.name} · {candidate.role} · {candidate.experience}
          </p>
        </div>

        {/* Main score card */}
        <div
          className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-6 flex flex-col md:flex-row items-center gap-8 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "0.1s" }}
        >
          <div className="flex flex-col items-center gap-3">
            <CircularScore score={evaluation.overallScore} />
            <div className="text-center">
              <div className="text-white font-bold text-lg">{label}</div>
              <div className="text-slate-400 text-sm">Overall Performance</div>
            </div>
          </div>

          <div className="flex-1 space-y-5 w-full">
            <RatingBar label="Technical" score={evaluation.technicalScore} icon="⚙️" delay={400} />
            <RatingBar label="Communication" score={evaluation.communicationScore} icon="💬" delay={500} />
            <RatingBar label="Confidence" score={evaluation.confidenceScore} icon="💪" delay={600} />
          </div>
        </div>

        {/* Two column: Feedback + Suggestions */}
        <div
          className="grid md:grid-cols-2 gap-6 mb-6 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "0.2s" }}
        >
          {/* AI Feedback */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center text-sm">🤖</span>
              AI Feedback
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{evaluation.feedback}</p>
          </div>

          {/* Suggestions */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-7 h-7 bg-amber-500/20 rounded-lg flex items-center justify-center text-sm">💡</span>
              Improvement Tips
            </h3>
            <ul className="space-y-3">
              {evaluation.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-0.5 flex-shrink-0">→</span>
                  <span className="text-slate-300 text-sm leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Q&A Breakdown */}
        <div
          className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "0.3s" }}
        >
          <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
            <span className="w-7 h-7 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">📝</span>
            Question Breakdown
          </h3>
          <div className="space-y-4">
            {questions.map((q, i) => {
              const result = evaluation.detailedResults[i];
              const qColor = getScoreColor(result?.score || 0);
              return (
                <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-7 h-7 bg-blue-500/20 text-blue-300 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">
                        Q{i + 1}
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{q.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-lg font-black" style={{ color: qColor }}>{result?.score || 0}</span>
                      <span className="text-slate-500 text-sm">/10</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm font-medium mb-2">{q.question}</p>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {answers[i]?.trim() || <span className="italic text-slate-600">No answer provided</span>}
                    </p>
                  </div>
                  {result?.matchedKeywords?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.matchedKeywords.slice(0, 5).map((kw) => (
                        <span key={kw} className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "0.4s" }}
        >
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 text-sm"
          >
            <span>📄</span> Download PDF Report
          </button>
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 text-sm"
          >
            <span>🔄</span> Try Another Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
