const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const domParser = async (url) => {
    try {
        const dom = await JSDOM.fromURL(url);
        const $ = $init(dom.window);
        return $;
    } catch (err) {
        console.log(url);
        domParser(url);
        return null;
    }
};

module.exports = {
    domParser,
};
