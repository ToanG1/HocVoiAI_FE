import React from "react";
import styles from "./Roadmap2.scss";
import { useEffect } from "react";
export default function Roadmap2({mode}) {
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
    for (let index = 0; index < $slide.length; index++) {
      var element = $slide[index];
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

  var imageSize = function () {
    return $slider.offsetWidth / 3;
  };

  var recalculateSizes = function () {
    sliderWidth = $slider.offsetWidth;
    position();
  };

  var clickedImage = function (element) {
    document.getElementsByClassName("active")[0].classList.remove("active");
    element.classList.add("active");
    position();
  };
  useEffect(() => {
    on();
    window.addEventListener("resize", recalculateSizes);
    // const slides = document.getElementsByClassName("slide");
    // for (let i = 0; i < slides.length; i++) {
    //   slides[i].addEventListener("click", clickedImage(slides[i]));
    // }
  }, []);

  return (
    <>
      <div className="roadmap2-container">
        <h1 className="main-title">Roadmap By Pedalsup</h1>
        <div className="slider">
          <div
            className="slide active"
            onClick={(e) => clickedImage(e.currentTarget)}
          >
            <div className="slide-container">
              <h2 className="slide-Title">Q1 - 2021</h2>
              <div className="slide-description">
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>Nunc blandit justo ac dolor lobortis suscipit. </li>
                  <li>Et tincidunt lectus porta sit amet. </li>
                  <li>Nulla dignissim ligula nec faucibus feugiat. </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="slide" onClick={(e) => clickedImage(e.currentTarget)}>
            <div className="slide-container">
              <h2 className="slide-Title">Q2 - 2021</h2>
              <div className="slide-description">
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>Nunc blandit justo ac dolor lobortis suscipit. </li>
                  <li>Et tincidunt lectus porta sit amet. </li>
                  <li>Nulla dignissim ligula nec faucibus feugiat. </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="slide" onClick={(e) => clickedImage(e.currentTarget)}>
            <div className="slide-container">
              <h2 className="slide-Title">Q3 - 2021</h2>
              <div className="slide-description">
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>Nunc blandit justo ac dolor lobortis suscipit. </li>
                  <li>Et tincidunt lectus porta sit amet. </li>
                  <li>Nulla dignissim ligula nec faucibus feugiat. </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="slide" onClick={(e) => clickedImage(e.currentTarget)}>
            <div className="slide-container">
              <h2 className="slide-Title">Q4 - 2021</h2>
              <div className="slide-description">
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>Nunc blandit justo ac dolor lobortis suscipit. </li>
                  <li>Et tincidunt lectus porta sit amet. </li>
                  <li>Nulla dignissim ligula nec faucibus feugiat. </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="slide" onClick={(e) => clickedImage(e.currentTarget)}>
            <div className="slide-container">
              <h2 className="slide-Title">Q1 - 2022</h2>
              <div className="slide-description">
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>Nunc blandit justo ac dolor lobortis suscipit. </li>
                  <li>Et tincidunt lectus porta sit amet. </li>
                  <li>Nulla dignissim ligula nec faucibus feugiat. </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="slide" onClick={(e) => clickedImage(e.currentTarget)}>
            <div className="slide-container">
              <h2 className="slide-Title">Q2 - 2022</h2>
              <div className="slide-description">
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>Nunc blandit justo ac dolor lobortis suscipit. </li>
                  <li>Et tincidunt lectus porta sit amet. </li>
                  <li>Nulla dignissim ligula nec faucibus feugiat. </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="slide" onClick={(e) => clickedImage(e.currentTarget)}>
            <div className="slide-container">
              <h2 className="slide-Title">Q3 - 2022</h2>
              <div className="slide-description">
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>Nunc blandit justo ac dolor lobortis suscipit. </li>
                  <li>Et tincidunt lectus porta sit amet. </li>
                  <li>Nulla dignissim ligula nec faucibus feugiat. </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
