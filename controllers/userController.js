const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cria um novo usuário
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se o arquivo foi enviado
    let profilePicture = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'user_profiles',
      });
      profilePicture = result.secure_url;
    }

    // Criar o usuário
    const user = new User({
      name,
      email,
      password,
      profilePicture,
    });
    await user.save();

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Listar todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Busca todos os usuários no MongoDB
    res.status(200).json(users); // Retorna a lista de usuários
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

module.exports = { createUser, getAllUsers };
