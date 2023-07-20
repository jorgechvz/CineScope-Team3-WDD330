import {
  fetchRequestToken,
  getAccount,
  login,
  logout,
  newUser,
  session,
  sessionWithoutUser,
} from "./authenticate.mjs";
import { getParam } from "./utils.mjs";

document.querySelector("#submitLogin").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  fetchRequestToken();
  setTimeout(() => {
    login(email, password);
    setTimeout(() => {
      session();
    }, 1000);
  }, 1000);
});

const singUp = document.querySelector(".sign-up-btn");
singUp.addEventListener("click", (e) => {
  e.preventDefault();
  fetchRequestToken();
  setTimeout(() => {
    newUser();
    const url = singUp.getAttribute("href");
    window.location = url;
  }, 1000);
});

const approve = getParam("approved");
const token = getParam("request_token");
if (approve == "true") {
  sessionWithoutUser(token);
  setTimeout(() => {
    getAccount();
    window.location = "../../index.html";
  }, 1000);
}
