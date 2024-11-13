<<<<<<< HEAD
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
=======
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  cep: { type: String, required: true },
  logradouro: { type: String, required: true },
  numero: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  cnhPhoto: { type: String, required: true }, // URL da foto da CNH
  userPhoto: { type: String, required: true }, // URL da foto do usuário
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['motorista', 'passageiro'], default: 'passageiro' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
