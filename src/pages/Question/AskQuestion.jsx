import React, { useState } from "react";
import { useCallback } from "react";
import Select from "react-select";
import styles from "./Question.scss";
import Editor from "../../components/Editor/Editor";

const topics = [
  { value: "Tuition", label: "Tuition" },
  { value: "Pronunciation", label: "Pronunciation" },
  { value: "Grammar", label: "Grammar" },
];

function AskQuestion({ onSubmit }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleTitleInputChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleTopicChange = (selectedOption) => {
    setSelectedTopic(selectedOption);
  };

  const handleSubmit = useCallback(() => {
    if (newQuestion.trim() === "" || newTitle.trim() === "" || !selectedTopic)
      return;
    onSubmit({
      topic: selectedTopic.label,
      title: newTitle,
      content: newQuestion,
    });
  }, [newTitle, newQuestion, selectedTopic]);

  return (
    <div className="ask-question">
      <h2>Ask a public question</h2>
      <div class="modal-row">
        <Select
          placeholder="Select topic"
          defaultValue={selectedTopic}
          onChange={handleTopicChange}
          options={topics}
          className="select"
        />
      </div>
      <div class="title-container">
        <h5 class="title-item">Title </h5>
        <div class="title-item">
          Be specific and imagine you’re asking a question to another person.
        </div>
        <div class="question-form">
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
        <h5 class="title-item">What are the details of your problem? </h5>
        <div class="title-item">
          Introduce the problem and expand on what you put in the title.
        </div>
        <div class="question-form">
          <Editor setData={setNewQuestion} />
          <button
            type="submit"
            onClick={handleSubmit}
            style={{ padding: "5px 10px", fontSize: "15px" }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;
