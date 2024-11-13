import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
	const rateLimitLimit = res.getHeader('RateLimit-Limit');
	const rateLimitRemaining = res.getHeader('RateLimit-Remaining');
	const rateLimitReset = res.getHeader('RateLimit-Reset');
	res.send(`คุณสามารถเข้าหน้านี้ได้อีก ${rateLimitRemaining} ครั้ง จาก ${rateLimitLimit} ครั้ง โดยจะรีเซ็ตในอีก ${rateLimitReset} วินาที`);
});

export default router;