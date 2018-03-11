const columnify = require('columnify');

const filterRuntimeVisual = (result) => {
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
            runtime: {
                align: 'center',
                headingTransform: (heading) => {
                    return '*' + heading.toUpperCase() + '*';
                },
            },
        },
    }));
};

module.exports = {
    filterRuntimeVisual,
};
