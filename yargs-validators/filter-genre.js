/* globals process */
const {
    filterGenre,
} = require('../db-operations');

const filterGenreYargs = (args) => {
    let result;
    if (args.name) {
        result = filterGenre(args.name);
    } else {
        console.log('Not valid option');
        process.exit();
    }

    return result;
};

module.exports = {
    filterGenreYargs,
};
