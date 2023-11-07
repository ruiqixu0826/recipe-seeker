import React, { useState, useEffect } from 'react';
import RecipeCard from '../recipeCard/recipeCard.js'

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Remove a recipe from favorites
  const removeFavorite = (recipeId) => {
    const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Your Favorite Recipes</h1>
      <div className="favorites-container">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <div key={recipe.id} className="favorite-recipe-card">
              <RecipeCard recipe={recipe} />
              <button onClick={() => removeFavorite(recipe.id)}>
                Remove from Favorites
              </button>
            </div>
          ))
        ) : (
          <p>You have no favorite recipes.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
