import { authedAxiosInstance, axiosInstance } from "./API";
async function login(email, password) {
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password
    });
    localStorage.removeItem("HOCVOIAI_TOKEN");
    localStorage.removeItem("HOCVOIAI_REFRESHTOKEN");
    localStorage.removeItem("tokenId");
    localStorage.removeItem("USER_INFO");

    localStorage.setItem("HOCVOIAI_TOKEN", res.data.access_token);
    localStorage.setItem("HOCVOIAI_REFRESHTOKEN", res.data.refersh_token);
    localStorage.setItem("tokenId", res.data.tokenId);
    localStorage.setItem("USER_INFO", JSON.stringify(res.data.user_info));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function signup(email, password, name) {
  try {
    const res = await axiosInstance.post(`/auth/signup`, {
      email,
      password,
      name
    });
    localStorage.removeItem("HOCVOIAI_TOKEN");
    localStorage.removeItem("HOCVOIAI_REFRESHTOKEN");
    localStorage.removeItem("tokenId");
    localStorage.removeItem("USER_INFO");

    localStorage.setItem("HOCVOIAI_TOKEN", res.data.access_token);
    localStorage.setItem("HOCVOIAI_REFRESHTOKEN", res.data.refersh_token);
    localStorage.setItem("tokenId", res.data.tokenId);
    localStorage.setItem("USER_INFO", JSON.stringify(res.data.user_info));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function logout() {
  try {
    const token = localStorage.getItem("tokenId");
    localStorage.removeItem("HOCVOIAI_TOKEN");
    localStorage.removeItem("HOCVOIAI_REFRESHTOKEN");
    localStorage.removeItem("tokenId");
    localStorage.removeItem("USER_INFO");
    const res = await authedAxiosInstance.post(`/auth/logout/${token}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export { login, signup, logout };
