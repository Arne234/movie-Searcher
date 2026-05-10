import { useContext } from "react";
import { FetchMovieContext } from "../context/myContext";


export function useMovies() {
    const context = useContext(FetchMovieContext);

    if (!context) {
        throw new Error("useMovies must be used inside MoviesProvider");
    }

    return context;
}