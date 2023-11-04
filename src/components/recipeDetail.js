import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
  const API_ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information`;


  useEffect(() => {
    fetch(`${API_ENDPOINT}?apiKey=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setRecipe(data);
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
      });
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <section>
        <h3>Details:</h3>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Ready In:</strong> {recipe.readyInMinutes} minutes</p>
        <p><strong>Source:</strong> <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">{recipe.sourceName}</a></p>
        <p><strong>Health Score:</strong> {recipe.healthScore}</p>
        <p><strong>Price Per Serving:</strong> ${recipe.pricePerServing.toFixed(2)}</p>
      </section>

      <section>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.extendedIngredients.map(ingredient => (
            <li key={ingredient.id}>
              {ingredient.original}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Instructions:</h3>
        {recipe.instructions ? <p>{recipe.instructions}</p> : <p>No instructions provided.</p>}
      </section>

      <section>
        <h3>Wine Pairing:</h3>
        <p>{recipe.winePairing.pairingText}</p>
        {recipe.winePairing.productMatches && recipe.winePairing.productMatches.length > 0 && (
          <div>
            <h4>Suggested Wine:</h4>
            <img src={recipe.winePairing.productMatches[0].imageUrl} alt={recipe.winePairing.productMatches[0].title} />
            <p><strong>{recipe.winePairing.productMatches[0].title}</strong></p>
            <p>{recipe.winePairing.productMatches[0].description}</p>
            <p>Price: {recipe.winePairing.productMatches[0].price}</p>
            <a href={recipe.winePairing.productMatches[0].link} target="_blank" rel="noopener noreferrer">Buy Now</a>
          </div>
        )}
      </section>
    </div>
  );
}

export default RecipeDetail;
