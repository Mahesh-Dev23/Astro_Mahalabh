import express from "express";
import { runEngine } from "../engine/panchangEngine.js";

const router = express.Router();

router.get("/get-full-chart", async (req, res) => {
  console.log(req.query);
  try {
    const { dob, time, tz, lat, lon } = req.query;
    console.log("Step 1 ...... Date from frontend", dob, lat, lon);
    // 1. Get Astronomical Data
    console.log("Step 1a ...... new Date", dob, time, tz, lat, lon); // ok

    const astro = await runEngine(
      dob,
      time,
      tz,
      parseFloat(lat),
      parseFloat(lon),
    );

    res.json({
      chart: astro,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
