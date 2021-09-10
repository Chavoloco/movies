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
    selectedMovie: null
  }

  handleSelectMovie = (item) =>{
    this.setState({selectedMovie: item})
  }

  closeModal = () =>{
    this.setState({selectedMovie: null})
  } 

  handleSortingChange = sortingType => console.log(sortingType)

  
  render() {
    
    const {movies} = this.props
    const {selectedMovie} = this.state

    return (
      <div className="movies-list">
          <div className="sorter">
            <span>Sort by:</span>
            <SortingOptions onChange={this.handleSortingChange}/>
          </div>
        <div className="items">
          {
            movies.map(movie =>
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
