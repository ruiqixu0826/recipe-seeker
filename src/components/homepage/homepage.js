import React, { useState, useEffect } from 'react';
import savedRecipes from '../../util/recipes';
import RecipeCard from '../recipeCard/recipeCard.js';
import SearchBar from '../searchBar/searchBar.js';

const Homepage = () => {
  localStorage.setItem("advSearch", JSON.stringify(false));
  localStorage.setItem("searchTerm", "");
  localStorage.setItem("maxTime", "45");
  localStorage.setItem("preferences", JSON.stringify({
    glutenFree: false,
    lactoseFree: false,
    vegan: false,
    ovoVegetarian: false,
    vegetarian: false,
  }));
  const [recipes, setRecipes] = useState([]);
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
  const API_ENDPOINT = 'https://api.spoonacular.com/recipes/random?number=5'; // Fetching 5 random recipes as an example

  useEffect(() => {
    //COMMENTED TO PREVENT API CALLS
    // fetch(`${API_ENDPOINT}&apiKey=${API_KEY}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setRecipes(data.recipes);
    //     console.log(data); 
    //   })
    //   .catch(error => {
    //     console.error('Error fetching random recipes:', error);
    //   });
    setRecipes(savedRecipes);
  }, []); // Empty dependency array to run this effect only once on mount

  return (
    <>
    <div>
      <SearchBar />
      <div className='container mt-5'>
      <h1>Today's Recommendations</h1>
        <div className='row g-4 mt-2'>
        {recipes.map(recipe => (
            <>
            <div className='col-4 d-flex'>
              <RecipeCard key={recipe.id} recipe={recipe} detail={true}/>
            </div>
            </>
          ))}
          </div>
      </div>
    </div>
    </>
    
  );
}

export default Homepage;
