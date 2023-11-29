import React, { useCallback, useEffect, useState } from "react";
import styles from "./QuestionDetail.scss";
import CommentForm from "./CommentForm";
import AnswerForm from "./AnswerForm";

const MOCK_QUESTIONS = {
  title: "Question Title",
  author: "User123",
  date: "November 20, 2023",
  content:
    "So I am working with python boost. The goal for me is to be able to overload c++ functions from python modules. I have managed that, but I have observed a weird behavior when using aliases.",
  comments: [
    {
      id: 1,
      username: "User789",
      date: "November 22, 2023",
      commentText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...."
    },
    {
      id: 2,
      username: "User789",
      date: "November 22, 2023",
      commentText: "Another comment here...."
    }
    // Add more comments for the question as needed
  ],
  answers: [
    {
      id: 1,
      username: "User456",
      date: "November 21, 2023",
      answerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
      comments: [
        {
          id: 1,
          username: "User789",
          date: "November 22, 2023",
          commentText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...."
        },
        {
          id: 2,
          username: "User789",
          date: "November 22, 2023",
          commentText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...."
        },
        {
          id: 3,
          username: "User789",
          date: "November 22, 2023",
          commentText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...."
        },
        {
          id: 4,
          username: "User789",
          date: "November 22, 2023",
          commentText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...."
        }
      ]
    },
    {
      id: 2,
      username: "User456",
      date: "November 21, 2023",
      answerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
      comments: [
        {
          id: 1,
          username: "User789",
          date: "November 22, 2023",
          commentText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...."
        },
        {
          id: 2,
          username: "User789",
          date: "November 22, 2023",
          commentText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...."
        },
        {
          id: 3,
          username: "User789",
          date: "November 22, 2023",
          commentText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...."
        },
        {
          id: 4,
          username: "User789",
          date: "November 22, 2023",
          commentText:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit...."
        }
      ]
    }
    // Add more answers as needed
  ]
};

function QuestionDetail_({}) {
  const [questionData, setQuestionData] = useState(MOCK_QUESTIONS);
  return (
    <div className="question-detail-container">
      <header>
        <h1>{questionData.title}</h1>
        <p>
          Posted by: {questionData.author} | Date: {questionData.date}
        </p>
      </header>

      <div className="question">
        <p>{questionData.content}</p>
        {questionData.comments.map((comment) => (
          <Comment
            key={comment.id}
            username={comment.username}
            date={comment.date}
            commentText={comment.commentText}
          />
        ))}
      </div>
      <CommentForm
        onSetQuestionData={setQuestionData}
        question={questionData}
      />

      <div className="answers">
        <h2>Answers</h2>
        {questionData.answers.map((answer) => (
          <Answer
            key={answer.id}
            id={answer.id}
            username={answer.username}
            date={answer.date}
            answerText={answer.answerText}
            comments={answer.comments}
            questionData={questionData}
            handleSetQuestionData={setQuestionData}
          />
        ))}
      </div>
      <div>
        <AnswerForm
          onSetQuestionData={setQuestionData}
          question={questionData}
        />
      </div>
    </div>
  );
}

function Answer({
  id,
  username,
  date,
  answerText,
  comments,
  questionData,
  handleSetQuestionData
}) {
  return (
    <div className="answer">
      <p>
        Answered by: {username} | Date: {date}
      </p>
      <p>{answerText}</p>

      <div className="comments">
        <h3>Comments</h3>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            username={comment.username}
            date={comment.date}
            commentText={comment.commentText}
          />
        ))}
      </div>
      <CommentForm
        onSetQuestionData={handleSetQuestionData}
        question={questionData}
        answerId={id}
      />
      <hr className="lighter-hr"></hr>
    </div>
  );
}

function Comment({ username, date, commentText }) {
  return (
    <div className="comment">
      <p>
        Comment by: {username} | Date: {date}
      </p>
      <p>{commentText}</p>
      <hr className="lighter-hr"></hr>
    </div>
  );
}

export default QuestionDetail_;
