const {
    domParser,
} = require('../parser/dom-parser');

const availableGenres = [
    'action', 'comedy', 'family',
    'history', 'mystery', 'sci-fi',
    'war', 'adventure', 'crime',
    'fantasy', 'horror', 'news',
    'sport', 'western', 'animation',
    'documentary', 'film-noir', 'music',
    'reality-tv', 'talk-show', 'biography',
    'drama', 'game-show', 'musical',
    'romance', 'thriller',
];

/* eslint-disable */
const genres = new Set([...availableGenres]);
/* eslint-enable */

const extractMovieImdb = (mainDomain, movieUrl) => {
    return new Promise((resolve, reject) => {
        const url = mainDomain + movieUrl;
        domParser(url).then(($) => {
            const titleSelector = '.title_wrapper h1';
            const ratingSelector = '.ratingValue';
            const runtimeSelector = '#titleDetails .txt-block time';
            const genresSelector = '#titleStoryLine .see-more.inline.canwrap a';
            const movieGenres = $(genresSelector).text()
                .split(' ')
                .filter((element) => genres.has(element.toLowerCase()))
                .map((element) => element.toLowerCase().trim());
            const obj = {
                title: $(titleSelector).text().trim(),
                rating: $(ratingSelector).attr('itemprop', 'ratingValue')
                    .text(),
                runtime: $(runtimeSelector).text(),
                movieGenres,
            };

            resolve(obj);
        });
    });
};

const extractMovieTmdb = (mainDomain, movieUrl) => {
    return new Promise((resolve, reject) => {
        const url = mainDomain + movieUrl;
        domParser(url).then(($) => {
            const titleSelector = '.title h2';
            const ratingSelector = '.user_score_chart';
            const runtimeSelector = '.facts p:nth-child(9)';
            const genresSelector = '.genres li a';

            let movieGenres = [];
            $(genresSelector).each((_, el) => {
                movieGenres.push(el.innerHTML.toLowerCase());
            });
            movieGenres = movieGenres
                .filter((element) => genres.has(element.toLowerCase().trim()));
            const obj = {
                title: $(titleSelector).html(),
                rating: $(ratingSelector).attr('data-percent'),
                runtime: $(runtimeSelector).text(),
                movieGenres,
            };

            resolve(obj);
        });
    });
};

module.exports = {
    extractMovieImdb,
    extractMovieTmdb,
};
