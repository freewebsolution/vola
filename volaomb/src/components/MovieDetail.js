import React from 'react';

const MovieDetail = ({ movie,error }) => {
    const saveMovie =(movie) => {
        console.log(movie)
    }
    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{movie?.Title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <p><strong>Director:</strong> {movie?.Director}</p>
                            <p><strong>Actors:</strong> {movie?.Actors}</p>  
                            <p><strong>Year:</strong> {movie?.Year}</p>
                            <p><strong>Genre:</strong> {movie?.Genre}</p>
                            <p><strong>Country:</strong> {movie?.Country}</p>
                            <p><strong>Description:</strong> <br/> {movie?.Plot}</p>
                            <p>{error}</p> 
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={() => saveMovie(movie)} className="btn btn-success btn-sm" data-bs-dismiss="modal">Add you list</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;