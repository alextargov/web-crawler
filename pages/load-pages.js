const {
    extractPageUrls,
} = require('./extract-pages-urls');
const {
    loadMovies,
} = require('../movies/load-movies');

const loadPages = async (mainDomain, entryPoint) => {
    const pages = 2;
    const arr = [];

    await Promise.all(
        Array.from({
            length: pages,
        })
        .map((value, index) => {
            const url = entryPoint + (index + 1) + '/';
            return extractPageUrls(url).then((res) => {
                res.forEach((el) => {
                    arr.push(el);
                });
            }).catch((rej) => {
                console.log(rej);
            });
        })
    );
    return loadMovies(mainDomain, arr);
};

module.exports = {
    loadPages,
};
