const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://lucio:${password}@cluster0.ufmveac.mongodb.net/movieApp?retryWrites=true&w=majority`

const movieSchema = new mongoose.Schema({
    Title: String,
    Actor: String,
    Director: String,
})

const Movie = mongoose.model('MovieApp', movieSchema)

mongoose
    .connect(url)
    // .then((result) => {
    //     console.log('connected')

//     const movie = new Movie({
//         Title: 'Allenatore nel pallone',
//         Actor: 'Lino Banfi, Licinia Lentini, Camillo Milli',
//         Director: 'Sergio Martino',
//     })

//     return movie.save()
// })
// .then(() => {
//     console.log('movie saved!')
//     return mongoose.connection.close()
// })
// .catch((err) => console.log(err));
Movie.find({}).then(result => {
    result.forEach(movie => {
        console.log(movie)
    })
    mongoose.connection.close()
})