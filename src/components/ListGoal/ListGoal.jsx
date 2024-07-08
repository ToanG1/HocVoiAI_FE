import React, { useState, useEffect } from "react";
import styles from "./ListGoal.scss";

import RoadmapBranch from "../RoadmapBranch/RoadmapBranch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark as faCircleXmarkRegular } from "@fortawesome/free-regular-svg-icons";
import defaultImg from "../../assets/images/roadmap.png";

import {
  getListGoalByUserId,
  createGoal,
  updateGoal,
  deleteGoal
} from "../../api/goal";
import { getGoalBranchsById, createGoalBranch } from "../../api/goalBranch";
import { searchPrivilege } from "../../api/privilege";

import { toast } from "react-toastify";
import { IMG_URL } from "../../api";

export default function ListGoal({ userId, mode }) {
  const [listGoal, setListGoal] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getListGoalByUserId(userId);
      if (res.code === 200) setListGoal(res.data);
    };
    fetchData();
  }, []);

  async function handleAddNewGoal(value) {
    createGoal(value)
      .then((res) => {
        if (res.code === 200) setListGoal(listGoal.concat(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUpdateNewGoal(id, value) {
    updateGoal(id, value)
      .then((res) => {
        if (res.code === 200) {
          setListGoal(
            listGoal.map((item) => {
              if (item.id === id) {
                return res.data;
              } else return item;
            })
          );
          toast.success("Update Goal successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteGoal(id) {
    deleteGoal(id)
      .then(() => {
        setListGoal(listGoal.filter((item) => item.id !== id));
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      });
  }

  const [goalBranchs, setGoalBranchs] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState();
  async function handleGetGoalBranchs(id) {
    setSelectedGoal(id);
    const res = await getGoalBranchsById(id);
    if (res.code === 200) setGoalBranchs(res.data);
  }

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
    setSelectedSearch(item);
    setSearchResults([]);
  }

  function handleCreateGoalBranch() {
    const data = {
      rmId: selectedSearch.roadmapDetail.id,
      goalId: selectedGoal,
      startDate: document.getElementById("start-date").value,
      endDate: document.getElementById("start-date").value
    };
    createGoalBranch(data)
      .then((res) => {
        if (res.code === 200) setGoalBranchs(goalBranchs.concat(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <section className="list-goal-container">
        <div className="list-goals">
          {listGoal.map((item) => {
            if (mode === "edit")
              return (
                <div className="list-goal-item" key={item.id}>
                  <input
                    className="inside-border"
                    type="text"
                    defaultValue={item.name}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateNewGoal(item.id, e.target.value);
                      }
                    }}
                    onClick={() => {
                      handleGetGoalBranchs(item.id);
                    }}
                  />
                  <i
                    onClick={() => {
                      handleDeleteGoal(item.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleXmarkRegular} />
                  </i>
                </div>
              );
            else
              return (
                <div
                  className="list-goal-item"
                  key={item.id}
                  onClick={() => {
                    handleGetGoalBranchs(item.id);
                  }}
                >
                  <p className="inside-border">{item.name}</p>
                </div>
              );
          })}
          {mode === "edit" ? (
            <div className="list-goal-item">
              <input
                className="inside-border"
                type="text"
                placeholder="New Goal"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddNewGoal(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="goal-roadmaps">
          {goalBranchs.map((item) => {
            return (
              <RoadmapBranch
                key={item.id}
                roadmap={item}
                mode={mode}
                setGoalBranchs={setGoalBranchs}
                goalBranchs={goalBranchs}
              />
            );
          })}
          {mode === "edit" && selectedGoal ? (
            <div className="input-branch">
              <div className="left-side">
                <input
                  type="text"
                  placeholder="Search roadmaps"
                  onChange={(e) => {
                    handleSearchPrivilege(e.target.value);
                  }}
                />
                {selectedSearch ? (
                  <>
                    <div className="search-item selected">
                      <p>{selectedSearch.roadmapDetail.title}</p>
                      <img
                        src={
                          selectedSearch.roadmapDetail.avatar
                            ? IMG_URL + selectedSearch.roadmapDetail.avatar
                            : defaultImg
                        }
                        alt="roadmap img"
                      />
                      <i onClick={() => setSelectedSearch()}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </i>
                    </div>
                    <button
                      onClick={() => {
                        handleCreateGoalBranch();
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : null}

                <div className="search-results">
                  {searchResults.map((item, index) => {
                    return (
                      <div
                        className="search-item"
                        key={index}
                        onClick={() => {
                          handleSelectRoadmap(item);
                        }}
                      >
                        <p>{item.roadmapDetail.title}</p>
                        <img
                          src={
                            item.roadmapDetail.avatar
                              ? IMG_URL + item.roadmapDetail.avatar
                              : defaultImg
                          }
                          alt="roadmap img"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="right-side">
                <input type="date" id="start-date" placeholder="Start Date" />
                <i>
                  <FontAwesomeIcon icon={faArrowRight} />
                </i>
                <input type="date" id="end-date" placeholder="End Date" />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
