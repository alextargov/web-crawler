const {
    loadPagesImdb,
    loadPagesTmdb,
} = require('./pages/load-pages');
const {
    moviesImdb,
    moviesTmdb,
} = require('./movies/load-movies');
const {
    deleteEntries,
} = require('./db-operations/delete');
const {
    initialInsert,
} = require('./db-operations/initial-insert');
// const yargs = require('yargs')
// const argv = yargs
//     .usage('usage: $0 <command>')
//     .command('statistics', 'run statistics', (yargs) => {
//         let argv = yargs
//             .usage('usage: $0 statistics <command>')
//             .command('filter', 'filter entries', (yargs) => {
//                 let argv = yargs.usage('usage: $0 statistics filter <command>')
//                     .command('runtime', 'filter entries by runtime', (yargs) => {
//                         let argv = yargs.usage('usage: $0 statistics filter runtime')
//                             .options({
//                                 gt: {
//                                     describe: 'Grater than',
//                                     type: 'number',
//                                 },
//                                 lt: {
//                                     describe: 'Lower than',
//                                     type: 'number',
//                                 },
//                                 // MORE HERE
//                             });
//                     }, (argv) => {
//                         // RUNTIME FILTERS
//                         console.log(argv.gt);
//                     }).command('rating', 'filter entries by rating', (yargs) => {
//                         let argv = yargs.usage('usage: $0 statistics filter rating')
//                             .options({
//                                 gt: {
//                                     describe: 'Grater than',
//                                     type: 'number',
//                                 },
//                                 lt: {
//                                     describe: 'Lower than',
//                                     type: 'number',
//                                 },
//                                 // MORE HERE
//                             });
//                     }, (argv) => {
//                         // rating FILTERS
//                         console.log(argv.gt);
//                     }).command('language', 'filter entries by language', (yargs) => {
//                         let argv = yargs.usage('usage: $0 statistics filter language [name]')
//                             .options({
//                                 name: {
//                                     describe: 'Language name',
//                                     type: 'string',
//                                     demandOption: true,
//                                     alias: 'n',
//                                 },
//                             })
//                             .help()
//                             .alias('h', 'help');
//                     }, (argv) => {
//                         // LANGUAGE FILTERS
//                         console.log(argv.name);
//                     });
//             }).command('search', 'search entries', (yargs) => {
//                 let argv = yargs.usage('usage: $0 statistics search [option]')
//                     .options({
//                         directorName: {
//                             describe: 'Seacrh for a director',
//                             type: 'string',
//                             alias: 'dn',
//                         },
//                         movieTitle: {
//                             type: 'string',
//                             alias: 'mt',
//                         },
//                         genre: {
//                             type: 'string',
//                             alias: 'g',
//                         },
//                     })
//                     .help()
//                     .alias('h', 'help');
//             }, (argv) => {
//                 // search for direcotrName | movieTitle | genre
//                 console.log(argv);
//             });
//     })
//     .help('help')
//     .wrap(null)
//     .argv;

const entryPointImdb = 'http://www.imdb.com/search/title?page=';
const mainDomainImdb = 'http://imdb.com';

const entryPointTmdb = 'https://www.themoviedb.org/movie?page=';
const mainDomainTmdb = 'https://www.themoviedb.org';

const start = new Date();

const run = async () => {
    await deleteEntries();
    initialInsert();
    // loadPagesImdb(mainDomainImdb, entryPointImdb).then(() => {
    //     console.log(moviesImdb.length);
    //     const end = new Date();
    //     console.log(end - start);
    // });
    loadPagesTmdb(mainDomainTmdb, entryPointTmdb).then(() => {
        console.log(moviesTmdb.length);
        const end = new Date();
        console.log(end - start);
    });
};

run();
