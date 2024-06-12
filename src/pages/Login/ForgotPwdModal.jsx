import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { forgotPwd, checkCode } from "../../api/auth";

import { toast } from "react-toastify";

export default function ForgotPwdModal() {
  const [email, setEmail] = useState();
  const [isClick, setIsClick] = useState(false);
  function handleSendSecretCode() {
    forgotPwd(email)
      .then((res) => {
        if (res.code === 200) {
          setIsClick(true);
          toast.success("We have sent you a secret code", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
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

  const navigate = useNavigate();

  function handleCheckCode() {
    const code = document.getElementById("code").value;
    checkCode(email, code)
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
          progress: undefined,
          theme: "light"
        });
      });
  }
  return (
    <section className="forgot-pwd-container">
      <div className="forgot-pwd-header">
        <h1>Forgot Password?</h1>
        <p>
          Enter your email and we'll send you a secret code to reset your
          password.
        </p>
      </div>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
      />
      <button onClick={handleSendSecretCode} disabled={isClick}>
        Send
      </button>
      <button onClick={handleSendSecretCode} hidden={!isClick}>
        Re-send
      </button>
      {isClick ? (
        <div className="secret-code">
          <p>Enter your secret code</p>
          <input id="code" type="text" placeholder="Your secret code" />
          <button onClick={handleCheckCode}>Submit</button>
        </div>
      ) : null}
    </section>
  );
}
