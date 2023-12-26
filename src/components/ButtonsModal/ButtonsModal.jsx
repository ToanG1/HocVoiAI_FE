import React from "react";
import styles from "./ButtonsModal.scss";

export default function ButtonsModal({ onReport, onUpdate, onDelete }) {
  return (
    <div className="buttons-modal-container">
      <button onClick={onReport}>Report</button>
      <button onClick={onUpdate}>Update</button>
      <button id="delete" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
