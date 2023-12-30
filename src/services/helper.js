function extractUrl(data) {
  const urlRegex = /(https?:\/\/[^\s)\n]+)(?=[\s)\n]|(?:\n\n|\n|$))/;

  const match = data.match(urlRegex);

  if (match) {
    const url = match[1];
    return url;
  } else {
    return null;
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
