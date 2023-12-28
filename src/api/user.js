import { authedAxiosInstance } from "./API";

function getUser(userId) {
  return authedAxiosInstance.get(`/user/${userId}`);
}

async function updateUser(user) {
  return authedAxiosInstance.patch(`/user/${user.id}`, user);
}

export { getUser, updateUser };
