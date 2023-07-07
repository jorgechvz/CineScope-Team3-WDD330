import {
  createSession,
  getDetailsAccount,
  getRequestToken,
  loginSession,
  logoutSession,
} from "./externalServices.mjs";

let requestToken;
let sessionId;

export async function fetchRequestToken() {
  try {
    const response = await getRequestToken();
    requestToken = response.request_token;
  } catch (error) {
    console.error("Error al obtener el token de solicitud:", error);
  }
}

export async function login(username, password) {
  const credentials = {
    username,
    password,
    request_token: requestToken,
  };
  try {
    const response = await loginSession(credentials);
    console.log(response);
    if (response.success == false) {
      const failure = document.querySelector(".message_failure");
      failure.innerHTML = response.status_message;
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
}

export async function session() {
  try {
    const response = await createSession(requestToken);
    console.log(response);
    sessionId = response.session_id;
    localStorage.setItem("session", sessionId);
    if (response.success == true) {
      window.location = "http://localhost:5173/";
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
}

export async function sessionWithoutUser(token) {
  try {
    const response = await createSession(token);
    sessionId = response.session_id;
    localStorage.setItem("session", sessionId);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
}

export function newUser() {
  const urlRedirect = document.querySelector(".sign-up-btn");
  urlRedirect.setAttribute(
    "href",
    `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173/login/index.html`
  );
}

export function getAccount() {
  const sessionId = localStorage.getItem("session");
  getDetailsAccount(sessionId).then((account) => {
    console.log(account);
    diplayAccount(account);
  });
}

function diplayAccount(account) {
  const container = document.querySelector(".accountInformation");
  container.innerHTML = `
        <h4>${account.username}</h4>
    `;
}

export function logout() {
  const sessionId = localStorage.getItem("session");
  logoutSession(sessionId).then((session) => {
    console.log(session);
    if ((session.success = true)) {
      localStorage.clear();
      window.location = "http://localhost:5173/login/index.html";
    }
  });
}
