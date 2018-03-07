'use strict';
module.exports = (sequelize, DataTypes) => {
  const Languages = sequelize.define('Languages', {
    language_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
    },
  }, {});
  Languages.associate = (models) => {
    Languages.belongsToMany(models.Movies, {
      through: 'movie_languages',
      foreignKey: 'language_id',
    });
  };
  return Languages;
};
