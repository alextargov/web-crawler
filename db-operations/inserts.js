const db = require('../models');
const {
    Movies,
    Languages,
    Genres,
    Directors,
    movie_genre,
    movie_language,
    movie_director,
} = db;
const Sequelize = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);
const Op = Sequelize.Op;
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
        'INSERT INTO movie_languages (language_id, movie_id, createdAt, updatedAt) ' +
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
        'INSERT INTO movie_directors (director_id, movie_id, createdAt, updatedAt) ' +
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
    let movieId;
    let directorId;
    let languageId;
    let genreId;

    const findMovie = await Movies.findOne({
        where: {
            title: object.title,
        },
    });
    if (!findMovie) {
        let inserted;
        try {
            inserted = await Movies.create({
                title: object.title,
                runtime: object.runtime,
                rating: object.rating,
                revenue: object.revenue,
            });
        } catch (err) {
            console.log(err);
        }

        movieId = inserted.dataValues.movie_id;
    } else {
        movieId = findMovie.dataValues.movie_id;
    }

    const findDirector = await Directors.findOne({
        where: {
            director: object.directors,
        },
    });
    if (!findDirector) {
        let inserted;
        try {
            inserted = await Directors.create({
                director: object.directors[0],
            });
        } catch (err) {
            console.log(err);
        }
        directorId = inserted.dataValues.director_id;
    } else {
        directorId = findDirector.dataValues.director_id;
    }

    const findLanguage = await Languages.findOne({
        where: {
            language: object.language,
        },
    });
    if (!findLanguage) {
        let inserted;
        try {
            inserted = await Languages.create({
                language: object.language,
            });
        } catch (err) {
            console.log(err);
        }
        languageId = inserted.dataValues.language_id;
    } else {
        languageId = findLanguage.dataValues.language_id;
    }

    const findGenre = await Genres.findOne({
        where: {
            genre: object.genre,
        },
    });
    if (!findGenre) {
        let inserted;
        try {
            inserted = await Genres.create({
                genre: object.genre,
            });
        } catch (err) {
            console.log(err);
        }
        genreId = inserted.dataValues.genre_id;
    } else {
        genreId = findGenre.dataValues.genre_id;
    }

    rawQueringMovieGenres(genreId, movieId, new Date(), new Date());
    rawQueringMovieDirectors(directorId, movieId, new Date(), new Date());
    rawQueringMovieLanguages(languageId, movieId, new Date(), new Date());
};

module.exports = {
    addEntry,
};

// const run = async () => {
//     const a = await Movies.findAll({
//         include: [{
//             model: Directors,
//             through: {
//                 attributes: ['director_id', 'movie_id'],

//             },
//             where: {
//                 director: 'Francis Lawrence',
//             }
//         }]
//     });
//     a.forEach((element) => {
//         console.log(element.dataValues.title)
//     });
// };

// run();