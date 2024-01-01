import axios from "axios";

const BASE_URL = "http://localhost:5001/api";
const IMG_URL = "http://localhost:9000";
const WS_SERVER = "ws://localhost:5001/";

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

function getToken() {
  const token = localStorage.getItem("HOCVOIAI_TOKEN");
  if (token === null) {
    setInterval(() => {
      getToken();
    }, 500);
  }
  return token;
}

const authedAxiosInstance = axios.create({
  baseURL: BASE_URL
});

document.addEventListener("newToken", () => {
  console.log("new token received");
  authedAxiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("HOCVOIAI_ADMIN_TOKEN")}`;
});

let retryCounter = 0;
const MAX_RETRY = 3;

axiosInstance.interceptors.response.use((response) => {
  return response.data;
});

authedAxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      retryCounter < MAX_RETRY
    ) {
      retryCounter++;

      originalRequest._retry = true;

      const { data } = await refreshToken();
      localStorage.removeItem("HOCVOIAI_TOKEN");
      localStorage.setItem("HOCVOIAI_TOKEN", data.access_token);
      window.dispatchEvent(new Event("newToken"));

      // Update the Authorization header with the new token
      authedAxiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;
      return authedAxiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

// Function to refresh the token (replace this with your actual token refresh logic)
const refreshToken = async () => {
  return axiosInstance.post(`/auth/refresh`, {
    refreshToken: localStorage.getItem("HOCVOIAI_REFRESHTOKEN")
  });
};

export { BASE_URL, IMG_URL, WS_SERVER, axiosInstance, authedAxiosInstance };
