import { getTrailer, movieCredits, movieDetail, movieRecommendations } from "./movieDetail.mjs";
import { getParam } from "./utils.mjs";

const movieId = getParam("movie");
const selectorHoverDetail = ".movie-detail";
const selectorMainCast = ".movie-cast";
const selectorRecommendation = ".recommendation-movies"


movieDetail(movieId, selectorHoverDetail)

getTrailer(movieId)

movieCredits(movieId, selectorMainCast)

movieRecommendations(movieId, selectorRecommendation)
/* setTimeout(() => {
    document.querySelector(".add-favorite").addEventListener("click", (e) => {
        const getFavorite = e.target;
        const getMovieId = getFavorite.dataset.id;
        favoriteMovie(getMovieId);
    })
}, 100) */