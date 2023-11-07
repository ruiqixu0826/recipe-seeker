import "./recipeCard.css";

const RecipeCard = ({ recipe, detail }) => {
  return (
    <>
      <div className="card">
        <img
          className="mb-2 rounded-top"
          src={recipe.image}
          alt={recipe.title}
        ></img>
        <strong className="fs-5 px-2">{recipe.title}</strong>
        {detail ? (
        <div className="row mx-0 p-2">
          <div className="col">
            <div className="row fw-bold text-uppercase detail-label">
              Ready In
            </div>
            <div className="row">{recipe.readyInMinutes} minutes</div>
          </div>
          <div className="col">
            <div className="row fw-bold text-uppercase detail-label">
              Price Per Serving:
            </div>
            <div className="row">
              ${(recipe.pricePerServing / 100).toFixed(2)}
            </div>
          </div>
        </div>
        ): null}
        <a href={`/recipe/${recipe.id}`} className="stretched-link"></a>
      </div>
    </>
  );
};

export default RecipeCard;
