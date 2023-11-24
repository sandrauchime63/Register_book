import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authorize = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.headers.authorization;
    if (authorization === undefined) {
      return response.status(401).json({
        message: `Authorisation failed`,
      });
    }
    const token = authorization.split(" ")[1];
    if (!token || token === "") {
      return response.status(401).json({
        status: `failed`,
        message: `log in!!!!!!!!!!!`,
      });
    }

    const decode = jwt.verify(token, `${process.env.APP_SECRET}`);

    if (decode) {
      request.user = decode;
      next();
    }
    return response.status(401).json({
      message: `invalid token`,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};
