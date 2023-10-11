import React, { useState } from 'react'
import { useCallback } from 'react'
import Select from 'react-select'
import styles from './Question.scss'

const topics = [
  { value: 'Tuition', label: 'Tuition' },
  { value: 'Pronunciation', label: 'Pronunciation' },
  { value: 'Grammar', label: 'Grammar' },
]

function AskQuestion({ onSubmit }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [newQuestion, setNewQuestion] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [isTopicSelected, setIsTopicSelected] = useState(false)
  const [isTitleEntered, setIsTitleEntered] = useState(false)

  const handleInputChange = (event) => {
    setNewQuestion(event.target.value)
  }
  const handleTitleInputChange = (event) => {
    setNewTitle(event.target.value)
    setIsTitleEntered(true)
  }
  const handleTopicChange = (selectedOption) => {
    setSelectedTopic(selectedOption)
    setIsTopicSelected(true)
  }

  const handleSubmit = useCallback(() => {
    if (newQuestion.trim() === '' || newTitle.trim() === '' || !selectedTopic)
      return
    onSubmit({
      topic: selectedTopic.label,
      title: newTitle,
      content: newQuestion,
    })
  }, [newTitle, newQuestion, selectedTopic])

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
          <textarea
            class="title-textarea"
            placeholder="Type your title here..."
            value={newTitle}
            onChange={handleTitleInputChange}
            disabled={!isTopicSelected} // Disable if a topic is not selected
          ></textarea>
        </div>
      </div>
      <div class="context-container">
        <h5 class="title-item">What are the details of your problem? </h5>
        <div class="title-item">
          Introduce the problem and expand on what you put in the title.
        </div>
        <div class="question-form">
          <textarea
            placeholder="Type your question here..."
            value={newQuestion}
            onChange={handleInputChange}
            disabled={!isTitleEntered} // Disable if a title is not entered
          ></textarea>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default AskQuestion
