import axios from "axios";
import { createContext, ReactNode, useState } from "react";

type TGloblaContextProps = {
  recipeList: TRecipeList;
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

export type TRecipeList = TRecipeItem[];

export const GlobalContext = createContext<TGloblaContextProps | null>(null);

export const GlobalState = ({ children }: TGloblaStateProps): JSX.Element => {
  const [searchParam, setSearchParam] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<TRecipeList>([]);

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
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
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
