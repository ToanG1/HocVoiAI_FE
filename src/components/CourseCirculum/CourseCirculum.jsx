import React from "react";
import styles from "./CourseCirculum.scss";
import { ReactDOM } from "react";
export default function CourseCirculum() {
  const openTopic = (id) => {
    console.log(id);
    document
      .getElementById("topic" + id)
      .classList.toggle("course-details-topic-title-active");
    let list = document.getElementsByClassName("list" + id);
    for (let i = 0; i < list.length; i++) {
      list[i].classList.toggle("course-details-lesson-list-active");
    }
  };

  return (
    <>
      <div className="course-details-curriculum">
        {[1, 2, 3, 4, 5].map((topicId) => {
          return (
            <>
              <div
                className="course-details-topic"
                onClick={() => openTopic(topicId)}
              >
                <div
                  className="course-details-topic-title"
                  id={"topic" + topicId}
                >
                  <h2>Topic {topicId}</h2>
                  <h2>0/5</h2>
                </div>
                <div className={`course-details-lesson-list list${topicId}`}>
                  {[1, 2, 3].map((lessonId) => {
                    return (
                      <>
                        <div className="course-details-lesson">
                          <p>
                            Lesson {topicId}
                            {lessonId}
                          </p>
                          <p>This lesson is abut</p>
                          <p>14m</p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
