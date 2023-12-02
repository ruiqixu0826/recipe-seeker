import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./recipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
  const API_ENDPOINT = `https://api.spoonacular.com/recipes/${id}/information`;

  useEffect(() => {
    fetch(`${API_ENDPOINT}?apiKey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        console.log(data);
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

  if (!recipe) return <div>Loading...</div>;

  return (
    <>
      <div className="container">
        <div className="row mb-2">
          <div className="col-3">
            <img
              className="img-fluid rounded"
              src={recipe.image}
              alt={recipe.name}
            />
          </div>
          <div className="col-9">
            <button onClick={addToFavorites} className="btn btn-success">
              Add to Favorites
            </button>
            {successMsg && (
              <div className="alert alert-success mt-2" role="alert">
                {successMsg}
              </div>
            )}
            <h1>{recipe.title}</h1>
            <div className="row d-flex align-items-start">
              <div className="col">
                <label className="detail-label">SERVES</label>
                <br></br>
                <strong>{recipe.servings} People</strong>
              </div>
              <div className="col">
                <label className="detail-label">READY IN</label>
                <br></br>
                <strong>{recipe.readyInMinutes} minutes</strong>
              </div>
              <div className="col-4">
                <label className="detail-label">PRICE PER SERVING</label>
                <br></br>
                <strong>${(recipe.pricePerServing / 100).toFixed(2)}</strong>
              </div>
              <div className="col">
                <label className="detail-label">HEALTH SCORE</label>
                <br></br>
                <strong>{recipe.healthScore}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h2>Ingredients</h2>
          <ul className="ms-4">
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </div>
        <div className="row">
          <h2>Instructions</h2>
          {recipe.instructions ? (
            <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
          ) : (
            <p>No instructions provided.</p>
          )}
        </div>
        {recipe.winePairing.productMatches &&
          recipe.winePairing.productMatches.length > 0 && (
            <div className="row">
              <h2>Suggested Wine Pairing</h2>
              <div className="col-3">
                <img
                  className="img-fluid rounded"
                  src={recipe.winePairing.productMatches[0].imageUrl}
                  alt={recipe.winePairing.productMatches[0].title}
                />
              </div>
              <div className="col-9">
                <h4>{recipe.winePairing.productMatches[0].title}</h4>
                <p>
                  <strong>
                    $
                    {parseFloat(
                      recipe.winePairing.productMatches[0].price.replace(
                        "$",
                        ""
                      )
                    ).toFixed(2)}{" "}
                    on Amazon
                  </strong>
                </p>
                <p>{recipe.winePairing.productMatches[0].description}</p>
                <a
                  className="btn w-100 btn-primary rounded-pill"
                  href={recipe.winePairing.productMatches[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Now on Amazon
                </a>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default RecipeDetail;
