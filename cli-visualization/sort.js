const columnify = require('columnify');

const sortVisual = (result) => {
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
                dataTransform: (data) => {
                    if (data !== 'n/a') {
                        return '$' + data;
                    }
                    return data;
                },
            },
        },
        columnSplitter: ' | ',
    }));
};

module.exports = {
    sortVisual,
};
