import { Router } from "express";

import { tokenExtractor, sessionValidator } from "../utils/middleware.js";

const logoutRouter = Router();

logoutRouter.delete("/", tokenExtractor, sessionValidator, async (req, res) => {
  await req.session.destroy();
  return res.status(200).json({ message: "Logged out successfully" });
})

export default logoutRouter;