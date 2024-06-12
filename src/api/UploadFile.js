import { authedAxiosInstance } from ".";

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  return authedAxiosInstance.post("/s3/image", formData);
}

export { uploadImage };
