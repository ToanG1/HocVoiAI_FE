import React from "react";
import styles from "./Roadmap1.scss";

import { useEffect } from "react";

import gsap from "gsap";

export default function Roadmap1() {
  useEffect(() => {
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

    const q1 = document.getElementById("q1");
    const q2 = document.getElementById("q2");
    const q3 = document.getElementById("q3");
    const q4 = document.getElementById("q4");
      
    q1.addEventListener("mouseenter", (e) => {
      q1.classList.add("active");

      if (
        q2.classList.contains("active") ||
        q3.classList.contains("active") ||
        q4.classList.contains("active")
      ) {
        q2.classList.remove("active");
        q3.classList.remove("active");
        q4.classList.remove("active");
      }
    });

    q2.addEventListener("mouseenter", (e) => {
      q2.classList.add("active");

      if (
        q1.classList.contains("active") ||
        q3.classList.contains("active") ||
        q4.classList.contains("active")
      ) {
        q1.classList.remove("active");
        q3.classList.remove("active");
        q4.classList.remove("active");
      }
    });

    q3.addEventListener("mouseenter", (e) => {
      q3.classList.add("active");

      if (
        q1.classList.contains("active") ||
        q2.classList.contains("active") ||
        q4.classList.contains("active")
      ) {
        q1.classList.remove("active");
        q2.classList.remove("active");
        q4.classList.remove("active");
      }
    });

    q4.addEventListener("mouseenter", (e) => {
      q4.classList.add("active");
      if (
        q1.classList.contains("active") ||
        q2.classList.contains("active") ||
        q3.classList.contains("active")
      ) {
        q1.classList.remove("active");
        q2.classList.remove("active");
        q3.classList.remove("active");
      }
    });
  }, []);

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
                <h2>Future Plans</h2>
              </div>
              <div className="years w-50">
                <ul>
                  <li className="active">2021</li>
                  <li>2022</li>
                  <li>2023</li>
                </ul>
              </div>
            </div>
            <div className="roadmap-content">
              <div className="w-25 quarter" id="q1">
                <div className="quarter-title">
                  <h2>Q1</h2>
                  <h2>2022</h2>
                </div>
                <div className="quarter-content">
                  <h4>Q1 - 2022</h4>
                  <ul>
                    <li>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </li>
                    <li>
                      <p>
                        In risus risus, placerat quis augue in, iaculis dictum
                        purus.
                      </p>
                    </li>
                    <li>
                      <p>Fusce non augue id velit faucibus pharetra.</p>
                    </li>
                    <li>
                      <p>
                        Quisque laoreet orci a urna scelerisque accumsan ac ut
                        mauris.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-25 quarter" id="q2">
                <div className="quarter-title">
                  <h2>Q2</h2>
                  <h2>2022</h2>
                </div>
                <div className="quarter-content">
                  <h4>Q2 - 2022</h4>
                  <ul>
                    <li>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </li>
                    <li>
                      <p>
                        In risus risus, placerat quis augue in, iaculis dictum
                        purus.
                      </p>
                    </li>
                    <li>
                      <p>Fusce non augue id velit faucibus pharetra.</p>
                    </li>
                    <li>
                      <p>
                        Quisque laoreet orci a urna scelerisque accumsan ac ut
                        mauris.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-25 quarter" id="q3">
                <div className="quarter-title">
                  <h2>Q3</h2>
                  <h2>2022</h2>
                </div>
                <div className="quarter-content">
                  <h4>Q3 - 2022</h4>
                  <ul>
                    <li>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </li>
                    <li>
                      <p>
                        In risus risus, placerat quis augue in, iaculis dictum
                        purus.
                      </p>
                    </li>
                    <li>
                      <p>Fusce non augue id velit faucibus pharetra.</p>
                    </li>
                    <li>
                      <p>
                        Quisque laoreet orci a urna scelerisque accumsan ac ut
                        mauris.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-25 quarter" id="q4">
                <div className="quarter-title">
                  <h2>Q4</h2>
                  <h2>2022</h2>
                </div>
                <div className="quarter-content">
                  <h4>Q4 - 2022</h4>
                  <ul>
                    <li>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </li>
                    <li>
                      <p>
                        In risus risus, placerat quis augue in, iaculis dictum
                        purus.
                      </p>
                    </li>
                    <li>
                      <p>Fusce non augue id velit faucibus pharetra.</p>
                    </li>
                    <li>
                      <p>
                        Quisque laoreet orci a urna scelerisque accumsan ac ut
                        mauris.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
