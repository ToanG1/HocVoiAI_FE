import React, { useState } from "react";
import { useParams } from "react-router";
import styles from "./Roadmap2.scss";
import { useEffect } from "react";

export default function Roadmap2({ rMode, content }) {
  const [mode, setMode] = useState(rMode);
  const { roadmapId } = useParams();
  const [roadmap, setRoadmap] = useState(content);
  const [milestones, setMilestones] = useState(content.milestones);
  const [milestonesContent, setMilestonesContent] = useState([]);
  var total,
    $slide,
    $slider,
    sliderWidth,
    increment = 120;
  var on = function () {
    $slider = document.getElementsByClassName("slider")[0];
    $slide = document.getElementsByClassName("slide");
    sliderWidth = $slider.offsetWidth;
    total = $slide.length;
    position();
  };

  var position = function () {
    const list = [...document.querySelectorAll(".slide")];
    const active = document.querySelector(".slide.active");
    var sign,
      half = list.indexOf(active),
      x = 0,
      z = 0,
      zindex,
      scaleX = 1.3,
      scaleY = 1.3,
      transformOrigin;
    for (let index = 0; index < list.length; index++) {
      var element = list[index];
      scaleX = scaleY = 1;
      transformOrigin = sliderWidth / 2;
      if (index < half) {
        sign = 1;
        zindex = index + 1;
        x = sliderWidth / 2 - increment * (half - index + 1);
        z = -increment * (half - index + 1);
      } else if (index > half) {
        sign = -1;
        zindex = total - index;
        x = sliderWidth / 2 + increment * (index - half + 1);
        z = -increment * (index - half + 1);
      } else {
        sign = 0;
        zindex = total;
        x = sliderWidth / 2;
        z = 1;
        scaleX = scaleY = 1.2;
        transformOrigin = 0;
      }
      element.style.transform = `translate3d(${calculateX(
        x,
        sign,
        300
      )}px, 0, ${z}px) scale3d(${scaleX}, ${scaleY}, 1)`;
      element.style.zIndex = zindex;
      if (transformOrigin !== 0)
        element.style.transformOrigin = `${transformOrigin}px 0px 0px`;
      else element.style.transformOrigin = "";
    }
  };

  var calculateX = function (position, sign, width) {
    switch (sign) {
      case 1:
      case 0:
        return position - width / 2;
      case -1:
        return position - width / 2;
      default:
    }
  };

  var recalculateSizes = function () {
    sliderWidth = $slider.offsetWidth;
    position();
  };

  var clickedImage = function (element) {
    if (
      element.classList.contains("active") ||
      document.getElementsByClassName("active")[0] === element
    )
      return;
    document.getElementsByClassName("active")[0].classList.remove("active");
    element.classList.add("active");
    position();
  };

  function addMilestoneHandler() {
    const nameDom = document.getElementById("input-name-new");
    setMilestones([
      ...milestones,
      { name: nameDom.value, description: milestonesContent }
    ]);
    nameDom.value = "";
    setMilestonesContent([]);
    position();
  }

  useEffect(() => {
    on();
    window.addEventListener("resize", recalculateSizes);
  }, [mode, milestones]);

  return (
    <>
      <div className="roadmap2-container">
        <button
          id="change-mode-btn"
          onClick={() => {
            setMode(mode === "watch" ? "edit" : "watch");
          }}
        >
          {mode === "watch" ? "Edit" : "Watch"}
        </button>
        <h1 className="main-title">{roadmap.title}</h1>
        <div className="slider">
          {milestones.map((milestone, i) => {
            return (
              <div
                className={`slide ${i === 0 ? "active" : ""}`}
                onClick={(e) => clickedImage(e.currentTarget)}
              >
                <div className="slide-container">
                  <h2 className="slide-Title">{milestone.name}</h2>
                  <div className="slide-description">
                    <ul>
                      {milestone.description.map((item) => {
                        return <li>{item}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}

          {mode !== "edit" ? (
            ""
          ) : (
            <div
              className={`slide ${milestones.length === 0 ? "active" : ""}`}
              onClick={(e) => clickedImage(e.currentTarget)}
            >
              <div className="slide-container new-slide">
                <input
                  className="slide-Title input-name"
                  id="input-name-new"
                  placeholder="Type name..."
                />
                <div className="slide-description">
                  <ul>
                    {milestonesContent.map((item) => {
                      return <li>{item}</li>;
                    })}
                    <input
                      className="input-decription"
                      id="input-decription-new"
                      placeholder="Type content..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setMilestonesContent([
                            ...milestonesContent,
                            e.target.value
                          ]);
                          e.target.value = "";
                        }
                      }}
                    />
                  </ul>
                </div>
                <button onClick={addMilestoneHandler}>Add</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
