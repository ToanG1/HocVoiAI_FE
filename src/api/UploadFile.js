import { authedAxiosInstance } from "./API";

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  return authedAxiosInstance.post("/minio/image", formData);
}

export { uploadImage };
