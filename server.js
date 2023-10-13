import express from "express";
import * as dotenv from "dotenv";

import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";

import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectDb();
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// allow json req.body
app.use(express.json());

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
