// server.js
const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(express.json()); // Para analisar JSON no corpo da requisição

// Rotas
app.use('/api/auth', authRoutes);



// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
