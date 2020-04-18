import express, { Application, Request, Response, NextFunction } from 'express';
type SessionRequest =
  | Request
  | (Request & {
      session: Express.Session;
    });
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send('Not Logged In');
  }
};
