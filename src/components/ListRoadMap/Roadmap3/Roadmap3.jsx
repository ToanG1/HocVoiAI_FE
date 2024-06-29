import React from "react";
import styles from "./Roadmap3.scss";

import { useEffect } from "react";

export default function Roadmap3({ mode }) {
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
    window.addEventListener("load", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  }, []);

  return (
    <>
      <div class="timeline-container">
        <section className="timeline">
          <ul>
            {[...Array(10)].map((_, i) => (
              <li>
                <div>
                  <time>1687</time>
                  <div className="discovery">
                    <h1>Discovery</h1>
                    <p>Laws of motion</p>
                  </div>
                  <div className="scientist">
                    <h1>Scientist</h1>
                    <span>Newton</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
