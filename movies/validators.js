const allGenres = require('../resources/genres.js');

/* eslint-disable */
const availableGenres = new Set([...allGenres.genres]);
/* eslint-enable */
const validateImdb = ($, selectors) => {
    let directors = [];
    let languages;
    let runtime;
    let revenue;
    $(selectors.directorSelector).first()
        .find('.itemprop')
        .each((index, el) => {
            directors.push($(el).text());
        });
    if (directors.length === 0) {
        directors = null;
    }
    if ($($(selectors.languageSelector).get(2)).find('a')
        .text().trim().length < 3) {
        languages = [null];
    } else {
        if ($($(selectors.languageSelector).get(2)).find('h4').text()
            .trim().indexOf('Language') === -1) {
            languages = [null];
        } else {
            languages = $($(selectors.languageSelector).get(2))
                .text()
                .trim()
                .slice(9)
                .split('|').map((e) => e.trim());
        }
    }
    const revenueStartIndex = $(selectors.revenueSelector)
        .text()
        .lastIndexOf('$');
    if (revenueStartIndex === -1) {
        revenue = null;
    } else {
        revenue = $(selectors.revenueSelector)
            .text()
            .slice(revenueStartIndex, revenueStartIndex + 20)
            .trim()
            .match(/(\d+\,?)([^\s]+)/)[0]
            .replace(/,/g, '');
        revenue = +revenue;
    }
    const genres = $(selectors.genresSelector).text()
        .split(' ')
        .filter((element) => availableGenres.has(element.toLowerCase()))
        .map((element) => element.toLowerCase().trim());
    let rating = $(selectors.ratingSelector).attr('itemprop', 'ratingValue')
        .text()
        .trim()
        .slice(0, -3);
    if (rating.length === 0) {
        rating = null;
    }
    const title = $(selectors.titleSelector).text()
        .trim()
        .replace(/ *\([^)]*\) */g, '');
    runtime = $(selectors.runtimeSelector).text();

    if (runtime.length === 0) {
        runtime = null;
    } else {
        runtime = runtime.trim().match(/\d+/).toString();
    }

    return {
        title,
        rating,
        runtime,
        genres,
        directors,
        languages,
        revenue,
    };
};

const validateTmdb = ($, selectors) => {
    let revenue;
    let runtime;
    let languages;
    let genres = [];

    $(selectors.genresSelector).each((_, el) => {
        genres.push(el.innerHTML.toLowerCase());
    });
    genres = genres
        .filter((element) =>
            availableGenres.has(element.toLowerCase().trim()));

    if ($($(selectors.runtimeSelector).get(3))
        .text().indexOf('Runtime') === -1) {
        runtime = null;
    } else {
        if ($($(selectors.runtimeSelector).get(3)).text().match(/\d+/g)) {
            runtime = $($(selectors.runtimeSelector).get(3)).text()
                .slice(7)
                .match(/\d+/g)
                .map(Number);
            runtime = runtime[0] * 60 + runtime[1];
        } else {
            runtime = null;
        }
    }
    if ($($(selectors.languageSelector).get(2)).text().slice(16).length < 4) {
        languages = [null];
    } else {
        languages = $($(selectors.languageSelector).get(2))
            .text()
            .trim()
            .slice(18)
            .split(' ');
    }

    if ($($(selectors.revenueSelector).get(5)).text().slice(8).length < 4) {
        revenue = null;
    } else {
        revenue = $($(selectors.revenueSelector).get(5))
            .text()
            .trim()
            .slice(8)
            .replace(/,/g, '')
            .split('.')[0]
            .slice(1);
        revenue = +revenue;
    }
    const title = $(selectors.titleSelector).html();
    let rating = +($(selectors.ratingSelector).attr('data-percent')) / 10;
    rating = rating.toString();

    return {
        title,
        rating,
        runtime,
        genres,
        languages,
        revenue,
    };
};

const validateTmdbCast = ($, directorSelector) => {
    const directors = [];

    $(directorSelector).each((index, value) => {
        const el = $(value).find('h4');
        if (el.text().trim().includes('Directing')) {
            const wrapperElement = el.next();
            wrapperElement.children().each((i, v) => {
                const res = $(v).find('.info p')
                    .clone()
                    .children()
                    .remove()
                    .end()
                    .text()
                    .trim();

                if (res === 'Director') {
                    const output = $(v).find('.info p a')
                        .text()
                        .trim();
                    directors.push(output);
                }
            });
            return false;
        }
        return true;
    });

    return directors;
};

module.exports = {
    validateImdb,
    validateTmdb,
    validateTmdbCast,
};
