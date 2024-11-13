// src/controllers/profileController.js
const User = require('../models/User'); // Modelo do usuário

// Obtém as informações do usuário logado
const getUserProfile = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.id; // ID do usuário autenticado

    // Use findByPk em vez de findById
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } }); // Exclui o campo de senha
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar o perfil do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar perfil' });
  }
};

// Atualiza as informações do usuário logado
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ID do usuário autenticado
    const { name, phone, email, cep, logradouro , bairro, cidade } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, email, cep, logradouro, bairro, cidade },
      { new: true, runValidators: true }
    ).select('-password'); // Exclui o campo de senha

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
};

module.exports = { getUserProfile, updateUserProfile };
