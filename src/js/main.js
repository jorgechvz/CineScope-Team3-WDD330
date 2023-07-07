import { getAccount, logout } from "./authenticate.mjs";

getAccount();

document.querySelector(".logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});
