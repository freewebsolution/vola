import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../services/AuthUser';
import axios from 'axios';
import MyMovie from './MyMovie';
const Dashboard = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        console.log('effect');
        axios
            .get('http://localhost:3001/api/movies')
            .then(res => {
                console.log('promise fulfilled')
                setMovies(res.data)
            })
    }, [])
    const { user } = AuthUser();
    return (
        <div className='content'>
            <h1 className='title'><i className="fa-solid fa-film" style={{ color: "green" }}></i> Dashboard</h1>
            <h2 className='quote'>
                La Dashboard di {user.name}<Link to={`/edit/${user.id}`}><span className='ms-2'>Edit</span></Link>
            </h2>
            <p>Email: {user.email}</p>
            <h4>My favorites Movie:</h4>
            {movies.map(movie => <MyMovie key={movie.id} movie={movie} />)}
        </div>

    );
};

export default Dashboard;