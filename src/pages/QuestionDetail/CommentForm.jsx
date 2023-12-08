import React, { useCallback, useEffect, useState } from "react";
import styles from "./QuestionDetail.scss";

import { createQuestionComment } from "../../api/question-comment";

function CommentForm({ addComment, questionId, answerId }) {
  const handleSubmit = (value) => {
    const newComment = {
      content: value,
      questionId: questionId,
      questionReplyId: answerId
    };
    console.log(newComment);

    createQuestionComment(newComment)
      .then((res) => {
        if (res.code === 200) {
          addComment(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input
        className="lighter-text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e.target.value);
            e.target.value = "";
          }
        }}
        placeholder="Add a comment..."
      ></input>
    </div>
  );
}

export default CommentForm;
