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

const types = [
  { value: 1, label: "Roadmap 1", video: video1 },
  { value: 2, label: "Roadmap 2", video: video2 },
  { value: 3, label: "Roadmap 3", video: video3 },
  { value: 4, label: "Roadmap 4", video: video4 },
  { value: 5, label: "Roadmap 5", video: video5 },
];

export default function CreateRoadmapModal() {
  const [type, setType] = useState({
    value: 1,
    label: "Roadmap 1",
    video: video1,
  });
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [type]);

  const navigate = useNavigate();
  async function handleRedirect(e) {
    e.preventDefault();
    createRoadmap({
      title: e.currentTarget.value,
      type: type.value,
    })
      .then((res) => {
        console.log(res);
        navigate(`/roadmap/${res.data.id}`, {
          state: {
            content: res.data,
            type: type.value,
            mode: "create",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <section className="create-roadmap-container">
        <div>
          <h1>Create Roadmap</h1>
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value !== "") {
                handleRedirect(e);
              }
            }}
          />
        </div>

        <video ref={videoRef} width="500" autoPlay loop muted>
          <source src={type.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </>
  );
}
