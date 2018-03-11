const columnify = require('columnify');

const searchVisual = (result) => {
    console.log(columnify(result, {
        preserveNewLines: true,
        config: {
            title: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            runtime: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            rating: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            revenue: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            directors: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            genres: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            languages: {
                align: 'center',
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
        },
        columnSplitter: ' | ',
    }));
};

module.exports = {
    searchVisual,
};
