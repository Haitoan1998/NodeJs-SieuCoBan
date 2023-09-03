import webRouter from "../routes/web";
import apiRouter from "../routes/API";
import morgan from "morgan";

const configRoutes = (app) => {
  app.use((req, res, next) => {
    console.log("Time", Date.now());
    next();
  }); //đây là middlewarwe level app
  app.use(morgan("combined"));
  app.use("/", webRouter);
  app.use("/api/v1", apiRouter);
  app.use((req, res, next) => {
    return res.render("404.ejs");
  }); // middlewarwe level app khi ko có đường dẫn khớp
};

export default configRoutes;
