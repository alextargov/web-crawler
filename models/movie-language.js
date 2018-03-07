'use strict';

module.exports = (sequelize, DataTypes) => {
  const movie_language = sequelize.define('movie_language', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    language_id: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
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
  return movie_language;
};
