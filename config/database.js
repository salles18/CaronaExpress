// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('carona_express', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Desativar logs de SQL no console (opcional)
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

module.exports = sequelize;
