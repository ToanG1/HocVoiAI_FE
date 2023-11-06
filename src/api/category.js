import axios from "axios";
import { BASE_URL } from "./API";
async function getAllCategory() {
  return axios.get(`${BASE_URL}/category`);
}

export { getAllCategory };
