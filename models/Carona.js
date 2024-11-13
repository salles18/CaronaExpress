// models/Carona.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // seu arquivo de configuração do Sequelize

const Carona = sequelize.define('Carona', {
  cidadeInicial: DataTypes.STRING,
  cidadeDestino: DataTypes.STRING,
  data: DataTypes.DATE,
  horarioPartida: DataTypes.TIME,
  estimativaChegada: DataTypes.TIME,
  valor: DataTypes.DECIMAL,
  quantidadeVagas: DataTypes.INTEGER,
  modeloVeiculo: DataTypes.STRING,
  marca: DataTypes.STRING,
  ano: DataTypes.INTEGER,
  placa: DataTypes.STRING,
  fotosVeiculo: DataTypes.STRING,
  documentoVeiculo: DataTypes.STRING,
  permiteAnimais: DataTypes.BOOLEAN,
  motoristaId: DataTypes.INTEGER,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'disponivel',
  },
  passageiroId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Carona;
