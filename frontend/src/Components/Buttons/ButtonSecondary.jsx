import React from "react";

const ButtonSecondary = ({ buttonText, onClick }) => {
  return (
    <button className="button-secondary" onClick={() => onClick(buttonText)}>
      {buttonText}
    </button>
  );
};

export default ButtonSecondary;
