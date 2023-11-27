import React, { useCallback, useState } from "react";
import Editor from "../../components/Editor/Editor";
import styles from "./QuestionDetail.scss";

function formatDate(date) {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}
function AnswerForm({ onSetQuestionData, question }) {
  const [answer, setAnswer] = useState("");

  const handleSubmitAnswer = useCallback(() => {
    const newAnswer = {
      id: question.answers?.length + 1,
      username: "User 789",
      date: formatDate(new Date()),
      answerText: answer,
      comments: []
    };

    const updatedQuestion = Object.assign(
      {},
      {
        ...question,
        answers: [...question.answers, newAnswer]
      }
    );
    onSetQuestionData(updatedQuestion);
    setAnswer("");
  }, [answer]);

  return (
    <div>
      <Editor setData={setAnswer} data={answer} />
      <button
        className="button-submit"
        disabled={!answer}
        onClick={handleSubmitAnswer}
        style={{ padding: "5px 10px", marginTop: "20px", fontSize: "15px" }}
      >
        Post your answer
      </button>
    </div>
  );
}

export default AnswerForm;
