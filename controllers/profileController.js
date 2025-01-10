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
    const { name, phone, email, cep, logradouro, bairro, cidade, placa, modeloVeiculo } = req.body;

    

    // Atualiza os campos do usuário no banco de dados
    const [updated] = await User.update(
      { name, phone, email, cep, logradouro, bairro, cidade, placa, modeloVeiculo },
      { where: { id: userId } }
    );

    if (updated) {
      const updatedUser = await User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } });
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
};


module.exports = { getUserProfile, updateUserProfile };
