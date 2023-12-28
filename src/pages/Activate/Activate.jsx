import React, { useEffect } from "react";
import styles from "./Activate.scss";

import { useNavigate } from "react-router-dom";

import { useSearchParams } from "react-router-dom";

import { activate } from "../../api/auth";

export default function Activate() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  const navigate = useNavigate();

  useEffect(() => {
    activate(code)
      .then((res) => {
        if (res.code === 200 && res.data) {
          navigate("/features");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="spinner-container">
      <svg
        class="spinner"
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="path"
          fill="none"
          stroke-width="6"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </section>
  );
}
