import React, { useCallback, useEffect, useState } from "react";
import styles from "./QuestionDetail.scss";

function formatDate(date) {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function CommentForm({ onSetQuestionData, question, answerId }) {
  const [comment, setComment] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = useCallback(() => {
    const newComment = {
      id: question.comments?.length + 1,
      commentText: comment,
      date: formatDate(new Date()),
      username: "User 789"
    };
    if (!answerId) {
      // NOTE: if have not answerId, submit comment to question
      const updatedQuestion = Object.assign(
        {},
        {
          ...question,
          comments: [...question.comments, newComment]
        }
      );
      onSetQuestionData(updatedQuestion);
    } else {
      // NOTE: if have answerId, submit comment to answer by answerId
      const answerIndex = question.answers.findIndex(
        (answer) => answer.id === answerId
      );

      if (answerIndex !== -1) {
        const updatedAnswer = Object.assign(
          {},
          {
            ...question.answers[answerIndex],
            comments: [...question.answers[answerIndex].comments, newComment]
          }
        );
        const updatedQuestion = Object.assign({}, question);
        updatedQuestion.answers[answerIndex] = updatedAnswer;
        onSetQuestionData(updatedQuestion);
      }
    }
    setComment("");
    setIsFormVisible(false);
  }, [comment]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      <p className="lighter-text" onClick={toggleFormVisibility}>
        Add a comment
      </p>
      {isFormVisible && (
        <div>
          <label>
            <textarea
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              cols="50"
              placeholder="Type your comment here..."
              required
            ></textarea>
          </label>
          <br />
          <button
            className="button-submit"
            disabled={!comment}
            onClick={handleSubmit}
          >
            Submit Comment
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentForm;
