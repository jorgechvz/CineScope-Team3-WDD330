import {
  getMovieById,
  getMovieCredits,
  getMovieTrailer,
  getRecommendations,
} from "./externalServices.mjs";

/* Movie Detail for Hover */
export function movieDetail(movieId, selector) {
  getMovieById(movieId)
    .then((movie) => {
      console.log(movie);
      displayMovieDetail(movie, selector);
      displayMovieInformation(movie);
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
    <div class="container-movie-cover">
      <div class="cover-detail">
        <div class="container-detail">
          <img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2${
            movie.poster_path
          }" alt="image for ${movie.title}" />
          <div>
            <h2>${movie.title} Detail</h2>
            <button id="btn-openModal-trailer">Watch Trailer</button>
            <p>${movie.overview}</p>
            <ul class="list-genres">${getGenres.join(", ")}</ul>
          </div>
        </div>
      </div>
    </div>
    `;
  const getContainerMovie = document.querySelector(".container-movie-cover");
  getContainerMovie.style.backgroundImage = `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}")`;
}

/* End Movie Detail for Hover */

/* Build Modal for trailer */
export function getTrailer(movieId) {
  getMovieTrailer(movieId)
    .then((movieTrailers) => {
      console.log(movieTrailers);
      const result = movieTrailers.filter(
        (trailer) => trailer.type == "Trailer"
      );
      const getTrailerKey = result[0].key;
      modalEvent(getTrailerKey);
    })
    .catch((error) => console.error(error));
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
  const getbody = document.querySelector(".movie-detail");
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
          getbody.style.filter = "none";
          if (stopVideo) {
            trailerIframe.src = "";
          }
        });
      }
      window.addEventListener("click", (event) => {
        if (event.target === getModal) {
          getModal.style.display = "none";
          getbody.style.filter = "none";
          if (stopVideo) {
            trailerIframe.src = "";
            trailerIframe = null;
          }
        }
      });
      getModal.style.display = "flex";
      getbody.style.filter = "grayscale(100%)";
    });
  } else {
    setTimeout(modalEvent, 1);
  }
}

/* Build Modal for trailer */
export function movieCredits(movieId, selector) {
  getMovieCredits(movieId)
    .then((credits) => {
      console.log(credits);
      const result = credits.filter(
        (trailer) => trailer.known_for_department == "Acting"
      );
      displayMainCast(result.slice(0, 9), selector);
    })
    .catch((error) => console.error(error));
}

function displayMainCast(credits, selector) {
  const movieCastContainer = document.querySelector(selector);
  const getCastArray = credits.map((item) => {
    return `
      <li>
        <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/${item.profile_path}">
        <p class="cast-name"><strong>${item.name}</strong></p>
        <p>${item.character}</p>
      </li>
    `;
  });
  movieCastContainer.insertAdjacentHTML("afterbegin", getCastArray.join(""));
}

/* Information Movie */

function displayMovieInformation(movie) {
  const movieInformationContainer =
    document.querySelector(".information-movie");
  const originalLanguage = movie.original_language;
  const nameOfLanguage = movie.spoken_languages.find((language) => {
    return language.iso_639_1 == originalLanguage;
  });
  let budget = movie.budget;
  if (budget == 0) {
    budget = "-";
  }
  let revenue = movie.revenue;
  if (revenue == 0) {
    revenue = "-";
  }
  movieInformationContainer.innerHTML = `
    <h4>Original Title</h4>
    <p>${movie.original_title}</p>
    <h4>Status</h4>
    <p>${movie.status}</p>
    <h4>Original Language</h4>
    <p>${nameOfLanguage.english_name}</p>
    <h4>Budget</h4>
    <p>${budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
    <h4>Revenue</h4>
    <p>${revenue.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
    <hr>
  `;
}


/* Movie Recommendations */

export function movieRecommendations(movieId, selector) {
  getRecommendations(movieId)
  .then((recommendation) => {
    console.log(recommendation);
    displayRecommendations(recommendation,selector)
  })
  .catch((error) => console.log(error)) 
}

function displayRecommendations(recommendation, selector) {
  const recommendationContainer = document.querySelector(selector)
  const getRecommendationsArray = recommendation.map((item) => {
    return `
    <li>
      <a href="/movie_detail/index.html?movie=${item.id}">
        <img src="https://www.themoviedb.org/t/p/w250_and_h141_face/${item.backdrop_path}" />
      </a>
      <div>
        <a href="/movie_detail/index.html?movie=${item.id}">${item.title}</a>
        <p>${(item.vote_average*10).toFixed(0)}%</p>
      </div>
    </li>
    `
  })
  recommendationContainer.insertAdjacentHTML("afterbegin", getRecommendationsArray.join(""));
}
/* End Movie Recommendations */