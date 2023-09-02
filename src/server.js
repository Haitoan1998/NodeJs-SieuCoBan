import express from "express";
import configViewEngine from "./configs/viewEngine";
import "dotenv/config";
import configRoutes from "./routes/configRoutes";
const app = express();
const port = process.env.PORT || 3000;
configViewEngine(app);

configRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
