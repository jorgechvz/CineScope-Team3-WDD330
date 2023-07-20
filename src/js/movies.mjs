import {
  getMoviesByCategory,
  getPagesMoviesByCategory,
} from "./externalServices.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
const currentPage = getParam("page");

export function movies() {
  getMoviesByCategory(currentPage, category)
    .then((movies) => {
      displayMovies(movies);
    })
    .catch((error) => console.error(error));
}

function displayMovies(movies) {
  const container = document.querySelector(".movie-list");
  container.innerHTML = "";
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
  displayPagination();
}

function displayPagination() {
  const paginationContainer = document.querySelector(".pagination");
  const previousButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  let convertCurrentPage = parseInt(currentPage);
  getPagesMoviesByCategory(category)
    .then((page) => {
      if (convertCurrentPage > 1) {
        convertCurrentPage--;
        previousButton.setAttribute(
          "href",
          `/list_movies/index.html?category=${category}&page=${
            parseInt(currentPage) - 1
          }`
        );
      }
      if (convertCurrentPage < page) {
        convertCurrentPage++;
        nextButton.setAttribute(
          "href",
          `/list_movies/index.html?category=${category}&page=${
            parseInt(currentPage) + 1
          }`
        );
      }

      const currentPageElement = document.createElement("span");
      currentPageElement.textContent = `${currentPage}`;
      paginationContainer.innerHTML = "";
      paginationContainer.appendChild(previousButton);
      paginationContainer.appendChild(currentPageElement);
      paginationContainer.appendChild(nextButton);
    })
    .catch((error) => console.log(error));
}
