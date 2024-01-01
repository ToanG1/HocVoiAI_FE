import { authedAxiosInstance, axiosInstance } from ".";

function getGoalBranchsById(id) {
  return axiosInstance.get(`/goal-branch/${id}`);
}

function createGoalBranch(data) {
  return authedAxiosInstance.post("/goal-branch", data);
}

function updateGoalBranch(data) {
  return authedAxiosInstance.patch(`/goal-branch/${data.id}`, data);
}

function deleteGoalBranch(id) {
  return authedAxiosInstance.delete(`/goal-branch/${id}`);
}

export {
  getGoalBranchsById,
  createGoalBranch,
  updateGoalBranch,
  deleteGoalBranch
};
