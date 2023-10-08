import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function QuestionList({ questions }) {
  const [detailQuestion, setDetailQuestion] = useState(null)
  const navigate = useNavigate()
  const handleTitleClick = (question) => {
    navigate(`/questions/${question.id}`, { state: { questionData: question } })
  }

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const h3Style = {
    cursor: isHovered ? 'pointer' : 'default',
  }

  return (
    <div className="question-list">
      <div>
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <div
              className="title-question-row"
              style={h3Style}
              onClick={() => handleTitleClick(question)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {question.title}
            </div>
            <p>{question.content}</p>
            <div className="topic-row">
              <div className="styled-box">{question.topic}</div>
              <div className="info-user-container">
                <p className="info-user-item">Chris Du</p>
                <p className="info-user-item">10/06/2023</p>
              </div>
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionList
