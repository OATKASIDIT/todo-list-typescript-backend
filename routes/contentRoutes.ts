import express from "express";
import { getContentController, postContentController, putContentController, deleteContentController } from "../controllers/contentController";
const router = express.Router();

router.get('/content', getContentController);

router.post('/content', postContentController);

router.put('/content', putContentController);

router.delete('/content', deleteContentController);

export default router;