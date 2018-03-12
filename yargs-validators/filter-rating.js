/* globals process */
const {
    filterRating,
} = require('../db-operations');

const filterRatingYargs = (args) => {
    let result;

    if (args.gt) {
        result = filterRating('greater', args.gt);
    } else if (args.lt) {
        result = filterRating('lower', args.lt);
    } else if (args.eq) {
        result = filterRating('equals', args.eq);
    } else {
        console.log('Not valid option');
        process.exit();
    }

    return result;
};

module.exports = {
    filterRatingYargs,
};
