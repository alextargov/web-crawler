const {
    filterGenre,
} = require('./filter-genre');
const {
    filterRuntime,
} = require('./filter-runtime');
const {
    filterRating,
} = require('./filter-rating');
const {
    filterLanguage,
} = require('./filter-language');
const {
    searchMovie,
    searchDirector,
} = require('./search');
const {
    deleteEntries,
} = require('./delete');
const {
    initialInsert,
} = require('./initial-insert');
const {
    addEntry,
} = require('./inserts');
const {
    getAllInfo,
} = require('./get-all-info');

module.exports = {
    getAllInfo,
    filterGenre,
    filterRuntime,
    filterRating,
    filterLanguage,
    searchMovie,
    searchDirector,
    deleteEntries,
    initialInsert,
    addEntry,
};
