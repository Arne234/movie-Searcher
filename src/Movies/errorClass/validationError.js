import AppError from "./appError.js";

class ValidationError extends AppError {
  constructor(message, detail) {
    super({
      message,
      statusCode: 400,
      code: "VALIDATION_ERROR",
      detail
    })
  }
}

export default ValidationError