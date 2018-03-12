/* globals process */
const {
    searchDirector,
    searchMovie,
} = require('../db-operations');

const searchYargs = (args) => {
    let result;
    if (args.director) {
        result = searchDirector(args.director);
    } else if (args.movie) {
        result = searchMovie(args.movie);
    } else {
        console.log('Not valid option');
        process.exit();
    }

    return result;
};

module.exports = {
    searchYargs,
};
