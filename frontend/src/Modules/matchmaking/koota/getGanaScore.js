export function getGanaScore(boyNak, girlNak) {
  const GANA_NAK = [
    "Deva",
    "Deva",
    "Manushya",
    "Rakshasa",
    "Rakshasa",
    "Manushya",
    "Deva",
    "Rakshasa",
    "Manushya",
    "Rakshasa",
    "Manushya",
    "Deva",
    "Rakshasa",
    "Manushya",
    "Deva",
    "Rakshasa",
    "Manushya",
    "Deva",
    "Rakshasa",
    "Manushya",
    "Deva",
    "Rakshasa",
    "Manushya",
    "Deva",
    "Rakshasa",
    "Manushya",
    "Deva",
  ];

  const boy = GANA_NAK[boyNak - 1];
  const girl = GANA_NAK[girlNak - 1];

  if (boy === girl) return 6;

  return 3;
}
