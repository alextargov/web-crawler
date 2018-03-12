const columnify = require('columnify');

const filterRatingVisual = (result) => {
    console.log(columnify(result, {
        columnSplitter: ' | ',
        config: {
            title: {
                align: 'left',
                maxWidth: 60,
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            rating: {
                align: 'left',
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
