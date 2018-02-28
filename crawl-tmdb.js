const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');
const entryPoint = 'https://www.themoviedb.org/movie?page=1';
const mainDomain = 'https://www.themoviedb.org';

const extractPageUrls = async (url) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    const pageContentSelector = '.results .image_content';
    const links = $(pageContentSelector).find('a.result');
    return [...links].map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

const goInPage = async () => {
    // checking if paralleling works
    const pageUrls1 = extractPageUrls(mainDomain + '/movie?page=1');
    const pageUrls2 = extractPageUrls(mainDomain + '/movie?page=2');

    return {
        page1: await pageUrls1,
        page2: await pageUrls2,
    };
};

const extractMovie = (movieUrl) => {
    movieUrl.forEach(async (element) => {
        const fullUrl = mainDomain + element;
        const dom = await JSDOM.fromURL(fullUrl);
        const $ = $init(dom.window);

        return new Promise((resolve, reject) => {
            const titleSelector = '.title h2';
            const ratingSelector = '.user_score_chart';
            const runtimeSelector = '.facts p:nth-child(9)';

            const obj = {
                title: $(titleSelector).html(),
                rating: $(ratingSelector).attr('data-percent'),
                runtime: $(runtimeSelector).text(),
            };
            console.log(obj);
            resolve(obj);
        });
    });
};

const parallel = async (movieUrl1, movieUrl2) => {
    const task1 = extractMovie(movieUrl1);
    const task2 = extractMovie(movieUrl2);

    return {
        res1: await task1,
        res2: await task2,
    };
};

const run = async () => {
    let data;
    try {
        const urls = await goInPage();
        data = await parallel(urls.page1, urls.page2);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

run();
