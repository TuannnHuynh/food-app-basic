import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

type TGloblaContextProps = {
  handleAddToFavorites: (getCurrentItem: TRecipeDetails) => void;
  favoritesList: TRecipeDetails[];
  setFavoritesList: React.Dispatch<React.SetStateAction<TRecipeDetails[]>>;
  recipeList: TRecipeList;
  recipeDetailsData: TRecipeDetails | null;
  setRecipeDetailsData: React.Dispatch<
    React.SetStateAction<TRecipeDetails | null>
  >;
  loading: boolean;
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type TGloblaStateProps = {
  children: ReactNode;
};

export type TRecipeItem = {
  publisher: string;
  image_url: string;
  title: string;
  id: string;
};

type TIngredient = {
  quantity: number | null;
  unit: string | null;
  description: string;
};

type TRecipeDetails = TRecipeItem & {
  ingredients: TIngredient[];
};

type TRecipeList = TRecipeItem[];

export const GlobalContext = createContext<TGloblaContextProps | null>(null);

export const GlobalState = ({ children }: TGloblaStateProps): JSX.Element => {
  const [searchParam, setSearchParam] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<TRecipeList>([]);
  const [recipeDetailsData, setRecipeDetailsData] =
    useState<TRecipeDetails | null>(null);
  const [favoritesList, setFavoritesList] = useState<TRecipeDetails[]>([]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`,
      );
      const data = res.data.data;

      if (data.recipes) {
        setRecipeList(data.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  };
  const handleAddToFavorites = (getCurrentItem: TRecipeDetails) => {
    const cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(
      (val) => val.id === getCurrentItem.id,
    );
    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem);
    } else {
      cpyFavoritesList.splice(index);
    }
    setFavoritesList(cpyFavoritesList);
  };
  console.log(favoritesList, "favoritesList");

  return (
    <GlobalContext.Provider
      value={{
        handleAddToFavorites,
        favoritesList,
        setFavoritesList,
        recipeDetailsData,
        setRecipeDetailsData,
        recipeList,
        loading,
        searchParam,
        setSearchParam,
        handleSubmit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
