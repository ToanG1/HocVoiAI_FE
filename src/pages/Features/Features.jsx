import React from "react";
import { useState, useEffect, useCallback } from "react";
import styles from "./Features.scss";

import Header from "../../components/Header/Header";
import CoursesListing from "../../components/CoursesListing/CoursesListing";
import CreateRoadmapModal from "./CreateRoadmapModal";
import Footer from "../../components/Footer/Footer";
import { Modal } from "react-responsive-modal";
import { ToastContainer } from "react-toastify";

import { getAllRoadmap } from "../../api/roadmap";

import { checkAuthenticationInApp } from "../../services/common";

import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";

export default function Features() {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    checkAuthenticationInApp();
    const fetchRoadmap = async () => {
      const res = await getAllRoadmap(0, 7);
      if (res.code === 200) setRoadmaps(res.data);
    };
    fetchRoadmap();
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
      <div className="features-container">
        <ToastContainer />
        <div className="create-new">
          <button id="create-btn" onClick={handleAskQuestion}>
            Create New
          </button>
        </div>
        <CoursesListing data={roadmaps.data} />
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
