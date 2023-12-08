import React, { useCallback, useState } from "react";
import Editor from "../../components/Editor/Editor";
import styles from "./QuestionDetail.scss";

import { createQuestionReply } from "../../api/question-reply";

function AnswerForm({ handleAddAnswer, questionId }) {
  const [answer, setAnswer] = useState("");

  function handleCreateAnswer() {
    const newAnswer = {
      content: answer,
      questionId: questionId
    };
    createQuestionReply(newAnswer).then((res) => {
      if (res.code === 200) {
        console.log(res);
        handleAddAnswer(res.data);
        setAnswer("");
      }
    });
  }

  return (
    <div>
      <Editor setData={setAnswer} data={answer} />
      <button
        className="button-submit"
        disabled={!answer}
        onClick={() => {
          handleCreateAnswer();
        }}
        style={{ padding: "5px 10px", marginTop: "20px", fontSize: "15px" }}
      >
        Post your answer
      </button>
    </div>
  );
}

export default AnswerForm;
