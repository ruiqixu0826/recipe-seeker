import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const API_KEY = '04d86eddb54646d5809613a629d0b140';
  const API_ENDPOINT = 'https://api.spoonacular.com/recipes/random?number=5'; // Fetching 5 random recipes as an example

  useEffect(() => {
    fetch(`${API_ENDPOINT}&apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes); 
      })
      .catch(error => {
        console.error('Error fetching random recipes:', error);
      });
  }, []); // Empty dependency array to run this effect only once on mount

  return (
    <div>
      <h1>Today's Recommendations</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
