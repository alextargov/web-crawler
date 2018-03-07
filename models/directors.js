'use strict';
module.exports = (sequelize, DataTypes) => {
  const Directors = sequelize.define('Directors', {
    director_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
    },
  }, {});
  Directors.associate = (models) => {
    Directors.belongsToMany(models.Movies, {
      through: 'movie_directors',
      foreignKey: 'director_id',
    });
  };
  return Directors;
};
