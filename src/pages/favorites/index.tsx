import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

const Favorites = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Navbar must be used within a GlobalState provider");
  }
  const { favoritesList } = context;

  return (
    <div className="container mx-auto flex flex-wrap justify-center gap-10 py-8">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((val) => <RecipeItem key={val.id} item={val} />)
      ) : (
        <div>
          <p className="text-center text-xl lg:text-4xl">
            Nothing is added in favorites...
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
