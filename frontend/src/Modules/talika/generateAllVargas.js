export function generateAllVargas(planets) {
  const zodiacSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  const signType = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2];

  function getBase(longitude) {
    const L = (longitude + 360) % 360;
    const sign = Math.floor(L / 30);
    const deg = L % 30;

    return { sign, deg };
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
  // D2 Hora -------------------------------------------
  function D2(L) {
    const { sign, deg } = getBase(L);

    const isOdd = sign % 2 === 0;

    if (deg < 15) {
      return isOdd ? 4 : 3; // Cancer / Leo
    } else {
      return isOdd ? 3 : 4;
    }
  }
  // D3 Drekkan --------------------------------------------
  function D3(L) {
    const { sign, deg } = getBase(L);
    const part = Math.floor(deg / 10);

    return (sign + part * 4) % 12;
  }
  // D4 ----------------------------------------------------
  const D4 = (L) => parasharaVarga(L, 4);
  // D5 ----------------------------------------------------
  const D5 = (L) => parasharaVarga(L, 5);
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
  const D8 = (L) => parasharaVarga(L, 8);
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
  const D12 = (L) => parasharaVarga(L, 12);
  // D16 ----------------------------------------------------------
  const D16 = (L) => parasharaVarga(L, 16);
  // D20 ---------------------------------------------------------
  const D20 = (L) => parasharaVarga(L, 20);
  // D24 -----------------------------------------------------------
  const D24 = (L) => parasharaVarga(L, 24);
  // D27 --------------------------------------------------------
  const D27 = (L) => parasharaVarga(L, 27);
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
  const D40 = (L) => parasharaVarga(L, 40);
  // D45 ------------------------------------------------------
  const D45 = (L) => parasharaVarga(L, 45);
  // D60 ------------------------------------------------------
  function D60(L) {
    const { sign, deg } = getBase(L);

    const part = Math.floor(deg / 0.5);

    return (sign + part) % 12;
  }

  return planets.map((p) => ({
    planet: p.name,

    D1: D1(p.longitude) + 1,
    D2: D2(p.longitude) + 1,
    D3: D3(p.longitude) + 1,
    D4: D4(p.longitude) + 1,
    D5: D5(p.longitude) + 1,
    D7: D7(p.longitude) + 1,
    D8: D8(p.longitude) + 1,
    D9: D9(p.longitude) + 1,
    D10: D10(p.longitude) + 1,
    D12: D12(p.longitude) + 1,
    D16: D16(p.longitude) + 1,
    D20: D20(p.longitude) + 1,
    D24: D24(p.longitude) + 1,
    D27: D27(p.longitude) + 1,
    D30: D30(p.longitude) + 1, // special
    D40: D40(p.longitude) + 1,
    D45: D45(p.longitude) + 1,
    D60: D60(p.longitude) + 1,
  }));
}
