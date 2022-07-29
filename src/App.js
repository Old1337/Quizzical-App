import React, { useEffect } from "react";

import Questions from "./components/Questions";
import StartQuiz from "./components/StarQuiz";

import { nanoid } from "nanoid";

import "./App.css";

export default function App() {
  const [start, setStart] = React.useState(false);

  const [questions, setQuestions] = React.useState();
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [chosenAnswers, setChosenAnswers] = React.useState();

  const [didEnd, setDidEnd] = React.useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      return array;
    }
  };

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
      );
      const data = await response.json();

      setQuestions(
        data.results.map((result) => ({
          ...result,
          id: nanoid(),
          allAnswers: shuffleArray([
            ...result.incorrect_answers,
            result.correct_answer,
          ]),
        }))
      );
    };

    getQuestions();
  }, [start]);

  function startQuiz() {
    setStart(true);
  }

  function checkAnswers(chosenAnswer, correctAnswer) {
    setChosenAnswers(chosenAnswer);

    if (chosenAnswer === correctAnswer && chosenAnswers !== correctAnswer) {
      setCorrectAnswers((prevState) => prevState + 1);
    }
  }

  const questionEl = !questions
    ? false
    : questions.map((question) => (
        <Questions
          key={question.id}
          question={question.question}
          answers={question.allAnswers}
          rightAnswer={question.correct_answer}
          checkAnswers={checkAnswers}
          didEnd={didEnd}
        />
      ));

  function endQuiz() {
    setDidEnd(true);
  }

  function resetAll() {
    setStart(false);
    setDidEnd(false);
    setCorrectAnswers(0);
    setChosenAnswers("");
  }
  return (
    <main className="main">
      {start ? questionEl : <StartQuiz startQuiz={startQuiz} />}

      {start && !didEnd && (
        <button onClick={endQuiz} className="check-btn">
          Check Answers
        </button>
      )}

      {didEnd && (
        <div className="d-flex">
          <p className="play-p">
            you scored {correctAnswers}/5 correct answers
          </p>
          <button onClick={resetAll} className="play-btn">
            Play again
          </button>
        </div>
      )}
    </main>
  );
}
