const {
    loadPagesImdb,
    loadPagesTmdb,
} = require('../pages/load-pages');

const {
    deleteEntries,
    initialInsert,
} = require('../db-operations');

const entryPointImdb = 'http://www.imdb.com/search/title?page=';
const mainDomainImdb = 'http://imdb.com';

const entryPointTmdb = 'https://www.themoviedb.org/movie?page=';
const mainDomainTmdb = 'https://www.themoviedb.org';

const runCrawler = async () => {
    const interval = setInterval(() => {
        process.stdout.write('.');
    }, 500);
    await deleteEntries();
    initialInsert();
    const imdb = loadPagesImdb(mainDomainImdb, entryPointImdb);
    const tmdb = loadPagesTmdb(mainDomainTmdb, entryPointTmdb);

    return Promise.all([imdb, tmdb]).then(() => {
        console.log('Finished');
        clearInterval(interval);
    });
};

module.exports = {
    runCrawler,
};
