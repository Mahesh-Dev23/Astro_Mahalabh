import { assertEqual } from "./testVarga";
export const getSelectedDChart = (planets, lagnaLon, D) => {
  const signType = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2];

  function normalizeLongitude(L) {
    return ((L % 360) + 360) % 360;
    const norm = ((L % 360) + 360) % 360;
    console.log("normalise");
    // 🔥 JHora alignment
    return norm + 0.0005; // tune between 0.0007–0.0012
  }

  function getBase(longitude) {
    // const L = (longitude + 360) % 360;
    // const L = ((longitude % 360) + 360) % 360;
    // const sign = Math.floor(L / 30);
    // const deg = L % 30;
    const norm = normalizeLongitude(longitude);
    const sign = Math.floor(norm / 30);

    // 🔥 IMPORTANT: avoid floating glitch
    const deg = norm - sign * 30;

    return { sign, deg };
  }
  // Rotation of Lagna ---------------------------------
  function rotateChart(chart, lagnaSign) {
    let rotated = [];
    let rLagna = 0;
    if (Array.isArray(chart)) {
      for (let i = 0; i < chart.length; i++) {
        {
          rotated[i] = {
            sign: Math.round((chart[i] + lagnaSign) % 12),
            index: i,
          };
        }
      }
    } else {
      rLagna = Math.round((chart + lagnaSign) % 12) + 1;
    }
    return Array.isArray(chart) ? rotated : rLagna;
  }
  // --------------------------------------------------------------------
  function parasharaVarga(longitude, division) {
    const { sign, deg } = getBase(longitude);

    const partSize = 30 / division;
    const part = Math.floor(deg / partSize);

    let startSign;

    if (signType[sign] === 0) {
      // Movable → start from same sign
      startSign = sign;
    } else if (signType[sign] === 1) {
      // Fixed → start from 9th sign
      startSign = (sign + 8) % 12;
    } else {
      // Dual → start from 5th sign
      startSign = (sign + 4) % 12;
    }

    return (startSign + part) % 12;
  }
  // D1 ------------------------------------------------
  function D1(L) {
    return getBase(L).sign;
  }
  // D2 ------------------------------------------------
  function D2(L) {
    const { sign, deg } = getBase(L);

    const isOdd = sign % 2 === 0;

    if (deg < 15) {
      return isOdd ? 4 : 3; // Cancer / Leo
    } else {
      return isOdd ? 3 : 4;
    }
  }
  // D3 ------------------------------------------------
  function D3(L) {
    const { sign, deg } = getBase(L);
    // console.log({ sign, deg });
    const part = Math.floor(deg / 10);
    // console.log(part);
    // console.log((sign + part * 4) % 12);
    return (sign + part * 4) % 12;
  }
  // D4 ----------------------------------------------------
  const D4 = (L) => {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / 7.5);

    return (sign + part * 3) % 12;
  };
  // D5 ----------------------------------------------------
  const D5 = (L) => {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / 6);

    return (sign + part * 2) % 12;
  };
  // D6 ------------------------------------------------------
  function D6(longitude) {
    const { sign, degree } = getBase(longitude);
    const part = Math.floor(degree / 5);

    return (sign + part) % 12;
  }
  // D7 -------------------------------------------------------
  function D7(L) {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / (30 / 7));

    return sign % 2 === 0 ? (sign + part) % 12 : (sign + part + 6) % 12;
  }
  // D8 -------------------------------------------------------
  // const D8 = (L) => parasharaVarga(L, 8);// for reference
  const D8 = (L) => {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / (30 / 8));

    return (sign + part) % 12;
  };
  // D9 ------------------------------------------------------
  function D9(L) {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / (30 / 9));

    return (sign * 9 + part) % 12;
  }
  // D10 --------------------------------------------------------
  function D10(L) {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / 3);

    return sign % 2 === 0 ? (sign + part) % 12 : (sign + part + 8) % 12;
  }
  // D12 ---------------------------------------------------------
  const D12 = (L) => {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / (30 / 12));

    return (sign + part) % 12;
  };
  // const D12 = (L) => getBase(L).sign;
  // D16 ----------------------------------------------------------
  // const D16 = (L) => {
  //   const { sign, deg } = getBase(L);
  //   // const part = Math.floor(deg / (30 / 16));
  //   const part = Math.floor(deg / 1.52);

  //   return sign % 2 === 0 ? (sign + part) % 12 : (sign + part + 4) % 12;
  // };
  const D16 = (L) => {
    // const { sign, deg } = getBase(L);

    // const partSize = 30 / 16;
    // const part = Math.floor(deg / partSize);

    // let start;

    // if (signType[sign] === 0) start = sign;
    // else if (signType[sign] === 1) start = (sign + 8) % 12;
    // else start = (sign + 4) % 12;

    // return (start + part) % 12;
    //----------------------------------------------
    // const { sign, deg } = getBase(L);

    // const part = Math.floor(deg / (30 / 16));

    // let start;

    // if (sign % 3 === 0)
    //   start = sign; // movable
    // else if (sign % 3 === 1)
    //   start = (sign + 8) % 12; // fixed
    // else start = (sign + 4) % 12; // dual

    // return (start + part) % 12;
    // -------------------------------------------------
    // const partSize = 30 / 16; // 1.875°
    // const part = Math.floor((deg + 1e-8) / partSize);

    // // correct sign type using modulus (bulletproof)
    // const type = sign % 3;

    // let start;
    // if (type === 0)
    //   start = sign; // movable
    // else if (type === 1)
    //   start = (sign + 8) % 12; // fixed
    // else start = (sign + 4) % 12; // dual

    // return (start + part) % 12;
    // ------------------------------------------------
    const { sign, deg } = getBase(L);
    console.log(sign);
    const part = Math.floor(deg / (30 / 16));

    const type = sign % 3;

    let start;
    if (type === 0) start = sign;
    else if (type === 1) start = (sign + 8) % 12;
    else start = (sign + 4) % 12;

    // return (start + part) % 12;
    return start;
  };
  // D20 ---------------------------------------------------------
  const D20 = (L) => {
    // const { sign, deg } = getBase(L);

    // const partSize = 30 / 20;
    // const part = Math.floor(deg / partSize);

    // let start;

    // if (signType[sign] === 0) start = sign;
    // else if (signType[sign] === 1) start = (sign + 8) % 12;
    // else start = (sign + 4) % 12;

    // return (start + part) % 12;
    //-------------------------------------------
    // const { sign, deg } = getBase(L);

    // const part = Math.floor(deg / (30 / 20));

    // let start;

    // if (sign % 3 === 0) start = sign;
    // else if (sign % 3 === 1) start = (sign + 8) % 12;
    // else start = (sign + 4) % 12;

    // return (start + part) % 12;
    //---------------------------------------------
    // const { sign, deg } = getBase(L);

    // const partSize = 30 / 20; // 1.5°
    // const part = Math.floor((deg + 1e-8) / partSize);

    // const type = sign % 3;

    // let start;
    // if (type === 0) start = sign;
    // else if (type === 1) start = (sign + 8) % 12;
    // else start = (sign + 4) % 12;

    // return (start + part) % 12;
    //-------------------------------------------------
    const { sign, deg } = getBase(L);

    const part = Math.floor(deg / (30 / 20));

    const type = sign % 3;

    let start;
    if (type === 0) start = sign;
    else if (type === 1) start = (sign + 8) % 12;
    else start = (sign + 4) % 12;

    return (start + part) % 12;
  };
  // const D20 = (L) => getBase(L).sign;
  // D24 -----------------------------------------------------------
  const D24 = (L) => {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / (30 / 24)); // 1.25 deg
    // const part = Math.floor(deg / 1.15);

    return (sign + part) % 12;
  };
  // D27 --------------------------------------------------------
  const D27 = (L) => {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / (30 / 27));

    return (sign + part) % 12;
  };
  // D30 ----------------------------------------------------------
  function D30(L) {
    const { sign, deg } = getBase(L);
    const isOdd = sign % 2 === 0;

    if (isOdd) {
      if (deg < 5) return 0; // Mars → Aries
      if (deg < 10) return 10; // Saturn → Aquarius
      if (deg < 18) return 8; // Jupiter → Sagittarius
      if (deg < 25) return 2; // Mercury → Gemini
      return 6; // Venus → Libra
    } else {
      if (deg < 5) return 6;
      if (deg < 12) return 2;
      if (deg < 20) return 8;
      if (deg < 25) return 10;
      return 0;
    }
  }
  // D40 ------------------------------------------------------
  const D40 = (L) => {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / 0.45);

    return (sign + part * 3) % 12;
  };
  // D45 ------------------------------------------------------
  const D45 = (L) => {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / 0.4);

    return (sign + part * 3) % 12;
  };
  // D60 ------------------------------------------------------
  function D60(L) {
    // let norm = (L + 360) % 360;

    // let sign = Math.floor(norm / 30);
    // let deg = norm % 30;

    // // 🔥 JHora-style stabilization
    // const adjusted = deg - 0.00005;

    // const part = Math.floor(adjusted / 0.5);

    // return (sign + part) % 12;
    // -------------------------------------------------------
    const norm = normalizeLongitude(L);

    const sign = Math.floor(norm / 30);

    let deg = norm - sign * 30;

    // 🔥 JHora-like stabilization
    deg = deg - 0.0001;

    if (deg < 0) deg += 30;

    const part = Math.floor(deg / 0.5);

    return (sign + part) % 12;
  }
  const vargaMap = {
    D1: D1,
    D2: D2,
    D3: D3,
    D4: D4,
    D5: D5,
    D7: D7,
    D8: D8,
    D9: D9,
    D10: D10,
    D12: D12,
    D16: D16,
    D20: D20,
    D24: D24,
    D27: D27,
    D30: D30,
    D40: D40,
    D45: D45,
    D60: D60,
  };
  const lagna = vargaMap[D](lagnaLon) + 1;
  const RLagna = rotateChart(lagna, lagnaLon);
  const chart = planets.map((p) => vargaMap[D](p.longitude) + 1);
  const Rchart = rotateChart(chart, RLagna);

  // test ---------------------------
  // const testData = {
  //   expected: {
  //     D60: 6,
  //     D16: 3,
  //     D20: 8,
  //   },
  // };
  // planets.map((p) => assertEqual(D, D60(p.longitude), testData.expected.D60));

  return { [D]: { lagna, chart, RLagna, Rchart } };
};
