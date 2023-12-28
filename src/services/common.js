import { authenticateToken } from "../api/auth";

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

function checkIsUser(userId) {
  const userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
  if (!userInfo) return false;
  return userId === userInfo.userId;
}

function checkAuthenticationInApp() {
  if (localStorage.getItem("HOCVOIAI_TOKEN"))
    authenticateToken()
      .then((res) => {
        if (res.code !== 200 || !res.data) {
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        if (err instanceof TypeError) window.location.href = "/login";
        if (err.response.status !== 401) window.location.href = "/login";
      });
  else window.location.href = "/login";
}

function checkAuthenticationOutOfApp() {
  if (localStorage.getItem("HOCVOIAI_TOKEN"))
    authenticateToken()
      .then((res) => {
        if (res.code === 200 || res.data) {
          window.location.href = "/features";
        }
      })
      .catch(() => {
        handleRemoveLocalStorage();
      });
}

export { checkIsUser, checkAuthenticationInApp, checkAuthenticationOutOfApp };
