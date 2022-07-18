require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json())
app.use(cors())

const Movie = require('./models/movie');;

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/movies/:id', (request, response, next) => {
    Movie.findById(request.params.id).then(movie => {
            if (movie) {
                response.json(movie)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error));
})

app.post('/api/movies', (request, response) => {
    const body = request.body

    if (body.Title === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const movie = new Movie({
        Title: body.Title,
        Actor: body.Actor,
        Director: body.Director,
        Poster: body.Poster
    })

    movie.save().then(savedMovie => {
        response.json(savedMovie)
    })
})
app.get('/api/movies', (request, response) => {
    Movie.find({}).then(movies => {
        response.json(movies)
    })
})
app.delete('/api/movies/:id', (request, response, next) => {
    Movie.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error));
})
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})