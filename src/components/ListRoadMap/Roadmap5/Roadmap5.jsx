import React from "react";
import styles from "./Roadmap5.scss";

import { useState, useEffect, useRef } from "react";
import Slider, { slickGoTo } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import catImg from "../../../assets/images/cat-img.png";

export default function Roadmap5({ mode }) {
  const [speed, setSpeed] = useState(300);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(() => {
    let areClipPathShapesSupported = function () {
      let base = "clipPath",
        prefixes = ["webkit", "moz", "ms", "o"],
        properties = [base],
        testElement = document.createElement("testelement"),
        attribute = "polygon(50% 0%, 0% 100%, 100% 100%)";

      // Push the prefixed properties into the array of properties.
      for (let i = 0, l = prefixes.length; i < l; i++) {
        let prefixedProperty =
          prefixes[i] + base.charAt(0).toUpperCase() + base.slice(1); // remember to capitalize!
        properties.push(prefixedProperty);
      }

      // Interate over the properties and see if they pass two tests.
      for (let i = 0, l = properties.length; i < l; i++) {
        let property = properties[i];

        // First, they need to even support clip-path (IE <= 11 does not)...
        if (testElement.style[property] === "") {
          // Second, we need to see what happens when we try to create a CSS shape...
          testElement.style[property] = attribute;
          if (testElement.style[property] !== "") {
            return true;
          }
        }
      }

      return false;
    };

    let timelineOffset =
      document.getElementsByClassName("timeline")[0].offsetLeft;
    let triangleWidth = document.getElementsByClassName(
      "timeline__path__triangle--moving"
    )[0].offsetWidth;

    const timeline = document.getElementsByClassName("timeline");
    for (let i = 0; i < timeline.length; i++) {
      timeline[i].addEventListener("mousemove", (evt) => {
        let value = evt.pageX - timelineOffset - triangleWidth / 2;
        document.getElementsByClassName(
          "timeline__path__triangle--moving"
        )[0].style.transform = `translateX(${value}px)`;
      });
    }

    if (!areClipPathShapesSupported()) {
      document
        .getElementsByClassName("roadmap5-container")[0]
        .classList.add("no-clippath");
    } else {
      document
        .getElementsByClassName("roadmap5-container")[0]
        .classList.add("clippath");
    }
  }, []);

  const sliderRef = useRef();

  const handleClickTimeLine = (e, i) => {
    e.preventDefault();
    const timeline = document.getElementsByClassName("timeline__item");
    for (let i = 0; i < timeline.length; i++) {
      timeline[i].classList.remove("timeline__item--active");
    }
    e.currentTarget.classList.add("timeline__item--active");
    sliderRef.current.slickGoTo(i);
  };

  return (
    <>
      <div className="roadmap5-container">
        <div className="page">
          <Slider ref={sliderRef} {...settings} className="views">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => {
              return (
                <div className="view" key={item}>
                  <div className="view__inner">
                    <h2 style={{ fontSize: "100px" }}>200{item}</h2>
                  </div>
                </div>
              );
            })}
          </Slider>
          <div className="timeline__wrapper">
            <div className="timeline">
              <ul className="timeline__list">
                {[1, 2, 3, 4, 5, 6, 7].map((item) => {
                  return (
                    <li
                      onClick={(e) => {
                        handleClickTimeLine(e, item - 1);
                      }}
                      className="timeline__item"
                    >
                      <a className="timeline__link">
                        <div className="timeline__item__point"></div>
                      </a>
                      <div className="timeline__item__content">
                        <img
                          className="timeline__item__thumb"
                          src={catImg}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          alt="timeline__item__thumb"
                        />
                        <div className="timeline__item__shadow"></div>
                      </div>
                      <div className="timeline__item__year">200{item}</div>
                    </li>
                  );
                })}
              </ul>

              <div className="timeline__path">
                <div className="timeline__path__triangle timeline__path__triangle--moving"></div>
                <div className="timeline__path__triangle timeline__path__triangle--static-1"></div>
                <div className="timeline__path__triangle timeline__path__triangle--static-2"></div>
                <div className="timeline__path__triangle timeline__path__triangle--static-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
