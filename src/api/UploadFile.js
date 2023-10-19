import axios from "axios";
import { RoadmapApiUrl } from "./BaseUrl";

async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post(`${RoadmapApiUrl}/minio/image`, formData)
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
