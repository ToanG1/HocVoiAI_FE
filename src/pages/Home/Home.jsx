import style from "./Home.scss";
import HEADER from "../../components/Header/Header.jsx";

import Loading from "../../components/Loading/Loading";
export default function Home() {
  return (
    <>
      <HEADER />
      <title>Home</title>
      <div className="homepage-home"></div>
    </>
  );
}
