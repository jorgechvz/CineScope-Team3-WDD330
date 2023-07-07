const baseToken = import.meta.env.VITE_AUTHORIZATION_TOKEN;
const baseURL = import.meta.env.VITE_SERVER_URL;

/* All Get Movies */
export async function getMovies(page) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };
  
  return await fetch(
    `${baseURL}movie/popular?language=en-US&page=${page}`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((err) => console.error(err));
}

export async function getMovieByNowPlaying() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };

  return await fetch(
    `${baseURL}movie/now_playing?language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((err) => console.error(err));
}

export async function getMovieByTopRated() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };

  return await fetch(`${baseURL}movie/top_rated?language=en-US&page=1`, options)
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((err) => console.error(err));
}

export async function getMovieByUpcoming() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };

  return await fetch(`${baseURL}movie/upcoming?language=en-US&page=1`, options)
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((err) => console.error(err));
}



/* Account Information */

export async function getDetailsAccount(sessionId) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };
  return await fetch(`${baseURL}account/account_id?session_id=${sessionId}`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export async function getFavoriteMovie(page = 1, sessionId) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${baseToken}`,
      },
    };
  
    return await fetch(
      `${baseURL}account/account_id/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc&?session_id=${sessionId}`,
      options
    )
      .then((response) => response.json())
      .then((response) => response.results)
      .catch((err) => console.error(err));
  }

export async function getWatchlistMovie(page = 1, sessionId) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };

  return await fetch(
    `${baseURL}account/account_id/watchlist/movies?language=en-US&page=${page}&sort_by=created_at.asc&?session_id=${sessionId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((err) => console.error(err));
}

export async function addFavoriteMovie(movie_id, sessionId) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movie_id,
      favorite: true,
    }),
  };

  return await fetch(`${baseURL}account/account_id/favorite??session_id=${sessionId}`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export async function addWatchlistMovie(movie_id, sessionId) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movie_id,
      watchlist: true,
    }),
  };

  return await fetch(`${baseURL}account/account_id/watchlist??session_id=${sessionId}`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

/* Login */

export async function getRequestToken() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };

  return await fetch(`${baseURL}authentication/token/new`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export async function createSession(requestToken) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
    body: JSON.stringify({ request_token: `${requestToken}` }),
  };

  return await fetch(`${baseURL}authentication/session/new`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export async function logoutSession(session_id) {
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
    body: JSON.stringify({ session_id: `${session_id}` }),
  };

  return await fetch(`${baseURL}authentication/session`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export async function loginSession(creds) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
    body: JSON.stringify(creds),
  };

  return await fetch(
    `${baseURL}authentication/token/validate_with_login`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

/* Movie Details */

export async function getMovieById(movieId) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${baseToken}`,
      },
    };
  
    return await fetch(`${baseURL}movie/${movieId}?language=en-US`, options)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }

export async function getMovieCredits(movie_id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };

  return await fetch(`${baseURL}movie/${movie_id}/credits?language=en-US`, options)
    .then((response) => response.json())
    .then((response) => response.cast)
    .catch((err) => console.error(err));
}

export async function getMovieTrailer(movie_id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };

  return await fetch(`${baseURL}movie/${movie_id}/videos?language=en-US`, options)
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((err) => console.error(err));
}

export async function getRecommendations(movie_id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${baseToken}`,
    },
  };

  return await fetch(`${baseURL}movie/${movie_id}/recommendations?language=en-US&page=1`, options)
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((err) => console.error(err));
}
