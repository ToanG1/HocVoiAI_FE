import React, { useEffect, useState } from "react";
import styles from "./CourseRating.scss";
import defaultImg from "../../assets/images/default-img.png";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import { getRatingsByRmId } from "../../api/rating";

export default function CourseRating({ courseId }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      getRatingsByRmId(courseId)
        .then((res) => {
          console.log(res);
          if (res.code === 200) setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  return (
    <section className="course-rating-container">
      {data.map((item) => {
        return (
          <div className="course-rating-item">
            <img
              src={
                item.user.userInfo
                  ? item.user.userInfo.avatar
                    ? item.user.userInfo.avatar
                    : defaultImg
                  : defaultImg
              }
              alt=""
            />
            <div className="course-rating-item-content">
              <p className="course-rating-item-title">{item.user.name}</p>
              <div div className="select-stars">
                {[...Array(item.star).keys()].map((item) => {
                  return (
                    <FontAwesomeIcon
                      icon={faStar}
                      size="lg"
                      color="orange"
                      key={item}
                    />
                  );
                })}
                {[...Array(5 - item.star).keys()].map((item) => {
                  return (
                    <FontAwesomeIcon
                      icon={faStarRegular}
                      size="lg"
                      color="orange"
                      key={item}
                    />
                  );
                })}
              </div>
              <p className="course-rating-item-content">{item.content}</p>
            </div>
            <p className="course-rating-item-date">
              {moment(item.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        );
      })}
    </section>
  );
}
