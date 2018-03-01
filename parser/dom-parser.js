const { JSDOM } = require('jsdom');
const $init = require('jquery');

const domParser = async (url) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    return $;
};

module.exports = {
    domParser,
};
