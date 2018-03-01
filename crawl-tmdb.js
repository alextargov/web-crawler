const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');
const {
    domParser,
} = require('./parser/dom-parser.js');
const entryPoint = 'https://www.themoviedb.org/movie?page=1';
const mainDomain = 'https://www.themoviedb.org';

const extractPageUrls = async (url) => {
    const $ = await domParser(url);
    const pageContentSelector = '.results .image_content';
    const links = $(pageContentSelector).find('a.result');
    return [...links].map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

const goInPage = async () => {
    const pageUrls1 = extractPageUrls(mainDomain + '/movie?page=1');
    const pageUrls2 = extractPageUrls(mainDomain + '/movie?page=2');

    return {
        page1: await pageUrls1,
        page2: await pageUrls2,
    };
};

const extractMovie = (movieUrl) => {
    return new Promise((resolve, reject) => {
        const fullUrl = mainDomain + movieUrl;
        domParser(fullUrl).then(($) => {
            const titleSelector = '.title h2';
            const ratingSelector = '.user_score_chart';
            const runtimeSelector = '.facts p:nth-child(9)';

            const obj = {
                title: $(titleSelector).html(),
                rating: $(ratingSelector).attr('data-percent'),
                runtime: $(runtimeSelector).text(),
            };
            resolve(obj);
        });
    });
};

const arrayProcessing = async (array) => {
    const results = [];
    for (const entry of array) {
        results.push(await extractMovie(entry));
    }
    return results;
};

const parallel = async (movieUrl1, movieUrl2) => {
    // const res = await Promise
        // .all([arrayWork(movieUrl1), arrayWork(movieUrl2)]);
    // return res;
    const task1 = arrayProcessing(movieUrl1);
    const task2 = arrayProcessing(movieUrl2);

    return {
        res1: await task1,
        res2: await task2,
    };
};

const run = async () => {
    const date = Date.now();
    try {
        const urls = await goInPage();
        await parallel(urls.page1, urls.page2).then((result) => {
            console.log(result);
        });
    } catch (err) {
        console.log(err);
    }
    console.log('Took ' + (Date.now() - date));
};

run();
