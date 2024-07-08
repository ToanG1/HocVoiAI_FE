import React, { useState } from "react";
import { useParams } from "react-router";
import styles from "./Roadmap3.scss";
import ChatBotHelper from "../../ChatBotHelper/ChatBotHelper";

import { useEffect } from "react";

export default function Roadmap3({ rMode, content }) {
  const [mode, setMode] = useState(rMode);
  const { roadmapId } = useParams();
  const [roadmap, setRoadmap] = useState(content);
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    removeActiveSuggestionHandler();
    var items = document.querySelectorAll("section.timeline li");
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        if (!items[i].classList.contains("in-view")) {
          items[i].classList.add("in-view");
        }
      } else if (items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
      }
    }
  }
  useEffect(() => {
    reArrangeMilestones();
    window.addEventListener("load", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  }, []);

  function reArrangeMilestones() {
    const milestones = document.getElementsByClassName("milestone");
    for (let i = 0; i < milestones.length; i++) {
      const width = milestones[i].offsetWidth;
      if (i % 2 === 0) {
        milestones[i].style.left = "45px";
      } else {
        milestones[i].style.left = -(width + 39) + "px";
      }
    }
  }

  function removeActiveSuggestionHandler(e) {
    const elements = document.getElementsByTagName("li");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
  }

  return (
    <>
      <ChatBotHelper />
      <div class="timeline-container">
        <section className="timeline">
          <ul>
            {roadmap.milestones.map((milestone, index) => {
              return (
                <li
                  onClick={(e) => {
                    removeActiveSuggestionHandler();
                    e.currentTarget.classList.add("active");
                  }}
                >
                  <div className="milestone">
                    <time>{milestone.duration}</time>
                    {milestone.content.map((content) => {
                      return (
                        <div>
                          <h1>{content.title}</h1>
                          <p>{content.description}</p>
                        </div>
                      );
                    })}
                    {milestone.suggestion ? (
                      <div className="suggestion">
                        <span>{milestone.suggestion}</span>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}
