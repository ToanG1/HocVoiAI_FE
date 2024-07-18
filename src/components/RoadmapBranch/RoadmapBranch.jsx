import React, { useState, useEffect } from "react";
import styles from "./RoadmapBranch.scss";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import defaultImg from "../../assets/images/roadmap.png";
import stickyNote from "../../assets/images/sticky-note.png";

import { Modal } from "react-responsive-modal";
import StickyNote from "../StickyNotes/StickyNotes";

import { updateGoalBranch, deleteGoalBranch } from "../../api/goalBranch";
import { searchPrivilege } from "../../api/privilege";
import { getRoadmap } from "../../api/roadmap";

import moment from "moment";
import { IMG_URL } from "../../api";

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
      startDate: document.getElementById("start-date-branch").value,
      endDate: document.getElementById("end-date-branch").value
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

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleOpenStickyNote() {
    setIsOpenModal(true);
  }

  function handleCloseStickyNote() {
    setIsOpenModal(false);
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
                id="start-date-branch"
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
                id="end-date-branch"
                defaultValue={moment(roadmap.endDate).format("YYYY-MM-DD")}
              />
            </>
          ) : (
            <p>{moment(roadmap.startDate).format("DD-MM-YYYY")}</p>
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
              <>
                <Link to={mode !== "edit" ? `/course/${data.id}` : null}>
                  <h3>{data.title}</h3>
                </Link>
                <img
                  id="sticky-note-img"
                  src={stickyNote}
                  alt="sticky note"
                  onClick={() => {
                    handleOpenStickyNote();
                  }}
                />
              </>
            )}
            <img
              src={data.avatar ? IMG_URL + data.avatar : defaultImg}
              alt="avatar"
            />
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
      <Modal
        open={isOpenModal}
        onClose={handleCloseStickyNote}
        center
        classNames={{
          modal: "customModal"
        }}
      >
        <StickyNote id={roadmap.id} />
      </Modal>
    </section>
  );
}
