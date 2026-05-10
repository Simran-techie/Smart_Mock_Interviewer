// ============================================================
// App.jsx — Main app with page routing via state
// ============================================================

import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import InterviewForm from "./pages/InterviewForm";
import InterviewScreen from "./pages/InterviewScreen";
import ResultsPage from "./pages/ResultsPage";
import LoadingScreen from "./components/LoadingScreen";
import { getQuestionsForRole } from "./data/questions";
import { evaluateAllAnswers } from "./utils/evaluator";

// Page names for navigation
const PAGES = {
  LANDING: "landing",
  FORM: "form",
  INTERVIEW: "interview",
  LOADING: "loading",
  RESULTS: "results",
};

const App = () => {
  // Current page
  const [page, setPage] = useState(PAGES.LANDING);

  // Candidate info from form
  const [candidate, setCandidate] = useState(null);

  // Questions for the selected role
  const [questions, setQuestions] = useState([]);

  // User's answers
  const [answers, setAnswers] = useState([]);

  // Evaluation result
  const [evaluation, setEvaluation] = useState(null);

  /**
   * Called when user submits the interview form
   */
  const handleFormSubmit = (formData) => {
    setCandidate(formData);
    const roleQuestions = getQuestionsForRole(formData.role);
    setQuestions(roleQuestions);
    setPage(PAGES.INTERVIEW);
  };

  /**
   * Called when user finishes answering all questions
   */
  const handleInterviewComplete = (userAnswers) => {
    setAnswers(userAnswers);
    setPage(PAGES.LOADING);

    // Simulate AI processing delay for realism
    setTimeout(() => {
      const result = evaluateAllAnswers(userAnswers, questions);
      setEvaluation(result);
      setPage(PAGES.RESULTS);
    }, 3500);
  };

  /**
   * Reset everything and go back to landing
   */
  const handleRestart = () => {
    setCandidate(null);
    setQuestions([]);
    setAnswers([]);
    setEvaluation(null);
    setPage(PAGES.LANDING);
  };

  // Render the correct page
  return (
    <div className="font-sans antialiased">
      {page === PAGES.LANDING && (
        <LandingPage onStart={() => setPage(PAGES.FORM)} />
      )}

      {page === PAGES.FORM && (
        <InterviewForm
          onSubmit={handleFormSubmit}
          onBack={() => setPage(PAGES.LANDING)}
        />
      )}

      {page === PAGES.INTERVIEW && candidate && (
        <InterviewScreen
          candidate={candidate}
          questions={questions}
          onComplete={handleInterviewComplete}
        />
      )}

      {page === PAGES.LOADING && <LoadingScreen />}

      {page === PAGES.RESULTS && evaluation && (
        <ResultsPage
          candidate={candidate}
          evaluation={evaluation}
          answers={answers}
          questions={questions}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
