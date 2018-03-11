const db = require('../models');
const {
    Movies,
    Languages,
    Genres,
    Directors,
} = db;

const addEntry = async (object) => {
    const movie = await Movies.create({
        title: object.title,
        runtime: object.runtime,
        rating: object.rating,
        revenue: object.revenue,
        provider: object.provider,
    });

    Languages.findOrCreate({
        defaults: {
            language: object.language,
        },
        where: {
            language: object.language,
        },
    }).then((ful) => {
        movie.addLanguages([ful[0]]);
    });

    object.directors.forEach((dir) => {
        Directors.findOrCreate({
            defaults: {
                director: dir,
            },
            where: {
                director: dir,
            },
        }).then((ful) => {
            movie.addDirectors([ful[0]]);
        });
    });

    object.genres.forEach((genre) => {
        Genres.findOrCreate({
            defaults: {
                genre,
            },
            where: {
                genre,
            },
        }).then((ful) => {
            movie.addGenres([ful[0]]);
        });
    });
};

module.exports = {
    addEntry,
};
