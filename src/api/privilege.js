import { authedAxiosInstance } from "./API";

function searchPrivilege(searchString) {
  return authedAxiosInstance.get(`/privilege/${searchString}`);
}

export { searchPrivilege };
