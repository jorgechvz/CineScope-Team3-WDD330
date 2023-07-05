import { getRequestToken, loginSession } from "./externalServices.mjs";
import { setLocalStorage } from "./utils.mjs";

let requestToken;

export async function fetchRequestToken() {
  try {
    const response = await getRequestToken();
    requestToken = response.request_token;
    console.log("Token de solicitud obtenido:", requestToken);
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
    console.log("Inicio de sesión exitoso:", response);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
}
