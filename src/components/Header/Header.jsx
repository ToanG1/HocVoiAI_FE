import React from "react";
import style from "../Header/Header.scss";
function HEADER() {
  return (
    <head>
      <div className="header">
        <h1 id="header-name">SmartStudyHub</h1>
        <div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-sm-8">
                <div className="left-content">
                  <p>
                    Địa chỉ: 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ
                    Chí Minh
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-sm-4">
                <div className="right-icons">
                  <ul>
                    <li className="scroll-to-section">
                      <a href="#top" className="active">
                        Home
                      </a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="#services">Services</a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="#courses">Courses</a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="#team">Team</a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="#events">Events</a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="#contact">Register Now!</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </head>
  );
}

export default HEADER;
