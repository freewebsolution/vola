/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/movies';

const getAll =()=>{
    return axios.get(baseUrl);
}

const create = movieObject => {
    return axios.post(baseUrl, movieObject);
}
 const MovieService = () => {
    const promise = axios.get('http://localhost:3001/api/movies')
    console.log(promise)
    return { promise }
}
const deleteMovie = id => {
return axios.delete(`${baseUrl}/${id}`)
}
export default {
    getAll,
    create,
    MovieService,
    deleteMovie
}