import { getTrailer, movieDetail } from "./movieDetail.mjs";
import { getParam } from "./utils.mjs";



const movieId = getParam("movie");
const selector = ".movie-detail"

movieDetail(movieId, selector)

getTrailer(movieId)