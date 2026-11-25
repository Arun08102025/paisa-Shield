
import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CirclePlay,
  Clock3,
  GraduationCap,
  Home,
  Leaf,
  ShieldCheck,
  Sprout,
  Wallet,
  Users,
  X,
} from "lucide-react";
import "./JourneyPage.css";

const content = {
  students: {
    en: {
      title: "Student dashboard",
      subtitle: "Build strong money habits while building your future.",
      welcome: "Your financial learning journey starts here.",
      lessons: [
        ["Saving basics", "Learn why saving matters and how to start small.", "5 min"],
        ["Student budgeting", "Understand needs, wants and monthly spending.", "8 min"],
        ["Digital payment safety", "Recognise common payment risks and stay alert.", "6 min"],
      ],
      tips: ["Track your daily spending.", "Set a small, realistic savings goal.", "Never share your UPI PIN or OTP."],
    },
    kn: {
      title: "ವಿದ್ಯಾರ್ಥಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      subtitle: "ನಿಮ್ಮ ಭವಿಷ್ಯದ ಜೊತೆಗೆ ಉತ್ತಮ ಹಣಕಾಸಿನ ಅಭ್ಯಾಸಗಳನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಿ.",
      welcome: "ನಿಮ್ಮ ಆರ್ಥಿಕ ಕಲಿಕೆಯ ಪ್ರಯಾಣ ಇಲ್ಲಿಂದ ಆರಂಭವಾಗುತ್ತದೆ.",
      lessons: [
        ["ಉಳಿತಾಯದ ಮೂಲಭೂತ ಅಂಶಗಳು", "ಉಳಿತಾಯದ ಮಹತ್ವ ಮತ್ತು ಸಣ್ಣ ಮೊತ್ತದಿಂದ ಆರಂಭಿಸುವುದನ್ನು ತಿಳಿಯಿರಿ.", "5 ನಿಮಿಷ"],
        ["ವಿದ್ಯಾರ್ಥಿ ಬಜೆಟ್", "ಅಗತ್ಯಗಳು, ಆಸೆಗಳು ಮತ್ತು ಖರ್ಚುಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.", "8 ನಿಮಿಷ"],
        ["ಡಿಜಿಟಲ್ ಪಾವತಿ ಸುರಕ್ಷತೆ", "ಸಾಮಾನ್ಯ ಪಾವತಿ ಅಪಾಯಗಳನ್ನು ಗುರುತಿಸಿ.", "6 ನಿಮಿಷ"],
      ],
      tips: ["ದೈನಂದಿನ ಖರ್ಚುಗಳನ್ನು ದಾಖಲಿಸಿ.", "ಸಣ್ಣ ಉಳಿತಾಯ ಗುರಿಯನ್ನು ನಿಗದಿಪಡಿಸಿ.", "ನಿಮ್ಮ UPI PIN ಅಥವಾ OTP ಹಂಚಿಕೊಳ್ಳಬೇಡಿ."],
    },
  },
  households: {
    en: {
      title: "Household dashboard",
      subtitle: "Make everyday family finances easier to understand.",
      welcome: "Plan today. Prepare for tomorrow.",
      lessons: [
        ["Monthly budgeting", "Organise income, expenses and household needs.", "8 min"],
        ["Family savings", "Explore practical ways to build savings together.", "6 min"],
        ["Financial planning", "Learn how to prepare for planned and unexpected expenses.", "7 min"],
      ],
      tips: ["Write down monthly household expenses.", "Keep essential and optional spending separate.", "Plan for unexpected expenses."],
    },
    kn: {
      title: "ಕುಟುಂಬ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      subtitle: "ಕುಟುಂಬದ ದೈನಂದಿನ ಹಣಕಾಸನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
      welcome: "ಇಂದು ಯೋಜಿಸಿ. ನಾಳೆಗೆ ಸಿದ್ಧರಾಗಿ.",
      lessons: [
        ["ಮಾಸಿಕ ಬಜೆಟ್", "ಆದಾಯ, ಖರ್ಚು ಮತ್ತು ಮನೆಯ ಅಗತ್ಯಗಳನ್ನು ವ್ಯವಸ್ಥೆಗೊಳಿಸಿ.", "8 ನಿಮಿಷ"],
        ["ಕುಟುಂಬ ಉಳಿತಾಯ", "ಒಟ್ಟಾಗಿ ಉಳಿತಾಯ ಮಾಡುವ ವಿಧಾನಗಳನ್ನು ತಿಳಿಯಿರಿ.", "6 ನಿಮಿಷ"],
        ["ಆರ್ಥಿಕ ಯೋಜನೆ", "ನಿರೀಕ್ಷಿತ ಮತ್ತು ಅನಿರೀಕ್ಷಿತ ಖರ್ಚುಗಳಿಗೆ ಸಿದ್ಧರಾಗಿ.", "7 ನಿಮಿಷ"],
      ],
      tips: ["ಮಾಸಿಕ ಮನೆಯ ಖರ್ಚುಗಳನ್ನು ಬರೆಯಿರಿ.", "ಅಗತ್ಯ ಮತ್ತು ಐಚ್ಛಿಕ ಖರ್ಚುಗಳನ್ನು ಬೇರ್ಪಡಿಸಿ.", "ಅನಿರೀಕ್ಷಿತ ಖರ್ಚುಗಳಿಗೆ ಯೋಜಿಸಿ."],
    },
  },
  farmers: {
    en: {
      title: "Farmer dashboard",
      subtitle: "Build financial awareness for your agricultural journey.",
      welcome: "Make informed decisions for every season.",
      lessons: [
        ["Seasonal planning", "Understand how to plan expenses around crop seasons.", "8 min"],
        ["Financial awareness", "Learn basic banking and financial concepts.", "7 min"],
        ["Risk awareness", "Understand why planning for uncertainty matters.", "6 min"],
      ],
      tips: ["Keep records of farm-related expenses.", "Plan seasonal cash requirements early.", "Verify information before making financial commitments."],
    },
    kn: {
      title: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      subtitle: "ನಿಮ್ಮ ಕೃಷಿ ಜೀವನಕ್ಕೆ ಅಗತ್ಯವಾದ ಆರ್ಥಿಕ ಅರಿವು ಬೆಳೆಸಿಕೊಳ್ಳಿ.",
      welcome: "ಪ್ರತಿ ಋತುವಿಗೂ ತಿಳಿದ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.",
      lessons: [
        ["ಋತುಮಾನ ಯೋಜನೆ", "ಬೆಳೆ ಋತುಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಖರ್ಚುಗಳನ್ನು ಯೋಜಿಸಿ.", "8 ನಿಮಿಷ"],
        ["ಆರ್ಥಿಕ ಅರಿವು", "ಮೂಲಭೂತ ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ಹಣಕಾಸಿನ ವಿಷಯಗಳನ್ನು ತಿಳಿಯಿರಿ.", "7 ನಿಮಿಷ"],
        ["ಅಪಾಯದ ಅರಿವು", "ಅನಿಶ್ಚಿತತೆಗಾಗಿ ಯೋಜಿಸುವ ಮಹತ್ವ ತಿಳಿಯಿರಿ.", "6 ನಿಮಿಷ"],
      ],
      tips: ["ಕೃಷಿ ಖರ್ಚುಗಳ ದಾಖಲೆಯನ್ನು ಇಡಿ.", "ಋತುಮಾನಕ್ಕೆ ಬೇಕಾದ ಹಣವನ್ನು ಮುಂಚಿತವಾಗಿ ಯೋಜಿಸಿ.", "ಹಣಕಾಸಿನ ಬದ್ಧತೆಗೂ ಮುನ್ನ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ."],
    },
  },
  rural: {
    en: {
      title: "Rural community dashboard",
      subtitle: "Explore financial knowledge and digital confidence.",
      welcome: "Useful financial knowledge should reach everyone.",
      lessons: [
        ["Banking awareness", "Understand basic banking services and how they work.", "7 min"],
        ["Digital safety", "Learn how to recognise suspicious links and messages.", "6 min"],
        ["Financial information", "Build confidence in finding and checking reliable information.", "8 min"],
      ],
      tips: ["Use official banking channels.", "Never share OTPs or passwords.", "Check the source before trusting financial messages."],
    },
    kn: {
      title: "ಗ್ರಾಮೀಣ ಸಮುದಾಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      subtitle: "ಆರ್ಥಿಕ ಜ್ಞಾನ ಮತ್ತು ಡಿಜಿಟಲ್ ಆತ್ಮವಿಶ್ವಾಸವನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಿ.",
      welcome: "ಉಪಯುಕ್ತ ಆರ್ಥಿಕ ಜ್ಞಾನ ಎಲ್ಲರಿಗೂ ತಲುಪಬೇಕು.",
      lessons: [
        ["ಬ್ಯಾಂಕಿಂಗ್ ಅರಿವು", "ಮೂಲಭೂತ ಬ್ಯಾಂಕಿಂಗ್ ಸೇವೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.", "7 ನಿಮಿಷ"],
        ["ಡಿಜಿಟಲ್ ಸುರಕ್ಷತೆ", "ಸಂಶಯಾಸ್ಪದ ಲಿಂಕ್‌ಗಳು ಮತ್ತು ಸಂದೇಶಗಳನ್ನು ಗುರುತಿಸಿ.", "6 ನಿಮಿಷ"],
        ["ಆರ್ಥಿಕ ಮಾಹಿತಿ", "ವಿಶ್ವಾಸಾರ್ಹ ಮಾಹಿತಿಯನ್ನು ಹುಡುಕಿ ಪರಿಶೀಲಿಸಲು ಕಲಿಯಿರಿ.", "8 ನಿಮಿಷ"],
      ],
      tips: ["ಅಧಿಕೃತ ಬ್ಯಾಂಕಿಂಗ್ ಮಾರ್ಗಗಳನ್ನು ಬಳಸಿ.", "OTP ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.", "ಹಣಕಾಸಿನ ಸಂದೇಶಗಳ ಮೂಲವನ್ನು ಪರಿಶೀಲಿಸಿ."],
    },
  },
};

