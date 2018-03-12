const db = require('../models');
const {
    Movies,
    Languages,
    Genres,
    Directors,
} = db;

const addEntry = async (object) => {
    let movie;
    try {
        movie = await Movies.create({
            title: object.title,
            runtime: object.runtime,
            rating: object.rating,
            revenue: object.revenue,
            provider: object.provider,
        });

        object.languages.forEach((lang) => {
            Languages.findOrCreate({
                defaults: {
                    language: lang,
                },
                where: {
                    language: lang,
                },
            }).then((ful) => {
                movie.addLanguages([ful[0]]);
            });
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
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    addEntry,
};
