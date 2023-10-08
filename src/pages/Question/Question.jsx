import React, { useCallback, useEffect, useState } from 'react'
import styles from './Question.scss'
import QuestionList from './QuestionList'
import AskQuestion from './AskQuestion'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import Select from 'react-select'
import { MOCK_QUESTIONS } from './const'
import ReactPaginate from 'react-paginate'

const topics = [
  { value: 'Tuition', label: 'Tuition' },
  { value: 'Pronunciation', label: 'Pronunciation' },
  { value: 'Grammar', label: 'Grammar' },
]
const months = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
]
const years = [
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
]

const itemsPerPage = 10

function Question() {
  const [questions, setQuestions] = useState([])
  const [pageCount, setPageCount] = useState(0) // index of page
  const [itemOffset, setItemOffset] = useState(0)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setQuestions(MOCK_QUESTIONS.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(MOCK_QUESTIONS.length / itemsPerPage))
  }, [itemOffset])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % MOCK_QUESTIONS.length
    setItemOffset(newOffset)
  }

  const addQuestion = (newQuestion) => {
    console.log(newQuestion)
    setQuestions([...questions, newQuestion])
  }

  const handleAskQuestion = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  const handleOnCloseModal = useCallback(() => {
    setIsOpenModal(false)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="title-row">
          <h2>All Questions</h2>
          <button
            type="submit"
            className="ask-question-btn"
            onClick={handleAskQuestion}
          >
            Ask Question
          </button>
        </div>
        <div className="title-row">
          <div>
            <p>24 questions</p>
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
      </header>
      <main className="main">
        <QuestionList questions={questions} />
      </main>
      <footer className="footer">
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
      </footer>
      <Modal
        open={isOpenModal}
        onClose={handleOnCloseModal}
        center
        classNames={{
          modal: 'customModal',
        }}
      >
        <AskQuestion onSubmit={addQuestion} />
      </Modal>
    </div>
  )
}

export default Question
