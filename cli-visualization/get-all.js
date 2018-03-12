const columnify = require('columnify');

const getAllVisual = (result) => {
    console.log(columnify(result, {
        preserveNewLines: true,
        config: {
            title: {
                align: 'center',
                maxWidth: 50,
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
            },
            runtime: {
                align: 'center',
                headingTransform: (heading) => {
                    return '*' + heading.toUpperCase() + '*';
                },
            },
            rating: {
                align: 'center',
                headingTransform: (heading) => {
                    return '*' + heading.toUpperCase() + '*';
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
            directors: {
                align: 'center',
                maxWidth: 35,
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
                dataTransform: (data) => {
                    if (data.indexOf(',') !== -1) {
                        return data.split(',').join(', ');
                    }
                    return data;
                },
            },
            genres: {
                align: 'center',
                maxWidth: 35,
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
                dataTransform: (data) => {
                    if (data.indexOf(',') !== -1) {
                        return data.split(',').join(', ');
                    }
                    return data;
                },
            },
            languages: {
                align: 'center',
                maxWidth: 30,
                headingTransform: (heading) => {
                    return '***' + heading.toUpperCase() + '***';
                },
                dataTransform: (data) => {
                    if (data.indexOf(',') !== -1) {
                        return data.split(',').join(', ');
                    }
                    return data;
                },
            },
            provider: {
                align: 'center',
                headingTransform: (heading) => {
                    return '*' + heading.toUpperCase() + '*';
                },
            },
        },
        columnSplitter: '|',
    }));
};

module.exports = {
    getAllVisual,
};
