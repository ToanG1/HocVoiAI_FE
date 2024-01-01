import { axiosInstance } from ".";

function getYoutubeVideoSubtitles(videoId) {
  return axiosInstance.get(`/ai/document/subtitles?videoId=${videoId}`);
}

function summarizeDocument(document) {
  const data = {
    document
  };
  return axiosInstance.post(`/ai/document/summarizes`, data);
}

export { getYoutubeVideoSubtitles, summarizeDocument };
