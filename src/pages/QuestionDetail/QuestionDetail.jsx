import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuestionDetail.scss";
import { useParams } from "react-router-dom";

import CommentForm from "./CommentForm";
import AnswerForm from "./AnswerForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BgComp from "../../components/BgComp/BgComp";

import { getQuestion } from "../../api/question";
import { getQuestionRepliesByQId } from "../../api/question-reply";

import moment from "moment";

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
      console.log(res);
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
        console.log(res.data);
      }
    };
    fetchData();
  }, []);

  function handleAddAnswerToList(answer) {
    setAnswers([...answers, answer]);
  }

  return (
    <>
      <Header />
      <BgComp />
      <section className="questions-detail-container">
        <header>
          <h1 className="question-title">{data ? data.title : null}</h1>
          <p className="info">
            Posted by:{" "}
            <span className="author">{data ? data.user.name : null}</span> |
            Date:{" "}
            <span className="date">
              {moment(data ? data.createdAt : "").format("DD/MM/YYYY")}
            </span>
          </p>
        </header>

        <section className="question">
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></p>
          {answers.map((item) => (
            <Comment />
          ))}
        </section>
        <CommentForm />

        <section className="answers">
          <h2 className="title">{answers.length} Answers</h2>
          {answers.map((answer) => (
            <Answer answer={answer} />
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

function Answer({ answer }) {
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
      <section className="comments"></section>
      <CommentForm />
      <hr className="lighter-hr"></hr>
    </section>
  );
}

function Comment({}) {
  return (
    <section className="comment">
      <p className="content content-comment">nice</p>
      <p className="info-comment">
        <span className="username"> Ninh </span>
        '12/02/2023'
      </p>
      <hr className="lighter-hr"></hr>
    </section>
  );
}

export default QuestionDetail_;
