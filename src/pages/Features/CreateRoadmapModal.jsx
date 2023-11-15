import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import video1 from "../../assets/videos/roadmap1-video.mp4";
import video2 from "../../assets/videos/roadmap2-video.mp4";
import video3 from "../../assets/videos/roadmap3-video.mp4";
import video4 from "../../assets/videos/roadmap4-video.mp4";
import video5 from "../../assets/videos/roadmap5-video.mp4";

import { createRoadmap } from "../../api/roadmap";
import { getAllCategory } from "../../api/category";
import { useWebSocket } from "../../websocket/context";
import { toast } from "react-toastify";

const types = [
  { value: 1, label: "Roadmap 1", video: video1 },
  { value: 2, label: "Roadmap 2", video: video2 },
  { value: 3, label: "Roadmap 3", video: video3 },
  { value: 4, label: "Roadmap 4", video: video4 },
  { value: 5, label: "Roadmap 5", video: video5 }
];
const levels = [
  {
    value: "beginner",
    label: "Beginner"
  },
  {
    value: "intermediate",
    label: "Intermediate"
  },
  {
    value: "advanced",
    label: "Advanced"
  }
];
const languages = [
  {
    value: "english",
    label: "English"
  },
  {
    value: "vietnamese",
    label: "Việt Nam"
  },
  {
    value: "japanese",
    label: "Japnese"
  },
  {
    value: "chinese",
    label: "Chinese"
  }
];
export default function CreateRoadmapModal() {
  const [level, setLevel] = useState({
    value: "beginner",
    label: "Beginner"
  });
  const [language, setLanguage] = useState({
    value: "english",
    label: "English"
  });
  const [type, setType] = useState({
    value: 1,
    label: "Roadmap 1",
    video: video1
  });
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [type]);

  const [categories, setCategories] = useState([]);
  const [cate, setCate] = useState({
    value: 1,
    label: "General"
  });
  useEffect(() => {
    getAllCategory()
      .then((res) => {
        setCategories(
          res.data.map((item) => {
            return {
              value: item.id,
              label: item.name
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  async function handleRedirect(e) {
    e.preventDefault();

    if (document.getElementById("auto-btn").checked) {
      handleGenerateRoadmap();
      toast.success(
        "🦄 We are working now!, You will be noticed once roadmap is finished",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        }
      );
    } else {
      console.log({
        title: e.currentTarget.value,
        type: type.value,
        categoryId: cate.value
      });
      createRoadmap({
        title: e.currentTarget.value,
        type: type.value,
        categoryId: cate.value
      })
        .then((res) => {
          console.log(res);
          navigate(`/roadmap/${res.data.id}`, {
            state: {
              content: res.data,
              type: type.value,
              mode: "create"
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  const socket = useWebSocket();

  function handleGenerateRoadmap() {
    socket.emit("generate", {
      topics: [
        {
          topic: document.getElementById("topic-input").value,
          level: level.value,
          language: language.value
        }
      ],
      userId: JSON.parse(localStorage.getItem("USER_INFO")).userId
    });
  }
  return (
    <>
      <section className="create-roadmap-container">
        <h1>Create Roadmap</h1>

        <div className="roadmap-info">
          <div>
            <Select
              placeholder="Select category"
              defaultValue={cate}
              onChange={setCate}
              options={categories}
              className="select"
            />
            <Select
              placeholder="Select topic"
              defaultValue={type}
              onChange={setType}
              options={types}
              className="select"
            />
            <input
              type="text"
              placeholder="Roadmap Name"
              id="topic-input"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value !== "") {
                  handleRedirect(e);
                }
              }}
            />
          </div>

          <div>
            <Select
              placeholder="Select level"
              defaultValue={level}
              onChange={setLevel}
              options={levels}
              className="select"
            />
            <Select
              placeholder="Select language"
              defaultValue={language}
              onChange={setLanguage}
              options={languages}
              className="select"
            />
            <label>Auto Generate by AI</label>
            <input id="auto-btn" type="checkbox" />
          </div>
        </div>

        <video ref={videoRef} width="500" autoPlay loop muted>
          <source src={type.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </>
  );
}
