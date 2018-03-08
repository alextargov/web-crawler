'use strict';
module.exports = (sequelize, DataTypes) => {
    const Movies = sequelize.define('Movies', {
        movie_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        runtime: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        revenue: {
            type: DataTypes.STRING,
        },
    }, {

    });
    Movies.associate = (models) => {
        Movies.belongsToMany(models.Genres, {
            through: 'movie_genres',
            foreignKey: 'movie_id',
            onDelete: 'CASCADE',
        });
        Movies.belongsToMany(models.Languages, {
            through: 'movie_languages',
            foreignKey: 'movie_id',
            onDelete: 'CASCADE',
        });
        Movies.belongsToMany(models.Directors, {
            through: 'movie_directors',
            foreignKey: 'movie_id',
            onDelete: 'CASCADE',
        });
    };
    return Movies;
};
