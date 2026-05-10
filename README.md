# 🎯 AI Mock Interviewer

A modern and interactive mock interview platform built using React, Vite, and Tailwind CSS.
This application helps users practice technical interviews through role-based questions, timed sessions, automated evaluation, and detailed performance reports.

---


# 📸 Screenshots

## Landing Page

*Add screenshot here*

## Interview Screen

*Add screenshot here*

## Results Dashboard

*Add screenshot here*

---

# ✨ Features

* 🎤 Role-based mock interviews
* ⏳ Real-time countdown timer for every question
* 📊 Automated answer evaluation system
* 📈 Detailed performance analytics
* 🧠 Technical + communication score breakdown
* 📄 Downloadable interview report
* 📱 Fully responsive design
* 🎨 Modern glassmorphism UI
* ⚡ Smooth animations and transitions
* 🔄 Restart interview functionality

---

# 🧠 Supported Roles

The platform currently supports:

* Frontend Developer
* Java Developer
* Python Developer
* Data Analyst
* DevOps Engineer

Each role contains customized technical interview questions.

---

# 🏗️ Project Structure

```bash
ai-mock-interviewer/
│
├── src/
│   ├── components/
│   │   └── LoadingScreen.jsx
│   │
│   ├── data/
│   │   └── questions.js
│   │
│   ├── hooks/
│   │   └── useTimer.js
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── InterviewForm.jsx
│   │   ├── InterviewScreen.jsx
│   │   └── ResultsPage.jsx
│   │
│   ├── utils/
│   │   ├── evaluator.js
│   │   └── pdfReport.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ai-mock-interviewer.git
```

---

## 2️⃣ Navigate into the Project

```bash
cd ai-mock-interviewer
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:5173
```

---

# 🛠️ Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# ⚙️ How Evaluation Works

The project uses an intelligent keyword-based evaluation system.

### Evaluation Process

* Every question contains expected technical keywords
* User answers are analyzed against those keywords
* Longer and more detailed answers receive better scores
* Extremely short answers receive penalties
* Final ratings are generated based on:

  * Technical knowledge
  * Communication quality
  * Confidence level

---

# 📊 Result Dashboard Includes

* Overall score out of 10
* Technical rating
* Communication rating
* Confidence rating
* Per-question performance breakdown
* Personalized improvement suggestions

---

# ➕ Adding New Roles

To add new interview roles:

Open:

```bash
src/data/questions.js
```

Add a new role inside the question bank:

```js
"Machine Learning Engineer": [
  {
    id: 1,
    question: "Explain bias vs variance.",
    keywords: [
      "bias",
      "variance",
      "overfitting",
      "underfitting",
      "model",
      "generalization"
    ],
    category: "Machine Learning"
  }
]
```

Then update the roles array inside:

```bash
src/pages/InterviewForm.jsx
```

---

# 🎨 Tech Stack

| Technology        | Purpose               |
| ----------------- | --------------------- |
| React.js          | Frontend Framework    |
| Vite              | Fast Build Tool       |
| Tailwind CSS      | UI Styling            |
| JavaScript        | Application Logic     |
| Custom Hooks      | Timer Functionality   |
| Browser Print API | PDF Report Generation |

---

