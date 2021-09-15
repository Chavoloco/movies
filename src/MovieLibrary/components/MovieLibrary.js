import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchNowPlayingMovies, fetchMoreMovies} from '../store/actions'


import logo from './logo.svg'
import './MovieLibrary.css'
import {getMovies, getMoviesIsLoading, getAllMoviesIsLoaded} from '../store/selectors'
import MoviesList from './MoviesList'

class MovieLibrary extends Component {

  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  getScrollDownPercentage = (window) => {
    const pageHeight = window.document.documentElement.scrollHeight;
    const clientHeight = window.document.documentElement.clientHeight;
    const scrollPos = window.pageYOffset;
    const currentPosition = scrollPos + clientHeight;
    const percentageScrolled = currentPosition / pageHeight;
    return percentageScrolled;
  }

  componentDidMount() {
    const {fetchNowPlayingMovies} = this.props
    fetchNowPlayingMovies()
    window.addEventListener('scroll', this.handleScroll)
  }

  // componentWillUnmount(){
  //   window.removeEventListener('scroll', this.handleScroll)
  // }

  handleScroll(){
    const {fetchMoreMovies, isLoading, allMoviesIsLoaded} = this.props
    if (allMoviesIsLoaded) {
      window.removeEventListener('scroll', this.handleScroll)
      return
    }
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
      fetchMoreMovies();
  }


  render() {
    const {movies, isLoading} = this.props
    return (
      <div className="MovieLibrary">
        <header className="ML-header">
          <img src={logo} className="ML-logo" alt="logo" />
          <h1 className="ML-title">Movies</h1>
        </header>
        <div className="ML-intro">
          { movies.length && <MoviesList movies={movies} /> }
          
        </div>
          <div className="ML-loader">
            {isLoading && "Loading.."}
          </div>
      </div>
    );
  }
}

export default connect(state => ({
  movies: getMovies(state),
  isloading: getMoviesIsLoading(state),
  allMoviesIsLoaded: getAllMoviesIsLoaded(state)
}), { fetchNowPlayingMovies, fetchMoreMovies })(MovieLibrary)
