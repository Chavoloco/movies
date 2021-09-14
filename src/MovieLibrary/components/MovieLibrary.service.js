const MOVIE_DB_API_KEY = '54ffed57deb5a7a8688be4de3007e578'
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';

//https://api.themoviedb.org/3/movie/top_rated?api_key=54ffed57deb5a7a8688be4de3007e578&language=en-US&page=3

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
  if (queryParams) {
    Object.keys(queryParams)
      .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
  }
  return baseUrl;
}

export const  getNowPlayingMovies = async (page = 1) => {
  const fullUrl = createMovieDbUrl('/movie/now_playing', {page});
  return fetch(fullUrl, {
      method: 'GET'
  }).then((response) => {return response.json()})
}
