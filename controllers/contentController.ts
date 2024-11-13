import { Request, Response } from "express";
import { getContent, postContent, putContent, deleteContent } from "../models/contentModel";

export const getContentController = (req: Request, res: Response) => {
    getContent(req, res);
}

export const postContentController = (req: Request, res: Response) => {
    postContent(req, res);
}

export const putContentController = (req: Request, res: Response) => {
    putContent(req, res);
}

export const deleteContentController = (req: Request, res: Response) => {
    deleteContent(req, res);
}