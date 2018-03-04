const {
    loadPagesImdb,
    loadPagesTmdb,
} = require('./pages/load-pages');
const {
    moviesImdb,
    moviesTmdb,
} = require('./movies/load-movies');

const entryPointImdb = 'http://www.imdb.com/search/title?page=';
const mainDomainImdb = 'http://imdb.com';

const entryPointTmdb = 'https://www.themoviedb.org/movie?page=';
const mainDomainTmdb = 'https://www.themoviedb.org';

const start = new Date();

const run = async () => {
    console.log('-------------START IMDB ------------');
    loadPagesImdb(mainDomainImdb, entryPointImdb).then(() => {
        console.log('-------------END IMDB ------------');
        console.log(moviesImdb.length);
        const end = new Date();
        console.log(end - start);
    });
    console.log('-------------START TMDB ------------');
    loadPagesTmdb(mainDomainTmdb, entryPointTmdb).then(() => {
        console.log('-------------END TMDB ------------');
        console.log(moviesTmdb.length);
        const end = new Date();
        console.log(end - start);
    });
};

run();
