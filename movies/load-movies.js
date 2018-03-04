const {
    extractMovie,
} = require('./extract-movie');

const movies = [];
const loadMovie = async (mainDomain, array) => {
    if (array.length === 0) {
        return Promise.resolve();
    }

    const id = array.pop();
    const movie = await extractMovie(mainDomain, id);

    movies.push(movie);
    return loadMovie(mainDomain, array);
};

const loadMovies = (mainDomain, array) => {
    const parallels = 100;
    return Promise.all(
        Array.from({
            length: parallels,
        })
        .map(() => loadMovie(mainDomain, array)));
};

module.exports = {
    loadMovies,
    movies,
};
