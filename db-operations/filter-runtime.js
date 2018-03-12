const db = require('../models');
const {
    Movies,
} = db;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const filterRuntime = async (filter, value) => {
    const output = [];
    let result = [];
    try {
        if (filter === 'lower') {
            result = await Movies.findAll({
                where: {
                    runtime: {
                        [Op.lt]: value,
                    },
                },
            });
        } else if (filter === 'greater') {
            result = await Movies.findAll({
                where: {
                    runtime: {
                        [Op.gt]: value,
                    },
                },
            });
        } else if (filter === 'equals') {
            result = await Movies.findAll({
                where: {
                    runtime: {
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
                runtime: element.runtime,
            });
        });
        return output;
    } catch (err) {
        console.log('Filter runtime error: ');
        console.log(err);
        return null;
    }
};

module.exports = {
    filterRuntime,
};
