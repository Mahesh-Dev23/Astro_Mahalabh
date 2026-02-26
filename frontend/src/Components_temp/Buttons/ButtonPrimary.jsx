import "./button.css";
import { NavLink } from "react-router-dom";

const ButtonPrimary = ({ buttonText, url, onClick }) => {

  // If url is passed → act like normal button
  if (url) {
    return (
      <NavLink
        to={url}
        className={({ isActive }) =>
          isActive
            ? "button-primary active"
            : "button-primary"
        }
      >
        {buttonText}
      </NavLink>
    );
  }

  // Otherwise → act like router link
  return (
    <button className="button-primary" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default ButtonPrimary;