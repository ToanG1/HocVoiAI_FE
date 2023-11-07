import axios from "axios";
import { BASE_URL, bearerConfig } from "./API";

async function createQuestion(question) {
  return axios.post(`${BASE_URL}/question`, question, bearerConfig);
}

export { createQuestion };
