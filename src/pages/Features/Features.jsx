import React from "react";
import { useState, useCallback } from "react";
import styles from "./Features.scss";

import Header from "../../components/Header/Header";
import CoursesListing from "../../components/CoursesListing/CoursesListing";
import CreateRoadmapModal from "./CreateRoadmapModal";
import Footer from "../../components/Footer/Footer";
import BgComp from "../../components/BgComp/BgComp";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function Features() {
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
          modal: "customModal",
        }}
      >
        <CreateRoadmapModal />
      </Modal>
      <Footer />
    </>
  );
}
