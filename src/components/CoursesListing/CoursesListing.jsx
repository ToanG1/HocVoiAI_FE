import React from "react";
import { Link } from "react-router-dom";
import styles from "./CoursesListing.scss";
import { IMG_URL } from "../../api";

export default function CoursesListing({ data }) {
  if (data && data.length > 0)
    return (
      <section className="coursesListing-container">
        <h2 className="feature-title">New Recommended To You</h2>

        <div className="support-grid"></div>
        <div className="band">
          {/* Big Card */}
          <div className="item-1">
            <Link to={`/course/${data[0].id}`} className="card">
              <div
                className="thumb"
                style={{
                  backgroundImage: data[0].avatar
                    ? `url(${IMG_URL + data[0].avatar})`
                    : `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flex-1.jpg)`
                }}
              ></div>
              <article>
                <h1>{data[0].title}</h1>
                <span>{data[0].category.name}</span>
              </article>
            </Link>
          </div>
          {/* Small Cards */}
          {data.map((item, index) => {
            if (index !== 0)
              return (
                <div className="item-2">
                  <Link to={"/course/" + item.id} className="card">
                    <div
                      className="thumb"
                      style={{
                        backgroundImage: item.avatar
                          ? `url(${IMG_URL + item.avatar})`
                          : `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png)`
                      }}
                    ></div>
                    <article>
                      <h1>{item.title}</h1>
                      <span>{item.category.name}</span>
                    </article>
                  </Link>
                </div>
              );
          })}
        </div>
      </section>
    );
}
