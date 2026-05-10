// ============================================================
// evaluator.js — Keyword-based answer evaluation logic
// ============================================================

/**
 * Evaluates a single answer against the expected keywords
 * Returns a score from 0-10
 */
export const evaluateAnswer = (answer, keywords) => {
  if (!answer || answer.trim().length === 0) return 0;

  const normalizedAnswer = answer.toLowerCase();
  const wordCount = answer.trim().split(/\s+/).length;

  // Count how many keywords are present in the answer
  const matchedKeywords = keywords.filter((kw) =>
    normalizedAnswer.includes(kw.toLowerCase())
  );

  const keywordScore = (matchedKeywords.length / keywords.length) * 10;

  // Bonus for length (detailed answers are better)
  let lengthBonus = 0;
  if (wordCount > 10) lengthBonus = 0.5;
  if (wordCount > 30) lengthBonus = 1;
  if (wordCount > 60) lengthBonus = 1.5;

  // Penalty for very short answers
  const lengthPenalty = wordCount < 5 ? -2 : 0;

  const rawScore = keywordScore + lengthBonus + lengthPenalty;
  const finalScore = Math.min(10, Math.max(0, rawScore));

  return {
    score: parseFloat(finalScore.toFixed(1)),
    matchedKeywords,
    wordCount,
  };
};

/**
 * Evaluates all answers and returns a full evaluation report
 */
export const evaluateAllAnswers = (answers, questions) => {
  const results = answers.map((answer, index) => {
    const question = questions[index];
    const evaluation = evaluateAnswer(answer, question.keywords);
    return {
      questionIndex: index,
      question: question.question,
      answer,
      ...evaluation,
    };
  });

  // Calculate overall score (average)
  const totalScore =
    results.reduce((sum, r) => sum + r.score, 0) / results.length;

  // Communication rating: based on avg word count
  const avgWordCount =
    results.reduce((sum, r) => sum + r.wordCount, 0) / results.length;
  const communicationScore = getCommunicationScore(avgWordCount);

  // Technical rating: based on keyword matching
  const avgKeywordMatch =
    results.reduce(
      (sum, r) => sum + r.matchedKeywords.length / Math.max(1, r.score),
      0
    ) / results.length;
  const technicalScore = Math.min(10, parseFloat((totalScore * 0.9 + avgKeywordMatch * 0.5).toFixed(1)));

  // Confidence rating: based on length and detail
  const confidenceScore = getConfidenceScore(avgWordCount, totalScore);

  // Generate feedback
  const feedback = generateFeedback(totalScore, communicationScore, technicalScore);
  const suggestions = generateSuggestions(results, totalScore);

  return {
    overallScore: parseFloat(totalScore.toFixed(1)),
    communicationScore: parseFloat(communicationScore.toFixed(1)),
    technicalScore: parseFloat(Math.min(10, technicalScore).toFixed(1)),
    confidenceScore: parseFloat(confidenceScore.toFixed(1)),
    feedback,
    suggestions,
    detailedResults: results,
  };
};

const getCommunicationScore = (avgWordCount) => {
  if (avgWordCount < 5) return 2;
  if (avgWordCount < 15) return 4;
  if (avgWordCount < 30) return 6;
  if (avgWordCount < 60) return 8;
  return 9.5;
};

const getConfidenceScore = (avgWordCount, totalScore) => {
  const base = totalScore * 0.7 + (avgWordCount > 20 ? 2 : 0.5);
  return Math.min(10, parseFloat(base.toFixed(1)));
};

const generateFeedback = (overall, communication, technical) => {
  if (overall >= 8) {
    return "Outstanding performance! You demonstrated strong technical knowledge and communicated your ideas clearly and confidently. Your answers were well-structured and showed deep understanding of the subject matter. You are well-prepared for this role.";
  } else if (overall >= 6) {
    return "Good performance overall! You showed solid understanding of core concepts and communicated reasonably well. There are a few areas where you could add more depth and technical detail to your answers, but you have a strong foundation to build upon.";
  } else if (overall >= 4) {
    return "Decent attempt! You demonstrated some familiarity with the topics, but your answers lacked depth in several areas. Focus on strengthening your understanding of key technical concepts and practice articulating your thoughts more clearly and with more detail.";
  } else if (overall >= 2) {
    return "You need more preparation for this role. Your answers were brief and missed many key technical concepts. We recommend revisiting the fundamentals and practicing your interview responses. Use specific examples and technical terminology in your answers.";
  } else {
    return "This role requires more preparation. Many of your answers were incomplete or missing. Focus on learning the core concepts, building projects to gain hands-on experience, and practicing answering questions out loud. Don't get discouraged — consistent practice will improve your performance significantly.";
  }
};

const generateSuggestions = (results, overall) => {
  const suggestions = [];

  // Find weakest answers
  const weakAnswers = results.filter((r) => r.score < 5);
  if (weakAnswers.length > 0) {
    const categories = [...new Set(weakAnswers.map((_, i) => results[i]?.category).filter(Boolean))];
    suggestions.push(
      `Revise topics: ${weakAnswers.map((_, i) => `Q${i + 1}`).join(", ")} needed improvement. Focus on these areas.`
    );
  }

  // Length-based suggestion
  const avgWords =
    results.reduce((s, r) => s + r.wordCount, 0) / results.length;
  if (avgWords < 20) {
    suggestions.push(
      "Provide more detailed answers. Aim for at least 3-5 sentences per question with specific examples."
    );
  }

  // Keyword suggestion
  const lowKeywordAnswers = results.filter(
    (r) => r.matchedKeywords.length < 2
  );
  if (lowKeywordAnswers.length > 2) {
    suggestions.push(
      "Use technical terminology in your answers. Interviewers look for specific keywords that show domain expertise."
    );
  }

  // General suggestions based on score
  if (overall < 7) {
    suggestions.push("Practice the STAR method (Situation, Task, Action, Result) for behavioral questions.");
    suggestions.push("Build or contribute to open-source projects to gain practical experience you can speak to.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Keep practicing to maintain your edge — try different role categories.");
    suggestions.push("Consider exploring system design questions to level up further.");
  }

  return suggestions;
};

/**
 * Returns a letter grade based on score
 */
export const getGrade = (score) => {
  if (score >= 9) return { grade: "A+", label: "Exceptional" };
  if (score >= 8) return { grade: "A", label: "Excellent" };
  if (score >= 7) return { grade: "B+", label: "Very Good" };
  if (score >= 6) return { grade: "B", label: "Good" };
  if (score >= 5) return { grade: "C+", label: "Average" };
  if (score >= 4) return { grade: "C", label: "Below Average" };
  if (score >= 3) return { grade: "D", label: "Poor" };
  return { grade: "F", label: "Needs Work" };
};

/**
 * Returns color based on score
 */
export const getScoreColor = (score) => {
  if (score >= 7.5) return "#10b981"; // emerald
  if (score >= 5) return "#f59e0b"; // amber
  return "#ef4444"; // red
};
