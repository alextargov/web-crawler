/* globals process */
const {
    filterLanguage,
} = require('../db-operations');

const filterLanguageYargs = (args) => {
    let result;

    if (args.name) {
        result = filterLanguage(args.name);
    } else {
        console.log('Not valid option');
        process.exit();
    }

    return result;
};

module.exports = {
    filterLanguageYargs,
};
