# 🎯 AI Mock Interviewer

A modern, full-stack AI-powered mock interview practice application built with React + Vite + Tailwind CSS.

---

## ✨ Features

- **5 Role-Specific Question Banks** — Frontend, Java, Data Analyst, Python, DevOps
- **Timed Questions** — 2-minute countdown per question with color-coded urgency
- **AI Evaluation** — Keyword-matching engine scores your answers automatically
- **Beautiful Results Dashboard** — Circular score ring, rating bars, per-question breakdown
- **PDF Report Download** — Full printable interview report
- **Smooth Animations** — Page transitions, loading states, progress indicators
- **Mobile Responsive** — Works perfectly on phones, tablets, and desktops

---

## 🗂 Project Structure

```
ai-mock-interviewer/
├── src/
│   ├── components/
│   │   └── LoadingScreen.jsx       # Animated evaluation loader
│   ├── data/
│   │   └── questions.js            # Question banks for all roles
│   ├── hooks/
│   │   └── useTimer.js             # Custom countdown timer hook
│   ├── pages/
│   │   ├── LandingPage.jsx         # Hero section
│   │   ├── InterviewForm.jsx       # Candidate details form
│   │   ├── InterviewScreen.jsx     # Live Q&A interview screen
│   │   └── ResultsPage.jsx         # Results & feedback dashboard
│   ├── utils/
│   │   ├── evaluator.js            # Answer scoring logic
│   │   └── pdfReport.js            # PDF report generator
│   ├── App.jsx                     # Main app with page routing
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles + Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd ai-mock-interviewer
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production

```bash
npm run build
npm run preview
```

---

## 🧠 How the AI Evaluation Works

The evaluation engine (`src/utils/evaluator.js`) uses keyword matching:

1. **Each question** has a list of expected technical keywords
2. **Your answer** is scanned for how many keywords appear
3. **Score components:**
   - Keyword match rate (0–10)
   - Length bonus (detailed answers score higher)
   - Length penalty (very short answers score lower)
4. **Ratings derived from:**
   - Technical: keyword density
   - Communication: average word count per answer
   - Confidence: combination of length and score
5. **Feedback** is generated based on score ranges
6. **Suggestions** highlight weak areas and general advice

---

## 📚 Adding New Roles

Edit `src/data/questions.js` and add a new entry to `questionBank`:

```js
"Machine Learning Engineer": [
  {
    id: 1,
    question: "Explain the bias-variance tradeoff.",
    keywords: ["bias", "variance", "overfitting", "underfitting", "model", "generalize", "tradeoff", "complexity"],
    category: "ML Theory",
  },
  // ... 4 more questions
],
```

Then add the role to the `ROLES` array in `src/pages/InterviewForm.jsx`.

---

## 🎨 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Custom Hooks | Timer logic |
| Browser Print API | PDF report generation |

---

## 📄 License

MIT — Free to use and modify for learning purposes.
