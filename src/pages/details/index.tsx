import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import axios from "axios";

const Details = () => {
  const { id } = useParams(); // get id
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Navbar must be used within a GlobalState provider");
  }
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    handleAddToFavorites,
    favoritesList,
  } = context;

  useEffect(() => {
    const getRecipeDetails = async () => {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`,
      );
      const data = res.data.data;
      if (data) {
        setRecipeDetailsData(data.recipe);
      }
    };
    getRecipeDetails();
  }, []);
  return (
    <div className="container mx-auto grid grid-cols-1 gap-10 py-10 lg:grid-cols-2">
      <div className="row-start-2 lg:row-start-auto">
        <div className="group h-96 overflow-hidden rounded-xl">
          <img
            src={recipeDetailsData?.image_url}
            className="block h-full w-full object-cover duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-cyan-700">
          {recipeDetailsData?.publisher}
        </span>
        <h3 className="truncate text-2xl font-bold text-black">
          {recipeDetailsData?.title}
        </h3>
        <div>
          <button
            onClick={() => handleAddToFavorites(recipeDetailsData!)}
            className="mt-3 inline-block rounded-lg bg-black p-3 px-8 text-sm font-medium uppercase tracking-wider text-white shadow-sm"
          >
            {favoritesList &&
            favoritesList.length > 0 &&
            favoritesList.findIndex(
              (item) => item.id === recipeDetailsData?.id,
            ) !== -1
              ? "Remove from favorites"
              : "Add to favorites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.ingredients.map((ingredient, idx) => (
              <li key={idx}>
                <span className="text-2xl font-semibold text-black">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-2xl font-semibold text-black">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
