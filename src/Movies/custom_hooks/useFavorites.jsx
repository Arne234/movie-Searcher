import { useContext } from "react";
import { FavoriteMoviesContext } from "../context/myContext";

export function useFavorites() {
  const context = useContext(FavoriteMoviesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
