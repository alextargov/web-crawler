const db = require('../models');
const {
    Movies,
    Directors,
    Languages,
    Genres,
} = db;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const searchDirector = async (input) => {
    const output = [];
    const result = await Movies.findAll({
        include: [{
            model: Directors,
            through: {
                attributes: ['director_id', 'movie_id'],
            },
            where: {
                director: {
                    [Op.or]: [{
                            [Op.eq]: input,
                        },
                        {
                            [Op.like]: '%' + input + '%',
                        },
                    ],
                },
            },
        }],
    });

    if (result.length === 0) {
        return null;
    }

    result.forEach((m) => {
        const directors = [];
        m.Directors.forEach((d) => {
            directors.push(d.director);
        });
        output.push({
            directors,
            title: m.title,
        });
    });

    return output;
};

const searchMovie = async (input) => {
    const output = [];
    const result = await Movies.findAll({
        where: {
            title: {
                [Op.or]: [{
                        [Op.eq]: input,
                    },
                    {
                        [Op.like]: '%' + input + '%',
                    },
                ],
            },
        },
        include: [{
                model: Directors,
                through: {
                    attributes: ['director_id', 'movie_id'],
                },
            },
            {
                model: Languages,
                through: {
                    attributes: ['language_id', 'movie_id'],
                },
            },
            {
                model: Genres,
                through: {
                    attributes: ['genre_id', 'movie_id'],
                },
            },
        ],
    });


    if (result.length === 0) {
        return null;
    }

    result.forEach((movie, index) => {
        output.push({
            title: movie.title,
            runtime: movie.runtime,
            rating: movie.rating,
            revenue: movie.revenue,
            directors: [],
            genres: [],
            languages: [],
            provider: movie.provider,
        });
        movie.Directors.forEach((d) => {
            output[index].directors.push(d.director);
        });
        movie.Genres.forEach((g) => {
            output[index].genres.push(g.genre);
        });
        movie.Languages.forEach((lang) => {
            output[index].languages.push(lang.language);
        });
    });
    return output;
};

module.exports = {
    searchDirector,
    searchMovie,
};
