import React, { ReactDOM } from "react";
import styles from "./Roadmap1.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import ChatBotHelper from "../../ChatBotHelper/ChatBotHelper";

import { updateRoadmap } from "../../../api/roadmap";

import { ToastContainer, toast } from "react-toastify";

function removeActiveOnContent() {
  const content = document.getElementsByClassName("roadmap1-milestone-content");
  for (let i = 0; i < content.length; i++) {
    content[i].classList.remove("active");
  }
}

function handleNavigateToSuggestedDocument(rmId, index, item) {
  localStorage.setItem("HOCVOIAI_SUGGESTED_DOCUMENT", JSON.stringify(item));
  window.location.href = `/roadmap/${rmId}/suggested-document/${index}`;
}

export default function Roadmap1({ rMode, content }) {
  const [mode, setMode] = useState(rMode);
  const { roadmapId } = useParams();
  const [roadmap, setRoadmap] = useState(content);
  const [milestones, setMilestones] = useState([]);
  const [milestonesContent, setMilestonesContent] = useState([]);

  // set animation and unset animation
  useEffect(() => {
    function setAnimation(event) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      gsap.set(".cursor", {
        x: mouseX,
        y: mouseY
      });

      gsap.to(".shape", {
        x: mouseX,
        y: mouseY,
        stagger: -0.05
      });
    }
    document.addEventListener("mousemove", (event) => setAnimation(event));
    return () => {
      document.removeEventListener("mousemove", (event) => setAnimation(event));
    };
  }, []);

  useEffect(() => {
    switch (mode) {
      case "watch":
        renderMilestone();
        renderMilestoneContent(0);
        break;
      case "edit":
        handleCreateMilestone();
        break;
      default:
        renderMilestone();
        renderMilestoneContent(0);
    }
  }, [mode]);

  // Render milestones in watch mode
  function renderMilestone() {
    if (roadmap.milestones !== undefined)
      if (roadmap.milestones.length === 0)
        setMilestones(<p>There are no milestones yet</p>);
      else
        setMilestones(
          roadmap.milestones.map((item, index) => {
            return (
              <li
                className={
                  index === 0
                    ? "active roadmap1-milestone"
                    : "roadmap1-milestone"
                }
                id={index}
                onClick={(e) => {
                  handleActiveMilestone(e);
                }}
                key={index}
              >
                {item.name}
              </li>
            );
          })
        );
  }
  // Render milestones in create mode and add input to create new milestone
  function handleCreateMilestone() {
    if (roadmap.milestones !== undefined)
      setMilestones(
        roadmap.milestones
          .map((item, index) => {
            return (
              <div
                className={
                  index === 0
                    ? "active roadmap1-milestone"
                    : "roadmap1-milestone"
                }
                id={index}
                onClick={(e) => {
                  handleActiveMilestone(e);
                  if (e.detail === 2) {
                    document
                      .getElementById("milestone-input" + index)
                      .classList.add("active");
                  }
                }}
                key={index}
                ref={(element) => {
                  if (element)
                    element.style.setProperty("display", "flex", "important");
                }}
                style={{ alignItems: "center" }}
              >
                {item.name}
                <textarea
                  type="text"
                  cols={15}
                  rows={2}
                  value={item.name}
                  className="milestone-input"
                  id={`milestone-input` + index}
                  placeholder="New Milestone"
                  onChange={(e) => {
                    if (e.target.value.length > 36) {
                      e.target.value = e.target.value.slice(0, 36);
                      window.alert("Please enter less than 36 characters");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setRoadmap({
                        ...roadmap,
                        milestones: roadmap.milestones.map((item, i) => {
                          if (i === index) {
                            return { name: e.target.value, content: [] };
                          } else {
                            return item;
                          }
                        })
                      });
                      document
                        .getElementById("milestone-input" + index)
                        .classList.remove("active");
                    }
                  }}
                  style={{ display: "none", marginLeft: "20px" }}
                />
              </div>
            );
          })
          .concat(
            <textarea
              type="text"
              cols={15}
              rows={2}
              className="milestone-input"
              placeholder="New Milestone"
              onChange={(e) => {
                if (e.target.value.length > 36) {
                  e.target.value = e.target.value.slice(0, 36);
                  window.alert("Please enter less than 36 characters");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setRoadmap({
                    ...roadmap,
                    milestones: [
                      ...roadmap.milestones,
                      { name: e.target.value, content: [] }
                    ]
                  });
                }
              }}
            />
          )
      );
  }
  // Handel active milestone
  function handleActiveMilestone(e) {
    const elements = document.getElementsByClassName("roadmap1-milestone");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    e.target.classList.add("active");
    switch (mode) {
      case "watch":
        renderMilestoneContent(e.target.id);
        break;
      case "edit":
        handleCreateMilestoneContent(e.target.id);
        break;
      default:
        renderMilestoneContent(e.target.id);
    }
  }

  // Render milestones content in watch mode
  function renderMilestoneContent(index) {
    if (roadmap.milestones[index] !== undefined) {
      if (roadmap.milestones[index].content.length === 0)
        setMilestonesContent(<h3>There are no content yet</h3>);
      else
        setMilestonesContent(
          roadmap.milestones[index].content.map((item, i) => {
            return (
              <div
                className="w-25 quarter roadmap1-milestone-content"
                id={"milestone-content" + i}
                onClick={(e) => {
                  e.currentTarget.classList.toggle("active");
                }}
              >
                <div className="quarter-title">
                  <h2>{item.name}</h2>
                </div>
                <div className="quarter-content">
                  <h4>{item.name}</h4>
                  <ul>
                    {item.description.map((item) => {
                      return (
                        <li>
                          <p>{item}</p>
                        </li>
                      );
                    })}
                  </ul>
                  {item.suggestion ? (
                    <div className="suggestion">
                      <span>{item.suggestion}</span>
                      <button
                        onClick={() =>
                          handleNavigateToSuggestedDocument(
                            roadmapId,
                            index,
                            item
                          )
                        }
                      >
                        View document
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })
        );
    }
  }

  // hanlde milestones content in create mode
  function handleCreateMilestoneContent(index) {
    if (roadmap.milestones[index] !== undefined) {
      setMilestonesContent(
        roadmap.milestones[index].content
          .map((item, i) => {
            return (
              <div
                className="w-25 quarter roadmap1-milestone-content"
                id={i}
                onMouseEnter={(e) => {
                  removeActiveOnContent();
                  e.currentTarget.classList.add("active");
                }}
                onMouseLeave={(e) => {
                  removeActiveOnContent();
                }}
              >
                <div className="quarter-title">
                  <h2>{item.name}</h2>
                </div>
                <div className="quarter-content">
                  <h4>{item.name}</h4>
                  <ul className="milestone-content">
                    {item.description
                      .map((item) => {
                        return (
                          <li>
                            <p>{item}</p>
                          </li>
                        );
                      })
                      .concat(
                        <div className="mls-input-wrapper">
                          <textarea
                            type="text"
                            cols={15}
                            rows={5}
                            id={`milestone-content-input` + i}
                          />
                          <button
                            class="milestone-content-submit"
                            onClick={() => {
                              setRoadmap({
                                ...roadmap,
                                milestones: roadmap.milestones.map(
                                  (item, j) => {
                                    if (j == index) {
                                      return {
                                        ...item,
                                        content: item.content.map(
                                          (content, k) => {
                                            if (k === i) {
                                              return {
                                                name: content.name,
                                                description:
                                                  content.description.concat(
                                                    document
                                                      .getElementById(
                                                        `milestone-content-input` +
                                                          i
                                                      )
                                                      .value.split("\n")
                                                  )
                                              };
                                            } else return content;
                                          }
                                        )
                                      };
                                    } else return item;
                                  }
                                )
                              });
                            }}
                          >
                            Done
                          </button>
                          ;
                        </div>
                      )}
                  </ul>
                </div>
              </div>
            );
          })
          .concat(
            roadmap.milestones[index].content.length < 5 ? (
              <input
                className="active roadmap1-new-content"
                type="text"
                placeholder="New Content"
                onChange={(e) => {
                  if (e.target.value.length > 36) {
                    e.target.value = e.target.value.slice(0, 46);
                    window.alert("Please enter less than 36 characters");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setRoadmap({
                      ...roadmap,
                      milestones: roadmap.milestones.map((item, i) => {
                        if (i == index)
                          return {
                            name: item.name,
                            content: [
                              ...item.content,
                              { name: e.target.value, description: [] }
                            ]
                          };
                        return item;
                      })
                    });
                  }
                }}
              ></input>
            ) : (
              <div></div>
            )
          )
      );
    }
  }

  // handle update content of roadmap
  async function handleUpdateContent() {
    updateRoadmap(roadmap, roadmapId)
      .then((res) => {
        if (res.code === 200) {
          setMode("watch");
          toast.success("Update roadmap successfuly!", {
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
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something wrong happen, please try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      });
  }

  useEffect(() => {
    if (mode === "edit") {
      handleCreateMilestone();
    }
  }, [roadmap]);

  useEffect(() => {
    const element = document.getElementsByClassName(
      "roadmap1-milestone active"
    )[0];
    if (mode === "edit" && element !== undefined) {
      handleCreateMilestoneContent(element.id);
    }
  }, [roadmap.milestones]);

  return (
    <>
      <ChatBotHelper />
      <ToastContainer />

      <div className="roadmap1">
        <div className="roadmap1-container">
          <div className="background">
            <div className="cursor"></div>
            <div className="shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
          </div>
          <div className="roadmap-section">
            <div className="roadmap-title-container">
              {mode === "edit" ? (
                <div className="create-btn" onClick={handleUpdateContent}>
                  Complete Edit
                </div>
              ) : null}
              <div className="title w-50">
                <p>Roadmap</p>
                <h2>{content.title}</h2>
              </div>
              <div className="years w-50">
                <ul>{milestones}</ul>
              </div>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                onClick={() => {
                  setMode(mode === "edit" ? "watch" : "edit");
                }}
                size="2xl"
                color="#fff"
                style={{ paddingLeft: "20px" }}
              />
            </div>
            <div className="roadmap-content">{milestonesContent}</div>
          </div>
        </div>
      </div>
    </>
  );
}
