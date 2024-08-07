import axios from "axios";

const BASE_URL =
  "http://HVA-BE-LB-73ebf961d59373fc.elb.ap-southeast-1.amazonaws.com/api";
const IMG_URL = "https://hva-bucket.s3.ap-southeast-1.amazonaws.com/";
const WS_SERVER =
  "ws://HVA-BE-LB-73ebf961d59373fc.elb.ap-southeast-1.amazonaws.com/";

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

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
const MAX_RETRY = 10;

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
