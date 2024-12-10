const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/discos_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch(err => console.error("Erro ao conectar:", err));

// Criar o esquema para os discos
const discoSchema = new mongoose.Schema({
    albumName: String,
    artistName: String,
    genre: String,
    coverUrl: String,
});

const Disco = mongoose.model('Disco', discoSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Permite comunicação entre frontend e backend

// Rota para adicionar um novo disco
app.post('/api/discos', async (req, res) => {
    try {
        const novoDisco = new Disco(req.body);
        await novoDisco.save();
        res.status(201).json({ message: "Disco adicionado com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao salvar o disco." });
    }
});

// Rota para obter todos os discos
app.get('/api/discos', async (req, res) => {
    try {
        const discos = await Disco.find();
        res.json(discos);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar os discos." });
    }
});

// Iniciar o servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
