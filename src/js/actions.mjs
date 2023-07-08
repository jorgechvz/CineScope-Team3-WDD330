import { addFavoriteMovie, addWatchlistMovie } from "./externalServices.mjs";
import { getParam } from "./utils.mjs";


const movieId = getParam("movie")

function favoriteMovie(movie_id) {
  const getSessionId = localStorage.getItem("session");
  if (getSessionId == null || getSessionId == []) {
    window.location.href = "/login/index.html";
  } else {
    addFavoriteMovie(movie_id, getSessionId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }
}

export function eventAddFavorite(selector, imageSelector) {
  const getContainer = document.querySelector(selector);
  getContainer.addEventListener("click", function(){
    const getImageSelector = document.querySelector(imageSelector);
    getImageSelector.src = "../images/heart-iconred.png"
    favoriteMovie(movieId);
  });
}

function watchlist(movie_id) {
  const getSessionId = localStorage.getItem("session");
  if (getSessionId == null || getSessionId == []) {
    window.location.href = "/login/index.html";
  } else {
    addWatchlistMovie(movie_id, getSessionId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }
}

export function eventAddWatchlist(selector, imageSelector) {
  const getContainer = document.querySelector(selector);
  getContainer.addEventListener("click", function(){
    const getImageSelector = document.querySelector(imageSelector);
    getImageSelector.src = "../images/watchlist-iconred.png"
    watchlist(movieId);
  });
}