const labels = {
  en: {
    back: "Back to homepage",
    overview: "YOUR LEARNING SPACE",
    lessons: "Learning modules",
    lessonsText: "Choose a topic to begin learning.",
    start: "Start learning",
    completed: "Completed",
    mark: "Mark as completed",
    progress: "Your progress",
    tip: "Smart money reminders",
    tipText: "A few simple habits can make a meaningful difference.",
    module: "Learning module",
    close: "Close lesson",
    demo: "Learning preview",
    demoText: "This is the beginning of your learning module. Full lesson content and saved progress will be connected in a later development step.",
    finish: "Complete this module",
    next: "Continue",
  },
  kn: {
    back: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    overview: "ನಿಮ್ಮ ಕಲಿಕಾ ಸ್ಥಳ",
    lessons: "ಕಲಿಕಾ ವಿಭಾಗಗಳು",
    lessonsText: "ಕಲಿಕೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ವಿಷಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    start: "ಕಲಿಕೆ ಆರಂಭಿಸಿ",
    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    mark: "ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ",
    progress: "ನಿಮ್ಮ ಪ್ರಗತಿ",
    tip: "ಹಣಕಾಸಿನ ನೆನಪುಗಳು",
    tipText: "ಕೆಲವು ಸರಳ ಅಭ್ಯಾಸಗಳು ಉತ್ತಮ ಬದಲಾವಣೆ ತರಬಹುದು.",
    module: "ಕಲಿಕಾ ವಿಭಾಗ",
    close: "ಪಾಠ ಮುಚ್ಚಿ",
    demo: "ಕಲಿಕಾ ಪೂರ್ವವೀಕ್ಷಣೆ",
    demoText: "ಇದು ನಿಮ್ಮ ಕಲಿಕಾ ವಿಭಾಗದ ಆರಂಭಿಕ ಪೂರ್ವವೀಕ್ಷಣೆ. ಸಂಪೂರ್ಣ ಪಾಠಗಳು ಮತ್ತು ಉಳಿಸಿದ ಪ್ರಗತಿಯನ್ನು ಮುಂದಿನ ಹಂತದಲ್ಲಿ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತದೆ.",
    finish: "ಈ ವಿಭಾಗವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ",
    next: "ಮುಂದುವರಿಸಿ",
  },
};

