export function getAge(dob) {
  const today = new Date();
  const birthDateObj = new Date(dob); // Convert input to Date object if it's a string

  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  const dayDifference = today.getDate() - birthDateObj.getDate();

  // Adjust age if the birthday hasn't occurred this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}
