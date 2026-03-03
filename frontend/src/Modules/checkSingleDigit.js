export const isSingleDigit = (num) => {
  // Check if it's a valid number and an integer.
  if (typeof num !== "number" || !Number.isInteger(num)) {
    return false;
  }
  // Check if the number is between 0 and 9 inclusive.
  return num >= 0 && num <= 9;
};
