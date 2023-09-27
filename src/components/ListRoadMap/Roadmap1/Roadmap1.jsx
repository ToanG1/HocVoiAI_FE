import React, { ReactDOM } from "react";
import styles from "./Roadmap1.scss";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";

import { data } from "../../../api/data";

function removeActiveOnContent(content) {
  for (let i = 0; i < content.length; i++) {
    content[i].classList.remove("active");
  }
}

function addEventToContent() {
  const content = document.getElementsByClassName("roadmap1-milestone-content");

  for (let i = 0; i < content.length; i++) {
    content[i].addEventListener("mouseenter", (e) => {
      removeActiveOnContent(content);
      content[i].classList.add("active");
    });
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

export default function Roadmap1() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const [roadmap, setRoadmap] = useState(data);
  const [milestones, setMilestones] = useState([]);
  const [milestonesContent, setMilestonesContent] = useState([]);

  useEffect(() => {
    setAnimation();
    switch (mode) {
      case "watch":
        renderMilestone();
        renderMilestoneContent(0);
        break;
      case "create":
        break;

      default:
        renderMilestone();
        renderMilestoneContent(0);
    }
  }, []);

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

  function handleActiveMilestone(e) {
    const elements = document.getElementsByClassName("roadmap1-milestone");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    e.target.classList.add("active");
    renderMilestoneContent(e.target.id);
  }

  function renderMilestoneContent(index) {
    if (roadmap.milestones !== undefined) {
      setMilestonesContent(
        roadmap.milestones[index].content.map((item, index) => {
          return (
            <div className="w-25 quarter roadmap1-milestone-content" id={index}>
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
  useEffect(() => {
    if (milestonesContent.length > 0) addEventToContent();
  }, [milestonesContent]);
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
            <div className="title-container">
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
