import React from "react";

export default function Question(props) {
  const [answers, setAnswers] = React.useState();

  function addClass(answer) {
    if ((answers === answer) & !props.didEnd) {
      return "active";
    }
    if (answers === answer && props.didEnd && answer === props.rightAnswer) {
      return "true";
    }

    if (answers === answer && props.didEnd && answer !== props.rightAnswer) {
      return "false";
    }
  }
  const allAnswers = props.answers.map((answer) => (
    <button
      key={answer}
      className={`answer ${addClass(answer)}`}
      onClick={() => {
        props.checkAnswers(answer, props.rightAnswer);
        setAnswers(answer);
      }}
    >
      {answer}
    </button>
  ));
  return (
    <>
      <div className={props.didEnd ? "container end" : "container"}>
        <h1
          className="question"
          dangerouslySetInnerHTML={{ __html: props.question }}
        />
        <div className="answers">{allAnswers}</div>
      </div>
    </>
  );
}
