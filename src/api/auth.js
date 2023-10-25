import axios from "axios";
import { BASE_URL } from "./API";
async function login(email, password) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    localStorage.setItem("HOCVOIAI_TOKEN", res.data.access_token);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function signup(email, password, name) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, {
      email,
      password,
      name,
    });
    localStorage.setItem("HOCVOIAI_TOKEN", res.data.access_token);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { login, signup };
