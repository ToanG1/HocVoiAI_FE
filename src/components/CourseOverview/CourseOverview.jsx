import React from "react";
import styles from "./CourseOverview.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SCourseBox from "../../components/SCourseBox/SCourseBox";
export default function CourseOverview() {
  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <>
      <div className="course-details-description">
        <div>
          <h1>Course Description</h1>
          <span>
            Maximus Ligula Eleifend Id Nisl Quis Interdum. Sed Malesuada Tortor
            Non Turpis Semper Bibendum. Ut Ac Nisi Porta, Malesuada Risus Non
            Viverra Dolor. Vestibulum Ante Ipsum Primis In Faucibus Orci Luctus
            Et Ultrices Posuere Cubilia Curae In Tristique Libero, Quis Ultrices
            Diam Praesent Varius Diam Dui. Class Aptent Taciti Sociosqu Ad
            Litora Torquent Per Conubia Nostra. Maximus Ligula Eleifend Id Nisl
            Quis Interdum. Sed Malesuada Tortor Non Turpis Semper Bibendum. Ut
            Ac Nisi Porta, Malesuada Risus Non Viverra Dolor. Vestibulum Ante
            Ipsum Primis In Faucibus Orci Luctus Et Ultrices Posuere Cubilia
            Curae In Tristique Libero, Quis Ultrices Diam Praesent Varius Diam
            Dui. Class Aptent Taciti Sociosqu Ad Litora Torquent Per Conubia
            Nostra.
          </span>
        </div>
        <div>
          <h1>What Will You Learn From This Course?</h1>
          <span>
            Maximus Ligula Eleifend Id Nisl Quis Interdum. Sed Malesuada Tortor
            Non Turpis Semper Bibendum. Ut Ac Nisi Porta, Malesuada Risus Non
            Viverra Dolor. Vestibulum Ante Ipsum Primis In Faucibus Orci Luctus
            Et Ultrices Posuere.
          </span>
          <div className="course-details-benefits">
            <ul>
              <li>Becom smarter</li>
              <li>Becom harder</li>
              <li>Becom better</li>
            </ul>
            <ul>
              <li>Get a job</li>
              <li>Get respect</li>
              <li>Get more money</li>
            </ul>
          </div>
        </div>
        <div
          className="course-details-relative-courses-header"
          style={{ marginBottom: "30px" }}
        >
          <span>10,000+ Courses Recommended by AI</span>
          <h1>You May Also Like More Courses</h1>
        </div>
        <Slider {...settings}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
            return <SCourseBox course={item} key={item} />;
            // return <h1>{item}</h1>;
          })}
        </Slider>
      </div>
    </>
  );
}
