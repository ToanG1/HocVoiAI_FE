import axios from "axios";
import { RoadmapApiUrl } from "./BaseUrl";

function getRoadmap(roadmapId) {
  return axios.get(`${RoadmapApiUrl}/roadmap?id=${roadmapId}`);
}

function createRoadmap(roadmap) {
  return axios.post(`${RoadmapApiUrl}/roadmap`, roadmap);
}

function updateRoadmap(roadmap) {
  return axios.put(`${RoadmapApiUrl}/roadmap`, roadmap);
}

function deleteRoadmap(roadmapId) {
  return axios.delete(`${RoadmapApiUrl}/roadmap?id=${roadmapId}`);
}