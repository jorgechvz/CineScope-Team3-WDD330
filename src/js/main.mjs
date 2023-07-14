import { getMovieById, getMovieByNowPlaying, getMovies, getMovieByTopRated, getMovieByUpcoming } from "./externalServices.mjs";
import { getTrailer } from "./movieDetail.mjs";

export function mainMovie() {
  const selectorHoverDetail = ".hero";
  const nowPlaying = ".nowplaying-movies";
  const popular = ".popular-movies";
  const toprated = ".toprated-movies";
  const upcomming = ".upcomming-movies";
  getMovieByTopRated().
    then((movie) => {
      const movieId = getRandomMovieId(movie)

      movieDetail(movieId, selectorHoverDetail);
      getTrailer(movieId);
      movieNowPlaying(nowPlaying);
      moviePopular(popular);
      movieTopRated(toprated);
      movieUpcoming(upcomming);
    })
    .catch((error) => console.error(error));
};

function movieDetail(movieId, selector) {
  getMovieById(movieId)
    .then((movie) => {
      // console.log(movie);
      displayMovieDetail(movie, selector);
    })
    .catch((error) => console.error(error));
};

function getRandomMovieId(movie) {
  const randomIndex = Math.floor(Math.random() * movie.length);
  const randomMovie = movie[randomIndex];
  const movieId = randomMovie.id;
  return movieId
}

function displayMovieDetail(movie, selector) {
  const container = document.querySelector(selector);
  container.innerHTML = `
      <div class="container-hero-cover">
        <div class="cover-hero">
        <div class="hero-container">
            <h2 class="hero-title">${movie.title} </h2>
            <span class="hero-date">${new Date(movie.release_date).getFullYear()}</span>
            <p>${movie.overview}</p>
            <div class="hero-modal">
            <span id="btn-openModal-trailer" class="btn-trailer">
              <span class="play-icon">&#9654;</span> Watch Trailer
            </span>
            <span class="hero-information">
            <a href="/movie_detail/index.html?movie=${movie.id}">Information
            <a/>
            </span>
            <div>
          </div>
        </div>
        
      </div>
      `;
  const getContainerMovie = document.querySelector(".container-hero-cover");
  getContainerMovie.style.backgroundImage = `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}")`;
}

function movieNowPlaying(selector) {
  getMovieByNowPlaying()
    .then((nowPlaying) => {
      displayMovies(nowPlaying, selector);
    })
    .catch((error) => console.log(error));
}

function moviePopular(selector) {
  getMovies(1)
    .then((nowPlaying) => {
      displayMovies(nowPlaying, selector);
    })
    .catch((error) => console.log(error));
}

function movieTopRated(selector) {
  getMovieByTopRated()
    .then((nowPlaying) => {
      displayMovies(nowPlaying, selector);
    })
    .catch((error) => console.log(error));
}

function movieUpcoming(selector) {
  getMovieByUpcoming()
    .then((nowPlaying) => {
      displayMovies(nowPlaying, selector);
    })
    .catch((error) => console.log(error));
}

function displayMovies(nowPlaying, selector) {
  const nowPlayingContainer = document.querySelector(selector);
  const getNowPlayingArray = nowPlaying.map((item) => {
    return `
    <li>
      <a href="/movie_detail/index.html?movie=${item.id}">
        <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path
      }" />
      </a>
      <div>
        <a href="/movie_detail/index.html?movie=${item.id}">${item.title}</a>
        <p>${(item.vote_average * 10).toFixed(0)}%</p>
      </div>
    </li>
    `;
  });
  nowPlayingContainer.insertAdjacentHTML(
    "afterbegin",
    getNowPlayingArray.join("")
  );
}