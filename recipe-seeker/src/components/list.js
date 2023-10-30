import React, { useState, useEffect } from 'react';

function List() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const API_ENDPOINT = 'https://api.spoonacular.com/recipes'; // Example endpoint

  useEffect(() => {
    fetch(`${API_ENDPOINT}?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.results); // Assuming the data structure has a 'results' property
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, [searchTerm]);

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search for recipes..." 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
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

export default List;
