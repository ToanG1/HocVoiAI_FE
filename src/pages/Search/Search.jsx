import React, { useState, useEffect } from "react";
import styles from "./Search.scss";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BgComp from "../../components/BgComp/BgComp";

import { searchRoadmap } from "../../api/roadmap";
import { searchQuestions } from "../../api/question";
import defaultImg from "../../assets/images/roadmap.png";

const filterOptions = [
  {
    value: "newest",
    label: "Newest"
  },
  {
    value: "oldest",
    label: "Oldest"
  },
  {
    value: "mostWatched",
    label: "Most Watched"
  }
];

function handleRemoveActiveNav() {
  const navs = document.querySelectorAll(".search-type h2");
  navs.forEach((nav) => {
    nav.classList.remove("active-nav");
  });
}

export default function Search() {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  const [type, setType] = useState("roadmap");

  function handleActiveNav(e) {
    handleRemoveActiveNav();
    setType(type === "roadmap" ? "question" : "roadmap");
    e.currentTarget.classList.add("active-nav");
  }

  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    if (type === "question") {
      searchQuestions(keyword, page)
        .then((res) => {
          if (res.code === 200) {
            setSearchResult(res.data.data);
            setPageCount(Math.ceil(res.data.totalItems / res.data.limit));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else
      searchRoadmap(keyword, page)
        .then((res) => {
          if (res.code === 200) {
            setSearchResult(res.data.data);
            setPageCount(Math.ceil(res.data.totalItems / res.data.limit));
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, [keyword, type, page]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <>
      <Header />
      <BgComp />
      <section className="search-result-container">
        <div className="search-result-nav">
          <div className="search-type">
            <h2 className="active-nav" onClick={(e) => handleActiveNav(e)}>
              Roadmap
            </h2>
            <h2 onClick={(e) => handleActiveNav(e)}>Question</h2>
          </div>
          <div className="search-filter">
            <Select
              placeholder="Filter"
              options={filterOptions}
              defaultValue={filterOptions[0]}
              className="select-filter"
            />
          </div>
        </div>
        <div className="search-result-list">
          <ul>
            {searchResult.map((item) => {
              if (type === "roadmap") {
                return (
                  <li
                    className="search-result-item roadmap-item"
                    key={item._id}
                  >
                    <h3>{item.title}</h3>
                    <img
                      src={item.avatar ? item.avatar : defaultImg}
                      alt={item.title}
                    />
                  </li>
                );
              } else {
                return (
                  <li
                    className="search-result-item question-item"
                    key={item._id}
                  >
                    {item.title}
                  </li>
                );
              }
            })}
          </ul>
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
      </section>
      <Footer />
    </>
  );
}
