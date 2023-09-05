import React from "react";
import style from '../Header/Header.scss';
function HEADER() {
    return (
      <head>
         <div className="header">
            <h1 id="header-name">SmartStudyHub</h1>
            <div class="sub-header">
                <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-sm-8">
                    <div class="left-content">
                        <p>Địa chỉ: 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh</p>
                    </div>
                    </div>
                    <div class="col-lg-4 col-sm-4">
                    <div class="right-icons">
                        <ul>
                            <li class="scroll-to-section"><a href="#top" class="active">Home</a></li>
                            <li class="scroll-to-section"><a href="#services">Services</a></li>
                            <li class="scroll-to-section"><a href="#courses">Courses</a></li>
                            <li class="scroll-to-section"><a href="#team">Team</a></li>
                            <li class="scroll-to-section"><a href="#events">Events</a></li>
                            <li class="scroll-to-section"><a href="#contact">Register Now!</a></li>
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