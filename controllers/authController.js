// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuário
const register = async (req, res) => {
  const { name, phone, cep, logradouro, bairro, cidade, email, cnhPhoto, userPhoto, password, role } = req.body;

  // Validação dos campos obrigatórios
  if (!name || !phone || !cep || !logradouro || !bairro || !cidade || !email || !userPhoto || !password || !role) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  if (role === 'motorista' && !cnhPhoto) {
    return res.status(400).json({ message: 'Foto da CNH é obrigatória para motoristas' });
  }

  try {
    // Verificar se o email já existe
    const emailExists = await User.findOne({ where: { email } });
    
    if (emailExists) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do novo usuário
    const newUser = await User.create({
      name,
      phone,
      cep,
      logradouro,
      bairro,
      cidade,
      email,
      cnhPhoto,
      userPhoto,
      password: hashedPassword,
      role,
    });

    // Gerar token após o registro
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, 'secrect_key', {
      expiresIn: '10h',
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso', token });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

// Login de usuário (alterado para usar email)
const login = async (req, res) => {
  const { email, senha } = req.body;

  // Validação dos campos obrigatórios
  if (!email || !senha) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
  }

  try {
    // Busca o usuário pelo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verifica a senha
    const isMatch = await bcrypt.compare(senha, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gerar token
    const token = jwt.sign({ id: user.id, role: user.role }, 'secrect_key', {
      expiresIn: '10h',
    });

    // Retornar o token e o role do usuário
    res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      role: user.role,
      userId: user.id,
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao realizar login', error });
  }
};

module.exports = {
  register,
  login,
};
