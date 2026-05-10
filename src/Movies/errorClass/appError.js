
class AppError extends Error {

    constructor({
        message,
        statusCode = 500,
        code = "Server Error",
        detail = null
    })
    {
        super(message)

        this.statusCode = statusCode;
        this.code = code;
        this.detail = detail
    }
}


export default AppError