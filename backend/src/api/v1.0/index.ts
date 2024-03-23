import V1BaseRouter from "@routes/index";
import { Router } from "express";
const apiRouter = Router({ mergeParams: true });

apiRouter.use("/v1.0/", V1BaseRouter); /// For each version we need to manage separate folder with all routes,models,controllers,config's inside it.

export default apiRouter;
