import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import placeRoutes from "./routes/place.js";
const app = express();

// MIDDLEWARES
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", userRoutes);
app.use("/place", placeRoutes);

const CONNECTION_URL =
  "mongodb+srv://mehtarishav99:rishav@cluster0.50dmgtq.mongodb.net/?retryWrites=true&w=majority";
app.listen("5000", async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
  } catch (error) {
    console.error(error);
  }
  console.log("server started");
});
