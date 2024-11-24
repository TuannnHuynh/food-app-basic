import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

const Home = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Navbar must be used within a GlobalState provider");
  }
  const { recipeList, loading } = context;

  if (loading)
    return (
      <div className="text-center text-xl lg:text-4xl">
        Loading... Please wait!
      </div>
    );
  return (
    <div className="container mx-auto flex flex-wrap justify-center gap-10 py-8">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((val) => <RecipeItem item={val} />)
      ) : (
        <div>
          <p className="text-center text-xl lg:text-4xl">
            Nothing to show. Please search something...
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
