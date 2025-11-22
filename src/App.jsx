// src/App.jsx
import React, { useState, useEffect } from "react";
import DifficultySelector from "./components/DifficultySelector";
import QuestionCard from "./components/QuestionCard";
import { fetchQuestions } from "./api/triviaApi";

const SCORE_KEY = "trivia_high_score";

// pure shuffle function (outside component, allowed)
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const App = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [error, setError] = useState(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  const [options, setOptions] = useState([]);
  const [highScore, setHighScore] = useState(
    () => Number(localStorage.getItem(SCORE_KEY)) || 0
  );

  const [completed, setCompleted] = useState(false);

  const buildOptions = (q) => {
    return shuffle([q.correctAnswer, ...q.incorrectAnswers]);
  };

  useEffect(() => {
    if (questions.length > 0 && questions[currentIdx]) {
      setOptions(buildOptions(questions[currentIdx]));
    }
  }, [questions, currentIdx]);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchQuestions({ limit, difficulties: difficulty });
      setQuestions(data);
      setCurrentIdx(0);
      setScore(0);
      setCompleted(false);
    } catch (err) {
      setError("Failed to fetch questions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (isCorrect, pts) => {
    if (isCorrect) setScore((s) => s + pts);
  };

  const handleNext = () => {
    const next = currentIdx + 1;

    if (next >= questions.length) {
      setCompleted(true);

      if (score > highScore) {
        localStorage.setItem(SCORE_KEY, score);
        setHighScore(score);
      }
    } else {
      setCurrentIdx(next);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Trivia Quiz (Stable React Build)</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <DifficultySelector value={difficulty} onChange={setDifficulty} />

        <label className="rounded px-5 py-2 bg-green-500 border-2">
          Count:
          <input
            type="number"
            min={1}
            max={20}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            style={{ marginLeft: 8, width: 60 }}
          />
        </label>

        <button
          className="rounded-xl px-5 py-2 bg-red-500 border-2"
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Questions"}
        </button>

        <div style={{ marginLeft: "auto" }}>
          <div>Score: {score}</div>
          <div style={{ fontSize: 12 }}>High Score: {highScore}</div>
        </div>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {!questions.length && !loading && <p>Click "Fetch Questions" to start</p>}

      {questions.length > 0 && !completed && (
        <QuestionCard
          question={questions[currentIdx]}
          options={options}
          index={currentIdx}
          total={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}

      {completed && (
        <div style={{ marginTop: 20 }}>
          <h2>Quiz Completed 🎉</h2>
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>

          <button onClick={() => handleFetch()}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
