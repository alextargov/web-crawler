const db = require('../models');
const {
    Movies,
    Languages,
    Genres,
    Directors,
} = db;

const addEntry = async (object) => {
    const l = await Languages.findOrCreate({
        defaults: {
            language: object.language,
        },
        where: {
            language: object.language,
        },
    });
    const d = await Directors.findOrCreate({
        director: object.directors[0],
        where: {
            director: object.directors[0],
        },
    });
    const g = await Genres.findOrCreate({
        defaults: {
            genre: object.genres[0],
        },
        where: {
            genre: object.genres[0],
        },
    });
    await Promise.all([l, d, g]).then((results) => {
        Movies.create({
            title: object.title,
            runtime: object.runtime,
            rating: object.rating,
            revenue: object.revenue,
        }).then((movie) => {
            movie.addLanguages([results[0][0]]);
            movie.addDirectors([results[1][0]]);
            movie.addGenres([results[2][0]]);
        });
    });
};

module.exports = {
    addEntry,
};
