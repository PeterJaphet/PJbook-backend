"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express2 = __toESM(require("express"));
var import_http = __toESM(require("http"));
var import_body_parser = __toESM(require("body-parser"));
var import_cookie_parser = __toESM(require("cookie-parser"));
var import_compression = __toESM(require("compression"));
var import_cors = __toESM(require("cors"));
var import_config = require("dotenv/config");

// src/controllers/userController.ts
var import_express_async_handler = __toESM(require("express-async-handler"));
var authUser = (0, import_express_async_handler.default)(async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "login User" });
});
var registerUser = (0, import_express_async_handler.default)(async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "register User" });
});
var logoutUser = (0, import_express_async_handler.default)(async (req, res) => {
  res.status(200).json({ message: "logout User" });
});
var getUserProfile = (0, import_express_async_handler.default)(async (req, res) => {
  res.status(200).json({ message: "Get User" });
});
var updateUserProfile = (0, import_express_async_handler.default)(async (req, res) => {
  res.status(200).json({ message: "update User" });
});

// src/routes/userRoutes.ts
var import_express = __toESM(require("express"));
var router = import_express.default.Router();
router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
var userRoutes_default = router;

// src/middleware/errorMiddleware.ts
var notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
var errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not Found";
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : ""
  });
};

// src/config/db.ts
var import_mongoose = __toESM(require("mongoose"));
var connectDB = async () => {
  try {
    const conn = await import_mongoose.default.connect(process.env.MONGO_URI);
    console.log(`Mongo DB connected!: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
var db_default = connectDB;

// src/index.ts
db_default();
var port = process.env.PORT || 5e3;
var app = (0, import_express2.default)();
app.use((0, import_cors.default)({
  credentials: true
}));
app.use((0, import_compression.default)());
app.use((0, import_cookie_parser.default)());
app.use(import_body_parser.default.json());
app.use(import_express2.default.json());
app.use(import_express2.default.urlencoded({ extended: true }));
var server = import_http.default.createServer(app);
app.use("/api/users", userRoutes_default);
app.get("/", (req, res) => res.send("Server is ready!"));
app.use(notFound);
app.use(errorHandler);
server.listen(port, () => {
  console.log(`Server runnig on http://localhost:${port}`);
});
