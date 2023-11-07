const BASE_URL = "http://localhost:5001/api";
const IMG_URL = "http://localhost:9000";
const WS_SERVER = "ws://localhost:5001/";

const bearerConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("HOCVOIAI_TOKEN")}` }
};

export { BASE_URL, IMG_URL, WS_SERVER, bearerConfig };
