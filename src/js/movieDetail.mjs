import { checkRatingStatus, eventFavoriteMovie, eventWatchlistMovie } from "./actions.mjs";
import {
  getMovieById,
  getMovieCredits,
  getMovieTrailer,
  getRecommendations,
} from "./externalServices.mjs";

/* --------------------Movie Detail for Hover -------------------------------*/

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
  container.innerHTML = `
    <div class="container-movie-cover">
      <div class="cover-detail">
        <div class="container-detail">
          <img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}" alt="image for ${movie.title}" />
          <div>
            <h2>${movie.title} <span>(${new Date(movie.release_date).getFullYear()})</span></h2>
            <p>
              ${getReleaseInformation(movie)}
              ${getMovieDuration(movie.runtime)}
            </p>
            <ul class="container-actions-movie">
              <li class="average-movie">
                <canvas id="myCanvas" width="60" height="60"></canvas>
                <p>User<br>Score</p>
              </li>
              <li class="actions add-list" data-id=${movie.id}><img class="icon-actions list-icon" src="../images/list-icon.png" /></li>
              <li class="actions add-favorite" data-id="${movie.id}"><img class="icon-actions heart-icon" src="../images/heart-icon.png" /></li>
              <li class="actions add-watchlist" data-id=${movie.id}><img class="icon-actions watchlist-icon" src="../images/watchlist-icon.png" /></li>
              <li class="actions add-rating" data-id=${movie.id}><img class="icon-actions star-icon" src="../images/star-icon.png" /></li>
              <li id="btn-openModal-trailer"><span class="play-icon">&#9654;</span> Watch Trailer</li>
            </ul>
            <p>${movie.tagline}</p>
            <h3>Overview</h3>
            <p>${movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
    `;
  const getContainerMovie = document.querySelector(".container-movie-cover");
  getContainerMovie.style.backgroundImage = `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}")`;
  buildCanvasUserScore(movie.vote_average);
  eventFavoriteMovie(movie.id, ".add-favorite", ".heart-icon");
  eventWatchlistMovie(movie.id, ".add-watchlist", ".watchlist-icon");
  checkRatingStatus(movie.id);
  document.querySelector(".add-rating").addEventListener("click", buildRatingMovie)
}

/* Function to get movie's release information*/
function getReleaseInformation(movie) {
  const getGenres = movie.genres.map((item) => {
    return `
      <a href="">${item.name}</a>
      `;
  });
  const getReleaseInfo = movie.release_dates.results.find((release) => {
    return release.iso_3166_1 == movie.production_countries[0].iso_3166_1;
  });
  const getReleaseData = new Date(getReleaseInfo.release_dates[0].release_date);
  const optionsDate = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  };
  const formattedDateRelease = getReleaseData.toLocaleDateString(
    "en-US",
    optionsDate
  );
  return `
    <span class="movie-certification">${getReleaseInfo.release_dates[0].certification}</span> 
    <span class="movie-release">${formattedDateRelease} (${getReleaseInfo.iso_3166_1})</span> 
    &#x2022; 
    <span class="movie-genres">${getGenres.join(",")}</span> 
    &#x2022; 
  `
}

/* Function to get and convert movie duration */
function getMovieDuration(duration) {
  const hourMovie = Math.floor(duration / 60);
  const minuteMovie = duration % 60;
  const formattedDuration = `${hourMovie}h ${minuteMovie}m`;
  return `
    <span class="movie-duration">${formattedDuration}</span>
  `
}

/* Get Canvas for User Score */
function buildCanvasUserScore(movie) {
  const getPercet = (movie * 10).toFixed(0)
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 25;
  const lineWidth = 3;
  const fillColor = '#e0e0e0';
  const strokeColor = '#ece907';
  const percent = getPercet;
  const maxValue = 100;
  const angle = (percent / maxValue) * Math.PI * 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = fillColor;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + angle);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(percent, centerX - 2, centerY);
  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText("%", centerX + 13, centerY - 6);
}
/* End Movie Detail for Hover */

