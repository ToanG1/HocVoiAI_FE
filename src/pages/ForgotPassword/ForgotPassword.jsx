import React, { useState, useEffect } from "react";
import styles from "./ForgotPassword.scss";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/images/logo.png";

import { changePwd } from "../../api/auth";

import { ToastContainer, toast } from "react-toastify";

export default function ForgotPassword() {
  const [isVisible, setIsVisible] = useState(false);

  function handleToggleVisibilityInput() {
    setIsVisible(!isVisible);
  }

  const navigate = useNavigate();

  function handleChangePassword() {
    const pwd = document.getElementById("pwd-input").value;
    changePwd(pwd)
      .then((res) => {
        if (res.code === 200) {
          console.log(res);
          navigate(`/reset-pwd/${res.data}`);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      });
  }

  return (
    <section className="reset-password-container">
      <ToastContainer />
      <img src={logo} alt="logo" className="reset-password-logo" />
      <div className="reset-password-form">
        <h1>Firstly, to make sure that you are who you say you are</h1>
        <p>Enter your password below</p>
        <div>
          <input
            id="pwd-input"
            type={isVisible ? "text" : "password"}
            name="password"
          />
          <i onClick={handleToggleVisibilityInput}>
            {isVisible ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </i>
        </div>
        <p>
          After this, we will send you an unique link to reset your password for
          your account. Note that this link will expire in 5 minutes and can be
          used only once.
        </p>
        <button onClick={handleChangePassword}>Verify Password</button>
      </div>
    </section>
  );
}
