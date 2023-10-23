import axios from "axios";
import { BASE_URL } from "./API";

function getRoadmap(roadmapId) {
  return axios.get(`${BASE_URL}/roadmap?id=${roadmapId}`);
}

async function getAllRoadmap(roadmapId) {
  return await axios.get(`${BASE_URL}/roadmap`);
}

function createRoadmap(roadmap) {
  return axios.post(`${BASE_URL}/roadmap`, roadmap);
}

function updateRoadmap(roadmap) {
  return axios.put(`${BASE_URL}/roadmap`, roadmap);
}

function deleteRoadmap(roadmapId) {
  return axios.delete(`${BASE_URL}/roadmap?id=${roadmapId}`);
}

export {
  getRoadmap,
  getAllRoadmap,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
};
