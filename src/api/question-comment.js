import { authedAxiosInstance } from "./API";

function createQuestionComment(data) {
  return authedAxiosInstance.post("/question-comment", data);
}

function getQuestionCommentsById(id) {
  return authedAxiosInstance.get(`/question-comment/${id}`);
}

export { createQuestionComment, getQuestionCommentsById };
