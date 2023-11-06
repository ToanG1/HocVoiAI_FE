import axios from "axios";
import { BASE_URL } from "./API";

const token = localStorage.getItem("HOCVOIAI_TOKEN");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

function getRoadmap(roadmapId) {
  return axios.get(`${BASE_URL}/roadmap/${roadmapId}`, config);
}

function getAllPrivilege() {
  return axios.get(`${BASE_URL}/roadmap/user`, config);
}

async function getAllRoadmap(roadmapId) {
  return await axios.get(`${BASE_URL}/roadmap`);
}

async function createRoadmap(roadmap) {
  return await axios.post(`${BASE_URL}/roadmap`, roadmap, config);
}

function updateRoadmap(roadmap, rmId) {
  const roadmapDto = {
    title: roadmap.title,
    milestones: JSON.stringify(roadmap.milestones),
  };

  return axios.patch(`${BASE_URL}/roadmap/${rmId}`, roadmapDto, config);
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
  deleteRoadmap,
};
