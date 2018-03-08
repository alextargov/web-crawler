const db = require('../models');
const {
    Movies,
    Languages,
    Genres,
    Directors,
} = db;
const Sequelize = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);

const rawQueringMovieGenres = (value1, value2, date1, date2) => {
    sequelize.query(
        'INSERT INTO movie_genres (genre_id, movie_id, createdAt, updatedAt) ' +
        'VALUES (?, ?, ?, ?);', {
            replacements: [
                value1, value2, date1, date2,
            ],
            type: sequelize.QueryTypes.INSERT,
            raw: true,
        }).then((ful) => {
        console.log(ful);
    }, (rej) => {
        console.log(rej);
    });
};
const rawQueringMovieLanguages = (value1, value2, date1, date2) => {
    sequelize.query(
        'INSERT INTO movie_languages ' +
        '(language_id, movie_id, createdAt, updatedAt) ' +
        'VALUES (?, ?, ?, ?);', {
            replacements: [
                value1, value2, date1, date2,
            ],
            type: sequelize.QueryTypes.INSERT,
            raw: true,
        }).then((ful) => {
        console.log(ful);
    }, (rej) => {
        console.log(rej);
    });
};
const rawQueringMovieDirectors = (value1, value2, date1, date2) => {
    sequelize.query(
        'INSERT INTO movie_directors ' +
        '(director_id, movie_id, createdAt, updatedAt) ' +
        'VALUES (?, ?, ?, ?);', {
            replacements: [
                value1, value2, date1, date2,
            ],
            type: sequelize.QueryTypes.INSERT,
            raw: true,
        }).then((ful) => {
        console.log(ful);
    }, (rej) => {
        console.log(rej);
    });
};

const addEntry = async (object) => {
    let directorId;
    let genreId;
    const findMovie = await Movies.create({
        title: object.title,
        runtime: object.runtime,
        rating: object.rating,
        revenue: object.revenue,
        where: {
            title: object.title,
        },
    });
    const movieId = findMovie.dataValues.movie_id;

    if (object.directors) {
        object.directors.map(async (director) => {
            const findDirector = await Directors.findOrCreate({
                where: {
                    director,
                },
                defaults: {
                    director,
                },
            });
            directorId = findDirector[0].dataValues.director_id;
            rawQueringMovieDirectors(directorId, movieId,
                new Date(), new Date());
        });
    }

    const findLanguage = await Languages.findOrCreate({
        where: {
            language: object.language,
        },
        defaults: {
            language: object.language,
        },
    });
    const languageId = findLanguage[0].dataValues.language_id;

    if (object.genre) {
        object.genre.map(async (g) => {
            const findGenre = await Genres.findOrCreate({
                where: {
                    genre: g,
                },
                defaults: {
                    genre: g,
                },
            });
            genreId = findGenre[0].dataValues.genre_id;
            rawQueringMovieGenres(genreId, movieId,
                new Date(), new Date());
        });
    }
    rawQueringMovieLanguages(languageId, movieId, new Date(), new Date());
};

module.exports = {
    addEntry,
};
