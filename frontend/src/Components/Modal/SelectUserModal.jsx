import { useState, useEffect } from "react";

import ButtonSecondary from "../Buttons/ButtonSecondary";

const SelectUserModal = ({ setModalOpen, onClick }) => {
  const [data, setData] = useState(null);
  const [names, setNames] = useState([]);
  // get all users ----------------------------------------------
  const getAllUsers = async () => {
    const user = await import("../../users.json")
      .then((res) => res)
      .then((data) => data)
      .catch((err) => console.error(err));

    setData(user);
    // console.log(user);
  };
  useEffect(() => {
    setData(getAllUsers());
  }, []);
  useEffect(() => {
    data && setNames(Object.keys(data));
  }, [data]);
  // console.log(names?.length);

  const getuser = (e) => {
    // console.log({ name: e, ...data[e] });
    onClick({ name: e, ...data[e] });
  };
  // console.log(data);
  return (
    <div className="modal-overlay " onClick={() => setModalOpen(false)}>
      {/* <div> Get Users</div> */}
      <div className="chart-wrapper" style={{ flexWrap: "wrap" }}>
        {names &&
          names.map((name) => (
            <div key={name.trim(" ")}>
              <ButtonSecondary buttonText={name} onClick={getuser} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectUserModal;
