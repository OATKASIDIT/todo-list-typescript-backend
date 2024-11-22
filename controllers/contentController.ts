import { Request, Response } from "express";
import { getContent, postContent, putContent, deleteContent, deleteAllContent } from "../models/contentModel";
  
export const getContentController = (req: Request, res: Response) => {
    if(!req.account){
        res.status(401).json({ message: "Access denied." });
    }else{
        getContent(req, res);
    }
}

export const postContentController = (req: Request, res: Response) => {
    if(!req.account){
        res.status(401).json({ message: "Access denied." });
    }else{
        postContent(req, res);
    }
}

export const putContentController = (req: Request, res: Response) => {
    if(!req.account){
        res.status(401).json({ message: "Access denied." });
    }else{
        putContent(req, res);
    }
}

export const deleteContentController = (req: Request, res: Response) => {
    if(!req.account){
        res.status(401).json({ message: "Access denied." });
    }else{
        deleteContent(req, res);
    }
}

export const deleteAllContentController = (req: Request, res: Response) => {
    if(!req.account){
        res.status(401).json({ message: "Access denied." });
    }else{
        deleteAllContent(req, res);
    }
}