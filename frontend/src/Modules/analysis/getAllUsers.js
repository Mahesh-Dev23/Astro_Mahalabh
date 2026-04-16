import "../../users.json";
export const getAllUsers = async () => {
  const users = await import("../../users.json")
    .then((res) => res)
    .then((data) => data)
    .catch((err) => console.error(err));

  let names = Object.keys(users).sort();
  let newNames = names.filter((name) => name !== "default" && name);
  // console.log(newNames);
  // console.log(users);
  let allUsers = [];
  newNames.map((name) => allUsers.push({ name: name, ...users[name] }));
  // console.log(allUsers);
  return { names: newNames, allUsers };
};
