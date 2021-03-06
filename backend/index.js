import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import { notFound, errorHandler } from "../middleware/errorMiddleware.js";
import connectDB from "../config/db.js";

import productRoutes from "../routes/productRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import uploadRoutes from "../routes/uploadRoutes.js";
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  "/api/products",
  require(path.join(__dirname, "api", "routes", "productRoutes.js"))
);
app.use(
  "/api/users",
  require(path.join(__dirname, "api", "routes", "userRoutes.js"))
);
app.use(
  "/api/orders",
  require(path.join(__dirname, "api", "routes", "orderRoutes.js"))
);
app.use(
  "/api/upload",
  require(path.join(__dirname, "api", "routes", "uploadRoutes.js"))
);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "build")));

  app.get("/*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("server is running");
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on ${PORT}`.grey
      .underline.bold
  )
);
