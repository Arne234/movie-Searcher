import AppError from "../../src/Movies/errorClass/appError.js"

const errorWare = (err, req, res, next) => {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                detail: err.detail,
                stack: err.stack
            }
        })
    }


    console.log(err);
    return res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_ERROR",
            message: "Something went wrong"
        }
    })
}

export default errorWare