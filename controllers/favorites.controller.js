const Favorite = require('../models/Favorite.model');
const Sport = require('../models/Sport.model');

// Controller function to add a sport to favorites
const addSportToFavorites = async (sportId, userId) => {
  try {
    const sport = await Sport.findById(sportId);
    if (!sport) {
      throw new Error('Sport not found');
    }

    const favorite = new Favorite({ sport: sportId, user: userId });
    await favorite.save();

    return favorite;
  } catch (error) {
    throw new Error('Error adding sport to favorites');
  }
};

// Controller function to add a comment to a favorite sport
const addCommentToFavorite = async (favoriteId, comment) => {
  try {
    const favorite = await Favorite.findByIdAndUpdate(favoriteId, { comment }, { new: true });

    if (!favorite) {
      throw new Error('Favorite not found');
    }

    return favorite;
  } catch (error) {
    throw new Error('Error adding comment to favorite');
  }
};

// Controller function to add a restaurant to a favorite sport
const addRestaurantToFavorite = async (favoriteId, restaurant) => {
  try {
    const favorite = await Favorite.findByIdAndUpdate(favoriteId, { restaurant }, { new: true });

    if (!favorite) {
      throw new Error('Favorite not found');
    }

    return favorite;
  } catch (error) {
    throw new Error('Error adding restaurant to favorite');
  }
};

module.exports = {
  addSportToFavorites,
  addCommentToFavorite,
  addRestaurantToFavorite,
};
