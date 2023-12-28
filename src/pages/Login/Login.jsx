import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.scss";

import { Modal } from "react-responsive-modal";
import ForgotPwdModal from "./ForgotPwdModal";

import { login } from "../../api/auth";

import { checkAuthenticationOutOfApp } from "../../services/common";

import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthenticationOutOfApp();
  }, []);

  async function handleLogin() {
    login(email, pass).then((res) => {
      res
        ? navigate("/features")
        : toast.error("Email or password may be incorrect", {
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

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleOnCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <section className="login-section">
        <ToastContainer />
        <div class="form-box">
          <div class="form-value">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <h2>Login</h2>

              <div class="inputbox">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Email</label>
              </div>

              <div class="inputbox">
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Password</label>
              </div>

              <div class="forget">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>

                <p onClick={() => handleOpenModal()}>Forgot Password</p>
              </div>

              <button type="submit">Log In</button>

              <div class="register">
                <p>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <Modal
          open={isOpenModal}
          onClose={handleOnCloseModal}
          center
          classNames={{
            overlay: "customOverlay",
            modal: "customModal"
          }}
        >
          <ForgotPwdModal />
        </Modal>
      </section>
    </>
  );
}
