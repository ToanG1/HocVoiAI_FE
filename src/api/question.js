import { axiosInstance, authedAxiosInstance } from "./API";
import { ITEM_LIMIT } from "./constant";
async function createQuestion(question) {
  return authedAxiosInstance.post(`/question`, question);
}

async function getAllQuestion(page) {
  return axiosInstance.get(`/question?page=${page}&limit=${ITEM_LIMIT}`);
}

export { createQuestion, getAllQuestion };
