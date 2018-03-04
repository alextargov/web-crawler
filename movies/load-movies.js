const {
    extractMovieImdb,
    extractMovieTmdb,
} = require('./extract-movie');

const moviesTmdb = [];
const moviesImdb = [];

const loadMoviesTmdb = async (mainDomain, array) => {
    const parallels = 50;

    const loadMovieTmdb = async () => {
        if (array.length === 0) {
            return Promise.resolve();
        }
        const id = array.pop();
        const movie = await extractMovieTmdb(mainDomain, id);
        moviesTmdb.push(movie);
        return loadMovieTmdb();
    };

    await Promise.all(
        Array.from({
            length: parallels,
        })
        .map(() => loadMovieTmdb(mainDomain, array)));
};

const loadMoviesImdb = async (mainDomain, array) => {
    const parallels = 100;

    const loadMovieImdb = async () => {
        if (array.length === 0) {
            return Promise.resolve();
        }
        const id = array.pop();
        const movie = await extractMovieImdb(mainDomain, id);
        moviesImdb.push(movie);
        return loadMovieImdb();
    };

    await Promise.all(
        Array.from({
            length: parallels,
        })
        .map(() => loadMovieImdb(mainDomain, array)));
};

module.exports = {
    loadMoviesImdb,
    loadMoviesTmdb,
    moviesImdb,
    moviesTmdb,
};
