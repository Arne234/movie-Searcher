import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useFavorites } from "../custom_hooks/useFavorites.jsx";
import {useMovies} from "../custom_hooks/useMovie.jsx";

function ShowDetails() {

    const {id} = useParams();
    const navigate = useNavigate();

    const { favoritize, deleteFavoriteMovie } = useFavorites();

    const { loading, 
            errorMessage, 
            movie, 
            fetchMovieDetails} = useMovies()

    useEffect(() => {fetchMovieDetails(id)} ,[id, fetchMovieDetails])

    if (errorMessage) {
        return <div className="errorText">{errorMessage}</div>;
    }


    return( <div className="appPage2">
                {loading && <div className="spinSymbol">...</div>}
                <button onClick={() => navigate(`/movies`)} disabled={loading} className="backButton">Back</button>
                <button onClick={() => favoritize(id)} disabled={loading} className="favoritizeBtn">Favoritze</button>
                <div className="DetailsrowContainer">
                    <img className="detailsImage" src={movie?.Poster && movie.Poster !== "N/A"
                                                            ? movie?.Poster
                                                            : "./image.png"
                    } />
                    <div className="plotContainer">
                            <h3 className="detailTitle">Title: {movie?.Title}</h3>
                            <p className="plotText">Plot: {movie?.Plot}</p>
                            <h3 className="raiting">Rating: {movie?.Ratings?.length >= 1 
                                                                ? movie.Ratings[0].Value 
                                                                : ""}
                            </h3>
                    </div>
                </div>
            </div>)
    
}

export default ShowDetails