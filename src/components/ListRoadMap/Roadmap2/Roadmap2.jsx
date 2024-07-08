import React, { useState } from "react";
import { useParams } from "react-router";
import styles from "./Roadmap2.scss";
import { useEffect } from "react";
import ChatBotHelper from "../../ChatBotHelper/ChatBotHelper";

import { updateRoadmap } from "../../../api/roadmap";
import { ToastContainer, toast } from "react-toastify";

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
    if (element.classList.contains("active")) return;
    const elements = document.getElementsByClassName("slide active");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    element.classList.add("active");
    position();
  };

  function addMilestoneHandler() {
    const nameDom = document.getElementById("input-name-new");
    if (nameDom.value === "") return;
    setMilestones([
      ...milestones,
      { name: nameDom.value, description: milestonesContent }
    ]);
    nameDom.value = "";
    document.getElementById("input-decription-new").value = "";

    setMilestonesContent([]);
    position();
  }

  function updateRoadmapHandler() {
    const nameDom = document.getElementById("roadmap-title");
    if (nameDom.value === "") return;
    setRoadmap({ ...roadmap, title: nameDom.value });
    updateRoadmap({ title: nameDom.value, milestones }, roadmapId)
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
    on();
    window.addEventListener("resize", recalculateSizes);
  }, [mode, milestones]);

  return (
    <>
      <ChatBotHelper />
      <ToastContainer />
      <div className="roadmap2-container">
        <div id="change-mode-btn">
          <button
            onClick={() => {
              setMode(mode === "watch" ? "edit" : "watch");
            }}
          >
            {mode === "watch" ? "Edit" : "Watch"}
          </button>
          {mode === "edit" ? (
            <button
              onClick={() => {
                updateRoadmapHandler();
              }}
            >
              Save
            </button>
          ) : (
            ""
          )}
        </div>

        <div>
          {mode === "watch" ? (
            <h1 className="main-title">{roadmap.title}</h1>
          ) : (
            <input
              className="input-roadmap-title"
              type="text"
              id="roadmap-title"
              value={roadmap.title}
            />
          )}
        </div>

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
                {milestone.suggestion ? (
                  <div className="suggestion">
                    <span>{milestone.suggestion}</span>
                  </div>
                ) : null}
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
