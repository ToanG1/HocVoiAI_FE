import React, { useCallback, useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function formatDate(date) {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}
function AnswerForm({ onSetQuestionData, question }) {
  const [answer, setAnswer] = useState("");
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    const cleanedData = data.replace(/<p>/g, "").replace(/<\/p>/g, "");
    setAnswer(cleanedData);
  };
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
      <CKEditor
        editor={ClassicEditor}
        data={answer}
        onChange={handleEditorChange}
      />
      <button
        onClick={handleSubmitAnswer}
        style={{ padding: "5px 10px", marginTop: "20px", fontSize: "15px" }}
      >
        Post your answer
      </button>
    </div>
  );
}

export default AnswerForm;
