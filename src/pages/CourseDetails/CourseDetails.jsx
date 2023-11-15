import React, { useEffect, useState } from "react";
import styles from "./CourseDetails.scss";
import { useParams } from "react-router";
import moment from "moment";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CourseOverview from "../../components/CourseOverview/CourseOverview";
import CourseCirculum from "../../components/CourseCirculum/CourseCirculum";

import { createImg } from "../../api/AIGenImg";
import { getRoadmap } from "../../api/roadmap";

import { ToastContainer } from "react-toastify";

function removeActiveClass() {
  document
    .getElementById("overview-btn")
    .classList.remove("course-details-active-btn");
  document
    .getElementById("curriculum-btn")
    .classList.remove("course-details-active-btn");
}
export default function CourseDetails() {
  const { courseId } = useParams("courseId");
  const [img, setImg] = useState("");
  const [detail, setDetail] = useState({});
  useEffect(() => {
    createImg("tech").then((res) => {
      setImg(res);
    });
    getRoadmap(courseId)
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) setDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const [page, setPage] = useState(0);
  useEffect(() => {
    switch (page) {
      case 0:
        removeActiveClass();
        document
          .getElementById("overview-btn")
          .classList.add("course-details-active-btn");
        break;
      case 1:
        
        removeActiveClass();
        document
          .getElementById("curriculum-btn")
          .classList.add("course-details-active-btn");
        break;
      default:
        removeActiveClass();
        document
          .getElementById("overview-btn")
          .classList.add("course-details-active-btn");
    }
  }, [page]);
  return (
    <>
      <Header />
      <div className="course-details-container">
        <ToastContainer />
        <div className="course-details-content">
          {detail.category ? (
            <div className="course-details-tag">{detail.category.name}</div>
          ) : null}
          <div className="course-details-title">
            <p>{detail.title}</p>
            <p>created at {moment(detail.createdAt).format("DD/MM/YYYY")}</p>
          </div>

          <div className="course-details-nav">
            <button
              id="overview-btn"
              className="course-details-page-button"
              onClick={() => setPage(0)}
            >
              Overview
            </button>
            <button
              id="curriculum-btn"
              className="course-details-page-button"
              onClick={() => setPage(1)}
            >
              Curriculum
            </button>
          </div>
          <div className="course-details-body">
            {page === 0 ? (
              <CourseOverview detail={detail} />
            ) : (
              <CourseCirculum id={courseId} />
            )}
          </div>
        </div>
        <div className="course-details-sidebar">
          <div className="course-details-sidebar-header">
            <button className="course-details-sidebar-button">Share</button>
            <button className="course-details-sidebar-button">Delete</button>
          </div>
          <div className="course-details-sidebar-content">
            <img
              src={img}
              className="course-details-sidebar-image"
              alt="course-img"
            />
            <p style={{ marginBottom: "10px" }}>
              If this help you, please rate me
            </p>
            <button className="course-details-rating-button">Rate me</button>
            <div className="course-details-short-description">
              <h3>This Course Includes:</h3>
              <ul className="course-details-short-description-row">
                <li className="course-details-short-description-key">
                  Course level
                </li>
                <li className="course-details-short-description-value">
                  {detail.level || "not updated"}
                </li>
              </ul>
              <ul className="course-details-short-description-row">
                <li className="course-details-short-description-key">
                  Duration
                </li>
                <li className="course-details-short-description-value">
                  {detail.topics ? detail.topics + " topics" : "not updated"}
                </li>
              </ul>
              <ul className="course-details-short-description-row">
                <li className="course-details-short-description-key">Tag</li>
                <li className="course-details-short-description-value">
                  {detail.tag
                    ? detail.tag.map((item) => {
                        return item.name + " ";
                      })
                    : "not updated"}
                </li>
              </ul>
              <ul className="course-details-short-description-row">
                <li className="course-details-short-description-key">
                  Language
                </li>
                <li className="course-details-short-description-value">
                  {detail.language || "not updated"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
