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
            const directorSelector =
                '#main_top .plot_summary .credit_summary_item';
            const languageSelector = '#titleDetails .txt-block';
            const revenueSelector = '#titleDetails .txt-block';

            let directors = [];
            let language;
            let revenue;

            $(directorSelector).first().find('.itemprop').each((index, el) => {
                directors.push($(el).text());
            });
            if (directors.length === 0) {
                directors = 'n/a';
            }
            if ($($(languageSelector).get(2)).find('a')
                .text().trim().length < 3) {
                language = 'n/a';
            } else {
                if ($($(languageSelector).get(2)).find('h4').text()
                    .trim().indexOf('Language') === -1) {
                    language = 'n/a';
                } else {
                    language = $($(languageSelector).get(2))
                        .text()
                        .trim()
                        .slice(9)
                        .split('|').map((e) => e.trim());
                }
            }
            if ($($(revenueSelector).get(9)).text().slice(28).length < 4) {
                revenue = 'n/a';
            } else {
                revenue = $($(revenueSelector).get(9))
                    .text()
                    .trim()
                    .slice(27)
                    .split(' ')[0];
            }
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
                directors,
                language,
                revenue,
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
            const runtimeSelector = '.facts > p';
            const languageSelector = '.facts > p';
            const revenueSelector = '.facts > p';
            const genresSelector = '.genres li a';

            let revenue;
            let runtime;
            let language;
            let movieGenres = [];

            $(genresSelector).each((_, el) => {
                movieGenres.push(el.innerHTML.toLowerCase());
            });
            movieGenres = movieGenres
                .filter((element) => genres.has(element.toLowerCase().trim()));

            if ($($(runtimeSelector).get(3)).text().indexOf('Runtime') === -1) {
                runtime = 'n/a';
            } else {
                if ($($(runtimeSelector).get(3)).text().match(/\d+/g)) {
                    runtime = $($(runtimeSelector).get(3)).text()
                        .slice(7)
                        .match(/\d+/g)
                        .map(Number);
                    runtime = runtime[0]*60 + runtime[1];
                } else {
                    runtime = 'n/a';
                }
            }
            if ($($(languageSelector).get(2)).text().slice(16).length < 4) {
                language = 'n/a';
            } else {
                language = $($(languageSelector).get(2))
                    .text()
                    .trim()
                    .slice(18);
            }

            if ($($(revenueSelector).get(5)).text().slice(8).length < 4) {
                revenue = 'n/a';
            } else {
                revenue = $($(revenueSelector).get(5))
                    .text()
                    .trim()
                    .slice(8);
            }

            const obj = {
                title: $(titleSelector).html(),
                rating: $(ratingSelector).attr('data-percent'),
                runtime,
                movieGenres,
                language,
                revenue,
            };

            domParser(url + '/cast').then(($) => {
                let directors = [];
                const directorsDiv =
                    $('.content_wrapper .split:nth-child(2) .crew_wrapper')
                        .filter((index, value) => {
                        return $('h4',
                            $('.content_wrapper .split:nth-child(2)'
                            +'.crew_wrapper')[index])
                            .text()
                            .indexOf('Directing') === 0;
                });
                directorsDiv.find('.info a').each((index, value) => {
                    directors.push($(value).text().trim());
                });

                if (directors.length === 0) {
                    directors = 'n/a';
                }
                obj.directors = directors;
            });

            resolve(obj);
        });
    });
};

module.exports = {
    extractMovieImdb,
    extractMovieTmdb,
};
