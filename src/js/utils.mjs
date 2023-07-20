import { loginBtn, logout } from "./authenticate.mjs";

export const getParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
};

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    if (parentElement) {
      parentElement.innerHTML = '';
    }
  }
  const htmlString = await templateFn(data);
  if(parentElement) {
    parentElement.insertAdjacentHTML(position, htmlString);
  }
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate('/partials/header.html');
  const footerTemplateFn = loadTemplate('/partials/footer.html');
  const header = document.querySelector('#main-header');
  const footer = document.querySelector('#main-footer');
  renderWithTemplate(headerTemplateFn, header);
  renderWithTemplate(footerTemplateFn, footer);
}

export function btnLoginLogout() {
  const btnLoginLogoutContainer = document.querySelector(".logout-btn");
  if (btnLoginLogoutContainer) {
    const token = localStorage.getItem("session");
    if (token) {
      btnLoginLogoutContainer.textContent = "Logout";
      btnLoginLogoutContainer.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
      });
    } else {
      btnLoginLogoutContainer.textContent = "Login";
      btnLoginLogoutContainer.addEventListener("click", (e) => {
        e.preventDefault();
        loginBtn(); 
      });
    }
  } else {
    setTimeout(btnLoginLogout, 1);
  }
}
