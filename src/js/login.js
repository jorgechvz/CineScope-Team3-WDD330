import { fetchRequestToken, login } from "./authenticate.mjs";

fetchRequestToken();
document.querySelector("#submitLogin").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  
  login(email, password);
});
