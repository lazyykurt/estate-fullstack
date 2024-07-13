import express from "express";
import { verfiyToken } from "../middleware/verifyToken.js";
import { shouldBeLoggedIn, shouldBeAdmin } from "../controllers/test.controller.js";

const router = express.Router();

router.get("/should-be-logged-in", verfiyToken, shouldBeLoggedIn);

router.get("/should-be-admin", shouldBeAdmin);

export default router;