/* Build Modal to Rating Movie */

function buildRatingMovie() {
  const ratingContainer = document.querySelector(".add-rating");
  const createDiv = document.createElement('div');
  createDiv.className = "rating-container"
  createDiv.innerHTML = `
      <fieldset class="rate">
        <input type="radio" id="rating10" name="rating" value="10" />
        <label for="rating10" title="5 stars"></label>
        <input type="radio" id="rating9" name="rating" value="9" />
        <label class="half" for="rating9" title="4 1/2 stars"></label>
        <input type="radio" id="rating8" name="rating" value="8" />
        <label for="rating8" title="4 stars"></label>
        <input type="radio" id="rating7" name="rating" value="7" />
        <label class="half" for="rating7" title="3 1/2 stars"></label>
        <input type="radio" id="rating6" name="rating" value="6" />
        <label for="rating6" title="3 stars"></label>
        <input type="radio" id="rating5" name="rating" value="5" />
        <label class="half" for="rating5" title="2 1/2 stars"></label>
        <input type="radio" id="rating4" name="rating" value="4" />
        <label for="rating4" title="2 stars"></label>
        <input type="radio" id="rating3" name="rating" value="3" />
        <label class="half" for="rating3" title="1 1/2 stars"></label>
        <input type="radio" id="rating2" name="rating" value="2" />
        <label for="rating2" title="1 star"></label>
        <input type="radio" id="rating1" name="rating" value="1" />
        <label class="half" for="rating1" title="1/2 star"></label>
        <input type="radio" id="rating0" name="rating" value="0" />
        <label for="rating0" title="No star"></label>
      </fieldset>
  `
  ratingContainer.appendChild(createDiv)
}
/* End Build Modal to Rating Movie */

/* ------------------------Build Modal for trailer ---------------------------*/
export function getTrailer(movieId) {
  getMovieTrailer(movieId)
    .then((movieTrailers) => {
      const result = movieTrailers.filter(
        (trailer) => trailer.type == "Trailer"
      );
      const getTrailerKey = result[0].key;
      modalEvent(getTrailerKey);
    })
    .catch((error) => console.error(error));
}

/* Function to display Modal */
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

/* Function to manage modal event */
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

/*------------------------- Get Movie Credits -----------------------------------*/
export function movieCredits(movieId, selector) {
  getMovieCredits(movieId)
    .then((credits) => {
      const result = credits.filter(
        (trailer) => trailer.known_for_department == "Acting"
      );
      displayMainCast(result.slice(0, 9), selector);
    })
    .catch((error) => console.error(error));
}

/* Function to display main cast */
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

/* ------------------------- Information Movie ----------------------------------*/
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
    <p>${budget.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}</p>
    <h4>Revenue</h4>
    <p>${revenue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })}</p>
    <hr>
  `;
}

/*--------------------------- Movie Recommendations --------------------------------*/
export function movieRecommendations(movieId, selector) {
  getRecommendations(movieId)
    .then((recommendation) => {
      displayRecommendations(recommendation, selector);
    })
    .catch((error) => console.log(error));
}

/* Function to display movie Recommendations */
function displayRecommendations(recommendation, selector) {
  const recommendationContainer = document.querySelector(selector);
  const getRecommendationsArray = recommendation.map((item) => {
    return `
    <li>
      <a href="/movie_detail/index.html?movie=${item.id}">
        <img src="https://www.themoviedb.org/t/p/w250_and_h141_face/${item.backdrop_path
      }" />
      </a>
      <div>
        <a href="/movie_detail/index.html?movie=${item.id}">${item.title}</a>
        <p>${(item.vote_average * 10).toFixed(0)}%</p>
      </div>
    </li>
    `;
  });
  recommendationContainer.insertAdjacentHTML(
    "afterbegin",
    getRecommendationsArray.join("")
  );
}
/* End Movie Recommendations */
