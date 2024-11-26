const express = require('express');
const multer = require('multer');
const { createUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

// Configuração do multer para uploads
const upload = multer({ dest: 'uploads/' });

// Rota para criar usuário (aceita upload de foto)
router.post('/', upload.single('profilePicture'), createUser);

// Rota para listar todos os usuários
router.get('/', getAllUsers);

module.exports = router;
