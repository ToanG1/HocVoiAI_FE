import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuestionDetail.scss";
import CommentForm from "./CommentForm";
import AnswerForm from "./AnswerForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BgComp from "../../components/BgComp/BgComp";

const MOCK_QUESTIONS = {
  title:
    "Strategies for Enhancing English Language Proficiency in and Outside the Course",
  author: "Chris Du",
  date: "November 20, 2023",
  content:
    "Can anyone share practical tips or personal experiences on how to improve English language skills outside the classroom? Whether it's recommended books, online resources, or language exchange programs, I'm eager to hear suggestions to enhance my learning journey in the English course. What strategies have proven effective for you in mastering the language beyond traditional coursework?",
  comments: [
    {
      id: 1,
      username: "Adam",
      date: "November 22, 2023",
      commentText:
        "Engaging in language exchange through platforms like Tandem or HelloTalk has been a game-changer for me"
    },
    {
      id: 2,
      username: "Mai",
      date: "November 22, 2023",
      commentText:
        "Connecting with native English speakers for language exchange allows for practical application and cultural exchange."
    }
    // Add more comments for the question as needed
  ],
  answers: [
    {
      id: 1,
      username: "Alex",
      date: "November 21, 2023",
      answerText:
        "I found 'Word Power Made Easy' by Norman Lewis to be an excellent resource for expanding my vocabulary. Additionally, 'English Grammar in Use' by Raymond Murphy helped me strengthen my grammar skills.",
      comments: [
        {
          id: 1,
          username: "Jimmy",
          date: "November 22, 2023",
          commentText:
            "Maintaining a journal in English has been invaluable. It not only helps improve writing skills but also serves as a personal record of language progression"
        },
        {
          id: 2,
          username: "Ken",
          date: "November 22, 2023",
          commentText:
            "I often use online platforms like Lang-8 for receiving feedback from native speakers"
        },
        {
          id: 3,
          username: "Hellen",
          date: "November 22, 2023",
          commentText:
            "I completely agree! 'Word Power Made Easy' is a gem for vocabulary building. I've also benefited from 'English Idioms in Use' by Michael McCarthy for understanding idiomatic expressions."
        },
        {
          id: 4,
          username: "Justin",
          date: "November 22, 2023",
          commentText:
            "Duolingo has been my go-to as well! It's a fun and interactive way to reinforce language skills daily. Another app I recommend is Babbel, which tailors lessons to individual learning styles."
        }
      ]
    },
    {
      id: 2,
      username: "Hong",
      date: "November 21, 2023",
      answerText:
        "Duolingo and Memrise are fantastic apps for daily language practice. They offer interactive lessons, quizzes, and a variety of exercises that make learning English enjoyable and effective.",
      comments: [
        {
          id: 1,
          username: "Conan",
          date: "November 22, 2023",
          commentText:
            "Absolutely! Duolingo have been a staple in my routine. For audiobooks, the 'Harry Potter' series narrated by Jim Dale is not only entertaining but also excellent for language immersion."
        },
        {
          id: 2,
          username: "Ken",
          date: "November 22, 2023",
          commentText:
            "I've started using Duolingo recently, and the feedback is incredibly helpful."
        },
        {
          id: 3,
          username: "Hum",
          date: "November 22, 2023",
          commentText:
            "Engaging in discussions on Duolingo has been a game-changer."
        },
        {
          id: 4,
          username: "Tommy",
          date: "November 22, 2023",
          commentText:
            "It's a supportive community where you can ask questions, share experiences, and receive valuable insights. Does anyone have other forums they recommend?"
        }
      ]
    }
    // Add more answers as needed
  ]
};

function QuestionDetail_({}) {
  const userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
  const [questionData, setQuestionData] = useState(MOCK_QUESTIONS);

  return (
    <>
      <Header />
      <BgComp />
      <div className="questions-detail-container">
        <header>
          <h1 className="question-title">{questionData.title}</h1>
          <p className="info">
            Posted by: <span className="author">{questionData.author}</span> |
            Date: <span className="date">{questionData.date}</span>
          </p>
        </header>

        <div className="question">
          <p className="content">{questionData.content}</p>
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
          <h2 className="title">{questionData.answers.length} Answers</h2>
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
      <Footer />
    </>
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
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: answerText }}
      ></div>
      <p className="info info-answer">
        Answered by: {username} | Date: {date}
      </p>
      <hr className="lighter-hr"></hr>
      <div className="comments">
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
      <p className="content content-comment">{commentText}</p>
      <p className="info-comment">
        <span className="username"> {username} </span>
        {date}
      </p>
      <hr className="lighter-hr"></hr>
    </div>
  );
}

export default QuestionDetail_;
