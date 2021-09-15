import {FETCH_MOVIES, 
        FETCH_MOVIES_LOADING, 
        FETCH_MORE_MOVIES,
        PAGES_LOADED} from '../../actionTypes'
// import nowPlayingMovies from '../mocks/topTatedMovies'
import { getLastPagesLoaded, getAllMoviesIsLoaded } from './selectors'
import * as movieService from '../components/MovieLibrary.service'


const getPagesLoaded = (pages) => ({
  type: PAGES_LOADED,
  payload: pages,
})

const getIsLoading = (loading) => ({
  type: FETCH_MOVIES_LOADING,
  payload: loading
})

export const fetchNowPlayingMovies =() => async (dispatch) => {
  dispatch({ type : FETCH_MOVIES_LOADING })
  const results = await Promise.all([
    movieService.getNowPlayingMovies(1),
    movieService.getNowPlayingMovies(2),
    movieService.getNowPlayingMovies(3),
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

export const fetchMoreMovies =() => async (dispatch, getState) =>  {
  if (getAllMoviesIsLoaded(getState())) return
  const nextPage = getLastPagesLoaded(getState()) +1
  console.log(nextPage);
  dispatch({
    type: FETCH_MOVIES_LOADING
  })
  const {data} = await movieService.getNowPlayingMovies(nextPage)
  dispatch({
    type: FETCH_MORE_MOVIES,
    payload: data.results
  })
}
// const fetchMoreMovies = (movies) => ({
//   type: FETCH_MORE_MOVIES,
//   payload: {movies}
// })

// export function getMoreMovies(page) {
//   return(dispatch)=>{
//     dispatch(getIsLoading(true))
//     console.log(getIsLoading);
//     const nextPage = page +1
//     console.log(nextPage);

//     movieService.getNowPlayingMovies(nextPage).then((res) => {
//       dispatch(fetchMoreMovies(res.results))
//       dispatch(getIsLoading(false))
//       dispatch(getLastPagesLoaded(nextPage))
//     })
//   }
// }
