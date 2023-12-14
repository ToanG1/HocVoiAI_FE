import React, { useState, useEffect } from "react";
import styles from "./ResetPassword.scss";

import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/images/logo.png";

import { changePwd, checkUrlToken } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";

export default function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const res = await checkUrlToken(token);
      if (res.code === 200) if (!res.data) navigate("/login");
    };
    if (token) checkToken();
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  function handleToggleVisibilityInput() {
    setIsVisible(!isVisible);
  }

  function handleChangePassword() {
    const pwd = document.getElementById("pwd-input").value;
    if (pwd.length < 8) {
      toast.warn("Please enter at least 8 characters", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } else
      changePwd(token, pwd)
        .then((res) => {
          if (res.code === 200) {
            toast.success("Your password has been changed", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
            setInterval(() => {
              navigate("/login");
            }, 4000);
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
            progress: undefined,
            theme: "light"
          });
        });
  }
  return (
    <section className="reset-password-container">
      <ToastContainer />
      <img src={logo} alt="logo" className="reset-password-logo" />
      <div className="reset-password-form">
        <h1>You have requested to reset your password</h1>
        <p>Enter your new password below</p>
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
          This is an unique link to reset your password for your account. Note
          that this link will expire in 5 minutes and can only be used once.
        </p>
        <button onClick={handleChangePassword}>Reset Password</button>
      </div>
    </section>
  );
}
