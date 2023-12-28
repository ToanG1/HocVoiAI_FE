import React, { useEffect, useState, useRef } from "react";
import styles from "./CourseDetails.scss";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faEllipsisVertical,
  faCamera
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CourseOverview from "../../components/CourseOverview/CourseOverview";
import CourseCirculum from "../../components/CourseCirculum/CourseCirculum";
import CourseRating from "../../components/CourseRating/CourseRating";
import defaultImg from "../../assets/images/roadmap.png";
import ButtonsModal from "../../components/ButtonsModal/ButtonsModal";
import ReportForm from "../../components/ReportForm/ReportForm";

import {
  getRoadmap,
  deleteRoadmap,
  updateRoadmapDetail
} from "../../api/roadmap";
import { createPrivilege } from "../../api/privilege";
import { createRating } from "../../api/rating";
import { uploadImage } from "../../api/UploadFile";
import { IMG_URL } from "../../api/API";
import { ReportType } from "../../utils/ReportType";
import { ToastContainer, toast } from "react-toastify";

function removeActiveClass() {
  document
    .getElementById("overview-btn")
    .classList.remove("course-details-active-btn");
  document
    .getElementById("curriculum-btn")
    .classList.remove("course-details-active-btn");
  document
    .getElementById("rating-btn")
    .classList.remove("course-details-active-btn");
}
export default function CourseDetails() {
  const { courseId } = useParams("courseId");
  const [detail, setDetail] = useState({});
  const [isButtonModalOpen, setIsButtonModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      getRoadmap(courseId)
        .then((res) => {
          if (res.code === 200) setDetail(res.data);
        })
        .catch((err) => {
          if (err.response.status === 403)
            createPrivilege(courseId).then((res) => {
              if (res.code === 200) fetchData();
            });
          else console.log(err);
        });
    };
    fetchData();
  }, []);

  function handleDelete() {
    setIsButtonModalOpen(false);

    deleteRoadmap(detail.id)
      .then((res) => {
        if (res.code === 200) {
          toast.success("Delete roadmap successfuly!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              window.location.href = "/course";
            }
          });
        } else if (res.code === 403) {
          toast.error("You don't have permission to delete", {
            position: "top-right",
            autoClose: 3000,
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

  const [page, setPage] = useState(0);
  useEffect(() => {
    switch (page) {
      case 0:
        removeActiveClass();
        document
          .getElementById("overview-btn")
          .classList.add("course-details-active-btn");
        break;
      case 1:
        removeActiveClass();
        document
          .getElementById("curriculum-btn")
          .classList.add("course-details-active-btn");
        break;
      case 2:
        removeActiveClass();
        document
          .getElementById("rating-btn")
          .classList.add("course-details-active-btn");
        break;
      default:
        removeActiveClass();
        document
          .getElementById("overview-btn")
          .classList.add("course-details-active-btn");
    }
  }, [page]);
  const navigate = useNavigate();

  function handleOpenRoadmap() {
    navigate(`/roadmap/${courseId}`, {
      state: {
        content: detail.roadmap,
        type: detail.type,
        mode: "watch"
      }
    });
  }

  const [isRatingFormOpen, setIsRatingFormOpen] = useState(false);
  function RatingForm() {
    const [stars, setStars] = useState(0);
    function handleChangeStar(value) {
      setStars(value);
    }

    function handleCreateRating() {
      const data = {
        rmId: courseId,
        star: stars,
        content: document.getElementById("rating-content").value
      };
      createRating(data)
        .then((res) => {
          if (res.code === 200) console.log(res);
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
        });
    }
    return (
      <div className="rating-form">
        <div className="select-stars">
          {[...Array(stars).keys()].map((item) => {
            return (
              <FontAwesomeIcon
                icon={faStar}
                size="lg"
                color="orange"
                key={item}
                onClick={() => handleChangeStar(item + 1)}
              />
            );
          })}
          {[...Array(5 - stars).keys()].map((item) => {
            return (
              <FontAwesomeIcon
                icon={faStarRegular}
                size="lg"
                color="orange"
                key={item}
                onClick={() => handleChangeStar(stars + item + 1)}
              />
            );
          })}
        </div>
        <textarea
          id="rating-content"
          placeholder="Write a review..."
          onKeyDown={(e) => e.key === "Enter" && handleCreateRating()}
        />
      </div>
    );
  }

  const [mode, setMode] = useState("watch");

  function handleChangeToEditMode() {
    setIsButtonModalOpen(false);

    setMode("edit");
  }

  function handleChangeToWatchMode() {
    setMode("watch");
  }

  function SideBar() {
    const [level, setLevel] = useState("beginner");
    const [language, setLanguage] = useState("english");
    const [img, setImg] = useState(detail.avatar);

    function handleUpdateDetail() {
      let durationValue = document.getElementById("duration").value;
      durationValue = durationValue + (durationValue > 1 ? " weeks" : " week");
      const data = {
        title: detail.title,
        avatar: img,
        level: level,
        language: language,
        duration: durationValue
      };
      updateRoadmapDetail(detail.id, data)
        .then((res) => {
          if (res.code === 200) {
            toast.success("Update successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
            setMode("watch");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
        });
    }

    const imageRef = useRef(null);
    const inputRef = useRef(null);
    const handleFileChange = (event) => {
      const fileObj = event.target.files && event.target.files[0];
      if (fileObj) {
        async function upload() {
          const res = await uploadImage(fileObj);
          return res.data.url;
        }
        upload()
          .then(async (res) => {
            setDetail({
              ...detail,
              avatar: IMG_URL + "/" + res
            });
            setImg(`${IMG_URL}/${res}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      event.target.value = null;
    };

    const handleClick = () => {
      // 👇️ open file input box on click of another element
      inputRef.current.click();
    };

    function handleReportRoadmap() {
      setIsButtonModalOpen(false);
      setIsReportModalOpen(true);
    }

    if (mode === "watch")
      return (
        <div className="course-details-sidebar">
          <div className="course-details-sidebar-header">
            <button className="course-details-sidebar-button">Share</button>

            <button
              className="course-details-sidebar-button edit-button"
              onClick={() => {
                setIsButtonModalOpen(!isButtonModalOpen);
              }}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            {isButtonModalOpen ? (
              <ButtonsModal
                onReport={handleReportRoadmap}
                onUpdate={handleChangeToEditMode}
                onDelete={handleDelete}
              />
            ) : null}
          </div>
          <div className="course-details-sidebar-content">
            <img
              ref={imageRef}
              src={detail.avatar ? detail.avatar : defaultImg}
              className="course-details-sidebar-image"
              alt="course-img"
            />

            <p style={{ marginBottom: "10px" }}>
              If this help you, please rate me
            </p>
            <button
              className="course-details-rating-button"
              onClick={() => {
                setIsRatingFormOpen(!isRatingFormOpen);
              }}
            >
              Rate me
            </button>
            {isRatingFormOpen ? (
              <RatingForm />
            ) : (
              <>
                <div className="course-details-short-description">
                  <h3>This Course Includes:</h3>
                  <ul className="course-details-short-description-row">
                    <li className="course-details-short-description-key">
                      Course level
                    </li>
                    <li className="course-details-short-description-value">
                      {detail.level || "not updated"}
                    </li>
                  </ul>
                  <ul className="course-details-short-description-row">
                    <li className="course-details-short-description-key">
                      Duration
                    </li>
                    <li className="course-details-short-description-value">
                      {detail.duration ? detail.duration : "not updated"}
                    </li>
                  </ul>
                  <ul className="course-details-short-description-row">
                    <li className="course-details-short-description-key">
                      Tag
                    </li>
                    <li className="course-details-short-description-value">
                      {detail.tag
                        ? detail.tag.map((item) => {
                            return item.name + " ";
                          })
                        : "not updated"}
                    </li>
                  </ul>
                  <ul className="course-details-short-description-row">
                    <li className="course-details-short-description-key">
                      Language
                    </li>
                    <li className="course-details-short-description-value">
                      {detail.language || "not updated"}
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      );
    else if (mode === "edit")
      return (
        <div className="course-details-sidebar">
          <div className="course-details-sidebar-header">
            <button
              className="course-details-sidebar-button"
              onClick={handleUpdateDetail}
            >
              Save changes
            </button>
            <button
              className="course-details-sidebar-button"
              onClick={handleChangeToWatchMode}
            >
              Cancel
            </button>
          </div>
          <div className="course-details-sidebar-content">
            <div className="sidebar-img-container">
              <img
                ref={imageRef}
                src={detail.avatar ? detail.avatar : defaultImg}
                className="course-details-sidebar-image"
                alt="course-img"
              />
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />
              <i>
                <FontAwesomeIcon
                  icon={faCamera}
                  onClick={handleClick}
                  size="lg"
                />
              </i>
            </div>
            <>
              <div className="course-details-short-description">
                <h3>This Course Includes:</h3>
                <ul className="course-details-short-description-row">
                  <li className="course-details-short-description-key">
                    Course level
                  </li>
                  <li className="course-details-short-description-value">
                    <select
                      onChange={(e) => setLevel(e.target.value)}
                      value={level}
                      name="level"
                      id="level"
                      className="home-input__select"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </li>
                </ul>
                <ul className="course-details-short-description-row">
                  <li className="course-details-short-description-key">
                    Duration (weeks)
                  </li>
                  <li className="course-details-short-description-value">
                    <input
                      id="duration"
                      type="number"
                      min={0}
                      defaultValue={1}
                    />
                  </li>
                </ul>
                <ul className="course-details-short-description-row">
                  <li className="course-details-short-description-key">Tag</li>
                  <li className="course-details-short-description-value">
                    {detail.tag
                      ? detail.tag.map((item) => {
                          return item.name + " ";
                        })
                      : "not updated"}
                  </li>
                </ul>
                <ul className="course-details-short-description-row">
                  <li className="course-details-short-description-key">
                    Language
                  </li>
                  <li className="course-details-short-description-value">
                    <select
                      onChange={(e) => setLanguage(e.target.value)}
                      value={language}
                      name="language"
                      id="language"
                      className="home-input__select"
                    >
                      <option value="vietnamese">Vietnamese</option>
                      <option value="english">English</option>
                      <option value="japan">Japan</option>
                      <option value="chinese">Chinese</option>
                    </select>
                  </li>
                </ul>
              </div>
            </>
          </div>
        </div>
      );
  }

  function handleCloseReportModal() {
    setIsReportModalOpen(false);
  }
  return (
    <>
      <Header />
      <div className="course-details-container">
        <ToastContainer />
        <div className="course-details-content">
          {detail.category ? (
            <div className="course-details-tag">{detail.category.name}</div>
          ) : null}
          <div className="course-details-title">
            <p>{detail.title}</p>
            <p>created at {moment(detail.createdAt).format("DD/MM/YYYY")}</p>
          </div>

          <div className="course-details-nav">
            <button
              id="overview-btn"
              className="course-details-page-button"
              onClick={() => setPage(0)}
            >
              Overview
            </button>
            <button
              id="curriculum-btn"
              className="course-details-page-button"
              onClick={() => setPage(1)}
            >
              Curriculum
            </button>
            <button
              className="course-details-page-button"
              onClick={handleOpenRoadmap}
            >
              Roadmap
            </button>
            <button
              id="rating-btn"
              className="course-details-page-button"
              onClick={() => setPage(2)}
            >
              Ratings
            </button>
          </div>
          <div className="course-details-body">
            {page === 0 ? (
              <CourseOverview detail={detail} courseId={courseId} />
            ) : null}
            {page === 1 ? <CourseCirculum id={courseId} /> : null}
            {page === 2 ? <CourseRating courseId={courseId} /> : null}
          </div>
        </div>
        <SideBar />
      </div>
      <Modal
        open={isReportModalOpen}
        onClose={handleCloseReportModal}
        center
        classNames={{
          modal: "customModal"
        }}
      >
        <ReportForm
          id={courseId}
          type={ReportType.ROADMAP_REPORT}
          closeForm={handleCloseReportModal}
        />
      </Modal>
      <Footer />
    </>
  );
}
