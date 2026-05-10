import {useNavigate} from "react-router-dom";
import { useState } from "react";

import {useLogger} from "../custom_hooks/useLogger.jsx"

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, 
            errorMessage,
            checkUser } = useLogger();

    return(

    <div className="registerPage">
        <h1 className="titleApp">Login</h1>
        <label className="titleClass"> Name:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </label>
        <p className="errorText">{errorMessage}</p>

        <label className="titleClass"> Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <p className="errorText">{errorMessage}</p>

        <button className="search" onClick={async () => await checkUser(username, password)} >Submit</button>
        <button className="favoritizeBtn" onClick={() => navigate("/")} >Not registered?</button>
    </div>
    )
}

export default Login