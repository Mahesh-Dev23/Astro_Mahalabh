const YONI = {
  1: "Horse",
  2: "Elephant",
  3: "Sheep",
  4: "Serpent",
  5: "Dog",
  6: "Cat",
  7: "Rat",
  8: "Cow",
  9: "Buffalo",
  10: "Tiger",
  11: "Deer",
  12: "Monkey",
  13: "Mongoose",
  14: "Lion",
  15: "Horse",
  16: "Elephant",
  17: "Sheep",
  18: "Serpent",
  19: "Dog",
  20: "Cat",
  21: "Rat",
  22: "Cow",
  23: "Buffalo",
  24: "Tiger",
  25: "Deer",
  26: "Monkey",
  27: "Mongoose",
};

export function getYoniScore(boyNak, girlNak) {
  return YONI[boyNak] === YONI[girlNak] ? 4 : 2;
}
