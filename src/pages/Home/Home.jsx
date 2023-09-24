import style from "./Home.scss";
import HEADER from "../../components/Header/Header.jsx";

import Roadmap from "../../components/ListRoadMap/Roadmap1/Roadmap1";
import Loading from "../../components/Loading/Loading";
export default function Home() {
  return (
    <>
      <HEADER />
      <title>Home</title>
      <div className="homepage-home">
        <Roadmap />
      </div>
    </>
  );
}
