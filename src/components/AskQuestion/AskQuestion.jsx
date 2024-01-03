import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Select from "react-select";
import styles from "./AskQuestion.scss";
import Editor from "../Editor/Editor";

import { createQuestion, updateQuestion } from "../../api/question";
import { toast } from "react-toastify";

import { checkAuthenticationInApp } from "../../services/common";
import { getAllCategory } from "../../api/category";

function AskQuestion({ onSubmit, data }) {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState({
    value: 1,
    label: "General"
  });
  const [newQuestion, setNewQuestion] = useState("");
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    checkAuthenticationInApp();
    async function fetchCategory() {
      const res = await getAllCategory();
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

    if (data) {
      setNewTitle(data.title);
      setNewQuestion(data.content);
      setSelectedTopic({
        value: data.category.id,
        label: data.category.name
      });
    }
  }, []);

  const handleTitleInputChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleTopicChange = (selectedOption) => {
    setSelectedTopic(selectedOption);
  };

  function handleSubmitQuestion() {
    if (newQuestion === "" || newTitle === "") {
      toast.warn("Please fill all the blank", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } else {
      const question = {
        title: newTitle,
        content: newQuestion,
        categoryId: selectedTopic.value
      };
      if (!data)
        createQuestion(question)
          .then((res) => {
            onSubmit(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      else
        updateQuestion(data.id, question)
          .then((res) => {
            onSubmit(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

  return (
    <div className="ask-question-container">
      <h2>Ask a public question</h2>
      <div class="modal-row">
        <Select
          placeholder="Select topic"
          value={selectedTopic}
          onChange={handleTopicChange}
          options={topics}
          className="select"
        />
      </div>
      <div class="title-container">
        <h3 class="title-item">Title</h3>
        <div class="title-item">
          Be specific and imagine you’re asking a question to another person.
        </div>
        <div>
          <input
            class="title-input"
            type="text"
            placeholder="Type your title here..."
            value={newTitle}
            onChange={handleTitleInputChange}
          ></input>
        </div>
      </div>
      <div class="context-container">
        <h3 class="title-item">What are the details of your problem? </h3>
        <div class="title-item">
          Introduce the problem and expand on what you put in the title.
        </div>
        <div class="question-form">
          <Editor setData={setNewQuestion} data={newQuestion} />
          <button
            onClick={handleSubmitQuestion}
            style={{ padding: "5px 10px", marginTop: "20px", fontSize: "15px" }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;
