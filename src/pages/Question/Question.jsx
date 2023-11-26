import React, { useCallback, useEffect, useState } from "react";
import styles from "./Question.scss";


import QuestionList from "./QuestionList";
import AskQuestion from "./AskQuestion";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BgComp from "../../components/BgComp/BgComp";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { getAllQuestion } from "../../api/question";
import { getAllCategory } from "../../api/category";

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
  useEffect(() => {
    async function fetchCategory() {
      const res = await getAllCategory();
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
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllQuestion(page);
      if (res.data.code === 200) {
        setQuestions(res.data.data);
        setPageCount(Math.ceil(res.data.totalItems / res.data.limit));
        setTotalItems(res.data.totalItems);
      } else console.log(res.data);
    }
    fetchData().catch((err) => {
      console.log(err);
    });
  }, [page]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleSubmitQuestion = (data) => {
    setIsOpenModal(false);
    console.log(data);
    if (data.code === 201) {
      toast.success("Your question is submitted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      setInterval(() => {
        window.location.reload();
      }, 3000);
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
      <BgComp />
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
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={topics}
                className="select"
              />
              <Select
                placeholder="Month"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={months}
                className="select"
              />
              <Select
                placeholder="Year"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={years}
                className="select"
              />
            </div>
          </div>
        </div>
        <div className="main">
          <QuestionList questions={questions} />
        </div>
        <div className="footer">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
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
