import express from "express";
import { getContentController, postContentController, putContentController, deleteContentController, deleteAllContentController } from "../controllers/contentController";
const router = express.Router();

router.get('/content', getContentController);

router.post('/content', postContentController);

router.put('/content', putContentController);

router.delete('/content', deleteContentController);

router.delete('/all-content', deleteAllContentController);

export default router;