import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
  const API_ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information`;
  const [successMsg, setSuccessMsg] = useState('');
  useEffect(() => {
    fetch(`${API_ENDPOINT}?apiKey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => {
        console.error("Error fetching recipe details:", error);
      });
  }, [id]);

  const addToFavorites = () => {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (currentFavorites.some(favorite => favorite.id === recipe.id)) {
      setSuccessMsg('Recipe is already in favorites.');
    } else {
      const updatedFavorites = [...currentFavorites, recipe];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setSuccessMsg('Recipe added to favorites successfully.');
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000); // Hide the success message after 3 seconds
    }
  };

  if (!recipe)
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container py-5">
      <button onClick={addToFavorites} className="btn btn-success">
        Add to Favorites
      </button>
      {successMsg && (
        <div className="alert alert-success mt-2" role="alert">
          {successMsg}
        </div>
      )}
      <h2 className="text-center mb-4">{recipe.title}</h2>
      <div className="row justify-content-center mb-4">
        <div className="col-lg-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="img-fluid rounded"
          />
        </div>
      </div>
      <section className="mb-5">
        <h3>Details:</h3>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
        <p>
          <strong>Ready In:</strong> {recipe.readyInMinutes} minutes
        </p>
        <p>
          <strong>Source:</strong>{" "}
          <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
            {recipe.sourceName}
          </a>
        </p>
        <p>
          <strong>Health Score:</strong> {recipe.healthScore}
        </p>
        <p>
          <strong>Price Per Serving:</strong> $
          {recipe.pricePerServing.toFixed(2)}
        </p>
      </section>

      <section className="mb-5">
        <h3>Ingredients:</h3>
        <ul className="list-unstyled">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id} className="mb-2">
              {ingredient.original}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-5">
        <h3>Instructions:</h3>
        {recipe.instructions ? (
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        ) : (
          <p>No instructions provided.</p>
        )}
      </section>

      <section className="mb-5">
        <h3>Wine Pairing:</h3>
        <p>{recipe.winePairing.pairingText}</p>
        {recipe.winePairing.productMatches &&
          recipe.winePairing.productMatches.length > 0 && (
            <div className="card">
              <h4 className="card-header">Suggested Wine:</h4>
              <img
                src={recipe.winePairing.productMatches[0].imageUrl}
                alt={recipe.winePairing.productMatches[0].title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {recipe.winePairing.productMatches[0].title}
                </h5>
                <p className="card-text">
                  {recipe.winePairing.productMatches[0].description}
                </p>
                <p className="card-text">
                  Price: {recipe.winePairing.productMatches[0].price}
                </p>
                <a
                  href={recipe.winePairing.productMatches[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Buy Now
                </a>
              </div>
            </div>
          )}
      </section>
    </div>
  );
};

export default RecipeDetail;
