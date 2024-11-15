import { Request, Response } from "express";
import { getContent, postContent, putContent, deleteContent, deleteAllContent } from "../models/contentModel";

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

export const deleteAllContentController = (req: Request, res: Response) => {
    deleteAllContent(req, res);
}