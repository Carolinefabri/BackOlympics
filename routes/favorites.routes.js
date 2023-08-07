const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite.model');
const User = require ('../models/User.model');
const Sport = require ('../models/Sport.model');



// Route to get all favorites

router.get('/:id/addfavorite/:userId', async (req, res) => {
  const { id,userId} = req.params;
  console.log("tentando ", id , userId)
  try {
    const sports= await Sport.findOne({id:id})
    const updateUser = await User.findByIdAndUpdate(userId,{$push:{favorites:sports._id}}, {new:true})
    res.status(202).json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting favorites' });
  }
});





// Rota para obter todos os esportes favoritos de um usuário
router.get('/:userId/favorites', async (req, res) => {
  const { userId } = req.params;

  try {
    // Encontre o usuário pelo ID
    const user = await User.findById(userId).populate('favorites'); // Popule o campo 'favorites' com os dados completos dos esportes

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // A lista de esportes favoritos estará no campo 'favorites' do usuário
    const favoriteSports = user.favorites;

    res.json(favoriteSports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os esportes favoritos do usuário' });
  }
});

// Route to add a favorite
router.post('/', async (req, res) => {
  try {
    const { sportId, comment, gameDate } = req.body;

    // Find the sport by ID or name
    const sport = await Sport.findOne().or([{ _id: sportId }, { name: sportId }]);

    if (!sport) {
      return res.status(404).json({ error: 'Esporte não encontrado' });
    }

    // Create a new favorite entry with the comment and game date
    const newFavorite = new Favorite({
      user: req.user._id, // Assuming you have implemented user authentication and stored the user object in req.user
      sport: sport._id,
      comments: [
        {
          text: comment,
          date: gameDate,
        },
      ],
    });

    // Save the favorite entry to the database
    await newFavorite.save();

    res.status(201).json(newFavorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar favorito' });
  }
});

// Route to add a new comment to a favorite
router.post('/:id/comments', async (req, res) => {
  try {
    const { comment, gameDate } = req.body;
    const favoriteId = req.params.id;

    // Verificar se todas as informações necessárias estão presentes na requisição
    if (!comment || !gameDate) {
      return res.status(400).json({ error: 'Informações obrigatórias faltando' });
    }

    // Encontrar o favorito pelo ID
    const favorite = await Favorite.findById(favoriteId);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorito não encontrado' });
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
    res.status(500).json({ error: 'Erro ao adicionar comentário ao favorito' });
  }
});

// Route to update a comment in a favorite
router.put('/:favoriteId/comments/:commentId', async (req, res) => {
  try {
    const { comment, gameDate } = req.body;
    const { favoriteId, commentId } = req.params;

    // Verificar se todas as informações necessárias estão presentes na requisição
    if (!comment || !gameDate) {
      return res.status(400).json({ error: 'Informações obrigatórias faltando' });
    }

    // Encontrar o favorito pelo ID
    const favorite = await Favorite.findById(favoriteId);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorito não encontrado' });
    }

    // Encontrar o comentário pelo ID no favorito
    const commentIndex = favorite.comments.findIndex((c) => c._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }

    // Atualizar o comentário no favorito
    favorite.comments[commentIndex].text = comment;
    favorite.comments[commentIndex].date = gameDate;

    // Salvar as alterações no banco de dados
    await favorite.save();

    res.json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar comentário no favorito' });
  }
});

// Route to delete a comment from a favorite
router.delete('/:favoriteId/comments/:commentId', async (req, res) => {
  try {
    const { favoriteId, commentId } = req.params;

    // Encontrar o favorito pelo ID
    const favorite = await Favorite.findById(favoriteId);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorito não encontrado' });
    }

    // Encontrar o comentário pelo ID no favorito
    const commentIndex = favorite.comments.findIndex((c) => c._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }

    // Remover o comentário do favorito
    favorite.comments.splice(commentIndex, 1);

    // Salvar as alterações no banco de dados
    await favorite.save();

    res.json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar comentário do favorito' });
  }
});

module.exports = router;
