import { authedAxiosInstance } from "./API";

function createReport(data) {
  return authedAxiosInstance.post("/report", data);
}

export { createReport };
