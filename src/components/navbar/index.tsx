import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

const Narbar = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("Navbar must be used within a GlobalState provider");
  }
  const { searchParam, setSearchParam, handleSubmit } = context;

  return (
    <nav className="container mx-auto flex flex-col items-center justify-between gap-5 py-8 lg:flex-row lg:gap-0">
      <h2 className="text-2xl font-semibold">
        <NavLink to={"/"}>FoodRecipe</NavLink>
      </h2>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Enter your search..."
          className="rounded-full bg-white/75 p-3 px-8 shadow-lg shadow-gray-200 outline-none focus:shadow-gray-300 lg:w-96"
        />
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-black duration-300 hover:text-gray-700"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favorites"}
            className="text-black duration-300 hover:text-gray-700"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Narbar;
