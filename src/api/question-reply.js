import { authedAxiosInstance } from ".";

function createQuestionReply(data) {
  return authedAxiosInstance.post("/question-reply", data);
}

function getQuestionRepliesByQId(qId) {
  return authedAxiosInstance.get(`/question-reply/${qId}`);
}

function deleteQuestionReply(id) {
  return authedAxiosInstance.delete(`/question-reply/${id}`);
}

export { createQuestionReply, getQuestionRepliesByQId, deleteQuestionReply };
