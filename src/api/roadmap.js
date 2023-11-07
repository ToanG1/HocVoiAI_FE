import axios from "axios";
import { BASE_URL, bearerConfig } from "./API";

function getRoadmap(roadmapId) {
  return axios.get(`${BASE_URL}/roadmap/${roadmapId}`, bearerConfig);
}

function getAllPrivilege() {
  return axios.get(`${BASE_URL}/roadmap/user`, bearerConfig);
}

async function getAllRoadmap(roadmapId) {
  return await axios.get(`${BASE_URL}/roadmap`);
}

async function createRoadmap(roadmap) {
  return await axios.post(`${BASE_URL}/roadmap`, roadmap, bearerConfig);
}

function updateRoadmap(roadmap, rmId) {
  const roadmapDto = {
    title: roadmap.title,
    milestones: JSON.stringify(roadmap.milestones)
  };

  return axios.patch(`${BASE_URL}/roadmap/${rmId}`, roadmapDto, bearerConfig);
}

function deleteRoadmap(roadmapId) {
  return axios.delete(`${BASE_URL}/roadmap?id=${roadmapId}`);
}

export {
  getRoadmap,
  getAllRoadmap,
  getAllPrivilege,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap
};
