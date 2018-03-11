const columnify = require('columnify');

const filterRatingVisual = (result) => {
    console.log(columnify(result, {
        columnSplitter: ' | ',
        config: {
            title: {
                align: 'center',
                maxWidth: 60,
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            rating: {
                align: 'center',
                headingTransform: (heading) => {
                    return '*' + heading.toUpperCase() + '*';
                },
            },
        },
    }));
};

module.exports = {
    filterRatingVisual,
};
