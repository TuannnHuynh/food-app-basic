import { Link } from "react-router-dom";
import { TRecipeItem } from "../../context";

const RecipeItem = ({ item }: { item: TRecipeItem }) => {
  return (
    <div className="flex w-80 flex-col gap-5 overflow-hidden rounded-2xl border-2 border-white bg-white/75 p-5 shadow-xl">
      <div className="flex h-40 items-center justify-center overflow-hidden rounded-xl">
        <img src={item.image_url} alt="recipe item" className="block w-full" />
      </div>
      <div>
        <span className="text-sm font-medium text-cyan-700">
          {item.publisher}
        </span>
        <h3 className="truncate text-2xl font-bold text-black">{item.title}</h3>
        <Link
          to={`/recipe-item/${item.id}`}
          className="mt-5 inline-block rounded-lg bg-black p-3 px-8 text-sm font-medium uppercase tracking-wider text-white shadow-md"
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
};

export default RecipeItem;
