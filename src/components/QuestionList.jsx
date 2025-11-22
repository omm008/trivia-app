import React from "react";

const QuestionList = ({ questions = [] }) => {
  if (!questions.length)
    return (
      <p className="h-[50%] w-full bg-gray-500 text-white">
        No questions available
      </p>
    );
  return (
    <div className="h-[50%] w-full bg-gray-500 text-white">
      <h2>Fetched Questions are:</h2>
      <ul>
        {questions.map((q) => {
          <li key={q.id}>
            <strong>{q.question?.text ?? "_"}</strong>
            <div>
              <small>
                Category: {q.category ?? "_"} -- Difficulty :{" "}
                {q.difficulty ?? "_"}
              </small>
            </div>
            <div>
              <em>Correct: </em>
              {q.correctAnswer}
            </div>
            <div>
              <em>Incorrect: </em>
              {q.incorrectAnswers.join(", ")}
            </div>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default QuestionList;
