import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import TMDBImage from './TMDBImage'
import './MoviesList.css'
import Modal  from './Modal/Modal'

export default class MoviesList extends PureComponent {

  static propTypes = {
    movies: PropTypes.array.isRequired
  }

  state = {
    selectedMovie: null,
    movies: this.props.movies,
    page: this.props.page
  }

  handleSelectMovie = (item) =>{
    this.setState({selectedMovie: item})
  }

  closeModal = () =>{
    this.setState({selectedMovie: null})
  } 

  handleSortingChange = (sortingType) =>{

    let sortedList = [...this.props.movies]

    if (sortingType === "") {
      this.setState({movies: sortedList})
      console.log(sortingType);
      return
    }
    this.sort(sortingType, sortedList)
    this.setState({movies : sortedList})
  }

  sort = (sortingType, sortedList) =>{

    switch (sortingType) {
  
      case "name_asc":
        sortedList.sort((a, b) =>(a.title > b.title ? 1 : a.title < b.title ? -1 : 0))
        this.setState({ movies : sortedList })
        console.log(sortingType);
        break
        
      case "name_desc":
        sortedList.sort((a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0))
        this.setState({movies:sortedList})
        console.log(sortingType);
        break
        
      case "rating":
        sortedList.sort((a, b) => (a.vote_average > b.vote_average ? -1 : a.vote_average < b.vote_average ? 1 : 0))
        this.setState({movies:sortedList})
        console.log(sortingType);
        break
        
      default:
        break
  }
  }
  
  render() {
    
    // const {movies} = this.props
    const {selectedMovie} = this.state

    return (
      <div className="movies-list">
          <div className="sorter">
            <span>Sort by:</span>
            <SortingOptions onChange={this.handleSortingChange}/>
          </div>
        <div className="items">
          {
            this.state.movies.map(movie =>
              <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie===movie} 
              onSelect={this.handleSelectMovie} />
            )
          }
        </div>
          {
            selectedMovie && (
                <Modal movie={selectedMovie} closeModal={this.closeModal}/>
              )
          }
      </div>
    )
  }
}

class MovieListItem extends Component {

  
  handleClick = () => {
    const {movie, onSelect} = this.props
    onSelect(movie)
  }

  render() {
    const {movie: {title, vote_average, poster_path}, isSelected} = this.props
    return (
      <div className={classNames('movie-list-item', {'selected': isSelected})} onClick={this.handleClick}>
        {title}({vote_average})
        <TMDBImage src={poster_path} className="poster" />
      </div>
    )
  }
}

class SortingOptions extends Component {

  state = {
    value: ''
  }

  handleChange = e => {
    const selectedValue = e.target.value
    const {onChange} = this.props
    this.setState({value: selectedValue})
    onChange(selectedValue)
  }

  render() {

    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value=""></option>
        <option value="name_asc">A - Z</option>
        <option value="name_desc">Z - A</option>
        <option value="rating">Rating</option>
      </select>
    )
  }
}
