const VASHYA = {
  1: "Chatushpada",
  2: "Chatushpada",
  3: "Manav",
  4: "Jalachara",
  5: "Vanachara",
  6: "Manav",
  7: "Manav",
  8: "Keeta",
  9: "Chatushpada",
  10: "Chatushpada",
  11: "Manav",
  12: "Jalachara",
};

export function getVashyaScore(boy, girl) {
  if (VASHYA[boy] === VASHYA[girl]) return 2;

  return 1;
}
