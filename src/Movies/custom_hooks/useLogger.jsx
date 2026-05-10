import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { clearDetailsCache } from "../cache/detailCache.js";
import { clearMovieCache } from "../cache/moviesCache.js";

export function useLogger() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    async function storeUser(username, password) {

        setLoading(true);
        setErrorMessage("");

        try {
            const result = await fetch("http://localhost:3000/api/movie/register", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password
                })
            });

            if (!result.ok) {
                const res = await result.json();
                throw res.error
            }

            navigate("/login");
    
        }
        catch(err) {
            setErrorMessage(err.message);
            console.log(err.code);
            console.log(err.message);
            console.log(err.detail);
            console.log(err.stack)
        }
        finally {
            setLoading(false)
        }
    }


    async function checkUser(username, password) {

        setLoading(true);
        setErrorMessage("")

        try {
            const result = await fetch("http://localhost:3000/api/movie/login", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password
                })
            })

            if (!result.ok) {
                const res = await result.json();
                throw res.error
            }

            const data = await result.json();
            localStorage.setItem("token", data.token);

            clearDetailsCache();
            clearMovieCache();
            
            navigate("/movies")
        }
        catch(err) {
            setErrorMessage(err.message);
            console.log(err.code);
            console.log(err.message);
            console.log(err.detail);
            console.log(err.stack)
        }
        finally {
            setLoading(false)
        }
    }

    return {
        storeUser,
        checkUser,
        loading,
        errorMessage,
    };
}