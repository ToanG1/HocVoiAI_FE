import React, { useState, useEffect } from "react";
import styles from "./Search.scss";
import { Link, useSearchParams } from "react-router-dom";

import Select from "react-select";
import Pagination from "../Pagination/Pagination";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { searchRoadmap } from "../../api/roadmap";
import { searchQuestions } from "../../api/question";

import moment from "moment";

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

  function handleActiveNav(e, value) {
    handleRemoveActiveNav();
    setType(value);
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
      <section className="search-result-container">
        <div className="search-result-nav">
          <div className="search-type">
            <h2
              className="active-nav"
              onClick={(e) => handleActiveNav(e, "roadmap")}
            >
              Roadmap
            </h2>
            <h2 onClick={(e) => handleActiveNav(e, "question")}>Question</h2>
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
                  <Link
                    className="search-result-item roadmap-item"
                    key={item.id}
                    to={`/course/${item.id}`}
                  >
                    <h3>{item.title}</h3>
                    <img
                      src={item.avatar ? item.avatar : defaultImg}
                      alt={item.title}
                    />
                  </Link>
                );
              } else if (type === "question") {
                return (
                  <Link
                    className="search-result-item question-item"
                    key={item.id}
                    to={`/questions/${item.id}`}
                  >
                    <div className="content-row">
                      <h3>{item.title}</h3>
                      <p>
                        {item.content
                          ? item.content.replace(/<[^>]+>/g, "").slice(0, 100)
                          : ""}
                      </p>
                    </div>

                    <div className="topic-row">
                      <div className="styled-box ">{item.category.name}</div>
                      <div className="info-user-container">
                        <p className="info-user-item">
                          by {item.user ? item.user.name : ""}
                        </p>
                        <p className="info-user-item">
                          {moment(item.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </ul>
          <div className="pagination-container">
            <Pagination pages={pageCount} onPageChange={handlePageClick} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
