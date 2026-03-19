import express from "express";
import cors from "cors";
import panchangRoutes from "./routes/panchangRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", panchangRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
