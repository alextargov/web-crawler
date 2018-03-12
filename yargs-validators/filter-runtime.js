/* globals process */
const {
    filterRuntime,
} = require('../db-operations');

const filterRuntimeYargs = (args) => {
    let result;
    if (args.gt) {
        result = filterRuntime('greater', args.gt);
    } else if (args.lt) {
        result = filterRuntime('lower', args.lt);
    } else if (args.eq) {
        result = filterRuntime('equals', args.eq);
    } else {
        console.log('Not valid option');
        process.exit();
    }

    return result;
};

module.exports = {
    filterRuntimeYargs,
};
