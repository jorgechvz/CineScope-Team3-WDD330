import {
  addFavoriteMovie,
  addMovieToList,
  addRatingMovie,
  addWatchlistMovie,
  createList,
  deleteFavoriteMovie,
  deleteRatingMovie,
  deleteWatchlistMovie,
  getAllList,
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

function eventRating(movieId, imageSelector) {
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

/* Lists Movie Code */

export function checkList(selector, movieId, selectorBody) {
  const getContainer = document.querySelector(selector);
  getContainer.addEventListener("click", function () {
    if (getSessionId == null || getSessionId == []) {
      window.location.href = "/login/index.html";
    } else {
      eventList(movieId, selectorBody);
    }
  });
}

function eventList(movieId, selector) {
  const getModal = document.querySelector(".lists-modal");
  const closeModal = getModal.querySelector(".close-modal-list");
  closeModal.addEventListener("click", () => {
    getModal.style.display = "none";
  });
  getModal.style.display = "flex";
  displayList(selector, movieId);
  let closeDisplayForm = true;
  const btnCreateList = document.querySelector(".create-list");
  btnCreateList.addEventListener("click", () => {
    const formDisplay = document.querySelector(".form-list-create");
    if (closeDisplayForm) {
      formDisplay.classList.add("active");
      closeDisplayForm = false;
    } else {
      formDisplay.classList.remove("active");
      closeDisplayForm = true;
    }
    createListModal(selector, movieId);
  });
}

function displayList(selectorList, movieId) {
  const selector = document.querySelector(selectorList);
  getAllList(getSessionId)
    .then((list) => {
      const getList = list.map((item) => {
        return `
          <div class="lists">
            <div>
              <p>${item.name}</p>
              <p>${item.description}</p>
            </div>
            <button class="add-movie-list" data-set="${item.id}">Add</button>
          </div>
        `;
      });
      selector.innerHTML = getList.join("");
      const addMovieButtons = document.querySelectorAll(".add-movie-list");
      addMovieButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const listId = this.dataset.set;
          addMovieToList(listId, movieId, getSessionId);
        });
      });
    })
    .catch((error) => console.log(error));
}

function createListModal(selectorList, movieId) {
  const createListBtn = document.querySelector("#createList");
  createListBtn.removeEventListener("click", createListModalHandler);
  function createListModalHandler(e) {
    e.preventDefault();
    const nameList = document.querySelector("#nameList").value;
    const descriptionList = document.querySelector("#descriptionList").value;
    createList(getSessionId, nameList, descriptionList)
      .then(() => {
        displayList(selectorList, movieId);
        document.querySelector("#nameList").value = "";
        document.querySelector("#descriptionList").value = "";
      })
      .catch((error) => console.error(error));
  }
  createListBtn.addEventListener("click", createListModalHandler);
}


/* End Lists Movie Code */
