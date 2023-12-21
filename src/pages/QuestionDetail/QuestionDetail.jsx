import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuestionDetail.scss";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import CommentForm from "./CommentForm";
import AnswerForm from "./AnswerForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BgComp from "../../components/BgComp/BgComp";

import { getQuestion, deleteQuestion } from "../../api/question";
import {
  getQuestionRepliesByQId,
  deleteQuestionReply
} from "../../api/question-reply";
import {
  getQuestionCommentsById,
  deleteQuestionComment
} from "../../api/question-comment";

import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
function checkIsUserOwner(userId) {
  const userInfo = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
  return userId === userInfo.userId;
}

function QuestionDetail_({}) {
  const userInfo = JSON.parse(localStorage.getItem("USER_INFO"));

  const { questionId } = useParams();
  const [data, setData] = useState({
    title: "",
    user: {
      name: ""
    }
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const fetchData = async () => {
      const res = await getQuestion(questionId);
      if (res.code === 200) setData(res.data);
    };
    fetchData();
  }, []);

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getQuestionRepliesByQId(questionId);
      if (res.code === 200) {
        setAnswers(res.data);
      }
    };
    fetchData();
  }, []);

  function handleAddAnswerToList(answer) {
    setAnswers([...answers, answer]);
  }

  function handleRemoveAnswer(answerId) {
    setAnswers(answers.filter((item) => item.id !== answerId));
  }

  function handleDeleteQuestion() {
    deleteQuestion(questionId).then((res) => {
      if (res.code === 200) {
        toast.success("Your question is deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            navigate("/questions");
          }
        });
      }
    });
  }
  return (
    <>
      <Header />
      <BgComp />
      <ToastContainer />
      <section className="questions-detail-container">
        <div className="question-detail-header">
          <h1 className="question-title">{data ? data.title : null}</h1>
          <p className="info">
            Posted by:{" "}
            <span className="author">{data ? data.user.name : null}</span> |
            Date:{" "}
            <span className="date">
              {moment(data ? data.createdAt : "").format("DD/MM/YYYY")}
            </span>
          </p>
          {checkIsUserOwner(data.userId) && (
            <i>
              <FontAwesomeIcon
                icon={faXmark}
                className="close-icon"
                onClick={() => {
                  handleDeleteQuestion();
                }}
              />
            </i>
          )}
        </div>

        <section className="question">
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></p>
        </section>
        <section className="answers">
          <h2 className="title">{answers.length} Answers</h2>
          {answers.map((answer) => (
            <Answer answer={answer} removeAnswer={handleRemoveAnswer} />
          ))}
        </section>
        <section>
          <AnswerForm
            handleAddAnswer={handleAddAnswerToList}
            questionId={data.id}
          />
        </section>
      </section>
      <Footer />
    </>
  );
}

function Answer({ answer, removeAnswer }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getQuestionCommentsById(answer.id);
      if (res.code === 200) {
        setComments(res.data);
        console.log(res.data);
      }
    };
    fetchData();
  }, []);

  function handleAddCommentToList(comment) {
    setComments([...comments, comment]);
  }

  function handleDeleteAnswer() {
    deleteQuestionReply(answer.id)
      .then((res) => {
        if (res.code === 200) {
          removeAnswer(answer.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRemoveComment(commentId) {
    setComments(comments.filter((item) => item.id !== commentId));
  }

  return (
    <section className="answer">
      <section
        className="content"
        dangerouslySetInnerHTML={{ __html: answer.content }}
      ></section>
      <p className="info info-answer">
        Answered by: {answer.user.name} | Date:{" "}
        {moment(answer.createdAt).format("DD/MM/YYYY")}
      </p>
      <hr className="lighter-hr"></hr>
      <div className="comments">
        {comments.map((item) => (
          <Comment comment={item} removeComment={handleRemoveComment} />
        ))}
      </div>
      <CommentForm
        addComment={handleAddCommentToList}
        questionId={answer.questionId}
        answerId={answer.id}
      />
      <hr className="lighter-hr"></hr>
      {checkIsUserOwner(answer.userId) && (
        <i>
          <FontAwesomeIcon
            icon={faXmark}
            className="close-icon"
            onClick={() => {
              handleDeleteAnswer();
            }}
          />
        </i>
      )}
    </section>
  );
}

function Comment({ comment, removeComment }) {
  function handleDeleteComment() {
    deleteQuestionComment(comment.id)
      .then((res) => {
        if (res.code === 200) {
          removeComment(comment.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="comment">
      <p className="content content-comment">{comment.content}</p>
      <p className="info-comment">
        <span className="username"> {comment.user.name} </span>'
        {moment(comment.createdAt).format("DD/MM/YYYY")}'
      </p>
      <hr className="lighter-hr"></hr>
      {checkIsUserOwner(comment.userId) && (
        <i>
          <FontAwesomeIcon
            icon={faXmark}
            className="close-icon"
            onClick={() => {
              handleDeleteComment();
            }}
          />
        </i>
      )}
    </div>
  );
}

export default QuestionDetail_;
