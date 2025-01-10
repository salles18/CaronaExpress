
// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importe a configuração do banco de dados

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logradouro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  cnhPhoto: {
    type: DataTypes.STRING,
    allowNull: true, // Permite nulo inicialmente
    validate: {
      isRequiredForMotorista(value) {
        // Valida se o campo é obrigatório para motoristas
        if (this.role === 'motorista' && !value) {
          throw new Error('CNH é obrigatória para motoristas');
        }
      },
    },
  },
  userPhoto: {
    type: DataTypes.STRING,
    allowNull: false, // URL da foto do usuário
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('motorista', 'passageiro'),
    defaultValue: 'passageiro',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false, // Desativar timestamps automáticos do Sequelize (usar createdAt manualmente)
});

module.exports = User;

