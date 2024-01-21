import { NextFunction, Request, Response } from "express";
import { getOne } from "../services/user";
import { compareHash } from "../utils/bcrypt";
import { generateJwtToken, verifyToken } from "../utils/jwt";
import { HttpException } from "../utils/httpException";
import { HttpStatus } from "../const/httpStatus";
import { HttpResponse } from "../utils/httpResponse";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { mobile, password } = req.body;
    const user = await getOne(mobile);
    if (!user)
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        "Incorrect mobile or password"
      );
    const isMatch = await compareHash(password, user.password);
    if (!isMatch)
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        "Incorrect mobile or password"
      );
    const { password: _password, ...rest } = user;
    const token = await generateJwtToken(rest);
    res.cookie("auth", token, { httpOnly: true, secure: true });
    return res.json(
      new HttpResponse(HttpStatus.OK, "Loggedin successfully", {
        user: rest,
        token,
      })
    );
  } catch (error) {
    next(error);
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const tokenValidate = async (req: Request, res: Response) => {
  const { auth: token } = req.cookies;

  // const token = req.headers.authorization?.split(" ")[1] || "";
  if (!token) return res.status(401).json("invalid");
  try {
    const user = await verifyToken(token);
    res.setHeader("user", JSON.stringify(user));
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(401);
  }
};
