// ============================================================
// LoadingScreen.jsx — Evaluation loading animation
// ============================================================

import { useEffect, useState } from "react";

const steps = [
  { icon: "📋", label: "Analyzing your answers..." },
  { icon: "🔍", label: "Checking technical accuracy..." },
  { icon: "💬", label: "Evaluating communication..." },
  { icon: "📊", label: "Calculating your scores..." },
  { icon: "✨", label: "Generating feedback..." },
];

const LoadingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 600;
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 95));
    }, 60);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative z-10 text-center max-w-sm w-full">
        {/* Animated icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl animate-pulse opacity-30" />
          <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-4xl">
            🤖
          </div>
          {/* Spinning ring */}
          <svg className="absolute inset-0 w-24 h-24 animate-spin" style={{ animationDuration: "2s" }}>
            <circle
              cx="48" cy="48" r="44"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="3"
              strokeDasharray="60 220"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2 className="text-2xl font-black text-white mb-2">Evaluating Your Interview</h2>
        <p className="text-slate-400 text-sm mb-8">AI is reviewing all your answers</p>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 ${
                i === currentStep
                  ? "bg-blue-500/20 border border-blue-500/30 text-white"
                  : i < currentStep
                  ? "text-slate-500"
                  : "text-slate-600 opacity-50"
              }`}
            >
              <span className="text-base">{step.icon}</span>
              <span className="text-sm font-medium">{step.label}</span>
              {i < currentStep && <span className="ml-auto text-green-400 text-xs">✓</span>}
              {i === currentStep && (
                <div className="ml-auto flex gap-0.5">
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${dot * 0.15}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
