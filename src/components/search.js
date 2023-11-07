import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './searchBar/searchBar';
import RecipeCard from './recipeCard/recipeCard';

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  const {searchTerm, maxTime, preferences } = location.state || {};
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY; // Ensure you have your Spoonacular API key here
  const API_ENDPOINT = 'https://api.spoonacular.com/recipes/complexSearch';
  useEffect(() => {
    if (searchTerm) {
      const query = new URLSearchParams({
        query: searchTerm,
        maxReadyTime: maxTime,
        diet: Object.keys(preferences).filter(preference => preferences[preference]).join(','),
        // Add additional parameters based on preferences here
      });
      fetch(`${API_ENDPOINT}?${query}&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          setRecipes(data.results || []); // Ensure the default is an empty array if results are not provided
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
        });
    }
  }, [searchTerm, maxTime, preferences, API_KEY]);

  return (
    <>
    <div>
      <SearchBar />
      <div className='container mt-5'>
      <h1>Search Results</h1>
        <div className='row g-4 mt-2'>
        {recipes.map(recipe => (
            <>
            <div className='col-4 d-flex'>
              <RecipeCard key={recipe.id} recipe={recipe}/>
            </div>
            </>
          ))}
          </div>
      </div>
    </div>
    </>
  );
}


export default Search;
