import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

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
      .status(401)
      .json("AuthError: unsupported authentication scheme.");

  getAuth(admin.app())
    .verifyIdToken(authParams)
    .then(async (value) => {
      req.uid = value.uid;

      return next();
    })
    .catch((error) => {
      return res.status(401).json(`AuthError: ${error}.`);
    });
};
