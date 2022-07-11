const APIURL =process.env.REACT_APP_APIURL;
const APIKEY =process.env.REACT_APP_APIKEY;
const fetchMovies = async (search = 'The godfather') => {
    if (search.length < 3) {
        return;
    }
    const response = await fetch(APIURL + '?apiKey=' + APIKEY + '&s=' + search).then(res => res.json());
    const { Error, Search: movies, totalResults: totalCount } = response;
    console.log(response);
    return { movies, totalCount, Error: Error ?? '' }
}
const fetchMoviesById = async (movieId) => {

    const response = await fetch(APIURL + '?apiKey=' + APIKEY + '&i=' + movieId).then(res => res.json());
    return response;
}
export {
    fetchMovies,
    fetchMoviesById,
    APIKEY,
    APIURL
}