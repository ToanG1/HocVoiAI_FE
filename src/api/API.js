import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const IMG_URL = "http://localhost:9000";
const WS_SERVER = "ws://localhost:5000/";

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

const authedAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("HOCVOIAI_TOKEN")}`
  }
});

export { BASE_URL, IMG_URL, WS_SERVER, axiosInstance, authedAxiosInstance };
