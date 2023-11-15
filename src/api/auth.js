import { axiosInstance } from "./API";
async function login(email, password) {
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password
    });
    localStorage.removeItem("HOCVOIAI_TOKEN");
    localStorage.removeItem("USER_INFO");
    localStorage.setItem("HOCVOIAI_TOKEN", res.data.access_token);
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
    localStorage.removeItem("USER_INFO");
    localStorage.setItem("HOCVOIAI_TOKEN", res.data.access_token);
    localStorage.setItem("USER_INFO", JSON.stringify(res.data.user_info));
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { login, signup };
