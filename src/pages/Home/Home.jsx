import React, { useState, useEffect } from "react";
import styles from "./Home.scss";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import { Application, Graphics } from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import { createNoise2D } from "simplex-noise";
import hsl from "hsl-to-hex";
import debounce from "debounce";

import { ToastContainer } from "react-toastify";

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

const noise2D = createNoise2D();

class ColorPalette {
  constructor() {
    this.setColors();
    this.setCustomProperties();
  }

  setColors() {
    // pick a random hue somewhere between 220 and 360
    this.hue = ~~random(220, 360);
    this.complimentaryHue1 = this.hue + 30;
    this.complimentaryHue2 = this.hue + 60;
    // define a fixed saturation and lightness
    this.saturation = 95;
    this.lightness = 50;

    // define a base color
    this.baseColor = hsl(this.hue, this.saturation, this.lightness);
    // define a complimentary color, 30 degress away from the base
    this.complimentaryColor1 = hsl(
      this.complimentaryHue1,
      this.saturation,
      this.lightness
    );
    // define a second complimentary color, 60 degrees away from the base
    this.complimentaryColor2 = hsl(
      this.complimentaryHue2,
      this.saturation,
      this.lightness
    );

    // store the color choices in an array so that a random one can be picked later
    this.colorChoices = [
      this.baseColor,
      this.complimentaryColor1,
      this.complimentaryColor2
    ];
  }

  randomColor() {
    // pick a random color
    return this.colorChoices[~~random(0, this.colorChoices.length)].replace(
      "#",
      "0x"
    );
  }

  setCustomProperties() {
    // set CSS custom properties so that the colors defined here can be used throughout the UI
    document.documentElement.style.setProperty("--hue", this.hue);
    document.documentElement.style.setProperty(
      "--hue-complimentary1",
      this.complimentaryHue1
    );
    document.documentElement.style.setProperty(
      "--hue-complimentary2",
      this.complimentaryHue2
    );
  }
}

class Orb {
  constructor(fill = 0x000000) {
    this.bounds = this.setBounds();
    this.x = random(this.bounds["x"].min, this.bounds["x"].max);
    this.y = random(this.bounds["y"].min, this.bounds["y"].max);

    this.scale = 1;

    this.fill = fill;

    this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

    this.xOff = random(0, 1000);
    this.yOff = random(0, 1000);
    this.inc = 0.002;

    this.graphics = new Graphics();
    this.graphics.alpha = 0.825;

    window.addEventListener(
      "resize",
      debounce(() => {
        this.bounds = this.setBounds();
      }, 250)
    );
  }

  setBounds() {
    const maxDist =
      window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;
    const originX = window.innerWidth / 1.25;
    const originY =
      window.innerWidth < 1000
        ? window.innerHeight
        : window.innerHeight / 1.375;

    return {
      x: {
        min: originX - maxDist,
        max: originX + maxDist
      },
      y: {
        min: originY - maxDist,
        max: originY + maxDist
      }
    };
  }

  update() {
    const xNoise = noise2D(this.xOff, this.xOff);
    const yNoise = noise2D(this.yOff, this.yOff);
    const scaleNoise = noise2D(this.xOff, this.yOff);

    this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
    this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);
    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    this.xOff += this.inc;
    this.yOff += this.inc;
  }

  render() {
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    this.graphics.clear();

    this.graphics.beginFill(this.fill);
    this.graphics.drawCircle(0, 0, this.radius);
    this.graphics.endFill();
  }
}

export default function Home() {
  const [level, setLevel] = useState("beginner");
  const [language, setLanguage] = useState("english");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const app = new Application({
      view: document.querySelector(".orb-canvas"),
      resizeTo: window,
      transparent: true
    });

    app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

    const colorPalette = new ColorPalette();

    const orbs = [];

    for (let i = 0; i < 10; i++) {
      const orb = new Orb(colorPalette.randomColor());

      app.stage.addChild(orb.graphics);

      orbs.push(orb);
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      app.ticker.add(() => {
        orbs.forEach((orb) => {
          orb.update();
          orb.render();
        });
      });
    } else {
      orbs.forEach((orb) => {
        orb.update();
        orb.render();
      });
    }

    document
      .querySelector(".overlay__btn--colors")
      .addEventListener("click", () => {
        colorPalette.setColors();
        colorPalette.setCustomProperties();

        orbs.forEach((orb) => {
          orb.fill = colorPalette.randomColor();
        });
      });
  }, []);

  const handleSaveTopics = () => {
    localStorage.setItem("toGenTopics", JSON.stringify(checkLeftoverTopics()));
  };

  function checkLeftoverTopics() {
    if (document.getElementById("topic-input").value !== "") {
      return topics.concat([
        {
          topic: document.getElementById("topic-input").value,
          level: document.getElementById("level").value,
          language: document.getElementById("language").value
        }
      ]);
    } else return topics;
  }

  return (
    <>
      <section className="home-container">
        <ToastContainer />
        <div className="home-header">
          <p>
            <img src={logo} />
          </p>
          <div className="log-btn">
            <Link to="/login">Login</Link>
          </div>
          <div className="log-btn">
            <Link to="/signup">Signup</Link>
          </div>
        </div>
        <canvas className="orb-canvas"></canvas>
        <div className="overlay">
          <div className="overlay__inner">
            <h1 className="overlay__title">
              Hey, Let start a journey with us to build your
              <span className="text-gradient"> roadmap</span> better with AI?
            </h1>
            <p className="overlay__description">
              In this project we will bring you the roadmap you want to study
              some topics. Its may be generated by AI or by yourself.
              <strong>
                To start now, please let me know your interested topics !
              </strong>
            </p>
            <div className="home-input">
              <div className="input-container">
                <input
                  id="topic-input"
                  type="text"
                  placeholder="Enter your topics"
                  onKeyDown={(e) => {
                    if (topics.length >= 5) {
                      e.target.value = "";
                      alert("You can only enter 5 topics");
                    } else if (e.key === "Enter" && e.target.value !== "") {
                      setTopics([
                        ...topics,
                        {
                          topic: e.target.value,
                          level: level,
                          language: language
                        }
                      ]);
                      e.target.value = "";
                    }
                  }}
                />
                <select
                  onChange={(e) => setLevel(e.target.value)}
                  value={level}
                  name="level"
                  id="level"
                  className="home-input__select"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <select
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                  name="language"
                  id="language"
                  className="home-input__select"
                >
                  <option value="vietnamese">Vietnamese</option>
                  <option value="english">English</option>
                  <option value="japan">Japan</option>
                  <option value="chinese">Chinese</option>
                </select>
              </div>
              <div className="home-topics">
                {topics.map((item, i) => {
                  return (
                    <div className="home-topic" key={i}>
                      {item.topic}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="overlay__btns">
              <button
                onClick={handleSaveTopics}
                className="overlay__btn overlay__btn--transparent"
              >
                <Link to="/signup">Let go!</Link>
              </button>

              <button className="overlay__btn2 overlay__btn--colors">
                <span id="color-btn">😍</span>
              </button>
            </div>
          </div>
        </div>
        <div className="home-footer">
          <p>@HCMUTE 2023 - All Rights Reserved</p>
        </div>
      </section>
    </>
  );
}
