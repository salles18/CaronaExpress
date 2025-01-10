const express = require('express');
const { cadastrarCarona, listarCaronas, pegarCarona, listarCaronasMotorista } = require('../controllers/caronaController');
const autenticarUsuario = require('../middleware/authMiddleware'); // Middleware de autenticação
const router = express.Router();
const Carona = require('../models/Carona'); 

const { listarCaronasPorPassageiro } = require('../controllers/caronaController');





// Rota para deletar carona (rota protegida)
router.delete('/caronas/:id', autenticarUsuario, async (req, res) => {
  try {
    const { id } = req.params;
    const carona = await Carona.findByPk(id); // Busca a carona pelo ID usando Sequelize

    if (!carona) {
      return res.status(404).json({ message: 'Carona não encontrada' });
    }

    await carona.destroy(); // Deleta a carona usando Sequelize
    res.status(200).json({ message: 'Carona deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar carona:', error);
    res.status(500).json({ message: 'Erro ao deletar carona' });
  }
});

// Rota para cadastrar carona (rota protegida)
router.post('/caronas', autenticarUsuario, async (req, res) => {
  try {
    await cadastrarCarona(req, res); // Chama o controlador para cadastrar a carona
  } catch (error) {
    console.error('Erro ao cadastrar carona:', error);
    res.status(500).json({ message: 'Erro ao cadastrar carona' });
  }
});

// Rota para pegar carona (rota protegida)
router.post('/carona/:id/pegar', autenticarUsuario, async (req, res) => {
  try {
    await pegarCarona(req, res); // Chama o controlador para pegar a carona
  } catch (error) {
    console.error('Erro ao pegar carona:', error);
    res.status(500).json({ message: 'Erro ao pegar carona' });
  }
});

// Rota pública para listar caronas (não protegida)
router.get('/caronas', autenticarUsuario, listarCaronas, async (req, res) => {
  try {
    await listarCaronas(req, res); // Chama o controlador para listar caronas
  } catch (error) {
    console.error('Erro ao listar caronas:', error);
    res.status(500).json({ message: 'Erro ao listar caronas' });
  }
});

router.get('/motorista/caronas', autenticarUsuario, listarCaronasMotorista, async (req, res) => {
  try {
    await listarCaronas(req, res); // Chama o controlador para listar caronas
  } catch (error) {
    console.error('Erro ao listar caronas:', error);
    res.status(500).json({ message: 'Erro ao listar caronas' });
  }
});

router.get('/caronas/minhas-caronas/:passageiroId', autenticarUsuario, listarCaronasPorPassageiro);


module.exports = router;
