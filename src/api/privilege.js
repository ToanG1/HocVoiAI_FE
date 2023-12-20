import { authedAxiosInstance } from "./API";

function searchPrivilege(searchString) {
  return authedAxiosInstance.get(`/privilege/${searchString}`);
}

function createPrivilege(id) {
  return authedAxiosInstance.post(`/privilege/${id}`);
}

export { searchPrivilege, createPrivilege };
