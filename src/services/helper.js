function extractUrl(data) {
  const urlRegex = /(https?:\/\/[^\s)\n]+)(?=[\s)\n]|(?:\n\n|\n|$))/g;

  const match = data.match(urlRegex);

  if (match) {
    return match;
  } else {
    return [];
  }
}

async function checkUrl(url) {
  try {
    await fetch(url, {
      mode: "no-cors"
    });
    return true;
  } catch (error) {
    return false;
  }
}

export { extractUrl, checkUrl };
