/* globals process */
const {
    sort,
} = require('../db-operations');

const sortYargs = (args) => {
    let result;
    if (!args.by) {
        console.log('Not valid option.');
        process.exit();
    }
    if (args.order) {
        result = sort(args.by, args.order);
    } else {
        result = sort(args.by);
    }

    return result;
};

module.exports = {
    sortYargs,
};
