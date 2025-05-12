import express from "express";
const app = express();
import cors from "cors";
import configRoutes from "./routes/index.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "OPTIONS", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/uploads", express.static("uploads"));
// app.use(authMiddleware);
configRoutes(app);

try {
  app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  });
} catch (e) {
  console.log(e);
}
