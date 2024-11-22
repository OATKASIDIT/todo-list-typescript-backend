import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


declare global {
  namespace Express {
    interface Request {
      account?: string | jwt.JwtPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  try{
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
    req.account = decoded;
    next();
  }catch (error){
    next();
  }
};
