import { createClient } from "pexels";

const key = "kYmV4IKtjn4cr8oVXvrHTCvjqTevvxIMubdB73KJkna6Q2itaFwzfAK1";
const per_page = 20;
const client = createClient(key);

/**
 * Returns a list of objects with img url and img id
 *
 * @param {string} query The query to search.
 * @param {srting} type The type of image like portrait or landscape.
 */
async function searchPhoto(query, type) {
  return client.photos.search({ query, per_page: per_page }).then((data) => {
    return data.photos.map((photo) => {
      return { id: photo.id, url: photo.src.portrait };
    });
  });
}

/**
 * Returns a object with img url and img id
 *
 * @param {string} query The query to search.
 * @param {srting} type The type of image like portrait or landscape.
 */
async function getPhoto(id, type) {
  return client.photos.show({ id: id }).then((photo) => {
    return { id: photo.id, url: photo.src[type] };
  });
}

export { searchPhoto, getPhoto };
