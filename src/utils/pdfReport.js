// ============================================================
// pdfReport.js — Generate a downloadable interview report
// ============================================================

import { getGrade } from "./evaluator";

export const generatePDFReport = (reportData) => {
  const { name, role, experience, evaluation, answers, questions, date } = reportData;
  const { grade, label } = getGrade(evaluation.overallScore);

  // Build HTML string for the PDF
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Interview Report - ${name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: #f8fafc; color: #1e293b; padding: 40px; }
    .header { background: linear-gradient(135deg, #1e3a5f, #0ea5e9); color: white; padding: 32px; border-radius: 12px; margin-bottom: 28px; }
    .header h1 { font-size: 28px; letter-spacing: -0.5px; margin-bottom: 6px; }
    .header p { opacity: 0.85; font-size: 14px; }
    .meta { display: flex; gap: 24px; margin-top: 16px; flex-wrap: wrap; }
    .meta-item { background: rgba(255,255,255,0.15); padding: 8px 16px; border-radius: 8px; font-size: 13px; }
    .section { background: white; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
    .section h2 { font-size: 17px; font-weight: 700; margin-bottom: 16px; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
    .scores-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .score-card { background: #f8fafc; border-radius: 10px; padding: 16px; text-align: center; }
    .score-card .value { font-size: 36px; font-weight: 800; color: #0ea5e9; }
    .score-card .label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
    .grade-badge { display: inline-block; background: #0ea5e9; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 700; margin-left: 10px; }
    .feedback-text { font-size: 14px; line-height: 1.7; color: #475569; background: #f0f9ff; padding: 16px; border-radius: 8px; border-left: 4px solid #0ea5e9; }
    .suggestion { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
    .suggestion:last-child { border-bottom: none; }
    .suggestion .bullet { color: #0ea5e9; font-size: 18px; margin-top: -2px; }
    .suggestion .text { font-size: 13px; color: #475569; line-height: 1.6; }
    .qa-item { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
    .qa-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .question-text { font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 8px; }
    .category-tag { display: inline-block; background: #e0f2fe; color: #0284c7; font-size: 11px; padding: 2px 8px; border-radius: 4px; margin-bottom: 8px; font-weight: 500; }
    .answer-text { font-size: 13px; color: #64748b; background: #f8fafc; padding: 12px; border-radius: 8px; line-height: 1.6; }
    .q-score { display: inline-block; float: right; font-size: 13px; font-weight: 700; color: white; background: #10b981; padding: 2px 10px; border-radius: 12px; }
    .footer { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 AI Mock Interview Report</h1>
    <p>Detailed performance analysis for your mock interview session</p>
    <div class="meta">
      <div class="meta-item">👤 ${name}</div>
      <div class="meta-item">💼 ${role}</div>
      <div class="meta-item">📊 ${experience}</div>
      <div class="meta-item">📅 ${date}</div>
    </div>
  </div>

  <div class="section">
    <h2>Performance Overview <span class="grade-badge">${grade} — ${label}</span></h2>
    <div class="scores-grid">
      <div class="score-card">
        <div class="value">${evaluation.overallScore}<span style="font-size:18px">/10</span></div>
        <div class="label">Overall Score</div>
      </div>
      <div class="score-card">
        <div class="value">${evaluation.technicalScore}<span style="font-size:18px">/10</span></div>
        <div class="label">Technical Rating</div>
      </div>
      <div class="score-card">
        <div class="value">${evaluation.communicationScore}<span style="font-size:18px">/10</span></div>
        <div class="label">Communication</div>
      </div>
      <div class="score-card">
        <div class="value">${evaluation.confidenceScore}<span style="font-size:18px">/10</span></div>
        <div class="label">Confidence</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>AI Feedback</h2>
    <p class="feedback-text">${evaluation.feedback}</p>
  </div>

  <div class="section">
    <h2>Improvement Suggestions</h2>
    ${evaluation.suggestions
      .map(
        (s) => `
    <div class="suggestion">
      <span class="bullet">→</span>
      <span class="text">${s}</span>
    </div>`
      )
      .join("")}
  </div>

  <div class="section">
    <h2>Question-by-Question Breakdown</h2>
    ${questions
      .map(
        (q, i) => `
    <div class="qa-item">
      <span class="category-tag">${q.category}</span>
      <span class="q-score">${evaluation.detailedResults[i]?.score || 0}/10</span>
      <div class="question-text">Q${i + 1}: ${q.question}</div>
      <div class="answer-text">${answers[i] || "<em>No answer provided</em>"}</div>
    </div>`
      )
      .join("")}
  </div>

  <div class="footer">
    <p>Generated by AI Mock Interviewer • ${date}</p>
    <p style="margin-top:4px">Practice makes perfect — keep going! 🚀</p>
  </div>
</body>
</html>`;

  // Open in new tab and trigger print
  const newWindow = window.open("", "_blank");
  newWindow.document.write(html);
  newWindow.document.close();
  newWindow.focus();
  setTimeout(() => {
    newWindow.print();
  }, 500);
};
