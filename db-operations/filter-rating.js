const db = require('../models');
const {
    Movies,
} = db;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const filterRating = async (filter, value) => {
    const output = [];
    let result = [];
    if (filter === 'lower') {
        result = await Movies.findAll({
            where: {
                rating: {
                    [Op.lt]: value,
                },
            },
        });
    } else if (filter === 'greater') {
        result = await Movies.findAll({
            where: {
                rating: {
                    [Op.gt]: value,
                },
            },
        });
    } else if (filter === 'equals') {
        result = await Movies.findAll({
            where: {
                rating: {
                    [Op.eq]: value,
                },
            },
        });
    }

    if (result.length === 0) {
        return null;
    }

    result.forEach((element) => {
        output.push({
            title: element.title,
            rating: element.rating,
        });
    });
    return output;
};

module.exports = {
    filterRating,
};
