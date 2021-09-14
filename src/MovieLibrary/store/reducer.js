import {FETCH_MOVIES, FETCH_MOVIES_LOADING} from '../../actionTypes'

const initialState = {
  movies: [],
  lastPageLoaded: 1,
  isLoading: false,
}

export default function movies(state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    
    case FETCH_MOVIES_LOADING:
      return{
        ...state,
        isLoading : true
      }

    case FETCH_MOVIES:
      return {
        ...state,
        lastPageLoaded: 3,
        ...payload,
        isLoading: false
      }

    default:
      return state
  }
}
