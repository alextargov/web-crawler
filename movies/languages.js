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
      allowNull: false,
    },
  }, {});
  Languages.associate = (models) => {
    Languages.belongsToMany(models.Movies, {
      through: 'movie_languages',
      foreignKey: 'language_id',
      onDelete: 'CASCADE',
    });
  };
  return Languages;
};
