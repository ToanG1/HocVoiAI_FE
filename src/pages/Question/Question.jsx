import React, { useCallback, useEffect, useState, useMemo } from "react";
import styles from "./Question.scss";

import QuestionList from "./QuestionList";
import AskQuestion from "./AskQuestion";
import { Modal } from "react-responsive-modal";
import Select from "react-select";
import Pagination from "../Pagination/Pagination";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { getAllQuestion } from "../../api/question";
import { getAllCategory } from "../../api/category";

import { checkAuthenticationInApp } from "../../services/common";

const months = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" }
];
const years = [
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" }
];

function Question() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    checkAuthenticationInApp();

    async function fetchCategory() {
      const res = await getAllCategory();
      console.log(res);
      if (res.code === 200)
        setTopics(
          res.data.map((item) => {
            return {
              value: item.id,
              label: item.name
            };
          })
        );
    }
    fetchCategory().catch((err) => {
      console.log(err);
    });
  }, []);

  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllQuestion(page);
      if (res.code === 200) {
        setQuestions(res.data.data);
        setPageCount(Math.ceil(res.data.totalItems / res.data.limit));
        setTotalItems(res.data.totalItems);
      } else console.log(res.data);
    }
    fetchData().catch((err) => {
      console.log(err);
    });
  }, [page]);

  const filteredQuestions = useMemo(() => {
    const filteredData = questions.filter((question) => {
      const topicMatch =
        !selectedTopic || question.category.name === selectedTopic.label;
      const dateObject = new Date(question.createdAt);
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      const monthMatch =
        !selectedMonth || month === Number(selectedMonth.label);
      const yearMatch = !selectedYear || year === Number(selectedYear.label);
      return topicMatch && monthMatch && yearMatch;
    });

    return filteredData;
  }, [selectedTopic, selectedMonth, selectedYear, questions]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleSubmitQuestion = (data) => {
    setIsOpenModal(false);
    if (data) {
      toast.success("Your question is submitted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          window.location.reload();
        }
      });
    } else {
      toast.error("Something wrong !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  };

  const handleAskQuestion = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleOnCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <>
      <Header />
      <div className="questions-container">
        <ToastContainer />

        <div className="header">
          <div className="title-row">
            <h2>All Questions</h2>
            <button
              className="ask-question-btn"
              onClick={handleAskQuestion}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              Ask Question
            </button>
          </div>
          <div className="title-row">
            <div>
              <p>{totalItems} questions</p>
            </div>
            <div className="select-container">
              <Select
                placeholder="Topic"
                defaultValue={selectedTopic}
                onChange={(value) => setSelectedTopic(value)}
                options={topics}
                className="select"
              />
              <Select
                placeholder="Month"
                defaultValue={selectedMonth}
                onChange={(value) => setSelectedMonth(value)}
                options={months}
                className="select"
              />
              <Select
                placeholder="Year"
                defaultValue={selectedYear}
                onChange={(value) => setSelectedYear(value)}
                options={years}
                className="select"
              />
            </div>
          </div>
        </div>
        <div className="main">
          <QuestionList questions={filteredQuestions} />
        </div>
        <div className="footer">
          <Pagination pages={pageCount} onPageChange={handlePageClick} />
        </div>
        <Modal
          open={isOpenModal}
          onClose={handleOnCloseModal}
          center
          classNames={{
            modal: "customModal"
          }}
        >
          <AskQuestion onSubmit={handleSubmitQuestion} topics={topics} />
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default Question;
