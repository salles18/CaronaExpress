const Carona = require('../models/Carona');

// Função para cadastrar uma carona
const cadastrarCarona = async (req, res) => {
  try {
    // Extrair dados do body da requisição
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
      motoristaId,
      passageiroid,
    } = req.body;

    // Log para verificação dos dados
    console.log('Dados recebidos no req.body:', req.body);

    // Verificação de campos obrigatórios com mensagens específicas
    if (!cidadeInicial) return res.status(400).json({ message: 'Cidade Inicial é obrigatória' });
    if (!cidadeDestino) return res.status(400).json({ message: 'Cidade Destino é obrigatória' });
    if (!data) return res.status(400).json({ message: 'Data é obrigatória' });
    if (!horarioPartida) return res.status(400).json({ message: 'Horário de Partida é obrigatório' });
    if (!valor) return res.status(400).json({ message: 'Valor é obrigatório' });
    if (!quantidadeVagas) return res.status(400).json({ message: 'Quantidade de Vagas é obrigatória' });
    if (!motoristaId) return res.status(400).json({ message: 'Motorista ID é obrigatório' });

    // Criar nova carona com todos os campos
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
      passageiroid,
      status: 'disponivel' // Define status inicial como disponível
    });

    // Retornar a carona completa no response
    res.status(201).json(novaCarona);
  } catch (error) {
    console.error('Erro ao cadastrar carona:', error);
    res.status(500).json({ message: 'Erro ao cadastrar carona' });
  }
};

// Função para listar caronas
const listarCaronas = async (req, res) => {
  try {
    const { cidadeInicial, cidadeDestino, data } = req.query;

    const filtros = {};
    if (cidadeInicial) filtros.cidadeInicial = cidadeInicial;
    if (cidadeDestino) filtros.cidadeDestino = cidadeDestino;
    if (data) filtros.data = data;

    const caronas = await Carona.findAll({ where: filtros });
    console.log('Caronas filtradas:', caronas); // Verifique o conteúdo das caronas
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

  try {
    // Verificar se a carona existe e está disponível
    const carona = await Carona.findByPk(id);

    if (!carona) {
      return res.status(404).json({ message: 'Carona não encontrada' });
    }

    if (carona.status !== 'disponivel') {
      return res.status(400).json({ message: 'Carona não está disponível' });
    }

    // Atualizar a carona para marcar como "ocupado" e associar o passageiro
    carona.passageiroId = passageiroId;
    carona.status = 'ocupado';
    await carona.save();

    res.status(200).json(carona);
  } catch (error) {
    console.error('Erro ao pegar carona:', error);
    res.status(500).json({ message: 'Erro ao pegar carona' });
  }
};

// Exporta as funções
module.exports = { cadastrarCarona, listarCaronas, pegarCarona };
