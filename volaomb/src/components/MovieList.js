import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({movies, totalCount, onSelecteMovie}) => {
    return (
        <div>
            <p>La tua ricerca ha prodotto <b>{totalCount}</b> risultati</p>
            <div className='row d-flex justify-content-center'>
                {movies.map(movie => <MovieItem key={movie.imdbID} onSelecteMovie = {onSelecteMovie} movie={movie}/>)}
            </div> 
        </div>
    );
};

export default MovieList;