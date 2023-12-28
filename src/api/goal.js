import { authedAxiosInstance, axiosInstance } from "./API";

function createGoal(name) {
  const object = {
    name: name,
    userId: undefined
  };
  return authedAxiosInstance.post("/goal", object);
}

function updateGoal(id, name) {
  const object = {
    name: name,
    userId: undefined
  };
  return authedAxiosInstance.patch(`/goal/${id}`, object);
}

function deleteGoal(id) {
  return authedAxiosInstance.delete(`/goal/${id}`);
}

function getListGoalByUserId(userId) {
  return axiosInstance.get(`/goal?userId=${userId}`);
}

export { createGoal, updateGoal, deleteGoal, getListGoalByUserId };
