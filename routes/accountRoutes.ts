import express from "express";
import { signInAccountController, createAccountController } from "../controllers/accountController";
const router = express.Router();

router.post("/sign-in", signInAccountController);

router.post("/create-account", createAccountController);

export default router;