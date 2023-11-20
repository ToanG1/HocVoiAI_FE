import React, { useCallback, useEffect, useState } from "react";
import styles from "./QuestionDetail.scss";
import { useLocation, useParams } from "react-router-dom";
import AskQuestion from "../Question/AskQuestion";
import { Modal } from "react-responsive-modal";

import { ToastContainer } from "react-toastify";

function QuestionDetail({}) {
  const [questions, setQuestions] = useState([]);
  const { questionId } = useParams();
  const location = useLocation();
  const questionData = location.state.questionData;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleAskQuestion = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleOnCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);
  return (
    <div className="app">
      <ToastContainer />
      <header className="header">
        <div className="title-row">
          <h2>{questionData.title}</h2>
          <button
            type="submit"
            className="ask-question-btn"
            onClick={handleAskQuestion}
          >
            Ask Question
          </button>
        </div>
      </header>
      <main>
        <hr></hr>
        <p className="content">{questionData.content}</p>
        <div className="topic-row">
          <div className="styled-box">{questionData.topic}</div>
          <div className="info-user-container">
            <p className="info-user-item">Chris Du</p>
            <p className="info-user-item">10/06/2023</p>
          </div>
        </div>
      </main>
      <footer></footer>
      <Modal
        open={isOpenModal}
        onClose={handleOnCloseModal}
        center
        classNames={{
          modal: "customModal"
        }}
      >
        <AskQuestion onSubmit={addQuestion} />
      </Modal>
    </div>
  );
}

export default QuestionDetail;
