import React, { useState, useEffect } from "react";
import styles from "./SuggestedDocument.scss";
import { useParams } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import {
  splitSuggestion,
  extractYoutubeVideoId,
  transformVideoSubtitles
} from "../../services/youtubeVideo";

import { extractUrl, checkUrl } from "../../services/helper";

import {
  getYoutubeVideoSubtitles,
  summarizeDocument
} from "../../api/document";

import { getRoadmap, updateRoadmap } from "../../api/roadmap";

export default function SuggestedDocument() {
  const { roadmapId, milestoneId } = useParams();
  const [roadmap, setRoadmap] = useState({});
  const [content, setContent] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    async function fecthData() {
      const res = await getRoadmap(roadmapId);
      if (res.code === 200) {
        setContent(JSON.parse(res.data.roadmap.topics));
        console.log(res);
        setRoadmap(res.data.roadmap);
      }
    }
    fecthData().catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    const item = localStorage.getItem("HOCVOIAI_SUGGESTED_DOCUMENT");
    if (item !== null) {
      const data = JSON.parse(item);
      setData({
        ...data,
        suggestion:
          typeof data.suggestion === "string"
            ? splitSuggestion(data.suggestion)
            : data.suggestion
      });
    }
  }, []);

  function handleUpdateData(id, summarizedDocument) {
    const updatedData = {
      ...data,
      suggestion: data.suggestion.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            summarizedDocument
          };
        }
        return item;
      })
    };
    setData(updatedData);
    localStorage.setItem(
      "HOCVOIAI_SUGGESTED_DOCUMENT",
      JSON.stringify(updatedData)
    );
  }

  function handleUpdateTime(totalTime) {
    const newContent = content.map((topic) => {
      if (topic.id === Number(milestoneId)) {
        return {
          ...topic,
          content: topic.content.map((content) => {
            if (content.id === data.id) {
              return {
                ...content,
                totalTime
              };
            } else return content;
          })
        };
      } else {
        return topic;
      }
    });

    updateRoadmap(
      {
        title: roadmap.title,
        milestones: newContent
      },
      roadmapId
    )
      .then(() => {
        localStorage.setItem(
          "HOCVOIAI_SUGGESTED_DOCUMENT",
          JSON.stringify({
            ...data,
            totalTime
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (data) {
    return (
      <>
        <div className="suggested-document-container">
          <div className="left-side">
            {data.suggestion.map((item, i) => {
              return (
                <Resource data={item} updateData={handleUpdateData} key={i} />
              );
            })}
          </div>
          <div className="right-side">
            <h2>{data.name}</h2>
            <div>
              <h3>Topic:</h3>
              <ul>
                {data.description.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
            <p>Estimated time to finish: {data.estimatedTime} hours</p>
            <div className="timer">
              <TimeCounter
                startTime={data.totalTime}
                saveTime={handleUpdateTime}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

function Resource({ data, updateData }) {
  const url = extractUrl(data.content);
  const [videoId, setVideoId] = useState();
  const [subsitles, setSubtitles] = useState([]);

  useEffect(() => {
    if (url)
      if (url.includes("youtube.com")) {
        const videoId = extractYoutubeVideoId(url);
        setVideoId(videoId);
      }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getYoutubeVideoSubtitles(videoId);
      if (res.code === 200)
        setSubtitles(transformVideoSubtitles(res.data || []));
    };
    if (videoId) fetchData();
  }, [videoId]);

  const [isLoading, setIsLoading] = useState(false);
  function handleSummarizeDocument() {
    setIsLoading(true);
    const summarize = async () => {
      const res = await summarizeDocument(subsitles);
      if (res.code === 200) {
        setIsLoading(false);
        updateData(data.id, res.data);
      }
    };
    summarize();
  }

  if (url)
    if (url.includes("youtube.com") && !url.includes("playlist"))
      return (
        <>
          <p>{data.content}</p>;
          <iframe
            width="100%"
            height="600px"
            src={"http://www.youtube.com/embed/" + videoId}
            allowFullScreen
            title="youtube video"
          />
          <h3
            onClick={() => {
              document
                .getElementById("summarized-document" + data.id)
                .classList.toggle("active");
              if (!data.summarizedDocument) handleSummarizeDocument();
            }}
          >
            Summarize this video
          </h3>
          <div
            className="summarized-document"
            id={"summarized-document" + data.id}
          >
            {data.summarizedDocument ? (
              <p>{data.summarizedDocument}</p>
            ) : isLoading ? (
              <p>Summarizing...</p>
            ) : (
              <p>{data.summarizedDocument}</p>
            )}
          </div>
        </>
      );

  return <p>{data.content}</p>;
}

function TimeCounter({ startTime, saveTime }) {
  const [totalSeconds, setTotalSeconds] = useState(startTime * 3600 || 0);

  useEffect(() => {
    // Function to update the totalSeconds state every second
    const intervalId = setInterval(() => {
      setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  return (
    <div onClick={() => saveTime(totalSeconds / 3600)}>
      <FontAwesomeIcon icon={faClock} size="xl" />
      <p>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(remainingSeconds).padStart(2, "0")}
      </p>
    </div>
  );
}
