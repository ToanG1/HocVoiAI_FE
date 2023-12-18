import { authedAxiosInstance, axiosInstance } from "./API";

async function handleLocalStorage(res) {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("HOCVOIAI_TOKEN");
      localStorage.removeItem("HOCVOIAI_REFRESHTOKEN");
      localStorage.removeItem("USER_INFO");

      localStorage.setItem("HOCVOIAI_TOKEN", res.data.access_token);
      localStorage.setItem("HOCVOIAI_REFRESHTOKEN", res.data.refersh_token);
      localStorage.setItem("USER_INFO", JSON.stringify(res.data.user_info));
      resolve();
    }, 500);
  });
}

async function handleRemoveLocalStorage(res) {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("HOCVOIAI_TOKEN");
      localStorage.removeItem("HOCVOIAI_REFRESHTOKEN");
      localStorage.removeItem("USER_INFO");
      resolve();
    }, 500);
  });
}

async function login(email, password) {
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password
    });
    if (res.code === 200)
      return handleLocalStorage(res).then(() => {
        return true;
      });
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
    if (res.code === 200)
      return handleLocalStorage(res).then(() => {
        return true;
      });
    else return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function activate(token) {
  return axiosInstance.post(`/auth/activate?code=${token}`);
}

async function logout() {
  try {
    const token = localStorage.getItem("HOCVOIAI_REFRESHTOKEN");
    return handleRemoveLocalStorage().then(() => {
      return authedAxiosInstance.get(`/auth/logout/${token}`);
    });
  } catch (err) {
    console.log(err);
  }
}

async function forgotPwd(email) {
  return axiosInstance.get(`/auth/forgot-pwd?email=${email}`);
}

async function checkCode(email, code) {
  return axiosInstance.post(
    `/auth/check-reset-code?email=${email}&code=${code}`
  );
}

async function checkUrlToken(token) {
  return axiosInstance.get(`/auth/check-url-token?token=${token}`);
}

async function changePwd(token, pwd) {
  const data = {
    pwd: pwd
  };
  return axiosInstance.post(`/auth/reset-pwd/${token}`, data);
}

async function authenticateToken() {
  return authedAxiosInstance.get("/auth/authenticate");
}

export {
  login,
  signup,
  activate,
  logout,
  forgotPwd,
  checkCode,
  changePwd,
  checkUrlToken,
  authenticateToken
};
