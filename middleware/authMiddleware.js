const jwt = require('jsonwebtoken');

const autenticarUsuario = (req, res, next) => {
  const authHeader = req.headers.authorization;
  

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Token de autenticação ausente ou em formato incorreto"); // Log para depuração
    return res.status(401).json({ message: "Token de autenticação não fornecido ou em formato incorreto" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, 'secrect_key'); // Certifique-se de que esta chave é a mesma usada na criação do token
    req.user = decoded; // Popula req.user com as informações do token
    console.log("Token válido, acesso autorizado"); // Log para depuração
    next();
  } catch (error) {
    console.log("Token inválido ou expirado"); // Log para depuração
    res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = autenticarUsuario;
