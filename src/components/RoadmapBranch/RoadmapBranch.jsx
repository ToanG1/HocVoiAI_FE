import React, { useState, useEffect } from "react";
import styles from "./RoadmapBranch.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { updateGoalBranch, deleteGoalBranch } from "../../api/goalBranch";
import { searchPrivilege } from "../../api/privilege";
import { getRoadmap } from "../../api/roadmap";

import moment from "moment";

export default function RoadmapBranch({
  roadmap,
  mode,
  setGoalBranchs,
  goalBranchs
}) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRoadmap(roadmap.rmId);
      if (res.code === 200) setData(res.data);
    };
    fetchData();
  }, []);

  const [searchResults, setSearchResults] = useState([]);

  function handleSearchPrivilege(value) {
    if (value)
      searchPrivilege(value)
        .then((res) => {
          if (res.code === 200) setSearchResults(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  const [selectedSearch, setSelectedSearch] = useState();

  function handleSelectRoadmap(item) {
    const data = {
      id: roadmap.id,
      rmId: item.roadmapDetail.id,
      goalId: roadmap.goalId,
      startDate: document.getElementById("start-date").value,
      endDate: document.getElementById("start-date").value
    };
    updateGoalBranch(data)
      .then((res) => {
        if (res.code === 200) {
          setGoalBranchs(
            goalBranchs.map((item) => {
              if (item.id === roadmap.id) return res.data;
              else return item;
            })
          );
          setData(item.roadmapDetail);
          document.getElementById("search-name" + roadmap.id).value =
            item.roadmapDetail.title;
          setSearchResults([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleDeleteBranch() {
    deleteGoalBranch(roadmap.id)
      .then((res) => {
        if (res.code === 200) {
          setGoalBranchs(goalBranchs.filter((item) => item.id !== roadmap.id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section>
      <div className="roadmap-branch">
        <div className="left-side">
          <p className="upper-ruler ruler"></p>
          <p className="dot"></p>
          <p className="lower-ruler ruler"></p>
        </div>
        <div className="right-side">
          {mode === "edit" ? (
            <>
              <input
                type="date"
                id="start-date"
                defaultValue={moment(roadmap.startDate).format("YYYY-MM-DD")}
                onChange={(e) => {
                  handleSearchPrivilege(e.target.value);
                }}
              />
              <i>
                <FontAwesomeIcon icon={faArrowRight} />
              </i>
              <input
                type="date"
                id="end-date"
                defaultValue={moment(roadmap.endDate).format("YYYY-MM-DD")}
              />
            </>
          ) : (
            <p>{moment(data.startDate).format("DD-MM-YYYY")}</p>
          )}

          <div className="info">
            {mode === "edit" ? (
              <>
                <input
                  type="text"
                  id={"search-name" + roadmap.id}
                  defaultValue={data.title}
                  onChange={(e) => {
                    handleSearchPrivilege(e.target.value);
                  }}
                />
                <i
                  onClick={() => {
                    handleDeleteBranch();
                  }}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </i>
              </>
            ) : (
              <h3>{data.title}</h3>
            )}
            <img src={data.avatar} alt="avatar" />
          </div>
        </div>
      </div>
      <div className="search-results">
        {searchResults.map((item, index) => {
          console.log(item.roadmapDetail.title);
          return (
            <div
              className="search-item"
              key={index}
              onClick={() => {
                handleSelectRoadmap(item);
              }}
            >
              <p>{item.roadmapDetail.title}</p>
              <img src={item.roadmapDetail.avatar} alt="roadmap img" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
