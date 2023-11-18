import { Response } from "express";

function errorHandler(res: Response, msg: string, error: unknown) {
  console.log(error);
  res.status(404).send(msg);
}

export { errorHandler };
