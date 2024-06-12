import { axiosInstance, authedAxiosInstance } from ".";
async function createQuestion(question) {
  return authedAxiosInstance.post(`/question`, question);
}

async function getAllQuestion(page, limit = 10) {
  return axiosInstance.get(`/question?page=${page}&limit=${limit}`);
}

function getQuestion(id) {
  return axiosInstance.get(`/question/${id}`);
}

function searchQuestions(keyword, page = 0, limit = 10) {
  return axiosInstance.get(
    `/question/search?keyword=${keyword}&page=${page}&limit=${limit}`
  );
}

function updateQuestion(id, question) {
  return authedAxiosInstance.patch(`/question/${id}`, question);
}

function deleteQuestion(id) {
  return authedAxiosInstance.delete(`/question/${id}`);
}

export {
  createQuestion,
  getAllQuestion,
  getQuestion,
  searchQuestions,
  updateQuestion,
  deleteQuestion
};
