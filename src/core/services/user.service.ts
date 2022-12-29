import { deleteAllCookies, getCookie, setCookie } from "./utility.service";

export function getCurrentUserToken(): string {
  // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWE5MGJmNTg0ZGYzMGE1Zjc0ZTEwNiIsImlhdCI6MTY1NDM2MDM1MSwiZXhwIjoxNjU0NDAzNTUxfQ.b2T_5182WhW_Dl7P2bZynwtM4FiXxwmWx3NPyg_NLIk"
  return getCookie("token") as string;
}

export function setUserSession(data: { token: string; user: any }) {
  setCookie("token", data.token, 1);
  setCookie("user", JSON.stringify(data.user), 1);
}

export function getCurrentUser() {
  const user = getCookie("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export function isUserSessionActive() {
  return getCurrentUser() && getCurrentUser();
}

export function logoutUser() {
  return deleteAllCookies();
}
