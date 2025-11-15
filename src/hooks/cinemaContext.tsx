import { createContext, useContext } from "react";
import { ICinemaData, ITitleData } from "../App";

export interface CinemaContextValue {
  cinema: ICinemaData | null;
  loading: boolean;
  error: string | null;
  favourites: ITitleData[];
  addFavourite: (title: ITitleData) => void;
  removeFavourite: (id: string) => void;
  refetch: () => void;
}

export const CinemaContext = createContext<CinemaContextValue | null>(null);

export const useCinema = () => {
  const ctx = useContext(CinemaContext);
  if (!ctx) {
    throw new Error("useCinema must be used inside <CinemaContext.Provider>");
  }
  return ctx;
};
