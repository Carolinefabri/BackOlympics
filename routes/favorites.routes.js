const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite.model');

// Route to get all favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting favorites' });
  }
});

// Route to create a new favorite with a comment

// Route to create a favorite
router.post('/', async (req, res) => {
  try {
    const {  comment, gameDate } = req.body; // Add 'gameDate' to destructuring

    // Create a new favorite entry with the comment and game date
    const newFavorite = new Favorite({
      
      comments: [
        {
          text: comment,
          date: gameDate, // Use the provided 'gameDate'
        },
      ],
    });

    // Save the favorite entry to the database
    await newFavorite.save();

  // Log the created favorite object to the console
  console.log('Created favorite:',newFavorite);

    res.status(201).json(newFavorite);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating favorite' });
  }
});

// Route to add a new comment to a favorite
router.post('/:id/comments', async (req, res) => {
  try {
    const { comment, gameDate } = req.body;
    const favoriteId = req.params.id;

    // Verificar se todas as informações necessárias estão presentes na requisição
    if (!comment || !gameDate) {
      return res.status(400).json({ error: 'Missing required information' });
    }

    // Encontrar o favorito pelo ID
    const favorite = await Favorite.findById(favoriteId);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    // Adicionar um novo comentário ao favorito
    favorite.comments.push({
      text: comment,
      date: gameDate,
    });

    // Salvar as alterações no banco de dados
    await favorite.save();

    res.json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding comment to favorite' });
  }
});

// Route to update a comment in a favorite
router.put('/:favoriteId/comments/:commentId', async (req, res) => {
  try {
    const { comment, gameDate } = req.body;
    const { favoriteId, commentId } = req.params;

    // Verificar se todas as informações necessárias estão presentes na requisição
    if (!comment || !gameDate) {
      return res.status(400).json({ error: 'Missing required information' });
    }

    // Encontrar o favorito pelo ID
    const favorite = await Favorite.findById(favoriteId);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    // Encontrar o comentário pelo ID no favorito
    const commentIndex = favorite.comments.findIndex((c) => c._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Atualizar o comentário no favorito
    favorite.comments[commentIndex].text = comment;
    favorite.comments[commentIndex].date = gameDate;

    // Salvar as alterações no banco de dados
    await favorite.save();

    res.json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating comment in favorite' });
  }
});

// Route to delete a comment from a favorite
router.delete('/:favoriteId/comments/:commentId', async (req, res) => {
  try {
    const { favoriteId, commentId } = req.params;

    // Encontrar o favorito pelo ID
    const favorite = await Favorite.findById(favoriteId);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    // Encontrar o comentário pelo ID no favorito
    const commentIndex = favorite.comments.findIndex((c) => c._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Remover o comentário do favorito
    favorite.comments.splice(commentIndex, 1);

    // Salvar as alterações no banco de dados
    await favorite.save();

    res.json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting comment from favorite' });
  }
});

module.exports = router;
