// src/routes/profileRoute.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const autenticarUsuario = require('../middleware/authMiddleware'); // Middleware de autenticação

// Rota para obter o perfil do usuário autenticado
router.get('/', autenticarUsuario, getUserProfile); // Aplica o middleware de autenticação

// Rota para atualizar o perfil do usuário autenticado
router.put('/', autenticarUsuario, updateUserProfile); // Aplica o middleware de autenticação

module.exports = router;
