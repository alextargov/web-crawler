const { JSDOM } = require('jsdom');
const $init = require('jquery');

const domParser = async (url) => {
    try {
        const dom = await JSDOM.fromURL(url);
        const $ = $init(dom.window);
        return $;
    } catch (err) {
        console.log('DOM Parser error: ');
        console.log(err);
        return null;
    }
};

module.exports = {
    domParser,
};
