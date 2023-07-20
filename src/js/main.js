import { mainMovie } from "./main.mjs";
import { getAccount, logout } from "./authenticate.mjs";
import { btnLoginLogout, loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

btnLoginLogout();

mainMovie();


