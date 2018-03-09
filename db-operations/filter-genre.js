const db = require('../models');
const {
    Movies,
    Genres,
} = db;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const filterGenre = async (input) => {
    let result = [];
    const output = [];
    result = await Movies.findAll({
        include: [{
            model: Genres,
            through: {
                attributes: ['genre_id', 'movie_id'],
            },
            where: {
                genre: {
                    [Op.like]: '%' + input.toLowerCase() + '%',
                },
            },
        }],
    });

    if (result.length === 0) {
        return null;
    }

    result.forEach((element) => {
        output.push({
            title: element.title,
        });
    });
    return output;
};

module.exports = {
    filterGenre,
};
