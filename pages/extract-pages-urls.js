const {
    domParser,
} = require('../parser/dom-parser');

const extractPageUrlsImdb = async (url) => {
    const $ = await domParser(url);
    const pageContentSelector = '#main .lister-item .lister-item-header';
    const links = $(pageContentSelector).find('a');
    return [...links].map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

const extractPageUrlsTmdb = async (url) => {
    const $ = await domParser(url);
    const pageContentSelector = '.results .image_content';
    const links = $(pageContentSelector).find('a.result');
    return [...links].map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

module.exports = {
    extractPageUrlsImdb,
    extractPageUrlsTmdb,
};
