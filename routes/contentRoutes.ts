import express from "express";
import { getContentController, postContentController, putContentController, deleteContentController, deleteAllContentController } from "../controllers/contentController";
import { authenticate } from "../middleware/authenticate"
const router = express.Router();

router.get("/content", authenticate, getContentController);

router.post("/content", authenticate, postContentController);

router.put("/content", authenticate, putContentController);

router.delete("/content", authenticate, deleteContentController);

router.delete("/all-content", authenticate, deleteAllContentController);

export default router;