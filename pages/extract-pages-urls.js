const {
    domParser,
} = require('../parser/dom-parser');

const extractPageUrls = async (url) => {
    console.log(url)
    const $ = await domParser(url);
    const pageContentSelector = '#main .lister-item .lister-item-header';
    const links = $(pageContentSelector).find('a');
    return [...links].map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

module.exports = {
    extractPageUrls,
};
