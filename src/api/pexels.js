import { createClient } from "pexels";

const key = "kYmV4IKtjn4cr8oVXvrHTCvjqTevvxIMubdB73KJkna6Q2itaFwzfAK1";
per_page = 20;
const client = createClient(key);

async function searchPhoto(query) {
  return client.photos.search({ query, per_page: per_page });
}

async function getPhoto(id) {
  return client.photos.show({ id: id });
}

export { searchPhoto, getPhoto };
