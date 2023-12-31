import { getTrailer, movieCredits, movieDetail, movieRecommendations } from "./movieDetail.mjs";
import { btnLoginLogout, getParam, loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();
btnLoginLogout();

const movieId = getParam("movie");
const selectorHoverDetail = ".movie-detail";
const selectorMainCast = ".movie-cast";
const selectorRecommendation = ".recommendation-movies"


movieDetail(movieId, selectorHoverDetail)

getTrailer(movieId)

movieCredits(movieId, selectorMainCast)

movieRecommendations(movieId, selectorRecommendation)

