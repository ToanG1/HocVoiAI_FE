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

async function getAllRoadmap() {
  return await axiosInstance.get(`/roadmap`);
}

async function createRoadmap(roadmap) {
  return await authedAxiosInstance.post(`/roadmap`, roadmap);
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
