import { axiosInstance, authedAxiosInstance } from "./API";
function getRoadmap(roadmapId) {
  return authedAxiosInstance.get(`/roadmap/${roadmapId}`);
}

function getAllPrivilege() {
  return authedAxiosInstance.get(`/roadmap/user`);
}

function getReletiveRoadmap(roadmapId) {
  return axiosInstance.get(`/roadmap/ralative/${roadmapId}`);
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

  return authedAxiosInstance.patch(`roadmap/${rmId}`, roadmapDto);
}

function deleteRoadmap(roadmapId) {
  return authedAxiosInstance.delete(`/roadmap/${roadmapId}`);
}

export {
  getRoadmap,
  getAllRoadmap,
  getReletiveRoadmap,
  getAllPrivilege,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap
};
