const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Sport2Data = require ('../api/dbData.json');



// Route to get all sports with restaurant suggestions
router.get('/favorites', async (req, res) => {
  try {
console.log("esta ceeeeerto os favoritos");
    res.json(Sport2Data);
  } catch (error) {
    res.status(500).json({ error: "Error getting favorites" });
  }
});





// Rota para adicionar um esporte aos favoritos do usuário
router.post('/:userId/add', async (req, res) => {
  try {
    const userId = req.params.userId;
    const sportId = req.body.sportId; // Supondo que você está enviando o ID do esporte no corpo da requisição

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Adicione o esporte à lista de favoritos do usuário
    user.favoriteSports.push(sportId);
    await user.save();

    res.json(user.favoriteSports);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error adding favorite sport' });
  }
});

// Rota para editar os favoritos e acrescentar um comentário
router.put('/:userId/edit/:sportId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const sportId = req.params.sportId;
    const comment = req.body.comment; // Supondo que você está enviando o comentário no corpo da requisição

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verifique se o esporte está na lista de favoritos do usuário
    const index = user.favoriteSports.indexOf(sportId);
    if (index === -1) {
      return res.status(404).json({ error: 'Sport not found in favorites' });
    }

    // Acrescente o comentário ao esporte favorito
    user.favoriteSports[index].comment = comment;
    await user.save();

    res.json(user.favoriteSports);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error editing favorite sport' });
  }
});

// Rota para deletar o comentário de um esporte favorito
router.delete('/:userId/delete/:sportId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const sportId = req.params.sportId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  
    // Remova o comentário do esporte favorito
    user.favoriteSports[index].comment = undefined;
    await user.save();

    res.json(user.favoriteSports);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error deleting comment' });
  }
});



module.exports = router;
