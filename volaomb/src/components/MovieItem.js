import React from 'react';

const MovieItem = ({ movie,onSelecteMovie }) => {
    return (
        <div className='col-lg-3 col-sm-6'>
            <div className="card ms-1" style={{ width: '18rem' }}>
                <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                <div className="card-body">
                    <h5 className="card-title">{movie.Title}</h5>
                </div>
                <div className="card-footer">
                    <button onClick={()=>{onSelecteMovie(movie)}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">VIEW DETAIL</button>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;