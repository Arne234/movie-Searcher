import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

import {useMovies} from "../custom_hooks/useMovie.jsx";

function StartMovieApp() {

    const navigate = useNavigate();
    
    const [search, setSearch] = useState("");

    const { loading, 
            errorMessage,  
            movies, 
            fetchMovie } = useMovies()


    function handleInputData(e) {
        setSearch(e.target.value)
    }


    return( <div className="app">
                <h1 className="titleApp">Movie Searcher</h1>
                {loading && <div className="spinSymbol">...</div>}
                <input type="text" className="inputMovie" onChange={handleInputData} />
                <button className="search" disabled={loading} onClick={() =>  fetchMovie(search)}
                >Search</button>
                <button className="favoriteItems" disabled={loading} onClick={() => navigate(`/favorites`)}>Favorites</button>
                <p className="errorText">{errorMessage}</p>

                <div className="results">
                    {movies.map(movie => {
                        return(
                        <div key={movie.Id}>
                            <img src={movie.Poster !== "N/A" ? movie.Poster : "/image.png"} 
                            className="imgClass" 
                            onClick={() => navigate(`/movie/${movie.Id}`)}
                            />
                            <h3 className="titleClass">Title: {movie.Title}</h3>
                            <h3 className="yearClass">Year: {movie.Year}</h3>
                        </div>
                        )

                    })}
                </div>

            </div>)
}

export default StartMovieApp