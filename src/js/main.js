const baseToken = import.meta.env.VITE_AUTHORIZATION_TOKEN;
const baseURL = import.meta.env.VITE_SERVER_URL;

async function getAllMovies(pages) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };
  return await fetch(
    `${baseURL}discover/movie?include_adult=false&include_video=false&language=en-US&page=${pages}&sort_by=popularity.desc`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((err) => console.error(err));
}

function movies() {
  getAllMovies(4)
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
        <p>${movie.title}</p>
        <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${movie. backdrop_path}">
    </div>
        `;
    });
    container.insertAdjacentHTML("afterbegin", getArray.join(''));;
}

movies();
