// favorites.routes.js

const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite.model");
const User = require("../models/User.model");
const Sport = require("../models/Sport.model");
const mongoose = require("mongoose");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userFavorites = await Favorite.find({ user: userId }).populate(
      "sport"
    );
    console.log(userFavorites);
    res.json(userFavorites);
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all favorites

router.get("/:id/addfavorite/:userId", async (req, res) => {
  const { id, userId } = req.params;
  console.log("tentando ", id, userId);
  try {
    const sports = await Sport.findOne({ id: id });
    const updateFavorite = await Favorite.create({
      user: userId,
      sport: sports,
    });
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $push: { favorites: updateFavorite } },
      { new: true }
    );

    res.status(202).json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting favorites" });
  }
});

// Rota para obter todos os esportes favoritos de um usuário
router.get("/:userId/favorites", async (req, res) => {
  const { userId } = req.params;

  try {
    // Encontre o usuário pelo ID
    const user = await User.findById(userId).populate("favorites"); // Popule o campo 'favorites' com os dados completos dos esportes

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // A lista de esportes favoritos estará no campo 'favorites' do usuário
    const favoriteSports = user.favorites;

    res.json(favoriteSports);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erro ao obter os esportes favoritos do usuário" });
  }
});

// Route to add a favorite
router.post("/", async (req, res) => {
  try {
    const { sportId, comment, gameDate } = req.body;

    // Find the sport by ID or name
    const sport = await Sport.findOne().or([
      { _id: sportId },
      { name: sportId },
    ]);

    if (!sport) {
      return res.status(404).json({ error: "Esporte não encontrado" });
    }

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

    await newFavorite.save();

    res.status(201).json(newFavorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar favorito" });
  }
});

// Rota para adicionar um comentário a um esporte favorito

router.post("/:favoriteId/comments", async (req, res) => {
  const { favoriteId } = req.params;
  const { text } = req.body;

  try {
    // Verifique se o favoriteId é uma string válida de ObjectId
    if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
      return res.status(400).json({ error: "ID inválido do esporte favorito" });
    }

    // Converta o favoriteId em um ObjectId
    const favoriteObjectId = new mongoose.Types.ObjectId(favoriteId);

    // Encontre o esporte favorito pelo ID
    const favorite = await Favorite.findById(favoriteObjectId);

    if (!favorite) {
      return res.status(404).json({ error: "Esporte favorito não encontrado" });
    }

    // Adicione o comentário ao esporte favorito
    favorite.comments.push({ text });
    await favorite.save();

    res.status(201).json(favorite.comments[favorite.comments.length - 1]);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Erro ao adicionar comentário" });
  }
});

// Rota para deletar um esporte favorito
router.delete("/:favoriteId/removefavorite/:userId", async (req, res) => {
  const { favoriteId, userId } = req.params;

  try {
    // Verifique se o esporte favorito existe e pertence ao usuário
    const favorite = await Favorite.findOneAndDelete({
      _id: favoriteId,
      user: userId,
    });

    if (!favorite) {
      return res.status(404).json({ error: "Esporte favorito não encontrado" });
    }

    // Remova o esporte favorito da lista de favoritos do usuário
    await User.findByIdAndUpdate(userId, { $pull: { favorites: favoriteId } });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover esporte favorito" });
  }
});

module.exports = router;
