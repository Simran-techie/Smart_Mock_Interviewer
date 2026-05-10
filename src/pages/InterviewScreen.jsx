// ============================================================
// InterviewScreen.jsx — Main interview Q&A screen
// ============================================================

import { useState, useEffect, useCallback } from "react";
import useTimer from "../hooks/useTimer";

const QUESTION_TIME = 120; // 2 minutes per question

const InterviewScreen = ({ candidate, questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [phase, setPhase] = useState("reading"); // reading | answering
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Called when timer runs out
  const handleTimeUp = useCallback(() => {
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
      goToNext();
    }, 1500);
  }, [currentIndex]);

  const timer = useTimer(QUESTION_TIME, handleTimeUp);

  // Start timer when answering phase begins
  useEffect(() => {
    if (phase === "answering") {
      timer.restart(QUESTION_TIME);
    }
    // eslint-disable-next-line
  }, [phase, currentIndex]);

  const startAnswering = () => {
    setPhase("answering");
  };

  const goToNext = useCallback(() => {
    // Save answer
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    if (currentIndex + 1 >= questions.length) {
      // All done — evaluate
      onComplete(updatedAnswers);
      return;
    }

    // Animate transition
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setCurrentAnswer("");
      setPhase("reading");
      timer.reset();
      setIsAnimating(false);
    }, 400);
  }, [answers, currentAnswer, currentIndex, questions.length, onComplete, timer]);

  const handleAnswerChange = (e) => setCurrentAnswer(e.target.value);

  const progress = ((currentIndex) / questions.length) * 100;
  const completedProgress = ((currentIndex + (phase === "answering" ? 0.5 : 0)) / questions.length) * 100;

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  // Timer color
  const timerColor = timer.isDanger
    ? "text-red-400"
    : timer.isWarning
    ? "text-amber-400"
    : "text-cyan-400";

  const timerBgColor = timer.isDanger
    ? "bg-red-500"
    : timer.isWarning
    ? "bg-amber-400"
    : "bg-cyan-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/3 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-sm">🎯</div>
              <div>
                <div className="text-white font-bold text-sm">{candidate.name}</div>
                <div className="text-slate-400 text-xs">{candidate.role} · {candidate.experience}</div>
              </div>
            </div>

            {/* Timer */}
            {phase === "answering" && (
              <div className={`flex items-center gap-2 ${timerColor} font-mono font-bold text-lg`}>
                <span className={`w-2 h-2 rounded-full ${timerBgColor} ${timer.isDanger ? "animate-ping" : "animate-pulse"}`} />
                {timer.formatted}
              </div>
            )}

            <div className="text-slate-400 text-sm font-medium">
              Q{currentIndex + 1} / {questions.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
              style={{ width: `${completedProgress}%` }}
            />
          </div>

          {/* Question pills */}
          <div className="flex gap-2 mt-3">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  i < currentIndex
                    ? "bg-cyan-400"
                    : i === currentIndex
                    ? "bg-blue-400"
                    : "bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Time up warning */}
      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-amber-500/20 border border-amber-500/40 rounded-2xl px-10 py-8 text-center" style={{ animation: "popIn 0.3s ease" }}>
            <div className="text-4xl mb-3">⏰</div>
            <div className="text-white font-bold text-xl">Time's Up!</div>
            <div className="text-amber-300 text-sm mt-1">Moving to next question...</div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <div
          className="h-full"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateX(30px)" : "translateX(0)",
            transition: "all 0.4s ease",
          }}
        >
          {/* Category badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span>📚</span> {question.category}
          </div>

          {/* Question card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-md shadow-blue-500/20">
                {currentIndex + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-white text-xl font-bold leading-relaxed">
                  {question.question}
                </h2>
              </div>
            </div>
          </div>

          {/* Reading phase */}
          {phase === "reading" && (
            <div className="text-center">
              <p className="text-slate-400 mb-6 text-sm">
                Read the question carefully. When you're ready, click below to start your 2-minute timer.
              </p>
              <button
                onClick={startAnswering}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 text-base"
              >
                ▶ I'm Ready — Start Timer
              </button>
            </div>
          )}

          {/* Answering phase */}
          {phase === "answering" && (
            <div>
              {/* Timer bar */}
              <div className="w-full bg-white/10 rounded-full h-1 mb-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 linear ${timerBgColor}`}
                  style={{ width: `${timer.percentage}%` }}
                />
              </div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Your Answer
              </label>
              <textarea
                value={currentAnswer}
                onChange={handleAnswerChange}
                placeholder="Type your answer here... Be as detailed as possible. Use technical terms relevant to the question."
                autoFocus
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500/60 focus:bg-blue-500/5 text-white placeholder-slate-500 rounded-2xl p-5 min-h-[180px] resize-none outline-none text-sm leading-relaxed transition-all duration-200"
              />

              {/* Word count */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-slate-500 text-xs">
                  {currentAnswer.trim().split(/\s+/).filter(Boolean).length} words
                  {currentAnswer.trim().split(/\s+/).filter(Boolean).length < 20 && (
                    <span className="text-amber-400 ml-2">· Aim for 30+ words for a better score</span>
                  )}
                </span>

                <button
                  onClick={goToNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 text-sm"
                >
                  {isLast ? "✅ Submit & Get Results" : "Next Question →"}
                </button>
              </div>

              {/* Skip */}
              <div className="text-center mt-4">
                <button
                  onClick={goToNext}
                  className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
                >
                  Skip this question →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default InterviewScreen;
