import { getMoviesByCategory, getPagesMoviesByCategory } from "./externalServices.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
let currentPage = 1;
let totalPages = 0; // Total number of pages

export function movies() {
  // Fetch the total number of pages before fetching the movies
  getPagesMoviesByCategory(category)
    .then((pages) => {
      totalPages = pages;
      fetchMovies();
    })
    .catch((error) => console.error(error));
}

function fetchMovies() {
  getMoviesByCategory(currentPage, category)
    .then((movies) => {
      console.log(movies);
      displayMovies(movies);
      displayPagination();
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
}

function displayPagination() {
  const paginationContainer = document.querySelector(".pagination");

  const previousButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");


  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      previousButton.setAttribute(
        "href",
        `/list_movies/index.html?category=${category}&page=${currentPage}`
      );
      fetchMovies();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      nextButton.setAttribute(
        "href",
        `/list_movies/index.html?category=${category}&page=${currentPage}`
      );
      fetchMovies();
    }
  });

  const currentPageElement = document.createElement("span");
  currentPageElement.textContent = `${currentPage} ... ${totalPages}`;

  // Clear pagination container before adding buttons
  paginationContainer.innerHTML = "";
  paginationContainer.appendChild(previousButton);
  paginationContainer.appendChild(currentPageElement);
  paginationContainer.appendChild(nextButton);
}