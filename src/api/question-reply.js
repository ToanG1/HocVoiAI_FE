import { authedAxiosInstance } from "./API";

function createQuestionReply(data) {
  return authedAxiosInstance.post("/question-reply", data);
}

function getQuestionRepliesByQId(qId) {
  return authedAxiosInstance.get(`/question-reply/${qId}`);
}

export { createQuestionReply, getQuestionRepliesByQId };
