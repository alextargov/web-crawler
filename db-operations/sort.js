const db = require('../models');
const {
    Movies,
} = db;

const sort = async (column, sortType = 'desc') => {
    const output = [];
    const result= await Movies.findAll({
        order: [[column, sortType]],
    });

    result.forEach((m) => {
        const obj = {
            title: m.title,
            runtime: m.runtime,
            rating: m.rating,
            revenue: m.revenue,
        };

        if (!obj.runtime) {
            obj.runtime = 'n/a';
        }
        if (!obj.rating) {
            obj.rating = 'n/a';
        }
        if (!obj.revenue) {
            obj.revenue = 'n/a';
        }

        output.push(obj);
    });
    return output;
};

module.exports = {
    sort,
};
