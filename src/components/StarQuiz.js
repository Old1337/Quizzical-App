import React from "react";

export default function StartQuiz(props) {
  return (
    <div className="quizzical">
      <h1 className="quiz-title">Quizzical</h1>
      <p className="quiz-p">Some description if needed</p>
      <button onClick={props.startQuiz} className="start-btn">
        Start quiz
      </button>
    </div>
  );
}
