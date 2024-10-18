import { ResponseError } from "../error/response.error.js";

export const errorMiddleware = (error, req, res, next) => {
  if (!error) {
    return next();
  }

  // handle custom response error
  if (error instanceof ResponseError) {
    return res
      .status(error.status)
      .json({
        message: error.message,
      })
      .end();
  }
  if (error instanceof SyntaxError && error.status == 400 && "body" in error) {
    return res
      .status(400)
      .json({
        message: "Bad Request",
      })
      .end();
  }
  return res
    .status(500)
    .json({
      message: error.message || "Internal Server Error",
    })
    .end();
};
