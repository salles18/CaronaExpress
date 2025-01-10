const Carona = require('../models/Carona');
const User = require('../models/User');
const { Op } = require('sequelize');

// Função para cadastrar uma carona
const cadastrarCarona = async (req, res) => {
  try {
    const {
      cidadeInicial,
      cidadeDestino,
      data,
      horarioPartida,
      estimativaChegada,
      valor,
      quantidadeVagas,
      modeloVeiculo,
      marca,
      ano,
      placa,
      fotosVeiculo,
      documentoVeiculo,
      permiteAnimais,
      passageiroId,
    } = req.body;

    const motoristaId = req.user.id; // ID do motorista autenticado
    if (!motoristaId) {
      return res.status(401).json({ message: 'Usuário não autenticado ou ID do motorista não fornecido' });
    }

    // Verificação de campos obrigatórios
    if (!cidadeInicial) return res.status(400).json({ message: 'Cidade Inicial é obrigatória' });
    if (!cidadeDestino) return res.status(400).json({ message: 'Cidade Destino é obrigatória' });
    if (!data) return res.status(400).json({ message: 'Data é obrigatória' });
    if (!horarioPartida) return res.status(400).json({ message: 'Horário de Partida é obrigatório' });
    if (!valor) return res.status(400).json({ message: 'Valor é obrigatório' });
    if (!quantidadeVagas) return res.status(400).json({ message: 'Quantidade de Vagas é obrigatória' });

    // Criar nova carona
    const novaCarona = await Carona.create({
      cidadeInicial,
      cidadeDestino,
      data,
      horarioPartida,
      estimativaChegada,
      valor,
      quantidadeVagas,
      modeloVeiculo,
      marca,
      ano,
      placa,
      fotosVeiculo,
      documentoVeiculo,
      permiteAnimais,
      motoristaId,
      passageiroId,
      status: 'disponivel', // Define status inicial como disponível
    });

    res.status(201).json(novaCarona);
  } catch (error) {
    console.error('Erro ao cadastrar carona:', error);
    res.status(500).json({ message: 'Erro ao cadastrar carona' });
  }
};

// Função para listar caronas
const listarCaronas = async (req, res) => {
  try {
    const whereClause = {};
    const motoristaId = req.user?.id;

    if (!motoristaId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    const { cidadeInicial, cidadeDestino, data } = req.query;
    
    
    const filtros = {};
    if (cidadeInicial) filtros.cidadeInicial = { [Op.like]: `%${cidadeInicial}%` }; // Filtro com "contém"
    if (cidadeDestino) filtros.cidadeDestino = { [Op.like]: `%${cidadeDestino}%` }; // Filtro com "contém"
    if (data) {
      // Convertendo a data para o formato de início e fim do dia (sem considerar a hora, se necessário)
      const startDate = new Date(data);
      const endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999); // Define o final do dia, para a comparação correta

      whereClause.data = {
        [Op.between]: [startDate, endDate], // Compara a data dentro do intervalo de todo o dia
      };
    } 

    console.log(req.query);
    
    // Busca no banco de dados com filtros
    const caronas = await Carona.findAll({
      where: { ...filtros, status: 'disponivel',  ...whereClause }, // Adiciona o status 'disponível' como padrão
      include: [
        {
          model: User,
          as: 'motorista',
          attributes: ['name'], // Retorna apenas o nome do motorista
        },
      ],
    });

    
    res.status(200).json(caronas);
  } catch (error) {
    console.error('Erro ao listar caronas:', error);
    res.status(500).json({ message: 'Erro ao listar caronas' });
  }
};

// Listar caronas (para motoristas, filtro por motoristaId)
const listarCaronasMotorista = async (req, res) => {
  try {
    const motoristaId = req.user?.id;

    if (!motoristaId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { cidadeInicial, cidadeDestino, data } = req.query;

    const filtros = { motoristaId };
    if (cidadeInicial) filtros.cidadeInicial = cidadeInicial;
    if (cidadeDestino) filtros.cidadeDestino = cidadeDestino;
    if (data) filtros.data = data;

    const caronas = await Carona.findAll({
      where: filtros,
      include: [
        {
          model: User,
          as: 'motorista',
          attributes: ['name'], // Pega apenas o nome do motorista
        },
      ],
    });

    res.status(200).json(caronas);
  } catch (error) {
    console.error('Erro ao listar caronas:', error);
    res.status(500).json({ message: 'Erro ao listar caronas' });
  }
};


// Função para pegar uma carona
const pegarCarona = async (req, res) => {
  const { id } = req.params;
  const { passageiroId } = req.body;

  console.log('Carona ID recebido:', id);
  console.log('Passageiro ID recebido:', passageiroId);

  if (!passageiroId) {
    return res.status(400).json({ message: 'ID do passageiro é obrigatório' });
  }

  try {
    const carona = await Carona.findByPk(id, {
      include: [{ model: User, as: 'motorista', attributes: ['name', 'phone'] }],
    });

    if (!carona) {
      return res.status(404).json({ message: 'Carona não encontrada' });
    }

    if (carona.status !== 'disponivel') {
      return res.status(400).json({ message: 'Carona não está disponível' });
    }

    carona.passageiroId = passageiroId;
    carona.status = 'ocupado';
    await carona.save();

    return res.status(200).json({
      message: 'Carona reservada com sucesso!',
      numeroMotorista: carona.motorista ? carona.motorista.phone : null,
      motorista: carona.motorista,
    });
  } catch (error) {
    console.error('Erro ao reservar carona:', error);
    return res.status(500).json({ message: 'Erro interno ao pegar carona' });
  }
};

const listarCaronasPorPassageiro = async (req, res) => {
  try {
    const passageiroId = req.user?.id;

    if (!passageiroId) {
      return res.status(400).json({ message: 'ID do passageiro é obrigatório.' });
    }

    // Busca as caronas onde o passageiroId corresponde
    const caronasReservadas = await Carona.findAll({
      where: { passageiroId },
      include: [
        {
          model: User,
          as: 'motorista',
          attributes: ['name', 'phone'], // Ajuste os atributos conforme necessário
        },
      ],
    });

    if (!caronasReservadas.length) {
      return res.status(404).json({ message: 'Nenhuma carona reservada encontrada.' });
    }

    res.status(200).json(caronasReservadas);
  } catch (error) {
    console.error('Erro ao buscar caronas reservadas:', error.message);
    res.status(500).json({ message: 'Erro interno ao buscar caronas reservadas.' });
  }
};






module.exports = { cadastrarCarona, listarCaronas, pegarCarona, listarCaronasMotorista, listarCaronasPorPassageiro, };
