'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genres = sequelize.define('Genres', {
    genre_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
  }, {});
  Genres.associate = (models) => {
    Genres.belongsToMany(models.Movies, {
      through: 'movie_genres',
      foreignKey: 'genre_id',
    });
  };
  return Genres;
};
