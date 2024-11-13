<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const caronaRoutes = require('./routes/caronaRoutes');
const sequelize = require('./config/database'); // Importe a configuração do Sequelize

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware para CORS e JSON no corpo da requisição
app.use(cors());
app.use(express.json());

// Configuração do Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Função de notificação para motoristas
function sendNotificationToDriver(driverId, message) {
  io.to(driverId).emit('notification', message);
}

// Rotas da aplicação
app.use('/api/auth', authRoutes);       // Rotas de autenticação
app.use('/api', caronaRoutes);          // Rotas de caronas
app.use('/api/user', profileRoutes);    // Rotas de perfil de usuário

// Sincronização dos modelos com o banco de dados e início do servidor
const PORT = process.env.PORT || 5000;
sequelize.sync()  // Sincroniza todos os modelos
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso.');
    server.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
=======
// server.js
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Conectar ao MongoDB
connectDB();
app.use(cors());

// Middleware
app.use(express.json()); // Para analisar JSON no corpo da requisição

// Rotas
app.use('/api/auth', authRoutes);



// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
>>>>>>> 62c99446c5639ecc3aa302057853eddf260aceec
