import axios from 'axios';

export default function MovieService() {
    const promise = axios.get('http://localhost:3001/api/movies')
    console.log(promise)
    return { promise }
}