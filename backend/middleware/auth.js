import jwt from "jsonwebtoken";

import AuthError from "../../src/Movies/errorClass/authError.js";

export const auth = (req, res, next) => {

    const headers = req.headers.authorization;


    if (!headers) {
        throw new AuthError({
            message: "Token required",
            detail: "User doesnt have the required token for this usage"
        })
    }
    
    const token = headers.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.TOKEN);
        req.user = decoded;
        next();
    }
    catch(err) {
        err.status = 401;
        err.message = "Invalid or expired token";
        next(err);
    }
}