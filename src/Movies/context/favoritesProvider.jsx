import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteMoviesContext } from "./myContext";

export function FavoritesProvider({children}) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const getToken = () => localStorage.getItem("token");

    async function loadFavorites() {
        try {
            setLoading(true);
            const result = await fetch("http://localhost:3000/api/movie/favorites", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            const data = await result.json();

            if (!result.ok) {
                const error = data.error;

                switch(error.code) {
                    case "VALIDATION_ERROR":
                        throw error;
                    
                    case "Auth_Error":
                        navigate("/login");
                        throw error
                } 
            }
            
            setFavorites(Array.isArray(data) ? data : []);
        }
        catch(err) {
            console.log(err.code);
            console.log(err.message);
            console.log(err.detail);
            console.loh(err.stack)
        }
        finally {
            setLoading(false);
        }
    }
    
    
    async function favoritize(id) {
      try {
        const result = await fetch(`http://localhost:3000/api/movie/favorites/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            }
        });

        const answer = await result.json()

        if (!result.ok) {
            const error = answer.error;

            switch(error.code) {
                case "VALIDATION_ERROR":
                    throw error;
                    
                case "Auth_Error":
                    navigate("/login");
                    throw error
            } 
        }          

      } 
      catch(err) {
        console.log(err.code);
        console.log(err.message);
        console.log(err.detail);
        console.log(err.stack)
      }

        
    }


    async function deleteFavoriteMovie(id) {
        
        setFavorites(prev => prev.filter(movie => movie.imdbID !== id));

        try {
            const result = await fetch(`http://localhost:3000/api/movie/favorites/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json"
            }
            })
            const answer = await result.json();
    
        }
        catch(err) {
            console.log(err.code);
            console.log(err.message);
            console.log(err.detail);
            console.log(err.stack)
        }
    }


    return(
        <FavoriteMoviesContext.Provider value={{favorites,
                                                loading,
                                                loadFavorites,
                                                favoritize,
                                                deleteFavoriteMovie
        }}>
            {children}
        </FavoriteMoviesContext.Provider>
    )
}