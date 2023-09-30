import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import userRoutes from "../src/routes/userRoutes";
import fileUpload from "express-fileupload";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

const createApp = () => {
  const app = express();
  app.use(
    cors({
      credentials: true,
    })
  );

  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload());

  app.get("/", (req, res) => res.send("Welcome to PJ Books Backend!"));
  app.use("/api/users", userRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;
