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
