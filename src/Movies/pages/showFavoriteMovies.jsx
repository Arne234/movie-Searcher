import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { useFavorites } from "../custom_hooks/useFavorites";


function ShowFavoriteMovies() {

    const navigate = useNavigate();

    const { loading, favorites, loadFavorites, favoritize, deleteFavoriteMovie } = useFavorites();

    useEffect(() => {
        loadFavorites()
    }, [])

    return(     <>
                    <button onClick={() => navigate(`/movies`)} disabled={loading} className="backButton">Back</button>
                    {loading && <div className="spinSymbol">...</div>}
                    <div className="appPage3">
                        {favorites.map(movie => {
                            return(<div key={movie.imdbID ? movie.imdbID : movie.Title} className="containerFavorite">
                                        <img className="detailsImage" src={movie.Poster} />
                                        <div className="favoriteContainer">
                                            <h1 className="detailTitle">{movie.Title}</h1>
                                            <p className="plotText">{movie.Plot}</p>
                                            <h2 className="raiting">{movie.Year}</h2>
                                            <button onClick={() => deleteFavoriteMovie(movie.imdbID)} disabled={loading} className="deleteBtn">Delete</button>
                                        </div> 
                                    </div>

                            )
                        })}
                    </div>
                </>
        
    )
}

export default ShowFavoriteMovies