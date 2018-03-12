const db = require('../models');

const {
    languages,
} = require('../resources');
const {
    genres,
} = require('../resources');

const {
    Languages,
    Genres,
} = db;

const initialInsert = () => {
    const languagesArray = [];
    const genresArray = [];
    languages.map((x) => languagesArray.push({
        language: x,
        createdAt: new Date(),
        updatedAt: new Date(),
    }));
    genres.map((x) => genresArray.push({
        genre: x,
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    Languages.bulkCreate(languagesArray);
    Genres.bulkCreate(genresArray);
};

module.exports = {
    initialInsert,
};
