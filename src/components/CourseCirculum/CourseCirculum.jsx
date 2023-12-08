import React, { useEffect, useState } from "react";
import styles from "./CourseCirculum.scss";

import { toast } from "react-toastify";
import { getRoadmap } from "../../api/roadmap";

export default function CourseCirculum({ id }) {
  const openTopic = (id) => {
    document
      .getElementById("topic" + id)
      .classList.toggle("course-details-topic-title-active");
    let list = document.getElementsByClassName("list" + id);
    for (let i = 0; i < list.length; i++) {
      list[i].classList.toggle("course-details-lesson-list-active");
    }
  };
  const [content, setContent] = useState([]);
  useEffect(() => {
    async function fecthData() {
      const res = await getRoadmap(id);
      if (res.code === 200) {
        setContent(JSON.parse(res.data.roadmap.topics));
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    }
    fecthData().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <div className="course-details-curriculum">
        {content.length === 0 ? <h1>No content</h1> : null}
        {content.map((topic, index) => {
          return (
            <>
              <div
                className="course-details-topic"
                onClick={() => openTopic(index)}
              >
                <div
                  className="course-details-topic-title"
                  id={"topic" + index}
                >
                  <h2>{topic.name}</h2>
                  <h2>0/{topic.content.length}</h2>
                </div>
                <div className={`course-details-lesson-list list${index}`}>
                  {topic.content.map((item, index) => {
                    return (
                      <>
                        <div className="course-details-lesson">
                          <p>Lesson {index}</p>
                          <p>{item.name}</p>
                          <p>0m</p>
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
