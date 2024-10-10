// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuário
const register = async (req, res) => {
  const { name, phone, cep, logradouro, numero, bairro, cidade, email, cnhPhoto, userPhoto, username, password, role } = req.body;

  if (!name || !phone || !cep || !logradouro || !numero || !bairro || !cidade || !email || !cnhPhoto || !userPhoto || !username || !password || !role) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha
    const newUser = new User({
      name,
      phone,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      email,
      cnhPhoto,
      userPhoto,
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

// Login de usuário
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gerar token
    const token = jwt.sign({ id: user._id, role: user.role }, 'secrect_key', {
      expiresIn: '1h',
    });

    // Retornar o token e o role do usuário
    res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      role: user.role, // Adicionando o role à resposta
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login', error });
  }
};

module.exports = {
  register,
  login,
};
