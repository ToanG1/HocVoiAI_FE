import React, { useEffect, useState } from "react";
import styles from "./Course.scss";

import CourseBox from "../../components/CourseBox/CourseBox";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BgComp from "../../components/BgComp/BgComp";

import { ToastContainer } from "react-toastify";

import { getAllPrivilege } from "../../api/roadmap";

function clearActiveNavItem() {
  const elements = document.getElementsByClassName("course-nav-item");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("course-nav-item-activated");
  }
}
function clearActiveSideNavItem() {
  const elements = document.getElementsByClassName("course-side-nav-item");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("course-side-nav-item-activated");
  }
}
export default function Course() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllPrivilege()
      .then((res) => {
        if (res.data.code === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function ActiveNavItem(e) {
    clearActiveNavItem();
    e.target.classList.add("course-nav-item-activated");
  }
  function ActiveSideNavItem(e) {
    clearActiveSideNavItem();
    e.target.classList.add("course-side-nav-item-activated");
  }

  return (
    <>
      <Header />
      <BgComp />
      <div className="course-container">
        <ToastContainer />
        <div className="course-header">
          <div className="course-user-info">
            <img src="https://picsum.photos/200/300" alt="user-img" />
            <div>
              <p className="course-user-name">Welcome back, Toan!</p>
              <p className="course-add-course">Add more courses</p>
            </div>
          </div>
          <div className="course-skills">
            <span>Skill evaluations</span>
            <span>Show all</span>
          </div>
          <div id="course-nav">
            <div
              className="course-nav-item course-nav-item-activated"
              onClick={(e) => {
                ActiveNavItem(e);
              }}
            >
              My Library
            </div>
            <div
              className="course-nav-item"
              onClick={(e) => {
                ActiveNavItem(e);
              }}
            >
              My Goals
            </div>
          </div>
        </div>
        <div className="course-body">
          <div className="course-side-nav">
            <div
              className="course-side-nav-item course-side-nav-item-activated"
              onClick={(e) => {
                ActiveSideNavItem(e);
              }}
            >
              In Progress
            </div>
            <div
              className="course-side-nav-item"
              onClick={(e) => {
                ActiveSideNavItem(e);
              }}
            >
              New
            </div>
            <div
              className="course-side-nav-item"
              onClick={(e) => {
                ActiveSideNavItem(e);
              }}
            >
              Saved
            </div>
            <div
              className="course-side-nav-item"
              onClick={(e) => {
                ActiveSideNavItem(e);
              }}
            >
              Learning History
            </div>
          </div>
          <div className="course-list">
            {data.map((item, i) => {
              return (
                <>
                  <CourseBox
                    course={item}
                    key={i}
                    className="course-grid-item"
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
