import axios from "axios";
import { BASE_URL, bearerConfig } from "./API";

async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post(`${BASE_URL}/minio/image`, formData, bearerConfig)
      .then((res) => {
        console.log(res);
        resolve(res.data.url);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export { uploadImage };
