import { IMG_KEY } from "./constant";

async function query(data) {
  const response = await fetch(IMG_KEY, {
    headers: {
      Authorization: "Bearer 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",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = await response.blob();
  return result;
}

async function createImg(promp) {
  return URL.createObjectURL(await query(prompt));
}

export { createImg };
