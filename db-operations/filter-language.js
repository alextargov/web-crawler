const db = require('../models');
const {
    Movies,
    Languages,
} = db;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const filterLanguage = async (input) => {
    let result = [];
    const output = [];
    result = await Movies.findAll({
        include: [{
            model: Languages,
            through: {
                attributes: ['language_id', 'movie_id'],
            },
            where: {
                language: {
                    [Op.like]: '%' + input.toLowerCase() + '%',
                },
            },
        }],
    });

    if (result.length === 0) {
        return null;
    }

    result.forEach((element) => {
        output.push(element.title);
    });
    return output;
};

module.exports = {
    filterLanguage,
};
