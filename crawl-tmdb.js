const {
    domParser,
} = require('./parser/dom-parser.js');

const entryPoint = 'https://www.themoviedb.org/movie?page=';
const mainDomain = 'https://www.themoviedb.org';

const extractPageUrls = async (url) => {
    const $ = await domParser(url);
    const pageContentSelector = '.results .image_content';
    const links = $(pageContentSelector).find('a.result');
    console.log(links.html())
    return [...links].map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

const extractMovie = (movieUrl) => {
    return new Promise((resolve, reject) => {
        const url = mainDomain + movieUrl;
        domParser(url).then(($) => {
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

const movies = [];
const loadMovie = async (array) => {
    if (array.length === 0) {
        return Promise.resolve();
    }

    const id = array.pop();
    const movie = await extractMovie(id);

    movies.push(movie);
    return loadMovie(array);
};

const loadMovies = (array) => {
    const parallels = 100;

    return Promise.all(
        Array.from({
            length: parallels,
        })
        .map(() => loadMovie(array)));
};

const loadAll = async () => {
    const pages = 5;
    const arr = [];

    await Promise.all(
        Array.from({
            length: pages,
        })
        .map((value, index) => {
            const url = entryPoint + (index + 1);
            return extractPageUrls(url).then((res) => {
                res.forEach((el) => {
                    arr.push(el);
                });
            });
        })
    );
    return loadMovies(arr);
};

const start = new Date();

const run = async () => {
    await loadAll();
    const end = new Date();
    //console.log(movies);
    console.log(movies.length);
    console.log(end - start);
};

run();
