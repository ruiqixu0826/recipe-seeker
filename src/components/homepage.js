import React, { useState, useEffect } from 'react';
import Search from './search';

function Homepage() {
  const [recipes, setRecipes] = useState([]);
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
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
      <button> <a href="/search">Search Recipes</a></button>
      <h1>Today's Recommendations</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h2><a href={`/recipe/${recipe.id}`}>{recipe.title}</a></h2>
            <img src={recipe.image} alt={recipe.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
