import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../services/AuthUser';
import movieService from '../services/MovieService';
import MyMovie from './MyMovie';
const Dashboard = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        movieService
            .getAll()
            .then(res => {
                console.log('promise fulfilled')
                setMovies(res.data)
            })
    }, [])

    const deleteMovieOf = (id, tema) => {
        const r = window.confirm(`Sicuro di voler eliminare il film ${tema} ? `)
        if (r === false) {
            return
        } else {
            movies.filter(n => n.id === id)
            movieService
                .deleteMovie(id)
                .then(() => {
                    setMovies(movies.filter(movie => movie.id !== id))
                })
        }
    }

    const { user } = AuthUser();
    return (
        <div className='content'>
            <h1 className='title'><i className="fa-solid fa-film" style={{ color: "green" }}></i> Dashboard</h1>
            <h2 className='quote'>
                La Dashboard di {user.name}<Link to={`/edit/${user.id}`}><span className='ms-2'>Edit</span></Link>
            </h2>
            <p>Email: {user.email}</p>
            <h4>My favorites Movie:</h4>
            {movies.length !== 0 ? movies.map(movie => <MyMovie key={movie.id} movie={movie} deleteMovie={() => deleteMovieOf(movie.id, movie.Title)} />) : <h4><i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i> Non hai titoli nei preferiti!</h4>}
        </div>

    );
};

export default Dashboard;