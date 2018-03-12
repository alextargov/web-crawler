/* globals process */
const yargs = require('yargs');

const {
    getAllInfo,
} = require('./db-operations');

const {
    filterRuntimeYargs,
    filterRatingYargs,
    filterLanguageYargs,
    filterGenreYargs,
    searchYargs,
    sortYargs,
} = require('./yargs-validators');

const {
    filterGenreVisual,
    filterLanguageVisual,
    filterRatingVisual,
    filterRuntimeVisual,
    searchVisual,
    sortVisual,
    getAllVisual,
} = require('./cli-visualization');

const {
    genres,
} = require('./resources');

const {
    runCrawler,
} = require('./crawl-runner/crawl-runner');

yargs.usage('usage: $0 <command>')
    .command('statistics', 'run statistics', (stat) => {
        stat.usage('usage: $0 statistics <command>')
            .demandCommand(1)
            .command('filter', 'filter entries', (filter) => {
                filter.usage('usage: $0 statistics filter <command>')
                    .demandCommand(1)
                    .command('runtime', 'filter entries by runtime',
                        (runtime) => {
                            runtime
                                .usage('usage: $0 statistics filter runtime')
                                .options({
                                    gt: {
                                        describe: 'Grater than',
                                        type: 'number',
                                    },
                                    lt: {
                                        describe: 'Lower than',
                                        type: 'number',
                                    },
                                    eq: {
                                        describe: 'Equals',
                                        type: 'number',
                                    },
                                })
                                .conflicts('gt', ['lt', 'eq'])
                                .conflicts('lt', ['gt', 'eq'])
                                .conflicts('eq', ['lt', 'gt'])
                                .help('h')
                                .alias('h', 'help');
                        }, (args) => {
                            const result = filterRuntimeYargs(args);
                            result.then((res) => {
                                console.log();
                                if (res) {
                                    filterRuntimeVisual(res);
                                } else {
                                    console.log('No data found');
                                }
                                process.exit();
                            });
                        }).command('rating', 'filter entries by rating',
                        (rating) => {
                            rating
                                .usage('usage: $0 statistics filter rating')
                                .options({
                                    gt: {
                                        describe: 'Grater than',
                                        type: 'number',
                                    },
                                    lt: {
                                        describe: 'Lower than',
                                        type: 'number',
                                    },
                                    eq: {
                                        describe: 'Equals',
                                        type: 'number',
                                    },
                                })
                                .conflicts('gt', ['lt', 'eq'])
                                .conflicts('lt', ['gt', 'eq'])
                                .conflicts('eq', ['lt', 'gt']);
                        }, (args) => {
                            const result = filterRatingYargs(args);

                            result.then((res) => {
                                console.log();
                                if (res) {
                                    filterRatingVisual(res);
                                } else {
                                    console.log('No data found');
                                }
                                process.exit();
                            });
                        }).command('language', 'filter entries by language',
                        (lang) => {
                            lang
                                .usage('usage: $0 statistics filter ' +
                                    'language [name]')
                                .options({
                                    name: {
                                        describe: 'Language name',
                                        type: 'string',
                                        demandOption: true,
                                        alias: 'n',
                                    },
                                })
                                .help('h')
                                .alias('h', 'help');
                        }, (args) => {
                            const result = filterLanguageYargs(args);

                            result.then((res) => {
                                console.log();
                                if (res) {
                                    filterLanguageVisual(res);
                                } else {
                                    console.log('No data found');
                                }
                                process.exit();
                            });
                        }).command('genre', 'filter entries by genre',
                        (genre) => {
                            genre
                                .usage('usage: $0 statistics filter' +
                                    'genre [name]')
                                .options({
                                    name: {
                                        describe: 'Genre name',
                                        type: 'string',
                                        demandOption: true,
                                        alias: 'n',
                                        choices: genres,
                                    },
                                })
                                .help('h')
                                .alias('h', 'help');
                        }, (args) => {
                            const result = filterGenreYargs(args);

                            result.then((res) => {
                                console.log();
                                filterGenreVisual(res);
                                process.exit();
                            });
                        });
            }).command('search', 'search entries', (search) => {
                search
                    .usage('usage: $0 statistics search [option]')
                    .options({
                        director: {
                            describe: 'Search for a director',
                            type: 'string',
                            alias: 'd',
                        },
                        movie: {
                            type: 'string',
                            alias: 'm',
                        },
                    })
                    .conflicts('director', 'movie')
                    .help('h')
                    .alias('h', 'help');
            }, (args) => {
                const result = searchYargs(args);

                result.then((res) => {
                    console.log();
                    if (res) {
                        searchVisual(res);
                    } else {
                        console.log('No data found');
                    }
                    process.exit();
                });
            }).command('sort', 'sort entries', (sorts) => {
                sorts
                    .usage('usage: $0 statistics sort [option]')
                    .options({
                        by: {
                            describe: 'Sort by',
                            type: 'string',
                            alias: 'b',
                            demandOption: true,
                            choices: ['revenue', 'rating', 'runtime', 'title'],
                        },
                        order: {
                            describe: 'Sort smth in ascending/descending ' +
                                'order. By default it is descending.',
                            type: 'string',
                            alias: 'o',
                            choices: ['asc', 'desc'],
                        },
                    })
                    .help('h')
                    .alias('h', 'help');
            }, (args) => {
                const result = sortYargs(args);

                result.then((res) => {
                    console.log();
                    sortVisual(res);
                    process.exit();
                });
            });
    })
    .command('get-all', 'Get all available information', (all) => {
        all.usage('usage: $0 get-all')
            .help('h')
            .alias('h', 'help');
    }, (args) => {
        getAllInfo().then((res) => {
            console.log();
            if (res) {
                getAllVisual(res);
            } else {
                console.log('No data found');
            }
            process.exit();
        });
    })
    .command('update', 'Get the info and insert it into the DB', (update) => {
        update.usage('usage: $0 update')
            .help('h')
            .alias('h', 'help');
    }, async (args) => {
        console.log();
        await runCrawler();
    })
    .demandCommand(1)
    .version(false)
    .help('h')
    .alias('h', 'help')
    .wrap(null)
    .argv._.entries();
