// const express = require("express");
import express from "express";
import cors from "cors";
// const { calculateChartData } = require("./utils/astroEngine");
import { calculateFullChart } from "./utils/astroEngine.js";
// const { getKundliData } = require("./utils/astrology-engine");
import { getKundliData } from "./utils/astrology-engine.js";
// import { calculateNavamsa } from "./utils/navmansha.js";
const app = express();
app.use(cors());

app.get("/api/get-kundli", async (req, res) => {
  try {
    console.log(req.query);
    const { dob, lat, lon } = req.query; // e.g. 2026-02-15T14:00
    const results = await calculateFullChart(
      new Date(dob),
      parseFloat(lat),
      parseFloat(lon),
    );
    console.log(results);
    res.json(results);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/get-full-chart", async (req, res) => {
  // console.log(req.query);
  try {
    const { dob, lat, lon } = req.query;
    // 1. Get Astronomical Data
    // console.log(dob, lat, lon); ok
    const astro = await getKundliData(
      new Date(dob),
      parseFloat(lat),
      parseFloat(lon),
    );
    // console.log("Server ", astro);
    // 2. Get Dasha Periods using the Moon Longitude from Step 1
    // const dashas = getVimshottariPeriods(astro.moonLongitude, new Date(dob));

    // console.log("Navmansha ", calculateNavamsa(astro.planets));
    res.json({
      chart: astro,
      // timeline: dashas,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Astro Server running on 5000"));
