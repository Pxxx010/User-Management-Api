require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware para JSON
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/users', userRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
