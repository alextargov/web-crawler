// const {
//     domParser,
// } = require('./parser/dom-parser.js');

// const entryPoint = 'http://www.imdb.com/search/title?page=';
// const mainDomain = 'http://imdb.com';

// const extractPageUrls = async (url) => {
//     const $ = await domParser(url);
//     const pageContentSelector = '#main .lister-item .lister-item-header';
//     const links = $(pageContentSelector).find('a');
//     return [...links].map((link) => $(link))
//         .map(($link) => $link.attr('href'));
// };

// const extractMovie = (movieUrl) => {
//     return new Promise((resolve, reject) => {
//         const url = mainDomain + movieUrl;
//         domParser(url).then(($) => {
//             const titleSelector = '.title_wrapper h1';
//             const ratingSelector = '.ratingValue';
//             const runtimeSelector = '#titleDetails .txt-block time';
//             const genresSelector = 'div#titleStoryLine .see-more a';
//             // console.log($(genresSelector).attr('href'))
//             const obj = {
//                 title: $(titleSelector).html(),
//                 rating: $(ratingSelector).attr('itemprop', 'ratingValue').text(),
//                 runtime: $(runtimeSelector).text(),
//                 // genres: 
//             };
//             resolve(obj);
//         });
//     });
// };

// const movies = [];
// const loadMovie = async (array) => {
//     if (array.length === 0) {
//         return Promise.resolve();
//     }

//     const id = array.pop();
//     const movie = await extractMovie(id);

//     movies.push(movie);
//     return loadMovie(array);
// };

// const loadMovies = (array) => {
//     const parallels = 100;
//     // console.log(array)
//     return Promise.all(
//         Array.from({
//             length: parallels,
//         })
//         .map(() => loadMovie(array)));
// };

// const loadPages = async () => {
//     const pages = 2;
//     const arr = [];

//     await Promise.all(
//         Array.from({
//             length: pages,
//         })
//         .map((value, index) => {
//             const url = entryPoint + (index + 1) + '/';
//             return extractPageUrls(url).then((res) => {
//                 res.forEach((el) => {
//                     arr.push(el);
//                 });
//             }).catch((rej) => {
//                 console.log(rej)
//             });
//         })
//     );
//    return loadMovies(arr);
// };

// const start = new Date();

// const run = async () => {
//     await loadPages();
//     const end = new Date();
//     console.log(movies);
//     console.log(movies.length);
//     console.log(end - start);
// };

// run();

const {
    loadPages,
} = require('./pages/load-pages');
const {
    movies,
} = require('./movies/load-movies');
const entryPoint = 'http://www.imdb.com/search/title?page=';
const mainDomain = 'http://imdb.com';

const start = new Date();

const run = async () => {
    await loadPages(mainDomain, entryPoint);
    const end = new Date();
    console.log(movies.length);
    console.log(end - start);
};

run();
