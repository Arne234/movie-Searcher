import {useNavigate} from "react-router-dom";

import {useLogger} from "../custom_hooks/useLogger.jsx";
import { useState, useEffect } from "react";

function Register() {

    useEffect(() => {
        localStorage.removeItem("token")
    }, [])
    
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { storeUser,
            loading,
            errorMessage } = useLogger();

    return(

        <div className="registerPage">
            {loading && <div className="spinSymbol">...</div>}
            <h1 className="titleApp">Register</h1>
            <label className="titleClass"> Name:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username..." />
            </label>

            <label className="titleClass"> Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password..."/>
            </label>
            <p className="errorText">{errorMessage}</p>
            <button className="search" onClick={async () => await storeUser(username, password)} >Submit</button>
            <button className="favoritizeBtn" onClick={() => navigate("/login")} >Already registered?</button>
            <button className="backButton" onClick={() => navigate("/movies")} >Browse Movies</button>
        </div>
    )
}

export default Register