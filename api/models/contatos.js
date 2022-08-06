'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contatos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contatos.init({
    foto: DataTypes.STRING,
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    data_nascimento: DataTypes.DATEONLY,
    descricao: DataTypes.TEXT,
    telefone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contatos',
  });
  return Contatos;
};