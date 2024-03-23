import { Router } from "express";
import SchoolAdminRoutes from "@routes/schoolAdmin.routes";
const apiRouter = Router({ mergeParams: true });

apiRouter.use("/schooladmin", SchoolAdminRoutes);

export default apiRouter;
