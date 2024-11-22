import { Request, Response } from "express";
import { signInAccount, createAccount } from "../models/accountModel";

export const signInAccountController = (req: Request, res: Response) => {
    signInAccount(req, res);
}

export const createAccountController = (req: Request, res: Response) => {
    createAccount(req, res);
}