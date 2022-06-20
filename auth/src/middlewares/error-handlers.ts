import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandlers = (
  err: Error,
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return resp.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  resp.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
