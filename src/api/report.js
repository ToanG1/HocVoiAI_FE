import { authedAxiosInstance } from ".";

function createReport(data) {
  return authedAxiosInstance.post("/report", data);
}

export { createReport };
