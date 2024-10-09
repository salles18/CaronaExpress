// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://jvsalles:SIEkw9gaZcM38VN8@caronaexpress.tmc3j.mongodb.net/?retryWrites=true&w=majority&appName=caronaexpress', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

module.exports = connectDB;
