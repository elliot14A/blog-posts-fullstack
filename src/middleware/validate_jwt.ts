import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";

export default (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    "",
  );
  console.log(accessToken);
  if (!accessToken) {
    return next();
  }

  const { decoded, expired, valid } = verifyJwt(accessToken);
  console.log(decoded);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  return next();
};
