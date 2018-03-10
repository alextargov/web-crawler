const db = require('../models');
const {
    Movies,
    Languages,
    Genres,
    Directors,
    movie_genre,
    movie_language,
    movie_director,
} = db;

const deleteEntries = async () => {
    await movie_genre.destroy({
        where: {},
    });
    await movie_language.destroy({
        where: {},
    });
    await movie_director.destroy({
        where: {},
    });
    await Genres.destroy({
        where: {},
    });
    await Languages.destroy({
        where: {},
    });
    await Directors.destroy({
        where: {},
    });
    await Movies.destroy({
        where: {},
    });
};

module.exports = {
    deleteEntries,
};
