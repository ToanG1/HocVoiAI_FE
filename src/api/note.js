import { axiosInstance, authedAxiosInstance } from "./API";

function getNotesById(id) {
  return axiosInstance.get(`/note/${id}`);
}

function createNote(data) {
  return authedAxiosInstance.post("/note", data);
}

function updateNote(id, data) {
  return authedAxiosInstance.patch(`/note/${id}`, data);
}

function deleteNote(id) {
  return authedAxiosInstance.delete(`/note/${id}`);
}

export { getNotesById, createNote, updateNote, deleteNote };
