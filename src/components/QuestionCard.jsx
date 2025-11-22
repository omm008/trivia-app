// src/components/QuestionCard.jsx
import React, { useState } from "react";

const QuestionCard = ({
  question,
  options,
  onAnswer,
  onNext,
  index,
  total,
}) => {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const pointsFor = {
    easy: 10,
    medium: 20,
    hard: 40,
  };

  const handleSelect = (opt) => {
    if (revealed) return;

    setSelected(opt);
    setRevealed(true);

    const isCorrect = opt === question.correctAnswer;
    const pts = isCorrect ? pointsFor[question.difficulty] : 0;

    onAnswer(isCorrect, pts);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 20,
        marginTop: 20,
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <small>
          {question.category} • {question.difficulty}
        </small>
        <div>
          {index + 1} / {total}
        </div>
      </div>

      <h2>{question.question.text}</h2>

      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            disabled={revealed}
            style={{
              textAlign: "left",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              background: revealed
                ? opt === question.correctAnswer
                  ? "#d1fae5"
                  : opt === selected
                  ? "#fee2e2"
                  : "#f3f4f6"
                : "#fff",
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {revealed && (
        <div style={{ marginTop: 12 }}>
          {selected === question.correctAnswer ? (
            <strong style={{ color: "green" }}>
              Correct! +{pointsFor[question.difficulty]} pts
            </strong>
          ) : (
            <strong style={{ color: "red" }}>
              Incorrect — correct answer: {question.correctAnswer}
            </strong>
          )}
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!revealed}
        style={{
          marginTop: 16,
          padding: "8px 14px",
          borderRadius: 8,
          background: revealed ? "#2563eb" : "#94a3b8",
          color: "#fff",
          border: "none",
        }}
      >
        Next
      </button>
    </div>
  );
};

export default QuestionCard;
