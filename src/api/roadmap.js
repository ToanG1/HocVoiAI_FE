import { axiosInstance, authedAxiosInstance } from ".";
function getRoadmap(roadmapId) {
  return authedAxiosInstance.get(`/roadmap/${roadmapId}`);
}

function getAllPrivilege(page = 1, limit = 6) {
  return authedAxiosInstance.get(`/roadmap/user?page=${page}&limit=${limit}`);
}

function getReletiveRoadmap(roadmapId) {
  return axiosInstance.get(`/roadmap/ralative/${roadmapId}`);
}

function searchRoadmap(keyword, page = 0, limit = 10) {
  return axiosInstance.get(
    `/roadmap/search?keyword=${keyword}&page=${page}&limit=${limit}`
  );
}

function getAllRoadmap(page, limit) {
  return axiosInstance.get(`/roadmap?page=${page}&limit=${limit}`);
}

function createRoadmap(roadmap) {
  return authedAxiosInstance.post(`/roadmap`, roadmap);
}

function updateRoadmap(roadmap, rmId) {
  const roadmapDto = {
    title: roadmap.title,
    milestones: JSON.stringify(roadmap.milestones)
  };

  return authedAxiosInstance.patch(`/roadmap/${rmId}`, roadmapDto);
}

function updateRoadmapDetail(rmId, data) {
  return authedAxiosInstance.patch(`/roadmap/${rmId}`, data);
}

function deleteRoadmap(roadmapId) {
  return authedAxiosInstance.delete(`/roadmap/${roadmapId}`);
}

export {
  getRoadmap,
  getAllRoadmap,
  searchRoadmap,
  getReletiveRoadmap,
  getAllPrivilege,
  createRoadmap,
  updateRoadmap,
  updateRoadmapDetail,
  deleteRoadmap
};
