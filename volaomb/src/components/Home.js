import React, { useEffect, useState } from 'react';
import AuthUser from '../services/AuthUser';
import MovieDetail from './MovieDetail';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import { fetchMovies, fetchMoviesById } from '../utils';

const Home = () => {
    const { getToken } = AuthUser();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const selectMovie = async (movie) => {
        setSelectedMovie(movie);
        const newMovie = await fetchMoviesById(movie.imdbID);
        if (newMovie.Error) {
            setError(newMovie.Error);
            setSelectedMovie(null);
        } else {
            setSelectedMovie(newMovie);
        }

    }

    const callApi = async (search = '') => {
        const data = await fetchMovies(search);
        setError(data.Error);
        if (!data.Error.length) {
            setMovies(data.movies);
            setSelectedMovie(data.movies[0]);
            setTotalCount(data.totalCount);
        } else {
            setTotalCount(0);
            setMovies([]);
        }

    }
    useEffect(() => {

        callApi('Godfather');
        return () => {

        }
    }, []);
    if (!getToken()) {
        return (
            <div className='content'>
                <h1 className='title'><i className="fa-solid fa-film" style={{ color: "green" }}></i> Movie Home</h1>
                <h2 className='quote'>La tua App Movie</h2>
                <p className='quote'>Registrati o fai login per accedere alla lista dei tuoi movies!! </p>
            </div>
        );
    }
    return (
        <div className='content'>
            <h1 className='title'><i className="fa-solid fa-film" style={{ color: "green" }}></i> Movie Home</h1>
            <h2 className='quote'>La tua App Movie</h2>
            <SearchBar onSearchChange={callApi} />
            {
                !error ? <MovieList movies={movies} onSelecteMovie={selectMovie} totalCount={totalCount} /> : <h2><i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i> {error}</h2>
            }
            <MovieDetail movie={selectedMovie} />
        </div>
    )
};

export default Home;