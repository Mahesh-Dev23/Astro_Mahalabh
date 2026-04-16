import express from "express";
import cors from "cors";
import panchangRoutes from "./routes/panchangRoute.js";
import { createJson } from "./utils/createJson.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", panchangRoutes);
app.use("/data/", async (req, res) => createJson(req, res));

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