export default function JourneyPage({ journey, language = "en", onBack }) {
  const [completed, setCompleted] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);

  const lang = language === "kn" ? "kn" : "en";
  const data = content[journey.id]?.[lang] || content.students.en;
  const text = labels[lang];
  const Icon = journey.icon || GraduationCap;
  const progress = Math.round((completed.length / data.lessons.length) * 100);

  const finishLesson = (index) => {
    setCompleted((current) =>
      current.includes(index) ? current : [...current, index]
    );
    setActiveLesson(null);
  };

  return (
    <div className="journey-page">
      <header className="journey-topbar">
        <button className="journey-back" onClick={onBack}>
          <ArrowLeft size={17} /> {text.back}
        </button>
        <div className="journey-mini-brand">
          <ShieldCheck size={20} />
          PAISA SHIELD
        </div>
        <span className="journey-language">{lang === "kn" ? "ಕನ್ನಡ" : "ENGLISH"}</span>
      </header>

      <main className="journey-content">
        <div className="journey-welcome">
          <div className="journey-welcome-copy">
            <span className="journey-overline">{text.overview}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
            <div className="journey-welcome-note">
              <CheckCircle2 size={17} /> {data.welcome}
            </div>
          </div>
          <div className="journey-welcome-icon">
            <Icon size={66} strokeWidth={1.2} />
            <span><ShieldCheck size={19} /></span>
          </div>
        </div>

        <section className="journey-progress-card">
          <div className="journey-progress-top">
            <div>
              <span className="journey-overline">{text.progress}</span>
              <h2>{completed.length} / {data.lessons.length} {lang === "kn" ? "ಪೂರ್ಣ" : "modules completed"}</h2>
            </div>
            <strong>{progress}%</strong>
          </div>
          <div className="journey-progress-track">
            <div style={{ width: `${progress}%` }} />
          </div>
        </section>

        <section className="journey-lessons-section">
          <div className="journey-section-heading">
            <div>
              <span className="journey-overline">{text.overview}</span>
              <h2>{text.lessons}</h2>
              <p>{text.lessonsText}</p>
            </div>
            <BookOpen size={27} />
          </div>

          <div className="journey-lesson-grid">
            {data.lessons.map((lesson, index) => {
              const isDone = completed.includes(index);
              return (
                <article className={`journey-lesson-card ${isDone ? "is-complete" : ""}`} key={lesson[0]}>
                  <div className="journey-lesson-card-top">
                    <span className="journey-lesson-number">MODULE 0{index + 1}</span>
                    {isDone ? <CheckCircle2 className="lesson-done-icon" size={21} /> : <CirclePlay size={21} />}
                  </div>
                  <h3>{lesson[0]}</h3>
                  <p>{lesson[1]}</p>
                  <div className="journey-lesson-meta">
                    <span><Clock3 size={14} /> {lesson[2]}</span>
                    <span>{isDone ? text.completed : text.demo}</span>
                  </div>
                  <button
                    className="journey-lesson-button"
                    onClick={() => setActiveLesson(index)}
                  >
                    {isDone ? text.completed : text.start}
                    <ArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="journey-tips-card">
          <div className="journey-tips-icon"><Wallet size={25} /></div>
          <div className="journey-tips-copy">
            <span className="journey-overline">{text.tip}</span>
            <h2>{text.tipText}</h2>
            <ul>
              {data.tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </div>
        </section>

        <div className="journey-disclaimer">
          <ShieldCheck size={16} />
          <span>Paisa Shield is a financial learning project. This content is educational and is not financial advice.</span>
        </div>
      </main>

      {activeLesson !== null && (
        <div className="lesson-overlay" onClick={() => setActiveLesson(null)}>
          <section className="lesson-dialog" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <button className="lesson-dialog-close" onClick={() => setActiveLesson(null)} aria-label="Close">
              <X size={20} />
            </button>
            <span className="journey-overline">{text.module} 0{activeLesson + 1}</span>
            <div className="lesson-dialog-icon"><BookOpen size={30} /></div>
            <h2>{data.lessons[activeLesson][0]}</h2>
            <p>{data.lessons[activeLesson][1]}</p>
            <div className="lesson-preview-box">
              <strong>{text.demo}</strong>
              <p>{text.demoText}</p>
            </div>
            <button className="journey-lesson-button lesson-finish" onClick={() => finishLesson(activeLesson)}>
              {text.finish} <CheckCircle2 size={17} />
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
