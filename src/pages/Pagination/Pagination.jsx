import React, { useState, useEffect } from "react";
import styles from "./Pagination.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const pageToShow = 5;

export default function Pagination({ pages, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(pageToShow);

  useEffect(() => {
    const start = Math.max(0, currentPage - Math.floor(pageToShow / 2));
    const end = Math.min(pages - 1, start + pageToShow - 1);
    if (end - start + 1 < pageToShow) {
      setStartPage(Math.max(0, end - pageToShow + 1));
    } else setStartPage(start);
    setEndPage(end);
  }, [currentPage, pages]);

  function handleBackWardPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  }
  function handleForWardPage() {
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  }

  return (
    <div className="pagination-container">
      <button onClick={handleBackWardPage}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {startPage > 0 ? <span>...</span> : null}
      {Array(endPage - startPage + 1)
        .fill()
        .map((_, index) => {
          index += startPage;
          return (
            <button
              key={index}
              className={currentPage === index ? "active" : ""}
              onClick={() => {
                setCurrentPage(index);
                onPageChange(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
      {startPage < pages - pageToShow ? <span>...</span> : null}

      <button onClick={handleForWardPage}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
