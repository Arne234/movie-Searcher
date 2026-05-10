import React, {useState} from "react";
import { FetchMovieContext } from "./myContext";

import {    setMovieCache,
            getMovieCache } from "../cache/moviesCache.js";

import {    setDetailsCache,
            getDetailsCache } from "../cache/detailCache.js";  


export function UseMoviesProvider({children}) {
 

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState(null)

    async function fetchMovie(search) {

        if (search.trim() === "") return

        setLoading(true)
        setErrorMessage("")

        try{

            const cached = getMovieCache(search);

            if (cached) {
                setMovies(cached);
                return
                
            }

            let result = await fetch(`http://localhost:3000/api/movie?search=${search}`);

            if (!result.ok) {
                throw new Error(`Server Error ${result.status}`)
            }

            let data = await result.json();
            
            if (data?.Response === "False") {  
                setErrorMessage(`Couldnt find ${search}`)}
            else {
                    let dataArray = data.Search.map(element => ({
                        Id: element.imdbID,
                        Title: element.Title,
                        Poster: element.Poster,
                        Year: element.Year
                    }))   
                    setMovies(dataArray)
                    setMovieCache(search, dataArray)
            }
        }
        catch(err) {
            console.log(err.code);
            console.log(err.message);
            console.log(err.detail);
            console.log(err.stack);
            setErrorMessage(err.message);
        }
        finally {setLoading(false)}
    }


    async function fetchMovieDetails(id) {

            setLoading(true)
            setErrorMessage("")

            try {
                
                const cached = getDetailsCache(id);

                if (cached) {
                    setMovie(cached);
                    return
                }
                
                let response = await fetch(`http://localhost:3000/api/movie/${id}`)

                if (!response.ok) {
                    throw new Error(`Server Error ${response.status}`)
                }

                let data = await response.json()

                let dataArray = {   Id: id,
                                    Plot: data.Plot,
                                    Title: data.Title,
                                    Poster: data.Poster,
                                    Ratings: data.Ratings,
                                    Year: data.Year
                                }
                setMovie(dataArray)
                setDetailsCache(id, dataArray)

            }
            catch(err) {
                console.log(err.code);
                console.log(err.message);
                console.log(err.detail);
                console.log(err.stack);
                setErrorMessage(err.message);
            }
            finally {setLoading(false)}
    };

    return(
        <FetchMovieContext.Provider value={{    loading, 
                                                errorMessage, 
                                                movie, 
                                                movies, 
                                                fetchMovie, 
                                                fetchMovieDetails}}>
            {children}
        </FetchMovieContext.Provider>
    )
}