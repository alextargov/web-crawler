'use strict';

module.exports = (sequelize, DataTypes) => {
  const movie_director = sequelize.define('movie_director', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    director_id: {
      type: DataTypes.INTEGER,
    },
    movie_id: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {});
  return movie_director;
};
