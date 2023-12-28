import { axiosInstance } from "./API";
async function getAllCategory() {
  return axiosInstance.get(`/category`);
}

export { getAllCategory };
