import { getMovieByNowPlaying, getMovies } from "./externalServices.mjs";

export function movies() {
  getMovies(1)
    .then((products) => {
      console.log(products);
      displayMovies(products);
    })
    .catch((error) => console.error(error));
}

function displayMovies(movies) {
  const container = document.querySelector(".movie-list");
  const getArray = movies.map((movie) => {
    return `
    <div>
    <a href="/movie_detail/index.html?movie=${movie.id}">
        <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}">
        <p>${movie.title}</p>
    </a>
    </div>
        `;
  });
  container.insertAdjacentHTML("afterbegin", getArray.join(""));
}
