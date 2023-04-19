import express from "express";
import * as pollController from "../controllers/pollController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').get(pollController.getAllPolls);
router.route("/:pollname").get(pollController.getAPoll);
router.route("/:pollname/vote").put(pollController.pollVoting);
router.route("/:pollname/comment").put(pollController.pollCommenting);


export default router;