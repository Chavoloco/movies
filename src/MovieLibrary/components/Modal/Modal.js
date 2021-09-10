import React, { useState } from 'react';
import './Modal.css'
import TMDBImage from '../TMDBImage';

const Modal = ({movie:{poster_path, title, original_title, vote_average, vote_count, overview}, closeModal}) => {

    return ( 
        <div className="modal is-open"> 
            <div className="modal-container">
                <button className="modal-close" onClick={closeModal}>X</button>
                <TMDBImage src={poster_path} className="poster" />
                <div className="description">
                  <h2>{title}({original_title})</h2>
                  <div><h4>Rank(votes count) : <span>{vote_average}({vote_count})</span></h4></div>
                  <span>{overview}</span>
                </div>
            </div>
        </div>
     );
}
 
export default Modal;