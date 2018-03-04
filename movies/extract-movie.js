const {
    domParser,
} = require('../parser/dom-parser');

const extractMovie = (mainDomain, movieUrl) => {
    return new Promise((resolve, reject) => {
        const url = mainDomain + movieUrl;
        domParser(url).then(($) => {
            const titleSelector = '.title_wrapper h1';
            const ratingSelector = '.ratingValue';
            const runtimeSelector = '#titleDetails .txt-block time';
            const genresSelector = 'div#titleStoryLine .see-more a';
            // console.log($(genresSelector).attr('href'))
            const obj = {
                title: $(titleSelector).html(),
                rating: $(ratingSelector).attr('itemprop', 'ratingValue')
                    .text(),
                runtime: $(runtimeSelector).text(),
                // genres:
            };
            resolve(obj);
        });
    });
};

module.exports = {
    extractMovie,
};
