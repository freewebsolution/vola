import React from 'react';

const MyMovie = ({ movie }) => {
    return (
        <div className='col-lg-3 col-sm-6 float-start'>
            <div className="card ms-1" style={{ width: '18rem' }}>
                <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                <div className="card-body">
                    <h4 className="card-title">{movie.Title}</h4>
                    <h6 className="card-title">
                        Actors: {movie.Actor}<br/><br/>
                        Director: {movie.Director}
                    </h6>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">DELETE</button>
                </div>
            </div>
        </div>
    );
};

export default MyMovie;