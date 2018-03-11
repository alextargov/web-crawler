const {
    domParser,
} = require('../parser/dom-parser');

const {
    addEntry,
} = require('../db-operations');

const {
    validateImdb,
    validateTmdb,
    validateTmdbCast,
} = require('./validators');

const extractMovieImdb = (mainDomain, movieUrl) => {
    return new Promise((resolve, reject) => {
        const url = mainDomain + movieUrl;
        domParser(url).then(($) => {
            const titleSelector = '.title_wrapper h1';
            const ratingSelector = '.ratingValue';
            const runtimeSelector = '#titleDetails .txt-block time';
            const genresSelector = '#titleStoryLine .see-more.inline.canwrap a';
            const directorSelector =
                '#main_top .plot_summary .credit_summary_item';
            const languageSelector = '#titleDetails .txt-block';
            const revenueSelector = '#titleDetails .txt-block';

            const selectors = {
                titleSelector,
                ratingSelector,
                runtimeSelector,
                genresSelector,
                directorSelector,
                languageSelector,
                revenueSelector,
            };
            const validatedData = validateImdb($, selectors);
            validatedData.provider = 'IMDB';
            addEntry(validatedData);
            resolve(validatedData);
        });
    });
};

const extractMovieTmdb = (mainDomain, movieUrl) => {
    return new Promise((resolve, reject) => {
        const url = mainDomain + movieUrl;
        domParser(url).then(($) => {
            const titleSelector = '.title h2';
            const ratingSelector = '.user_score_chart';
            const runtimeSelector = '.facts > p';
            const languageSelector = '.facts > p';
            const revenueSelector = '.facts > p';
            const genresSelector = '.genres li a';

            const selectors = {
                titleSelector,
                ratingSelector,
                runtimeSelector,
                genresSelector,
                languageSelector,
                revenueSelector,
            };
            const validatedData = validateTmdb($, selectors);

            domParser(url + '/cast').then(($) => {
                const directorSelector =
                    '.content_wrapper .split:nth-child(2) .crew_wrapper';
                const validateDirector = validateTmdbCast($, directorSelector);
                validatedData.directors = validateDirector;
                validatedData.provider = 'TMDB';
                addEntry(validatedData);
                resolve(validatedData);
            });
        });
    });
};

module.exports = {
    extractMovieImdb,
    extractMovieTmdb,
};
