import {
  FETCH_MOVIES,
  FETCH_MOVIES_LOADING,
  FETCH_MORE_MOVIES,
} from "../../actionTypes";
// import nowPlayingMovies from '../mocks/topTatedMovies'
import { getLastPagesLoaded, getAllMoviesIsLoaded } from "./selectors";
import * as movieService from "../components/MovieLibrary.service";

export const fetchNowPlayingMovies = () => async (dispatch) => {
  dispatch({ type: FETCH_MOVIES_LOADING });
  const results = await Promise.all([
    movieService.getNowPlayingMovies(1),
    movieService.getNowPlayingMovies(2),
    movieService.getNowPlayingMovies(3),
  ]);
  const movies = [];
  results.forEach((res) => {
    movies.push(...res.results);
  });
  dispatch({
    type: FETCH_MOVIES,
    payload: { movies },
  });
};

export const fetchMoreMovies = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_MOVIES_LOADING,
  });
  if (getAllMoviesIsLoaded(getState())) return;
  const nextPage = getLastPagesLoaded(getState());
  const data = await movieService.getNowPlayingMovies(nextPage);
  dispatch({
    type: FETCH_MORE_MOVIES,
    payload: data.results,
  });
};
