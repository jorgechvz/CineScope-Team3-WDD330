import {
  addFavoriteMovie,
  addWatchlistMovie,
  deleteFavoriteMovie,
  deleteWatchlistMovie,
  getMovieStatus,
} from "./externalServices.mjs";

const getSessionId = localStorage.getItem("session");

/* Add/Delete Favorite Movie Code */

function checkFavoriteStatus(movieId, imageSelector) {
  const getImageSelector = document.querySelector(imageSelector);
  getMovieStatus(movieId, getSessionId)
    .then((status) => {
      if (status.favorite == true) {
        getImageSelector.src = "../images/heart-icon.png";
        deleteFavoriteMovie(movieId, getSessionId);
        status.favorite = false;
      } else {
        getImageSelector.src = "../images/heart-iconred.png";
        addFavoriteMovie(movieId, getSessionId);
        status.favorite = true;
      }
    })
    .catch((err) => console.error(err));
}

export function eventFavoriteMovie(movieId, selector, imageSelector) {
  const getContainer = document.querySelector(selector);
  const getImageSelector = document.querySelector(imageSelector);
  if (getSessionId != null) {
    getMovieStatus(movieId, getSessionId).then((status) => {
      if (status.favorite) {
        getImageSelector.src = "../images/heart-iconred.png";
      } else {
        getImageSelector.src = "../images/heart-icon.png";
      }
    });
  }
  getContainer.addEventListener("click", function () {
    if (getSessionId == null || getSessionId == []) {
      window.location.href = "/login/index.html";
    } else {
      checkFavoriteStatus(movieId, imageSelector);
    }
  });
}

/* End Add/Delete Favorite Movie Code */

/* ------------------------- */

/* Add/Delete Watchlist Movie Code */
function checkWatchlistStatus(movieId, imageSelector) {
  const getImageSelector = document.querySelector(imageSelector);
  getMovieStatus(movieId, getSessionId)
    .then((status) => {
      if (status.watchlist == true) {
        getImageSelector.src = "../images/watchlist-icon.png";
        deleteWatchlistMovie(movieId, getSessionId);
        status.watchlist = false;
      } else {
        getImageSelector.src = "../images/watchlist-iconred.png";
        addWatchlistMovie(movieId, getSessionId);
        status.watchlist = true;
      }
    })
    .catch((err) => console.error(err));
}

export function eventWatchlistMovie(movieId, selector, imageSelector) {
  const getContainer = document.querySelector(selector);
  const getImageSelector = document.querySelector(imageSelector);
  if (getSessionId != null) {
    getMovieStatus(movieId, getSessionId).then((status) => {
      if (status.watchlist) {
        getImageSelector.src = "../images/watchlist-iconred.png";
      } else {
        getImageSelector.src = "../images/watchlist-icon.png";
      }
    })
    .catch((err) => console.error(err));
  }
  getContainer.addEventListener("click", function () {
    if (getSessionId == null || getSessionId == []) {
      window.location.href = "/login/index.html";
    } else {
      checkWatchlistStatus(movieId, imageSelector);
    }
  });
}

/* End Add/Delete Watchlist Movie Code */

/* Add/Delete rating Movie Code */

export function checkRatingStatus(movieId){ 
  getMovieStatus(movieId, getSessionId)
  .then((rating) => {
    if (!rating.rated) {

    } else {
      console.log(rating.rated.value)
    }
  })
  .catch((err) => console.error(err));
}


/* End Add/Delete rating Movie Code */
