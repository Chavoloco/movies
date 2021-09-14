import {FETCH_MOVIES, FETCH_MOVIES_LOADING} from '../../actionTypes'
// import nowPlayingMovies from '../mocks/topTatedMovies'
import * as movieService from '../components/MovieLibrary.service'

export const fetchNowPlayingMovies =() => async (dispatch) => {

  dispatch({ type : FETCH_MOVIES_LOADING })
  const results = await Promise.all([
    movieService.getNowPlayingMovies(1),
    movieService.getNowPlayingMovies(2),
    movieService.getNowPlayingMovies(3)
  ])
  const movies =   []
  results.forEach((res) =>{
    movies.push(...res.results)
  })
  dispatch({
    type: FETCH_MOVIES,
    payload: { movies }
  })

}
