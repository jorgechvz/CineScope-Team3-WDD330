import { mainMovie } from "./main.mjs"
import { getAccount, logout } from "./authenticate.mjs";


document.querySelector(".logout-btn").addEventListener("click", (e) => {
    e.preventDefault();
    logout();
});


mainMovie();


// const movieId = "19404";
// const selectorHoverDetail = ".movie-detail";
// const selectorMainCast = ".movie-cast";
// const selectorRecommendation = ".recommendation-movies"

// movieDetail(movieId, selectorHoverDetail)

// getTrailer(movieId)

// movieCredits(movieId, selectorMainCast)

// movieRecommendations(movieId, selectorRecommendation)
