import webRouter from "../routes/web";
import apiRouter from "../routes/API";
const configRoutes = (app) => {
  app.use("/", webRouter);
  app.use("/api/v1", apiRouter);
};

export default configRoutes;
