import { authedAxiosInstance } from ".";

function createQuestionComment(data) {
  return authedAxiosInstance.post("/question-comment", data);
}

function getQuestionCommentsById(id) {
  return authedAxiosInstance.get(`/question-comment/${id}`);
}

function deleteQuestionComment(id) {
  return authedAxiosInstance.delete(`/question-comment/${id}`);
}

export {
  createQuestionComment,
  getQuestionCommentsById,
  deleteQuestionComment
};
