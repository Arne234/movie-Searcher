import AppError from "./appError.js";

class AuthError extends AppError {

    constructor(message, detail) {
        super({
            message, 
            detail,
            statusCode: 401,
            code: "Auth_Error"
        })
    }
}

export default AuthError