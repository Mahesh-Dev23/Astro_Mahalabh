// const axios = require("axios");
// const { DateTime } = require("luxon");

import axios from "axios";
import { DateTime } from "luxon";

const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY";

export async function getUTCData(localIsoDate, lat, lon) {
  // 1. Convert local date to a Unix timestamp
  const dt = DateTime.fromISO(localIsoDate);
  const timestamp = dt.toSeconds();

  // 2. Call Google Timezone API
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${timestamp}&key=${GOOGLE_API_KEY}`;

  const response = await axios.get(url);
  const { dstOffset, rawOffset, timeZoneId } = response.data;

  if (response.data.status !== "OK") throw new Error("Timezone API failed");

  // 3. Calculate the total offset in seconds
  const totalOffsetSeconds = rawOffset + dstOffset;

  // 4. Create the precise UTC date for Swiss Ephemeris
  const utcDate = dt.minus({ seconds: totalOffsetSeconds });

  return {
    utcDate: utcDate.toJSDate(),
    timeZoneId: timeZoneId,
    offsetHours: totalOffsetSeconds / 3600,
  };
}

// module.exports = { getUTCData };
