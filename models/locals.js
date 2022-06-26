'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  Locals.init({
    destinatario: DataTypes.STRING,
    nomeRemetente: DataTypes.STRING,
    nomeDestinatario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Locals',
  });
  return Locals;
};