const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer'); // Importar o multer
const path = require('path'); // Importar o módulo path
const fs = require('fs'); // Importar o módulo fs
const User = require('../models/User.model');
const { isAuthenticated } = require('../middlewares/jwt.middleware');

const router = express.Router();

// Criar o diretório 'uploads' se não existir
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configurar o multer para fazer o upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // O caminho onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    // Definir o nome do arquivo como um UUID + a extensão original do arquivo
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Defina as rotas aqui
router.get('/all', isAuthenticated, async (req, res) => {
  res.json("Hello from /user route");
});

// Exporte o router
module.exports = router;

// GET route to get all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

router.post('/signup', upload.single('profilePicture'), async (req, res) => {
  const payload = req.body;
  console.log("Payload received:", payload);

  if (!payload.password) {
    return res.status(400).json({ error: "Password is required" });
  }

  // Remova qualquer campo "_id" presente no payload
  delete payload._id;

  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(payload.password, salt);

  try {
    const newUser = {
      userName: payload.userName,
      email: payload.email,
      password: passwordHash,
      image: req.file ? req.file.path : null, // Salva o caminho da imagem no banco de dados (se estiver presente)
    };

    await User.create(newUser);
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

/* POST route to login */
router.post('/login', async (req, res) => {
  const payload = req.body; 

  try {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(payload.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: '1d', // Token expires in 1 day
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error during login' });
  }
});

module.exports = router;
