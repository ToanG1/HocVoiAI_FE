import { axiosInstance } from ".";
async function getAllCategory() {
  return axiosInstance.get(`/category`);
}

export { getAllCategory };
