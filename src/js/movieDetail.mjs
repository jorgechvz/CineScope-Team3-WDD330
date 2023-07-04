import { getMovieById, getMovieTrailer } from "./externalServices.mjs";

export function movieDetail(movieId, selector) {
  getMovieById(movieId)
    .then((movie) => {
      console.log(movie);
      displayMovieDetail(movie, selector);
    })
    .catch((error) => console.error(error));
}

function displayMovieDetail(movie, selector) {
  const container = document.querySelector(selector);
  const getGenres = movie.genres.map((item) => {
    return `
            <li>${item.name}</li>
        `;
  });
  container.innerHTML = `
        <h2>${movie.title} Detail</h2>
        <img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2${
          movie.poster_path
        }" alt="image for ${movie.title}" />
        <button id="btn-openModal-trailer">Watch Trailer</button>
        <p>${movie.overview}</p>
        <ul>${getGenres.join("")}</ul>
    `;
}

export function getTrailer(movieId) {
  getMovieTrailer(movieId).then((movieTrailers) => {
    console.log(movieTrailers);
    const result = movieTrailers.filter(trailer => trailer.type ==  'Trailer');
    const getTrailerKey = result[0].key;
    modalEvent(getTrailerKey);
  });
}
function displayTrailerModal(trailerKey) {
  const modalContainer = document.querySelector(".trailer-modal");
  modalContainer.innerHTML = `
            <div class="modal-content">
                <div class="modal-header"> 
                    <h3>Watch Trailer</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <iframe id="trailerIframe" type="text/html" style="background-color: #000;" width="100%" height="528" src="//www.youtube.com/embed/${trailerKey}?autoplay=1&amp;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1" frameborder="0" allowfullscreen=""></iframe>
            </div>
        `;
}

function modalEvent(trailerKey) {
  const getModalOpen = document.querySelector("#btn-openModal-trailer");
  if (getModalOpen) {
    getModalOpen.addEventListener("click", (e) => {
      e.preventDefault();
      displayTrailerModal(trailerKey); /* 
      const originalUrl = window.location.href;
      const newUrl = `${window.location}#watch=${trailerKey}`;
      history.replaceState({}, "", newUrl); */
      const getModal = document.querySelector(".trailer-modal");
      const closeModal = getModal.querySelector(".close-modal");
      const stopVideo = getModal.querySelector("#trailerIframe");

      if (closeModal) {
        closeModal.addEventListener("click", () => {
          getModal.style.display = "none";
          if (stopVideo) {
            trailerIframe.src = "";
          }
        });
      } 
      window.addEventListener("click", (event) => {
        if (event.target === getModal) {
          getModal.style.display = "none";
          if (stopVideo) {
            trailerIframe.src = ""; 
            trailerIframe = null;
          }
        }
      }); 
      getModal.style.display = "flex";
    });
  } else {
    setTimeout(modalEvent, 1);
  }
}

function displayMainCast() {}
