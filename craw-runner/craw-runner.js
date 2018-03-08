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

const start = new Date();

const runCrawler = async () => {
    await deleteEntries();
    initialInsert();
    loadPagesImdb(mainDomainImdb, entryPointImdb).then(() => {
        const end = new Date();
        console.log(end - start);
    });
    loadPagesTmdb(mainDomainTmdb, entryPointTmdb).then(() => {
        const end = new Date();
        console.log(end - start);
    });
};

module.exports = {
    runCrawler,
};

