import { authedAxiosInstance, axiosInstance } from ".";

function createRating(data) {
  return authedAxiosInstance.post("/rating", data);
}

function getRatingsByRmId(id) {
  return axiosInstance.get(`/rating?rmId=${id}`);
}

function updateRating(data) {
  return authedAxiosInstance.patch(`/rating/${data.id}`, data);
}

function deleteRating(id) {
  return authedAxiosInstance.delete(`/rating/${id}`);
}

export { createRating, getRatingsByRmId, updateRating, deleteRating };
