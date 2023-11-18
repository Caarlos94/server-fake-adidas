import Express from "express";
import { payController } from "../controllers/pay.controller";

const router = Express.Router();

router.post("/", payController);

export { router };
