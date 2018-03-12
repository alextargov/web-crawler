const {
    domParser,
} = require('../parser/dom-parser');

const extractPageUrlsImdb = async (url) => {
    try {
        const $ = await domParser(url);
        const pageContentSelector = '#main .lister-item .lister-item-header';
        const links = $(pageContentSelector).find('a');
        return [...links].map((link) => $(link))
            .map(($link) => $link.attr('href'));
    } catch (err) {
        console.log('Error extracting IMDB page URLs');
        console.log(err);
        return [];
    }
};

const extractPageUrlsTmdb = async (url) => {
    try {
        const $ = await domParser(url);
        const pageContentSelector = '.results .image_content';
        const links = $(pageContentSelector).find('a.result');
        return [...links].map((link) => $(link))
            .map(($link) => $link.attr('href'));
    } catch (err) {
        console.log('Error extracting TMDB page URLs');
        console.log(err);
        return [];
    }
};

module.exports = {
    extractPageUrlsImdb,
    extractPageUrlsTmdb,
};
