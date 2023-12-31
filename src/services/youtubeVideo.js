function transformVideoSubtitles(subtitles) {
  return subtitles
    .map((item) => {
      return item.text;
    })
    .join(" ");
}

function splitSuggestion(data) {
  return data.split(/\n\n/).map((item, i) => {
    return {
      id: i,
      content: item.trim(),
      summarizedDocument: null
    };
  });
}

function extractYoutubeVideoId(string) {
  const youtubeUrlRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = string.match(youtubeUrlRegex);

  if (match) {
    const videoId = match[1];
    return videoId;
  } else {
    return null;
  }
}

export { transformVideoSubtitles, splitSuggestion, extractYoutubeVideoId };
