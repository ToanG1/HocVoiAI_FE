import React, { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Roadmap.scss";
import { useParams } from "react-router";
import Loading from "../../components/Loading/Loading";

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

function loadRoadmap(index, mode, title) {
  switch (index) {
    case 1:
      return <Roadmap1 mode={mode} title={title} />;
    case 2:
      return <Roadmap2 mode={mode} title={title} />;
    case 3:
      return <Roadmap3 mode={mode} title={title} />;
    case 4:
      return <Roadmap4 mode={mode} title={title} />;
    case 5:
      return <Roadmap5 mode={mode} title={title} />;
    default:
      return <Roadmap1 mode={mode} title={title} />;
  }
}

export default function Roadmap() {
  const { state } = useLocation();
  const id = useParams();
  const mode = "create";

  const roadmapType = state.type || 1;
  const renderRoamap = loadRoadmap(roadmapType, mode, state.title);
  return (
    <>
      <Suspense fallback={<Loading />}>{renderRoamap}</Suspense>
    </>
  );
}
