import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { User } from "../models/user";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"];

  if (authorization === undefined) return res.status(401).json();

  const [authScheme, authParams] = authorization.split(" ");

  if (authScheme !== "Bearer")
    return res
      .status(400)
      .json("AuthSchemeError: unsupported authentication scheme.");

  getAuth(admin.app())
    .verifyIdToken(authParams)
    .then(async (value) => {
      const user = await User.findById(value.uid);

      if (user === null)
        return res.status(404).json("UserError: user not found.");

      req.user = user;
      return next();
    })
    .catch((error) => {
      return res.status(400).json(`VerifyTokenError: ${error}`);
    });
};
