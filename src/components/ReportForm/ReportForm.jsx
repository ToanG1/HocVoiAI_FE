import React, { useEffect, useState } from "react";
import styles from "./ReportForm.scss";

import { ReportType } from "../../utils/ReportType";

import { createReport } from "../../api/report";

import { toast } from "react-toastify";

export default function ReportForm({ id, type, closeForm }) {
  const [report, setReport] = useState({});
  useEffect(() => {
    setReport({
      type: type,
      objectId: id.toString(),
      reason: "",
      content: ""
    });
  }, [id, type]);

  function handleCreateReport() {
    createReport(report)
      .then((res) => {
        if (res.code === 200) {
          closeForm();
          toast.success("Your report was submitted successfully", {
            position: "top-right",
            autoClose: 5000,
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

  return (
    <div className="report-form-container">
      <h2>Reason to report</h2>
      <input
        type="text"
        value={report.reason}
        onChange={(e) => {
          setReport({ ...report, reason: e.currentTarget.value });
        }}
      />
      <h3>Describe your report</h3>
      <textarea
        cols={30}
        rows={10}
        value={report.content}
        onChange={(e) =>
          setReport({ ...report, content: e.currentTarget.value })
        }
      />

      <button onClick={handleCreateReport}>Report</button>
    </div>
  );
}
