import React, { ReactDOM } from "react";
import styles from "./Roadmap1.scss";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";

import { data } from "../../../api/data";

function removeActiveOnContent() {
  const content = document.getElementsByClassName("roadmap1-milestone-content");
  for (let i = 0; i < content.length; i++) {
    content[i].classList.remove("active");
  }
}

function setAnimation() {
  document.body.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    gsap.set(".cursor", {
      x: mouseX,
      y: mouseY,
    });

    gsap.to(".shape", {
      x: mouseX,
      y: mouseY,
      stagger: -0.05,
    });
  });
}

export default function Roadmap1({ mode }) {
  const [searchParams] = useSearchParams();
  console.log(mode);
  const [roadmap, setRoadmap] = useState({
    title: "How to cook cookies",
    milestones: [],
  });
  // const [roadmap, setRoadmap] = useState(data);
  const [milestones, setMilestones] = useState([]);
  const [milestonesContent, setMilestonesContent] = useState([]);

  useEffect(() => {
    setAnimation();
    switch (mode) {
      case "watch":
        setRoadmap(data);
        renderMilestone();
        renderMilestoneContent(0);
        break;
      case "create":
        handleCreateMilestone();
        break;
      case "edit":
        break;
      default:
        renderMilestone();
        renderMilestoneContent(0);
    }
  }, []);

  // Render milestones in watch mode
  function renderMilestone() {
    if (roadmap.milestones !== undefined)
      setMilestones(
        roadmap.milestones.map((item, index) => {
          return (
            <li
              className={
                index === 0 ? "active roadmap1-milestone" : "roadmap1-milestone"
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
          .concat(
            <textarea
              type="text"
              cols={15}
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
                      { name: e.target.value, content: [] },
                    ],
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
      case "create":
        handleCreateMilestoneContent(e.target.id);
        break;
      default:
        renderMilestoneContent(e.target.id);
    }
  }

  // Render milestones content in watch mode
  function renderMilestoneContent(index) {
    if (roadmap.milestones[index] !== undefined) {
      setMilestonesContent(
        roadmap.milestones[index].content.map((item, index) => {
          return (
            <div
              className="w-25 quarter roadmap1-milestone-content"
              id={index}
              onMouseEnter={(e) => {
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
                <ul>
                  {item.description.map((item) => {
                    return (
                      <li>
                        <p>{item}</p>
                      </li>
                    );
                  })}
                </ul>
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
                                                  ),
                                              };
                                            } else return content;
                                          }
                                        ),
                                      };
                                    } else return item;
                                  }
                                ),
                              });
                              console.log(roadmap);
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
                              { name: e.target.value, description: [] },
                            ],
                          };
                        return item;
                      }),
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

  useEffect(() => {
    if (mode === "create") {
      handleCreateMilestone();
    }
  }, [roadmap]);

  useEffect(() => {
    const element = document.getElementsByClassName(
      "roadmap1-milestone active"
    )[0];
    if (mode === "create" && element !== undefined) {
      handleCreateMilestoneContent(element.id);
    }
  }, [roadmap.milestones]);
  return (
    <>
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
              <div className="title w-50">
                <p>Roadmap</p>
                <h2>{roadmap.title}</h2>
              </div>
              <div className="years w-50">
                <ul>{milestones}</ul>
              </div>
            </div>
            <div className="roadmap-content">{milestonesContent}</div>
          </div>
        </div>
      </div>
    </>
  );
}
