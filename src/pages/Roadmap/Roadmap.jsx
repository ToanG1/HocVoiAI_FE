import React, { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Roadmap.scss";
import Loading from "../../components/Loading/Loading";
import { data } from "../../api/data";

const Roadmap1 = lazy(() =>
  import("../../components/ListRoadMap/Roadmap1/Roadmap1")
);
const Roadmap2 = lazy(() =>
  import("../../components/ListRoadMap/Roadmap2/Roadmap2")
);
const Roadmap3 = lazy(() =>
  import("../../components/ListRoadMap/Roadmap3/Roadmap3")
);
const Roadmap4 = lazy(() =>
  import("../../components/ListRoadMap/Roadmap4/Roadmap4")
);
const Roadmap5 = lazy(() =>
  import("../../components/ListRoadMap/Roadmap5/Roadmap5")
);

function loadRoadmap(index, mode, content) {
  switch (index) {
    case 1:
      return <Roadmap1 mode={mode} content={content} />;
    case 2:
      return <Roadmap2 mode={mode} content={content} />;
    case 3:
      return <Roadmap3 mode={mode} content={content} />;
    case 4:
      return <Roadmap4 mode={mode} content={content} />;
    case 5:
      return <Roadmap5 mode={mode} content={content} />;
    default:
      return <Roadmap1 mode={mode} content={content} />;
  }
}

export default function Roadmap() {
  const { state } = useLocation();

  const content = state.content;

  const roadmap = {
    title: content.title || "Roadmap Title",
    milestones: content.milestones || [],
  };

  const renderRoamap = loadRoadmap(
    state.type || 1,
    state.mode || "view",
    roadmap || data
  );
  return (
    <>
      <Suspense fallback={<Loading />}>{renderRoamap}</Suspense>
    </>
  );
}
