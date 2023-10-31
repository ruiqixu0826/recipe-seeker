import React, { useState } from 'react';

function Search() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const API_KEY = '04d86eddb54646d5809613a629d0b140'; // Ensure you have your Spoonacular API key here
  const API_ENDPOINT = 'https://api.spoonacular.com/recipes/complexSearch';
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) { 
      fetch(`${API_ENDPOINT}?query=${searchTerm}&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          setRecipes(data.results); 
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search for recipes..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.description}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Search;
