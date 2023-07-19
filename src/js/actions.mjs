import {
  addFavoriteMovie,
  addRatingMovie,
  addWatchlistMovie,
  deleteFavoriteMovie,
  deleteRatingMovie,
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
    getMovieStatus(movieId, getSessionId)
      .then((status) => {
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
export function eventRatingMovie(selector, movieId, imageSelector) {
  const getImageSelector = document.querySelector(imageSelector);
  const getContainer = document.querySelector(selector);
  if (getSessionId != null) {
    getMovieStatus(movieId, getSessionId).then((status) => {
      if (status.rated != false) {
        getImageSelector.src = "../images/star-iconyellow.png";
      } else {
        getImageSelector.src = "../images/star-icon.png";
      }
    });
  }
  getContainer.addEventListener("click", function () {
    if (getSessionId == null || getSessionId == []) {
      window.location.href = "/login/index.html";
    } else {
      eventRating(movieId, imageSelector);
    }
  });
}

function checkRatingMovie(movieId, imageSelector) {
  const ratingInputs = document.querySelectorAll(".rate input");
  const getImageSelector = document.querySelector(imageSelector);
  ratingInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const selectedValue = parseFloat(this.value);
      getMovieStatus(movieId, getSessionId)
        .then((status) => {
          if (status.rated == false) {
            if (selectedValue != 0) {
              addRatingMovie(movieId, selectedValue, getSessionId);
              getImageSelector.src = "../images/star-iconyellow.png";
            } else {
              deleteRatingMovie(movieId, getSessionId);
              getImageSelector.src = "../images/star-icon.png";
            }
          } else {
            if (selectedValue != 0) {
              addRatingMovie(movieId, selectedValue, getSessionId);
              getImageSelector.src = "../images/star-iconyellow.png";
            } else {
              deleteRatingMovie(movieId, getSessionId);
              getImageSelector.src = "../images/star-icon.png";
            }
          }
        })
        .catch((err) => console.error(err));
    });
  });
}

async function eventRating(movieId, imageSelector) {
  const getModal = document.querySelector(".rate-modal");
  const closeModal = getModal.querySelector(".close-modal-rate");
  closeModal.addEventListener("click", () => {
    getModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === getModal) {
      getModal.style.display = "none";
    }
  });
  getModal.style.display = "flex";
  checkRatingMovie(movieId, imageSelector);
}

/* End Add/Delete rating Movie Code */
