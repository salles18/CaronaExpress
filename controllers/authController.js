// controllers/authController.js
<<<<<<< HEAD

=======
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuário
const register = async (req, res) => {
<<<<<<< HEAD
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
=======
  const { name, phone, cep, logradouro, numero, bairro, cidade, email, cnhPhoto, userPhoto, username, password, role } = req.body;

  if (!name || !phone || !cep || !logradouro || !numero || !bairro || !cidade || !email || !cnhPhoto || !userPhoto || !username || !password || !role) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha
    const newUser = new User({
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
      name,
      phone,
      cep,
      logradouro,
<<<<<<< HEAD
=======
      numero,
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
      bairro,
      cidade,
      email,
      cnhPhoto,
      userPhoto,
<<<<<<< HEAD
=======
      username,
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
      password: hashedPassword,
      role,
    });

<<<<<<< HEAD
    // Gerar token após o registro
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, 'secrect_key', {
      expiresIn: '10h',
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso', token });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
=======
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
};

<<<<<<< HEAD
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
=======
// Login de usuário
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
  }

  try {
    const user = await User.findOne({ username });
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

<<<<<<< HEAD
    // Verifica a senha
    const isMatch = await bcrypt.compare(senha, user.password);
=======
    const isMatch = await bcrypt.compare(password, user.password);
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gerar token
<<<<<<< HEAD
    const token = jwt.sign({ id: user.id, role: user.role }, 'secrect_key', {
      expiresIn: '10h',
=======
    const token = jwt.sign({ id: user._id, role: user.role }, 'secrect_key', {
      expiresIn: '1h',
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
    });

    // Retornar o token e o role do usuário
    res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
<<<<<<< HEAD
      role: user.role,
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
=======
      role: user.role, // Adicionando o role à resposta
    });
  } catch (error) {
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
    res.status(500).json({ message: 'Erro ao realizar login', error });
  }
};

module.exports = {
  register,
  login,
};
