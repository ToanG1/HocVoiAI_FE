import React from "react";
import { useState, useEffect, useCallback } from "react";
import styles from "./Features.scss";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import CoursesListing from "../../components/CoursesListing/CoursesListing";
import CreateRoadmapModal from "./CreateRoadmapModal";
import Footer from "../../components/Footer/Footer";
import BgComp from "../../components/BgComp/BgComp";
import { Modal } from "react-responsive-modal";
import { ToastContainer } from "react-toastify";

import { authenticateToken } from "../../api/auth";

import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";

export default function Features() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("HOCVOIAI_TOKEN"))
      authenticateToken().then((res) => {
        if (res.code !== 200 || !res.data) {
          navigate("/login");
        }
      });
    else navigate("/login");
  }, []);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleAskQuestion = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleOnCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <>
      <Header />
      <BgComp />

      <div className="features-container">
        <ToastContainer />
        <div className="create-new">
          <button id="create-btn" onClick={handleAskQuestion}>
            Create New
          </button>
        </div>
        <CoursesListing />
        <CoursesListing />
        <CoursesListing />
      </div>
      <Modal
        open={isOpenModal}
        onClose={handleOnCloseModal}
        center
        classNames={{
          modal: "customModal"
        }}
      >
        <CreateRoadmapModal />
      </Modal>
      <Footer />
    </>
  );
}
