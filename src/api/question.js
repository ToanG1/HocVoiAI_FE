import { axiosInstance, authedAxiosInstance } from "./API";
import { ITEM_LIMIT } from "./constant";
async function createQuestion(question) {
  return authedAxiosInstance.post(`/question`, question);
}

async function getAllQuestion(page) {
  return axiosInstance.get(`/question?page=${page}&limit=${ITEM_LIMIT}`);
}

function getQuestion(id) {
  return axiosInstance.get(`/question/${id}`);
}

function deleteQuestion(id) {
  return authedAxiosInstance.delete(`/question/${id}`);
}

export { createQuestion, getAllQuestion, getQuestion, deleteQuestion };
