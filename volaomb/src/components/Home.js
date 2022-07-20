import React, { useEffect, useState } from 'react';
import AuthUser from '../services/AuthUser';
import MovieDetail from './MovieDetail';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import { fetchMovies, fetchMoviesById } from '../utils';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3002");

const Home = () => {
    const { getToken } = AuthUser();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [room, setRoom] = useState("");



    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room)
        }
    }

    const sendMessage = () => {
        socket.emit("send_message", { message, room});
    };
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message)
        })
    }, [])
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
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button onClick={joinRoom} className="btn btn-outline-warning">ROOM</button>
                </div>
                <input type="text" className="form-control me-3" placeholder="Room number..." onChange={(event) => {
                    setRoom(event.target.value)
                }} />
                <div className="input-group-prepend">
                    <button onClick={sendMessage} className="btn btn-outline-secondary">SEND</button>
                </div>
                <input type="text" className="form-control" placeholder="Message..." onChange={(event)=>{
                    setMessage(event.target.value)
                }} />
            </div>
            <h4>Message</h4>
            <p>{messageReceived}</p>
            <SearchBar onSearchChange={callApi} />
            {
                !error ? <MovieList movies={movies} onSelecteMovie={selectMovie} totalCount={totalCount} /> : <h2><i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i> {error}</h2>
            }
            <MovieDetail movie={selectedMovie} />
        </div>
    )
};

export default Home;