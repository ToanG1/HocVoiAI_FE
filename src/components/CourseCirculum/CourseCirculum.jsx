import React, { useEffect, useState } from "react";
import styles from "./CourseCirculum.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";

import { toast } from "react-toastify";
import { getRoadmap, updateRoadmap } from "../../api/roadmap";

function calculateTimer(item) {
  if (item.countFrom !== "0001-01-01T00:00:00Z") {
    const time = new Date() - new Date(item.countFrom);
    return time / 1000 / 60 / 60 / 24 + item.totalTime;
  } else {
    return item.totalTime;
  }
}

function toggleTimer(item) {
  if (item.countFrom !== "0001-01-01T00:00:00Z") {
    const time = new Date() - new Date(item.countFrom);
    const totalTime = time / 1000 / 60 / 60 / 24 + item.totalTime;
    return {
      ...item,
      totalTime: totalTime,
      countFrom: "0001-01-01T00:00:00Z"
    };
  } else {
    return {
      ...item,
      countFrom: new Date()
    };
  }
}

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
  const [roadmap, setRoadmap] = useState({});
  useEffect(() => {
    async function fecthData() {
      const res = await getRoadmap(id);
      if (res.code === 200) {
        setContent(JSON.parse(res.data.roadmap.topics));
        setRoadmap(res.data.roadmap);
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

  function handleUpdateTimer(topicId, contentId) {
    const newContent = content.map((topic) => {
      if (topic.id === topicId) {
        return {
          ...topic,
          content: topic.content.map((content) => {
            if (content.id === contentId) {
              return toggleTimer(content);
            } else return content;
          })
        };
      } else {
        return topic;
      }
    });

    updateRoadmap(
      {
        title: roadmap.title,
        milestones: newContent
      },
      id
    ).then((res) => {
      if (res.code === 200) {
        setContent(newContent);
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
    });
  }

  return (
    <>
      <div className="course-details-curriculum">
        {content.length === 0 ? <h1>No content</h1> : null}
        {content.map((topic, index) => {
          return (
            <>
              <div className="course-details-topic" key={index}>
                <div
                  className="course-details-topic-title"
                  id={"topic" + index}
                  onClick={() => openTopic(index)}
                >
                  <h2>{topic.name}</h2>
                  <h2>0/{topic.content.length}</h2>
                </div>
                <div className={`course-details-lesson-list list${index}`}>
                  {topic.content.map((content, j) => {
                    return (
                      <>
                        <div
                          className="course-details-lesson"
                          key={j}
                          onClick={() =>
                            handleUpdateTimer(topic.id, content.id)
                          }
                        >
                          <p>Chapter {j}</p>
                          <p>{content.name}</p>
                          <p>
                            {Math.round(calculateTimer(content) * 100) / 100} /{" "}
                            {content.estimatedTime} hour
                            {content.countFrom !== "0001-01-01T00:00:00Z" ? (
                              <i>
                                <FontAwesomeIcon
                                  icon={faCircleSolid}
                                  size="xs"
                                />
                              </i>
                            ) : (
                              <i>
                                <FontAwesomeIcon
                                  icon={faCircleRegular}
                                  size="xs"
                                />
                              </i>
                            )}
                          </p>
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
